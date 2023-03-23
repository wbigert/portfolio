from backend import insert_one, delete_one, get_all, update_one
from datetime import datetime, timedelta
from utilities import parse_interval, parse_group, parse_members, trim_sessions_list_by_interval, extract_sessions_dict_from_employee_id_list, filter_employees_by_group, seconds_to_string, get_combined_employees_list
from stats import get_accumulators, prepare_graphs
import discord
import time
from io import StringIO
# hej
async def add_employee(message, employees, allowed_groups):
  parts = message.content.split(" ")
  if len(str(parts[2])) != 18:
    await message.channel.send(f'Invalid Discord user ID. Aborting.\n Example usage: "!add <DiscordUserId> tellustalk firstName lastName"\n To find Discord user ID: Open Discord settings --> Advanced --> Enable developer mode --> The Discord user ID can now be obtained by right-clicking a Discord user and selecting "Copy ID".')
    return
  id = int(parts[2])
  group = str(parts[3])
  if group.lower() not in allowed_groups:
    await message.channel.send(f'Invalid group. Was: {group}. Must be one of {allowed_groups}. \nExample usage: "!add <DiscordUserId> tellustalk firstName lastName" \nTo find Discord user ID: Open Discord settings --> Advanced --> Enable developer mode --> The Discord user ID can now be obtained by right-clicking a Discord user and selecting "Copy ID".')
    return
    
  name = ' '.join(parts[4:])
  if id in employees:
    await message.channel.send(f'This employee has already been added. Aborting.')
    return
    
  to_insert = {
    'id':id,
    'name':name,
    'group':group,
    'jira_url':'https://start.atlassian.com/'
  }
  insert_one(to_insert, 'employees')
  await message.channel.send(f'Success. Added employee. Name: {name}, Group: {group}, ID: {id}.')

async def remove_employee(message, employees):
  parts = message.content.split(" ")
  id_to_remove = int(parts[2])
  employee_to_remove = employees.get(id_to_remove)
  if not employee_to_remove:
    await message.channel.send(f'This employee does not exist. Aborting.')
    return
  name = employee_to_remove['name']
  group = employee_to_remove['group']
  delete_one({'id':id_to_remove}, 'employees')
  await message.channel.send(f'Success. Removed employee. Name: {name}, Group: {group}, ID: {id_to_remove}.')
  
async def add_server(message, guilds_to_track):
  if message.guild in guilds_to_track:
    await message.channel.send(f'Server is already being tracked.')
  else:
    guilds_to_track.append(message.guild)
    await message.channel.send(f'Success. Added server to list of servers to track.')
  return guilds_to_track

async def print_employees(message, employees):
  count = len(employees)
  to_print = f'There are a total of {count} employees.\n'
  for idx, employee in enumerate(employees.keys()):
    name = employee['name']
    group = employee['group']
    id = employee['id']
    to_print += f'{idx + 1}. Name: {name}. Group: {group}. ID: {id}.\n'
  await message.channel.send(to_print)
  return

async def send_report(message, employees, allowed_groups):
  parts = message.content.split(" ")
  sessions = get_all('session_logs')
  start, end = parse_interval(parts)
  parsed_member_id_list = parse_members(parts)
  parsed_group = parse_group(parts, allowed_groups) or '*'
  combined_employees_list = get_combined_employees_list(employees, parsed_group, parsed_member_id_list)
  sessions_in_interval = trim_sessions_list_by_interval(sessions, start, end)

  # report specific code below
  list_of_dicts = []
  total_seconds_all = 0
  for employee in combined_employees_list:
    cumulative_seconds = 0
    for session in sessions_in_interval:
      if session['id'] == employee['id']:
        cumulative_seconds += session['duration']
    total_seconds_all += cumulative_seconds
    list_of_dicts.append({'employee': employee, 'time': cumulative_seconds})

  time_sorted_employees = sorted(list_of_dicts, key=lambda x: x['time'], reverse=True)
  string_time_total_all = seconds_to_string(total_seconds_all)

  if not start and not end:
    to_print_string = f'Showing total session time of employees. A total of {len(combined_employees_list)} employees were matched. Cumulative time of all: {string_time_total_all}. \n'
  else:
    to_print_string = f'Showing total session time of employees in between dates {start.strftime("%m/%d/%Y")} and {end.strftime("%m/%d/%Y")}. A total of {len(combined_employees_list)} employees were matched. Cumulative time of all: {string_time_total_all}. \n'
  
  for employee_dict in time_sorted_employees:
    employee_name = employee_dict['employee']['name']
    string_time = seconds_to_string(employee_dict['time'])
    to_print_string += (f'Employee {employee_name} has accumulated {string_time}. \n')
  try: 
    await message.channel.send(to_print_string)
  except:
    buffer = StringIO(to_print_string)
    try:
      await message.channel.send("Report", file=discord.File(buffer, "report.txt"))
    except:
      print("Failed to send report.")
  return

async def send_charts(message, employees, allowed_groups):
  start_timer = time.time()
  msg_to_persist = await message.channel.send(content=f"Fetching sessions...")
  parts = message.content.split(" ")
  sessions = get_all('session_logs')
  start, end = parse_interval(parts)
  parsed_group = parse_group(parts, allowed_groups)
  parsed_member_id_list = parse_members(parts)
  combined_employees_list = get_combined_employees_list(employees, parsed_group, parsed_member_id_list)
  if len(combined_employees_list) == 0:
    combined_employees_list.append(employees[message.author.id])
  sessions_in_interval = trim_sessions_list_by_interval(sessions, start, end)
  accumulators = {}
  correlations = {}
  time_series = {}
  id_list = [employee['id'] for employee in combined_employees_list]
  sessions_count = 0
  for id in id_list:
        sessions_count += len([session for session in sessions_in_interval if session['id'] == id])

  await msg_to_persist.edit(content=f"Processing {sessions_count} sessions...")

  for id in id_list:
        _,accumulator_weekday_minutes,_,_,_,time_serie, correlation = get_accumulators(sessions_in_interval, id, correlations, id_list)
        accumulators[id] = accumulator_weekday_minutes
        time_series[id] = time_serie
        correlations[id] = correlation
  await msg_to_persist.edit(content=f"Plotting graphs...")
  prepare_graphs(accumulators, time_series, correlations, employees)
  end_timer = time.time()
  elapsed_time = "%.4f" % float(end_timer-start_timer)
  await msg_to_persist.delete()
  employees_matched_name_list = [employee['name'] for employee in combined_employees_list]
  if start and end:
    await message.channel.send(f'Generated graphs for employees {employees_matched_name_list} in {elapsed_time} seconds using {sessions_count} sessions. Used interval was {start.strftime("%m/%d/%Y")} to {end.strftime("%m/%d/%Y")}.', file=discord.File('combined.jpg'))
  else:
    await message.channel.send(f"Generated graphs for employees: {employees_matched_name_list} in {elapsed_time} seconds using {sessions_count} sessions.", file=discord.File('combined.jpg'))

async def send_self_report(message, employees):
  parts = message.content.split(" ")
  start, end = parse_interval(parts)
  employees_matched = [employee for employee in employees.values() if employee['id'] in [message.author.id]]
  if len(employees_matched) == 0:
    await message.channel.send(f"You are not an employee. Unable to generate stats.")
    return
  
  session_logs_list = get_all('session_logs')
  employee = employees_matched[0]
  logs_matched = [log for log in session_logs_list if log['id'] == employee['id']]
  cumulative_seconds = 0
  for log in logs_matched:
    if (not start and not end) or start <= log['date'] <= end:
      cumulative_seconds += log['duration']
  string_time = seconds_to_string(cumulative_seconds)

  if not start and not end:
    await message.channel.send(f'You have accumulated {string_time} in total.')
  else:
    await message.channel.send(f'You have accumulated {string_time} in between dates {start.strftime("%m/%d/%Y")} and {end.strftime("%m/%d/%Y")}.')
  return

async def add_jira(message):
  parts = message.content.split(" ")
  jira_url = parts[2]
  new_value = { "$set": {
    'jira_url':jira_url
  } }
  query = {'id':message.author.id}
  update_one(query, new_value, 'employees')
  await message.channel.send('Success. Added Jira URL. It will now be sent to you after finishing a session.')

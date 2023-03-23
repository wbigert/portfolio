from datetime import datetime, timedelta
from backend import get_all

async def auth_check(message, authorized_users):
  if message.author.id not in authorized_users:
    await message.channel.send(f'Unauthorized.')
    return False
  return True

async def check_if_employee(member, employees, report_channels):
  employee_matches = [employee for employee in employees if employee['id'] == member.id]
  if len(employee_matches) > 1:
    for channel in report_channels:
      await channel.send(f"Warning. You have duplicate employees linked to this discord user: {member}.")
  return len(employee_matches) > 0

async def auth_check(message, authorized_users):
  if message.author.id not in authorized_users:
    await message.channel.send(f'Unauthorized.')
    return False
  return True

def get_time_string_from_hour_index(hour):
  if hour < 10:
    return f"0{hour}:00"
  else:
    return f"{hour}:00"

def get_time_interval_from_hour_index(hour):
  return f"{get_time_string_from_hour_index(hour)}-{get_time_string_from_hour_index((hour + 1) % 24)}"

def get_current_time():
  now = datetime.now() + timedelta(hours = 1)
  return now

def get_current_time_string():
  now = datetime.now() + timedelta(hours = 1)
  time_string = now.strftime("%H:%M:%S")
  return time_string

def get_employee_session_time(member):
  return (get_current_time() - member[1]).total_seconds()

def seconds_to_string(seconds):
  hours, mins = divmod(seconds, 3600)  # 3600 seconds in an hour
  mins, seconds = divmod(mins, 60)
  return f"{int(hours)}h {int(mins)}m {int(seconds)}s"

def filter_employees_by_group(group, employees):
  employees_matched = []
  if group == '*':
    employees_matched = employees.values()
  else:
    employees_matched = [employee for employee in employees.values() if employee['group'] == group]
  return employees_matched

def extract_sessions_dict_from_employee_id_list(sessions, employee_id_list):
  filtered_sessions = {}
  for id in employee_id_list:
    filtered_sessions[id] = []
  for session in sessions:
    if session['id'] in employee_id_list:
      filtered_sessions[session['id']].append(session)
  return filtered_sessions

def trim_sessions_list_by_interval(sessions, start, end):
  trimmed_session_list = []
  for session in sessions:
      if (not start and not end) or start <= session['date'] <= end:
        trimmed_session_list.append(session)
  return trimmed_session_list

def parse_members(parts):
  iter = 0
  flag_found = False
  member_ids = []
  for part in parts:
    if '-e' in part.lower() or '-employees' in part.lower():
      flag_found = True
      break
    else:
      iter += 1
  if flag_found and len(parts) > iter:
    for i in range(iter+1, len(parts)):
      part = str(parts[i])
      if '<@' in part:
        id = part.strip('<@>')
        member_ids.append(int(id))
      else:
        break
    return member_ids
  else:
    return False

def parse_group(parts, allowed_groups):
  iter = 0
  flag_found = False
  for part in parts:
    if '-g' in part.lower() or '-group' in part.lower():
      flag_found = True
      break
    else:
      iter += 1
  if flag_found and len(parts) > iter:
    parsed_group = str(parts[iter+1])
    return parsed_group if parsed_group in allowed_groups or parsed_group == '*' else None
  else:
    return False

def parse_interval(parts):
  start = None
  end = None
  iter = 0
  flag_found = False
  for part in parts:
    if '-i' in part.lower() or '-interval' in part.lower():
      flag_found = True
      break
    else:
      iter += 1
  if flag_found and len(parts) > iter + 6:
    year_start = int(parts[iter+1])
    month_start = int(parts[iter+2])
    day_start = int(parts[iter+3])
    year_end = int(parts[iter+4])
    month_end = int(parts[iter+5])
    day_end = int(parts[iter+6])
    start = datetime(year_start, month_start, day_start)
    end = datetime(year_end, month_end, day_end)
    return start, end
  else:
    return False, False

def get_combined_employees_list(employees, parsed_group, parsed_member_id_list):
  combined_employees_id_list = [employee['id'] for employee in employees.values() if parsed_group == '*' or employee['group'] == parsed_group]
  if parsed_member_id_list:
    for id in parsed_member_id_list:
      if id not in combined_employees_id_list:
        combined_employees_id_list.append(id)
  
  return [employee for employee in employees.values() if employee['id'] in combined_employees_id_list]
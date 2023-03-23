import discord
import os
from discord.ext import tasks
from utilities import get_current_time_string, auth_check
from commands import add_employee, remove_employee, add_jira, send_report, send_self_report, print_employees, send_charts
from backend import get_all
from surveillance import handle_finished_sessions, handle_new_sessions, handle_ongoing_sessions
from dotenv import load_dotenv
load_dotenv()

intents = discord.Intents.all()
client = discord.Client(intents=intents)

appData = {
  'guilds_to_track': [], # Replace with the guild IDs of the guilds you want to track
  'authorized_users': [], # Replace with the user IDs of the users you want to be able to use the bot
  'active_users_tuples': [],
  'allowed_groups': ['default'],
  'report_channels': {
    'default': 0, # Replace with the channel ID of the channel you want to send reports to for this group
  },
  'employees': {},
  'ongoing_session_messages': []
}


@client.event
async def on_ready():
  print('We have logged in as {0.user}'.format(client), flush=True)
  print(get_current_time_string(), flush=True)
  appData['travel_origins'] = get_all('travel_origins')
  employees_list = get_all('employees')
  for employee in employees_list:
    appData['employees'][employee['id']] = employee

  # if not ongoing_sessions.is_running():
  #   ongoing_sessions.start() 
  if not new_and_finished_sessions.is_running():
    new_and_finished_sessions.start()

@client.event
async def on_message(message):
  try: 
    if message.author == client.user:
      return

    if message.content.lower().startswith('!stats'):
      await send_self_report(message, appData['employees'])
      return

      
    if message.content.lower().startswith('!add jira'):
      await add_jira(message)
      appData['employees'] = get_all('employees')
      return

    if message.content.startswith('!') and not await auth_check(message, appData['authorized_users']):
      return

    if message.content.lower().startswith('!graphs'):
      await send_charts(message, appData['employees'], appData['allowed_groups'])
      return

    if message.content.lower().startswith('!add employee'):
      await add_employee(message, appData['employees'], appData['allowed_groups'])
      appData['employees'] = get_all('employees')
      return

    
    if message.content.lower().startswith('!remove employee'):
      await remove_employee(message, appData['employees'])

    if message.content.lower().startswith('!employees'):
      await print_employees(message, appData['employees'])
      return

    if message.content.lower().startswith('!report'):
      await send_report(message, appData['employees'], appData['allowed_groups'])
      return
  except Exception as e:
    print(e)

# Editing 1h old messages frequently has been rate limited, so this is not used for now
# @tasks.loop(seconds=30)
# async def ongoing_sessions():
#   try:
#     await handle_ongoing_sessions(appData['active_users_tuples'], appData['employees'], client, appData['guilds_to_track'])
#   except Exception as e:
#     print(e)

@tasks.loop(seconds=1)
async def new_and_finished_sessions():
  try:
    await handle_new_sessions(appData['active_users_tuples'], appData['report_channels'], appData['employees'], client, appData['guilds_to_track'])
    await handle_finished_sessions(appData['active_users_tuples'], appData['employees'], client, appData['guilds_to_track'])
  except Exception as e:
    print(e)
  
client.run(os.environ['DISCORD_TOKEN'])
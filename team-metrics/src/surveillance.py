from utilities import get_current_time, get_employee_session_time, seconds_to_string
from backend import insert_one
import discord

def get_all_members(client, guilds_to_track):
  members = []
  for guild_id in guilds_to_track:
    guild = client.get_guild(guild_id)
    voice_list = guild.voice_channels
    for channel in voice_list:
      # if channel.id == 196565184096108545: // Ignore the AFK channel
      #   continue
      for member in channel.members:
        members.append(member)
  return members

async def handle_ongoing_sessions(active_users_tuples, employees, client, guilds_to_track):
  old_active_users_tuples = active_users_tuples
  new_active_members = get_all_members(client, guilds_to_track)
  for new_active_member in new_active_members:
    employee = employees.get(new_active_member.id)
    if not employee:
      continue 
    name = employee['name']
    for old_user_tuple in old_active_users_tuples:
      if new_active_member == old_user_tuple[0]:
        session_time_seconds = get_employee_session_time(old_user_tuple)
        session_time_stringified = seconds_to_string(session_time_seconds)
        started = old_user_tuple[1].strftime("%H:%M:%S")
        await old_user_tuple[2].edit(content=f"Ongoing session by {name}. Started: {started}. Duration: {session_time_stringified}.")
        
async def handle_new_sessions(active_users_tuples, report_channels, employees, client, guilds_to_track):
  old_active_users_tuples = active_users_tuples
  new_active_members = get_all_members(client, guilds_to_track)
  for new_active_member in new_active_members:
    employee = employees.get(new_active_member.id)
    if not employee:
      continue 
    
    name = employee['name']
    already_handled = False
    for old_user_tuple in old_active_users_tuples:
      if new_active_member == old_user_tuple[0]:
        already_handled = True
        continue

    if already_handled: 
      continue
    
    if employee['group'] in report_channels:
      channel_id = report_channels[employee['group']]
      for guild_id in guilds_to_track:
        guild = client.get_guild(guild_id)
        for channel in guild.channels:
          if channel.id == channel_id:
            started = get_current_time().strftime("%H:%M:%S")
            try:
              message = await channel.send(f"Ongoing session by {name}. Started: {started}.")
            except:
              print("Failed to send session start message.")
            active_users_tuples.append((new_active_member, get_current_time(), message))
            return
    else:
      print("Warning. Employee without group not tracked.", flush=True)
              
          
async def handle_finished_sessions(active_users_tuples, employees, client, guilds_to_track):
  old_active_users_tuples = active_users_tuples
  new_active_members = get_all_members(client, guilds_to_track)
  
  for old_user_tuple in old_active_users_tuples:
      old_member = old_user_tuple[0]
      employee = employees.get(old_member.id)
      if not employee:
        continue
      name = employee['name']
    
      if old_member not in new_active_members:
        started = old_user_tuple[1].strftime("%H:%M:%S")
        session_time_seconds = get_employee_session_time(old_user_tuple)
        session_time_stringified = seconds_to_string(session_time_seconds)
        url = employee['jira_url']
        embed = discord.Embed()
        embed.title = f'Started: {started} \nDuration: {session_time_stringified}'
        embed.add_field(name='Jira link: ' ,value=f"[--> Click here <--]({url})", inline=False)
        #continue like nothing happened and don't print anything
        try:
          await old_member.send(embed=embed)
        except:
          pass
        
        to_insert = {
          'id':old_member.id,
          'date':get_current_time(),
          'duration':session_time_seconds
        }
        insert_one(to_insert, 'session_logs')
        old_message = old_user_tuple[2]
        channel = old_message.channel
        try:
          await old_message.delete()
          await channel.send(content=f"Session finished by {name}. Started: {started}. Duration: {session_time_stringified}.")
        except:
          print("Failed to handle finished session messages.")
        active_users_tuples.remove(old_user_tuple)




import discord
import os
from discord.ext import tasks
import random
from datetime import datetime
from backend import purge, get_all, delete_one, update_one
from utilities import get_current_time_string, get_voice_from_phrase

intents = discord.Intents.all()
client = discord.Client(intents=intents)
appData = {
  "current_guild": None,
  "current_voice_channel": None,
  "is_playing": False,
  "current_voice_client": None,
  "offset": 5,
  "guilds_to_follow": []
}

@client.event
async def on_ready():
  print('We have logged in as {0.user}'.format(client))
  print(get_current_time_string())
  myLoop.start()

@client.event
async def on_message(message):
  print(f"message: {message}", flush=True)
  if message.author == client.user:
    return

  print(f"appData: {message.content}", flush=True)
  if message.content.lower().startswith('join'):
      print("join", flush=True)
      if appData["current_voice_client"]:
          await appData["current_voice_client"].disconnect()
          appData["current_guild"] = None
          appData["current_voice_channel"] = None
          appData["current_voice_client"] = None

      appData["current_guild"] = message.guild
      appData["current_voice_channel"] = message.author.voice.channel
      appData["current_voice_client"] = await message.author.voice.channel.connect()
      print(f"assigned voice client appData: {appData}", flush=True)

  if message.content.lower().startswith('leave'):
      if (appData["current_voice_channel"]):
          appData["current_guild"] = None
          appData["current_voice_channel"] = None
          appData["current_voice_client"] = None
          await message.guild.voice_client.disconnect()

  if message.content.lower().startswith('purge'):
      await message.channel.send(f'Purging...')
      await message.channel.send(f'Before: {await get_all("league_tracker")}.')
      await purge("league_tracker")
      await message.channel.send(f'After: {await get_all("league_tracker")}.')

  if message.content.lower().startswith('print'):
      await message.channel.send(f'{await get_all("league_tracker")}')

def get_phrase_intro(new_dict):
  champion = new_dict['champion_name']
  cooldown = int(get_time_diff_seconds(new_dict)) - appData['offset']
  tracker_type = new_dict['tracker_type']
  responses = {
    'flash':f'{champion} använde Flash. Den är uppe om {cooldown} sekunder.',
    'ultimate':f'{champion} använde ult. Den är uppe om {cooldown} sekunder.',
    'ward':f'{champion} lade ned en ward. Den är borta om {cooldown} sekunder.'
  }
  return responses[tracker_type]

def play_mp3(file):
  if appData['current_voice_client'] and appData['current_voice_client'].is_connected():
      print('is connected')          
      audio_source = discord.FFmpegPCMAudio(file)
      appData['current_voice_client'].stop()
      appData['current_voice_client'].play(audio_source, after = None)
  else:
      print('not connected or no voice client')

def get_phrase_tracker(tracker_dict):
  champion = tracker_dict['champion_name']
  cooldown = int(get_time_diff_seconds(tracker_dict)) - appData["offset"]
  tracker_type = tracker_dict['tracker_type']
  responses = {
    'flash':f'Varning. {champion} har flash uppe om {cooldown} sekunder.',
    'ultimate':f'Varning. {champion} har ult uppe om {cooldown} sekunder.',
    'ward':f'Information. Ward för {champion} försvinner om {cooldown} sekunder'
  }
  return responses[tracker_type] 

def get_phrase_finished(tracker_dict):
  champion = tracker_dict['champion_name']
  tracker_type = tracker_dict['tracker_type']
  responses = {
    'flash':f'Varning. {champion} har nu flash uppe.',
    'ultimate':f'Varning. {champion} har nu ult uppe.',
    'ward':f'Information. Ward för {champion} är nu nere.'
  }
  return responses[tracker_type]

def get_phrase_zhonyas(tracker_dict):
  champion = tracker_dict['champion_name']
  return f'Varning. {champion} har precis köpt såånias Hourglass.' 

def get_phrase_stopwatch(tracker_dict):
  champion = tracker_dict['champion_name']
  return f'Varning. {champion} har precis fått en Stopwatch.' 

def get_time_diff_seconds(tracker_dict):
  end = tracker_dict['end_time']
  d1 = datetime.strptime(get_current_time_string(),"%H:%M:%S")
  d2 = datetime.strptime(end,"%H:%M:%S")
  diff = (d2-d1).total_seconds()
  return diff

@tasks.loop(seconds=1)
async def myLoop():
  documents = await get_all('league_tracker')
  for document in documents:
    if document['tracker_type'] == 'ping':
      get_voice_from_phrase('ping pong')
      play_mp3('new_output.mp3')
      query = {'_id':document['_id']}
      await delete_one(query,'league_tracker')
      continue
    if document['tracker_type'] == 'game_start':
      get_voice_from_phrase(document['description'])
      play_mp3('new_output.mp3')
      query = {'_id':document['_id']}
      await delete_one(query,'league_tracker')
      continue
    if document['tracker_type'] == 'game_finished':
      print(f'Purging...')
      print(f'Before: {await get_all("league_tracker")}.')
      await purge("league_tracker")
      print(f'After: {await get_all("league_tracker")}.')
      break
      
    if document['tracker_type'] == 'zhonyas':
      phrase = get_phrase_zhonyas(document)
      get_voice_from_phrase(phrase)
      play_mp3('new_output.mp3')
      query = {'_id':document['_id']}
      await delete_one(query,'league_tracker')
      continue
    if document['tracker_type'] == 'stopwatch':
      phrase = get_phrase_stopwatch(document)
      get_voice_from_phrase(phrase)
      play_mp3('new_output.mp3')
      query = {'_id':document['_id']}
      await delete_one(query,'league_tracker')
      continue

    diff = get_time_diff_seconds(document) - appData['offset']
    if diff <= 0:
      phrase = get_phrase_finished(document)
      get_voice_from_phrase(phrase)
      play_mp3('new_output.mp3')
      query = {'_id':document['_id']}
      await delete_one(query,'league_tracker')
      continue
    if not document['has_introduced']:
      print('INTRODUCING')
      phrase = get_phrase_intro(document)
      get_voice_from_phrase(phrase)
      play_mp3('new_output.mp3')
      query = {'_id':document['_id']}
      new_value = { "$set": {'has_introduced':True} }
      await update_one(query, new_value,'league_tracker')
      continue
    elif not document['has_warned'] and diff <= 20 and diff > 2:
      print("WARNING")
      phrase = get_phrase_tracker(document)
      get_voice_from_phrase(phrase)
      play_mp3('new_output.mp3')
      query = {'_id':document['_id']}
      new_value = { "$set": {'has_warned':True} }
      await update_one(query, new_value,'league_tracker')
      continue
    
client.run(os.environ['DISCORD_TOKEN'])
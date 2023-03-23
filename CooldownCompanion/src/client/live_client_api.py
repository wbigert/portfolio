import requests

def get_player_list():
  URL = "https://127.0.0.1:2999/liveclientdata/playerlist"
  headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'}
  headers['Authentication'] = "RGAPI-24fa9c28-6d72-48c6-91ed-5576b963dd2d"
  r = requests.get(url = URL, headers = headers, verify=False)
  player_list = r.json()
  return player_list

def get_unique_takedowns(player_name):
  URL = "https://127.0.0.1:2999/liveclientdata/eventdata"

  headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'}
  r = requests.get(url = URL, headers = headers, verify=False)
  event_list = r.json()
  count = 0
  playersTakenDown = []
  for event in event_list['Events']:
    if event['EventName'] == 'ChampionKill' and event['VictimName'] not in playersTakenDown:
      if player_name in event['Assisters'] or player_name in event['KillerName']:
        playersTakenDown.append(event['VictimName'])
        count = count + 1
  return count

def get_time_elapsed():
  URL = "https://127.0.0.1:2999/liveclientdata/gamestats"
  headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'}
  r = requests.get(url = URL, headers = headers, verify=False)
  game_stats = r.json()
  return (game_stats['gameTime']/60)

def get_player_name():
  URL = "https://127.0.0.1:2999/liveclientdata/activeplayername"
  headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'}
  r = requests.get(url = URL, headers = headers, verify=False)
  game_stats = r.json()
  return game_stats

def is_in_aram():
  URL = "https://127.0.0.1:2999/liveclientdata/gamestats"
  headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'}
  r = requests.get(url = URL, headers = headers, verify=False)
  data = r.json()
  gameMode = data['gameMode']
  print(f'Game Mode: {gameMode}')
  return True if 'ARAM' in gameMode else False
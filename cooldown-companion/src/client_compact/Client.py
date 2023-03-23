import keyboard
import sys
from datetime import datetime, timedelta
import requests
from pymongo import MongoClient
import pymongo
import threading
from bs4 import BeautifulSoup
import urllib3
import time
import os
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
from dotenv import load_dotenv
load_dotenv()


def get_database():
    import certifi
    ca = certifi.where()
    client = MongoClient(os.environ['CONNECTION_STRING'], tlsCAFile=ca)
    return client[os.environ['DB_NAME']]
    
def insert_one(item):
    db = get_database()
    collection_name = db["league_tracker"]
    collection_name.insert_one(item)

def get_all():
  db = get_database()
  # Create a new collection
  collection_name = db["league_tracker"]

  item_details = collection_name.find()
  array = list(item_details)
  return array

def get_player_list():
  URL = "https://127.0.0.1:2999/liveclientdata/playerlist"
  headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'}
  headers['Authentication'] = "RGAPI-24fa9c28-6d72-48c6-91ed-5576b963dd2d"
  r = requests.get(url = URL, headers = headers, verify=False)
  player_list = r.json()
  return player_list

def get_all_legendary_items():
  URL = "https://leagueoflegends.fandom.com/wiki/Legendary_item"
  
  r = requests.get(url = URL, verify=False)
  soup = BeautifulSoup(r.text, 'html.parser', flush=True)
  newSoup = soup.find('div', {'class':'columntemplate'})
  all_legendary_items = [i.get('data-item') for i in newSoup.findAll('span')]
  adjusted = []
  for i in range(len(all_legendary_items)):
    if i % 3 == 0:
      adjusted.append(all_legendary_items[i])

  return adjusted

def get_all_haste_items():
  URL = "https://leagueoflegends.fandom.com/wiki/Ability_haste"
  
  r = requests.get(url = URL, verify=False)
  soup = BeautifulSoup(r.text, 'html.parser')
  newSoup = soup.find('table', {'class':'wikitable sortable'})

  tableRows = newSoup.find('tr')
  list_cooldowns = [i.text for i in newSoup.findAll('td')]
  adjusted_cooldowns = []
  for i in range(2,len(list_cooldowns),4):
    adjusted_cooldowns.append(list_cooldowns[i])

  list_names = [i.text for i in newSoup.findAll('span', {'class':'sortkey'})]
  adjusted_names = []
  for i in range(len(list_names)):
    if i % 2 == 0:
      adjusted_names.append(list_names[i])
  items = {}
  for i in range(len(adjusted_names)):
    items[adjusted_names[i]] = adjusted_cooldowns[i]
  return items

def get_runes_from_summoner_id(summoner_id):
  headers = {}
  headers['User-Agent'] = "Lungfisk/definitely not stealing ur dataz"
  URL = f"https://euw.op.gg/summoner/ajax/popupRuneMastery3/summonerId={summoner_id}"
  r = requests.get(url = URL, headers = headers)
  soup = BeautifulSoup(r.text, 'html.parser')
  list = [i  for i in soup.findAll('img',{"class": "tip"})]
  new_list = []
  for item in list:
    if ('Ability Haste' in item.get('title') or 'Summoner Spell Haste' in item.get('title')) and not 'grayscale' in item.get('src'):
      new_list.append(item.get('alt'))
    else:
      continue
  return new_list

def has_stopwatch_from_summoner_id(summoner_id):
  headers = {}
  headers['User-Agent'] = "Lungfisk/definitely not stealing ur dataz"
  URL = f"https://euw.op.gg/summoner/ajax/popupRuneMastery3/summonerId={summoner_id}"
  r = requests.get(url = URL, headers = headers)
  soup = BeautifulSoup(r.text, 'html.parser')
  list = [i  for i in soup.findAll('img',{"class": "tip"})]

  for item in list:
    if 'Perfect Timing' in item.get('alt') and not 'grayscale' in item.get('src'):
      return True
  return False

def get_all_summoner_id_from_username(username):
  headers = {}
  headers['User-Agent'] = "Lungfisk/definitely not stealing ur dataz"
  print('getting ids', flush=True)
  print(username, flush=True)
  URL = f"https://euw.op.gg/summoner/spectator/userName={username}&"
  r = requests.get(url = URL, headers = headers)
  soup = BeautifulSoup(r.text, 'html.parser')
  list = [i.get('id')[19:] for i in soup.findAll('tr',id=lambda x: x and x.startswith('SpectateBigListRow-'))]
  return list

def get_runes_bool_list(runes, find):
  list = []
  for i in range(len(runes)):
    if find in runes[i]:
      list.append(True)
    else:
      list.append(False)
  return list

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

def get_haste_list(pre_game_dict, player_list, player):
  unique_takedowns = get_unique_takedowns(player_list[player]['summonerName'])
  haste_runes_of_all_players = pre_game_dict['haste_runes_of_all_players']
  all_haste_items = pre_game_dict['all_haste_items']
  all_legendary_items = pre_game_dict['all_legendary_items']

  ability_haste_total = 0
  ultimate_haste_total = 0
  summoner_spell_haste_total = 70 if pre_game_dict['is_in_aram'] else 0
  ability_haste_passive_mythics = {
    'Duskblade of Draktharr':5,
    'Goredrinker':5,
    'Liandry\'s Anguish':5,
    'Night Harvester':5,
    'Shurelya\'s Battlesong':5,
    'Trinity Force':3,
    'Turbo Chemtank':5
  }
  print(haste_runes_of_all_players, flush=True)
  if len(haste_runes_of_all_players['ultimate_hunter_list']) > 0 or len(haste_runes_of_all_players['offense_cdr_list']) > 0 or len(haste_runes_of_all_players['transendence_list']) > 0 or len(haste_runes_of_all_players['cosmic_insight_list']) > 0:

    print('Checking runes.', flush=True)
    if haste_runes_of_all_players['ultimate_hunter_list'][player]:
      ultimate_haste_total+=6 + unique_takedowns*5
      #print(f'adding {6+(unique_takedowns*5)} ultimate haste from ultimate hunter')

    if haste_runes_of_all_players['offense_cdr_list'][player]:
      ability_haste_total+=8
      #print(f'adding {8} ability haste from offense_cdr')

    if haste_runes_of_all_players['transendence_list'][player]:
      if player_list[player]['level'] > 7:
        ability_haste_total+=10
        #print(f'adding {10} ability haste from transendence')
      elif player_list[player]['level'] > 4:
        ability_haste_total+=5
        #print(f'adding {5} ability haste from transendence')
    
    if haste_runes_of_all_players['cosmic_insight_list'][player]:
      summoner_spell_haste_total+=18
      #print(f'adding {18} summoner spell haste from cosmic insight')

  has_ability_haste_mythic = False
  ability_haste_per_legendary = 0
  for item in player_list[player]['items']:
    if item['displayName'] in ability_haste_passive_mythics:
      has_ability_haste_mythic = True
      ability_haste_per_legendary = ability_haste_passive_mythics[item['displayName']]
      break
  
  if (has_ability_haste_mythic):
    for item in player_list[player]['items']:
      if item['displayName'] in all_legendary_items:
        ability_haste_total+=ability_haste_per_legendary
        #print(f'adding {ability_haste_per_legendary} ability haste')

  #print(all_haste_items)
  for item in player_list[player]['items']:
    if item['displayName'] == 'Ionian Boots of Lucidity':
      summoner_spell_haste_total+=12
      #print(f'adding {12} summoner spell haste from transendence')
    if item['displayName'] in all_haste_items:
      ability_haste_total+=int(all_haste_items[item['displayName']])
      amount = int(all_haste_items[item['displayName']])
      name = item['displayName']
      #print(f'adding {amount} ability haste from item {name}')
  return {'ability_haste':ability_haste_total,'ultimate_haste':ultimate_haste_total,'summoner_spell_haste':summoner_spell_haste_total}

def get_haste_runes_of_all_players(summoner_id_list):
  runes_list = []
  for id in summoner_id_list:
   runes_list.append(get_runes_from_summoner_id(id))
   print(runes_list, flush=True)
  uh_list = get_runes_bool_list(runes_list, 'Ultimate Hunter')
  offense_list = get_runes_bool_list(runes_list, 'Offense')
  transcendence_list = get_runes_bool_list(runes_list, 'Transcendence')
  cosmic_list = get_runes_bool_list(runes_list, 'Cosmic Insight')
  return {'ultimate_hunter_list':uh_list,'offense_cdr_list':offense_list, 'transendence_list':transcendence_list,'cosmic_insight_list':cosmic_list}

def get_stopwatch_list(summoner_id_list):
  stopwatch_list = []
  for id in summoner_id_list:
   stopwatch_list.append(has_stopwatch_from_summoner_id(id))
  return stopwatch_list

def get_player_name():
  URL = "https://127.0.0.1:2999/liveclientdata/activeplayername"
  headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'}
  r = requests.get(url = URL, headers = headers, verify=False)
  game_stats = r.json()
  return game_stats

def get_all_champions_data():
  headers = { 'Accept': 'application/json'}
  URL = 'https://ddragon.leagueoflegends.com/api/versions.json'
  r = requests.get(url = URL, headers = headers, verify=False)
  latest_version = (r.json()[0])
  print(f"Latest version:{latest_version}", flush=True)
  URL = f"http://ddragon.leagueoflegends.com/cdn/{latest_version}/data/en_US/champion.json"

  r = requests.get(url = URL, headers = headers, verify=False)
  return r.json()

def get_all_champion_name_to_id_dict(all_champions_data):
  name_to_id = {}
  data = all_champions_data['data']
  for key in data.keys():
    champion = data[key]
    name_to_id[champion['name']] = champion['id']
  return name_to_id

def get_specific_champion_data(pre_game_dict, champion_name):

  headers = { 'Accept': 'application/json'}
  URL = 'https://ddragon.leagueoflegends.com/api/versions.json'
  r = requests.get(url = URL, headers = headers, verify=False)
  latest_version = (r.json()[0])

  name_to_id = pre_game_dict['champion_name_to_id_dict']
  URL = f'http://ddragon.leagueoflegends.com/cdn/{latest_version}/data/en_US/champion/{name_to_id[champion_name]}.json'
  
  r = requests.get(url = URL, headers = headers, verify=False)
  return r.json()

def get_ultimate_cooldown(champion_level, champion_data, haste_list): 
  keys = champion_data['data'].keys()
  ult_cooldowns = champion_data['data'][list(keys)[0]]['spells'][3]['cooldown']
  if champion_level >= 16:
    base_cd = ult_cooldowns[2]
  elif champion_level >= 11:
    base_cd = ult_cooldowns[1]
  else:
    base_cd = ult_cooldowns[0]

  ultimate_haste_to_cdr = 1 - (1 / (1 + (haste_list['ultimate_haste']/100)))
  print(f"Converted {haste_list['ultimate_haste']} ultimate haste to {str(ultimate_haste_to_cdr)} cooldown reduction.", flush=True)
  ultimate_haste_new_cd = base_cd*(1-ultimate_haste_to_cdr)
  ability_haste_to_cdr = 1 - (1 / (1 + (haste_list['ability_haste']/100)))
  print(f"Converted {haste_list['ability_haste']} ability_haste to {str(ability_haste_to_cdr)} cooldown reduction.", flush=True)
  ability_haste_new_cd = ultimate_haste_new_cd*(1-ability_haste_to_cdr)
  return ability_haste_new_cd
  
def get_flash_cooldown(haste_list):
  base_cd = 300
  summoner_spell_haste_to_cdr = 1 - (1 / (1 + (haste_list['summoner_spell_haste']/100)))
  print(f"converted {haste_list['summoner_spell_haste']} summoner spell haste to {str(summoner_spell_haste_to_cdr)} cooldown reduction.", flush=True)
  new_cd = base_cd*(1-summoner_spell_haste_to_cdr)
  return new_cd

def is_in_aram():
  # URL = '​​https://127.0.0.1:2999/liveclientdata/activeplayer'
  # headers = { 'Accept': 'application/json'}
  # r = requests.get(url = URL, headers = headers, verify=False)
  # data = r.json()
  # gameMode = data['championStats']
  # print(f'championStats: {data}', flush=True)
  # 
  URL = "https://127.0.0.1:2999/liveclientdata/gamestats"
  headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'}
  r = requests.get(url = URL, headers = headers, verify=False)
  data = r.json()
  gameMode = data['gameMode']
  print(f'Game Mode: {gameMode}', flush=True)
  return True if 'ARAM' in gameMode else False

def handle_flash(player):
  global cd_offset
  global has_init
  print(f'Handling flash for player: {player}', flush=True)
  if not has_init:
    print('Not initialized. Returning.', flush=True)
    return
  
  print('Fetching player list...', flush=True)
  player_list = get_player_list()
  print('Fetching haste list...', flush=True)
  haste_list = get_haste_list(pre_game_dict, player_list, player)
  print('Fetching flash cooldown...', flush=True)
  cd = get_flash_cooldown(haste_list)
  print('Calculating cooldown end time...', flush=True)
  start = datetime.now() 
  end = start + timedelta(seconds = cd) - timedelta(seconds = cd_offset)
  end_string = end.strftime("%H:%M:%S")
  champion_name = player_list[player]['championName']

  db_item = {
        "end_time":end_string,
        "champion_name":champion_name,
        "has_introduced":False,
        "has_warned":False,
        "tracker_type":"flash"
  }
  print('Inserting into database...', flush=True)
  insert_one(db_item)
  print('Successfully handled flash!', flush=True)
  

def handle_ult(player):
  global pre_game_dict
  global cd_offset
  global has_init
  print(f'Handling ult for player: {player}', flush=True)
  if not has_init:
    print('Not initialized. Returning.', flush=True)
    return
  
  print('Fetching player list...', flush=True)
  player_list = get_player_list()
  print('Fetching haste list...', flush=True)
  haste_list = get_haste_list(pre_game_dict, player_list, player)
  print('Fetching player level...', flush=True)
  champion_level = player_list[player]['level']
  print('Fetching specific champion data...', flush=True)
  champion_data = get_specific_champion_data(pre_game_dict, player_list[player]['championName'])
  print('Fetching ultimate cooldown...', flush=True)
  cd = get_ultimate_cooldown(champion_level, champion_data, haste_list)

  print('Calculating cooldown end time...', flush=True)
  start = datetime.now() 
  end = start + timedelta(seconds = cd) - timedelta(seconds = cd_offset)
  end_string = end.strftime("%H:%M:%S")
  champion_name = player_list[player]['championName']

  db_item = {
          "end_time":end_string,
          "champion_name":champion_name,
          "has_introduced":False,
          "has_warned":False,
          "tracker_type":"ultimate"
  }
  print('Inserting into database...', flush=True)
  insert_one(db_item)
  print('Successfully handled ultimate!', flush=True)
  

def ping():
  db_item = {
            "tracker_type":"ping"
  }
  print('Inserting into database...', flush=True)
  insert_one(db_item)

def item_checker ():
  while True:
    player_list = get_player_list()
    players_to_check = [0+offset, 1+offset, 2+offset, 3+offset, 4+offset]
    
    for player in players_to_check:
      if player in players_warned_zhonyas and player in players_warned_stopwatch:
        continue
      for item in player_list[player]['items']:
          if item['displayName'] == 'Zhonya\'s Hourglass' and not player in players_warned_zhonyas:
            print('Found Zhonyas...', flush=True)
            players_warned_zhonyas.append(player)
            champion_name = player_list[player]['championName']
            now = datetime.now().strftime("%H:%M:%S")
            db_item = {
                    "end_time":now,
                    "champion_name":champion_name,
                    "has_introduced":False,
                    "has_warned":False,
                    "tracker_type":"zhonyas"
            }
            print('Inserting into database...', flush=True)
            insert_one(db_item)
            print('Success!', flush=True)
          if item['displayName'] == 'Stopwatch' and not player in players_warned_stopwatch:
            print('Found Stopwatch...', flush=True)
            players_warned_stopwatch.append(player)
            champion_name = player_list[player]['championName']
            now = datetime.now().strftime("%H:%M:%S")
            db_item = {
                    "end_time":now,
                    "champion_name":champion_name,
                    "has_introduced":False,
                    "has_warned":False,
                    "tracker_type":"stopwatch"
            }
            print('Inserting into database...', flush=True)
            insert_one(db_item)
            print('Success!', flush=True)
    time.sleep(2)


def init():
  global offset
  global pre_game_dict
  player_name = get_player_name()
  print(f'Your player_name for offset:{player_name}', flush=True)
  player_list = get_player_list()
  print('Player names in order:', flush=True)
  for player in player_list:
    print(player['summonerName'])
    print(player['team'])
  count = 0
  for player in player_list:
    if player['summonerName'] != player_name:
      count += 1
    elif player['summonerName'] == player_name:
      count += 1
      break
  if count < 6:
    offset = 5
  else:
    offset = 0     
  summoner_id_list = get_all_summoner_id_from_username(player_list[0]['summonerName'])
  print('getting haste runes', flush=True)
  print(summoner_id_list, flush=True)
  haste_runes_of_all_players = get_haste_runes_of_all_players(summoner_id_list)
  all_haste_items = get_all_haste_items()
  all_legendary_items = get_all_legendary_items()
  all_champions_data = get_all_champions_data()
  name_to_id = get_all_champion_name_to_id_dict(all_champions_data)
  aram = is_in_aram()
  pre_game_dict = {
    'haste_runes_of_all_players':haste_runes_of_all_players,
    'all_haste_items':all_haste_items,
    'all_legendary_items':all_legendary_items,
    'champion_name_to_id_dict': name_to_id,
    'is_in_aram': aram}

def key_tracker():
      keyboard.add_hotkey('ctrl+shift+1', lambda: handle_flash(0 + offset))
      keyboard.add_hotkey('ctrl+shift+2', lambda: handle_flash(1 + offset))
      keyboard.add_hotkey('ctrl+shift+3', lambda: handle_flash(2 + offset))
      keyboard.add_hotkey('ctrl+shift+4', lambda: handle_flash(3 + offset))
      keyboard.add_hotkey('ctrl+shift+5', lambda: handle_flash(4 + offset))

      keyboard.add_hotkey('ctrl+alt+1', lambda: handle_ult(0 + offset))
      keyboard.add_hotkey('ctrl+alt+2', lambda: handle_ult(1 + offset))
      keyboard.add_hotkey('ctrl+alt+3', lambda: handle_ult(2 + offset))
      keyboard.add_hotkey('ctrl+alt+4', lambda: handle_ult(3 + offset))
      keyboard.add_hotkey('ctrl+alt+5', lambda: handle_ult(4 + offset))
      keyboard.add_hotkey('ctrl+shift+s', lambda: ping())
      keyboard.wait()

def is_ingame():
  try:
    player_list = get_player_list()
    if not len(player_list) == 10:
      print('Player list invalid length.', flush=True)
      return False
    count = 0
    for i in range(5):
      if not player_list[i]['team'] == 'ORDER':
        return False
    for i in range(5,10):
      if not player_list[i]['team'] == 'CHAOS':
        return False
  except:
    return False
  return True

def run():
  global is_running
  global has_init
  global players_warned_stopwatch
  global players_warned_zhonyas
  is_running = True
  t1 = threading.Thread(target = key_tracker)
  t1.start()
  has_init = False
  while True:
    print('Attempting to initialize...', flush=True)
    ingame = is_ingame()
    if ingame and not has_init:
      print('Found game. Initializing...', flush=True)
      time.sleep(1)
      
      #try:
      name = get_player_name()
      db_item = {
          "tracker_type":"game_start",
          "description":f"Anslöt med klient för {name}."
      }
      print('Inserting into database...', flush=True)
      insert_one(db_item)
      init()
      #except:
        # print('Unexpected initialization failure. Retrying.', flush=True)
        # continue
      print ('Successfully initialized!', flush=True)
      print('You can now press ctrl + shift + 1/2/3/4/5 to track flashes.', flush=True)
      print('You can now press ctrl + alt + 1/2/3/4/5 to track ultimates.', flush=True)
      print('The numbers are dependent on the original scoreboard order.', flush=True)
      print('This application does not support reordering of the scoreboard.', flush=True)
      print('Starting item checker (blocks main thread until game is over).', flush=True)
      has_init = True
      try:
        item_checker()
      except:
        db_item = {
            "tracker_type":"game_finished",
            "description":f"Spel avslutat. Rensar databasen."
        }
        print('Inserting into database...', flush=True)
        insert_one(db_item)
        players_warned_stopwatch = []
        players_warned_zhonyas = []
        print('Exiting item checker.', flush=True)
        
    elif not ingame and has_init:
      print('Game ended. Returning to loop.', flush=True)
      has_init = False
    else:
      print('Failed. You are not in-game.', flush=True)
      print('Retrying in 1 seconds...', flush=True)
      time.sleep(1)

pre_game_dict = {}
offset = 0
cd_offset = 9
players_warned_zhonyas = []
players_warned_stopwatch = []
is_running = False
has_init = False

run()


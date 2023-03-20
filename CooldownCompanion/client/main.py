import keyboard
from datetime import datetime, timedelta
import requests
import threading
import urllib3
import time
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

from backend import insert_one
from live_client_api import get_player_name, get_player_list, is_in_aram
from ddragon_api import get_specific_champion_data, get_all_champions_data
from utilities import get_flash_cooldown, get_haste_list, get_ultimate_cooldown, get_haste_runes_of_all_players, get_all_champion_name_to_id_dict
from web_scraping import get_all_summoner_id_from_username, get_all_haste_items, get_all_legendary_items

def handle_flash(player, pre_game_dict):
  cd_offset = pre_game_dict['cd_offset']
  print(f'Handling flash for player: {player}', flush=True)
  # if not has_init:
  #   print('Not initialized. Returning.')
  #   return
  
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
  

def handle_ult(player, pre_game_dict):

  cd_offset = pre_game_dict['cd_offset']
  
  print(f'Handling ult for player: {player}', flush=True)
  # if not has_init:
  #   print('Not initialized. Returning.')
  #   return
  
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

def item_checker (offset):
  players_warned_stopwatch = []
  players_warned_zhonyas = []
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
  offset = 0
  pre_game_dict = {}
  player_name = get_player_name()
  print(f'Your player_name for offset:{player_name}', flush=True)
  player_list = get_player_list()
  print('Player names in order:', flush=True)
  for player in player_list:
    print(player['summonerName'], flush=True)
    print(player['team'], flush=True)
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
    'is_in_aram': aram,
    'offset':offset,
    'cd_offset':9}
  return pre_game_dict

def key_tracker(pre_game_dict):
      offset = pre_game_dict['offset']
      keyboard.add_hotkey('ctrl+shift+1', lambda: handle_flash(0 + offset,pre_game_dict))
      keyboard.add_hotkey('ctrl+shift+2', lambda: handle_flash(1 + offset,pre_game_dict))
      keyboard.add_hotkey('ctrl+shift+3', lambda: handle_flash(2 + offset,pre_game_dict))
      keyboard.add_hotkey('ctrl+shift+4', lambda: handle_flash(3 + offset,pre_game_dict))
      keyboard.add_hotkey('ctrl+shift+5', lambda: handle_flash(4 + offset,pre_game_dict))

      keyboard.add_hotkey('ctrl+alt+1', lambda: handle_ult(0 + offset,pre_game_dict))
      keyboard.add_hotkey('ctrl+alt+2', lambda: handle_ult(1 + offset,pre_game_dict))
      keyboard.add_hotkey('ctrl+alt+3', lambda: handle_ult(2 + offset,pre_game_dict))
      keyboard.add_hotkey('ctrl+alt+4', lambda: handle_ult(3 + offset,pre_game_dict))
      keyboard.add_hotkey('ctrl+alt+5', lambda: handle_ult(4 + offset,pre_game_dict))
      keyboard.add_hotkey('ctrl+shift+s', lambda: ping())
      keyboard.wait()



def run():

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
      pre_game_dict = init()
      t1 = threading.Thread(target = key_tracker(pre_game_dict))
      t1.start()
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

cd_offset = 9
is_running = False
has_init = False
run()


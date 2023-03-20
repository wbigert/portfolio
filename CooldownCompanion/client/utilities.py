from web_scraping import get_runes_from_summoner_id, has_stopwatch_from_summoner_id
from live_client_api import get_player_list, get_unique_takedowns

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

def get_runes_bool_list(runes, find):
  list = []
  for i in range(len(runes)):
    if find in runes[i]:
      list.append(True)
    else:
      list.append(False)
  return list

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
  print(haste_runes_of_all_players)
  if len(haste_runes_of_all_players['ultimate_hunter_list']) > 0 or len(haste_runes_of_all_players['offense_cdr_list']) > 0 or len(haste_runes_of_all_players['transendence_list']) > 0 or len(haste_runes_of_all_players['cosmic_insight_list']) > 0:

    print('Checking runes.', flush=True)
    if haste_runes_of_all_players['ultimate_hunter_list'][player]:
      ultimate_haste_total+=6 + unique_takedowns*5
      #print(f'adding {6+(unique_takedowns*5)} ultimate haste from ultimate hunter', flush=True)

    if haste_runes_of_all_players['offense_cdr_list'][player]:
      ability_haste_total+=8
      #print(f'adding {8} ability haste from offense_cdr', flush=True)

    if haste_runes_of_all_players['transendence_list'][player]:
      if player_list[player]['level'] > 7:
        ability_haste_total+=10
        #print(f'adding {10} ability haste from transendence', flush=True)
      elif player_list[player]['level'] > 4:
        ability_haste_total+=5
        #print(f'adding {5} ability haste from transendence', flush=True)
    
    if haste_runes_of_all_players['cosmic_insight_list'][player]:
      summoner_spell_haste_total+=18
      #print(f'adding {18} summoner spell haste from cosmic insight', flush=True)

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
        #print(f'adding {ability_haste_per_legendary} ability haste', flush=True)

  #print(all_haste_items)
  for item in player_list[player]['items']:
    if item['displayName'] == 'Ionian Boots of Lucidity':
      summoner_spell_haste_total+=12
      #print(f'adding {12} summoner spell haste from transendence', flush=True)
    if item['displayName'] in all_haste_items:
      ability_haste_total+=int(all_haste_items[item['displayName']])
      amount = int(all_haste_items[item['displayName']])
      name = item['displayName']
      #print(f'adding {amount} ability haste from item {name}', flush=True)
  return {'ability_haste':ability_haste_total,'ultimate_haste':ultimate_haste_total,'summoner_spell_haste':summoner_spell_haste_total}

def get_haste_runes_of_all_players(summoner_id_list):
  runes_list = []
  for id in summoner_id_list:
   runes_list.append(get_runes_from_summoner_id(id))
   print(runes_list)
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

def get_all_champion_name_to_id_dict(all_champions_data):
  name_to_id = {}
  data = all_champions_data['data']
  for key in data.keys():
    champion = data[key]
    name_to_id[champion['name']] = champion['id']
  return name_to_id

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
  print(f"Converted {haste_list['ultimate_haste']} ultimate haste to {str(ultimate_haste_to_cdr)} cooldown reduction.")
  ultimate_haste_new_cd = base_cd*(1-ultimate_haste_to_cdr)
  ability_haste_to_cdr = 1 - (1 / (1 + (haste_list['ability_haste']/100)))
  print(f"Converted {haste_list['ability_haste']} ability_haste to {str(ability_haste_to_cdr)} cooldown reduction.")
  ability_haste_new_cd = ultimate_haste_new_cd*(1-ability_haste_to_cdr)
  return ability_haste_new_cd

def get_flash_cooldown(haste_list):
  base_cd = 300
  summoner_spell_haste_to_cdr = 1 - (1 / (1 + (haste_list['summoner_spell_haste']/100)))
  print(f"converted {haste_list['summoner_spell_haste']} summoner spell haste to {str(summoner_spell_haste_to_cdr)} cooldown reduction.")
  new_cd = base_cd*(1-summoner_spell_haste_to_cdr)
  return new_cd


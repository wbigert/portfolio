import requests
from bs4 import BeautifulSoup

def get_all_legendary_items():
  URL = "https://leagueoflegends.fandom.com/wiki/Legendary_item"
  
  r = requests.get(url = URL, verify=False)
  soup = BeautifulSoup(r.text, 'html.parser')
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
  print('getting ids')
  print(username)
  URL = f"https://euw.op.gg/summoner/spectator/userName={username}&"
  r = requests.get(url = URL, headers = headers)
  soup = BeautifulSoup(r.text, 'html.parser')
  list = [i.get('id')[19:] for i in soup.findAll('tr',id=lambda x: x and x.startswith('SpectateBigListRow-'))]
  return list






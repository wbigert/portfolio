import requests
def get_all_champions_data():
  headers = { 'Accept': 'application/json'}
  URL = 'https://ddragon.leagueoflegends.com/api/versions.json'
  r = requests.get(url = URL, headers = headers, verify=False)
  latest_version = (r.json()[0])
  print(f"Latest version:{latest_version}")
  URL = f"http://ddragon.leagueoflegends.com/cdn/{latest_version}/data/en_US/champion.json"

  r = requests.get(url = URL, headers = headers, verify=False)
  return r.json()

def get_specific_champion_data(pre_game_dict, champion_name):

  headers = { 'Accept': 'application/json'}
  URL = 'https://ddragon.leagueoflegends.com/api/versions.json'
  r = requests.get(url = URL, headers = headers, verify=False)
  latest_version = (r.json()[0])

  name_to_id = pre_game_dict['champion_name_to_id_dict']
  URL = f'http://ddragon.leagueoflegends.com/cdn/{latest_version}/data/en_US/champion/{name_to_id[champion_name]}.json'
  
  r = requests.get(url = URL, headers = headers, verify=False)
  return r.json()
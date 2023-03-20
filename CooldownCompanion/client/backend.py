from pymongo import MongoClient
import os

def get_database():
    import certifi
    ca = certifi.where()
    client = MongoClient(os.environ['CONNECTION_STRING'], tlsCAFile=ca)
    return client['league_tools']
    
def insert_one(item):
    dbname = get_database()
    collection_name = dbname["league_tracker"]
    collection_name.insert_one(item)
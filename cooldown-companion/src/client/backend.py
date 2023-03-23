from pymongo import MongoClient
import os
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
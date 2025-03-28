from pymongo import MongoClient
import pymongo
import os
import certifi
import time
import dotenv
dotenv.load_dotenv()
ca = certifi.where()
MAX_AUTO_RECONNECT_ATTEMPTS = 30
# async def get_database():
  
  # Create a connection using MongoClient
client = MongoClient(os.environ['CONNECTION_STRING'], tlsCAFile=ca)

  # Get database
  # return client['teamer']

async def insert_one(item, collection_name):
  for attempt in range(MAX_AUTO_RECONNECT_ATTEMPTS):
      try:
        # dbname = await get_database()
        dbname = client['teamer']
        collection = dbname[collection_name]
        collection.insert_one(item)
        return
      except pymongo.errors.AutoReconnect as e:
        wait_t = 0.5 * pow(2, attempt) # exponential back off
        print("PyMongo auto-reconnecting... %s. Waiting %.1f seconds.", str(e), wait_t)
        time.sleep(wait_t)

async def purge(collection_name):
  for attempt in range(MAX_AUTO_RECONNECT_ATTEMPTS):
      try:
        # dbname = await get_database()
        dbname = client['teamer']
        collection = dbname[collection_name]
        collection.delete_many({})
        return
      except pymongo.errors.AutoReconnect as e:
        wait_t = 0.5 * pow(2, attempt) # exponential back off
        print("PyMongo auto-reconnecting... %s. Waiting %.1f seconds.", str(e), wait_t)
        time.sleep(wait_t)

async def delete_one(query, collection_name):
  for attempt in range(MAX_AUTO_RECONNECT_ATTEMPTS):
      try:
        # dbname = await get_database()
        dbname = client['teamer']
        collection = dbname[collection_name]
        collection.delete_one(query)
        return
      except pymongo.errors.AutoReconnect as e:
        wait_t = 0.5 * pow(2, attempt) # exponential back off
        print("PyMongo auto-reconnecting... %s. Waiting %.1f seconds.", str(e), wait_t)
        time.sleep(wait_t)

async def get_one(query, collection_name):
  for attempt in range(MAX_AUTO_RECONNECT_ATTEMPTS):
      try:
        # dbname = await get_database()
        dbname = client['teamer']
        collection = dbname[collection_name]
        return list(collection.find(query))[0]
      except pymongo.errors.AutoReconnect as e:
        wait_t = 0.5 * pow(2, attempt) # exponential back off
        print("PyMongo auto-reconnecting... %s. Waiting %.1f seconds.", str(e), wait_t)
        time.sleep(wait_t)
  

async def get_many(query, collection_name):
  for attempt in range(MAX_AUTO_RECONNECT_ATTEMPTS):
      try:
        # dbname = await get_database()
        dbname = client['teamer']
        collection = dbname[collection_name]
        return list(collection.find(query))
      except pymongo.errors.AutoReconnect as e:
        wait_t = 0.5 * pow(2, attempt) # exponential back off
        print("PyMongo auto-reconnecting... %s. Waiting %.1f seconds.", str(e), wait_t)
        time.sleep(wait_t)

async def get_all(collection_name):
  for attempt in range(MAX_AUTO_RECONNECT_ATTEMPTS):
      try:
        # dbname = await get_database()
        dbname = client['teamer']
        collection = dbname[collection_name]
        item_details = collection.find()
        array = list(item_details)
        return array
      except pymongo.errors.AutoReconnect as e:
        wait_t = 0.5 * pow(2, attempt) # exponential back off
        print("PyMongo auto-reconnecting... %s. Waiting %.1f seconds.", str(e), wait_t)
        time.sleep(wait_t)
  

async def update_one(query, new_value, collection_name):
  for attempt in range(MAX_AUTO_RECONNECT_ATTEMPTS):
      try:
        # dbname = await get_database()
        dbname = client['teamer']
        collection = dbname[collection_name]
        collection.update_one(query, new_value)
        return
      except pymongo.errors.AutoReconnect as e:
        wait_t = 0.5 * pow(2, attempt) # exponential back off
        print("PyMongo auto-reconnecting... %s. Waiting %.1f seconds.", str(e), wait_t)
        time.sleep(wait_t)

# import asyncio

# asyncio.run(purge('events'))
# asyncio.run(purge('queue_actions'))
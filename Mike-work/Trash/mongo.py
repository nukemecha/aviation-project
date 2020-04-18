# Requires pymongo 3.6.0+
from pymongo import MongoClient

client = MongoClient("mongodb://18.190.0.114:27017/")
database = client["project2"]
collection = database["aviation"]

# Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

pipeline = [
    
]

cursor = collection.aggregate(
    pipeline, 
    allowDiskUse = False
)
try:
    for doc in cursor:
        print(doc)
finally:
    client.close()
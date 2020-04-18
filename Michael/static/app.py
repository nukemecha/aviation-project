# mongo.py

from flask import Flask
from flask import jsonify
from flask import request
import pymongo as PM

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'aviation'
app.config['MONGO_URI'] = 'mongodb://18.190.0.114:27017/'

mongo = PM.MongoClient('mongodb://18.190.0.114:27017/')

@app.route('/', methods=['GET'])
def get_all_docs():
  star = mongo.project2.aviation.find()
  output = []
  for s in star:
    output.append({'index' : s['index'], 'Event_Id' : s['Event_Id'], 'Event_Date' : s['Event_Date'], 'Location' : s['Location'], 'Country' : s['Country'], 'Latitude' : s['Latitude'], 'Longitude' : s['Longitude'], 'Airport_Code' : s['Airport_Code'], 'Injury_Severity' : s['Injury_Severity'], 'Aircraft_Damage' : s['Aircraft_Damage'], 'Aircraft_Category' : s['Aircraft_Category'], 'Make' : s['Make'], 'Model' : s['Model'], 'Total_Fatal_Injuries' : s['Total_Fatal_Injuries'], 'Total_Serious_Injuries' : s['Total_Serious_Injuries'], 'Total_Minor_Injuries' : s['Total_Minor_Injuries'], 'Total_Uninjured' : s['Total_Uninjured'], 'Broad_Phase_of_Flight' : s['Broad_Phase_of_Flight'], 'Damage_Rating' : s['Damage_Rating']})
  return jsonify({'result' : output})



if __name__ == '__main__':
    app.run(debug=True)
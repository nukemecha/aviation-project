# Module used to connect Python with MongoDb
import pymongo
import numpy as np
# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template

# The default port used by MongoDB is 27017
# https://docs.mongodb.com/manual/reference/default-mongodb-port/
conn = 'mongodb://18.190.0.114:27017'
client = pymongo.MongoClient(conn)

db = client.classDB

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def index():
    # """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/event_date<br/>"
        f"/api/v1.0/location"
    )


# app.route("/api/v1.0/event_date")
# def names():
#     # Create our session (link) from Python to the DB
#     session = Session(client)

#     """Return a list of all passenger names"""
#     # Query all passengers
#     results = session.query(Passenaviationger.Event_Date).all()

#     session.close()


#     # Convert list of tuples into normal list
#     all_names = list(np.ravel(results))

#     return jsonify(all_names)


# @app.route("/api/v1.0/location")
# def passengers():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of passenger data including the name, age, and sex of each passenger"""
#     # Query all passengers
#     results = session.query(Passenger.name, Passenger.age, Passenger.sex).all()

#     session.close()


    if __name__ == '__main__':
        app.run(debug=True)

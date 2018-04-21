# Dependencies
import pymongo
from pymongo import MongoClient
from flask import(
    Flask,
    render_template,
    jsonify,
    request)
import numpy as np
import pandas as pd
import json

# Initialize the Flask application
app = Flask(__name__)

# MongoDB Connection
client = MongoClient('mongodb://Aiyana:jobfitt@ds253889.mlab.com:53889/jobfitt')
# Get the sampleDB database
db = client.get_database()
# Initialize the collections to variables
Education_Experience_collection = db.Education_Experience
Alternate_Titles_collection = db.Alternate_Titles 
Job_State_Salary_collection = db.Job_State_Salary 
Knowledge_Cluster_collection  = db.Knowledge_Cluster 
Salary_State_Year_collection = db.Salary_State_Year 

# App route definitions
@app.route("/")
@app.route("/index")
def landing():
    return(render_template("index.html"))

@app.route("/Education_Experience")
def pymongo_Education_Experience_display():
    Education_Experience_result=[]
    print("Retrieving Data from Mongo Education_Experience")
    cursor = Education_Experience_collection.find({})
    for document in cursor:
        document.pop("_id")
        Education_Experience_result.append(document)
    return jsonify(Education_Experience_result)


@app.route("/Alternate_Titles")
def pymongo_Alternate_Titles_display():
    Alternate_Titles_result=[]
    print("Retrieving Data from Mongo Alternate_Titles")
    cursor = Alternate_Titles_collection.find({})
    for document in cursor:
        document.pop("_id")
        Alternate_Titles_result.append(document)
    return jsonify(Alternate_Titles_result)


@app.route("/Job_State_Salary")
def pymongo_Job_State_Salary_display():
    Job_State_Salary_result=[]
    print("Retrieving Data from Mongo Job_State_Salary")
    cursor = Job_State_Salary_collection.find({})
    for document in cursor:
        document.pop("_id")
        Job_State_Salary_result.append(document)
    return jsonify(Job_State_Salary_result)


@app.route("/Knowledge_Cluster")
def pymongo_Knowledge_Cluster_display():
    Knowledge_Cluster_result=[]
    print("Retrieving Data from Mongo Knowledge_Cluster")
    cursor = Knowledge_Cluster_collection.find({})
    for document in cursor:
        document.pop("_id")
        Knowledge_Cluster_result.append(document)
    return jsonify(Knowledge_Cluster_result)


@app.route("/Salary_State_Year")
def pymongo_Salary_State_Year_display():
    Salary_State_Year_result=[]
    print("Retrieving Data from Mongo Salary_State_Year")
    cursor = Salary_State_Year_collection.find({})
    for document in cursor:
        document.pop("_id")
        Salary_State_Year_result.append(document)
    return jsonify(Salary_State_Year_result)

# Run the Application
if __name__ == "__main__":
	app.run(debug = True) 

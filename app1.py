from config import password
import psycopg2
import os
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template
import json


from flask_cors import CORS


engine = psycopg2.connect("dbname=Project2 user=postgres password="+password)
cursor = engine.cursor()
postgreSQL_select_Query = "select * from wins"
cursor.execute(postgreSQL_select_Query)
win_records = cursor.fetchall()
postgreSQL_select_Query1 = "select * from PlayerHome"
cursor.execute(postgreSQL_select_Query1)    
people_records = cursor.fetchall()

app = Flask(__name__)
CORS(app)
@app.route('/')
def welcome():
    print("Server received request for 'Home' page...")
    return (
        f"Welcome to the Baseball API!<br/>"
        f"Available Routes:<br/>"
        f"/hometown<br/>"
        f"/salarywindata<br/>"

    )



@app.route("/salarywindata")
def teams_salary_win():
    team_data = []
    for row in win_records:
        teams_dict = {}
        teams_dict["Year"] = row[0]
        teams_dict["Team ID"] = row[1]
        teams_dict["Salary"] = row[2]
        teams_dict["Wins"] = row[3]
        teams_dict["Attendance"] =row[4]
        team_data.append(teams_dict)
    return jsonify(team_data)
@app.route("/hometown")
def players_home():

    player_home = []

    for row in people_records:
        home_dict={}
        home_dict['State'] = row[0]
        home_dict['Count'] = row[1]
        player_home.append(home_dict)
    print(player_home)
    return jsonify(player_home)


if __name__ == "__main__":
    app.run(debug=True)
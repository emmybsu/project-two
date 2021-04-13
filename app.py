
import os
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template
import json



# tables used- salaries, teams, people, fielding
# set up database connection
engine = create_engine('sqlite:///lahmansbaseballdb.sqlite')
#  reflect database
Base = automap_base()
#reflect tables
Base.prepare(engine, reflect=True)
#var for tables
salaries = Base.classes.salaries
teams = Base.classes.teams
people = Base.classes.people
fielding = Base.classes.fielding
# create session for API
session = Session(engine)
# use flask to set up app to view data
app = Flask(__name__)

@app.route("/")
def teams_salary_win():
    session = Session(engine)
    # this is not adding up the salaries for each team not accurelty pulling the wins either-Option may be clean the data and rebuild db
    data = session.query(salaries.yearID, salaries.teamID, salaries.salary).order_by(salaries.teamID).order_by(salaries.yearID).all()
    session.close()
    print(data)
    teams = []

    for year, teamid, salary, in data:
        teams_dict = {}
        teams_dict["Year"] = year
        teams_dict["Team ID"] = teamid
        teams_dict["Salary"] = salary
        teams.append(teams_dict)
            
    # return jsonify(teams)
    return jsonify(teams)
@app.route("/attendance")
def teams_salary_attendance():
    session = Session(engine)
    attendance_data = session.query(teams.yearID, teams.teamID, teams.W, teams.HR, teams.R, teams.attendance).all()
    teams1 = []

    for year, teamid, wins, homeruns, runs, attendance in attendance_data:
        teams1_dict = {}
        teams1_dict["Year"] = year
        teams1_dict["Team ID"] = teamid
        teams1_dict["Wins"] = wins
        teams1_dict["Homeruns"] = homeruns
        teams1_dict["Runs"] = runs
        teams1_dict["Attendance"] = attendance
        teams1.append(teams1_dict)
            
    # return jsonify(teams)
    return jsonify(teams1)


# def teams_salary_homeruns():


if __name__ == "__main__":
    app.run(debug=True)

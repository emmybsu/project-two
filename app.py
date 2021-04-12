
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
    data = session.query(func.avg(salaries.salary), func.avg(teams.w))
    session.close()
    print(data)
    # teams = []

    # for teamid, avg_salary, avg_w in data:
    #     teams_dict = {}
    #     teams_dict["Team ID"] = teamid
    #     teams_dict["Avg Salary"] = avg_salary
    #     teams_dict["Avg Wins"]  = avg_w
    #     teams.append(teams_dict)
            
    # return jsonify(teams)
    return data

# def teams_salary_attendance():


# def teams_salary_homeruns():


if __name__ == "__main__":
    app.run(debug=True)

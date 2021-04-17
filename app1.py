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

@app.route('/map')
def map():
    '''Main Map Route.'''

    # get default data
    data = session.query(Passing).order_by(Passing.passing_yards.desc())

    # default dropdowns
    options = populate_dropdown('passing')
    options = options.json
    options = [x.capitalize().replace('_', ' ') for x in options]

    return render_template('map.html', data=data, options=options)

@app.route('/map/<table>/<col>')
def map_json(table, col):
    '''Returns map json data.'''

    # load map data
    map_data = json.load(open('json/states.json'))
    
    # load and group by player states
    player_data = pd.read_sql_table(table, engine)[['name', 'birth_place', col]]

    # handle height and weight issues
    if col in ['height', 'weight']:
        player_data[col] = player_data[col].astype(float)

    # get states and group by state of birth
    birth_place = player_data['birth_place'].str.split(' , ', n = 1, expand = True)
    player_data['birth_place_state'] = birth_place[1]
    grouped = player_data.groupby(['birth_place_state']).sum()

    # build geoJson data
    for ind, obj in enumerate(map_data['features']):
        initials = state_codes_mod.state_codes[map_data['features'][ind]['properties']['name']]

        # set the new density to the required stat
        try:
            map_data['features'][ind]['properties']['density'] = int(grouped.loc[[initials],[col]][col])
        except KeyError:
            map_data['features'][ind]['properties']['density'] = 0

    return map_data


if __name__ == "__main__":
    app.run(debug=True)
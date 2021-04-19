//identify tag in index.html to add name of ID
var yearTag = d3.select('#selYear');
var teamTag = d3.select('#selTeam');

var baseballData = data;
// console.log("baseballData")
// console.log(baseballData)

year_array = [];
team_array = [];

baseballData.forEach((row_data) => {
  // console.log("row_data")
  // console.log(row_data.Year)

  if (year_array.indexOf(row_data.Year) === -1) {
    year_array.push(row_data.Year)
  }

  if (team_array.indexOf(row_data['Team ID']) === -1) {
    team_array.push(row_data['Team ID'])
  }

});

// console.log("year_array");
// console.log(year_array);

yearTag
  .append("option")
  .property("value", "")
  .text("Select Year");

year_array.map((year) => {
  yearTag
    .append("option")
    .property("value", year)
    .text(year);
});

team_array.sort();

teamTag
  .append("option")
  .property("value", "")
  .text("Select Team");

team_array.map((team) => {
  teamTag
    .append("option")
    .property("value", team)
    .text(team);
});

const tbody = d3.select("tbody");

function optionYear(selected_yr) {
  console.log("selected_yr=", selected_yr);

  results = baseballData.filter(row => row.Year == selected_yr);
  console.log("results")
  console.log(results)

  // bubble chart
  var attendance = results.map(att => att.Attendance);
  var salary = results.map(sal => sal.Salary);
  var teams = results.map(te => te.Team_ID);
  var wins = results.map(wins => wins.Wins);
  var year = results.map(year => year.Year);

  var trace1 = {
    mode: 'markers+text',
    type: 'scatter',
    x: wins,
    y: salary,
    text: ["ATL", "BAL", "BOS", "CAL", "CHA", "CHN",
      "CIN", "CLE", "DET", "HOU", "KCA", "LAN", "MIN", "ML4",
      "MON", "NYA", "NYN", "OAK", "PHI", "PIT",
      "SDN", "SEA", "SFN", "SLN", "TEX", "TOR"],
    line: {
      color: "#17BECF"
    }
  };

  var data = [trace1];

  var layout = {
    title: `Salary vs Wins by Year`,
    xaxis: { title: 'Wins' },
    yaxis: { title: "Salary" },
    images: [
      {
        x: 1,
        y: 0,
        sizex: 1.5,
        sizey: 1.5,
        source: "https://www.betfirm.com/wp-content/uploads/2015/04/bet-online-baseball.jpg",
        xanchor: "right",
        xref: wins,
        yanchor: "bottom",
        yref: salary,
        opacity: 0.15,
        padding: { t: 1, l: 3, b: 1, r: 1 }

      }
    ]
  };

  Plotly.newPlot("bubble", data, layout, { responsive: true });

  // attendance chart
  var trace2 = {
    x: wins,
    y: attendance,
    mode: 'markers+text',
    type: 'scatter',
    text: ["ATL", "BAL", "BOS", "CAL", "CHA", "CHN",
      "CIN", "CLE", "DET", "HOU", "KCA", "LAN", "MIN", "ML4",
      "MON", "NYA", "NYN", "OAK", "PHI", "PIT",
      "SDN", "SEA", "SFN", "SLN", "TEX", "TOR"]

  };

  var data = [trace2];

  var layout = {
    title: `Attendance vs Wins by Year`,
    xaxis: { title: 'Wins' },
    yaxis: { title: "Attendance" },
    images: [
      {
        x: 1,
        y: 0,
        sizex: 1.2,
        sizey: 1.65,
        source: "https://media.bizj.us/view/img/10144720/howtobaseballdifferentiation.jpg",
        xanchor: "right",
        xref: wins,
        yanchor: "bottom",
        yref: salary,
        opacity: 0.15,
        padding: { t: 1, l: 1, b: 1, r: 1 }
      }
    ]

  };

  Plotly.newPlot("attendance", data, layout, { responsive: true });

  // Table view
  tbody.html("");

  const tbl_header = tbody.append("tr");
  let header = tbl_header.append("th");
  header.text("Attendance");
  header = tbl_header.append("th");
  header.text("Salary");
  header = tbl_header.append("th");
  header.text("Team ID");
  header = tbl_header.append("th");
  header.text("Wins");
  header = tbl_header.append("th");
  header.text("Year");

  results.forEach((row) => {
    // Create tr for each row of the table
    const tbl_data = tbody.append("tr");

    // console.log("row")
    // console.log(row)

    // Create multiple td cells for each row
    Object.values(row).forEach((value) => {
      let cell = tbl_data.append("td");
      cell.text(value);
    });
  });

}

function optionTeam(selected_team) {
  console.log("selected_team=", selected_team);

  filteredRows = baseballData.filter(row => row['Team ID'] == selected_team);

  console.log("filteredRows")
  console.log(filteredRows)

  tbody.html("");

  const tbl_header = tbody.append("tr");
  let header = tbl_header.append("th");
  header.text("Attendance");
  header = tbl_header.append("th");
  header.text("Salary");
  header = tbl_header.append("th");
  header.text("Team ID");
  header = tbl_header.append("th");
  header.text("Wins");
  header = tbl_header.append("th");
  header.text("Year");

  filteredRows.forEach((row) => {
    // Create tr for each row of the table
    const tbl = tbody.append("tr");

    console.log("row")
    console.log(row)

    // Create multiple td cells for each row
    Object.values(row).forEach((value) => {
      let cell = tbl.append("td");
      cell.text(value);
    });
  });

}


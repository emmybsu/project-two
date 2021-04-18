//identify tag in index.html to add name of ID
var htmlTag = d3.select('#selDataset');

// //build data to create plotly charts

d3.json("Resources/salary_win_data.json").then((sampleData) => {
  var subIDs = sampleData.map(function(names) {
    return names['Year'];
  });
  console.log("Year: ", subIDs);
  var year = sampleData.map(year => year.Year);
  // do this for uniTeams
  var uniYear = year.filter((v, i, s) => {
  return s.indexOf(v) === i
})
// });
  //display individual ids
  uniYear.forEach((id) => {
    htmlTag.append('option')
    .property('value', id)
    .text(id);
  });

  // web page displays first ID in Test Subject Drop down 
 
  optionChanged(subIDs[0]);
});

// //allows user to select IDs and dashboard changes based on ID change from menu
// // <select id="selDataset" onchange="optionChanged(this.value)"></select>
function optionChanged (selIDs){
   d3.json('Resources/salary_win_data.json').then((sampleData) => {     
//start of creating an empty array to store each object
// from week 14,day 2, act 08
    // create samples associated to ID 
// Create arrays to store baseball values
var attendance = sampleData.map(att => att.Attendance);
var salary = sampleData.map(sal => sal.Salary);
var teams = sampleData.map(te => te['Team ID']);
var wins = sampleData.map(wins => wins.Wins);
var year = sampleData.map(year => year.Year);
var uniYear = year.filter((v, i, s) => {
  return s.indexOf(v) === i
})
});
// console.log('attendance')
// console.log(attendance)
// console.log('salary')
// console.log(salary)
// console.log('teams')
// console.log(teams)
// console.log('wins')
// console.log(wins)
// console.log('year')
// console.log(year)

// from week 15 day 3 activity 5

// //function getAnnualData() {

//   d3.json('Resources/salary_win_data.json').then((sampleData) => {
//     var attendance = unpack(sampleData.map(att => att.Attendance));
//     var salary = unpack(sampleData.map(sal => sal.Salary));
//     var teams = unpack(sampleData.map(te => te['Team ID']));
//     var wins = unpack(sampleData.map(wins => wins.Wins));
//     var year = unpack(sampleData.map(year => year.Year));

//     buildTable(teams, year, attendance, salary, wins);
//   });


// function buildTable(teams, year, attendance, salary, wins) {
//   var table = d3.select("#summary-table");
//   var tbody = table.select("tbody");
//   var trow;
//   for (var i = 0; i < length[i]; i++) {
//     trow = tbody.append("tr");
//     trow.append("td").text(teams[i]);
//     trow.append("td").text(year[i]);
//     trow.append("td").text(attendance[i]);
//     trow.append("td").text(salary[i]);
//     trow.append("td").text(wins[i]);
    
//   }
//}

function buildPlot() { 

  d3.json('Resources/salary_win_data.json').then((sampleData) => {
    var results = sampleData.filter(annual => annual.Year == selIDs);
    // Grab values from the response json object to build the plots
    var attendance = results.map(att => att.Attendance);
    var salary = results.map(sal => sal.Salary);
    var teams = results.map(te => te['Team ID']);
    var wins = results.map(wins => wins.Wins);
    var year = results.map(year => year.Year);
    // var attendance = unpack(sampleData.map(att => att.Attendance));
    // var salary = unpack(sampleData.map(sal => sal.Salary));
    // var teams = unpack(sampleData.map(te => te['Team ID']));
    // var wins = unpack(sampleData.map(wins => wins.Wins));
    // var year = unpack(sampleData.map(year => year.Year));
    
    //getAnnualData();
//     console.log('printing year and salary for view')
// console.log(year, salary)
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
      xaxis: {title:'Wins'},
      yaxis: {title:"Salary"},
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
          opacity:0.15,
          padding:{t:1,l:3,b:1,r:1}
     
        }
      ]
      
      
    };

    Plotly.newPlot("bubble", data, layout, {responsive: true});

  });
}
console.log(selIDs)   
buildPlot();


//
function buildPlot2() { 

  d3.json('Resources/salary_win_data.json').then((sampleData) => {
    var results = sampleData.filter(annual => annual.Year == selIDs);
    // Grab values from the response json object to build the plots
    var attendance = results.map(att => att.Attendance);
    var salary = results.map(sal => sal.Salary);
    var teams = results.map(te => te['Team ID']);
    var wins = results.map(wins => wins.Wins);
    var year = results.map(year => year.Year);

    
    // var trace1 = {      
    //   mode: 'markers+text',
    //   type: 'scatter',
    //   x: wins,
    //   y: attendance,
    //   text: ["ATL", "BAL", "BOS", "CAL", "CHA", "CHN", 
    //   "CIN", "CLE", "DET", "HOU", "KCA", "LAN", "MIN", "ML4",
    //    "MON", "NYA", "NYN", "OAK", "PHI", "PIT",
    //    "SDN", "SEA", "SFN", "SLN", "TEX", "TOR"],
    //   line: {
    //     color: "#17BECF"
    //   }
    // };
    
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

    //var trace2 = {}

    // // Candlestick Trace
    // var trace2 = {
    //   type: "candlestick",
    //   x: dates,
    //   high: highPrices,
    //   low: lowPrices,
    //   open: openingPrices,
    //   close: closingPrices
    // };

    var data = [trace2];

    var layout = {
      title: `Attendance vs Wins by Year`,
      xaxis: {title:'Wins'},
      yaxis: {title:"Attendance"}, 
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
          opacity:0.15,
          padding:{t:1,l:1,b:1,r:1}
        }
      ]
      // images: [
      //   {
      //     x: 1,
      //     y: 1.05,
      //     sizex: 0.2,
      //     sizey: 0.2,
      //     source: "https://media.bizj.us/view/img/10144720/howtobaseballdifferentiation.jpg",
      //     xanchor: "right",
      //     xref: "paper",
      //     yanchor: "bottom",
      //     yref: "paper"
      //   }
      // ]
  
    };



    Plotly.newPlot("attendance", data, layout, {responsive: true});

  });
}
console.log(selIDs)   
buildPlot2();





};

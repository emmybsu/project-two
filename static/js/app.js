//identify tag in index.html to add name of ID
var htmlTag = d3.select('#selDataset');

// //build data to create plotly charts

d3.json("Resources/salary_win_data.json").then((sampleData) => {
  var subIDs = sampleData.map(function(names) {
    return names['Year'];
  });
  console.log("Year: ", subIDs);
  var year = sampleData.map(year => year.Year);
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
   });
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

    var trace2 = {}

    // // Candlestick Trace
    // var trace2 = {
    //   type: "candlestick",
    //   x: dates,
    //   high: highPrices,
    //   low: lowPrices,
    //   open: openingPrices,
    //   close: closingPrices
    // };

    var data = [trace1];

    var layout = {
      title: `Baseball year`,
      // xaxis: {
      //   range: [startDate, endDate],
      //   type: "date"
      // },
      // yaxis: {
      //   autorange: true,
      //   type: "linear"
      // },
      // showlegend: false
    };

    Plotly.newPlot("bubble", data, layout);

  });
}
console.log(selIDs)   
buildPlot();

//     var samples = sampleData.samples;
//     var results = samples.filter(annual => annual.Year == selIDs);
   
// //     //first individual result
//     var result = results[0];
     
//     //create bar chart
//     // identify 'sample_values' as values for the chart
//     // identify 'otu_ids' as labels for the chart
//     // identify 'otu_labels' as hovertext for the chart
 
//     var values = results[0].sample_values
//     var labels = results[0].otu_ids
//     var hover = results[0].otu_labels

//     var y_axis = labels.slice(0,10).map(labels => `OTU ${labels}`).reverse();

//   //create trace variable for the bar chart

//   var bar_trace = {
//     y: y_axis,
//     x: values.slice(0,10).reverse(),
//     text: hover.slice(0,10).reverse(),
//     type: "bar",
//     orientation: "h"
//   };
//   // create the data variable
//   var data = [bar_trace];
//   // create the layout variable
//   var bar_layout = {
//     title: "Top 10 OTUs",
//     yaxis: {
//       tickmode: "linear"
//     },
//     margin: {
//       l: 100,
//       r: 100,
//       t: 100,
//       b: 30
//     }
//   };
//   Plotly.newPlot('bar', data, bar_layout);

//   // create bubble chart
//   //* Use `otu_ids` for the x values. = labels
// //  * Use `sample_values` for the y values. = values
//   //* Use `sample_values` for the marker size. = values
//   //* Use `otu_ids` for the marker colors. = labels
//   //* Use `otu_labels` for the text values. = hover
//   //results = dict of ID
//   //result = list of one key value with  ID array
  


// // create individual's demographic information per ID

// var demographics = sampleData.metadata;

// var demoHTML = d3.select('#sample-metadata');
// var detailsID = demographics.filter(person => person.id == selIDs);
//    });

// // individual's demographics
// var result = detailsID[0];
// demoHTML.html('');
// Object.entries(result).forEach(([key,value]) => {
//   demoHTML.append('h5').text(`${key}: ${value}`);

// })

// var bubble_trace = {
//   x: labels,
//   y: values,
//   text: hover,
//   mode: "markers",
//   marker: {
//     size: values,
//     color: labels,
//     colorscale: "Earth"
//   }
// };

// var data = [bubble_trace];

// var bubble_layout = {
//   hovermode:  "closest", 
//   xaxis: {title: "Display of Each Microbe in the Navel (Operational Taxonomic Unit (OTU))"},
//   margin: {t:30}
// };
// Plotly.newPlot("bubble", data, bubble_layout);

};

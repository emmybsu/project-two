// const ROOT_URL = 'http://localhost:5000'
const ROOT_URL = 'https://hermann-nfl-offense-dashboard.herokuapp.com'

// map
var map = L.map('map').setView([37.8, -96], 4)
var geojson
var info

// color cutoffs
var c80
var c60
var c40
var c20

// add tile layer
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

function getColor(d) {
    // color breaks every 20th percentile
    return d > c80 ? '#b30000' :
            d > c60 ? '#e34a33' :
            d > c40 ? '#fc8d59' :
            d > c20 ? '#fdcc8a' :
                                        '#fef0d9';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function createMap(table, col) {

    // control that shows state info on hover
    info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    info.update = function (props, stat) {
        this._div.innerHTML = (props ? `<div id='tool'><h6>${toTitleCase(stat)}</h6><hr>` +
            '<b>' + props.name + '</b>: ' + props.density + '</div> '
            : '<div id="tool">Hover over a state</div>');
    };

    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 3,
            color: '#FFFF00',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }

        info.update(layer.feature.properties, col);
    }

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
    }

    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }

    info.addTo(map);

    
    // get data and create map
    d3.json(`${ROOT_URL}/map/${table}/${col}`).then((d) => {
        
        // calculate percentiles for styling
        c80 = quantile(d.features, 0.8)
        c60 = quantile(d.features, 0.6)
        c40 = quantile(d.features, 0.4)
        c20 = quantile(d.features, 0.2)

        // add geoJson to map
        geojson = L.geoJson(d, { style: style, onEachFeature: onEachFeature }).addTo(map);
    })

}

function updateMap(){

    // get table selection
    var selector = document.getElementById('table-selector-dropdown')
    var table = selector.options[selector.selectedIndex].value.toLowerCase()
    
    // get x choice
    var xAxis = document.getElementById('x-selector-dropdown')
    var xAxis = xAxis.options[xAxis.selectedIndex].value.toLowerCase()

    // remove layer to avoid stacking
    map.removeLayer(geojson)
    info.remove(map)

    // create updated map
    createMap(toSnakeCase(table), toSnakeCase(xAxis))

}

function updateSelectors() {

    var selector = document.getElementById('table-selector-dropdown')
    var table = selector.options[selector.selectedIndex].value.toLowerCase()

    // dropdown
    var x = document.getElementById('x-selector-dropdown')

    var options = ''
    d3.json(`${ROOT_URL}/${toSnakeCase(table)}`).then((d) => {

        // create options
        for (var selection of d) {
            options += "<option>" + toTitleCase(selection) + "</option>"
        }

        // add options
        x.innerHTML = options

    })

}

function toTitleCase(str) {

    // split string into words
    var words = str.split('_')
    var outputWords = ''

    // concatenate words together with space
    for (var word of words) {
        var firstLetter = word.charAt(0).toUpperCase()
        var remainder = word.substr(1).toLowerCase()
        outputWords += firstLetter + remainder + ' '
    }

    return outputWords.trim();
}

function toSnakeCase(str) {

    // split string into words
    var words = str.split(' ')
    var outputWords = ''

    // concatenate words together with space
    if (words.length > 1) {
        for (var word of words) {
            outputWords += word + '_'
        }
        outputWords = outputWords.substr(0, outputWords.length - 1)
    } else {
        outputWords = str
    }

    // convert to proper casing
    var output = outputWords.toLowerCase().trim()

    return output;

}

// calculate quantiles for color breakpoints
// code adapted from stack overflow user buboh @ https://stackoverflow.com/questions/48719873/how-to-get-median-and-quartiles-percentiles-of-an-array-in-javascript-or-php
const quantile = (arr, q) => {

    // unpack objects
    arr = arr.map((d) => {
        return d.properties.density
    })

    // sort array function
    const asc = arrArg => arrArg.sort((a, b) => a - b);

    // sort input array
    const sorted = asc(arr);
    const pos = (sorted.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] !== undefined) {
        return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    } else {
        return sorted[base];
    }
};

$(document).ready(() => {

    // default graph
    createMap('passing', 'passing_yards')

    // create event listener
    d3.selectAll('#submitBtn').on('click', updateMap)
    d3.selectAll('#table-selector-dropdown').on('change', updateSelectors)
})
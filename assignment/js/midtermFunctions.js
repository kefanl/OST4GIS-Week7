/* ================================
Week 6 Assignment: Midterm Functions + Signatures

Basically, this project uses dataset from OpenDataPhilly to map building demolitions in Philadelphia.
The dots of buildings are categorized by their demolition year(four or five categories).
================================ */
//map preparation
var map = L.map('map', {
  center: [40.000, -75.1090],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

var dataset = "https://raw.githubusercontent.com/kefanl/Mid-term-Project-KefanLong/master/Dataset/li_demolitions.geojson"; //dataset has uploaded on my own github repository
var featureGroup;
var filterYear = ' '; //filter year preparation
var yearColor = function(features) {
  switch (features.properties.startTimes) {
    case '':   return {color: "#0000FF"};
    case '':   return {color: "#0000FF"};
    case '':   return {color: "#0000FF"};
    case '':   return {color: "#0000FF"};
}}; //set the legend of the dot map

var showResults = function() {
  $('#intro').hide();
  $('#results').show();
};
var closeResults = function() {
  $('#intro').show();
  $('#results').hide();
  filterYear = '';
  map.setView([40.000, -75.1090], 11);
}; //interactive return function
var eachFeatureFunction = function(layer) {
  layer.on('click', function(event) {
    showResults();
    switch(layer.feature.properties.startTimes) {
      case '':   $('.year').text('Before 2014'); filterYear = 2013; break;
      case '':   $('.year').text('2014'); filterYear = 2014; break;
      case '':   $('.year').text('2015'); filterYear = 2015; break;
      case '':   $('.year').text('2016'); filterYear = 2016; break;
      case '':   $('.day-of-week').text('After 2016'); filterYear = 2016; break;
    };
    map.fitBounds(event.target.getBounds(layer.features.geometry.coordinates),16);
  });
};

var yearFilter = function(features) {
  if (features.properties.startTimes == fliterYear) { return true;}
  else {return true;}
};

$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup = L.circleMarker(parsedData, {
      style: yearColor,
      filter: yearFilter
    }).addTo(map);
    featureGroup.eachLayer(eachFeatureFunction);
  });
});

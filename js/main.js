
var map, DCS_UI_MARKER, infowindow;
var areLibrariesDrawed = false;
var areHousesDrawed = false;
var arePoliceStationsDrawed = false;
var areFireStationsDrawed = false;
//--------- basic dependensies ---------//
var $ = require("jquery");
var MapLibrary = require("./mapLibrary");
var DatasetLibrary = require("./datasetLibrary");
var ZillowLibrary = require("./zillowLibrary");
var WeatherLibrary = require("./climateDataLibrary");
//--------- basic dependensies ---------//
//ZillowLibrary.getZillowData();
//initGoogleMap funcion.
function onGoogleMapResponse() {
	MapLibrary.initGoogleMap();
}

//default marker function
function showLibrariesButtonClicked() {
	if(!areLibrariesDrawed){
		MapLibrary.setMarkersOnMap(DatasetLibrary.DATASETS_TYPES_ENUM.LIBRARIES , 1);
		areLibrariesDrawed = true;
	}else{
		MapLibrary.setMarkersOnMap(DatasetLibrary.DATASETS_TYPES_ENUM.LIBRARIES , null);
		areLibrariesDrawed = false;
	}
}

function housesDistanceSelectorChange() {
	console.log("clicked");
	var distance = $(this).val();
	console.log($(this).val());

	MapLibrary.setMarkersOnMap(DatasetLibrary.DATASETS_TYPES_ENUM.HOUSES , null, distance);
	areHousesDrawed = true;
}

function showPoliceStationsButtonClicked() {
	if(!arePoliceStationsDrawed){
		MapLibrary.setMarkersOnMap(DatasetLibrary.DATASETS_TYPES_ENUM.POLICE_STATIONS , 1);
		arePoliceStationsDrawed = true;
	}else{
		MapLibrary.setMarkersOnMap(DatasetLibrary.DATASETS_TYPES_ENUM.POLICE_STATIONS , null);
		arePoliceStationsDrawed = false;
	}
}

function showFireStationsButtonClicked() {
	if(!areFireStationsDrawed){
		MapLibrary.setMarkersOnMap(DatasetLibrary.DATASETS_TYPES_ENUM.FIRE_STATIONS , 1);
		areFireStationsDrawed = true;
	}else{
		MapLibrary.setMarkersOnMap(DatasetLibrary.DATASETS_TYPES_ENUM.FIRE_STATIONS , null);
		areFireStationsDrawed = false;
	}
	
}

function markerButtonClicked4() {
	//console.log("clicked");
	//DatasetLibrary.setMarkersOnMap(DatasetLibrary.DATASETS_TYPES_ENUM.HOUSES , null);
	ZillowLibrary.getZillowData();
}



//This function add or remove the animation to a specific marker (not in use)
function toggleBounce(marker) {
	if (marker.getAnimation() !== null) {
    	marker.setAnimation(null);
	} else {
	    marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}


// main global function

var main = {};
main.onGoogleMapResponse = onGoogleMapResponse;
main.showLibrariesButtonClicked = showLibrariesButtonClicked;
main.housesDistanceSelectorChange = housesDistanceSelectorChange;
main.showPoliceStationsButtonClicked = showPoliceStationsButtonClicked;
main.showFireStationsButtonClicked = showFireStationsButtonClicked;

window.main =  main;

// map global function

$(document).ready( () => {
	$("#inputShowLibraries").on("change", main.showLibrariesButtonClicked);
	$("#distanceFromUniversitySelector").on("change", main.housesDistanceSelectorChange);
	$("#inputShowPoliceStations").on("change", main.showPoliceStationsButtonClicked);
	$("#inputShowFireStations").on("change", main.showFireStationsButtonClicked);
	WeatherLibrary.askForWeather();
})

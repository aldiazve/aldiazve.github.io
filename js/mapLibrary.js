
//-- Constants --//
//---- Default marker constants --------//
const DCS_UI_POSITION = {lat: 41.870808, lng: -87.650390}; //Department of Computer Science – University of Illinois, Chicago
const MARKER_BOUNCE_AMIMATION_TIME = 2100 //3 jumps
const DCS_UI_INFO_WINDOW_STRING = "Department of Computer Science – University of Illinois, Chicago";
const UNIVERSITY_MARKER_ICON = "img/universityIcon.png";
//---- Default marker constants --------//
//-- Libraries dataset constants --//
const INDEX_OF_LOCALIZATION_ARRAY_LIBRARIES = 18;
const INDEX_OF_LAT_LIBRARIES = 1;
const INDEX_OF_LNG_LIBRARIES = 2;
const INDEX_OF_LIBRARY_NAME = 8;
const INDEX_OF_HOURS_OF_OPERATION = 9;
const INDEX_OF_LIBRARY_ADDRESS = 12;
//-- Libraries dataset constants --//
//-- Houses dataset constants --//

const INDEX_OF_LOCALIZATION_ARRAY_HOUSES = 21;
const INDEX_OF_LAT_HOUSES = 1;
const INDEX_OF_LNG_HOUSES = 2;
const INDEX_OF_HOUSES_COMMUNITY_AREA_NAME = 8;
const INDEX_OF_HOUSES_PROPERTY_NAME = 11;
const INDEX_OF_HOUSE_ADDRESS = 12;
//-- Houses dataset constants --//
//-- Police stations dataset constants --//
const INDEX_OF_LOCALIZATION_ARRAY_POLICE_STATIONS = 22;
const INDEX_OF_LAT_POLICE_STATIONS = 1;
const INDEX_OF_LNG_POLICE_STATIONS = 2;
const INDEX_OF_POLICE_STATIONS_DISTRICT_NAME = 9;
const INDEX_OF_POLICE_STATIONS_ADDRESS = 10;
//-- Police stations dataset constants --//
//-- Fire stations dataset constants --//
const INDEX_OF_LOCALIZATION_ARRAY_FIRE_STATIONS = 14;
const INDEX_OF_LAT_FIRE_STATIONS = 1;
const INDEX_OF_LNG_FIRE_STATIONS = 2;
const INDEX_OF_FIRE_STATIONS_ADDRESS = 9;
//-- Fire stations dataset constants --//
//Markers icons sources
const HOUSE_MARKER_ICON = "img/houseIcon.png";
const LIBRARIES_MARKER_ICON = "img/librariesIcon.png";
const POLICE_STATION_MARKER_ICON = "img/policeStationIcon.png";
const FIRE_STATION_MARKER_ICON = "img/fireStationIcon.png";
//-- Google Map travel modes ENUM --//
const GOOGLE_MAP_TRAVEL_MODES = {
	BUS: "BUS",
	RAIL: "RAIL",
	SUBWAY: "SUBWAY",
	TRAINT: "TRAIN",
	TRAM: "TRAM"
};
//-- GoogleMapsClient nodeJS --//
var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAwWYDB9v1MopiTtPpUXMDaCwAlOQbtn3c'
});

//-- Google map instance --/
var map;
//-- inuversity google Latlng variable --//
var universityLatLng;
//-- markersLists --//
var librariesMarkersList = [];
var housesMarkersList = [];
var housesMarkersListWithRentPrice = [];
var policeStationsMarkersList = [];
var fireStationsMarkersList = [];
//-- infoWindow variable --//
var infowindow;
//-- directions services variables --//
var directionsService;
var directionsDisplay ;
//--------- basic dependensies ---------//
var $ = require("jquery");
var DatasetLibrary = require("./datasetLibrary");
var ZillowLibrary = require("./zillowLibrary");
//--------- basic dependensies ---------//
//-- init google map --//
function initGoogleMap() {
	map = new google.maps.Map(document.getElementById('mapDiv'), {
		center : DCS_UI_POSITION,
		zoom: 12
	});
	//inicializing the map info window with the DCS_UI_MARKER info.
	infowindow = new google.maps.InfoWindow({
		content: null
	});
	//init directions variables
	directionsService = new google.maps.DirectionsService();
	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(map);
	universityLatLng = new google.maps.LatLng({lat: 41.870808, lng: -87.650390});
	//init datasets
	DatasetLibrary.initDataSets();
	//Adding the DCS_UI_MARKER to the map
	addDefaultMarker();
	console.log("Map loaded");
}

//Default mark behaviour func
function addDefaultMarker() {
	//Initializing defaulteMarker by first time
	DCS_UI_MARKER = new google.maps.Marker({
		position: DCS_UI_POSITION,
		map: map,
		icon: UNIVERSITY_MARKER_ICON,
		title: "DCS_UI_MARKER",
	});
	//Add a click listener to the marker
	DCS_UI_MARKER.addListener('click', showUniversityInfoWindow);
};

//display an infoWindow to show the university info
function showUniversityInfoWindow(){
	infowindow.setContent(DCS_UI_INFO_WINDOW_STRING);
	infowindow.open(this.map, this);
};

//call the apropiate func to get the markers from a dataset file
function getMarkersFromDataset( dataset, datasetType ) {
	switch (datasetType){
		case DatasetLibrary.DATASETS_TYPES_ENUM.LIBRARIES:
			getLibrariesMarkersFromJson(dataset);
		break;
		case DatasetLibrary.DATASETS_TYPES_ENUM.POLICE_STATIONS:
			getPoliceStationMarkersFromJson(dataset);
		break;
		case DatasetLibrary.DATASETS_TYPES_ENUM.FIRE_STATIONS:
			getFireStationMarkersFromJson(dataset);
		break;
		case DatasetLibrary.DATASETS_TYPES_ENUM.PARKS:

		break;
		case DatasetLibrary.DATASETS_TYPES_ENUM.HOUSES:
			getHousesMarkersFromJson(dataset);
		break;
	};
	
};

//create and store a marker object for each data object on the json
function getLibrariesMarkersFromJson( lib ){
	var universityLatLng = new google.maps.LatLng({lat: 41.870808, lng: -87.650390});
	$.each(lib, ( posIndex, position ) => {
		var latLng = new google.maps.LatLng([position[INDEX_OF_LOCALIZATION_ARRAY_LIBRARIES][INDEX_OF_LAT_LIBRARIES]], [position[INDEX_OF_LOCALIZATION_ARRAY_LIBRARIES][INDEX_OF_LNG_LIBRARIES]]);
		//if the distance between the house and the university is less than 6km, its stored.
		var distanceFromUniversity = google.maps.geometry.spherical.computeDistanceBetween(latLng, universityLatLng);
		if (distanceFromUniversity < 6000){
			var marker = new google.maps.Marker({
				position: latLng,
				title: position[INDEX_OF_LIBRARY_NAME],
				icon : LIBRARIES_MARKER_ICON,
				hoursOfOperation : position[INDEX_OF_HOURS_OF_OPERATION],
				address : position[INDEX_OF_LIBRARY_ADDRESS]
			});	
			marker.addListener('click', showLibraryInfo);
			//Storing each market into an array.
			librariesMarkersList.push(marker);
		};
	});
};

//create and store a marker object for each data object on the json
function getHousesMarkersFromJson( lib ){
	var universityLatLng = new google.maps.LatLng({lat: 41.870808, lng: -87.650390});
	$.each(lib, ( posIndex, position ) => {
		var latLng = new google.maps.LatLng([position[INDEX_OF_LOCALIZATION_ARRAY_HOUSES][INDEX_OF_LAT_HOUSES]], [position[INDEX_OF_LOCALIZATION_ARRAY_HOUSES][INDEX_OF_LNG_HOUSES]]);
		//if the distance between the house and the university is less than 4km, its stored.
		var distanceFromUniversity = google.maps.geometry.spherical.computeDistanceBetween(latLng, universityLatLng);
		if (distanceFromUniversity < 4000){
			var marker = new google.maps.Marker({
				position: latLng,
				title: position[INDEX_OF_HOUSES_PROPERTY_NAME],
				icon : HOUSE_MARKER_ICON,
				address : position[INDEX_OF_HOUSE_ADDRESS],
				communityArea : position[INDEX_OF_HOUSES_COMMUNITY_AREA_NAME]
			});
			//add the infoWindow behaviour to the marker.
			marker.addListener('click', showHouseInfoWindow);
		 	//Storing each market into an array.
		 	housesMarkersList.push(marker);
	 	};
	});
	//get the rent 
	//ZillowLibrary.getRentPriceZillow(housesMarkersList, housesMarkersListWithRentPrice);
};

//create and store a marker object for each data object on the json
function getPoliceStationMarkersFromJson( lib ){
	var universityLatLng = new google.maps.LatLng({lat: 41.870808, lng: -87.650390});
	$.each(lib, ( posIndex, position ) => {
		var latLng = new google.maps.LatLng([position[INDEX_OF_LOCALIZATION_ARRAY_POLICE_STATIONS][INDEX_OF_LAT_POLICE_STATIONS]], [position[INDEX_OF_LOCALIZATION_ARRAY_POLICE_STATIONS][INDEX_OF_LNG_POLICE_STATIONS]]);
		//if the distance between the house and the university is less than 6km, its stored.
		var distanceFromUniversity = google.maps.geometry.spherical.computeDistanceBetween(latLng, universityLatLng);
		if (distanceFromUniversity < 6000){
			var marker = new google.maps.Marker({
				position: latLng,
				title: position[INDEX_OF_POLICE_STATIONS_DISTRICT_NAME],
				icon : POLICE_STATION_MARKER_ICON,
				address : position[INDEX_OF_POLICE_STATIONS_ADDRESS]
			});
			//add the infoWindow behaviour to the marker.
			marker.addListener('click', showPoliceStationInfoWindow);
		 	//Storing each market into an array.
		 	policeStationsMarkersList.push(marker);
		};
	});
};

//create and store a marker object for each data object on the json
function getFireStationMarkersFromJson( lib ){
		var universityLatLng = new google.maps.LatLng({lat: 41.870808, lng: -87.650390});
		$.each(lib, ( posIndex, position ) => {
			var latLng = new google.maps.LatLng([position[INDEX_OF_LOCALIZATION_ARRAY_FIRE_STATIONS][INDEX_OF_LAT_FIRE_STATIONS]], [position[INDEX_OF_LOCALIZATION_ARRAY_FIRE_STATIONS][INDEX_OF_LNG_FIRE_STATIONS]]);
			//if the distance between the house and the university is less than 6km, its stored.
			var distanceFromUniversity = google.maps.geometry.spherical.computeDistanceBetween(latLng, universityLatLng);
			if (distanceFromUniversity < 6000){
				var marker = new google.maps.Marker({
					position: latLng,
					title: position[INDEX_OF_FIRE_STATIONS_ADDRESS],
					icon : FIRE_STATION_MARKER_ICON,
				});
				//add the infoWindow behaviour to the marker.
				marker.addListener('click', showFireStationInfoWindow);
			 	//Storing each market into an array.
			 	fireStationsMarkersList.push(marker);
			};
		});
};

//display an infoWindow to show the university info
function showUniversityInfoWindow(){
	infowindow.setContent(DCS_UI_INFO_WINDOW_STRING);
	infowindow.open(this.map, this);
}
//display an infoWindow when any library marker is pressed. 
function showLibraryInfo(){
	infowindow.setContent(
							"Library name: " + this.title + '<br /> ' +
							"Address: " + this.address + '<br /> ' +
							"Hours of operation: " + this.hoursOfOperation 
						);
	infowindow.open(this.map, this);
};
//display an infoWindow when any house marker is pressed. 
function showHouseInfoWindow(){
	infowindow.setContent(
							"Property name: " + this.title + '<br /> ' +
							"Address: " + this.address + '<br /> ' +
							"Community Area: " + this.communityArea + '<br /> '
							
						);
	//"Estimated rent price: $" + this.rentZestimate
	infowindow.open(this.map, this);
	console.log(this.getPosition().lat());
	console.log(this.getPosition().lng());
	getRoute(this.getPosition().lat(), this.getPosition().lng());
};
//display an infoWindow when any police station marker is pressed. 
function showPoliceStationInfoWindow(){
	infowindow.setContent(this.title + '<br />' + this.address);
	infowindow.open(this.map, this);
};
//display an infoWindow when any fire station marker is pressed. 
function showFireStationInfoWindow(){
	infowindow.setContent(this.title);
	infowindow.open(this.map, this);
};
//draw each marker object from markerList array on the map
function drawMarkers( markerList ){
		$.each(markerList, ( posIndex, marker ) => {
			marker.setMap(map);
		})
};

// show the markers if toggle != null
function setMarkersOnMap( markersCategory, toggle, distance ) {
	switch (markersCategory){
		case DatasetLibrary.DATASETS_TYPES_ENUM.LIBRARIES:
			if (toggle != null) {
				drawMarkers(librariesMarkersList);
			}else{
				removeAllMarkersFromList(librariesMarkersList);
			}
		break;
		case DatasetLibrary.DATASETS_TYPES_ENUM.POLICE_STATIONS:
			if (toggle != null) {
				drawMarkers(policeStationsMarkersList);
			}else{
				removeAllMarkersFromList(policeStationsMarkersList);
			}
		break;
		case DatasetLibrary.DATASETS_TYPES_ENUM.FIRE_STATIONS:
			if (toggle != null) {
				drawMarkers(fireStationsMarkersList);
			}else{
				removeAllMarkersFromList(fireStationsMarkersList);
			}
		break;
		case DatasetLibrary.DATASETS_TYPES_ENUM.HOUSES:
			drawMarkerHouses(distance);
		break;
	};
}

//draw the houses markers that are on the selected distance from the university
function drawMarkerHouses( distance ){
	$.each(housesMarkersList, ( posIndex, marker ) => {
		//erase every marker
		marker.setMap(null);
		var latLng = new google.maps.LatLng({lat: marker.getPosition().lat(), lng: marker.getPosition().lng()});
		//if the distance between the house and the university is less than distance, its drawed.
		var distanceFromUniversity = google.maps.geometry.spherical.computeDistanceBetween(latLng, universityLatLng);
		if (distanceFromUniversity < distance){
			marker.setMap(map);
		};
	})
}

//remove the map of each marker from markerList parameter
function removeAllMarkersFromList( markerList ) {
	$.each(markerList, ( posIndex, marker ) => {
		marker.setMap(null);
	});
}

//draw on the map the route between two points.
function getRoute( pointLat, pointLng){
	var ll = new google.maps.LatLng({lat: 41.8822718277, lng: 87.66598097669998});
	var request = {
	    origin: ll,
	    destination: universityLatLng,
	    travelMode: 'TRANSIT',
	    transitOptions: {
		    modes: ['BUS']
		},
		unitSystem: google.maps.UnitSystem.IMPERIAL
  	};
	directionsService.route(request, function(result, status) {
		console.log(status);
	    if (status == 'OK') {
	      directionsDisplay.setDirections(result);
	    }
  });
}


//exported functions//

module.exports.setMarkersOnMap = setMarkersOnMap;
module.exports.initGoogleMap = initGoogleMap;
module.exports.getMarkersFromDataset = getMarkersFromDataset;

//exported functions//
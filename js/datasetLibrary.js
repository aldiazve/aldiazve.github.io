//////////////////////////////////////// ----- Get libraries dataset functions ----- ///////////////////////////////

//-- Constants --//
//-- Datasets sources --//
const LIBRARIES_JSON_SOURCE = "https://data.cityofchicago.org/api/views/x8fc-8rcq/rows.json?accessType=DOWNLOAD";
const HOUSES_JSON_SOURCE = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
const POLICE_STATIONS_JSON_SOURCE = "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD";
const FIRE_STATIONS_JSON_SOURCE = "https://data.cityofchicago.org/api/views/28km-gtjn/rows.json?accessType=DOWNLOAD";
//-- Datasets types ENUM
const DATASETS_TYPES_ENUM = {
	LIBRARIES : "LIBRARIES",
	POLICE_STATIONS : "POLICE_STATIONS",
	FIRE_STATIONS : "FIRE_STATIONS",
	HOUSES : "HOUSES"
}
//-- Constants --//
//-- datasets json objects --//
var librariesJson;
var housesJson;
var policeStationJson;
var fireStationJson;
//-- Jquery dobject --//
var $ = require("jquery");
var ZillowLibrary = require("./zillowLibrary");
var MapLibrary = require("./mapLibrary");

//Get data files in json format using jquery
function initDataSets(){
	//get libraries dataset
	$.get(LIBRARIES_JSON_SOURCE, ( response ) => {
		librariesJson = response.data;
		MapLibrary.getMarkersFromDataset(librariesJson, DATASETS_TYPES_ENUM.LIBRARIES);
	} , "json").fail( ( response, status, error ) => {
		// errors:
	}).always( ( response, status, error ) => {
		console.log(response);
	});
	//get houses dataset
	$.get(HOUSES_JSON_SOURCE, ( response ) => {
		housesJson = response.data;
		MapLibrary.getMarkersFromDataset(housesJson, DATASETS_TYPES_ENUM.HOUSES);
	} , "json").fail( ( response, status, error ) => {
		// errors:
	}).always( ( response, status, error ) => {
		console.log(response);
	});
	//get police station dataset
	$.get(POLICE_STATIONS_JSON_SOURCE, ( response ) => {
		policeStationJson = response.data;
		MapLibrary.getMarkersFromDataset(policeStationJson, DATASETS_TYPES_ENUM.POLICE_STATIONS);
		//getRentZestimateForAllHouses(housesMarkersList);
	} , "json").fail( ( response, status, error ) => {
		// errors:
	}).always( ( response, status, error ) => {
		console.log(response);
	});
	//get fire station dataset
	$.get(FIRE_STATIONS_JSON_SOURCE, ( response ) => {
		fireStationJson = response.data;
		MapLibrary.getMarkersFromDataset(fireStationJson, DATASETS_TYPES_ENUM.FIRE_STATIONS);
		//getRentZestimateForAllHouses(housesMarkersList);
	} , "json").fail( ( response, status, error ) => {
		// errors:
	}).always( ( response, status, error ) => {
		console.log(response);
	});

		/*
	
	$.get(LIBRARIES_JSON_SOURCE, ( reponse ) => {
		bookStoresJson = response;
	} , "json");
	
	$.get(LIBRARIES_JSON_SOURCE, ( reponse ) => {
		bookStoresJson = response;
	} , "json");
	*/
}

//Get the rent rentZestimate for each marker if its available
function getRentZestimateForAllHouses(){
	ZillowLibrary.getRentPriceZillow(housesMarkersList);
}

//////////////////////////////////////// ----- Get libraries dataset functions end ----- ///////////////////////////////

//exported functions//
module.exports.initDataSets = initDataSets;
module.exports.DATASETS_TYPES_ENUM = DATASETS_TYPES_ENUM;
//exported functions//
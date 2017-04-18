//-- Constants ---//
const BASE_URL = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=CITY:chicago&startdate=2017-05-01&enddate=2017-05-01";
const DATASET_ENDPOINT = "data?datasetid=GSOM";
const TOKEN = "OaFBuyVJNNGxgfHBdsogwhxBTdHMHOmO";
//-- Basic dependencies --//
var $ = require("jquery");


function askForWeather(){
	var composedURL = BASE_URL;
	$.ajax({
		url: composedURL,
		headers: {
			'token' : TOKEN,
		}
	}).done( ( data, status, jqXHR) => {
		console.log(data);
		console.log(status);
		console.log(jqXHR);
	});
};

function onWeatherResponse( response ){

}

//-- Exported funcs --//

module.exports.askForWeather = askForWeather;
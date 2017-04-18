/////////////////////////////////// Zillow Library /////////////////////////////////////////////////

//------------- Constants ----------------//

const GET_SEARCH_RESULTS_URL = "https://www.zillow.com/webservice/GetSearchResults.htm";
const CITY_AND_ZIP_PARAMETER = "&citystatezip=Chicago, IL";
const ZILLOW_ID = "?zws-id=X1-ZWz1fqj9h907wr_4g4th";
const ADDRESS_PARAMETER = "&address=";
const RENT_ZESTIMATE_PARAMETER = "&rentzestimate=true";



//------------- Constants ----------------//

//--------- basic dependensies ---------//
var $ = require("jquery");
var xmlParser = require("xml-parser");
//--------- basic dependensies ---------//

function getZillowData() {
	
	var composedURL = GET_SEARCH_RESULTS_URL + ZILLOW_ID + ADDRESS_PARAMETER + CITY_AND_ZIP_PARAMETER + RENT_ZESTIMATE_PARAMETER;
	$.get(composedURL, ( response ) => {
		//console.log(response);
		var parsing = xmlParser(response);
		//0 = Request successfully processed, != 0, error
		var errorCode = parsing.root.children[1].children[1].content;
		if (errorCode == 0){
			//rent 'explore' de xml response to reach the rent value.
			var rent = parsing.root.children[2].children[0].children[0].children[10].children[0].content;
			console.log(rent);
			//console.log(parsing);
		}else{
			console.log(errorCode);
		}
	} , "text").fail( ( response, status, error ) => {
		// errors:
	}).always( ( response, status, error ) => {
	});
};

function getRentPriceZillow( housesMarkersList, housesMarkersListWithRentPrice ) {
	var aux = 0;
	$.each( housesMarkersList, ( posIndex, marker ) => {
		var composedURL = GET_SEARCH_RESULTS_URL + ZILLOW_ID + ADDRESS_PARAMETER + marker.address + CITY_AND_ZIP_PARAMETER + RENT_ZESTIMATE_PARAMETER;
		$.get(composedURL, ( response ) => {
			//console.log(response);
			var parsing = xmlParser(response);
			//0 = Request successfully processed, != 0, error
			var errorCode = parsing.root.children[1].children[1].content;
			if (errorCode == 0){
				//rent 'explore' de xml response to reach the rent value.
				var rent = parsing.root.children[2].children[0].children[0].children[4].children[0].content;
				marker.rentZestimate = rent;
				aux++;
				housesMarkersListWithRentPrice.push(marker);
			}
		} , "text").fail( ( response, status, error ) => {
			// errors:
		}).always( ( response, status, error ) => {
		});
	});
	
};

module.exports.getRentPriceZillow = getRentPriceZillow;


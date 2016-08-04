function CalculateDistance(lat1, long1, lat2, long2) {
	// Translate to a distance
	var distance =
		Math.sin(lat1 * Math.PI) * Math.sin(lat2 * Math.PI) +
		Math.cos(lat1 * Math.PI) * Math.cos(lat2 * Math.PI) * Math.cos(Math.abs(long1 - long2) * Math.PI);
	
	// Return the distance in miles
	//return Math.acos(distance) * 3958.754;
	
	// Return the distance in meters
	return Math.acos(distance) * 6370981.162;
} // CalculateDistance

function initiate_geolocation() {  
	navigator.geolocation.getCurrentPosition(handle_geolocation_query,handle_errors);  
}  
function handle_errors(error)  {  
	switch(error.code)  {  
		case error.PERMISSION_DENIED: alert("user did not share geolocation data");  
		break;  
		case error.POSITION_UNAVAILABLE: alert("could not detect current position");  
		break;  
		case error.TIMEOUT: alert("retrieving position timed out");  
		break;  
		default: alert("unknown error");  
		break;  
	}  
}  

function handle_geolocation_query(position){  
	// The target longitude and latitude
	var targetlong = 23.456;
	var targetlat = 21.098;
		
	// Start an interval every 1s
	var OurInterval = setInterval(OnInterval, 1000);
		
	// Call this on an interval
	function OnInterval() {
		// Get the coordinates they are at
		var lat = position.coords.latitude;
		var long = position.coords.longitude;
		var distance = CalculateDistance(targetlat, targetlong, lat, long);
		
		// Is it in the right distance? (200m)
		if (distance <= 200) {
			// Stop the interval
			stopInterval(OurInterval);
			// Do something here cause they reached their destination
		}
	}
}
// start the whole geo positioning...
//initiate_geolocation();

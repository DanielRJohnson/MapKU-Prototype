function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 38.957235, lng: -95.248962 },
        zoom: 16,
    });
    directionsRenderer.setMap(map); 
    const calculateDirections = function (){
        mapRoute(directionsService, directionsRenderer);
    }
    document.getElementById("CalculateDirections").addEventListener("click", calculateDirections);
}

function mapRoute(directionsService, directionsRenderer){

    const wayps = [];
    wayps.push({location: document.getElementById("Waypoints").value + ", lawrence", stopover: true}); 

    directionsService.route(
        {
            origin: {
                query: document.getElementById("DirectionsStart").value + ", lawrence", //This could cause some issues in the future
            },
            destination: {
                query: document.getElementById("DirectionsEnd").value + ", lawrence", //This could cause some issues in the future
            },
            waypoints: wayps, 
            travelMode: google.maps.TravelMode.WALKING,
        },
        (response, status) => {
            if (status === "OK"){
                //console.log(response);
                console.log("Distance: ", response.routes[0].legs[0].distance.text);
                console.log("Duration: ", response.routes[0].legs[0].duration.text);
                for (let i = 0; i < response.routes[0].legs[0].steps.length; i++){
                    console.log(response.routes[0].legs[0].steps[i].instructions, "in", response.routes[0].legs[0].steps[i].distance.text);
                }
                //console.log("Steps: ", response.routes[0].legs[0].steps);
                directionsRenderer.setDirections(response);
                console.log("Got to the good outcome from", document.getElementById("DirectionsStart").value, "to", document.getElementById("DirectionsEnd").value);
            }
            else{
                console.log("Directions fucked up by: " + status);
            }
        }
    );
}
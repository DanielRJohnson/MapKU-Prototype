function initMap() {
    const snowHall = {lat: 38.9586897463383, lng: -95.24913753763796};
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 38.957235, lng: -95.248962 },
        zoom: 16,
        disableDefaultUI: true,
    });
    
    directionsRenderer.setMap(map); 
    const calculateDirections = function (route){
        mapRoute(directionsService, directionsRenderer, route);
    }
    let myRoute = new Route();
    document.getElementById("addToRoute").addEventListener("click", () => {
        myRoute.addToRoute(document.getElementById("searchBox").value);
        //console.log(myRoute);
    });
    document.getElementById("calculateRoute").addEventListener("click", () => {
        calculateDirections(myRoute);
    })
    let addMarker = (latLng, title) => {
        let marker = new google.maps.Marker({
            position: {lat: latLng.lat, lng: latLng.lng},
            map,
            title: title
        });
        marker.setOpacity(.4);
        marker.addListener('mouseover', function() {
            marker.setOpacity(1);
        });
        marker.addListener('mouseout', function() {
            if (!myRoute.isInRoute(title)){
                marker.setOpacity(0.4);
            }
        });
    
        const infowindow = new google.maps.InfoWindow({
            content: title
        });
        
        marker.addListener("click", () => {
            infowindow.open(map, marker);
        });

        marker.addListener("dblclick", () => {
            myRoute.addToRoute(title);
            infowindow.close();
        })
    }

    addMarker(snowHall, "Snow Hall");

    map.addListener("click" , (mouseEvent) => {
        console.log(mouseEvent.latLng.lat(), mouseEvent.latLng.lng());
    });
}

function mapRoute(directionsService, directionsRenderer, route){
    directionsService.route(
        {
            origin: {
                query: route.origin,
            },
            destination: {
                query: route.destination,
            },
            waypoints: route.wayps,
            travelMode: google.maps.TravelMode.WALKING,
        },
        (response, status) => {
            if (status === "OK"){
                //console.log(response);
                document.getElementById("directionInfo").innerHTML = 
                    "Distance: " + response.routes[0].legs[0].distance.text  + "<br>" + 
                    "Duration: " + response.routes[0].legs[0].duration.text  + "<br>";
                //console.log("Distance: ", response.routes[0].legs[0].distance.text);
                //console.log("Duration: ", response.routes[0].legs[0].duration.text);
                for (let i = 0; i < response.routes[0].legs[0].steps.length; i++){
                    document.getElementById("directionInfo").innerHTML += response.routes[0].legs[0].steps[i].instructions + " in " + response.routes[0].legs[0].steps[i].distance.text + "<br>";
                   // console.log(response.routes[0].legs[0].steps[i].instructions, "in", response.routes[0].legs[0].steps[i].distance.text);
                }
                directionsRenderer.setDirections(response);
                console.log("Successfully routed from", route.origin, "to", route.destination);
            }
            else{
                console.log("Directions error: " + status);
            }
        }
    );
}
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
        if (myRoute.isValidRoute()) calculateDirections(myRoute);
        else alert("Route must have at least two points");
        document.getElementById("searchBox").value = "";
    })
    document.getElementById("clearRoute").addEventListener("click", () => {
        location.reload();
        /*myRoute.clearRoute();
        directionsRenderer.setMap(null);
        document.getElementById("searchBox").value = "";*/
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
                console.log(response);
                let distance = 0, duration = 0;
                let dirtext = document.getElementById("directionInfo");
                dirtext.innerHTML = "";
                for (let i = 0; i < response.routes[0].legs.length; i++){
                    dirtext.innerHTML += "<u><b>Point " + (i+1) + " to point " + (i+2) + ":</b></u></br>" +
                    "Distance: " + response.routes[0].legs[i].distance.text  + "</br>" + 
                    "Duration: " + response.routes[0].legs[i].duration.text  + "</br>";
                    distance += parseInt(response.routes[0].legs[i].distance.text);
                    duration += parseInt(response.routes[0].legs[i].duration.text);
                    for (let j = 0; j < response.routes[0].legs[i].steps.length; j++){
                        dirtext.innerHTML += response.routes[0].legs[i].steps[j].instructions + " in " + response.routes[0].legs[i].steps[j].distance.text + "<br>";
                    }
                }
                directionsRenderer.setDirections(response);
                console.log("Successfully routed from", route.origin, "to", route.destination);
            }
            else{
                console.log("Directions error: " + status);
                alert("There was an error processing the directions.");
            }
        }
    );
}
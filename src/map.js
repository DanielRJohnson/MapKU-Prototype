function initMap() {
	var markerImage = new google.maps.MarkerImage('image/Jayhawk.png',
                new google.maps.Size(100, 100),
                new google.maps.Point(0, 0),
                new google.maps.Point(15, 15));
	const beaches = [
        //AnschutzLibrary
        	['<div id="content">'+'<div id="siteNotice">'+"</div>" +
    '<h1 id="firstHeading" class="firstHeading"><u>Anschutz Library</u></h1>' +
    '<div id="bodyContent">' +
            "<h4>Address: 1301 Hoch Auditoria Dr, Lawrence, KS 66045, United States</h4>, <div align='center'> <img src='image/AnschutzLibrary.jpg'></div>" +
    "</div>", 38.957325, -95.249661, "Anschutz Library"],
        //KU Engineering
		[	    '<div id="content">'+'<div id="siteNotice">'+"</div>" +
    '<h1 id="firstHeading" class="firstHeading"><u>KU engineering</u></h1>' +
    '<div id="bodyContent">' +
			"<h4>Address: Eaton Hall, 1520 W 15th St, Lawrence, KS 66045, United States</h4>, <div align='center'><img src='image/KUEngineering.jpg'></div> , </p>" +
    "</div>", 38.95781445088452, -95.25263124321691, "KU Engineering"],
        //Fraser Hall
		[	    '<div id="content">'+'<div id="siteNotice">'+"</div>" +
    '<h1 id="firstHeading" class="firstHeading"><u>Fraser Hall</u></h1>' +
    '<div id="bodyContent">' +
			"<h4>Address: 1415 Jayhawk Blvd, Lawrence, KS 66045, United States</h4>, <div align='center'><img src='image/FraserHall.jpg'></div> , </p>" +
    "</div>", 38.957273866157685, -95.24356786041308,"Fraser Hall"],
        //Wescoe Hall
		[    	    '<div id="content">'+'<div id="siteNotice">'+"</div>" +
    '<h1 id="firstHeading" class="firstHeading"><u>Wescoe Hall</u></h1>' +
    '<div id="bodyContent">' +
			"<h4>Address: 1445 Jayhawk Boulevard, Lawrence, KS 66045</h4>, <div align='center'><img src='image/WescoeHall.jpg'></div> , </p>" +
                "</div>", 38.957784622454255, -95.24777752972496,"Wescoe Hall"],
        //Snow hall
		[				    	    '<div id="content">'+'<div id="siteNotice">'+"</div>" +
    '<h1 id="firstHeading" class="firstHeading"><u>Snow hall</u></h1>' +
    '<div id="bodyContent">' +
			"<h4>Address: 1460 Jayhawk Blvd, Lawrence, KS 66045, United States</h4>, <div align='center'><img src='image/SnowHall.png'></div> , </p>" +
                                "</div>", 38.95892226130865, -95.24899211623296, "Snow Hall"],
        //Lied Center
		[								    	    '<div id="content">'+'<div id="siteNotice">'+"</div>" +
    '<h1 id="firstHeading" class="firstHeading"><u>Lied Center</u></h1>' +
    '<div id="bodyContent">' +
			"<h4>Address: 1600 Stewart Dr, Lawrence, KS 66045, United States</h4>, <div align='center'><img src='image/LiedCenter.jpg'></div> , </p>" +
    "</div>", 38.95511168388419, -95.26276438739704, "Lied Center"]
	];
	

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
    
	let addMarker = (lati, lngi, title, name) => {

		let marker = new google.maps.Marker({
			animation: google.maps.Animation.DROP,
            position: {lat: lati, lng: lngi},
            map,
			title: name,
            icon: markerImage
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
            myRoute.addToRoute(name);
            infowindow.close();
        })
    }
 
	for (let i = 0; i < beaches.length; i++) {
		const beach = beaches[i];
			
		addMarker(beach[1], beach[2], beach[0], beach[3]);
	}

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
            }
        }
    );
}
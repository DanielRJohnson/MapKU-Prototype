/*
* @File: buildings.js
* @Authors: EECS 448 Team 14 - Fall 2020
* @Breif: This file contains a list of KU buildings
*/

//Create a list of buildings that have HTML info about them, latitude, longitude, and a name
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
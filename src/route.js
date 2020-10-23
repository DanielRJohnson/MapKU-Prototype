/*
* @File: route.js
* @Authors: EECS 448 Team 14 - Fall 2020
* @Breif: This file provides a data structure for giving 
*         n-length routes to the Google Directions API
*/

class Route{
    /*
    * @post: A route is created with no values
    */
    constructor(){
        this.origin = undefined;
        this.wayps = [];
        this.destination = undefined;
        //Master List
        this.routeList = [];
    }
    /*
    * @post: A place is added to the route with ", Lawrence Kansas" added to it
    * @param: place: a string to hand into the Google Directions API 
    */
    addToRoute = (place) => {
        this.routeList.push(place + ", Lawrence Kansas");
        //Make the origin the first element of the routeList
        this.origin = this.routeList[0];
        //Make every element except the first and last a waypoint
        this.wayps = [];
        for (let i = 1; i < this.routeList.length - 1; i++){
            this.wayps.push( {location: this.routeList[i], stopover: true} );
        }
        //Make the destination the last element of the routeList
        this.destination = this.routeList[this.routeList.length - 1];

        //Add each point in the route to the sidebar places. (This might not belong here tbh)
        let rtlist = document.getElementById("routeList");
        let li = document.createElement("li");
        li.setAttribute('id', place);
        li.appendChild(document.createTextNode(place));
        rtlist.appendChild(li);
    }
    /*
    * @param: place: a string of a place to check
    * @return: true if the place is in the route, else false
    */
    isInRoute = (place) => {
        let found = false;
        //Loop through the routeList and if it is in the list, set found to true
        for (let i = 0; i < this.routeList.length; i++){
            if (place === this.routeList[i]){
                found = true;
            }
        }
        return found;
    }
    /*
    * @return: True if the route is valid, else false
    * @note: A valid route is one that has a origin, a destination, and has length > 1
    */
    isValidRoute = () => {
        if (origin !== undefined && this.destination !== undefined && this.routeList.length > 1){
            return true;
        }
        return false;
    }
    /*
    * @post: The route is cleared and the HTML is updated as such
    */
    clearRoute = () => {
        //Reset the route to its natural state
        this.routeList = [];
        this.origin = undefined;
        this.destination = undefined;
        this.wayps = [];
        //Reset some of the HTML info
        document.getElementById("routeList").innerHTML = "<u>Route:</u>";
        document.getElementById("directionInfo").innerHTML = "Double click on building markers or search for a building to form a route.";
    }
}
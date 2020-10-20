class Route{
    constructor(){
        this.origin = undefined;
        this.wayps = [];
        this.destination = undefined;
        this.routeList = [];
    }
    addToRoute = (place) => {
        this.routeList.push(place + ", Lawrence Kansas");
        this.origin = this.routeList[0];
        this.wayps = [];
        for (let i = 1; i < this.routeList.length - 1; i++){
            this.wayps.push( {location: this.routeList[i], stopover: true} );
        }
        this.destination = this.routeList[this.routeList.length - 1];

        let rtlist = document.getElementById("routeList");
        let li = document.createElement("li");
        li.setAttribute('id', place);
        li.appendChild(document.createTextNode(place));
        rtlist.appendChild(li);
    }
    isInRoute = (place) => {
        let found = false;
        for (let i = 0; i < this.routeList.length; i++){
            if (place === this.routeList[i]){
                found = true
            }
        }
        return found;
    }
    isValidRoute = () => {
        if (origin !== undefined && this.destination !== undefined && this.routeList.length > 1){
            return true;
        }
        return false;
    }
    clearRoute = () => {
        this.routeList = [];
        this.origin = undefined;
        this.destination = undefined;
        this.wayps = [];
        document.getElementById("routeList").innerHTML = "<u>Route:</u>";
        document.getElementById("directionInfo").innerHTML = "Double click on building markers or search for a building to form a route.";
    }
}
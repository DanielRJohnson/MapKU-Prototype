class Route{
    constructor(){
        this.origin = undefined;
        this.wayps = [];
        this.destination = undefined;
        this.routeList = [];
    }
    addToRoute = (place) => {
        this.routeList.push(place + ", Lawrence");
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
}
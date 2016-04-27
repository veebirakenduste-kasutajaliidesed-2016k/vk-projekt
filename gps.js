function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        var x = position.coords.latitude;
        var y = position.coords.longitude;
        console.log(x, " ", y);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

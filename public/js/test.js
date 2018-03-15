var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoid2F5ZmFyZXItcHJvamVjdDIiLCJhIjoiY2plcWl5bm04MDg2eTMzcGZvcTB3emhiayJ9.P2KUYQOeTbP-_3Caqky0IA'
    }).addTo(mymap);


var marker = L.marker([51.5, -0.09]).addTo(mymap);

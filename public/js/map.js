var map = L.map('map');
map.setView([
  41.8914, -87.6377
], 15);
// map.locate({setView: true, maxZoom: 15});
map.doubleClickZoom.disable();
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);

// This uses the HTML5 geolocation API
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
  });

  // Once we've got a position, zoom and center the map on it, and add a single marker.
  var currentMarker = L.AwesomeMarkers.icon({ icon: 'star', prefix: 'fa', markerColor: 'lightgray', });

  function onLocationFound(e) {
    // var radius = e.accuracy / 2;
    L.marker(e.latlng, { icon: currentMarker, draggable: true }).addTo(map)
      .bindPopup("You are here!")
      .openPopup();
    // L.circle(e.latlng, radius).addTo(map);

    // function onLocationFound(e) {
    //   var radius = e.accuracy / 2;
    //   L.marker(e.latlng).addTo(map)
    //     .bindPopup("You are within " + radius + " meters from this point").openPopup();
    //   L.circle(e.latlng, radius).addTo(map);
  }
  map.on('locationfound', onLocationFound);
} else {
  alert("Geolocation API is not supported in your browser. :(");
}

// map.on('locationfound', function (e) {
//   map.fitBounds(e.bounds);

//   myLayer.setGeoJSON({
//     type: 'Feature',
//     geometry: {
//       type: 'Point',
//       coordinates: [e.latlng.lng, e.latlng.lat]
//     },
//     properties: {
//       'title': 'Here I am!',
//       'marker-color': '#ff8888',
//       'marker-symbol': 'star'
//     }
//   });

  // If the user chooses not to allow their location to be shared, display an error message.
  // map.on('locationerror', function () {
  //   geolocate.innerHTML = 'Position could not be found';
  // });

var sidebar = L.control.sidebar('sidebar').addTo(map);

var popup = L.popup();



filepicker.setKey("Aq4cOkrFRwCSU00DF54uIz");

var tempMarker = L.AwesomeMarkers.icon({icon: 'spinner', prefix: 'fa', markerColor: 'red', spin: true});
var userMarker = L.AwesomeMarkers.icon({icon: 'comment', prefix: 'fa', markerColor: 'green', iconColor: 'yellow'});
var otherMarker = L.AwesomeMarkers.icon({icon: 'info', prefix: 'fa', markerColor: 'orange', iconColor: 'blue'});

var newMarker = {}

function addMarker(e) {

  if (newMarker != undefined) {
           map.removeLayer(newMarker);
     };
  // Add marker to map at click location; add popup window

    newMarker = new L.marker(e.latlng, {
      icon: tempMarker,
      draggable: true
    }).addTo(map);


    console.log(newMarker)

    var position = newMarker.getLatLng();

    var deleteBtn = $('<button>delete</button>').click(function() {
      map.removeLayer(newMarker)
    })[0];

    var uploadBtn = $('<button>Upload</button>').click(function() {
      filepicker.pick({
        mimetype: 'image/*',
        /* Images only */
        maxFiles: 3,
        /* Limits uploads to five at a time */
        maxSize: 1024 * 1024 * 5,
        /* 5mb */
        imageMax: [
          1500, 1500
        ],
        /* 1500x1500px */
        cropRatio: 1 / 1,
        /* Perfect squares */
        services: ['*']/* All available third-parties */

      }, function(blob) {
        // Returned Stuff
        var filename = blob.filename;
        var url = blob.url;
        var id = blob.id;
        var isWriteable = blob.isWriteable;
        var mimetype = blob.mimetype;
        var size = blob.size;
        $('#post_url').attr('src', blob.url)
        $('#post_url').attr("visibility", "visible")
        $('#post_url').attr('height', "50px")
        $('#post_url').attr('width', "50px")
        // $(popupBox).append("<img style='width:50px; height:50px; ' src='" + url + "'id='post_url'>");

        console.log(blob.url)

      });
    });

    var addPostBtn = $('<button>Post</button>').click(function() {
      var postSubject = $('#post_subject').val()
      var postText = $('#post_text').val()
      var position = newMarker.getLatLng();
      var postUrl = $('#post_url').attr("src")
      postData = {
        'subject': postSubject,
        'text': postText,
        'latitude': position.lat,
        'longitude': position.lng,
        'post_img': postUrl
      }

      $.post("/api/posts", postData).then(function(data) {
        console.log(data)
        map.closePopup();
        newMarker.dragging.disable()
        map.removeLayer(newMarker)
      });
    })[0];

    var popupBox = document.createElement('div');

    if (currentUserId) {
      $(popupBox).append('<input placeholder="Subject" type="text" id="post_subject"><br>')
      $(popupBox).append('<input placeholder="Text" type="textbox" id="post_text"><br>')
      $(popupBox).append("<img style= 'width: 50px%'  id='post_url'>");
      $(popupBox).append(addPostBtn)
      $(popupBox).append(deleteBtn)
      $(popupBox).append(uploadBtn)
    } else {
      $(popupBox).append('<p>please login to post</p>')
    }

    newMarker.bindPopup(popupBox);


    newMarker.on('dragend', function(event) {
      var marker = event.target;
      var position = marker.getLatLng();
      marker.setLatLng(new L.LatLng(position.lat, position.lng), {draggable: 'true'});
      map.panTo(new L.LatLng(position.lat, position.lng))
      console.log("drag pin pos:" + position);
    });


};

map.on('dblclick', addMarker);

// Populate all postSubject
function populateMap() {

  $.get("/api/posts", function(data) {

    for (var y = 0; y < data.length; y++) {
      var lat = data[y].latitude
      var lon = data[y].longitude

      if (data[y].user_id - currentUserId === 0) {
        var marker = L.marker([
          lat, lon
        ], {icon: userMarker}).addTo(map);
      } else {
        var marker = L.marker([
          lat, lon
        ], {icon: otherMarker}).addTo(map);
      }
      var popupBox = document.createElement('div');
      $(popupBox).attr('id', `post-${data[y].id}`)
      $(popupBox).append(`<p>Subject:${data[y].subject}</p>`)
      $(popupBox).append(`<p>Text:${data[y].text}</p>`)
      $(popupBox).append(`<p>User_Id:${data[y].user_id}</p>`)
      $(popupBox).append(`<img src=" ${data[y].post_img} "/>`);

      marker.bindPopup(popupBox)
    }

  })

}

function populateOne(id) {

  $.get(`/api/posts/${id}`, function(data) {

    var lat = data.latitude
    var lon = data.longitude

    if (data.user_id - currentUserId === 0) {
      var marker = L.marker([
        lat, lon
      ], {icon: userMarker}).addTo(map);
    } else {
      var marker = L.marker([
        lat, lon
      ], {icon: otherMarker}).addTo(map);
    }
    var popupBox = document.createElement('div');
    $(popupBox).attr('id', `post-${data.id}`)
    $(popupBox).append(`<p>Subject:${data.subject}</p>`)
    $(popupBox).append(`<p>Text:${data.text}</p>`)
    $(popupBox).append(`<p>User_Id:${data.user_id}</p>`)
    $(popupBox).append(`<img src=" ${data.post_img} "/>`);

    marker.bindPopup(popupBox)

  })
}

$(document).ready(function() {
  $.get("/api/user_data").then(function(data1) {
    currentUserId = ''
    if (data1.id) {
      currentUserId = data1.id
    }

    populateMap(currentUserId)

  })

})

//sockets

var socket = io();

socket.on('connect', () => {
  console.log('connected to server');
});

socket.on('disconnect', () => {
  console.log('disconnected from server');
});

socket.on('newPost', (id) => {
  if(id>0){
    console.log('now post id: '+id);
    populateOne(id)
  }
});

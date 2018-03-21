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

var sidebar = L.control.sidebar('sidebar').addTo(map);

var popup = L.popup();

var pin = false

var tempMarker = L.AwesomeMarkers.icon({icon: 'spinner', prefix: 'fa', markerColor: 'red', spin: true});
var userMarker = L.AwesomeMarkers.icon({ icon: 'comment', prefix: 'fa', markerColor: 'green', iconColor: 'yellow'});
var otherMarker = L.AwesomeMarkers.icon({ icon: 'info', prefix: 'fa', markerColor: 'orange', iconColor: 'blue' });

function addMarker(e) {
  // Add marker to map at click location; add popup window
  if (!pin) {
    var newMarker = new L.marker(e.latlng, {
      icon: tempMarker, 
      draggable: true
    }).addTo(map);
    
    var position = newMarker.getLatLng();
    console.log("new pin pos:" + position);

    var deleteBtn = $('<button>delete</button>').click(function() {
      map.removeLayer(newMarker)
      pin = false;
    })[0];

    var addPostBtn = $('<button>Post</button>').click(function() {
      var postSubject = $('#post_subject').val()
      var postText = $('#post_text').val()
      var position = newMarker.getLatLng();
      postData = {
        'subject': postSubject,
        'text': postText,
        'latitude': position.lat,
        'longitude': position.lng
      }

      console.log(postData)

      $.post("/api/posts", postData).then(function(data) {
        pin=false
        console.log(data)
        newMarker = userMarker;
      });
    })[0];

    var popupBox = document.createElement('div');

    $(popupBox).append('<input placeholder="Subject" type="text" id="post_subject"><br>')
    $(popupBox).append('<input placeholder="Text" type="textbox" id="post_text"><br>')
    $(popupBox).append(addPostBtn)
    $(popupBox).append(deleteBtn)

    newMarker.bindPopup(popupBox);

    pin = true;

    newMarker.on('dragend', function(event) {
      var marker = event.target;
      var position = marker.getLatLng();
      marker.setLatLng(new L.LatLng(position.lat, position.lng), {draggable: 'true'});
      map.panTo(new L.LatLng(position.lat, position.lng))
      console.log("drag pin pos:" + position);
    });

  }
};

map.on('dblclick', addMarker);


// Populate all postSubject
function populateMap() {
  $.get("/api/posts", function(data) {
    console.log(data)

    for (var y = 0; y<data.length; y++){

      // need to create if else statements for if the post does or doesn't belong to the user account
      var lat = data[y].latitude
      var lon = data[y].longitude
      var marker = L.marker([lat, lon], {
        icon: otherMarker,
        draggable: false
      }).addTo(map);
      var popupBox = document.createElement('div');
      $(popupBox).append(`<p>Subject:${data[y].subject}</p>`)
      $(popupBox).append(`<p>Text:${data[y].text}</p>`)
      $(popupBox).append(`<p>User_Id:${data[y].user_id}</p>`)
      marker.bindPopup(popupBox)
    }

  });
}


populateMap()

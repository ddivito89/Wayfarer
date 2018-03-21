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

var redMarkerSpin = L.AwesomeMarkers.icon({icon: 'spinner', prefix: 'fa', markerColor: 'red', spin: true});
var redMarker = L.AwesomeMarkers.icon({icon: 'comment', prefix: 'fa', markerColor: 'red', spin: false});

// L.marker([41.8914, -87.6377], { icon: redMarker }).addTo(map);

var coffeeMarker = L.AwesomeMarkers.icon({ icon: 'comment', prefix: 'fa', markerColor: 'darkpurple', iconColor: '#f28f82'});

// L.marker([41.89, -87.63], { icon: coffeeMarker }).addTo(map);
//
// L.marker([41.8924, -87.6397], { icon: L.AwesomeMarkers.icon({ icon: 'shopping-cart', prefix: 'fa', markerColor: 'blue', iconColor: 'black' }) }).addTo(map);
// L.marker([41.8934, -87.6367], { icon: L.AwesomeMarkers.icon({ icon: 'info', prefix: 'fa', markerColor: 'orange' }) }).addTo(map);



function addMarker(e) {
  // Add marker to map at click location; add popup window
  if (!pin) {
    var newMarker = new L.marker(e.latlng, {
      draggable: true,
      icon: redMarkerSpin
    }).addTo(map)
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

  $.get("/api/user_data").then(function(data1) {
    currentUserId = ''
    console.log(data1.id)
    if (data1.id){
      currentUserId = data1.id
    }
    $.get("/api/posts", function(data) {

      for (var y = 0; y<data.length; y++){
        var lat = data[y].latitude
        var lon = data[y].longitude

        console.log(data[y].user_id + " " + currentUserId)
        if (data[y].user_id - currentUserId ===0){
          console.log('yes')
          var marker = L.marker([lat, lon], {icon:redMarker}).addTo(map);
        }else{
          console.log('nope')
          var marker = L.marker([lat, lon], {icon:coffeeMarker}).addTo(map);
        }
        var popupBox = document.createElement('div');
        $(popupBox).append(`<p>Subject:${data[y].subject}</p>`)
        $(popupBox).append(`<p>Text:${data[y].text}</p>`)
        $(popupBox).append(`<p>User_Id:${data[y].user_id}</p>`)
        marker.bindPopup(popupBox)
      }

    });

  })

}


populateMap()

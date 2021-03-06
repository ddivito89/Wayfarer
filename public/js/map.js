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

filepicker.setKey("A9QIMpcVMSCiUoRg9k8Izz");

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

  var uploadBtn = $('<button>Upload A Photo</button>').click(function() {
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
    var categories = $('#categories').val()
    var position = newMarker.getLatLng();
    var postUrl = $('#post_url').attr("src")
    postData = {
      'subject': postSubject,
      'text': postText,
      'categories': categories,
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
    $(popupBox).append('<select name="categories" id="categories">' + '<option value = "None">' + 'No category' + '</option>' + '<option value ="Food">' + 'Food' + '</option>' + '<option value ="Sports">' + 'Sports' + '</option>' + '<option value ="Drinks">' + 'Drinks' + '</option>')
    $(popupBox).append("<br>");
    $(popupBox).append("<br>");
    $(popupBox).append('<input placeholder="Subject" type="text" id="post_subject"><br>')
    $(popupBox).append("<br>");
    $(popupBox).append('<input placeholder="Text" type="textbox" id="post_text"><br>')
    $(popupBox).append("<br>");
    $(popupBox).append("<img style= 'width: 50px%'  id='post_url'>");
    $(popupBox).append("<br>");
    $(popupBox).append(addPostBtn)
    $(popupBox).append(deleteBtn)
    $(popupBox).append(uploadBtn)
  } else {
    $(popupBox).append('<p>Please' + " " + '<a href="#" onclick="openModal()">login</a>' + " " + 'to post</p>')
  }

  var addPostBtn = $('<button>Post</button>').click(function() {
    var postSubject = $('#post_subject').val()
    var postText = $('#post_text').val()
    var categories = $('#categories').val()
    var position = newMarker.getLatLng();
    var postUrl = $('#post_url').attr("src")
    postData = {
      'subject': postSubject,
      'text': postText,
      'categories': categories,
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
    $(popupBox).append('<select name="categories" id="categories">' + '<option value = "none">' + 'No category' + '</option>' + '<option value ="Food">' + 'Food' + '</option>' + '<option value ="Sports">' + 'Sports' + '</option>' + '<option value ="Drinks">' + 'Drinks' + '</option>')
    $(popupBox).append("<br>");
    $(popupBox).append("<br>");
    $(popupBox).append('<input placeholder="Subject" type="text" id="post_subject"><br>')
    $(popupBox).append("<br>");
    $(popupBox).append('<input placeholder="Text" type="textbox" id="post_text"><br>')
    $(popupBox).append("<br>");
    $(popupBox).append("<img style= 'width: 50px%'  id='post_url'>");
    $(popupBox).append("<br>");
    $(popupBox).append(addPostBtn)
    $(popupBox).append(deleteBtn)
    $(popupBox).append(uploadBtn)
  } else {
    $(popupBox).append('<p>Please' + " " + '<a href="#" onclick="openModal()">login</a>' + " " + 'to post</p>')
  }

  newMarker.bindPopup(popupBox, {maxWidth: 1000});

  newMarker.bindPopup(popupBox);

  newMarker.on('dragend', function(event) {
    var marker = event.target;
    var position = marker.getLatLng();
    marker.setLatLng(new L.LatLng(position.lat, position.lng), {draggable: 'true'});
    map.panTo(new L.LatLng(position.lat, position.lng))
    console.log("drag pin pos:" + position);
  });
  newMarker.bindPopup(popupBox, {maxWidth: 1000});

  newMarker.on('dragend', function(event) {
    var marker = event.target;
    var position = marker.getLatLng();
    marker.setLatLng(new L.LatLng(position.lat, position.lng), {draggable: 'true'});
    map.panTo(new L.LatLng(position.lat, position.lng))
    console.log("drag pin pos:" + position);
  });

};

map.on('dblclick', addMarker);

// Populate all posts
function populateMap() {

  $.get("/api/posts", function(data) {

    for (var y = 0; y < data.length; y++) {
      var lat = data[y].latitude
      var lon = data[y].longitude

      var icon = data[y].categories;

      if (icon === 'Food') {
        icon = 'cutlery';
        console.log(icon);
      }
      if (icon === 'Sports') {
        icon = 'futbol-o';
        console.log(icon);
      }
      if (icon === 'Drinks') {
        icon = 'glass';
        console.log(icon);
      }

      var userMarker = L.AwesomeMarkers.icon({icon: icon, prefix: 'fa', markerColor: 'green', iconColor: 'yellow'});
      var otherMarker = L.AwesomeMarkers.icon({icon: icon, prefix: 'fa', markerColor: 'orange', iconColor: 'blue'});

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
      $(popupBox).append(`<p>User${data[y].user_id}  ${moment(new Date(data[y].createdAt)).format("MM/DD/YYYY, hh:mm A")}</p>`)
      $(popupBox).append(`<p id="post_subject1">${data[y].subject}</p>`)
      $(popupBox).append(`<p id="post_text">${data[y].text}</p>`)
      $(popupBox).append(`<p>Category: ${data[y].categories}</p>`)
      $(popupBox).append(`<img id="reload_img" src=" ${data[y].post_img} "/>`);

      if (currentUserId) {
        $(popupBox).append(`<input placeholder="add a comment" type="textbox" id='newComment-${data[y].id}' class="commentBox"><br>`)

        var commentBtn = $(`<button class="comment-button" id='${data[y].id}-button'>Post</button>`).click(function() {
          var post_id = $(this).attr('id').split("-")[0]
          var text = $(`#newComment-${post_id}`).val()

          var commentData = {
            'post_id': post_id,
            'text': text
          }

          $.ajax("/api/comments/", {
            type: "POST",
            data: commentData
          }).then(function(data) {
            console.log(data)
          });
        });

        $(popupBox).append(commentBtn)

      } else {
        $(popupBox).append('<p>Please' + " " + '<a href="#" onclick="openModal()">login</a>' + " " + 'to comment</p>')
      }
      $(popupBox).append(`<div id='comments-${data[y].id}' class='comments'></div>`)

      marker.bindPopup(popupBox, {
        maxWidth: 560,
        minWidth:350,
        maxHeight: 550,
        overflowY: scroll
      });

    };

  })

}

//render posts
function populateOne(id) {

  $.get(`/api/posts/${id}`, function(data) {

    var lat = data.latitude
    var lon = data.longitude

    var icon = data.categories;

    if (icon === 'Food') {
      icon = 'cutlery';
      console.log(icon);
    }
    if (icon === 'Sports') {
      icon = 'futbol-o';
      console.log(icon);
    }
    if (icon === 'Drinks') {
      icon = 'glass';
      console.log(icon);
    }

    var userMarker = L.AwesomeMarkers.icon({icon: icon, prefix: 'fa', markerColor: 'green', iconColor: 'yellow'});
    var otherMarker = L.AwesomeMarkers.icon({icon: icon, prefix: 'fa', markerColor: 'orange', iconColor: 'blue'});

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
    $(popupBox).append(`<p>User${data.user_id}  ${moment(new Date(data.createdAt)).format("MM/DD/YYYY, hh:mm A")}</p>`)
    $(popupBox).append(`<p id="post_subject1">${data.subject}</p>`)
    $(popupBox).append(`<p id="post_text">${data.text}</p>`)
    $(popupBox).append(`<p>Category:${data.categories}</p>`)
    $(popupBox).append(`<img id="reload_img" src=" ${data.post_img} "/>`);
    if( currentUserId){
    $(popupBox).append(`<input placeholder="add a comment" type="textbox" id='newComment-${data.id}' class="commentBox"><br>`)
    var commentBtn = $(`<button class="comment-button" id='${data.id}-button'>Post</button>`).click(function() {
      console.log('click')
      var post_id = $(this).attr('id').split("-")[0]
      var text = $(`#newComment-${post_id}`).val()

      var commentData = {
        'post_id': post_id,
        'text': text
      }

      $.ajax("/api/comments/", {
        type: "POST",
        data: commentData
      }).then(function(data) {
        console.log(data)
      });
    });

    $(popupBox).append(commentBtn)
  } else {
    $(popupBox).append('<p>Please' + " " +'<a href="#" onclick="openModal()">login</a>' + " " +'to comment</p>')
  }
    $(popupBox).append(`<div id='comments-${data.id}' class='comments'></div>`)

    marker.bindPopup(popupBox, {
        maxWidth: 560,
        minWidth:350,
        maxHeight: 550,
        overflowY: scroll
      });

  })
}

//render comments
function populateOneComment(comment) {

  var newComment = (`<p style="font-weight:bold">User${comment.user_id}  ${moment(new Date(comment.createdAt)).format("MM/DD/YYYY, hh:mm A")}:</p><p> ${comment.text}</p>`)
  $(`#comments-${comment.post_id}`).prepend(newComment)
  $(`#newComment-${comment.post_id}`).val('')

}

function populateComments() {
  $.get("/api/comments/", function(data) {

    $('.comments').empty()

    console.log(data)
    for (var y = 0; y < data.length; y++) {
      var comment = data[y]
      var newComment = (`<p style="font-weight:bold">User${comment.user_id}  ${moment(new Date(comment.createdAt)).format("MM/DD/YYYY, hh:mm A")}:</p><p> ${comment.text}</p>`)
      $(`#comments-${comment.post_id}`).prepend(newComment)
      $(`#newComment-${comment.post_id}`).val('')
    }
  })
}

//on page load
$(document).ready(function() {
  $.get("/api/user_data").then(function(data1) {
    currentUserId = ''
    if (data1.id) {
      currentUserId = data1.id
    }
    populateMap(currentUserId)
  })

})

map.on('popupopen', function(e) {
  var px = map.project(e.popup._latlng); // find the pixel location on the map where the popup anchor is
  px.y -= e.popup._container.clientHeight / 2 // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
  map.panTo(map.unproject(px), {animate: true}); // pan to new center
  populateComments()
});

//sockets

var socket = io();

socket.on('connect', () => {
  console.log('connected to server');
});

socket.on('disconnect', () => {
  console.log('disconnected from server');
});

socket.on('newPost', (id) => {
  if (id > 0) {
    console.log('now post id: ' + id);
    populateOne(id)
  }

});

socket.on('newPost', (id) => {
  if (id > 0) {
    console.log('new post id: ' + id);
    populateOne(id)
  }

});

socket.on('newComment', (data) => {
  if (data.post_id > 0) {
    console.log('now comment id: ' + data.post_id);
    populateOneComment(data)
  }

});

//Get modal element
var modal = document.getElementById('simpleModal');
var modalBtn = document.getElementById('modalBtn');
var closeBtn = document.getElementById('closeModalBtn');

modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', clickOutside);

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function clickOutside(e) {
  if (e.taget == modal) {
    modal.style.display = 'none';
  }
}

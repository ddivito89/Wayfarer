$(document).ready(function() {

  function getUser() {

    $('#usersList').empty()
    $.get("/api/users", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].username)
        $('#usersList').append($('<option>', {
          value: data[i].username,
          text: data[i].username
        }));
      }

    });
  }

  $('#tester').on('click', function(){

    alert("User is: " + $('#usersList').val())
  })

  $('#addUser').on('click', function(){

    var newName = $('#newUser').val()

    userData = {'username': newName}

    console.log(userData)

    $.post("/api/users", userData)
        .then(getUser());

  })


  getUser()

})

$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  $.get("/api/user_data").then(function(data) {
    if (!data.email) {
      $(".member-name").empty()
      $("#auth-sidebar").show()
      $("#signupForm-sidebar").hide()
      $("#loginForm-sidebar").show()
    } else {
      $(".member-name").empty()
      $(".member-name").text('logged in as ' + data.email);
      $(".sidebar-map").append('<br><br><a href="/logout" id="logOutBtn">Log Out</a>')
      $("#modalBtn").hide()
      $("#auth-sidebar").hide()
    }
  });

  $(".switch").on('click', function(e){
    e.preventDefault();
   if (this.text === 'sign up'){
     $("#signupForm-sidebar").show()
     $("#loginForm-sidebar").hide()

   }else{
     $("#signupForm-sidebar").hide()
     $("#loginForm-sidebar").show()

   }
  })
});

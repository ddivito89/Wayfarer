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
      $(".member-name").append('<br><br><a href="/logout">logout</a>')
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

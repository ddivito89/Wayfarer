$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  $.get("/api/user_data").then(function(data) {
    console.log('ran')

    if (!data.email) {
      console.log("no")
      $(".member-name").empty()
      $(".member-name").text('please login');
    } else {
      $(".member-name").empty()
      $(".member-name").text('logged in as ' + data.email);
      $(".member-name").append('<br><br><a href="/logout">logout</a>')
    }
  });
});

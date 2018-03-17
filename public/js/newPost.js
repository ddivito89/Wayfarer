$('#add_post').on('click', function(){

  var postSubject = $('#post_subject').val()
  var postText = $('#post_text').val()

  postData = {'subject': postSubject,
              'text':postText}

  console.log(postData)

  $.post("/api/posts", postData)
      .then(function(data){
        console.log(data)
      });

})

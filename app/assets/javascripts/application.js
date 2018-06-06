// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .

$(function(){
  $(document).on("click", "#submitComment", function() {
    $('#submitComment').attr("disabled", true);
    $.post("/user_comments", $("#userCommentForm").serialize()).done(function(data) {
      appendComment(data);
      $('#submitComment').removeAttr("disabled");
      $("#user_comment_body").val("");
    });
  });
});

function appendComment(collection) {
  console.log(collection);
  $(".user-comment-section").html("");
    $.each(collection, function(i, data){
      var templateComment = $(".commentTemplate .user-comment").clone();
      templateComment.find("p:first").text('Comment from IP '+ data.ip_address +' at '+ convertToDateformat(data.created_at));
      wrapped = $("<div>" + data.body + "</div>");
      wrapped.find("*").not("b").not("i").each(function() { $(this).replaceWith($(this).text()); });
      templateComment.find("p:last").html(wrapped.html());
      $(".user-comment-section").append(templateComment);
    });
}

function convertToDateformat(date) {
  date = new Date(date);
  dat = date.getFullYear() + '-' + ("0" + date.getMonth()).slice(-2) + '-' + ("0" + date.getDay()).slice(-2) + ' ' + date.getHours() + ':' + date.getMinutes();
  return dat;
}
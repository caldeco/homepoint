// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  $('#reload').click(function() {
    $.get("point?id=100", function(data) {
      $('#point100').text(data);
    });
  });
});

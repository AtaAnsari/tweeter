$(document).ready(function() {
  const $textarea = $("form textarea");
  
  $textarea.on("keyup", function(e) {
    const count = $(this).val().length
    const $counter = $(this).parent().find(".counter");
    $counter.text(140 - count)
    if(count > 140) {
      $counter.css("color", "red")
    } else { 
      $counter.css("color", "#545149")
    }
  });



});

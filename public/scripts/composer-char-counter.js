$(document).ready(function() {
  const $textarea = $("form textarea");
  $textarea.on("keypress", function() {
    console.log(this)
  });
});

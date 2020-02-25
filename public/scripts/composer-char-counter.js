$(document).ready(function() {
  const $textarea = $("form textarea");
  $textarea.on("keypress", e => {
    console.log(this)
  });
});

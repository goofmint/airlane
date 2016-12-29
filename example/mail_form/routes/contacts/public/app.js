// JavaScript
$(() => {
  $(".contact_form").on("submit", (e) => {
    e.preventDefault();
    $.ajax({
      url: "/contacts/",
      type: "post",
      dataType: "json",
      data: $(e.target).serialize()
    })
    .then(json => {
      console.log(true)
      $(".message")
        .text("Thank you for your contact. We'll reply soon.")
        .removeClass("hide")
        .addClass("alert-success")
      setTimeout(() => {
        $(".message").addClass("hide").removeClass("alert-success");
      }, 3000)
    }, error => {
      $(".message")
        .text("Sorry, something error happened. Plase try again later.")
        .removeClass("hide")
        .addClass("alert-danger")
      setTimeout(() => {
        $(".message").addClass("hide").removeClass("alert-danger");
      }, 3000)
    });
  });
});

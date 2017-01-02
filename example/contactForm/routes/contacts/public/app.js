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
      showMessage('success', "Thank you for your contact. We'll reply soon.");
    }, error => {
      showMessage('danger', "Sorry, something error happened. Plase try again later.");
    });
  });
  
  var showMessage = (classType, message) => {
    $(".message")
      .text(message)
      .removeClass("hide")
      .addClass(`alert-${classType}`)
    setTimeout(() => {
      $(".message").addClass("hide").removeClass(`alert-${classType}`);
    }, 3000)
  }
});

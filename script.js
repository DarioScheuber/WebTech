window.onscroll = function() {fixNavbar()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function fixNavbar() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("fixed");
    document.body.style.paddingTop = navbar.offsetHeight + 'px'; // Um Platz für die fixierte Navbar zu schaffen
  } else {
    navbar.classList.remove("fixed");
    document.body.style.paddingTop = 0; // Zurücksetzen des Body-Paddings
  }
}
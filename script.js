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

function draw() {
  let canvas = document.getElementById("canvas");
  let c = canvas.getContext('2d');
  c.beginPath();
  c.lineWidth = 10;
  c.moveTo(10, 10);
  c.lineTo(10, 290);
  c.lineTo(220, 290);
  c.lineTo(220, 10);
  c.strokeStyle = "black";
  c.stroke();
  c.closePath();

  c.beginPath();
  c.lineWidth = 10;
  c.moveTo(220, 200);
  c.lineTo(290, 200);
  c.lineTo(290, 100);
  c.lineTo(220, 100);
  c.strokeStyle = "black";
  c.stroke();
  c.closePath();
  animate();
}

let positiony = 0;
let timeUntilNextFrame = 1000 / 50;

function animate() {
  let canvas = document.getElementById("canvas");
  let c = canvas.getContext('2d');

  setTimeout(animate, timeUntilNextFrame);

  update();
  c.clearRect(15, 10, 200, 275);

  c.fillStyle = "white";
  c.fillRect(215, 285, -200, positiony);
  c.fillStyle = "yellow";
  c.fillRect(215, 285, -200, (positiony * 0.8));
  c.fillStyle = "rgba(255, 255, 255, 0.6)";
  c.fillRect(15, 120, 200, 60);
  let img = document.getElementById("logo");
  c.drawImage(img, 65, 100, 100, 100);

}

function update() {
  positiony = positiony - 2;
  if (positiony < -275) {
      positiony = 0;
  };
}
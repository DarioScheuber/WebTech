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
  //c.fillStyle = "rgba(255, 255, 255, 0.6)";
  //c.fillRect(15, 120, 200, 60);
  let img = document.getElementById("logo");
  c.drawImage(img, 63, 100, 100, 100);

}

function update() {
  positiony = positiony - 2;
  if (positiony < -275) {
      positiony = 0;
  };
}


/* Promillenrechner */

let drinkCount = 1;

function addDrink() {
    drinkCount++;
    const drinksContainer = document.getElementById('drinks-container');
    const newDrink = document.createElement('div');
    newDrink.className = 'drink-group';
    newDrink.innerHTML = `
        <h2>Getränk ${drinkCount}</h2>
        <div class="input-group">
            <label for="volume-${drinkCount}">Menge des Getränks (in Litern):</label>
            <input type="number" id="volume-${drinkCount}" class="volume" step="0.01" min="0" placeholder="z.B. 0.5">
        </div>
        <div class="input-group">
            <label for="abv-${drinkCount}">Alkoholgehalt (in % ABV):</label>
            <input type="number" id="abv-${drinkCount}" class="abv" step="0.1" min="0" placeholder="z.B. 5.0">
        </div>`;
    drinksContainer.appendChild(newDrink);
}

function calculateAlcohol() {
    let totalAlcoholContentGrams = 0;

    for (let i = 1; i <= drinkCount; i++) {
        const volume = parseFloat(document.getElementById(`volume-${i}`).value);
        const abv = parseFloat(document.getElementById(`abv-${i}`).value);
        
        if (isNaN(volume) || isNaN(abv) || volume <= 0 || abv <= 0) {
            document.getElementById('result').textContent = 'Bitte geben Sie gültige Werte für alle Getränke ein.';
            return;
        }

        totalAlcoholContentGrams += volume * abv * 0.8 * 10; // in Gramm
    }

    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);

    if (isNaN(age) || isNaN(weight) || age <= 0 || weight <= 0) {
        document.getElementById('result').textContent = 'Bitte geben Sie gültige Werte für Alter und Gewicht ein.';
        return;
    }

    // Widmark-Formel für Blutalkoholkonzentration (BAC)
    // r ist der Reduktionsfaktor: 0.68 für Männer und 0.55 für Frauen
    const r = gender === 'male' ? 0.68 : 0.55;
    const bac = (totalAlcoholContentGrams / (weight * r)).toFixed(3); // BAC in Promille

    document.getElementById('result').textContent = `Der geschätzte Blutalkoholgehalt beträgt ${bac} Promille.`;
}

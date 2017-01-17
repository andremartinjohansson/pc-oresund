// Javascript för val av chassi tillverkare.

//Globala variabler.
var nzxt, fractal, coolerMaster; //Används för att referera till div-element i HTML.

function init() {	//Definierar några variabler med referenser till HTML. Körs direkt när sidan laddas.
	nzxt = document.getElementById("nzxt");
	fractal = document.getElementById("fractal");
	coolerMaster = document.getElementById("cooler-master");
	document.getElementById("chassi-menu").onchange = selectChassi;
}
window.onload = init;

function selectChassi() {	//Bestämmer vilken tillverkares chassi som ska visas beroende på vad användaren väljeri HTML-listan.
	var ix;		//Här sparas platsen för den tillverkare användaren väljer i listan.
	ix = this.selectedIndex;
	if (ix === 0) {
		coolerMaster.style.display = "block",
		fractal.style.display = "block",
		nzxt.style.display = "block";
	}
	else if (ix === 1) {
		coolerMaster.style.display = "block",
		fractal.style.display = "none",
		nzxt.style.display = "none";
	}
	else if (ix === 2) {
		coolerMaster.style.display = "none",
		fractal.style.display = "block",
		nzxt.style.display = "none";
	}
	else if (ix === 3) {
		coolerMaster.style.display = "none",
		fractal.style.display = "none",
		nzxt.style.display = "block";
	}
}
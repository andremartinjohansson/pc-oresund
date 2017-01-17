// JavaScript för site mappen

function init() {	//Körs när sidan laddas och anropas funktion för att ladda in cookie.
	getLinkCookie();
}
window.onload = init;

function getLinkCookie() {		//Ladda in cookie om den har någonting sparat.
	var cookieValue;	//Här är värdet som sparats med cookien.
	cookieValue = getCookie("siteLocation");
	if (cookieValue != null) {
		var location = cookieValue;		//Värdet från cookien sparas i ny variabel.
		showLocation(location);
	}
}

function getCookie(cookieName) {	//Laddar in cookie.
	var start, end, valueStr;	//Används för att få namnet och innehållet av en cookie.
	start = document.cookie.indexOf(cookieName);
	if (start > -1) {
		start += cookieName.length + 1;
		end = document.cookie.indexOf(";", start);
		if (end < start) end = document.cookie.length;
		valueStr = document.cookie.substring(start, end);
		return unescape(valueStr);
	}
	else return null;
}

function showLocation(location) {	//Bestämmer vilka ändringar som ska göras i site mappen beroende på var man kommer ifrån på webbplatsen.
	if (location === "index.htm") {
		var locationLink = document.getElementById("sitemap-index");
		locationLink.style.color = "#CD2121";
	}
	else if (location === "build.htm") {
		var locationLink = document.getElementById("sitemap-build");
		locationLink.style.color = "#CD2121";
	}
	else if (location === "components.htm") {
		var locationLink = document.getElementById("sitemap-components");
		locationLink.style.color = "#CD2121";
	}
	else if (location === "service.htm") {
		var locationLink = document.getElementsByClassName("sitemap-service");
		locationLink[0].style.color = "#CD2121";
		locationLink[1].style.color = "#CD2121";
	}
	else if (location === "about.htm") {
		var locationLink = document.getElementsByClassName("sitemap-about");
		locationLink[0].style.color = "#CD2121";
		locationLink[1].style.color = "#CD2121";
	}
	else if (location === "service/repair.htm") {
		var locationLink = document.getElementById("sitemap-repair");
		locationLink.style.color = "#CD2121";
	}
	else if (location === "service/pricelist.htm") {
		var locationLink = document.getElementById("sitemap-pricelist");
		locationLink.style.color = "#CD2121";
	}
	else if (location === "service/support.htm") {
		var locationLink = document.getElementById("sitemap-support");
		locationLink.style.color = "#CD2121";
	}
	else if (location === "about/contact.htm") {
		var locationLink = document.getElementById("sitemap-contact");
		locationLink.style.color = "#CD2121";
	}
	else if (location === "about/opentimes.htm") {
		var locationLink = document.getElementById("sitemap-opentimes");
		locationLink.style.color = "#CD2121";
	}
	else if (location === "about/map.htm") {
		var locationLink = document.getElementById("sitemap-map");
		locationLink.style.color = "#CD2121";
	}
	else if (location === "Cooler Master Force 500") {
		var locationLink = document.getElementById("sitemap-force500");
		locationLink.style.color = "#CD2121";
	}
	else if (location === "Cooler Master HAF 912") {
		var locationLink = document.getElementById("sitemap-haf912");
		locationLink.style.color = "#CD2121";
	}
	else if (location === "Cooler Master Storm Scout II") {
		var locationLink = document.getElementById("sitemap-stormscout");
		locationLink.style.color = "#CD2121";
	}
	else if (location === "Cooler Master Storm Trooper") {
		var locationLink = document.getElementById("sitemap-stormtrooper");
		locationLink.style.color = "#CD2121";
	}
	else if (location === "Fractal Design Define R5") {
		var locationLink = document.getElementById("sitemap-fractal");
		locationLink.style.color = "#CD2121";
	}
	else if (location === "NZXT S340") {
		var locationLink = document.getElementById("sitemap-s340");
		locationLink.style.color = "#CD2121";
	}
	else if (location === "NZXT Phantom 820") {
		var locationLink = document.getElementById("sitemap-phantom");
		locationLink.style.color = "#CD2121";
	}
	else if (location === "Moderkort") {
		var locationLink = document.getElementsByClassName("sitemap-motherboard");
		locationLink[0].style.color = "#CD2121";
		locationLink[1].style.color = "#CD2121";
	}
	else if (location === "Processorer") {
		var locationLink = document.getElementsByClassName("sitemap-cpu");
		locationLink[0].style.color = "#CD2121";
		locationLink[1].style.color = "#CD2121";
	}
	else if (location === "Grafikkort") {
		var locationLink = document.getElementsByClassName("sitemap-gpu");
		locationLink[0].style.color = "#CD2121";
		locationLink[1].style.color = "#CD2121";
	}
	else if (location === "RAM Minne") {
		var locationLink = document.getElementsByClassName("sitemap-ram");
		locationLink[0].style.color = "#CD2121";
		locationLink[1].style.color = "#CD2121";
	}
	else if (location === "Hårddiskar") {
		var locationLink = document.getElementsByClassName("sitemap-harddrive");
		locationLink[0].style.color = "#CD2121";
		locationLink[1].style.color = "#CD2121";
	}
	else if (location === "Nätaggregat") {
		var locationLink = document.getElementsByClassName("sitemap-psu");
		locationLink[0].style.color = "#CD2121";
		locationLink[1].style.color = "#CD2121";
	}
	else if (location === "Optiska Enheter") {
		var locationLink = document.getElementsByClassName("sitemap-opticaldrive");
		locationLink[0].style.color = "#CD2121";
		locationLink[1].style.color = "#CD2121";
	}
	else if (location === "CPU Kylare") {
		var locationLink = document.getElementsByClassName("sitemap-cpucooler");
		locationLink[0].style.color = "#CD2121";
		locationLink[1].style.color = "#CD2121";
	}
	else if (location === "Ljudkort") {
		var locationLink = document.getElementsByClassName("sitemap-soundcard");
		locationLink[0].style.color = "#CD2121";
		locationLink[1].style.color = "#CD2121";
	}
}
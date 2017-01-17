// JavaScript för att ladda komponenter i en kategori.

//Globala variabler.
var category;	//Den kategori man klickat in på.

function init() {	//Anropar funktion för att ladda in cookie.
	getCategoryCookie();
}
window.onload = init;

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

function getCategoryCookie() {		//Laddar in cookie med namn selectedCategory.
	var cookieValue;	//Innehåller värdet som cookien har med sig.
	cookieValue = getCookie("selectedCategory");
	if (cookieValue != null) {
		category = cookieValue;
		requestHardware();
	}
}

function requestHardware() {	//AJAX request.
	var request;	//Används för att göra AJAX request.
	if (XMLHttpRequest) {
		request = new XMLHttpRequest();
	}
	else if (ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	}
	else {
		return false;
	}
	request.open("GET","hardware.xml",true);
	request.send(null);
	request.onreadystatechange = function () {
		if ((request.readyState === 4) && (request.status === 200)) {
			getData(request.responseXML);
		}
	}
}

function getData(XMLCode) {		//Bestämmer vilken kategori som ska läsas in.
	/*
	start, end: Används för att bestämma vilka komponenter so mska läsas in.
	categoryTitle: Används för att spara titlen på kategorin.
	*/
	if (category === "motherboard") {
		var start = 0;
		var end = 8;
		var categoryTitle = "Moderkort";
		getCategory(start, end, categoryTitle, XMLCode);
	}
	else if (category === "cpu") {
		var start = 8;
		var end = 15;
		var categoryTitle = "Processorer";
		getCategory(start, end, categoryTitle, XMLCode);
	}
	else if (category === "gpu") {
		var start = 15;
		var end = 23;
		var categoryTitle = "Grafikkort";
		getCategory(start, end, categoryTitle, XMLCode);
	}
	else if (category === "ram") {
		var start = 23;
		var end = 30;
		var categoryTitle = "RAM Minne";
		getCategory(start, end, categoryTitle, XMLCode);
	}
	else if (category === "harddrive") {
		var start = 30;
		var end = 38;
		var categoryTitle = "Hårddiskar";
		getCategory(start, end, categoryTitle, XMLCode);
	}
	else if (category === "psu") {
		var start = 38;
		var end = 45;
		var categoryTitle = "Nätaggregat";
		getCategory(start, end, categoryTitle, XMLCode);
	}
	else if (category === "opticaldrive") {
		var start = 45;
		var end = 48;
		var categoryTitle = "Optiska Enheter";
		getCategory(start, end, categoryTitle, XMLCode);
	}
	else if (category === "cpucooler") {
		var start = 48;
		var end = 52;
		var categoryTitle = "CPU Kylare";
		getCategory(start, end, categoryTitle, XMLCode);
	}
	else if (category === "soundcard") {
		var start = 52;
		var end = 56;
		var categoryTitle = "Ljudkort";
		getCategory(start, end, categoryTitle, XMLCode);
	}
}

function getCategory(start, end, categoryTitle, XMLCode) {		//Läser in data från vald kategori.
	var component;		//Referens till alla component taggar.
	var componentAttr = [], url = [], shortdescription = [], price = [], title = [], chosenCategory = [];
	/* 
	componentAttr: Används för att få attribut från component i XML.
	url: Referens till url taggarna i XML.
	shortdescription: Referens till shortdescription taggarna i XML.
	price: Referens till price taggarna i XML.
	title: Referens till title taggarna i XML.
	chosenCategory: Här sparas värdet på attributen i componentAttr.
	*/
	component = XMLCode.getElementsByTagName("component");
	for (i=start; i<end; i++) {
		componentAttr[i] = component[i].getAttributeNode("type");
		chosenCategory[i] = componentAttr[i].value;
		title[i] = XMLCode.getElementsByTagName("title")[i];
		url[i] = XMLCode.getElementsByTagName("url")[i];
		shortdescription[i] = XMLCode.getElementsByTagName("shortdescription")[i];
		price[i] = XMLCode.getElementsByTagName("price")[i];
	}
	loadCategory(chosenCategory, title, url, shortdescription, price, categoryTitle, start, end);
}

function loadCategory(chosenCategory, title, url, shortdescription, price, categoryTitle, start, end) {		//Datan laddas in till HTML.
	var wrapper, header, HTMLTitle;
	/*
	wrapper: Där datan ska laddas in.
	header: h taggen där kategorins titel laddas in.
	HTMLTitle: HTML-dokumentets title.
	*/
	wrapper = document.getElementById("components-wrapper");
	header = document.getElementById("hardware-header");
	HTMLTitle = document.getElementsByTagName("title")[0];
	HTMLTitle.innerHTML += " - " + categoryTitle;
	header.innerHTML = '<h1 class="title">' + categoryTitle + '</h1>';
	for (i=start; i<end; i++) {
		wrapper.innerHTML += '<div id="components-wrapper"><div class="component-item"><a href="javascript:void(0)" onclick="saveItem(' + i + ')"><img src="../' + url[i].firstChild.data + '" class="component-img" alt="Visa ' + title[i].firstChild.data + '"></a><div class="component-title"><a href="javascript:void(0)" onclick="saveItem(' + i + ')"><h4 class="title">' + title[i].firstChild.data + '</h4></a></div><p class="component-desc">' + shortdescription[i].firstChild.data + '</p><div class="component-price"><p>' + price[i].firstChild.data + ':-</p></div><a href="javascript:void(0)" onclick="saveItem(' + i + ')"><div class="component-button"><p>Visa</p></div></a></div></div>';
	}
}

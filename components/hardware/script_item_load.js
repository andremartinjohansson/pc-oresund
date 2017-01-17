// JavaScript för att ladda in en komponents content.

//Globala variabler.
var itemNr;

function init() {	//Anropas funktion som laddar in cookie.
	getItemCookie();
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

function getItemCookie() {		//Laddar in cookie med namn selectedItem.
	var cookieValue;	//Där cookiens värdet finns.
	cookieValue = getCookie("selectedItem");
	if (cookieValue != null) {
		itemNr = cookieValue;
		requestHardware();
	}
}

function requestHardware() {	//Laddar in XML med AJAX.
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
	request.open("GET","../hardware.xml",true);
	request.send(null);
	request.onreadystatechange = function () {
		if ((request.readyState === 4) && (request.status === 200)) {
			getData(request.responseXML);
		}
	}
}

function getData(XMLCode) {		//Samlar data från XML.
	var component;		//component taggarna i XML.
	var componentAttr = [], url = [], fulldescription = [], price = [], title = [], chosenCategory = [];
	/* 
	componentAttr: Används för att få attribut från component i XML.
	url: Referens till url taggarna i XML.
	fulldescription: Referens till fulldescription taggarna i XML.
	price: Referens till price taggarna i XML.
	title: Referens till title taggarna i XML.
	chosenCategory: Här sparas värdet på attributen i componentAttr.
	*/
	component = XMLCode.getElementsByTagName("component");
	for (i=0; i<component.length; i++) {
		if (i == itemNr) {
		title[i] = XMLCode.getElementsByTagName("title")[i];
		url[i] = XMLCode.getElementsByTagName("url")[i];
		fulldescription[i] = XMLCode.getElementsByTagName("fulldescription")[i];
		price[i] = XMLCode.getElementsByTagName("price")[i];
		loadItem(title, url, fulldescription, price, i);
		}
	}
}

function loadItem(title, url, fulldescription, price, i) {		//Laddar in content till HTML.
	var image = document.getElementById("item-img");		//Refererar till div taggen där bilden ska vara.
	var header = document.getElementById("item-title");		//Refererar till div taggen där titlen ska vara.
	var content = document.getElementById("fulldescription");	//Refererar till div taggen där beskrivningen ska vara.
	var sek = document.getElementById("item-price");		//Refererar till div taggen där priset ska vara.
	var description = fulldescription[i].firstChild.data.split("]]>");		//Tar bort några karaktärer och sparar det nya i ny variabel.
	image.src = "../../" + url[i].firstChild.data;
	header.innerHTML = title[i].firstChild.data;
	content.innerHTML = description[0] + "<br><br>";
	sek.innerHTML = price[i].firstChild.data + "SEK";
}
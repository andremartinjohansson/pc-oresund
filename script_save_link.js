// JavaScript för att spara cookies.

function getChassi(chassi) {	//Sparar ett nummer beroende på vilket chassi man väljer.
	for (i=0; i<7; i++) {
		if (chassi === i) {
			var chassiSelected = i;		//Här sparas numret i en ny variabel.
			saveChassiCookie(chassiSelected);
		}
	}
}

function saveChassiCookie(selected) {	//Sparar ny cookie med namn selectedChassi.
	var cookieValue;	//Här sparas värdet som cookie ska ta med sig.
	cookieValue = selected;
	saveCookie("selectedChassi", cookieValue);
}

function saveCategory(category) {	//Sparar värdet på category som skickas med när man klickar på en länk.
	saveCategoryCookie(category);
}

function saveCategoryCookie(category) {		//Sparar en ny cookie med namn selectedCategory.
	var cookieValue;	//Här sparas värdet som cookie ska ta med sig.
	cookieValue = category;
	saveCookie("selectedCategory", cookieValue);
}

function saveCookie(cookieName, cookieValue) {	//Sparar cookie i webbläsaren.
	document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + expireDate(100);
}

function expireDate(d) {	//Tid det tar för cookie att gå ut.
	var date = new Date();	//Sparar datumet i en variabel.
	date.setTime(date.getTime()+(1000*86400*d));
	return date.toGMTString();
}

function saveItem(itemNr) {		//Sparar numret på komponenten man klickar på, kollar vilken sida man är på, och öppnar ny sida i nytt fönster.
	var currentPage = location.href;	//Sparar sidans länk i variablen.
	var pageLink = currentPage.split("projekt/");	//Splittar länken i två delar och använder variablen för att referera till den sista delen.
	saveItemCookie(itemNr);
	if (pageLink[1] === "sitemap.htm" || pageLink[1] === "components.htm") {
		window.open("components/hardware/item.htm", "_blank", "height=650, width=650");
	}
	else {
		window.open("hardware/item.htm", "_blank", "height=650, width=650");
	}
}

function saveItemCookie(itemNr) {	//Sparar ny cookie med namn selectedItem.
	var cookieValue;	//Här sparas värdet som cookie ska ta med sig.
	cookieValue = itemNr;
	saveCookie("selectedItem", cookieValue);
}

function saveLink() {	//Sparar filnamnet på sidan man när på.
	var currentLocation = location.href;	//Sparar sidans URL.
	var locationLink = currentLocation.split("projekt/");	//Länken splittas så bara filnamnet kan användas.
	var currentLocationName = locationLink[1];	//Sparar filnamnet i en ny variabel.
	saveLinkCookie(currentLocationName);
}

function saveLinkCookie(HTMLName) {		//Sparar ny cookie med namn siteLocation.
	var cookievalue;		//Här sparas värdet som cookie ska ta med sig.
	cookieValue = HTMLName;
	saveCookie("siteLocation", cookieValue);
}

function saveTitle() {		//Sparar titlen på HTML-sida man är på.
	var HTMLTitle = document.getElementsByTagName("title")[0].innerHTML;	//Referens till title taggens innerHTML.
	var pageTitle = HTMLTitle.split(" - ");		//Splittar strängen i title taggen.
	var pageLocationName = pageTitle[2];	//Sista delen i strängen - vilket säger vilken content som visas på sidan - sparas i ny variabel.
	saveTitleCookie(pageLocationName);
}

function saveTitleCookie(pageLocationName) {	//Sparar ny cookie med namn siteLocation.
	var cookievalue;	//Här sparas värdet som cookie ska ta med sig.
	cookieValue = pageLocationName;
	saveCookie("siteLocation", cookieValue);
}
// JavaScript för att ladda rätt chassi och uppdatera HTML formen.

//Globala variabler
var chosenChassi, totalCost, resCost, inputTags, costInput;
/*
chosenChassi: Värdet på det chassi man valt på förgående sida.
totalCost: Används för att spara den totala kostnaden för datorn.
resCost: Används för att skriva ut den totala kostnaden för datorn.
inputTags: Här sparas alla input-taggar.
costInput: Refererar till en hidden input med värdet för totala kostnaden.
*/

function init() {	//Sparar några referener i variabler och anropar funktion för att ladda in cookie.
	getChassiCookie();
	resCost = document.getElementById("calculated-cost");
	costInput = document.getElementById("cost-input");
	inputTags = document.getElementsByTagName("input");
}
window.onload = init;

function toggleSoftware() {		//Visar/döljer div-taggen med mjukvara.
	var softwareDiv = document.getElementById("config-software");	//Refererar till div-taggen.
	var softwareButton = document.getElementById("show-software");	//Refererar till knappen som visa/döljer
	softwareButton.onclick = function () {
		if (softwareDiv.style.display !== "block") {
			softwareDiv.style.display = "block";
		}
		else {
			softwareDiv.style.display = "none"
		}
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

function getChassiCookie() {	//Laddar in cookie med namnet selectedChassi.
	var cookieValue;	//Har värdet som sparades i cookien.
	cookieValue = getCookie("selectedChassi");
	if (cookieValue != null) {
		chosenChassi = cookieValue;
		requestContent();
	}
}

function requestContent() {		//XML laddas in med AJAX.
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
	request.open("GET","build.xml",true);
	request.send(null);
	request.onreadystatechange = function () {
		if ((request.readyState === 4) && (request.status === 200)) {
			getData(request.responseXML);
		}
	}
}

function getData(XMLCode) {			//Samlar in data från XML och HTML och ändrar vissa grejer i HTML.
	var imgTags, smallImg1, smallImg2, bigImg, header, content, colorSelect, colorBlack, colorWhite;
	/*
	imgTags: Refererar till img taggar i div taggen config-small-img.
	smallImg1: Första img taggen i variablen imgTags.
	smallImg2: Andra img taggen i variablen imgTags.
	bigImg: img taggen i div taggen config-big-img.
	header: Referens till h2 tag.
	content: Referents till div tag där content ska laddas in.
	colorSelect: Referens till div taggen chassi-color, där man väljer färg på chassi.
	colorBlack: Andra input taggen i variablen colorSelect.
	colorWhite: Första input taggen i variablen colorSelect.
	*/
	var title = [], descriptionContent = [], price = [], blackImg = [], whiteImg = [];
	/*
	title: Här sparas referenser till title taggarna i XML.
	descriptionContent: Här sparas referenser till description taggarna i XML.
	price: Här sparas referens till price taggarna I XML.
	blackImg: Här sparas referens till black taggarna I XML.
	whiteImg: Här sparas referens till white taggarna I XML.
	*/
	var pageTitle = document.getElementsByTagName("title")[0];	//Sparar referens till HTML-dokumentets title tag.
	for (i=0; i<7; i++) {
		if (chosenChassi == i) {
			title = XMLCode.getElementsByTagName("title")[i];
			descriptionContent = XMLCode.getElementsByTagName("description")[i];
			price = XMLCode.getElementsByTagName("price")[i];
			blackImg = XMLCode.getElementsByTagName("black")[i];
			whiteImg = XMLCode.getElementsByTagName("white")[i];
		}
	}
	var description = descriptionContent.firstChild.data.split("]]>");	//Tar bort karaktärer från descriptionContents innerHTML och sparar det nya i en ny variabel.
	var chassiFullName = title.firstChild.data;		//Sparar fulla namnet till ett chassi.
	var chassiNameContent = chassiFullName.split(" - ");	//Splittar fulla namnet för att kunna få ett kortare namn.
	var chassiName = chassiNameContent[0];		//Det kortare namnet sparas i ny variabel.
	pageTitle.innerHTML += " - " + chassiName;
	smallDiv = document.getElementById("config-small-img");
	imgTags = smallDiv.getElementsByTagName("img");
	smallImg1 = imgTags[0];
	smallImg2 = imgTags[1];
	colorSelect = document.getElementById("chassi-color");
	colorWhite = colorSelect.getElementsByClassName("config-item")[0];
	colorBlack = colorSelect.getElementsByClassName("config-item")[1];
	if (whiteImg.firstChild.data == "none") {
			smallDiv.style.display = "none",
			colorWhite.style.display = "none";
	}
	bigImg = document.getElementById("config-big-img").getElementsByTagName("img")[0];
	header = document.getElementsByTagName("h2")[0];
	content = document.getElementById("config-chassi-desc");
	loadContent(header, title, content, description, price, colorWhite, colorBlack, bigImg, blackImg, whiteImg, smallImg1, smallImg2, colorSelect);
}

function loadContent(header, title, content, description, price, colorWhite, colorBlack, bigImg, blackImg, whiteImg, smallImg1, smallImg2, colorSelect) {	//Laddar in data till HTML-dokumentet.
	header.innerHTML = title.firstChild.data;
	content.innerHTML = description[0];
	colorWhite.innerHTML = '<input type="radio" name="Chassi" value="' + title.firstChild.data + ' (Vit)">' + title.firstChild.data + ' - Vit <span class="config-price">' + price.firstChild.data + ':-</div>';
	colorBlack.innerHTML = '<input type="radio" name="Chassi" value="' + title.firstChild.data + ' (Svart)">' + title.firstChild.data + ' - Svart <span class="config-price">' + price.firstChild.data + ':-</div>';
	if (chosenChassi == 0 || chosenChassi == 1) {
		bigImg.src = "../" + blackImg.firstChild.data;
		colorSelect.innerHTML = '<label><span class="config-item"><input type="radio" name="Chassi" value="' + title.firstChild.data + ' (Svart)">' + title.firstChild.data + ' - Svart <span class="config-price">' + price.firstChild.data + ':-</span></span></label>';
	}
	else if (chosenChassi == 2 || chosenChassi == 3 || chosenChassi == 4 || chosenChassi == 5 || chosenChassi == 6) {
		bigImg.src = "../" + blackImg.firstChild.data;
		smallImg1.src = "../" + whiteImg.firstChild.data;
		smallImg2.src = "../" + blackImg.firstChild.data;
	}
	changeImg(bigImg, blackImg, whiteImg, smallImg1, smallImg2);
	formChange();
}

function changeImg(bigImg, blackImg, whiteImg, smallImg1, smallImg2) {
	smallImg1.onmouseover = function () {
		bigImg.src = "../" + whiteImg.firstChild.data;
	}
	smallImg2.onmouseover = function () {
		bigImg.src = "../" + blackImg.firstChild.data;
	}
}

function formChange() {		//Ändringar i HTML formen görs beroende på vilket chassi man valt.
	if (chosenChassi == 0) {
		inputTags[0].checked = true;
		inputTags[12].disabled = true;
		inputTags[55].disabled = true;
		inputTags[57].disabled = true;
	}
	else if (chosenChassi == 1) {
		inputTags[0].checked = true;
		inputTags[12].disabled = true;
		inputTags[57].disabled = true;
		inputTags[24].onchange = function () {
			alert("Detta grafikkort passar inte med HDD bur i detta chassi. Om du väljer detta så tar vi bort den första HDD buren för att det ska passa.");
		}
		inputTags[26].onchange = function () {
			alert("Detta grafikkort passar inte med HDD bur i detta chassi. Om du väljer detta så tar vi bort den första HDD buren för att det ska passa.");
		}
	}
	else if (chosenChassi == 2) {
		inputTags[13].disabled = true;
		inputTags[56].disabled = true;
		inputTags[57].disabled = true;
		inputTags[58].disabled = true;
		inputTags[27].onchange = function () {
			alert("Detta grafikkort passar inte med HDD bur i detta chassi. Om du väljer detta så tar vi bort den HDD buren för att det ska passa.");
		}
	}
	else if (chosenChassi == 3) {
		inputTags[58].disabled = true;
	}
	else if (chosenChassi == 4) {
		inputTags[13].disabled = true;
	}
	else if (chosenChassi == 5) {
		inputTags[13].disabled = true;
		inputTags[57].disabled = true;
		inputTags[58].disabled = true;
	}
	else if (chosenChassi == 6) {
		inputTags[57].disabled = true;
		inputTags[58].disabled = true;
	}
	checkForm(inputTags);
	checkPrice(inputTags);
}

function checkForm(inputTags) {		//Uppdaterar formen när man väljer vissa delar, för att tillängliga delar ska vara kompatibla med varandra.
	var GPUMenu = document.getElementsByClassName("sli-menu");		//Refererar till en option meny för antal grafikkort.
	var RAMMenu = document.getElementsByClassName("ram-menu");		//Refererar till en option meny för antal RAM stickor.
	if (chosenChassi == 0 || chosenChassi == 1) {
		inputTags[5].onclick = function () {
			inputTags[12].disabled = false;
			inputTags[13].disabled = false;
			inputTags[14].disabled = false;
			inputTags[15].disabled = false;
			inputTags[16].disabled = false;
			inputTags[17].disabled = false;
			inputTags[18].disabled = true;
			inputTags[19].disabled = true;
			for (i=0; i<8; i++) {
				GPUMenu[i].childNodes[3].disabled = true;
				GPUMenu[i].childNodes[5].disabled = true;
				GPUMenu[i].childNodes[7].disabled = true;
			}
			inputTags[29].disabled = true;
			inputTags[30].disabled = true;
			inputTags[31].disabled = true;
			inputTags[32].disabled = true;
			inputTags[33].disabled = true;
			inputTags[34].disabled = true;
		}
		inputTags[6].onclick = function () {
			inputTags[12].disabled = false;
			inputTags[13].disabled = false;
			inputTags[14].disabled = false;
			inputTags[15].disabled = false;
			inputTags[16].disabled = false;
			inputTags[17].disabled = false;
			inputTags[18].disabled = true;
			inputTags[19].disabled = true;
			for (i=0; i<8; i++) {
				GPUMenu[i].childNodes[3].disabled = true;
				GPUMenu[i].childNodes[5].disabled = true;
				GPUMenu[i].childNodes[7].disabled = true;
			}
			inputTags[28].disabled = true;
			inputTags[30].disabled = true;
			inputTags[31].disabled = true;
			inputTags[32].disabled = true;
			inputTags[33].disabled = true;
			inputTags[34].disabled = true;
			RAMMenu[1].childNodes[5].disabled = true;
			RAMMenu[1].childNodes[7].disabled = true;
			inputTags[59].disabled = true;
			inputTags[60].disabled = true;
			inputTags[61].disabled = true;
			inputTags[62].disabled = true;
		}
		inputTags[7].onclick = function () {
			inputTags[12].disabled = false;
			inputTags[13].disabled = false;
			inputTags[14].disabled = false;
			inputTags[15].disabled = false;
			inputTags[16].disabled = false;
			inputTags[17].disabled = false;
			inputTags[18].disabled = true;
			inputTags[19].disabled = true;
			for (i=0; i<8; i++) {
				GPUMenu[i].childNodes[3].disabled = true;
				GPUMenu[i].childNodes[5].disabled = true;
				GPUMenu[i].childNodes[7].disabled = true;
			}
			inputTags[29].disabled = true;
			inputTags[30].disabled = true;
			inputTags[31].disabled = true;
			inputTags[32].disabled = true;
			inputTags[33].disabled = true;
			inputTags[34].disabled = true;
		}
		inputTags[8].onclick = function () {
			inputTags[12].disabled = false;
			inputTags[13].disabled = false;
			inputTags[14].disabled = false;
			inputTags[15].disabled = false;
			inputTags[16].disabled = false;
			inputTags[17].disabled = false;
			inputTags[18].disabled = true;
			inputTags[19].disabled = true;
			for (i=0; i<8; i++) {
				GPUMenu[i].childNodes[3].disabled = true;
				GPUMenu[i].childNodes[5].disabled = true;
				GPUMenu[i].childNodes[7].disabled = true;
			}
			inputTags[29].disabled = true;
			inputTags[32].disabled = true;
			inputTags[33].disabled = true;
			inputTags[34].disabled = true;
		}
		inputTags[9].onclick = function () {
			inputTags[12].disabled = false;
			inputTags[13].disabled = false;
			inputTags[14].disabled = false;
			inputTags[15].disabled = false;
			inputTags[16].disabled = false;
			inputTags[17].disabled = false;
			inputTags[18].disabled = true;
			inputTags[19].disabled = true;
			for (i=0; i<8; i++) {
				GPUMenu[i].childNodes[3].disabled = true;
				GPUMenu[i].childNodes[5].disabled = true;
				GPUMenu[i].childNodes[7].disabled = true;
			}
			inputTags[29].disabled = true;
			inputTags[32].disabled = true;
			inputTags[33].disabled = true;
			inputTags[34].disabled = true;
		}
		inputTags[10].onclick = function () {
			inputTags[12].disabled = false;
			inputTags[13].disabled = false;
			inputTags[14].disabled = false;
			inputTags[15].disabled = false;
			inputTags[16].disabled = false;
			inputTags[17].disabled = false;
			inputTags[18].disabled = true;
			inputTags[19].disabled = true;
			for (i=0; i<8; i++) {
				GPUMenu[i].childNodes[7].disabled = true;
			}
			inputTags[29].disabled = true;
			inputTags[31].disabled = true;
			inputTags[34].disabled = true;
		}
		inputTags[11].onclick = function () {
			inputTags[12].disabled = true;
			inputTags[13].disabled = true;
			inputTags[14].disabled = true;
			inputTags[15].disabled = true;
			inputTags[16].disabled = true;
			inputTags[17].disabled = true;
			inputTags[18].disabled = false;
			inputTags[19].disabled = false;
			for (i=0; i<8; i++) {
				GPUMenu[i].childNodes[7].disabled = true;
			}
			inputTags[29].disabled = true;
			inputTags[31].disabled = true;
			inputTags[34].disabled = true;
		}
	}
	else if (chosenChassi == 2 || chosenChassi == 3 || chosenChassi == 4 || chosenChassi == 5 || chosenChassi == 6) {
		inputTags[6].onclick = function () {
			inputTags[13].disabled = false;
			inputTags[14].disabled = false;
			inputTags[15].disabled = false;
			inputTags[16].disabled = false;
			inputTags[17].disabled = false;
			inputTags[18].disabled = false;
			inputTags[19].disabled = true;
			inputTags[20].disabled = true;
			for (i=0; i<8; i++) {
				GPUMenu[i].childNodes[3].disabled = true;
				GPUMenu[i].childNodes[5].disabled = true;
				GPUMenu[i].childNodes[7].disabled = true;
			}
			inputTags[30].disabled = true;
			inputTags[31].disabled = true;
			inputTags[32].disabled = true;
			inputTags[33].disabled = true;
			inputTags[34].disabled = true;
			inputTags[35].disabled = true;
		}
		inputTags[7].onclick = function () {
			inputTags[13].disabled = false;
			inputTags[14].disabled = false;
			inputTags[15].disabled = false;
			inputTags[16].disabled = false;
			inputTags[17].disabled = false;
			inputTags[18].disabled = false;
			inputTags[19].disabled = true;
			inputTags[20].disabled = true;
			for (i=0; i<8; i++) {
				GPUMenu[i].childNodes[3].disabled = true;
				GPUMenu[i].childNodes[5].disabled = true;
				GPUMenu[i].childNodes[7].disabled = true;
			}
			inputTags[29].disabled = true;
			inputTags[31].disabled = true;
			inputTags[32].disabled = true;
			inputTags[33].disabled = true;
			inputTags[34].disabled = true;
			inputTags[35].disabled = true;
			RAMMenu[1].childNodes[5].disabled = true;
			RAMMenu[1].childNodes[7].disabled = true;
			inputTags[60].disabled = true;
			inputTags[61].disabled = true;
			inputTags[62].disabled = true;
			inputTags[63].disabled = true;
		}
		inputTags[8].onclick = function () {
			inputTags[13].disabled = false;
			inputTags[14].disabled = false;
			inputTags[15].disabled = false;
			inputTags[16].disabled = false;
			inputTags[17].disabled = false;
			inputTags[18].disabled = false;
			inputTags[19].disabled = true;
			inputTags[20].disabled = true;
			for (i=0; i<8; i++) {
				GPUMenu[i].childNodes[3].disabled = true;
				GPUMenu[i].childNodes[5].disabled = true;
				GPUMenu[i].childNodes[7].disabled = true;
			}
			inputTags[30].disabled = true;
			inputTags[31].disabled = true;
			inputTags[32].disabled = true;
			inputTags[33].disabled = true;
			inputTags[34].disabled = true;
			inputTags[35].disabled = true;
		}
		inputTags[9].onclick = function () {
			inputTags[13].disabled = false;
			inputTags[14].disabled = false;
			inputTags[15].disabled = false;
			inputTags[16].disabled = false;
			inputTags[17].disabled = false;
			inputTags[18].disabled = false;
			inputTags[19].disabled = true;
			inputTags[20].disabled = true;
			for (i=0; i<8; i++) {
				GPUMenu[i].childNodes[3].disabled = true;
				GPUMenu[i].childNodes[5].disabled = true;
				GPUMenu[i].childNodes[7].disabled = true;
			}
			inputTags[30].disabled = true;
			inputTags[33].disabled = true;
			inputTags[34].disabled = true;
			inputTags[35].disabled = true;
		}
		inputTags[10].onclick = function () {
			inputTags[13].disabled = false;
			inputTags[14].disabled = false;
			inputTags[15].disabled = false;
			inputTags[16].disabled = false;
			inputTags[17].disabled = false;
			inputTags[18].disabled = false;
			inputTags[19].disabled = true;
			inputTags[20].disabled = true;
			for (i=0; i<8; i++) {
				GPUMenu[i].childNodes[3].disabled = true;
				GPUMenu[i].childNodes[5].disabled = true;
				GPUMenu[i].childNodes[7].disabled = true;
			}
			inputTags[32].disabled = true;
			inputTags[33].disabled = true;
			inputTags[34].disabled = true;
			inputTags[35].disabled = true;
		}
		inputTags[11].onclick = function () {
			inputTags[13].disabled = false;
			inputTags[14].disabled = false;
			inputTags[15].disabled = false;
			inputTags[16].disabled = false;
			inputTags[17].disabled = false;
			inputTags[18].disabled = false;
			inputTags[19].disabled = true;
			inputTags[20].disabled = true;
			for (i=0; i<8; i++) {
				GPUMenu[i].childNodes[7].disabled = true;
			}
			inputTags[30].disabled = true;
			inputTags[32].disabled = true;
			inputTags[35].disabled = true;
		}
		inputTags[12].onclick = function () {
			inputTags[14].disabled = true;
			inputTags[15].disabled = true;
			inputTags[16].disabled = true;
			inputTags[17].disabled = true;
			inputTags[18].disabled = true;
			inputTags[19].disabled = false;
			inputTags[20].disabled = false;
			for (i=0; i<8; i++) {
				GPUMenu[i].childNodes[7].disabled = true;
			}
			inputTags[30].disabled = true;
			inputTags[31].disabled = true;
			inputTags[35].disabled = true;
		}
		inputTags[13].onclick = function () {
			inputTags[14].disabled = true;
			inputTags[15].disabled = true;
			inputTags[16].disabled = true;
			inputTags[17].disabled = true;
			inputTags[18].disabled = true;
			inputTags[19].disabled = false;
			inputTags[20].disabled = false;
			inputTags[30].disabled = true;
			inputTags[31].disabled = true;
		}
	}
}

function checkPrice(inputTags) {	//Kollar 
	var priceDiv = document.getElementsByClassName("config-price");		//Samlar alla taggar med pris.
	var priceInt = [];		//Används för att spara alla priser (bara nummer).
	for (i=0; i<8; i++) {
		changePrice(i, inputTags);
	}
	for (i=0; i<7; i++) {
		changePriceRAM(i, inputTags);
	}
	for (i=0; i<priceDiv.length; i++) {
		priceInt[i] = parseInt(priceDiv[i].innerHTML);
	}
	totalCost = 0;
	for (i=0; i<priceDiv.length; i++) {
		if (inputTags[i].checked) {
			totalCost = totalCost + priceInt[i];
		}
	}
	resCost.innerHTML = totalCost + ":-"
	for (i=0; i<priceDiv.length; i++) {
		inputTags[i].onchange = function () {
		updatePrice(inputTags);
		}
	}
}

function changePrice(i, inputTags) {	//Ändrar en komponents pris beroende på hur många man väljer.
	var GPUMenu = document.getElementsByClassName("sli-menu");		//Referens till menyn där man väljer antal grafikkort.
	var GPUPrice = document.getElementById("gpu-config").getElementsByClassName("config-price");	//Referens till alla taggar med pris inom div taggen för grafikkort.
	var GPUInput = document.getElementById("gpu-config").getElementsByTagName("input");		//Alla input taggar inom div taggen för grafikkort.
	var GPUOriginal = [];	//Används för att spara det pris som stod där först, det vill säga priset för ett exemplar av den komponenten.
	var GPUValue = [];		//Används för att få värdet på input taggarna.
	GPUOriginal[i] = GPUPrice[i].innerHTML;
	GPUValue[i] = GPUInput[i].value;
	GPUMenu[i].onchange = function () {
		var GPUInt = [];	//Används för att spara bara siffrorna i priset.
		var ix = this.selectedIndex + 1;	//Sparar värdet för det antal man väljer.
		GPUInt[i] = parseInt(GPUOriginal[i]);
		GPUPrice[i].innerHTML = GPUInt[i]*ix + ":-";
		GPUInput[i].value = GPUValue[i];
		GPUInput[i].value += " x"+ix;
		updatePrice(inputTags, ix);
	}
	//Prisändringen görs på exakt samma sätt med hårddiskar, bara med andra variabelnamn. Känns onödigt att beskriva variablerna när de gör exakt samma som förgående, men med andra element.
	var HDMenu = document.getElementsByClassName("hdrive-menu");
	var HDPrice = document.getElementById("hd-config").getElementsByClassName("config-price");
	var HDInput = document.getElementById("hd-config").getElementsByTagName("input");
	var HDOriginal = [];
	var HDValue = [];
	HDOriginal[i] = HDPrice[i].innerHTML;
	HDValue[i] = HDInput[i].value;
	HDMenu[i].onchange = function () {
		var HDInt = [];
		var ix = this.selectedIndex + 1;
		HDInt[i] = parseInt(HDOriginal[i]);
		HDInput[i].value = HDValue[i];
		HDPrice[i].innerHTML = HDInt[i]*ix + ":-";
		HDInput[i].value += " x"+ix;
		updatePrice(inputTags);
	}
}

function changePriceRAM(i, inputTags) {		//Ändrar priset på en komponent beroende på hur många man väljer, samma som med grafikkort och hårddiskar men denna funktion upprepas bara 7 gånger (de andra upprepas 8).
	//Görs på exakt samma sätt som med grafikkort och hårddiskar.
	var RAMMenu = document.getElementsByClassName("ram-menu");
	var RAMPrice = document.getElementById("ram-config").getElementsByClassName("config-price");
	var RAMInput = document.getElementById("ram-config").getElementsByTagName("input");
	var RAMOriginal = [];
	var RAMValue = [];
	RAMOriginal[i] = RAMPrice[i].innerHTML;
	RAMValue[i] = RAMInput[i].value;
	RAMMenu[i].onchange = function () {
		var RAMInt = [];
		var ix = this.selectedIndex + 1;
		RAMInt[i] = parseInt(RAMOriginal[i]);
		RAMInput[i].value = RAMValue[i];
		RAMPrice[i].innerHTML = RAMInt[i]*ix + ":-";
		RAMInput[i].value += " (x"+ix+")";
		updatePrice(inputTags);
	}
}

function updatePrice(inputTags) {	//Uppdaterar priset som visas i HTML när man ändrar kvantitet på vissa komponenter.
	var priceDiv = document.getElementsByClassName("config-price");		//Refererar till taggen med priset.
	var priceInt = [];		//Används för att bara få nummer, utan :-.
	for (i=0; i<priceDiv.length; i++) {
		priceInt[i] = parseInt(priceDiv[i].innerHTML);
	}
	totalCost = 0;
	for (i=0; i<priceDiv.length; i++) {
		if (inputTags[i].checked) {
			totalCost = totalCost + priceInt[i];
		}
	}
	resCost.innerHTML = totalCost + ":-";
	costInput.value = totalCost + ":-";
}

function validateForm() {	//Ser till så att man fyllt i allting som man måste innan man skickar formen.
	var nameInput = document.getElementById("name");	//Refererar till input taggen där man fyller i sitt namn. 
	if (chosenChassi == 0 || chosenChassi == 1) {
		if ((inputTags[0].checked == false)) {
			alert("Du har inte valt ett Chassi!");
			return false;
		}
		else if ((inputTags[1].checked == false) && (inputTags[2].checked == false) && (inputTags[3].checked == false) && (inputTags[4].checked == false)) {
			alert("Du har inte valt ett Operativsystem!");
			return false;
		}
		else if ((inputTags[5].checked == false) && (inputTags[6].checked == false) && (inputTags[7].checked == false) && (inputTags[8].checked == false) && (inputTags[9].checked == false) && (inputTags[10].checked == false) && (inputTags[11].checked == false) && (inputTags[12].checked == false)) {
			alert("Du har inte valt ett Moderkort!");
			return false;
		}
		else if ((inputTags[13].checked == false) && (inputTags[14].checked == false) && (inputTags[15].checked == false) && (inputTags[16].checked == false) && (inputTags[17].checked == false) && (inputTags[18].checked == false) && (inputTags[19].checked == false)) {
			alert("Du har inte valt en Processor!");
			return false;
		}
		else if ((inputTags[20].checked == false) && (inputTags[21].checked == false) && (inputTags[22].checked == false) && (inputTags[23].checked == false) && (inputTags[24].checked == false) && (inputTags[25].checked == false) && (inputTags[26].checked == false) && (inputTags[27].checked == false)) {
			alert("Du har inte valt ett Grafikkort!");
			return false;
		}
		else if ((inputTags[28].checked == false) && (inputTags[29].checked == false) && (inputTags[30].checked == false) && (inputTags[31].checked == false) && (inputTags[32].checked == false) && (inputTags[33].checked == false) && (inputTags[34].checked == false)) {
			alert("Du har inte valt något RAM minne!");
			return false;
		}
		else if ((inputTags[35].checked == false) && (inputTags[36].checked == false) && (inputTags[37].checked == false) && (inputTags[38].checked == false) && (inputTags[39].checked == false) && (inputTags[40].checked == false) && (inputTags[41].checked == false) && (inputTags[42].checked == false)) {
			alert("Du har inte valt en Hårddisk!");
			return false;
		}
		else if ((inputTags[43].checked == false) && (inputTags[44].checked == false) && (inputTags[45].checked == false) && (inputTags[46].checked == false) && (inputTags[47].checked == false) && (inputTags[48].checked == false) && (inputTags[49].checked == false)) {
			alert("Du har inte valt ett Nätaggregat!");
			return false;
		}
	}
	if (chosenChassi == 2 || chosenChassi == 3 || chosenChassi == 4 || chosenChassi == 5 || chosenChassi == 6) {
		if ((inputTags[0].checked == false) && (inputTags[1].checked == false)) {
			alert("Du har inte valt ett Chassi!");
			return false;
		}
		else if ((inputTags[2].checked == false) && (inputTags[3].checked == false) && (inputTags[4].checked == false) && (inputTags[5].checked == false)) {
			alert("Du har inte valt ett Operativsystem!");
			return false;
		}
		else if ((inputTags[6].checked == false) && (inputTags[7].checked == false) && (inputTags[8].checked == false) && (inputTags[9].checked == false) && (inputTags[10].checked == false) && (inputTags[11].checked == false) && (inputTags[12].checked == false) && (inputTags[13].checked == false)) {
			alert("Du har inte valt ett Moderkort!");
			return false;
		}
		else if ((inputTags[14].checked == false) && (inputTags[15].checked == false) && (inputTags[16].checked == false) && (inputTags[17].checked == false) && (inputTags[18].checked == false) && (inputTags[19].checked == false) && (inputTags[20].checked == false)) {
			alert("Du har inte valt en Processor!");
			return false;
		}
		else if ((inputTags[21].checked == false) && (inputTags[22].checked == false) && (inputTags[23].checked == false) && (inputTags[24].checked == false) && (inputTags[25].checked == false) && (inputTags[26].checked == false) && (inputTags[27].checked == false) && (inputTags[28].checked == false)) {
			alert("Du har inte valt ett Grafikkort!");
			return false;
		}
		else if ((inputTags[29].checked == false) && (inputTags[30].checked == false) && (inputTags[31].checked == false) && (inputTags[32].checked == false) && (inputTags[33].checked == false) && (inputTags[34].checked == false) && (inputTags[35].checked == false)) {
			alert("Du har inte valt något RAM minne!");
			return false;
		}
		else if ((inputTags[36].checked == false) && (inputTags[37].checked == false) && (inputTags[38].checked == false) && (inputTags[39].checked == false) && (inputTags[40].checked == false) && (inputTags[41].checked == false) && (inputTags[42].checked == false) && (inputTags[43].checked == false)) {
			alert("Du har inte valt en Hårddisk!");
			return false;
		}
		else if ((inputTags[44].checked == false) && (inputTags[45].checked == false) && (inputTags[46].checked == false) && (inputTags[47].checked == false) && (inputTags[48].checked == false) && (inputTags[49].checked == false) && (inputTags[50].checked == false)) {
			alert("Du har inte valt ett Nätaggregat!");
			return false;
		}
	}
	if (nameInput.value === "") {
		alert("Du måste fylla i ditt namn!");
		return false;
	}
}

function confirmReset() {	//Poppar upp en rutan som frågor om man vill återställa formen, där man kan avbryta eller gå vidare.
	var confirmBox = confirm("Är du säker på att du vill återställa formen?");	//Confirmbox, används för att se om användaren väljer att avbryta eller gå vidare.
	if (confirmBox == true) {
		resetForm();
	}
	else {
		return false;
	}
}

function resetForm() {		//Återställer formen.
	var resetTimer = setInterval(function () {	//Används för att kunna avbryta intervall. Intervall används för att kunna uppdatera formen och priserna efter att formen har återställts (annars läser den priserna som stod innan formen återställdes). 
		for (i=0; i<inputTags.length; i++) {
			inputTags[i].disabled = false;
		}
		formChange();
		if (chosenChassi == 0 || chosenChassi == 1) {
			inputTags[0].checked = true;
		}
		checkPrice(inputTags);
	},500);
	setTimeout (function () {clearInterval(resetTimer);},1000);
}
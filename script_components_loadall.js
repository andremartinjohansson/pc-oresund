// Javascript för att ladda in alla produkter till en lista i alfabetisk ordning.

//Globala variabler.
var type = [], newComponent = [];
/*
type: Refererar till value på attibutet till en component i XML-dokumentet, det vill säga namnet på kompnentens typ.
newComponent: Ny array till alla komponenter, där de är sorterade i alfabetisk ordning.
*/
var motherboard, cpu, gpu, ram, harddrive, psu, opticaldrive, cpucooler, soundcard; //Refererar till ett klass namn I HTML som är samma som variablens namn.

function init() {	//Körs när sidan laddas. Anropar funktion att ladda in produkter och refererar till HTML element i variabler.
	requestHardware();
	motherboard = document.getElementsByClassName("motherboard");
	cpu = document.getElementsByClassName("cpu");
	gpu = document.getElementsByClassName("gpu");
	ram = document.getElementsByClassName("ram");
	harddrive = document.getElementsByClassName("harddrive");
	psu = document.getElementsByClassName("psu");
	opticaldrive = document.getElementsByClassName("opticaldrive");
	cpucooler = document.getElementsByClassName("cpucooler");
	soundcard = document.getElementsByClassName("soundcard");
	document.getElementById("components-menu").onchange = selectType;
}
window.onload = init;

function requestHardware() {	//Gör en AJAX request.
	var request;	//Används för att göra requesten.
	if (XMLHttpRequest) {
		request = new XMLHttpRequest();
	}
	else if (ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	}
	else {
		return false;
	}
	request.open("GET","components/hardware.xml",true);
	request.send(null);
	request.onreadystatechange = function () {
		if ((request.readyState === 4) && (request.status === 200)) {
			getData(request.responseXML);
		}
	}
}

function getData(XMLCode) {		//Samlar data från XML-dokumentet.
	var shortdescription, fulldescription, price, url; //Refererar till taggen med samma namn i XML-dokumentet.
	var component = [], componentAttr = [], title = [], titleData = [], shortdescription = [], shortData = [];
	/*
	component: Refererar till taggen component i XML-dokumentet.
	componentAttr: Används för att få attribut som tillhör component taggarna.
	title: Refererar till title taggarna i XML.
	titleData: Håller datan som finns inom title taggarna.
	shortdescription: Referens till shortdescription taggar i XML.
	shortData: Håller datan som finns inom shotdescription taggarna.
	*/
	var componentTemp = XMLCode.getElementsByTagName("component");	//Används för att få tal på hur många komponenter det finns. Talet används i första for-loopen.
	for (i=0; i<componentTemp.length; i++) {
		component[i] = XMLCode.getElementsByTagName("component")[i];
	}
	sortTags(component);
	for (i=0; i<component.length; i++) {
		title[i] = XMLCode.getElementsByTagName("title")[i];
		titleData[i] = title[i].firstChild.data;
	}
	titleData.sort();
	shortdescription = XMLCode.getElementsByTagName("shortdescription");
	for (i=0; i<component.length; i++) {
		shortdescription[i] = XMLCode.getElementsByTagName("shortdescription")[i];
		shortData[i] = shortdescription[i].firstChild.data;
	}
	fulldescription = XMLCode.getElementsByTagName("fulldescription");
	price = XMLCode.getElementsByTagName("price");
	url = XMLCode.getElementsByTagName("url");
	for (i=0; i<component.length; i++) {
		componentAttr[i] = title[i].parentNode.getAttributeNode("type");
		type[i] = componentAttr[i].value;
	}
	loadAll(component, title, titleData, shortData, type);
}

function loadAll(component, title, titleData, shortData, type) {	//Laddar in data för komponenter till HTML-dokumentet.
	var wrapper;	//Används för att referera till var komponenterna ska laddas in.
	wrapper = document.getElementById("hardware-wrapper");
	for (i=0; i<component.length; i++) {
		wrapper.innerHTML += '<div class="hardware-item ' + type[newComponent[i]] + '"><h5 class="title"><a href="javascript:void(0)" onclick="saveItem(' + newComponent[i] + ')">' + titleData[i] + '</a></h5><p class="hardware-desc">' + shortData[newComponent[i]] + '</p><a href="javascript:void(0)" onclick="saveItem(' + newComponent[i] + ')"><div class="hardware-button"><p>Mer Info</p></div></a></div>';
	}
}

function sortTags(component) {	//Sorterar taggar manuellt i alfabetisk ordning.
	var index;	//Används för att bestämma vilken plats som ska sorteras.
	var componentReplaced = [];		//Här sparas de gamla gamla platserna, så de kan användas om en plats blivit ersatt.
	index = 1;
	newComponent.push(0);
	componentReplaced.push("reserved");
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[2]);
	newComponent.push(2);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[47]);
	newComponent.push(47);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[46]);
	newComponent.push(46);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[45]);
	newComponent.push(45);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[22]);
	newComponent.push(22);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[15]);
	newComponent.push(15);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[16]);
	newComponent.push(16);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[17]);
	newComponent.push(17);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[20]);
	newComponent.push(20);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[19]);
	newComponent.push(19);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[18]);
	newComponent.push(18);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[21]);
	newComponent.push(21);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[1]);
	newComponent.push(1);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[7]);
	newComponent.push(7);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[6]);
	newComponent.push(6);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[5]);
	newComponent.push(5);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[55]);
	newComponent.push(55);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[52]);
	newComponent.push(52);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[53]);
	newComponent.push(53);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[54]);
	newComponent.push(54);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[3]);
	newComponent.push(3);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[4]);
	newComponent.push(4);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[49]);
	newComponent.push(49);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[50]);
	newComponent.push(50);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[51]);
	newComponent.push(51);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[48]);
	newComponent.push(48);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[38]);
	newComponent.push(38);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[39]);
	newComponent.push(39);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[44]);
	newComponent.push(44);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[42]);
	newComponent.push(42);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[40]);
	newComponent.push(40);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[43]);
	newComponent.push(43);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, component[41]);
	newComponent.push(41);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[8]);
	newComponent.push(8);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[9]);
	newComponent.push(9);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[10]);
	newComponent.push(10);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[11]);
	newComponent.push(11);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[12]);
	newComponent.push(12);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[13]);
	newComponent.push(13);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[14]);
	newComponent.push(14);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[28]);
	newComponent.push(28);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[23]);
	newComponent.push(23);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[24]);
	newComponent.push(24);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[25]);
	newComponent.push(25);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[26]);
	newComponent.push(26);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[29]);
	newComponent.push(29);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[27]);
	newComponent.push(27);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[34]);
	newComponent.push(34);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[37]);
	newComponent.push(37);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[35]);
	newComponent.push(35);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[36]);
	newComponent.push(36);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[31]);
	newComponent.push(31);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[32]);
	newComponent.push(32);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[30]);
	newComponent.push(30);
	index++;
	componentReplaced.push(component[index]);
	component.splice(index, 1, componentReplaced[33]);
	newComponent.push(33);
}

function selectType() {		//Ändrar vilken typ av komponenter som visas beroende på vad man väljer i HTML-listan.
	var ix;		//Plats i listan för den komponent man väljer.
	ix = this.selectedIndex;
	if (ix === 0) {
		for (i=0; i<motherboard.length; i++) {
			motherboard[i].style.display = "block";
		}
		for (i=0; i<cpu.length; i++) {
			cpu[i].style.display = "block";
		}
		for (i=0; i<gpu.length; i++) {
			gpu[i].style.display = "block";
		}
		for (i=0; i<ram.length; i++) {
			ram[i].style.display = "block";
		}
		for (i=0; i<harddrive.length; i++) {
			harddrive[i].style.display = "block";
		}
		for (i=0; i<psu.length; i++) {
			psu[i].style.display = "block";
		}
		for (i=0; i<opticaldrive.length; i++) {
			opticaldrive[i].style.display = "block";
		}
		for (i=0; i<cpucooler.length; i++) {
			cpucooler[i].style.display = "block";
		}
		for (i=0; i<soundcard.length; i++) {
			soundcard[i].style.display = "block";
		}
	}
	else if (ix === 1) {
		for (i=0; i<motherboard.length; i++) {
			motherboard[i].style.display = "block";
		}
		for (i=0; i<cpu.length; i++) {
			cpu[i].style.display = "none";
		}
		for (i=0; i<gpu.length; i++) {
			gpu[i].style.display = "none";
		}
		for (i=0; i<ram.length; i++) {
			ram[i].style.display = "none";
		}
		for (i=0; i<harddrive.length; i++) {
			harddrive[i].style.display = "none";
		}
		for (i=0; i<psu.length; i++) {
			psu[i].style.display = "none";
		}
		for (i=0; i<opticaldrive.length; i++) {
			opticaldrive[i].style.display = "none";
		}
		for (i=0; i<cpucooler.length; i++) {
			cpucooler[i].style.display = "none";
		}
		for (i=0; i<soundcard.length; i++) {
			soundcard[i].style.display = "none";
		}
	}
	else if (ix === 2) {
		for (i=0; i<motherboard.length; i++) {
			motherboard[i].style.display = "none";
		}
		for (i=0; i<cpu.length; i++) {
			cpu[i].style.display = "black";
		}
		for (i=0; i<gpu.length; i++) {
			gpu[i].style.display = "none";
		}
		for (i=0; i<ram.length; i++) {
			ram[i].style.display = "none";
		}
		for (i=0; i<harddrive.length; i++) {
			harddrive[i].style.display = "none";
		}
		for (i=0; i<psu.length; i++) {
			psu[i].style.display = "none";
		}
		for (i=0; i<opticaldrive.length; i++) {
			opticaldrive[i].style.display = "none";
		}
		for (i=0; i<cpucooler.length; i++) {
			cpucooler[i].style.display = "none";
		}
		for (i=0; i<soundcard.length; i++) {
			soundcard[i].style.display = "none";
		}
	}
	else if (ix === 3) {
		for (i=0; i<motherboard.length; i++) {
			motherboard[i].style.display = "none";
		}
		for (i=0; i<cpu.length; i++) {
			cpu[i].style.display = "none";
		}
		for (i=0; i<gpu.length; i++) {
			gpu[i].style.display = "block";
		}
		for (i=0; i<ram.length; i++) {
			ram[i].style.display = "none";
		}
		for (i=0; i<harddrive.length; i++) {
			harddrive[i].style.display = "none";
		}
		for (i=0; i<psu.length; i++) {
			psu[i].style.display = "none";
		}
		for (i=0; i<opticaldrive.length; i++) {
			opticaldrive[i].style.display = "none";
		}
		for (i=0; i<cpucooler.length; i++) {
			cpucooler[i].style.display = "none";
		}
		for (i=0; i<soundcard.length; i++) {
			soundcard[i].style.display = "none";
		}
	}
	else if (ix === 4) {
		for (i=0; i<motherboard.length; i++) {
			motherboard[i].style.display = "none";
		}
		for (i=0; i<cpu.length; i++) {
			cpu[i].style.display = "none";
		}
		for (i=0; i<gpu.length; i++) {
			gpu[i].style.display = "none";
		}
		for (i=0; i<ram.length; i++) {
			ram[i].style.display = "block";
		}
		for (i=0; i<harddrive.length; i++) {
			harddrive[i].style.display = "none";
		}
		for (i=0; i<psu.length; i++) {
			psu[i].style.display = "none";
		}
		for (i=0; i<opticaldrive.length; i++) {
			opticaldrive[i].style.display = "none";
		}
		for (i=0; i<cpucooler.length; i++) {
			cpucooler[i].style.display = "none";
		}
		for (i=0; i<soundcard.length; i++) {
			soundcard[i].style.display = "none";
		}
	}
	else if (ix === 5) {
		for (i=0; i<motherboard.length; i++) {
			motherboard[i].style.display = "none";
		}
		for (i=0; i<cpu.length; i++) {
			cpu[i].style.display = "none";
		}
		for (i=0; i<gpu.length; i++) {
			gpu[i].style.display = "none";
		}
		for (i=0; i<ram.length; i++) {
			ram[i].style.display = "none";
		}
		for (i=0; i<harddrive.length; i++) {
			harddrive[i].style.display = "block";
		}
		for (i=0; i<psu.length; i++) {
			psu[i].style.display = "none";
		}
		for (i=0; i<opticaldrive.length; i++) {
			opticaldrive[i].style.display = "none";
		}
		for (i=0; i<cpucooler.length; i++) {
			cpucooler[i].style.display = "none";
		}
		for (i=0; i<soundcard.length; i++) {
			soundcard[i].style.display = "none";
		}
	}
	else if (ix === 6) {
		for (i=0; i<motherboard.length; i++) {
			motherboard[i].style.display = "none";
		}
		for (i=0; i<cpu.length; i++) {
			cpu[i].style.display = "none";
		}
		for (i=0; i<gpu.length; i++) {
			gpu[i].style.display = "none";
		}
		for (i=0; i<ram.length; i++) {
			ram[i].style.display = "none";
		}
		for (i=0; i<harddrive.length; i++) {
			harddrive[i].style.display = "none";
		}
		for (i=0; i<psu.length; i++) {
			psu[i].style.display = "block";
		}
		for (i=0; i<opticaldrive.length; i++) {
			opticaldrive[i].style.display = "none";
		}
		for (i=0; i<cpucooler.length; i++) {
			cpucooler[i].style.display = "none";
		}
		for (i=0; i<soundcard.length; i++) {
			soundcard[i].style.display = "none";
		}
	}
	else if (ix === 7) {
		for (i=0; i<motherboard.length; i++) {
			motherboard[i].style.display = "none";
		}
		for (i=0; i<cpu.length; i++) {
			cpu[i].style.display = "none";
		}
		for (i=0; i<gpu.length; i++) {
			gpu[i].style.display = "none";
		}
		for (i=0; i<ram.length; i++) {
			ram[i].style.display = "none";
		}
		for (i=0; i<harddrive.length; i++) {
			harddrive[i].style.display = "none";
		}
		for (i=0; i<psu.length; i++) {
			psu[i].style.display = "none";
		}
		for (i=0; i<opticaldrive.length; i++) {
			opticaldrive[i].style.display = "block";
		}
		for (i=0; i<cpucooler.length; i++) {
			cpucooler[i].style.display = "none";
		}
		for (i=0; i<soundcard.length; i++) {
			soundcard[i].style.display = "none";
		}
	}
	else if (ix === 8) {
		for (i=0; i<motherboard.length; i++) {
			motherboard[i].style.display = "none";
		}
		for (i=0; i<cpu.length; i++) {
			cpu[i].style.display = "none";
		}
		for (i=0; i<gpu.length; i++) {
			gpu[i].style.display = "none";
		}
		for (i=0; i<ram.length; i++) {
			ram[i].style.display = "none";
		}
		for (i=0; i<harddrive.length; i++) {
			harddrive[i].style.display = "none";
		}
		for (i=0; i<psu.length; i++) {
			psu[i].style.display = "none";
		}
		for (i=0; i<opticaldrive.length; i++) {
			opticaldrive[i].style.display = "none";
		}
		for (i=0; i<cpucooler.length; i++) {
			cpucooler[i].style.display = "block";
		}
		for (i=0; i<soundcard.length; i++) {
			soundcard[i].style.display = "none";
		}
	}
	else if (ix === 9) {
		for (i=0; i<motherboard.length; i++) {
			motherboard[i].style.display = "none";
		}
		for (i=0; i<cpu.length; i++) {
			cpu[i].style.display = "none";
		}
		for (i=0; i<gpu.length; i++) {
			gpu[i].style.display = "none";
		}
		for (i=0; i<ram.length; i++) {
			ram[i].style.display = "none";
		}
		for (i=0; i<harddrive.length; i++) {
			harddrive[i].style.display = "none";
		}
		for (i=0; i<psu.length; i++) {
			psu[i].style.display = "none";
		}
		for (i=0; i<opticaldrive.length; i++) {
			opticaldrive[i].style.display = "none";
		}
		for (i=0; i<cpucooler.length; i++) {
			cpucooler[i].style.display = "none";
		}
		for (i=0; i<soundcard.length; i++) {
			soundcard[i].style.display = "block";
		}
	}
}
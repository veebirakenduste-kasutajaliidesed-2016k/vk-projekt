var roomForWood = 30;
var wood = 0;
var woodTotal = 0;
var clicksOnWoodButton = 0;
var materials = 0;
var rocks = 0;
var iron = 0;
var roomForRocks = 30;
//var garageButton = 0;
var garageCost = 10;
var garage = 0;
var workShop = 0;
//var barnBu
var axe = 0;
var woodGain = 0;
var axes = ["Puidust", "Kivist", "Rauast", "Hõbedast", "Kullast", "Teemantist", "Jänesest"];
var heat = 50;
var heatLevels = ["Väga külm", "Jahe", "Paras", "Soe", "Palav"];
var lowerHeatTime = 45 * 1000;
var health = 100;
window.onload = function(){
	document.getElementById('puu').addEventListener('click', addWood);
	document.getElementById('buildGarageButton').addEventListener('click', buildGarage);
	document.getElementById('craftMaterial').addEventListener('click', addMaterials);
	document.getElementById('buildWorkShop').addEventListener('click', buildWorkShop);
	//document.getElementById('active').addEventListener('click', clearEventAlert);
	document.getElementById("gSize").innerHTML = "Kuur ("+garage+")";
	document.getElementById("wood").innerHTML = "Puitu: "+wood;
	document.getElementById("materials").innerHTML = "Materjale: "+materials;
	document.getElementById("roomForWood").innerHTML = "Kuuri mahutavus: "+roomForWood+" ühikut";
	document.getElementById("axe").innerHTML = "Kirves: "+axes[axe];
	document.getElementById('heat').addEventListener('click', heatRoom);
	document.getElementById('roomHeat').innerHTML = "Toasoojus: Paras";
	document.getElementById('health').innerHTML = "Tervis: "+health+"%";
	setInterval(lowerHeat, lowerHeatTime);
	document.getElementById('buildBarnButton').addEventListener('click', buildBarnConfirm);
	document.getElementById('matswood').addEventListener('click', testMaterialsConfirm);
	document.getElementById('gatherRock').addEventListener('click', gatherRock);
	document.getElementById('searchIron').addEventListener('click', lookForIron);
	document.getElementById('upgradeAxe').addEventListener('click', upgradeAxeConfirm);
	
	
	//btn.onClick = addWood();
}
function buildBarnConfirm(){
	bootbox.confirm({ 
    size: 'small',
    message: "Oled kindel, et soovid lauda ehitada?<br> <strong>100 puitu ja 75 materjali</strong>", 
    callback: function(result){
		if(result === true){
			if(wood <= 99 || materials <= 74){
				bootbox.alert("Sul ei ole piisavalt vahendeid!")
			}else{
				buildBarn();
			}
		}else{
			console.log("Ei soovi")
		}
	}
	});
}
function testMaterialsConfirm(){
	bootbox.confirm({ 
    size: 'small',
    message: "Oled kindel, et soovid testimise korras 200 puitu ja 200 materjali saada?", 
    callback: function(result){
		if(result === true){
				matsWood();
		}else{
			console.log("Ei soovi")
		}
	}
	});
}
function crabAttackAlert(){
bootbox.alert("Kivi alt tuli välja krabi ja hammustas sind sõrmest! <br>kaotasid 15 tervisepunkti!", function() {
		health = health - 15;
		document.getElementById("health").innerHTML = "Tervis: "+health+"%";
});
}
function foundAxeAlert(){
	bootbox.confirm({ 
    size: 'small',
    message: "Leidsid paku kõrvalt <strong>kivist</strong> kirve! <br>Kas korjad üles?", 
    callback: function(result){
		if(result === true){
			axe = axe+1;
			document.getElementById("buildBarnButton").style = "display: inline;";
			document.getElementById("buildBarnButton").disabled = false;
			document.getElementById("axe").innerHTML = "Kirves: "+axes[axe];

		}else{
			foundAxeAlert2();
		}
	}
	});
}
function foundAxeAlert2(){
bootbox.alert("Korjasid ikkagi üles, sest seda on edaspidi vaja!", function() {
		axe = axe+1;
		document.getElementById("buildBarnButton").style = "display: inline;";
		document.getElementById("buildBarnButton").disabled = false;
		document.getElementById("axe").innerHTML = "Kirves: "+axes[axe];
});
}
function cheatUsed(){
bootbox.alert("Ilma cheatimata poleks saanud veel lauta ehitada!<br> Sellest ka praegu vale pilt, paranda!", function() {
});
}
function upgradeAxeConfirm(){
	bootbox.confirm({ 
    size: 'small',
    message: "Kirve täiustamiseks läheb vaja 40 kivi ja 20 rauda.", 
    callback: function(result){
		if(result === true){
			if(rocks <= 39 && iron <= 19){
				bootbox.alert("Sul ei ole piisavalt vahendeid!")
			}else{
				axe = axe + 1;
				bootbox.alert("Sul on nüüd "+axes[axe]+" kirves");
				document.getElementById("axe").innerHTML = "Kirves: "+axes[axe];
			}	
		}else{
			console.log("Ei soovi")
		}
	}
	});
}
function addWood(){
	if(wood >= roomForWood){
		console.log("Ei mahu!")
		document.getElementById("alert").innerHTML = "Kuuri ei mahu rohkem puid!";
	}else{
		var chance = randomInt(1, 11);
		console.log(chance)
		if(chance === 1 || chance === 2 ){
			wood = wood + axe + 2
			woodTotal = woodTotal + axe + 2
			console.log("said 2 puuhalgu rohkem");
			woodGain = axe + 2
			document.getElementById("alert").innerHTML = "Said "+woodGain+" puuhalgu";
			
		}else if(chance === 3){
			wood = wood + axe + 3
			woodTotal = woodTotal + axe + 3
			console.log("said 3 puuhalgu rohkem");
			woodGain = axe + 3
			document.getElementById("alert").innerHTML = "Said "+woodGain+" puuhalgu";
		}else{
		wood = wood + axe + 1
		woodTotal = woodTotal + axe + 1
		woodGain = axe + 1
		document.getElementById("alert").innerHTML = "Said "+woodGain+" puuhalgu";
		}
			if(woodGain === 1){
			document.getElementById("alert").innerHTML = "Said "+woodGain+" puuhalu";
			}else{
			document.getElementById("alert").innerHTML = "Said "+woodGain+" puuhalgu";
			}
		document.getElementById("wood").innerHTML = "Puitu: "+wood;
		document.getElementById("materials").innerHTML = "Materjale: "+materials;
		clicksOnWoodButton = clicksOnWoodButton + 1;
		//console.log(wood)
		
	}
	if(clicksOnWoodButton === 10){
		clicksOnWoodButton = clicksOnWoodButton + 1;
		foundAxeAlert();
	}
}
function addMaterials(){
	if(wood >= 3){
		materials = materials + 1;
		wood = wood - 3
		document.getElementById("materials").innerHTML = "Materjale: "+materials;
		document.getElementById("wood").innerHTML = "Puitu: "+wood;
		document.getElementById("alert").innerHTML = "Said ühe materjali!";
	}else{
		document.getElementById("alert").innerHTML = "Sul ei ole materjalide töötlemiseks piisavalt puitu!";
	}
	if(materials >= garageCost){
		
		document.getElementById("buildGarageButton").disabled = false;
	}
}
function gatherRock(){
	if(rocks+iron >= roomForRocks){
		console.log("Ei mahu!")
		document.getElementById("alert").innerHTML = "Su kotti ei mahu rohkem kive!";
	}else{
	var chance = randomInt(1, 50);
		console.log(chance)
		if(chance <= 47){
			rocks = rocks + 1
			document.getElementById("alert").innerHTML = "Korjasid ühe kivi";
			document.getElementById("rocks").innerHTML = "Kive: "+rocks;
		}else{
			crabAttackAlert();
			console.log("Krab ründas!");
		}
	}
}
function lookForIron(){
	if(iron+rocks >= roomForRocks){
		console.log("Ei mahu!")
		document.getElementById("alert").innerHTML = "Su kotti ei mahu rohkem rauda!";
	}else{
		var chance = randomInt(1, 10);
		console.log(chance)
		if(chance === 1){
			iron = iron + 1
			document.getElementById("alert").innerHTML = "Leidsid rauda";
			document.getElementById("iron").innerHTML = "rauda: "+iron;
		}else{
			document.getElementById("alert").innerHTML = "Ei leidnud rauda";
		}
	}
}
function buildGarage(){
	if(materials < garageCost){	
		document.getElementById("alert").innerHTML = "Sul ei ole kuuri suurendamiseks piisavalt materjale!";
	}else{
		materials = materials - garageCost;
		document.getElementById("materials").innerHTML = "Materjale: "+materials;
		garage = garage + 1;
		roomForWood = roomForWood + 30 * garage;
		garageCost = garage * 10 + garageCost
		console.log(garage)
		document.getElementById("gSize").innerHTML = "Kuur ("+garage+")";
		document.getElementById("roomForWood").innerHTML = "Kuuri mahutavus: "+roomForWood;
	}
	if(materials < garageCost){
		
		document.getElementById("buildGarageButton").disabled = true;
		document.getElementById("buildGarageButton").value = "Suurenda kuuri ("+ garageCost + " materjali)"
	}else{

		document.getElementById("buildGarageButton").disabled = false;
		document.getElementById("buildGarageButton").value = "Suurenda kuuri ("+ garageCost + " materjali)"
		console.log("puitu vaja: "+garageCost)
		console.log("Suurus: "+garage)
	}
	if(garage === 2){
		document.getElementById("buildWorkShop").style = "display: inline;";
		document.getElementById("buildWorkShop").disabled = false;
	}
}

function buildWorkShop(){
	if(wood < 10){
		document.getElementById("alert").innerHTML = "Sul ei ole töökoja ehitamiseks piisavalt puitu!";
	}else{
	wood = wood - 10;
	workShop = 1;
	document.getElementById("buildWorkShop").style = "display: none;";
	document.getElementById("tab2").style = "display: ";
	document.getElementById("materials").innerHTML = "Materjale: "+materials;
	document.getElementById("wood").innerHTML = "Puitu: "+wood;
	document.getElementById("tab4").style = "display: ";
	document.getElementById('rocks').innerHTML = "Kive: "+rocks;
	document.getElementById('iron').innerHTML = "Rauda: "+iron;
	document.getElementById("rocks").style = "display: ";
	document.getElementById("iron").style = "display: ";
	document.getElementById("yourHome").src = "img/stage2.png";
	}
}
function buildBarn(){
	wood = wood - 100;
	materials = materials - 75;
	//barnBuilding = 1;
	document.getElementById("buildBarnButton").style = "display: none;";
	document.getElementById("tab3").style = "display: ";
	document.getElementById("materials").innerHTML = "Materjale: "+materials;
	document.getElementById("wood").innerHTML = "Puitu: "+wood;
	document.getElementById("yourHome").src = "img/stage3.png";
	if(materials >= garageCost){
		
		document.getElementById("buildGarageButton").disabled = false;
	}
	if(workShop === 0){
		cheatUsed();
	}
}
function lowerHeat(){
	var heatLevel;
	if(heat >=90){
		heatLevel = heatLevels[4];
	}else if(heat >=70){
		heatLevel = heatLevels[3];
	}else if(heat >= 50){
		heatLevel = heatLevels[2];
	}else if(heat >=30){
		heatLevel = heatLevels[1];
	}else{
		heatLevel = heatLevels[0];
	}
	if(heat > 0){
	heat = heat - 10;
	document.getElementById('roomHeat').innerHTML = "Toasoojus: "+heatLevel;
	}
}

function heatRoom(){
	
	if(heat >=91){
		document.getElementById("alert").innerHTML = "Ahju ei tasuks üle kütta!";
	}else if(wood <= 2){
		document.getElementById("alert").innerHTML = "Sul ei ole piisavalt küttepuid! (3)";
	}else{
		wood = wood - 3;
		heat = heat + 10;
		document.getElementById("wood").innerHTML = "Puitu: "+wood;
		document.getElementById("alert").innerHTML = "Kütsid kaminat(-3 puitu)";
	}
}

function randomInt(min, max) {
	
	return Math.floor(Math.random() * (max - min)) + min;
}

function clearEventAlert(){
	document.getElementById("alert").innerHTML ="";
}
function matsWood(){
	wood = wood + 200;
	materials = materials + 200;
	document.getElementById("wood").innerHTML = "Puitu: "+wood;
	document.getElementById("materials").innerHTML = "Materjale: "+materials;
}
/*function myFunction() {
	if(garageButton == 0){
    var btn = document.createElement("BUTTON");
	var garage = document.createTextNode("Ehita garaaž");
	btn.appendChild(garage);
    document.body.appendChild(btn);
	}
}*/
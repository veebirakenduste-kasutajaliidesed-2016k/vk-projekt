TÕLKERAKENDUS

## Tähtaeg 

Rühma viimane tund esitletakse

## Liikmete arv
1 Arthur Škurko

Algoritmiline keerukus on olemas. 

var word_en_split = text_en.split(" "); //Splits sentence into words on 'space'
var word_array = [word_en_split]; //creates an array of split words
var value_en = document.querySelector(".value_en"); //element where split words are written 

for(i=0; i<word_en_split.length; i++){ 
	
	// Goes through the array of words and writes them seperately into a <div>
	
	console.log(word_en_split[i]);
	value_en.innerHTML += "<span class='first'>"+word_en_split[i]+" </span>"
	
}

function select_en(event) {
				
	//Function to allow selection of words seperately
	//Also colors target words.
	var to_click = event.target;
	var en = to_click.textContent;
	
	if($(".replace").hasClass("inactive")){
		
		$(".add-new-translation").removeClass("inactive");
		if(to_click.classList.contains("in")){
			
			console.log("should remove from input only: "+en);
			if(to_click.classList.contains("blue")){
				$(".seperate").removeClass("inactive");
			}else{
				to_click.style.color = "";
				to_click.className = "first";
				document.querySelector(".en").value = "";
			}
		}
		else{
			event.target.style.color = "green";
			var en = event.target.innerHTML;
			to_click.className = "in match_"+i;
			document.querySelector(".en").value += en;
		}
	}
	else{
		$(".add-new-translation").addClass("inactive");
	}
	// Lugeja-pistikprogramm, mis loeb, ette valitava teksti.
	// ResponsiveVoice is a programm that reads selected text.
	responsiveVoice.speak(en);
}

Rakenduse idee on võrrelda lausestruktuure erinevates keeltes, sel puhul inglise-eesti. Saab sõnu lauses eraldi valida/kuulata ning sõnu paari panna ja lahutada, juba paaristatud sõnu asendada.

### Nõuded

1. **README.md sisaldab:**
    * suurelt projekti nime;
    * kes teeb;
    * eesmärki (3-4 lauset, mis probleemi rakendus lahendab);
    * funktsionaalsuse loetelu prioriteedi järjekorras, nt
        * v0.1 Saab teha kasutaja ja sisselogida
        * v0.2 Saab lisada ...
        * ...
    * andmete liikumise skeem loetava pildina (mis lehed ja mis andmeid mis lehel käideldakse);

2. **Veebirakenduse nõuded:**
    * rakendus töötab nii palju kui saab ka võrguta olekus, st kasutab `appcache`i;
    * andmeid talletatakse lisaks kohalikule (localStorage) ka serveripool (soovitatavalt andmebaas või fail) – AJAX;
    * Kasutatav ka mobiilselt seadmelt;
    * muutujad/tabelid on inglise keeles;
    * rakendus on piisava funktsionaalsusega ja turvaline – eelnev kokkulepe õppejõuga, mis saab valmis;
    * kood on jaotatud vajadusel eri failidesse ja kood on kokkupakitud kujul;

3. **Funktsionaalsus**
    * juhul kui algoritmiline keerukus on piisav siis kõiki nõudeid ei ole vaja täita – ainult eelneval kokkuleppel õppjõuga!

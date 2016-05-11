# Veebirakendus bussiplaanide tarvis, tähtaeg päev enne eksamit - mai lõpp
## Projekt IFI6093.DT Veebirakenduste kasutajaliidesed aine raames
### Rakendus on tehtud Tallinna Ülikooli Informaatika eriala üliõpilase Markus Suurekivi poolt.
#### Rakenduse sisu
Rakendus on mõeldud eelkõige just isiklikuks kasutuseks, sest pidevalt tekib probleem, et õigel ajal ei saa Internetile ligipääsu
ning selle tõttu jääb kätte saamata ka vajalik informatsioon bussiaegade kohta ning elades kohas, kus bussid ei sõida igal võimalikul ajal -
on see väga tähtis informatsioon. Loodan antud rakenduse abil vähendada selle probleemi mõju ning planeerida oma aega vastavalt,
salvestades vajaliku teabe faili, millele on võimalik ligi pääseda ka siis kui puudub ühendus Internetiga.

### Nõuded
    * funktsionaalsuse loetelu
        * Kuvatakse tänane kuupäev, päev ning kellaaeg
        * Nende andmete põhjal kuvatakse lähima väljumisajaga bussiliin ja kellaaeg, millal antud transport väljub
        * Leitakse peatuseni kõnnitav ajakulu
        * Kirjutatakse lähim bussiliin ja aeg tekstifaili, millele saab ligi ka offlines
        * Internetiühenduse saamisel uuenda kuupäeva/kellaaega ja tekstifaili
    * andmete liikumise skeem loetava pildina (mis lehed ja mis andmeid mis lehel käideldakse);
        * Hetkel puudu

    * rakendus töötab nii palju kui saab ka võrguta olekus, st kasutab `appcache`i;
    * andmeid talletatakse lisaks kohalikule (localStorage) ka serveripool (soovitatavalt andmebaas või fail) – AJAX;
    * Kasutatav ka mobiilselt seadmelt;
    * muutujad/tabelid on inglise keeles;
    * rakendus on piisava funktsionaalsusega ja turvaline – eelnev kokkulepe õppejõuga, mis saab valmis;
    * kood on jaotatud vajadusel eri failidesse ja kood on kokkupakitud kujul;

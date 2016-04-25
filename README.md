## Õppekeskkond
Martti Naaber

### Eesmärk
Luua rakendus, kus kasutaja saab õppida/korrata inglise-eesti suunal (ja vastupidi) inglise- ja eestikeelseid sõnu. Süsteem viskab vastava sõna ette ja kasutaja peab sisse trükkima selle tähenduse/vaste teises keeles. Kasutaja saab ise sõnu (ing+est) sisestada.

http://tympanus.net/codrops/category/playground/

### Funktsionaalsused
* v0.1 saab teha kasutaja ja sisse logida
* v0.2 saab saab sisestada sõnu (täpsemalt siis sõnade paare)
* v0.3 süsteem viskab ekraanile sõna (ing või est) ning kasutaja saab proovida seda 'ära arvata' (sõna saab 'submittida' ühe korra, kui kasutaja arvab valesti, ütleb süsteem, et arvas valesti ja viskab ette uue sõna)
* v0.4 süsteem peab arvestust õigesti ja valesti arvatud sõnade suhtes, st statistika
* v0.5 kasutaja saab valida, kas sõnad esitakse randoomselt või visatakse ette kõik sõnad järjekorras (sellisel juhul peab olema arvestus valesti arvatud sõnade suhtes, st valesti arvatud sõna küsib uuesti)

### Andmete liikumise skeem

### NÕUDED

**Veebirakenduse nõuded:**
  * rakendus töötab nii palju kui saab ka võrguta olekus, st kasutab `appcache`i;
  * andmeid talletatakse lisaks kohalikule (localStorage) ka serveripool (soovitatavalt andmebaas või fail) – AJAX;
  * Kasutatav ka mobiilselt seadmelt;
  * muutujad/tabelid on inglise keeles;
  * rakendus on piisava funktsionaalsusega ja turvaline – eelnev kokkulepe õppejõuga, mis saab valmis;
  * kood on jaotatud vajadusel eri failidesse ja kood on kokkupakitud kujul;

**Funktsionaalsus**
  * juhul kui algoritmiline keerukus on piisav siis kõiki nõudeid ei ole vaja täita – ainult eelneval kokkuleppel õppjõuga!

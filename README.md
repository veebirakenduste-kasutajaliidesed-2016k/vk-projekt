# Runner App

## Liikmed
Rimo Esko

## Eesmärk
Rakenduse eesmärgiks on jälgida kasutaja sportimist. Kui jooksmise ajal app tööle panna, siis see salvesta aja, vahemaa ja joonistab kaardile joostud teekonna. Siis salvestab kõik selle andmebaasi ja hiljem saab kasutaja vaadata oma sportimise ajalugu.

## Funktsionaalsused
1. v0.1 Andmebaas on olemas
1. v0.2 Kasutaja saab Registreeruda ja sisse logida
1. v0.3 Kasutaja saab treeningu valida ja alustada treeningut
1. v0.4 Treening ja teekond salvestatakse andmebaasi
1. v0.5 Treeningut ja teekonda on võimalik andmebaasist kätte saada
1. v0.6 Kasutajale kuvatakse tema sportimise ajalugu
1. v0.7 Teekonna põhjal joonistatakse kaart valmis

## Andmete liikumine
1.	**home page**
Siin saab kasutaja sisse logida või uue kasutaja luua.
Registreerumisel salvestatakse andmed andmebaasi ja sisselogimisel võrreldakse andmeid andmebaasis olevate andmetega.
2.	**Exercise page**
Siin saab kasutaja oma treeninguid teha, on olemas start nupp, et alustada treeningut ja stopp, et lõpetada. Lehele ligipääs on ainult sisselogitud kasutajal.
Enne treeningu alustamist valib kasutaja millega ta tegeleb (jooksmine, jalgratas, vms), need võetakse andmebaasist ja kui start nuppu vajutab, siis hakkab stopper tööle ja hakatakse kasutaja asukohta jälgima, ning koordinaadid salvestatakse andmebaasi.
Peale stop nupu vajutamist nullitakse stopper, lõpetatakse kasutaja asukoha jälgimise ja kõik andmed antud treeningu kohta pannakse andmebaasi.
3.	**History page**
Siin näeb kasutaja enda treeningute ajalugu. Lehele ligipääs on ainult sisselogitud kasutajal.
Leht loeb andmed andmebaasist ekraanile ja kui kasutaja vajutab mõne treeningu peale, siis kuvatakse talle selle treeningu kaart.

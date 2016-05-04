# Projekti Nimi

## Liikmed 
Rimo Esko

## Eesmärk
Rakenduse eesmärgiks on jälgida kasutaja sportimist. Kui jooksmise ajal app tööle panna, siis see salvesta aja, vahemaa ja joonistab kaardile joostud teekonna. Siis salvestab kõik selle andmebaasi ja hiljem saab kasutaja vaadata oma sportimise ajalugu.

## Funktsionaalsused
1. v0.1 Andmebaas on olemas
1. v0.2 Kasutaja saab Registreeruda ja sisse logida
1. v0.3 Kasutaja saab treeningu valida ja alustada treeningut
1. v0.4 Läbitud teekond joonistatakse kaardile, saab teada treeningu kestvuse ja läbitud vahemaa
1. v0.5 Andmed treeningu kohta salvestatakse andmebaasi ja kasutaja saab neid näha.
1. v0.6 Cache töötab

## Andmete liikumine
1.	**home page**
Siin saab kasutaja sisse logida või uue kasutaja luua.
Registreerumisel salvestatakse andmed andmebaasi ja sisselogimisel võrreldakse andmeid andmebaasis olevate andmetega.
2.	**workout page**
Siin saab kasutaja oma treeningud teha, on olemas start nupp, et alustada treeningut ja stopp, et lõpetada. Lehele ligipääs on ainult sisselogitud kasutajal.
Enne treeningu alustamist loetakse andmbesaasist millised treeningud on valikus olemas ja kasutaja saab nende vahel valida.
Peale stop nupu vajutamist pannakse kõik andmed antud treeningu kohta andmebaasi.
3.	**history page**
Siin näeb kasutaja enda treeningute ajalugu. Lehele ligipääs on ainult sisselogitud kasutajal.
Leht loeb andmed andmebaasist ekraanile.
# Soundcloud asi

## Autor: Richard Aasa

## Eesmärk
Luua rakendus mis kasutab Soundcloud API'd ja THREE.js libraryit.
Proovida piirduda puhta javascriptiga. Ainuke õigustus muid librarysid kasutada
oleks rakenduse kiiruse optimeerimine (näiteks UNDERSCORE.js for loop).

## Funkstsionaalsused
  * v0.1 Rendeerimine töötab
  * v0.2 Stseeni ülesehitus
  * v0.3 Kaamera liikumine
  * v0.4 Soundcloud ühendus
  * v0.5 CanvasSprite elementide programmid
  * v0.6 Visualisatsioon heli jaoks
  * v0.7 UI edasiareng koos otsinguga
  * v0.8 Saab playlistide järgi otsida
  * v0.9 Struktuuri muudatused
  * v1.0 Encapsulation + postprocessing

## Andmete liikumise skeem
Kõik toimub ühel lehel. Tehakse AJAX request soundcloud.com'i kasutades soundcloud'i enda API'd.
Streame ise ei saa salvestada, aga AJAX requestist saadud infot saab küll. Ehk stream_uri, pildid jms. saab salvestada.

## Nõuded
  * Enamjaolt staatiline leht, kui andmed on kätte saadud ei kao nad kuhugi, aga uue requesti tegemisel peab ikka võrgus olema.
  * Andmeid ei talletata momendil, tulevikus peale optimeerimist ehk küll.
  * On kasutatav mobiiliseadmelt, tulevikus äkki Socket.io toetus (mobiil käituks puldina).
  * Muutujad peaksid kõik olema inglise keeles.
  * Ainuke turvalisuse 'leke' on client_id nägemine source'ist.
  * Organiseerimine vajab veel tööd, kuna kood on üpris mahukas.!

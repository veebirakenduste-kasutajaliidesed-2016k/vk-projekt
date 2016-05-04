PROJEKT HANGMAN

Tegijad:
        Delvis Ramot
        Kevin Münter

Eesmärgid:
          Lisada klaviatuurivõimalus tähtede valimisel.
          Juhul, kui vale täht valitakse, siis ebameeldiv heli.
          Kui kaob internet, jääb mäng kasutajale ette.
          Kui üle jõu ei käi, siis ka häälkäsklustega juhtimine.

Funktsionaalsus:
                v0.1 Mäng töötab.
                v0.2 Klaviatuuriga saab tähti valida.
                v0.3 Lisatud on hääl vale valiku korral.
                v0.4 Mäng jääb ette, kui võrk kaob ära.
                v0.5 Mängu saab juhtida häälkäsklustega.


### Nõuded

1. **README.md sisaldab:**
    * andmete liikumise skeem loetava pildina (mis lehed ja mis andmeid mis lehel käideldakse);

2. **Veebirakenduse nõuded:**
    * rakendus töötab nii palju kui saab ka võrguta olekus, st kasutab `appcache`i;
    * andmeid talletatakse lisaks kohalikule (localStorage) ka serveripool (soovitatavalt andmebaas või fail) – AJAX;

# Projekt

## Tähtaeg 

Rühma viimane tund esitletakse

## Liikmete arv
Võib teha üksi või kahekesi

**Juhul kui tehakse kahekesi, peab olema näha githubis, kes ja mida on kirjutanud. Kui ei ole näha, kes midagi kirjutanud on, tööd ei arvesta! Kui ei tea kuidas seda teha, küsi!**

## Tööjuhend
1. Üks fork'ib endale käesoleva repositooriumi ning annab vajadusele kirjutamisõiguse/ligipääsu
1. Tee kohe Pull request
1. Muuda repositooriumi `README.md faili` vastavalt nõutele
1. Tee valmis korralik veebirakendus

### Nõuded

1. **README.md sisaldab:**
    * suurelt projekti nime;
    * Üksi;
    * Mäng: Telefon ütleb mingi asendi, milles telefon olema peab. (nt left, right. telefon tuleb keerata vastavalt) Tiksub mingi aeg, mille jooksul tuleb telefon keerata. Aeg läheb teatud aja tagant kiiremaks. Kui 3 korda eksitakse, siis mäng läbi.;
    * funktsionaalsuse loetelu prioriteedi järjekorras, nt
        * v0.1 Kuvab asendi ja kui telefon selles asendis, siis ütleb järgmise.  TEHTUD!
        * v0.2 Punktide arvestus
        * v0.3 Mäng kestab 10 sec, kuvab skoori
        * v0.4 Nupp uue mängu alustamiseks 
        * v0.5 Nime küsimine, skoori salvestamine serverisse
        * v0.6 Taust roheliseks õige vastuse korral, muidu punane, tekst suuremaks.
        * v0.7 High skoori kuvamine (5 paremat)? + nupp high score nägemiseks
        * 
        * (v0.1 Kuvab asendi ja kui telefon selles asendis, siis ütleb järgmise.  TEHTUD!
        * v0.2 Punktide arvestus
        * v0.3 Ajalimiidi lisamine ühe külje keeramiseks.
        * v0.4 3 valega mängu lõpp
        * v0.5 Nime küsimine ja skoori salvestamine serverisse.
        * v0.6 Aeg kiiremaks
        * 
        * v1.0.1 Heli lisamine (ütleb asendi)
        * ...)
    * andmete liikumise skeem loetava pildina (mis lehed ja mis andmeid mis lehel käideldakse);

2. **Veebirakenduse nõuded:**
    * rakendus töötab nii palju kui saab ka võrguta olekus, st kasutab `ServiceWorker`it;
    * andmeid talletatakse lisaks kohalikule (nt localStorage) ka serveripool (soovitatavalt andmebaasi või faili) – AJAX + serveripoolel nt PHP, Java, Node;
    * Mugavalt kasutatav ka mobiilselt seadmelt;
    * muutujad/tabelid on inglise keeles;
    * rakendus on piisava funktsionaalsusega ja turvaline – eelnev kokkulepe õppejõuga, mis saab valmis;
    * kood on jaotatud vajadusel eri failidesse ja kood on kokkupakitud kujul (ingl _minified_);

3. **Funktsionaalsus**
    * juhul kui algoritmiline keerukus on piisav siis kõiki nõudeid ei ole vaja täita – ainult eelneval kokkuleppel õppjõuga!

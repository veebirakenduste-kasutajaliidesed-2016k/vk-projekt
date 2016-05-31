# My Little SoundCloud App project
  * Kristian Talviste

## Eesmärgid
Rakendus võiks olla otsetee SoundCloudi, kus saab otsida lugusi märksõnade kaudu ja seejärel neid esitada ilma mujale navigeerimata.

###Funktsionaalsuse loetelu priorieedi järjekorras
  * Sisselogimine SoundCloudi kaudu
  * Muusika mängimine
  * Korralik disain
  * Kasutaja andmete kuvamine
  * SoundCloudist lugude otsimine
  * Otsitud lugude esitamine embed playeris

### Andmete liikumise skeem

  * Login with SoundCloud
    |   Authentication
    |   Fetch user data
  * Navigation
    *   Home-view
    *   Listen-view
      |   Embed player
      |   Search
        |   Results from SoundCloud
    *   Account-view
      |   User data from SoundCloud

### Nõuded

2. **Veebirakenduse nõuded:**
    * rakendus töötab nii palju kui saab ka võrguta olekus, st kasutab `appcache`i;
    * andmeid talletatakse lisaks kohalikule (localStorage) ka serveripool (soovitatavalt andmebaas või fail) – AJAX;
    * Kasutatav ka mobiilselt seadmelt;
    * muutujad/tabelid on inglise keeles;
    * rakendus on piisava funktsionaalsusega ja turvaline – eelnev kokkulepe õppejõuga, mis saab valmis;
    * kood on jaotatud vajadusel eri failidesse ja kood on kokkupakitud kujul;

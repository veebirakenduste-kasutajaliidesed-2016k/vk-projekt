
##ONLINEPAD

#AUTOR
##JANEK KOSSINSKI

##EESMÄRK:                        
---------------------------------
 Rakendus laseb kasutajatel luua 
 märkmeid, mida leht salvestab   
 serverisse ning mida kasutaja   
 võib ma vaatamise järgi muuta  
 või kustutada. fflines saab ka 
 lisada märkmeid, mida prgramm  
 neti taastumisel serverisse     
 üles laeb.                      

##FUNKTSIONAALSUSED:              
---------------------------------
 -lisada märkmeid                
 -kustutada märkmeid             
 -muuta lemaslevaid märkmeid   
 -fflines lisada märkmeid       
 -dünaamiline kujundus           

##ANDMETE LIIKUMINE:              
---------------------------------
 app.html(kasutaja sisend)       
 |                               
 |                               
 app.js(prgrammi ajud)          
 |    (PWERED BY AJAX)          
 |                               
 |\_(m laadimisel)_getFiles.php  
 |   (laeb märkmeid serverist)   
 |                               
 |\_(m lisamisel)_saveFile.php   
 |  (lisab märkmeid serverisse)  
 |                               
  \_(m kustutamisel)_delFile.php 
   (kustutab märkmeid serverist) 

###################################
#############ONLINEPAD#############
###################################
###############AUTOR###############
##########JANEK#KOSSINSKI##########
###################################
# EESMÄRK:                        #
#---------------------------------#
# Rakendus laseb kasutajatel luua #
# märkmeid, mida leht salvestab   #
# serverisse ning mida kasutaja   #
# võib oma vaatamise järgi muuta  #
# või kustutada. Offlines saab ka #
# lisada märkmeid, mida programm  #
# neti taastumisel serverisse     #
# üles laeb.                      #
###################################
# FUNKTSIONAALSUSED:              #
#---------------------------------#
# -lisada märkmeid                #
# -kustutada märkmeid             #
# -muuta olemasolevaid märkmeid   #
# -offlines lisada märkmeid       #
# -dünaamiline kujundus           #
###################################
# ANDMETE LIIKUMINE:              #
#---------------------------------#
# app.html(kasutaja sisend)       #
# |                               #
# |                               #
# app.js(programmi ajud)          #
# |    (POWERED BY AJAX)          #
# |                               #
# |\_(m laadimisel)_getFiles.php  #
# |   (laeb märkmeid serverist)   #
# |                               #
# |\_(m lisamisel)_saveFile.php   #
# |  (lisab märkmeid serverisse)  #
# |                               #
#  \_(m kustutamisel)_delFile.php #
#   (kustutab märkmeid serverist) #
###################################
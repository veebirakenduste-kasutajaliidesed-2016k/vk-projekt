# CyberBall (working title)

##Liikmed
  * Martin Viidik;
  * https://github.com/MartinViidik

##Augmented Gesture
  * http://jeromeetienne.github.io/augmentedgesture.js/

##Eesmärk
  * Teha väike mäng kasutades webcam trackingut, kus mängija peab käega kinni püüdma talle lendavaid palle;
  * Mäng läheb üha rohkem raskemaks mida suurem skoor;
  * Mängija kaotab mängu pärast 3 korda pihta saamist

##Funktsionaalsused
  * v0.1 pallid lendavad vastu mängijat;
  * v0.2 implementeerida webcami tracking;
  * v0.3 punktide süsteem;
  * v0.4 elude süsteem;
  * v0.5 graafika loomine;
  * v1.0 menüüde ja muude loomine (highscore ?);

##Augmented gesture tööle saamine
  * Veebikaamera funktsionaalsuse kättesaamiseks kasutab augmentedgesture.js faili. Selleks, et tööle saada pidi ka lisama scripti jupi game.htmli
  * Koodinäited
  var aGesture	= new AugmentedGesture().enableDatGui().start();
  * Paneb augmentedgesture tööle + kuvab GUI sätete seadistamiseks

  var pointerId	= "Green ball";
  var pointerOpts	= new AugmentedGesture.OptionPointer();
  pointerOpts.pointer.crossColor	= {r:    0, g: 255, b:   0};
  pointerOpts.colorFilter.r	= {min:   0, max: 60};
  pointerOpts.colorFilter.g	= {min: 0, max: 255};
  pointerOpts.colorFilter.b	= {min: 45, max: 255};
  aGesture.addPointer(pointerId, pointerOpts);
  * Siin hardcoded tracking sinise värvi üle, muidu hakkaks trackima muid asju nagu kasutaja nägu jne

  c.fillStyle = 'blue';
  c.arc(x, y, 10, 0, Math.PI*2, true);
  c.closePath();
  c.fill();
  * Joonistab sihtmärgi kasutajale, ehk joonistab canvasele sinise ringi
  * Tegelt htmli sissepandud kood on üsna kerge, oli selle tööle saamisega üsna tülikas ilma varase kogemuseta. 

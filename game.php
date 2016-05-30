<?php
  //laeme funktsiooni failis
	require_once("functions.php");

	//kontrollin, kas kasutaja on sisseloginud
	if(!isset($_SESSION["id_from_db"])){
		// kui on,suunan data lehele
		header("Location: login.php");
		exit();
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Test</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="game.css">
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="game.js"></script>
  <script src="bootbox.min.js"></script>

</head>
<body>
<div class="page-header">
  <li class="menu-item"><a href="logout.php" class="menu-link">Logi välja</a></li>
  <input type="button" value="Testimiseks" id="matswood" type="button" class="btn btn-success"></input>
</div>
<div id="data">
	<div class="data">
		<h1>Andmed</h1>
			<ul>
				<li><p id="wood"></p></li>
				<li><p id="materials"></p></li>
				<li><p id="roomForWood"></p></li>
				<li><p id="axe"></p></li>
				<li><p id="roomHeat"></p></li>
				<li id="rocks" style="display: none;"><p id="rocks"></p></li>
				<li id="iron" style="display: none;"><p id="iron"></p></li>
				<li><p id="health"></p></li>
			<ul>
	</div>
<div class="container-fluid">
  <div class="container">
  
  <ul class="nav nav-tabs">
    <li class="active"><a data-toggle="tab" href="#home" onclick="clearEventAlert()";>Kodu</a></li>
    <li><a data-toggle="tab" href="#menu1" onclick="clearEventAlert()";>Kuur</a></li>
    <li><a id="tab2" data-toggle="tab" href="#menu2" style="display: none;" onclick="clearEventAlert()">Töökoda</a></li>
    <li><a id="tab3" data-toggle="tab" href="#menu3" style="display: none;" onclick="clearEventAlert()">Laut</a></li>
	<li><a id="tab4" data-toggle="tab" href="#menu4" style="display: none;" onclick="clearEventAlert()">Kaevandus</a></li>
	<br><br><br><img src="img/stage1.png" id ="yourHome" alt="My home">
  </ul>
  <div class="tab-content">
    <div id="home" class="tab-pane fade in active">
      <h3>Kodu</h3>
		<button id="heat" type="button" class="btn btn-success">Küta kaminat</button>
		<button id="ahi" type="button" class="btn btn-success" disabled>Tee süüa</button>
    </div>
    <div id="menu1" class="tab-pane fade">
      <h3 id="gSize"></h3>
	  <button id="puu" type="button" class="btn btn-success">Lõhu puid</button>
	  <input type="button" value="Valmista materjali (3 puitu)"id="craftMaterial" type="button" class="btn btn-success"></input>
	  <input type="button" value="Suurenda kuuri (10 materjali)" id="buildGarageButton" type="button" class="btn btn-success" disabled></input>
	  <input type="button" value="Ehita töökoda (10 puitu)" id="buildWorkShop" type="button" style="display: none;" class="btn btn-success" disabled></input>
	  <input type="button" value="Ehita laut" id="buildBarnButton" type="button" style="display: none;" class="btn btn-success" disabled></input>
    </div>
    <div id="menu2" class="tab-pane fade">
      <h3>Töökoda</h3>
      <p>Siin asub sinu töökoda.</p>
	  <input type="button" value="Täiusta kirvest"id="upgradeAxe" type="button" class="btn btn-success"></input>
    </div>
    <div id="menu3" class="tab-pane fade">
      <h3>Laut</h3>
      <p>Siin asub sinu laut.</p>
    </div>
	<div id="menu4" class="tab-pane fade">
      <h3>Kaevandus</h3>
      <p>Pime kaevandus</p>
	  <button id="gatherRock" type="button" class="btn btn-success">Korja kive</button>
	  <button id="searchIron" type="button" class="btn btn-success">Otsi rauda</button>
    </div>
	<div id="alert">
		<p name="alert" id="alert"></p>
	</div>
  </div>
</div>
</div>

</body>
</html>
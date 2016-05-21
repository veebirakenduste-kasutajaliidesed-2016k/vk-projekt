<?php
	require_once("functions.php");
	if(!isset($_SESSION["id_from_db"])){
		header("Location: login.php");
		exit();
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
  <meta charset="UTF-8">
  <title>Runner</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.3/jquery.min.js"></script>
  <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDTGe4CiXTWPyJl9M9Vwl6v3strdz3JsII&libraries=geometry"></script>
  <script src="app.js"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav class="menu col-md-3 col-md-offset-5">
    <ul class="menu-list">
      <li class="menu-item"><a href="#exercise-view" class="menu-link exercise-view active-menu">Exercise</a></li>
      <li class="menu-item"><a href="#history-view" class="menu-link history-view">History</a></li>
      <li class="menu-item"><a href="logout.php" class="menu-link">Logout</a></li>
    </ul>
  </nav>
  <main role="main" class="col-md-3 col-md-offset-5">
    <div id="history-view">
	    <h1>History</h1>
			<center>
		  	<table id="history_table"></table>
			</center>
    </div>
    <div id="exercise-view">
			<h1>Exercise</h1>
			<center>
			  <select id="selectExercise" class="dropdown">
					<option value="">Choose a exercise</option>
			  </select>
      	<div id="time" class="timer"></div>
	  		<input type="image" class="RunButton" id="playButton" src="http://localhost:5555/~rimoesk/veebirakendus/vk-projekt/images/play.jpg" width="80" height="80"/>
	  		<input type="image" class="RunButton" id="pauseButton" src="http://localhost:5555/~rimoesk/veebirakendus/vk-projekt/images/pause.png" width="80" height="80"/>
	  		<input type="image" class="RunButton" id="stopButton" src="http://localhost:5555/~rimoesk/veebirakendus/vk-projekt/images/stop.png" width="80" height="80"/>
			</center>
    </div>
  </main>
</body>
</html>

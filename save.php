<?php
	require_once("functions.php");

	//kontrollin, kas kasutaja on sisseloginud
	if(!isset($_SESSION["id_from_db"])){
		// kui ei,suunan login lehele
		header("Location: login.php");
		exit();
	}
	
	//SAVE PATH
	if(isset($_GET["id"]) && isset($_GET["lat"]) && isset($_GET["lng"]) && !empty($_GET["lat"]) && !empty($_GET["lng"])){
		$User->addPath($_GET["id"], $_GET["lat"], $_GET["lng"]);
	}
	//SAVE HISTORY
	if(isset($_GET["HistoryId"]) && isset($_GET["time"]) && isset($_GET["date"]) && isset($_GET["distance"]) && isset($_GET["exercise"]) && !empty($_GET["time"]) && !empty($_GET["date"])){
		$User->addHistory($_GET["HistoryId"], $_SESSION["id_from_db"], $_GET["time"], $_GET["date"], $_GET["distance"], $_GET["exercise"]);
	}
	//GET EXERCISE
	if(isset($_GET["exercises"])){
		$exercises = $User->getExercises();
		echo (json_encode($exercises));
	}
	//GET PATH
	if(isset($_GET["ExId"])){
		$path_from_db = $User->getPath($_GET["ExId"]);
		echo $path_from_db;
	}
	//GET HISTORY
	if(isset($_GET["history"])){
		$history_from_db = $User->getHistory($_SESSION["id_from_db"]);
		echo $history_from_db;
	}
?>

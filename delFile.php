<?php
	$fname = $_POST["fname"];
	try{
		unlink("texts/".$fname.".txt");
	}catch(Exception $e){
		echo "No such file.";
	}
?>
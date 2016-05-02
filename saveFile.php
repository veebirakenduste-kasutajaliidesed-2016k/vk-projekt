<?php
	$fname = $_POST["fname"];
	$ftext = $_POST["ftext"];
	$file = fopen("texts/".$fname.".txt","w");
	fwrite($file, $ftext);
	fclose($file);
	var_dump($_POST);
?>
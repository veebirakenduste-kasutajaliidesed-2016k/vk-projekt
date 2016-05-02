<?php
	$fname = $_POST["fname"];
	$ftext = $_POST["ftext"];
	$origfname = $_POST["origfname"];
	try{
		unlink("texts/".$origfname.".txt");
	}catch(Exception $e){
		echo "No such file.";
	}
	$file = fopen("texts/".$fname.".txt","w");
	fwrite($file, $ftext);
	fclose($file);
	var_dump($_POST);
?>
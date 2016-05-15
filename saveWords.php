<?php
	$file_title = "words.txt";
	$entries_from_file = file_get_contents($file_title);
	$entries = json_decode($entries_from_file);
	if(isSet($_GET["estonian_word"]) && isSet($_GET["english_word"])){
		if(!empty($_GET["estonian_word"]) && !empty($_GET["english_word"])){
			$object = new StdClass();
			$object->estonian_word = $_GET["estonian_word"];
			$object->english_word = $_GET["english_word"];
			array_push($entries, $object);
			$json_string = json_encode($entries);
			file_put_contents($file_title, $json_string);
		}
	}
	echo(json_encode($entries));
?>

<?php
	$folder = "texts";
	$files = scandir($folder);
	$n = count($files);
	$values = [];
	for($i=2;$i<$n;$i++){
		if($files[$i] != "index.html"){			
			$values_temp = new StdClass();
			$values_temp->fname = $files[$i];
			$values_temp->ftext = file_get_contents("texts/".$files[$i]);
			array_push($values, $values_temp);
		}
	}
	echo json_encode($values);	
?>
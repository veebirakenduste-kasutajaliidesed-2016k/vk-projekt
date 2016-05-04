<?php
	require_once("simple_html_dom.php");
# http://php.net/manual/en/function.file-get-contents.php

  $words = ['naljakas'];

  results($words[0]);

function results ($search){
	//$title, $description, $image, $url
	$contents = file_get_contents('http://www.eki.ee/dict/sys/index.cgi?Q='.$search.'&F=M&C06=et');
	//var_dump($contents);

	$html = str_get_html($contents);

	//http://simplehtmldom.sourceforge.net/manual.htm

  $syns = array();

	foreach($html->find('.tervikart span[class=x_m m]') as $element){


			$syn =$element->innertext;
      array_push($syns, $syn);

      //obje

	}
  //json_decode[]
  var_dump($syns);



}


	$file_name = "cache.txt";

	$requestMethod = "GET";

/*
	//faili sisu tagasi objektiks
	$file_data = json_decode(file_get_contents($file_name));

	//võrdlen aega
	$delay = 10; //10 sekundit

	//kas on möödunud vähem kui delayga määrasime
	if(strtotime(date("c")) - (strtotime($file_data->date)) < $delay ){

		//on liiga vähe möödas
		echo json_encode($file_data);

		return;

	}
*/

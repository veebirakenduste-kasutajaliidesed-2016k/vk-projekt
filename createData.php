<?php
	require_once("simple_html_dom.php");
# http://php.net/manual/en/function.file-get-contents.php

  $words = ['paks'];

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
			echo $syn;
			echo " ";
	}
  //json_decode[]
  //var_dump($syns);




}


	$file_name = "cache.txt";

	$requestMethod = "GET";

<?php
	require_once("simple_html_dom.php");
# http://php.net/manual/en/function.file-get-contents.php
function results ($search){
	//$title, $description, $image, $url
	$contents = file_get_contents('http://www.okidoki.ee/buy/all/?query='.$search);
	//var_dump($contents);

	$html = str_get_html($contents);

	//http://simplehtmldom.sourceforge.net/manual.htm

	foreach($html->find('li[class=classified]') as $element){
      echo "http://www.okidoki.ee".$element->find('h3 a')[0]->href. '<br>';

			echo "http://www.okidoki.ee".$element->find('h3 a')[0]->href. '<br>';


	}



}

$search = $_GET["search"];
results($search);


	$file_name = "cache.txt";

	$url = "www.okidoki.ee";
	$getResults = "?q=%23&result_type=recent";
	$requestMethod = "GET";


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

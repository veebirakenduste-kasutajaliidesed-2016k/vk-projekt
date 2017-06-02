<?php
	require_once("simple_html_dom.php");
# http://php.net/manual/en/function.file-get-contents.php
	function results ($search){
	//$title, $description, $image, $url
	$contents = file_get_contents('http://www.okidoki.ee/buy/all/?query='.$search);
	//var_dump($contents);


	$file_name = "cache.txt";

	$html = str_get_html($contents);

	//http://simplehtmldom.sourceforge.net/manual.htm


	//okidoki
	foreach($html->find('li[class=classified]') as $element){

			$href = "http://www.okidoki.ee".$element->find('h3 a')[0]->href;
			//echo $href.'<br>';

			$title =$element->find('h3 a')[0]->innertext. '<br>';
			//echo $title;

			$page_contents = str_get_html(file_get_contents($href));
			$desc = $page_contents->find('div[id=description-content]')[0];
			//echo $desc;

			$image = $page_contents->find('a img')[0];
			//echo $image.'<br>';

			$searches = array();

			$object = new stdClass();

			$object->href=$href;
			$object->title=$title;
			$object->desc=$desc;
			$object->image=$image;

			





	}

	file_put_contents($file_name, json_encode($object));

	echo json_encode($object);


}
	$search = $_GET["search"];
	results($search);
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
?>

<?php
	require_once("simple_html_dom.php");
# http://php.net/manual/en/function.file-get-contents.php
	function results ($search1){
	//$title, $description, $image, $url
	$contents1 = file_get_contents('http://www.okidoki.ee/buy/all/?fsort=2&query='.$search1);
	//var_dump($contents);


	$file_name1 = "cache.txt";

	$html1 = str_get_html($contents1);


$searches = array();

	//okidoki
	foreach($html->find('div[class=item-list]') as $element1){

			$href1 = "http://soov-ee.postimees.ee/keyword-".$element1."/listings.html"->find('div a')[0]->href;
			//echo $href.'<br>';

			$title1 =$element1->find('div a')[0]->innertext. '<br>';
			//echo $title;

			$page_contents1 = str_get_html(file_get_contents($href1));
			$desc1 = $page_contents1->find('div[id=description-content]')[0]->innertext;
			//echo $desc;

			$image1 = $page_contents1->find('a img')[0]->src;
			//echo $image.'<br>';



			$object = new stdClass();

			$object->href=$href;
			$object->title=$title;
			$object->desc=$desc;
			$object->image=$image;

			array_push($searches, $object);

			//break;

	}

	//file_put_contents($file_name, json_encode($searches));
	//var_dump($searches);
	echo json_encode($searches);


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

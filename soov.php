<?php
	require_once("simple_html_dom.php");
# http://php.net/manual/en/function.file-get-contents.php
	function results ($search){
	//$title, $description, $image, $url
	$contents = file_get_contents('http://soov-ee.postimees.ee/keyword-'.$search.'/listings.html');
	//var_dump($contents);


	$file_name = "cache.txt";

	$html = str_get_html($contents);

  //var_dump($html);

  $searches = array();


	foreach($html->find('div[class=item-list]') as $element){

			$href = trim($element->find('h5[class=add-title] a')[0]->href, " ");
			//echo $href.'<br>';

			$title = $element->find('h5[class=add-title] a')[0]->innertext. '<br>';
			//echo $title;

		  $page_contents = str_get_html(file_get_contents($href));

      $desc = $page_contents->find('p[itemprop=description]')[0]->innertext;
			//echo $desc.'<br>';

      $page_image = $page_contents->find('li img[itemprop=image]');

			if(count($page_image) > 0 ){
				$image = $page_image[0]->src;
			}else{
				$image ="pilt puudub";
			}
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
	//$searches = preg_replace('/\s+/', '', $searches);
	$searches = json_encode($searches);
	$searches = preg_replace('[^\\S ]', '', $searches);
	echo $searches;


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

<?php
	require_once("simple_html_dom.php");
# http://php.net/manual/en/function.file-get-contents.php

  $words = ['paks', 'rõõmus','nuga','armas','kallis','päike','sale','muruniiduk','hekk','käärid','kahvel','lusikas','televiisor','arvuti','hiir','karu','hunt','rebane','lamp','õlg','käsi','klaviatuur','nupp','pilt','maal','roomaja','kiri','male','tool','laud','tahvel','marker','vesi','hapnik','sool','meri','ookena','vaal','uks','kilpkonn','aken','kott','selg','juhe','lift','valgus','generaator','elekter','gravitatsioon', 'tume', 'särav', 'turske', 'jäme', 'kandiline', 'ümar', 'suursugune', 'massiivne', 'ebaviisakas', 'kole', 'tõmmu', 'kahepaikne', 'silmakirjalik', 'mustanahaline', 'mongol', 'automaatne', 'kiire', 'aeglane', 'karvane', 'hele', 'kiilakas', 'paindlik', 'ümar', 'ilus', 'suursugune', 'suurepärane','auto','postkast','prügikast','lammas','internet','hing','start','väljapääs','viirus','haige','kell','sügis','jooksmine','ühendus','nupp','kodu','rull', 'tark', 'loll', 'üksik', 'eraldiseisev', 'traagiline', 'libe', 'kummaline', 'pahatahtlik', 'kitsas', 'lai', 'tahke', 'vedel', 'gaasiline', 'täielik', 'laud', 'kuri', 'nunnu', 'armas', 'libekeelne', 'sujuv', 'rumal', 'tark'];

	$newArray = array();

	foreach (  $words as $key => $word) {
		$syns = results($word);

		//echo count(	$syns);

		if(count(	$syns) > 2){



			$o = new stdClass();
			$o->word = $word;
			$o->syns = $syns;

			array_push($newArray, $o);
		}


	}
	//echo count($newArray);
	echo json_encode($newArray);


function results ($search){
	//$title, $description, $image, $url
	$contents = file_get_contents('http://www.eki.ee/dict/sys/index.cgi?Q='.$search.'&F=M&C06=et');
	//var_dump($contents);

	$html = str_get_html( mb_convert_encoding($contents, 'HTML-ENTITIES', 'UTF-8'));

	//http://simplehtmldom.sourceforge.net/manual.htm

  $syns = array();

	foreach($html->find('.tervikart span[class=x_m m]') as $element){


			$syn =$element->innertext;
      array_push($syns, $syn);

      //obje
			//echo $syn;
			//echo " ";
	}

	return $syns;
  //var_dump($syns);




}


	//$file_name = "cache.txt";

	//$requestMethod = "GET";

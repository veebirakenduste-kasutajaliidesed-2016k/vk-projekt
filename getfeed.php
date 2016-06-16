<?php

  require_once("TwitterAPIExchange.php");
  require_once("config.php");

  $file_name = "cache.txt";

  $url = "https://api.twitter.com/1.1/search/tweets.json";
  $getField = "?q=%23Paris&result_type=recent";
  $requestMethod = "GET";

  //faili sisu tagasi objektiks
  $file_data = json_decode(file_get_contents($file_name));

  //võrdlen aega
  $delay = 10; //10 sekundit

  if(strtotime(date("c")) - (strtotime($file_data->date)) < $delay){
    //on liiga vähe möödate_sub
    echo json_encode($file_data);
    return;
  }


  $twitter = new TwitterAPIExchange($config);

  $dataFromAPI = $twitter->setGetField($getField)
                         ->buildOauth($url, $requestMethod)
                         ->performRequest();

  //var_dump(json_decode($dataFromAPI)->statuses);
  $object = new StdClass();
  //millal tegime päringu
  $object->date = date("c");
  //saadud tweedid
  $object->statuses = json_decode($dataFromAPI)->statuses;


  //lisan vanad mis jäänud teksti faili siia juurde
  foreach($file_data->statuses as $old_status){

    $exists = false;

    foreach ($object->statuses as $new_status) {
      //kas on olemas
      //var_dump($new_status);
      if($old_status->id == $new_status->id){
        $exists = true;
      }

    }
    if($exists == false){
      array_push($object->statuses, $old_status);
    }

  }

  //echo count($object->statuses);

  file_put_contents($file_name, json_encode($object));

  echo json_encode($object)

?>

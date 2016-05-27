<?php

  $file_name= "data.txt";

  $entries_from_file = file_get_contents($file_name);

  //massiiv olemasolevate purkidega
  $entries = json_decode($entries_from_file);


  if(isset($_GET["id"]) && isset($_GET["coords"]) &&
   !empty($_GET["id"]) && !empty($_GET["coords"])){
/*
	  //salvestan juurde
	  $object = new StdClass();
	  $object->id = $_GET["id"];
	  $object->username = $_GET["username"];

    $object->coords = new StdClass();
    $object->coords->lat = $_GET["lat"];
    $object->coords->lng = $_GET["lng"];
    $object->coords = json_decode($_GET["coords"]);

*/

    $counter = 0;
    $object = $_GET["id"];

    foreach ($entries as $i){
      $obj = $i->id;
      echo $counter+". ";
      echo $obj;
      echo "<br>";
      if($obj == $object){
        echo "///////////////LISA <br>";
        echo json_decode($_GET["coords"]);
        echo "<br>";
        $object->coords = json_encode($_GET["coords"]);
        break;
      }
      $counter ++;
    }

	  //teen stringiks
	  $json = json_encode($entries);
	  //salvestan
	  file_put_contents($file_name, $json);
  }
  echo "<br>";
  echo "<br>";
  //var_dump($entries);
	echo(json_encode($entries));
?>

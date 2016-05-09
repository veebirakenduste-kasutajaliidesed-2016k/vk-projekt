<?php
  $file_name = "data.txt";
  $entries_from_file = file_get_contents("$file_name");
  $entries = json_decode($entries_from_file);
  if(isset($_GET["fuelQuantity"])&&isset($_GET["fuelCost"])&& isset($_GET["trip"])){
    if(!empty($_GET["fuelQuantity"])&&!empty($_GET["fuelCost"])&& !empty($_GET["trip"])){
      //salvestan faili �le;
	  $object = new stdClass();
	  $object->fuelQuantity = $_GET["fuelQuantity"];
	  $object->fuelCost = $_GET["fuelCost"];
	  $object->trip = $_GET["trip"];
	  array_push($entries, $object);
      file_put_contents($file_name,  json_encode($entries));
    }
  }
  //trykin v�lja stringi kujul massiivi
  echo(json_encode($entries));
?>

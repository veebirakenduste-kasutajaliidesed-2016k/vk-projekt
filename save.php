<?php

  $file_name= "data.txt";

  $entries_from_file = file_get_contents($file_name);

  //massiiv olemasolevate purkidega
  $entries = json_decode($entries_from_file);


  if(isset($_GET["id"]) && isset($_GET["title"]) && isset($_GET["color"])&& isset($_GET["seats"])&& isset($_GET["address"]) && !empty($_GET["id"]) && !empty($_GET["title"]) && !empty($_GET["color"]) && !empty($_GET["seats"])&& !empty($_GET["address"])){

	  //salvestan juurde
	  $object = new StdClass();
	  $object->id = $_GET["id"];
	  $object->title = $_GET["title"];
	  $object->color = $_GET["color"];
	  $object->seats = $_GET["seats"];
	  $object->address = $_GET["address"];


	  //lisan massiiivi juurde
	  array_push($entries, $object);

	  //teen stringiks
	  $json = json_encode($entries);

	  //salvestan
	  file_put_contents($file_name, $json);

  }
   if(isset($_GET["delete"]) && !empty($_GET["delete"])){


    for($i=0; $i<sizeof($entries); $i++){
      if($_GET["delete"] == $entries[$i]->id){
        unset($entries[$i]);
        file_put_contents($file_name, json_encode($entries));
      }
    }
  }



  //var_dump($entries);
	echo(json_encode($entries));



?>

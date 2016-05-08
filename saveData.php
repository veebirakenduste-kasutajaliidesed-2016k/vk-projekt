<?php
  $file_name = "data.txt";

  $entries_from_file = file_get_contents("$file_name");

  $entries = json_decode($entries_from_file);

  if(isset($_GET["score"]) && isset($_GET["level"])){
    if(!empty($_GET["score"]) && !empty($_GET["level"])){
      $object = new stdClass();
      $object->score = $_GET["score"];
      $object->level = $_GET["level"];
      //lisan objekti massiivi;
      array_push($entries, $object);

      //salvestan faili üle;
      file_put_contents($file_name, json_encode($entries));
    }
  }
  //trykin välja stringi kujul massiivi
  echo(json_encode($entries));


?>

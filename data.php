<?php
  $file_name = "data.txt";

  $entries_from_file = file_get_contents($file_name);

  $entries = json_decode($entries_from_file);

  if(isset($_GET["title"]) && isset($_GET["messages"])){

    if(!empty($_GET["title"]) && !empty($_GET["messages"])){

      $object = new StdClass();
      $object->title = $_GET["title"];
      $object->messages = $_GET["messages"];

      array_push($entries, $object);

      $json_string = json_encode($entries);

      file_put_contents($file_name, $json_string);
    }
  }
  echo(json_encode($entries));
?>

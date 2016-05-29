<?php
  $file_name = "messages.txt";

  $entries_from_file = file_get_contents($file_name);

  $entries = json_decode($entries_from_file);

  if(isset($_GET["team"]) && isset($_GET["messages"])){

    if(!empty($_GET["team"]) && !empty($_GET["messages"])){

      $object = new StdClass();
      $object->team = $_GET["team"];
      $object->messages = $_GET["messages"];

      array_push($entries, $object);

      $json_string = json_encode($entries);

      file_put_contents($file_name, $json_string);
    }
  }
  echo(json_encode($entries));
?>

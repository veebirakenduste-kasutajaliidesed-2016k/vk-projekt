<?php
  $file_user = "data.txt";
  $entries_from_file = file_get_contents($file_user);
  $entries = json_decode($entries_from_file);
  if(isset($_GET["user"]) && isset($_GET["correct"])&& isset($_GET["wrong"])){
    if(!empty($_GET["user"]) && !empty($_GET["correct"])&& !empty($_GET["wrong"])){
        $object = new StdClass();
        $object->user = $_GET["user"];
        $object->correct = $_GET["correct"];
        $object->wrong = $_GET["wrong"];
        array_push($entries, $object);
        $json_string = json_encode($entries);
        file_put_contents($file_user,$json_string);
    }
  }
  echo(json_encode($entries));
?>
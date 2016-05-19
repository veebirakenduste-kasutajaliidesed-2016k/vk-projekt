<?php
  require_once("functions.php");
  //echo $_SESSION["id_from_db"];
  $file_name = "data".$_SESSION["id_from_db"].".txt";
  fopen($file_name,"w");
  $entries_from_file = file_get_contents($file_name);
  //masiiv olemasolevate purkidega
  $entries = json_decode($entries_from_file);

  if(isset($_GET["path"]) && !empty($_GET["path"]) ){
    $object = new StdClass();
    $object->path = $_GET["path"];


    //lisan massiivi
    array_push($entries, $object);

    //teen stringiks
    $json = json_encode($entries);
    //salvestan faili
    file_put_contents($file_name, $json);
  }


  echo(json_encode($entries));

?>
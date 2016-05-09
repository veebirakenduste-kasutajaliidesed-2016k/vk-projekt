<?php
  $file_name = "data.txt";
  $entries_from_file = file_get_contents("$file_name");
  if(isset($_GET["color"])){
    if(!empty($_GET["color"])){
      //salvestan faili üle;
      file_put_contents($file_name, $_GET["color"]);
    }
  }
  //trykin välja stringi kujul massiivi
  echo(json_encode($entries_from_file));
?>
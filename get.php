<?php
#Miski läks gitis katki, uus katse
require_once("config.php");
$database = "vhost45490s3";

$mysqli = new mysqli($servername, $server_username, $server_password, $database);

function topTen($mysqli) {

  $stmt = $mysqli->prepare("SELECT name, score FROM brickmang ORDER BY score DESC LIMIT 10");
  $stmt->bind_result($name, $score);

  $stmt->execute();

  $array = array();

  while($stmt->fetch()) {
    $player = new StdClass();
    $player->name = $name;
    $player->score = $score;
    array_push($array, $player);
  }

  return($array);
  $stmt->close();
}

if(isset($_GET['topten'])) {
  topTen($mysqli);
}

?>

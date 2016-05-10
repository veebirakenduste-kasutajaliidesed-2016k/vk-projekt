<?php
#Miski läks gitis katki, uus katse
require_once("config.php");
$database = "if15_brickmang";

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

  echo(json_encode($array));
  $stmt->close();
}

if(isset($_GET['topten'])) {
  topTen($mysqli);
}
function myBest($name, $mysqli) {

  $stmt = $mysqli->prepare("SELECT score FROM brickmang WHERE name = ?");
  $stmt->bind_param("s", $name);
  $stmt->bind_result($score);

  $stmt->execute();

  $best = 0;

  while($stmt->fetch()) {
    if($score > $best) {
      $best = $score;
    }
  }

  echo($best);
  $stmt->close();
}

if(isset($_GET['mybest'])) {
  myBest($_GET['mybest'], $mysqli);
}
?>

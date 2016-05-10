<?php

require_once("config.php");
$database = "vhost45490s3";

$mysqli = new mysqli($servername, $server_username, $server_password, $database);

function addScore($name, $score, $mysqli) {

  $stmt = $mysqli->prepare("INSERT INTO brickmang (name, score, date) VALUES (?, ?, NOW())");
  $stmt->bind_param("si", $name, $score);

  if ($stmt->execute()) {

  }
  $stmt->close();
}

if(isset($_GET['name']) && isset($_GET['score'])) {
  addScore($_GET['name'], $_GET['score'], $mysqli);
}

?>

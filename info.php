<?php
$data = $_POST['data'];
file_put_contents('data.json', json_encode($data), FILE_APPEND | LOCK_EX);
exit();  //salvestame faili data.json, avaneb tekstifailina
 ?>

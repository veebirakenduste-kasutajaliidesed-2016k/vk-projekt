<?php
$data = $_POST['data']; //sama mis saveData funktsioonis

if(file_exists('data.json')){
  // $results on JSON kujul, $data on php massiivi
  $results = file_get_contents('data.json');
  // liidame vana ja uue info JSON kujule
  $jsonData = json_encode(array_merge(json_decode($results, true), $data));
  file_put_contents('data.json', $jsonData, LOCK_EX);
} else {
  file_put_contents('data.json', json_encode($data), LOCK_EX);
}
exit();
 ?>

<?php
$user = $_REQUEST['user'];
$pw = $_REQUEST['pw'];
$file = fopen('accounts/'.$user.'.json', "w+") or die("Unable to open file!");
fwrite($file, '[{"user":"'.$user.'","pw":"'.$pw.'"}]');
fclose($file);
//echo file_get_contents("accounts/".$user.".json");
?>
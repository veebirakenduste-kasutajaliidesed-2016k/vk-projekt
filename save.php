<?php
$user = $_REQUEST['user'];
$cps = $_REQUEST['cps'];
$file = fopen('accounts/'.$user.'.json','w');
fwrite($file, '[{"user":"'.$user.'","cps":"'.$cps.'"}]');
fclose($file);
echo file_get_contents("accounts/".$user.".json");

?>
<?php
$user = $_REQUEST['user'];
$cps = $_REQUEST['cps'];
$cash = $_REQUEST['cash'];
$codeQuality = $_REQUEST['codeQuality'];
$codeUpgradeAmount = $_REQUEST['codeUpgradeAmount'];
$codeUpgradeCPS = $_REQUEST['codeUpgradeCPS'];
$linesOfCode = $_REQUEST['linesOfCode'];
$totalLinesOfCodeClicked = $_REQUEST['totalLinesOfCodeClicked'];
$upKeep = $_REQUEST['upKeep'];
$file = fopen('accounts/'.$user.'.json', "w+") or die("Unable to open file!");
if(file_exists($handle)){
	fwrite($handle, '[{"user":"'.$user.'","cps":"'.$cps.'","cash":"'.$cash.'","codeQuality":"'.$codeQuality.'","codeUpgradeAmount":"'.$codeUpgradeAmount.'","codeUpgradeCPS":"'.$codeUpgradeCPS.'","linesOfCode":"'.$linesOfCode.'","totalLinesOfCodeClicked":"'.$totalLinesOfCodeClicked.'","upKeep":"'.$upKeep.'"}]');
	fclose($file);
	echo file_get_contents("accounts/".$user.".json");
}
?>
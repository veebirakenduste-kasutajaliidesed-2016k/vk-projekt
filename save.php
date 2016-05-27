<?php
$user = $_REQUEST['user'];
$cps = $_REQUEST['cps'];
$cash = $_REQUEST['cash'];
$codeQuality = $_REQUEST['codeQuality'];
$codeUpgradeAmount = $_REQUEST['codeUpgradeAmount'];
$codeUpgradeCPS = $_REQUEST['codeUpgradeCPS'];
$linesOfCode = $_REQUEST['linesOfCode'];
$totalLinesOfCodeClicked = $_REQUEST['totalLinesOfCodeClicked'];
$totalLinesOfCode = $_REQUEST['totalLinesOfCode'];
$upKeep = $_REQUEST['upKeep'];
$pw = $_REQUEST["pw"];
$file = fopen('accounts/'.$user.'.json', "w+") or die("Unable to open file!");
if(file_exists('accounts/'.$user.'.json')){
	fwrite($file, '[{"user":"'.$user.'","cps":"'.$cps.'","cash":"'.$cash.'","codeQuality":"'.$codeQuality.'","codeUpgradeAmount":"'.$codeUpgradeAmount.'","codeUpgradeCPS":"'.$codeUpgradeCPS.'","linesOfCode":"'.$linesOfCode.'","totalLinesOfCodeClicked":"'.$totalLinesOfCodeClicked.'","upKeep":"'.$upKeep.'","totalLinesOfCode":"'.$totalLinesOfCode.'","pw":"'.$pw.'"}]}]');
	fclose($file);
}
?>
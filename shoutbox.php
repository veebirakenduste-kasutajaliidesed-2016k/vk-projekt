<?php

define("HOST", "localhost");
define("USER", "if15");
define("PASSWORD", "ifikad15");
define("DB", "if15_jekavor");


function connect($db, $user, $password){
	$link = mysql_connect($db, $user, $password);
	if (!$link)
	    die("Could not connect: ".mysql_error());
	else{
		$db = mysql_select_db(DB);
		if(!$db)
			die("Could not select database: ".mysql_error());
		else return $link;
	}
}
function getContent($link, $num){
	$res = mysql_query("SELECT date, user, message FROM shoutbox ORDER BY date DESC LIMIT ".$num, $link);
	if(!$res)
		die("Error: ".mysql_error());
	else
		return $res;
}
function insertMessage($user, $message){
	//http://www.php.su/sprintf()
	//http://www.php.su/mysql_real_escape_string

	$query = sprintf("INSERT INTO shoutbox(user, message) VALUES('%s', '%s');", mysql_real_escape_string(strip_tags($user)), mysql_real_escape_string(strip_tags($message)));
	$res = mysql_query($query);
	if(!$res)
		die("Error: ".mysql_error());
	else
		return $res;
}


if(!$_POST['action']){

	header ("Location: index.html");
}
else{
	$link = connect(HOST, USER, PASSWORD);
	switch($_POST['action']){
		case "update":
			$res = getContent($link, 20);
			while($row = mysql_fetch_array($res)){
				$result .= "<p><strong>".$row['user']."</strong><img src=\"css/images/bullet.gif\" alt='-\' >".$row['message']." <span class=\"date\">".$row['date']."</span></p>";
			}
			echo $result;
			break;
		case "insert":
			echo insertMessage($_POST['nick'], $_POST['message']);
			break;
	}
	mysql_close($link);
}


?>

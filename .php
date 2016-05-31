

 function on_line() {
 $host = "localhost";
 $db_name = "";

 $db_user = "";
 $db_password = "";
 $wine = 300;


 $table_online = "online";

 global $REMOTE_ADDR;

 mysql_connect($host,$db_user,$db_password) or die(mysql_error());
 mysql_select_db($db_name) or die(mysql_error());


$sql_update = "DELETE FROM $table_online WHERE `unix`+$wine < ".time().
              " OR `ip` = '$REMOTE_ADDR'";
$result_update = mysql_query($sql_update) or die(mysql_error());


$sql_insert = "INSERT INTO $table_online VALUES ('','$REMOTE_ADDR','".time()."')";
$result_insert = mysql_query($sql_insert) or die(mysql_error());


$sql_sel = "SELECT `id` FROM $table_online";
$result_sel = mysql_query($sql_sel) or die(mysql_error());

$online_people = mysql_num_rows($result_sel);
$online_people = (string) $online_people;


$rain = strlen($online_people) - 1;


 if($online_people[$rain]==2||$online_people[$rain]==3
||$online_people[$rain]==4
||(strlen($online_people)!=1&&$online_people[strlen($online_people)-2]!=1))
// $line
 $line = "inimest"; else $line = "inimene";
// возвращаем результат
 return "online <strong>".$online_people."</strong>$line";
}

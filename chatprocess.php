<?php
//Stream Event
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
$name=strip_tags($_GET['name']);
$msg=strip_tags($_GET['msg']);
//Sonumite saatmiseks
function sendMsg($msg) {
  echo "data: $msg" . PHP_EOL;
  ob_flush();
  flush();
}
if(!empty($name) && !empty($msg)){
	$fp = fopen("chat.txt", 'a');  
    fwrite($fp, '<div class="chatmsg"><b>'.$name.'</b>: '.$msg.'<br/></div>'.PHP_EOL);  
    fclose($fp);  
}
  if(file_exists("chat.txt") && filesize("chat.txt") > 0){  
   $arrhtml=array_reverse(file("chat.txt"));
   $html=$arrhtml[0];
    
  }
  if(filesize("chat.txt") > 100){
    unlink("chat.txt");
  }
  
sendMsg($html);
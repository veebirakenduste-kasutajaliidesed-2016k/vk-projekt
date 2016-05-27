<?php
$user = $_REQUEST['user'];
unlink('accounts/'.$user.'.json');
?>
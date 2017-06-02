<?php
	$connection->prepare("UPDATE translations SET en=? WHERE id=?")->
		execute(array($_REQUEST["en"], $_REQUEST["id"]));
?>
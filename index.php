<?php
	$user="";
	$error="";
  if(isset($_COOKIE["user"])){
    header("Location: main.html");
  }
	if($_SERVER["REQUEST_METHOD"] == "POST"){
		if(isset($_POST["login"])){
			if ( empty($_POST["user"]) ) {
				$error = ("See väli on kohustuslik");
			}else{
				$user = ($_POST["user"]);
				setcookie("user", $user);
				header("Location:main.html");
			}
		}
	}

?>
<html manifest="mapGuesser.appcache">
  <head>
    <link rel="apple-touch-icon" sizes="57x57" href="materjalid/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="materjalid/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="materjalid/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="materjalid/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="materjalid/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="materjalid/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="materjalid/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="materjalid/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="materjalid/apple-touch-icon-180x180.png">
    <link rel="icon" type="image/png" href="materjalid/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="materjalid/android-chrome-192x192.png" sizes="192x192">
    <link rel="icon" type="image/png" href="materjalid/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="materjalid/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="materjalid/manifest.json">
    <link rel="mask-icon" href="materjalid/safari-pinned-tab.svg" color="#5bbad5">
    <link rel="shortcut icon" href="materjalid/favicon.ico">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="msapplication-TileImage" content="materjalid/mstile-144x144.png">
    <meta name="msapplication-config" content="materjalid/browserconfig.xml">
    <meta name="theme-color" content="#ffffff">
    <title>Map Guesser Login</title>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="mapStyle.css">
  </head>



  <body>
    <img src = "Solid.jpg" id="solidBackGround"/>
    <div id="login">
    <h1><?php echo $error; ?></h1>
    <h2>Log in</h2>
  	<form action="index.php" method="post" >
	  	<input name="user" type="text" placeholder="Name">
	  	<input type="submit" name="login" value="enter">
	</div>
  </body>
</html>

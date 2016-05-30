<?php
  //laeme funktsiooni failis
	require_once("functions.php");

	//kontrollin, kas kasutaja on sisseloginud
	if(isset($_SESSION["id_from_db"])){
		// kui on,suunan data lehele
		header("Location: game.php");
		exit();
	}
	//muutujad errorite jaoks
	$create_uname_error = $create_pw_error = $uname_error = $pw_error = "";
	//muutujad v��rtuste joks
	$create_uname = $create_pw = $pw = $uname = "";
	if($_SERVER["REQUEST_METHOD"] == "POST"){
		//Kasutaja loomine
		if(isset($_POST["create"])){
			//kasutajanimi
			if ( empty($_POST["create_uname"]) ) {
				$create_uname_error = "See v�li on kohustuslik";
			}else{
				$create_uname = cleanInput($_POST["create_uname"]);
			}
			//parool
			if ( empty($_POST["create_pw"]) ) {
				$create_pw_error = "See v�li on kohustuslik";
			} else {
				if(strlen($_POST["create_pw"]) < 8) {
					$create_pw_error = "Peab olema v�hemalt 8 t�hem�rki pikk!";
				}else{
					$create_pw = cleanInput($_POST["create_pw"]);
				}
			}
			//v�ib kasutaja teha
			if(	$create_uname_error == "" && $create_pw_error == ""){
				$password_hash = hash("sha512", $create_pw);
				//k�ivitame funktsiooni
				$create_response = $User->createUser($create_uname, $password_hash);
				header("Location:login.php");
				//l�petame php laadimise
				exit();
			}
		}
		//Sisse logimine
		if(isset($_POST["login"])){

			//kasutajanimi
			if(empty($_POST["uname"])){
				$uname_error = "See v�li on kohustuslik";
			}else{
				// puhastame muutuja v�imalikest �leliigsetest s�mbolitest
				$uname = cleanInput($_POST["uname"]);
			}
			//parool
			if(empty($_POST["pw"])){
				$pw_error = "See v�li on kohustuslik";
			}else{
				$pw = cleanInput($_POST["pw"]);
			}
			
			// Kui oleme siia j�udnud, v�ime kasutaja sisse logida
			if($pw_error == "" && $uname_error == ""){

				$password_hash = hash("sha512", $pw);
				// k�ivitan funktsiooni
				$login_response = $User->loginUser($uname, $password_hash);
				if(isset($login_response->success)){
					//l�ks edukalt, peab sessiooni salvestama
					$_SESSION["id_from_db"] = $login_response->success->user->id;
					header("Location:game.php");
					//l�petame php laadimise
					exit();
				}
			}
		}
	}
	// funktsioon, mis eemaldab k�ikv�imaliku �leliigse tekstist
	function cleanInput($data) {
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		return $data;
	}
?>
<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8">
<title>Registreerumine</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.3/jquery.min.js"></script>
<script src="login.js"></script>

</head>
<body>
<main role="main">
<div class="col-md-2 col-md-offset-5">
<div id="login-view">
<form method="post">
	<h1>Logi sisse</h1>
	
	<?php if(isset($login_response->error)):?>
	<p style="color:red;"><?=$login_response->error->message;?></p>
	<?php elseif(isset($login_response->success)):?>
	<p style="color:green;"><?=$login_response->success->message;?></p>
	<?php endif;?>
	
	<fieldset class="form-group">
		<label for="uname">Username</label><span class="error" style="color:red;"> <?php echo $uname_error?></span>
		<input type="text" class="form-control" name="uname" placeholder="Kasutajanimi" value="<?php if(isset($_POST["uname"])){echo $uname;}?>" />
	</fieldset>
	<fieldset class="form-group">
		<label for="pw">Password</label><span class="error" style="color:red;"> <?php echo $pw_error?></span>
		<input type="password" class="form-control" name="pw" placeholder="Parool"/>
	</fieldset>
	<input type="submit" class="btn btn-success" name="login"/>
	<br><br>
	<center><a href="#register-view">Loo uus kasutaja</a></center>
</form>
</div>

<div id="register-view">
<form method="post">
	<h1>Registreeru</h1>
	
	<?php if(isset($create_response->error)):?>
	<p style="color:red;"><?=$create_response->error->message;?></p>
	<?php elseif(isset($create_response->success)):?>
	<p style="color:green;"><?=$create_response->success->message;?></p>
	<?php endif;?>
	
	<fieldset class="form-group">
		<label for="create_uname">Username</label><span class="error" style="color:red;"> <?php echo $create_uname_error?></span>
		<input type="text" class="form-control" name="create_uname" placeholder="Kasutajanimi" value="<?php if(isset($_POST["create_uname"])){echo $create_uname;}?>" />
	</fieldset>
	<fieldset class="form-group">	
		<label for="create_pw">Password</label><span class="error" style="color:red;"> <?php echo $create_pw_error?></span>
		<input type="password" class="form-control" name="create_pw" placeholder="Parool" />
	</fieldset>
	<input type="submit" class="btn btn-success" name="create"/>
	<br><br>
	<center><a href="#login-view">Kasutaja juba olemas</a></center>
</form>
</div>
</div>
</main>
</body>
</html>

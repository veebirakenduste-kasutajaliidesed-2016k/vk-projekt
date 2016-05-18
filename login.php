<?php
  //laeme funktsiooni failis
	require_once("functions.php");

	//kontrollin, kas kasutaja on sisseloginud
	if(isset($_SESSION["id_from_db"])){
		// kui on,suunan data lehele
		header("Location: index.php");
		exit();
	}
	//muutujad errorite jaoks
	$create_uname_error = $create_pw_error = $create_sex_error = $uname_error = $pw_error = "";
	//muutujad väärtuste joks
	$create_uname = $create_pw = $create_sex = $pw = $uname = "";
	if($_SERVER["REQUEST_METHOD"] == "POST"){
		//Kasutaja loomine
		if(isset($_POST["create"])){
			//kasutajanimi
			if ( empty($_POST["create_uname"]) ) {
				$create_uname_error = "See väli on kohustuslik";
			}else{
				$create_uname = cleanInput($_POST["create_uname"]);
			}
			//parool
			if ( empty($_POST["create_pw"]) ) {
				$create_pw_error = "See väli on kohustuslik";
			} else {
				if(strlen($_POST["create_pw"]) < 8) {
					$create_pw_error = "Peab olema vähemalt 8 tähemärki pikk!";
				}else{
					$create_pw = cleanInput($_POST["create_pw"]);
				}
			}
			//sugu
			if(empty($_POST["create_sex"])){
				$create_sex_error = "See väli on kohustuslik";
			}else{
				$create_sex = $_POST["create_sex"];
			}

			//võib kasutaja teha
			if(	$create_uname_error == "" && $create_pw_error == "" && $create_sex_error == ""){
				$password_hash = hash("sha512", $create_pw);
				//käivitame funktsiooni
				$create_response = $User->createUser($create_uname, $password_hash, $create_sex);
				header("Location:login.php");
				//lõpetame php laadimise
				exit();
			}
		}
		//Sisse logimine
		if(isset($_POST["login"])){

			//kasutajanimi
			if(empty($_POST["uname"])){
				$uname_error = "See väli on kohustuslik";
			}else{
				// puhastame muutuja võimalikest üleliigsetest sümbolitest
				$uname = cleanInput($_POST["uname"]);
			}
			//parool
			if(empty($_POST["pw"])){
				$pw_error = "See väli on kohustuslik";
			}else{
				$pw = cleanInput($_POST["pw"]);
			}
			
			// Kui oleme siia jõudnud, võime kasutaja sisse logida
			if($pw_error == "" && $uname_error == ""){

				$password_hash = hash("sha512", $pw);
				// käivitan funktsiooni
				$login_response = $User->loginUser($uname, $password_hash);
				if(isset($login_response->success)){
					//läks edukalt, peab sessiooni salvestama
					$_SESSION["id_from_db"] = $login_response->success->user->id;
					header("Location:index.php");
					//lõpetame php laadimise
					exit();
				}
			}
		}
	}
	// funktsioon, mis eemaldab kõikvõimaliku üleliigse tekstist
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
</head>
<body>
<div class="col-md-2 col-md-offset-5">
<form method="post" id="login" <?php if(!isset($_GET["register"])){echo "style='display:block'";}else{echo "style='display:none'";}?>">
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
	<center><a href="?register">Loo uus kasutaja</a></center>
</form>


<form method="post" id="register" <?php if(isset($_GET["register"])){echo "style='display:block'";}else{echo "style='display:none'";}?>">
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
	<label id="create_sex">Sex</label><span class="error" style="color:red;"> <?php echo $create_sex_error?></span>
	<div class="radio">
		<label>
			<input type="radio" name="create_sex" value="M" <?php if($_POST["create_sex"] == "M"){checked;}?> /><span>Male</span>
		</label>
	</div>
	<div class="radio">
		<label>
			<input type="radio" name="create_sex" value="F" <?php if($_POST["create_sex"] == "F"){checked;}?> /><span>Female</span>
		</label>
	</div>
	<input type="submit" class="btn btn-success" name="create"/>
	<br><br>
	<center><a href="?">Kasutaja juba olemas</a></center>
</form>
</div>
</body>
</html>

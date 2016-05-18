<?php
class User{
	//privaatne muutuja
	private $connection;
	//käivitub kui tuleb new User();
	function __construct($mysqli){
		//selle klassi muutuja
		$this->connection = $mysqli;
	}
	function createUser($create_uname, $create_pw, $create_sex){
		//objekt et saata tagasi kas errori(id,message) või success(message)
		$response = new StdClass();
		
		$stmt = $this->connection->prepare("SELECT username FROM runner_user WHERE username = ?");
		$stmt->bind_param("s", $create_uname);
		$stmt->execute();
		if($stmt->fetch()){
			//saadan errori
			$error = new StdClass();
			$error->id = 0;
			$error->message = "Sellise kasutajanimega kasutaja on juba olemas";
			//error responsele külge
			$response->error = $error;
			//peale returni koodi ei vaadata enam funktsioonis
			return $response;
		}
		//elmine käsk kinni
		$stmt->close();
		
		$stmt = $this->connection->prepare("INSERT INTO runner_user (username, password, Sex) VALUES (?, ?, ?)");
		$stmt->bind_param("sss", $create_uname, $create_pw, $create_sex);
		if($stmt->execute()){
			//salvestas edukalt
			$success = new StdClass();
			$success->message = "Kasutaja loomine õnnestus";
			$response->success = $success;
		}else{
			//kui ei läinud edukalt saadan errori
			$error = new StdClass();
			$error->id = 2;
			$error->message = "Midagi läks katki :".$stmt->error;
			//error responsele külge
			$response->error = $error;
		}
		$stmt->close();
		return $response;
	}
	function loginUser($uname, $pw){
		$response = new StdClass();
		$stmt = $this->connection->prepare("SELECT id FROM runner_user WHERE username=?");
		$stmt->bind_param("s", $uname);
		$stmt->execute();
		if(!$stmt->fetch()){
			// saadan tagasi errori
			$error = new StdClass();
			$error->id = 2;
			$error->message = "Sellise kasutajanimega kasutajat ei ole";
			
			//panen errori responsile külge
			$response->error = $error;
			// pärast returni enam koodi edasi ei vaadata funktsioonis
			return $response;
		}
		$stmt->close();
		
		$stmt = $this->connection->prepare("SELECT id FROM runner_user WHERE username=? AND password=?");
		$stmt->bind_param("ss", $uname, $pw);
		$stmt->bind_result($id_from_db);
		$stmt->execute();
		if($stmt->fetch()){
			$success = new StdClass();
			$success->message = "Sisselogimine õnnestus";
			$user = new StdClass();
			$user->id = $id_from_db;
			$success->user = $user;
			$response->success = $success;
		}else{
			$error = new StdClass();
			$error->id = 3;
			$error->message = "Vale parool";
			$response->error = $error;
		}
		$stmt->close();
		return $response;
	}
}?>
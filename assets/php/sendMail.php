<?php	
	if (isset($_POST['firstname']) && !empty($_POST['firstname']) && 
	isset($_POST['lastname']) && !empty($_POST['lastname']) &&  
	isset($_POST['email']) && !empty($_POST['email']) &&
	isset($_POST['subject']) && !empty($_POST['subject']) &&
	isset($_POST['mesagge']) && !empty($_POST['mesagge'])) {
		// Fields declaration
		$to = "espinoza.dev@gmail.com";
		$from = $_POST['email'];
		$firstname = $_POST['firstname'];
		$lastname = $_POST['lastname'];
		$subject = $_POST['subject'];
		$message = $_POST['message'];
		// Mail Function
		$status;
		mail($to, $firstname, $lastname, $from, $subject, $message);
		public $status = true;
		header("Location: https://l3inadz.github.io/");

die();
	} else {		
		public $status = false;
		header("Location: https://l3inadz.github.io/");
	}
?>
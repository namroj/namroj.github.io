<?php

$firstname = $_POST['name'];
$lastname = $_POST['lastname'];
$email = $_POST['email'];
$message = $_POST['message'];
$to = "espinoza.dev@gmail.com";
$subject = "Contact / Espinoza-Dev";

mail ($to, $subject, $message, "From: " . $firstname . " " . $lastname);

echo "Your message has been sent";

?>

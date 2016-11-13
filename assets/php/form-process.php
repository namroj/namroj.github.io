<?php

        $firstname = $_POST['name'];
        $lastname = $_POST['lastname'];
        $email = $_POST['email'];
        $message = $_POST['message'];

        $from = $email;
        $to = 'espinoza.dev@gmail.com';
        $subject = 'Contact / Espinoza-Dev';

        $body = "From: $firstname\n E-Mail: $email\n Message:\n $message";

        mail ($to, $subject, $body, $from);    

?>

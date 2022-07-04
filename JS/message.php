<?php
$lastName = $_POST['lastName'];
$firstName = $_POST['firstName'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

if (!empty($email) && !empty($message)) {
    # code...
} else {
    echo "Email and password field is required"
}
?>
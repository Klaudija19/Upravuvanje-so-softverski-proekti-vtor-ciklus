<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "face_match_db"; 

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("DB error");
}
?>


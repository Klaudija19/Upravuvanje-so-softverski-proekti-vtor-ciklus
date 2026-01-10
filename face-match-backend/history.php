<?php
require "db.php";

$user_id = $_GET['user_id'];

$result = $conn->query(
  "SELECT level, time, attempts, score, created_at
   FROM games
   WHERE user_id=$user_id
   ORDER BY created_at DESC"
);

$games = [];

while ($row = $result->fetch_assoc()) {
  $games[] = $row;
}

echo json_encode($games);
?>

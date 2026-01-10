<?php
require "db.php";

$result = $conn->query(
  "SELECT users.username, games.score, games.level
   FROM games
   JOIN users ON games.user_id = users.id
   ORDER BY games.score DESC
   LIMIT 10"
);

$leaders = [];

while ($row = $result->fetch_assoc()) {
  $leaders[] = $row;
}

echo json_encode($leaders);
?>

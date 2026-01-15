<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

require "db.php";

$sql = "
SELECT u.username, MAX(g.score) AS best_score, COUNT(g.id) AS total_games
FROM games g
JOIN users u ON g.user_id = u.id
GROUP BY g.user_id, u.username
ORDER BY best_score DESC
LIMIT 10
";

$stmt = $pdo->query($sql);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($results);


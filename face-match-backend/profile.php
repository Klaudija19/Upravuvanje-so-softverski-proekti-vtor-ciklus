<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(["error" => "Missing user id"]);
    exit;
}

$sql = "
SELECT 
    COUNT(*) AS total_games,
    MAX(score) AS best_score,
    AVG(score) AS avg_score,
    MAX(created_at) AS last_played
FROM games
WHERE user_id = ?
";

$stmt = $pdo->prepare($sql);
$stmt->execute([$user_id]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($result);

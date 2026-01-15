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

$user_id = $_GET["user_id"] ?? null;

if (!$user_id) {
    echo json_encode([]);
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM games WHERE user_id = ? ORDER BY created_at DESC");
$stmt->execute([$user_id]);
$games = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($games);

<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

// ✅ ПРОВЕРКА: дали сите полиња постојат
if (
    !isset($data['user_id']) ||
    !isset($data['level']) ||
    !isset($data['time']) ||
    !isset($data['attempts']) ||
    !isset($data['score'])
) {
    echo json_encode([
        "error" => "Missing fields",
        "received" => $data
    ]);
    exit;
}

$user_id = (int)$data['user_id'];
$level = $data['level'];
$time = (int)$data['time'];
$attempts = (int)$data['attempts'];
$score = (int)$data['score'];

$stmt = $conn->prepare("
    INSERT INTO games (user_id, level, time, attempts, score)
    VALUES (?, ?, ?, ?, ?)
");

$stmt->bind_param("isiii", $user_id, $level, $time, $attempts, $score);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode([
        "error" => "Insert failed",
        "mysql_error" => $stmt->error
    ]);
}

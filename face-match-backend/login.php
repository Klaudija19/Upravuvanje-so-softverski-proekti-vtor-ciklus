<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$username = $data["username"] ?? "";
$password = $data["password"] ?? "";

$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();

$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
    if (password_verify($password, $user["password"])) {
        echo json_encode([
            "success" => true,
            "user" => [
                "id" => $user["id"],
                "username" => $user["username"]
            ]
        ]);
    } else {
        echo json_encode(["error" => "Wrong password"]);
    }
} else {
    echo json_encode(["error" => "User not found"]);
}

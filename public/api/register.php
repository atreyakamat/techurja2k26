<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// CONFIGURATION - Update with your BigRock DB details
$host = "localhost";
$db   = "techurja_db";
$user = "techurja_user";
$pass = "your_password";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input) {
        echo json_encode(["message" => "Invalid input"]);
        exit;
    }

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare("INSERT INTO Registration (name, email, phone, institution, eventSlug, eventName, createdAt) VALUES (?, ?, ?, ?, ?, ?, NOW())");
        
        $stmt->execute([
            $input['name'],
            $input['email'],
            $input['phone'],
            $input['institution'],
            $input['eventSlug'],
            $input['eventName'] ?? $input['eventSlug']
        ]);

        echo json_encode(["message" => "Registration successful. Welcome to the arena."]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["message" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["message" => "Only POST requests allowed"]);
}
?>

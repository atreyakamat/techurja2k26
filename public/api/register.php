<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// CONFIGURATION - Update with your BigRock DB details
$host = "119.18.54.49"; // Using the verified IP
$db   = "aitdgki7_techurja";
$user = "aitdgki7_techurja";
$pass = "AitdTech@2026";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input) {
        echo json_encode(["message" => "Invalid input"]);
        exit;
    }

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Updated SQL to match Prisma schema and Frontend data
        $stmt = $pdo->prepare("INSERT INTO Registration (name, teamName, email, phone, institution, eventSlug, eventName, transactionId, paymentScreenshot, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");
        
        $stmt->execute([
            $input['name'],
            $input['teamName'] ?? null,
            $input['email'],
            $input['phone'],
            $input['institution'],
            $input['eventSlug'],
            $input['eventName'] ?? $input['eventSlug'],
            $input['transactionId'] ?? null,
            $input['paymentScreenshot'] ?? null
        ]);

        echo json_encode([
            "status" => "success",
            "message" => "Registration successful. Welcome to the arena."
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "Database error: " . $e->getMessage()
        ]);
    }
} else {
    echo json_encode(["message" => "Only POST requests allowed"]);
}
?>

<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// CONFIGURATION - Update with your BigRock DB details
$host = "119.18.54.49"; 
$db   = "aitdgki7_techurja";
$user = "aitdgki7_techurja";
$pass = "AitdTech@2026";

// FTP CONFIGURATION
$ftp_host = "119.18.54.49"; // Usually same as DB host or ftp.domain.com
$ftp_user = "aitdgki7_techurja";
$ftp_pass = "AitdTech@2026";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input) {
        echo json_encode(["message" => "Invalid input"]);
        exit;
    }

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Prepare extended SQL to match Prisma schema v2.0
        $sql = "INSERT INTO registrations (
            name, email, phone, 
            participant2, email2, phone2, 
            participant3, email3, phone3, 
            participant4, email4, phone4, 
            teamName, institution, eventSlug, eventName, 
            transactionId, paymentScreenshot, needsAccommodation, createdAt
        ) VALUES (
            ?, ?, ?, 
            ?, ?, ?, 
            ?, ?, ?, 
            ?, ?, ?, 
            ?, ?, ?, ?, 
            ?, ?, ?, NOW()
        )";

        $stmt = $pdo->prepare($sql);
        
        $paymentScreenshot = "PENDING_FTP";
        $needsAccommodation = isset($input['needsAccommodation']) && $input['needsAccommodation'] ? 1 : 0;

        $stmt->execute([
            $input['name'], $input['email'], $input['phone'] ?? '',
            $input['participant2'] ?? '', $input['email2'] ?? '', $input['phone2'] ?? '',
            $input['participant3'] ?? '', $input['email3'] ?? '', $input['phone3'] ?? '',
            $input['participant4'] ?? '', $input['email4'] ?? '', $input['phone4'] ?? '',
            $input['teamName'] ?? '',
            $input['institution'],
            $input['eventSlug'],
            $input['eventName'] ?? $input['eventSlug'],
            $input['transactionId'] ?? '',
            $paymentScreenshot,
            $needsAccommodation
        ]);

        $registrationId = $pdo->lastInsertId();

        // FTP UPLOAD LOGIC
        $ftpStatus = "NO_SCREENSHOT";
        if (isset($input['paymentScreenshot']) && $input['paymentScreenshot'] !== 'NO_SCREENSHOT' && !empty($input['paymentScreenshot'])) {
            $conn_id = ftp_connect($ftp_host);
            $login_result = ftp_login($conn_id, $ftp_user, $ftp_pass);

            if ($conn_id && $login_result) {
                ftp_pasv($conn_id, true);

                $remote_dir = "registrations/" . $registrationId;
                @ftp_mkdir($conn_id, $remote_dir);

                // 1. Upload Screenshot
                $img_data = $input['paymentScreenshot'];
                if (strpos($img_data, ',') !== false) {
                    $img_data = explode(',', $img_data)[1];
                }
                $decoded_img = base64_decode($img_data);
                
                $temp_file = tempnam(sys_get_temp_dir(), 'reg');
                file_put_contents($temp_file, $decoded_img);
                
                $screenshot_name = $input['screenshotName'] ?? "screenshot_" . time() . ".jpg";
                $remote_file = $remote_dir . "/" . $screenshot_name;

                if (ftp_put($conn_id, $remote_file, $temp_file, FTP_BINARY)) {
                    $ftpStatus = "UPLOADED_TO_FTP: /" . $remote_file;
                } else {
                    $ftpStatus = "FTP_UPLOAD_FAILED";
                }
                unlink($temp_file);

                // 2. Upload Details CSV
                $csv_data = "";
                foreach ($input as $key => $value) {
                    if ($key !== 'paymentScreenshot') {
                        $csv_data .= '"' . $key . '","' . str_replace('"', '""', $value) . "\"\n";
                    }
                }
                $temp_csv = tempnam(sys_get_temp_dir(), 'csv');
                file_put_contents($temp_csv, $csv_data);
                ftp_put($conn_id, $remote_dir . "/details.csv", $temp_csv, FTP_BINARY);
                unlink($temp_csv);

                ftp_close($conn_id);

                // Update DB with final FTP status
                $updateStmt = $pdo->prepare("UPDATE registrations SET paymentScreenshot = ? WHERE id = ?");
                $updateStmt->execute([$ftpStatus, $registrationId]);
            }
        }

        echo json_encode([
            "status" => "success",
            "message" => "Registration successful! Data transmitted to secure terminal.",
            "id" => $registrationId,
            "ftp" => $ftpStatus
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

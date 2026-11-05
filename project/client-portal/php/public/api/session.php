<?php
declare(strict_types=1);
require dirname(__DIR__, 2) . '/src/bootstrap.php';
header('Content-Type: application/json; charset=utf-8');
$user = current_user();
if (!$user) {
    http_response_code(401);
    echo json_encode(['authenticated' => false]);
    exit;
}
echo json_encode(['authenticated' => true, 'user' => $user]);

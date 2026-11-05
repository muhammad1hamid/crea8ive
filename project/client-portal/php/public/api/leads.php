<?php
declare(strict_types=1);
require dirname(__DIR__, 2) . '/src/bootstrap.php';
header('Content-Type: application/json; charset=utf-8');
$user = require_user();
if (!in_array($user['role'], ['admin', 'staff'], true)) {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden']);
    exit;
}
$statement = db()->query('SELECT id, name, business_name, phone, email, social_link, requirements, status, created_at FROM leads ORDER BY id DESC LIMIT 100');
echo json_encode(['data' => $statement->fetchAll()]);

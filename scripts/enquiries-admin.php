<?php
// Run over authenticated SSH only. Never deploy inside public_html.
declare(strict_types=1);
if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
$path = $argv[1] ?? '';
if (!is_file($path)) { fwrite(STDERR, "Usage: php enquiries-admin.php /private/path/enquiries.sqlite [summary|list|status REFERENCE new|qualified|call_booked|proposal_sent|won|closed]\n"); exit(1); }
$db = new PDO('sqlite:' . $path, null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
$command = $argv[2] ?? 'summary';
if ($command === 'status') {
    $reference = $argv[3] ?? ''; $status = $argv[4] ?? '';
    if (!in_array($status, ['new', 'qualified', 'call_booked', 'proposal_sent', 'won', 'closed'], true)) exit("Invalid status\n");
    $q = $db->prepare("UPDATE enquiries SET payload = json_set(payload, '$.status', ?) WHERE reference = ?");
    $q->execute([$status, $reference]); echo json_encode(['updated' => $q->rowCount()]) . "\n"; exit;
}
if ($command === 'list') {
    $rows = $db->query('SELECT reference, payload FROM enquiries ORDER BY created_at DESC LIMIT 100')->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(array_map(fn($r) => ['reference' => $r['reference']] + json_decode($r['payload'], true), $rows), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n"; exit;
}
if ($command !== 'summary') exit("Invalid command\n");
$rows = $db->query("SELECT COALESCE(json_extract(payload, '$.market'), json_extract(payload, '$.segment')) AS market, json_extract(payload, '$.type') AS enquiry_type, json_extract(payload, '$.status') AS status, COUNT(*) AS count FROM enquiries GROUP BY 1, 2, 3")->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($rows, JSON_PRETTY_PRINT) . "\n";

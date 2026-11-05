<?php
declare(strict_types=1);
require dirname(__DIR__) . '/src/bootstrap.php';
$user = require_user();
?>
<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="csrf-token" content="<?= e(csrf_token()) ?>"><title>Dashboard | Crea8iv Media Portal</title><link rel="stylesheet" href="/assets/app.css"></head><body><div id="app" data-user='<?= e(json_encode($user, JSON_HEX_APOS | JSON_HEX_QUOT)) ?>'></div><script type="module" src="/assets/app.js"></script></body></html>

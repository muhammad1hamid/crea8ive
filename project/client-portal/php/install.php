<?php
declare(strict_types=1);
require __DIR__ . '/src/bootstrap.php';
$connection = env_value('DB_CONNECTION', 'sqlite');
$migration = dirname(__DIR__, 2) . '/database/migrations/001_' . $connection . '_schema.sql';
db()->exec(file_get_contents($migration));
echo "Installed {$connection} schema.\n";

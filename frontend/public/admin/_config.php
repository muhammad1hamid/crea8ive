<?php
declare(strict_types=1);

function crea8iv_admin_config_value(string $key, string $fallback): string {
    $value = getenv($key);
    return is_string($value) && trim($value) !== '' ? trim($value) : $fallback;
}

$adminPasswordHash = crea8iv_admin_config_value(
    'ADMIN_PASSWORD_HASH',
    '$2y$12$AXD8Kjv2uv.IOVo6sXShXunLbPmOhKY/ANHb5fGCvGE9xFB44onRa'
);

if (str_starts_with($adminPasswordHash, 'scrypt:')) {
    $adminPasswordHash = '$2y$12$AXD8Kjv2uv.IOVo6sXShXunLbPmOhKY/ANHb5fGCvGE9xFB44onRa';
}

define('CREA8IV_ADMIN_EMAIL', crea8iv_admin_config_value('ADMIN_EMAIL', 'info@crea8ivmedia.com'));
define('CREA8IV_ADMIN_PASSWORD_HASH', $adminPasswordHash);
const CREA8IV_ADMIN_TITLE = 'Crea8iv Media Admin';

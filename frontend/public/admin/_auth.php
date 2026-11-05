<?php
declare(strict_types=1);

require_once __DIR__ . '/_config.php';

function crea8iv_admin_storage_dir(): string {
    $dir = getenv('CREA8IV_ADMIN_STORAGE') ?: dirname(__DIR__, 2) . '/.crea8iv-admin';
    if (!is_dir($dir)) {
        mkdir($dir, 0700, true);
    }
    return $dir;
}

function crea8iv_start_admin_session(): void {
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    $secure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
    session_name('crea8iv_admin');
    session_set_cookie_params([
        'lifetime' => 60 * 60 * 8,
        'path' => '/admin',
        'secure' => $secure,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    session_start();
}

function crea8iv_csrf_token(): string {
    crea8iv_start_admin_session();
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return (string) $_SESSION['csrf'];
}

function crea8iv_verify_csrf(): bool {
    crea8iv_start_admin_session();
    $token = $_POST['csrf'] ?? '';
    return is_string($token) && isset($_SESSION['csrf']) && hash_equals((string) $_SESSION['csrf'], $token);
}

function crea8iv_admin_logged_in(): bool {
    crea8iv_start_admin_session();
    return isset($_SESSION['admin_email'], $_SESSION['admin_until'])
        && $_SESSION['admin_email'] === CREA8IV_ADMIN_EMAIL
        && (int) $_SESSION['admin_until'] > time();
}

function crea8iv_require_admin(): void {
    if (!crea8iv_admin_logged_in()) {
        header('Location: /admin/login/');
        exit;
    }
}

function crea8iv_login_attempt_key(): string {
    return hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . '|admin-login');
}

function crea8iv_login_rate_limited(): bool {
    $file = crea8iv_admin_storage_dir() . '/login-attempts.json';
    $now = time();
    $key = crea8iv_login_attempt_key();
    $data = [];
    if (is_file($file)) {
        $decoded = json_decode((string) file_get_contents($file), true);
        if (is_array($decoded)) {
            $data = $decoded;
        }
    }
    foreach ($data as $bucket => $record) {
        if (!is_array($record) || (int) ($record['resetAt'] ?? 0) < $now) {
            unset($data[$bucket]);
        }
    }
    $record = $data[$key] ?? ['count' => 0, 'resetAt' => $now + 900];
    $record['count'] = (int) ($record['count'] ?? 0) + 1;
    $record['resetAt'] = (int) ($record['resetAt'] ?? ($now + 900));
    $data[$key] = $record;
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT), LOCK_EX);

    return $record['count'] > 8;
}

function crea8iv_login_admin(string $email, string $password): bool {
    if (crea8iv_login_rate_limited()) {
        return false;
    }
    if (!hash_equals(strtolower(CREA8IV_ADMIN_EMAIL), strtolower(trim($email)))) {
        return false;
    }
    if (!password_verify($password, CREA8IV_ADMIN_PASSWORD_HASH)) {
        return false;
    }

    crea8iv_start_admin_session();
    session_regenerate_id(true);
    $_SESSION['admin_email'] = CREA8IV_ADMIN_EMAIL;
    $_SESSION['admin_until'] = time() + 60 * 60 * 8;
    $_SESSION['csrf'] = bin2hex(random_bytes(32));
    return true;
}

function crea8iv_logout_admin(): void {
    crea8iv_start_admin_session();
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'] ?? '', (bool) $params['secure'], (bool) $params['httponly']);
    }
    session_destroy();
}

function crea8iv_admin_html_start(string $title): void {
    header('Content-Type: text/html; charset=utf-8');
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('X-Robots-Tag: noindex, nofollow, noarchive');
    $safeTitle = htmlspecialchars($title, ENT_QUOTES, 'UTF-8');
    echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>' . $safeTitle . '</title><style>
    :root{color-scheme:dark;--bg:#050505;--panel:#111113;--line:rgba(255,255,255,.12);--muted:rgba(255,255,255,.66);--brand:#ff6801}
    *{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at 20% 0,rgba(255,104,1,.18),transparent 32%),var(--bg);color:#fff;font-family:Inter,Arial,sans-serif}
    a{color:inherit}.wrap{min-height:100vh;display:grid;place-items:center;padding:32px}.card{width:min(980px,100%);border:1px solid var(--line);background:rgba(17,17,19,.94);border-radius:28px;padding:clamp(24px,4vw,44px);box-shadow:0 28px 80px rgba(0,0,0,.45)}
    .eyebrow{display:inline-flex;align-items:center;gap:10px;border:1px solid rgba(255,104,1,.35);background:rgba(255,104,1,.1);color:var(--brand);border-radius:999px;padding:9px 14px;font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
    h1{font-size:clamp(32px,6vw,64px);line-height:1.02;margin:28px 0 16px;font-family:Orbitron,Inter,Arial,sans-serif;letter-spacing:0}p{color:var(--muted);line-height:1.75}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-top:28px}
    .tile{border:1px solid var(--line);background:rgba(255,255,255,.035);border-radius:18px;padding:18px}.tile strong{display:block;margin-bottom:8px}.btn,.linkbtn{display:inline-flex;min-height:48px;align-items:center;justify-content:center;border-radius:999px;padding:0 22px;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;border:1px solid rgba(255,255,255,.16);background:transparent;color:#fff}
    .btn{border:0;background:var(--brand);color:#090909}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}label{display:block;margin:16px 0 8px;color:rgba(255,255,255,.74);font-weight:700}input{width:100%;min-height:52px;border-radius:16px;border:1px solid var(--line);background:#050505;color:#fff;padding:0 16px;font-size:16px}
    .error{margin-top:18px;border:1px solid rgba(255,92,92,.35);background:rgba(255,92,92,.1);color:#ffb4b4;border-radius:16px;padding:14px}.table{width:100%;border-collapse:collapse;margin-top:22px}.table th,.table td{border-bottom:1px solid var(--line);padding:12px;text-align:left;vertical-align:top}.table th{font-size:11px;color:var(--brand);text-transform:uppercase;letter-spacing:.12em}.small{font-size:13px;color:rgba(255,255,255,.52)}
    </style></head><body><main class="wrap"><section class="card">';
}

function crea8iv_admin_html_end(): void {
    echo '</section></main></body></html>';
}

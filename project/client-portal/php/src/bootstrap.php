<?php
declare(strict_types=1);

function env_value(string $key, ?string $default = null): ?string {
    static $values = null;
    if ($values === null) {
        $values = [];
        $path = dirname(__DIR__, 3) . '/config/.env';
        if (is_file($path)) {
            foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [] as $line) {
                if ($line === '' || str_starts_with(trim($line), '#') || !str_contains($line, '=')) continue;
                [$name, $value] = array_map('trim', explode('=', $line, 2));
                $values[$name] = trim($value, "\"'");
            }
        }
    }
    return $_ENV[$key] ?? getenv($key) ?: ($values[$key] ?? $default);
}

function db(): PDO {
    static $pdo = null;
    if ($pdo instanceof PDO) return $pdo;
    $connection = env_value('DB_CONNECTION', 'sqlite');
    if ($connection === 'mysql') {
        $dsn = sprintf('mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4', env_value('DB_HOST', '127.0.0.1'), env_value('DB_PORT', '3306'), env_value('DB_DATABASE', 'crea8iv_portal'));
        $pdo = new PDO($dsn, env_value('DB_USERNAME', ''), env_value('DB_PASSWORD', ''));
    } else {
        $database = env_value('DB_DATABASE', 'database/crea8iv.sqlite');
        $path = realpath(dirname(__DIR__, 3)) . '/' . ltrim((string) $database, '/');
        $pdo = new PDO('sqlite:' . $path);
        $pdo->exec('PRAGMA foreign_keys = ON');
    }
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
}

function start_secure_session(): void {
    if (session_status() === PHP_SESSION_ACTIVE) return;
    session_set_cookie_params([
        'httponly' => true,
        'secure' => env_value('SESSION_SECURE', 'true') === 'true',
        'samesite' => 'Lax',
        'path' => '/',
    ]);
    session_start();
}

function csrf_token(): string {
    start_secure_session();
    return $_SESSION['csrf_token'] ??= bin2hex(random_bytes(32));
}

function verify_csrf(): void {
    $submitted = (string) ($_POST['csrf_token'] ?? ($_SERVER['HTTP_X_CSRF_TOKEN'] ?? ''));
    if (!hash_equals(csrf_token(), $submitted)) {
        http_response_code(419);
        exit('CSRF token mismatch.');
    }
}

function e(?string $value): string {
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function client_ip(): string {
    return substr((string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown'), 0, 64);
}

function enforce_rate_limit(string $action): void {
    $bucket = hash('sha256', $action . '|' . client_ip());
    $now = time();
    $window = (int) env_value('RATE_LIMIT_WINDOW', '900');
    $max = (int) env_value('RATE_LIMIT_ATTEMPTS', '8');
    $query = db()->prepare('SELECT attempts, expires_at FROM rate_limits WHERE bucket = ?');
    $query->execute([$bucket]);
    $current = $query->fetch();
    if (!$current || (int) $current['expires_at'] < $now) {
        db()->prepare('DELETE FROM rate_limits WHERE bucket = ?')->execute([$bucket]);
        db()->prepare('INSERT INTO rate_limits (bucket, attempts, expires_at) VALUES (?, 1, ?)')->execute([$bucket, $now + $window]);
        return;
    }
    if ((int) $current['attempts'] >= $max) {
        http_response_code(429);
        exit('Too many attempts. Please try again later.');
    }
    db()->prepare('UPDATE rate_limits SET attempts = attempts + 1 WHERE bucket = ?')->execute([$bucket]);
}

function current_user(): ?array {
    start_secure_session();
    return $_SESSION['user'] ?? null;
}

function require_user(): array {
    $user = current_user();
    if (!$user) {
        header('Location: /');
        exit;
    }
    return $user;
}

function json_input(): array {
    return json_decode(file_get_contents('php://input') ?: '[]', true, 512, JSON_THROW_ON_ERROR);
}

<?php
declare(strict_types=1);

require_once __DIR__ . '/../_auth.php';

if (crea8iv_admin_logged_in()) {
    header('Location: /admin/');
    exit;
}

$error = '';
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    if (!crea8iv_verify_csrf()) {
        $error = 'Security check failed. Reload the page and try again.';
    } else {
        $email = is_string($_POST['email'] ?? null) ? $_POST['email'] : '';
        $password = is_string($_POST['password'] ?? null) ? $_POST['password'] : '';
        if (crea8iv_login_admin($email, $password)) {
            header('Location: /admin/');
            exit;
        }
        $error = 'Invalid admin email or password.';
    }
}

crea8iv_admin_html_start('Admin Login | Crea8iv Media');
?>
  <span class="eyebrow">Private admin</span>
  <h1>Login to Crea8iv Admin.</h1>
  <p>Use the private admin credentials to access enquiries and admin status. This admin area is handled by PHP sessions on the current Hostinger static deployment.</p>
  <?php if ($error !== ''): ?>
    <div class="error"><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></div>
  <?php endif; ?>
  <form method="post" action="/admin/login/" autocomplete="on">
    <input type="hidden" name="csrf" value="<?= htmlspecialchars(crea8iv_csrf_token(), ENT_QUOTES, 'UTF-8') ?>">
    <label for="email">Email</label>
    <input id="email" name="email" type="email" value="<?= htmlspecialchars(CREA8IV_ADMIN_EMAIL, ENT_QUOTES, 'UTF-8') ?>" required autocomplete="username">
    <label for="password">Password</label>
    <input id="password" name="password" type="password" required autocomplete="current-password">
    <div class="actions">
      <button class="btn" type="submit">Login</button>
      <a class="linkbtn" href="/">Back to website</a>
    </div>
  </form>
<?php
crea8iv_admin_html_end();

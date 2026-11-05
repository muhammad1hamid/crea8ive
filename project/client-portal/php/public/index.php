<?php
declare(strict_types=1);
require dirname(__DIR__) . '/src/bootstrap.php';
start_secure_session();

$error = '';
$success = '';
$tab = $_POST['tab'] ?? 'login';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf();
    if ($tab === 'register') {
        enforce_rate_limit('register');
        $name = trim((string) ($_POST['reg_name'] ?? ''));
        $business = trim((string) ($_POST['reg_business'] ?? ''));
        $phone = trim((string) ($_POST['reg_phone'] ?? ''));
        $email = trim((string) ($_POST['reg_email'] ?? ''));
        $social = trim((string) ($_POST['reg_social'] ?? ''));
        $requirements = trim((string) ($_POST['reg_requirements'] ?? ''));
        if ($name === '' || $business === '' || $phone === '' || $social === '') {
            $error = 'Please complete all required fields.';
        } elseif ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $error = 'Please enter a valid email address.';
        } else {
            $statement = db()->prepare('INSERT INTO leads (name, business_name, phone, email, social_link, requirements) VALUES (?, ?, ?, ?, ?, ?)');
            $statement->execute([$name, $business, $phone, $email ?: null, $social, $requirements]);
            $success = 'Thanks. Your audit request has been received.';
        }
    } else {
        enforce_rate_limit('login');
        $username = trim((string) ($_POST['username'] ?? ''));
        $password = (string) ($_POST['password'] ?? '');
        $statement = db()->prepare('SELECT id, username, password_hash, role, display_name, email FROM users WHERE username = ? AND is_active = 1 LIMIT 1');
        $statement->execute([$username]);
        $user = $statement->fetch();
        if (!$user || !password_verify($password, $user['password_hash'])) {
            $error = 'Invalid username or password.';
        } else {
            unset($user['password_hash']);
            session_regenerate_id(true);
            $_SESSION['user'] = $user;
            header('Location: /dashboard.php');
            exit;
        }
    }
}
?>
<!DOCTYPE html><html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="csrf-token" content="<?= e(csrf_token()) ?>"><title>Crea8iv Media Portal</title>
<link rel="icon" href="/assets/brand/logo.jpeg"><link rel="stylesheet" href="/assets/css/index.css">
<style>:root{--brand:#ff7b00;--brand-2:#dd6808;--brand-dark:#111111}</style></head>
<body><div class="bg-shapes"><div class="shape s1"></div><div class="shape s2"></div><div class="shape s3"></div></div>
<div class="wrap"><div class="card"><div class="logo-area"><div class="logo-icon"><img src="/assets/brand/logo.jpeg" alt="Logo" style="width:64px;height:64px;object-fit:contain"></div><div class="brand-name">Crea8iv Media</div><div class="brand-sub">Staff &amp; Client Portal</div></div>
<div class="tab-row"><button class="tab-btn <?= $tab === 'login' ? 'active' : '' ?>" onclick="switchTab('login')">🔑 Sign In</button><button class="tab-btn <?= $tab === 'register' ? 'active' : '' ?>" onclick="switchTab('register')">🚀 Get Started</button></div>
<?php if ($error): ?><div class="alert alert-error"><?= e($error) ?></div><?php endif ?>
<?php if ($success): ?><div class="alert alert-success"><?= e($success) ?></div><?php endif ?>
<div class="tab-pane <?= $tab === 'login' ? 'active' : '' ?>" id="pane-login"><form method="post"><input type="hidden" name="csrf_token" value="<?= e(csrf_token()) ?>"><input type="hidden" name="tab" value="login">
<div><label class="label">Username</label><div class="input-wrap"><span class="input-icon">👤</span><input class="input" name="username" required autofocus placeholder="Enter your username"></div></div>
<div><label class="label">Password</label><div class="input-wrap"><span class="input-icon">🔒</span><input class="input" type="password" name="password" required placeholder="Enter your password"></div></div>
<button class="btn" type="submit">Sign In →</button><button type="button" class="btn-ghost" onclick="switchTab('register')">New here? Register your business →</button></form></div>
<div class="tab-pane <?= $tab === 'register' ? 'active' : '' ?>" id="pane-register"><div class="offer-banner"><div class="offer-tag">🎁 New Client Offer</div><div class="offer-title">Get a Detailed Audit &amp; Action Plan</div><div class="offer-sub">Share your Instagram, website, or any social media link. We review your current presence first, then unlock a tailored action plan and the right growth options.</div></div>
<form method="post"><input type="hidden" name="csrf_token" value="<?= e(csrf_token()) ?>"><input type="hidden" name="tab" value="register">
<div class="input-row"><div><label class="label">Your Name *</label><div class="input-wrap"><span class="input-icon">👤</span><input class="input" name="reg_name" required placeholder="Full name"></div></div><div><label class="label">Business Name *</label><div class="input-wrap"><span class="input-icon">🏢</span><input class="input" name="reg_business" required placeholder="Your business"></div></div></div>
<div class="input-row"><div><label class="label">Phone / WhatsApp *</label><div class="input-wrap"><span class="input-icon">📱</span><input class="input" name="reg_phone" required placeholder="+92 3XX XXXXXXX"></div></div><div><label class="label">Email (optional)</label><div class="input-wrap"><span class="input-icon">✉️</span><input class="input" type="email" name="reg_email" placeholder="you@business.com"></div></div></div>
<div><label class="label">Instagram / Website / Social Link *</label><div class="input-wrap"><span class="input-icon">🔗</span><input class="input" name="reg_social" required placeholder="Instagram handle, website, Facebook page, or any social link"></div></div>
<div><label class="label">Business / Marketing Requirements</label><textarea class="req-box" name="reg_requirements" placeholder="Tell us about your goals and current problems."></textarea></div>
<button class="btn" type="submit">🚀 Get My Audit &amp; Action Plan →</button><button type="button" class="btn-ghost" onclick="switchTab('login')">Already have an account? Sign in</button></form></div></div>
<div class="footer">© 2026 Crea8iv Media · <a href="https://crea8ivmedia.com">crea8ivmedia.com</a></div></div>
<script>function switchTab(tab){document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));document.querySelectorAll('.tab-pane').forEach(p=>p.classList.remove('active'));document.querySelector('[onclick=\"switchTab(\\''+tab+'\\')\"]').classList.add('active');document.getElementById('pane-'+tab).classList.add('active')}</script>
</body></html>

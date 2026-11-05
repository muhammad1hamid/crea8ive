<?php
declare(strict_types=1);

require_once __DIR__ . '/_auth.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST' && ($_POST['action'] ?? '') === 'logout') {
    if (crea8iv_verify_csrf()) {
        crea8iv_logout_admin();
    }
    header('Location: /admin/login/');
    exit;
}

crea8iv_require_admin();

function crea8iv_recent_enquiries(): array {
    $dbFile = dirname(__DIR__, 2) . '/.crea8iv-enquiries/enquiries.sqlite';
    if (!is_file($dbFile)) {
        return [];
    }
    try {
        $db = new PDO('sqlite:' . $dbFile, null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
        $rows = $db->query('SELECT reference, payload, created_at FROM enquiries ORDER BY created_at DESC LIMIT 25')->fetchAll(PDO::FETCH_ASSOC);
        return is_array($rows) ? $rows : [];
    } catch (Throwable $e) {
        error_log('Crea8iv admin could not read enquiries');
        return [];
    }
}

$enquiries = crea8iv_recent_enquiries();

crea8iv_admin_html_start('Admin Dashboard | Crea8iv Media');
?>
  <span class="eyebrow">Admin dashboard</span>
  <h1>Crea8iv Admin is working.</h1>
  <p>You are logged in as <?= htmlspecialchars(CREA8IV_ADMIN_EMAIL, ENT_QUOTES, 'UTF-8') ?>. This lightweight dashboard is active on the current PHP-capable Hostinger deployment.</p>

  <div class="grid">
    <div class="tile"><strong>Login</strong><span class="small">PHP session authentication is active.</span></div>
    <div class="tile"><strong>Enquiries</strong><span class="small"><?= count($enquiries) ?> recent records available.</span></div>
    <div class="tile"><strong>Full CMS</strong><span class="small">Dynamic Next.js CMS still requires Node hosting and API routes.</span></div>
  </div>

  <div class="actions">
    <a class="linkbtn" href="/enquiries/submit.php">Check enquiry endpoint</a>
    <a class="linkbtn" href="/ai-visibility-growth/">AI visibility plan</a>
    <form method="post" action="/admin/" style="display:inline">
      <input type="hidden" name="csrf" value="<?= htmlspecialchars(crea8iv_csrf_token(), ENT_QUOTES, 'UTF-8') ?>">
      <input type="hidden" name="action" value="logout">
      <button class="linkbtn" type="submit">Logout</button>
    </form>
  </div>

  <h2 style="margin-top:34px">Recent enquiries</h2>
  <?php if (!$enquiries): ?>
    <p>No enquiry records found yet, or the enquiry database is not created on this server.</p>
  <?php else: ?>
    <div style="overflow:auto">
      <table class="table">
        <thead><tr><th>Reference</th><th>Company</th><th>Email</th><th>Type</th><th>Status</th><th>Created</th></tr></thead>
        <tbody>
        <?php foreach ($enquiries as $row):
            $payload = json_decode((string) ($row['payload'] ?? ''), true);
            $payload = is_array($payload) ? $payload : [];
        ?>
          <tr>
            <td><?= htmlspecialchars((string) ($row['reference'] ?? ''), ENT_QUOTES, 'UTF-8') ?></td>
            <td><?= htmlspecialchars((string) ($payload['company'] ?? ''), ENT_QUOTES, 'UTF-8') ?></td>
            <td><?= htmlspecialchars((string) ($payload['email'] ?? ''), ENT_QUOTES, 'UTF-8') ?></td>
            <td><?= htmlspecialchars((string) ($payload['type'] ?? ''), ENT_QUOTES, 'UTF-8') ?></td>
            <td><?= htmlspecialchars((string) ($payload['status'] ?? 'new'), ENT_QUOTES, 'UTF-8') ?></td>
            <td><?= htmlspecialchars(gmdate('Y-m-d H:i', (int) ($row['created_at'] ?? time())), ENT_QUOTES, 'UTF-8') ?> UTC</td>
          </tr>
        <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  <?php endif; ?>
<?php
crea8iv_admin_html_end();

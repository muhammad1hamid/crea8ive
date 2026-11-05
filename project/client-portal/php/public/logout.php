<?php
require dirname(__DIR__) . '/src/bootstrap.php';
start_secure_session();
$_SESSION = [];
session_destroy();
header('Location: /');

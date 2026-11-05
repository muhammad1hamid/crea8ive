// ─── FIX STAGING DOMAIN IN YOAST SCHEMA ─────────────────────────────
// Replaces old hostinger staging URL with live domain in all Yoast schema output
add_filter('wpseo_schema_graph', function($data) {
    array_walk_recursive($data, function(&$value) {
        if (is_string($value)) {
            $value = str_replace('darkgray-eland-964548.hostingersite.com', 'crea8ivmedia.com', $value);
        }
    });
    return $data;
});

// ─── FIX NAV LABELS (works with custom walkers) ──────────────────────
// Uses wp_nav_menu_objects which fires before ANY walker renders HTML
add_filter('wp_nav_menu_objects', function($items, $args) {
    $label_map = array(
        'Growth Systems | Digital Marketing'      => 'Growth Systems',
        'Google Business Profile'                  => 'Google Business Profile',
        'Social Media Management'                  => 'Social Media Management',
        'Meta Ads'                                 => 'Meta Ads',
        'Google Ads'                               => 'Google Ads',
        'Website Development'                      => 'Website Development',
        'Content Creation'                         => 'Content Creation',
        'Marketing Consultation'                   => 'Consultation',
        'Digital Marketing Results'                => 'Results',
        'Careers at Crea8iv Media'                 => 'Careers',
        'About Us | Digital Marketing Agency'      => 'About',
        'Digital Marketing Agency Rawalpindi'      => 'Home',
        'Digital Marketing FAQs | Crea8iv Media'   => 'FAQs',
        'Digital Marketing Blog | Crea8iv Media'   => 'Blog',
        'Branding'                                 => 'Branding & Creative',
        'Contact Crea8iv Media'                    => 'Contact',
    );
    foreach ($items as &$item) {
        foreach ($label_map as $match => $replacement) {
            if (strpos($item->title, $match) !== false) {
                $item->title = $replacement;
                break;
            }
        }
    }
    return $items;
}, 10, 2);

// ─── FIX STAGING DOMAIN IN YOAST SCHEMA ─────────────────────────────
add_filter('wpseo_schema_graph', function($data) {
    array_walk_recursive($data, function(&$value) {
        if (is_string($value)) {
            $value = str_replace('darkgray-eland-964548.hostingersite.com', 'crea8ivmedia.com', $value);
        }
    });
    return $data;
});

// ─── FIX HARD-CODED STAGING URLS IN RENDERED CONTENT ────────────────
if ( ! function_exists('crea8iv_replace_staging_domain') ) {
    function crea8iv_replace_staging_domain($markup) {
        if ( ! is_string($markup) || $markup === '' ) {
            return $markup;
        }
        return str_replace(
            'https://darkgray-eland-964548.hostingersite.com',
            'https://crea8ivmedia.com',
            $markup
        );
    }
}

add_filter('the_content', 'crea8iv_replace_staging_domain', 999);
add_filter('widget_text', 'crea8iv_replace_staging_domain', 999);
add_filter('widget_text_content', 'crea8iv_replace_staging_domain', 999);

if ( has_filter('elementor/frontend/the_content') !== false || did_action('elementor/loaded') ) {
    add_filter('elementor/frontend/the_content', 'crea8iv_replace_staging_domain', 999);
}

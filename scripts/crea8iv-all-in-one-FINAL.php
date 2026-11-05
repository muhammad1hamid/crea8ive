// ====================================================================
// CREA8IV MEDIA — SEO + SPEED (clean consolidated version)
// Paste AFTER the last line of original theme code:
// add_filter('wp_is_application_passwords_available_for_user'...)
// ====================================================================

// ─── SITE NAME ───────────────────────────────────────────────────────
add_filter('bloginfo', function($output, $show) {
    if ($show === 'name' && $output === 'crea8ivmedia.com') return 'Crea8iv Media';
    return $output;
}, 10, 2);
add_filter('option_blogname', function($value) {
    if ($value === 'crea8ivmedia.com') return 'Crea8iv Media';
    return $value;
});

// ─── NAV MENU LABELS ─────────────────────────────────────────────────
add_filter('wp_nav_menu_objects', function($items, $args) {
    $map = array(
        'Growth Systems | Digital Marketing'     => 'Growth Systems',
        'Google Business Profile'                => 'Google Business Profile',
        'Social Media Management'                => 'Social Media Management',
        'Meta Ads'                               => 'Meta Ads',
        'Google Ads'                             => 'Google Ads',
        'Website Development'                    => 'Website Development',
        'Content Creation'                       => 'Content Creation',
        'Marketing Consultation'                 => 'Consultation',
        'Digital Marketing Results'              => 'Results',
        'Careers at Crea8iv Media'               => 'Careers',
        'About Us | Digital Marketing Agency'    => 'About',
        'Digital Marketing Agency Rawalpindi'    => 'Home',
        'Digital Marketing FAQs | Crea8iv Media' => 'FAQs',
        'Digital Marketing Blog | Crea8iv Media' => 'Blog',
        'Branding'                               => 'Branding & Creative',
        'Contact Crea8iv Media'                  => 'Contact',
    );
    foreach ($items as &$item) {
        foreach ($map as $match => $replace) {
            if (strpos($item->title, $match) !== false) { $item->title = $replace; break; }
        }
    }
    return $items;
}, 10, 2);

// ─── YOAST SCHEMA STAGING DOMAIN FIX ─────────────────────────────────
add_filter('wpseo_schema_graph', function($data) {
    array_walk_recursive($data, function(&$v) {
        if (is_string($v)) $v = str_replace('darkgray-eland-964548.hostingersite.com', 'crea8ivmedia.com', $v);
    });
    return $data;
});
add_filter('wpseo_opengraph_image', function($url) {
    return str_replace('darkgray-eland-964548.hostingersite.com', 'crea8ivmedia.com', $url);
});
add_filter('wpseo_twitter_image', function($url) {
    return str_replace('darkgray-eland-964548.hostingersite.com', 'crea8ivmedia.com', $url);
});

// ─── LOCALBUSINESS SCHEMA ─────────────────────────────────────────────
if (!function_exists('crea8iv_local_business_schema')) {
    function crea8iv_local_business_schema() {
        $slug = isset(get_queried_object()->post_name) ? get_queried_object()->post_name : '';
        if (!(is_front_page() || is_home() || in_array($slug, array('about','contact','our-services')))) return;
        echo '<script type="application/ld+json">
{"@context":"https://schema.org","@type":"LocalBusiness","@id":"https://crea8ivmedia.com/#business",
"name":"Crea8iv Media","url":"https://crea8ivmedia.com","telephone":"+92-313-5147935",
"email":"crea8ivmedia@gmail.com","priceRange":"PKR 50,000 - PKR 250,000",
"address":{"@type":"PostalAddress","streetAddress":"Office No 01, 1st Floor, Plaza 54, Phase 4 Civic Center",
"addressLocality":"Bahria Town","addressRegion":"Rawalpindi","postalCode":"46220","addressCountry":"PK"},
"geo":{"@type":"GeoCoordinates","latitude":33.5241,"longitude":72.9882},
"openingHoursSpecification":[{"@type":"OpeningHoursSpecification",
"dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
"opens":"10:00","closes":"18:00"}],
"areaServed":[{"@type":"City","name":"Rawalpindi"},{"@type":"City","name":"Islamabad"},
{"@type":"Place","name":"Bahria Town Rawalpindi"},{"@type":"Place","name":"DHA Islamabad"}]}
</script>' . "\n";
    }
    add_action('wp_head', 'crea8iv_local_business_schema', 5);
}

// ─── SERVICE SCHEMA ───────────────────────────────────────────────────
if (!function_exists('crea8iv_service_schema')) {
    function crea8iv_service_schema() {
        $slug = isset(get_queried_object()->post_name) ? get_queried_object()->post_name : '';
        $services = array(
            'meta-ads'                       => array('Meta Ads Management','Facebook and Instagram lead generation in Rawalpindi and Islamabad.','30000'),
            'social-media-management'        => array('Social Media Management','Facebook, Instagram and TikTok management in Rawalpindi and Islamabad.','15000'),
            'google-ads'                     => array('Google Ads Management','High-intent PPC campaigns for Rawalpindi and Islamabad businesses.','25000'),
            'google-business-profile-growth' => array('Google Business Profile Optimization','Rank #1 on Google Maps in Rawalpindi and Islamabad.','10000'),
            'website-development'            => array('Website Development','Fast, SEO-ready websites for Rawalpindi and Islamabad businesses.','50000'),
            'branding-and-creative'          => array('Branding and Creative Design','Logo and brand identity for Rawalpindi businesses.','20000'),
            'content-creation'               => array('Content Creation','Reels, posts and copy that drives leads in Rawalpindi.','15000'),
            'consultation'                   => array('Digital Marketing Consultation','Strategy sessions with a growth roadmap for your Rawalpindi business.','5000'),
        );
        if (!isset($services[$slug])) return;
        list($name, $desc, $price) = $services[$slug];
        echo '<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Service","serviceType":"' . esc_js($name) . '",
"name":"' . esc_js($name) . ' - Rawalpindi and Islamabad",
"provider":{"@type":"LocalBusiness","@id":"https://crea8ivmedia.com/#business","name":"Crea8iv Media"},
"areaServed":[{"@type":"City","name":"Rawalpindi"},{"@type":"City","name":"Islamabad"}],
"description":"' . esc_js($desc) . '",
"offers":{"@type":"Offer","priceCurrency":"PKR","price":"' . esc_js($price) . '"}}
</script>' . "\n";
    }
    add_action('wp_head', 'crea8iv_service_schema', 5);
}

// ─── FAQ SCHEMA ───────────────────────────────────────────────────────
if (!function_exists('crea8iv_faq_schema')) {
    function crea8iv_faq_schema() {
        $slug = isset(get_queried_object()->post_name) ? get_queried_object()->post_name : '';
        if ($slug !== 'faqs') return;
        echo '<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"How much do Meta Ads cost in Pakistan?",
"acceptedAnswer":{"@type":"Answer","text":"Meta Ads management starts from PKR 30,000/month plus ad spend. Minimum ad budget for Rawalpindi businesses is PKR 20,000-50,000/month."}},
{"@type":"Question","name":"How long to rank on Google Maps in Rawalpindi?",
"acceptedAnswer":{"@type":"Answer","text":"With our GMB optimization, businesses in Rawalpindi rank in the top 3 on Google Maps within 4-8 weeks."}},
{"@type":"Question","name":"Does Crea8iv Media serve businesses in Islamabad?",
"acceptedAnswer":{"@type":"Answer","text":"Yes, we serve Rawalpindi, Islamabad, Bahria Town, DHA, and across Pakistan remotely. Our office is in Bahria Town, Rawalpindi."}},
{"@type":"Question","name":"What is included in the digital marketing packages?",
"acceptedAnswer":{"@type":"Answer","text":"Starter Growth at PKR 50,000-70,000/month includes social media, GMB, content, and reporting. Domination Plan at PKR 180,000-250,000/month adds Google Ads, website, WhatsApp automation, and CRM."}},
{"@type":"Question","name":"What is the minimum Google Ads budget in Pakistan?",
"acceptedAnswer":{"@type":"Answer","text":"Minimum PKR 30,000-50,000/month ad spend for Google Ads in Rawalpindi and Islamabad, plus management fee."}}
]}
</script>' . "\n";
    }
    add_action('wp_head', 'crea8iv_faq_schema', 5);
}

// ─── PRECONNECT HINTS ─────────────────────────────────────────────────
if (!function_exists('crea8iv_preconnect_hints')) {
    function crea8iv_preconnect_hints() {
        echo '<link rel="preconnect" href="https://fonts.googleapis.com">' . "\n";
        echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
        echo '<link rel="dns-prefetch" href="//connect.facebook.net">' . "\n";
        echo '<link rel="dns-prefetch" href="//www.googletagmanager.com">' . "\n";
    }
    add_action('wp_head', 'crea8iv_preconnect_hints', 1);
}

// ─── PRELOAD LCP HERO IMAGE ───────────────────────────────────────────
if (!function_exists('crea8iv_preload_lcp')) {
    function crea8iv_preload_lcp() {
        if (is_front_page() || is_home()) {
            echo '<link rel="preload" as="image" href="https://crea8ivmedia.com/wp-content/uploads/2026/04/48983e3d343694dd9b780b9651e8793d.jpg" fetchpriority="high">' . "\n";
        }
    }
    add_action('wp_head', 'crea8iv_preload_lcp', 2);
}

// ─── REMOVE QUERY STRINGS ─────────────────────────────────────────────
if (!function_exists('crea8iv_remove_query_strings')) {
    function crea8iv_remove_query_strings($src) {
        if (strpos($src, '?ver=')) $src = remove_query_arg('ver', $src);
        return $src;
    }
    add_filter('style_loader_src',  'crea8iv_remove_query_strings', 10, 2);
    add_filter('script_loader_src', 'crea8iv_remove_query_strings', 10, 2);
}

// ─── REMOVE EMOJIS ───────────────────────────────────────────────────
remove_action('wp_head',             'print_emoji_detection_script', 7);
remove_action('wp_print_styles',     'print_emoji_styles');
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('admin_print_styles',  'print_emoji_styles');
remove_filter('the_content_feed',    'wp_staticize_emoji');
remove_filter('comment_text_rss',    'wp_staticize_emoji');
remove_filter('wp_mail',             'wp_staticize_emoji_for_email');
add_filter('tiny_mce_plugins', function($p) { return array_diff($p, array('wpemoji')); });

// ─── REMOVE BLOCK LIBRARY CSS ─────────────────────────────────────────
if (!function_exists('crea8iv_remove_block_css')) {
    function crea8iv_remove_block_css() {
        wp_dequeue_style('wp-block-library');
        wp_dequeue_style('wp-block-library-theme');
        wp_dequeue_style('classic-theme-styles');
        wp_deregister_style('global-styles');
    }
    add_action('wp_enqueue_scripts', 'crea8iv_remove_block_css', 100);
}

// ─── REMOVE DASHICONS ON FRONTEND ─────────────────────────────────────
add_action('wp_enqueue_scripts', function() {
    if (!is_admin() && !is_user_logged_in()) wp_deregister_style('dashicons');
}, 100);

// ─── REMOVE WOOCOMMERCE ON NON-SHOP PAGES ─────────────────────────────
if (!function_exists('crea8iv_remove_woo_scripts')) {
    function crea8iv_remove_woo_scripts() {
        if (function_exists('is_woocommerce') && !is_woocommerce() && !is_cart() && !is_checkout() && !is_account_page()) {
            foreach (array('woocommerce-general','woocommerce-layout','woocommerce-smallscreen','wc-block-style') as $s) wp_dequeue_style($s);
            foreach (array('wc-jquery-blockui-js','wc-add-to-cart-js','wc-js-cookie-js','woocommerce-js','sourcebuster-js-js','wc-order-attribution-js') as $s) wp_dequeue_script($s);
        }
    }
    add_action('wp_enqueue_scripts', 'crea8iv_remove_woo_scripts', 99);
}

// ─── REMOVE REACT/METFORM ON NON-CONTACT PAGES ────────────────────────
if (!function_exists('crea8iv_remove_metform_scripts')) {
    function crea8iv_remove_metform_scripts() {
        $slug = isset(get_queried_object()->post_name) ? get_queried_object()->post_name : '';
        if (!in_array($slug, array('contact','contact-us','get-started','book-a-call'), true)) {
            foreach (array('htm-js','react-js','react-dom-js','wp-escape-html-js','wp-element-js','metform-app-js','cute-alert-js') as $s) wp_dequeue_script($s);
        }
    }
    add_action('wp_enqueue_scripts', 'crea8iv_remove_metform_scripts', 99);
}

// ─── REMOVE UNUSED PLUGIN SCRIPTS ─────────────────────────────────────
if (!function_exists('crea8iv_remove_unused_scripts')) {
    function crea8iv_remove_unused_scripts() {
        if (is_admin()) return;
        wp_dequeue_script('xs_front_main_js');
        wp_dequeue_script('xs_social_custom');
        wp_dequeue_style('xs_front_style');
        wp_dequeue_script('font-awesome-4-shim');
        wp_dequeue_style('font-awesome-4-shim');
    }
    add_action('wp_enqueue_scripts', 'crea8iv_remove_unused_scripts', 100);
}

// ─── OUTPUT BUFFER: LOTTIE DEDUP + STAGING DOMAIN FIX ─────────────────
if (!function_exists('crea8iv_output_buffer_fix')) {
    function crea8iv_output_buffer_fix($buf) {
        $lottie = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
        if (substr_count($buf, $lottie) > 1) {
            $buf = str_replace('<script src="' . $lottie . '"></script>', '', $buf);
            $buf = str_replace('<script src="' . $lottie . '">', '', $buf);
            $buf = str_replace('</head>', '<script src="' . $lottie . '"></script></head>', $buf);
        }
        $buf = str_replace('https://darkgray-eland-964548.hostingersite.com', 'https://crea8ivmedia.com', $buf);
        return $buf;
    }
}
if (!function_exists('crea8iv_start_output_buffer')) {
    function crea8iv_start_output_buffer() {
        if (!is_admin()) ob_start('crea8iv_output_buffer_fix');
    }
    add_action('template_redirect', 'crea8iv_start_output_buffer');
}

// ─── GOOGLE FONTS NON-BLOCKING ────────────────────────────────────────
add_filter('style_loader_tag', function($html, $handle) {
    if (strpos($html, 'fonts.googleapis.com') !== false) {
        $html = str_replace("media='all'", "media='print' onload=\"this.media='all'\"", $html);
        $html = str_replace('media="all"',  "media='print' onload=\"this.media='all'\"", $html);
    }
    return $html;
}, 10, 2);

// ─── BROWSER CACHE HEADERS ────────────────────────────────────────────
add_action('send_headers', function() {
    if (!is_admin()) {
        header('Cache-Control: public, max-age=604800, stale-while-revalidate=86400', false);
        header('Vary: Accept-Encoding', false);
    }
});

// ─── CLEAN HEAD TAGS ──────────────────────────────────────────────────
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wp_shortlink_wp_head', 10);
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10);
remove_action('wp_head', 'wp_oembed_add_discovery_links');
remove_action('wp_head', 'rest_output_link_wp_head');
add_filter('xmlrpc_enabled', '__return_false');
remove_action('wp_head', 'wp_pingback_header');

// ─── HEARTBEAT ────────────────────────────────────────────────────────
add_filter('heartbeat_settings', function($s) { $s['interval'] = 60; return $s; });

// ─── LAZY LOAD IFRAMES ────────────────────────────────────────────────
add_filter('the_content', function($c) {
    return preg_replace('/<iframe(?![^>]*loading=)/i', '<iframe loading="lazy"', $c);
}, 10);

// ─── FORCE ELEMENTOR PERFORMANCE SETTINGS ────────────────────────────
add_filter('pre_option_elementor_css_print_method',         function() { return 'internal'; });
add_filter('pre_option_elementor_optimized_assets_loading', function() { return '1'; });
add_filter('pre_option_elementor_optimized_css_loading',    function() { return '1'; });
add_filter('pre_option_elementor_load_fa4_shim',            function() { return ''; });

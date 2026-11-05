// ====================================================================
// CREA8IV MEDIA — SPEED BOOST (animation-safe)
// Paste at the BOTTOM of functions.php (no <?php needed)
// ====================================================================

// ─── 1. REMOVE EMOJI SCRIPTS ─────────────────────────────────────────
remove_action( 'wp_head',             'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles',     'print_emoji_styles' );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles',  'print_emoji_styles' );
remove_filter( 'the_content_feed',    'wp_staticize_emoji' );
remove_filter( 'comment_text_rss',    'wp_staticize_emoji' );
remove_filter( 'wp_mail',             'wp_staticize_emoji_for_email' );
add_filter( 'tiny_mce_plugins', function( $plugins ) {
    return array_diff( $plugins, array( 'wpemoji' ) );
});
add_filter( 'wp_resource_hints', function( $urls, $relation_type ) {
    if ( $relation_type === 'dns-prefetch' ) {
        return array_filter( $urls, function( $url ) {
            return strpos( $url, 's.w.org' ) === false;
        });
    }
    return $urls;
}, 10, 2 );

// ─── 2. REMOVE BLOCK LIBRARY CSS (Elementor site, not needed) ────────
if ( ! function_exists('crea8iv_remove_block_css') ) {
    function crea8iv_remove_block_css() {
        wp_dequeue_style( 'wp-block-library' );
        wp_dequeue_style( 'wp-block-library-theme' );
        wp_dequeue_style( 'classic-theme-styles' );
        wp_deregister_style( 'global-styles' );
    }
    add_action( 'wp_enqueue_scripts', 'crea8iv_remove_block_css', 100 );
}

// ─── 3. REMOVE DASHICONS ON FRONTEND ─────────────────────────────────
add_action( 'wp_enqueue_scripts', function() {
    if ( ! is_admin() && ! is_user_logged_in() ) {
        wp_deregister_style( 'dashicons' );
    }
}, 100 );

// ─── 4. REMOVE WOOCOMMERCE SCRIPTS ON NON-SHOP PAGES ─────────────────
if ( ! function_exists('crea8iv_remove_woo_scripts') ) {
    function crea8iv_remove_woo_scripts() {
        if ( function_exists('is_woocommerce') && ! is_woocommerce() && ! is_cart() && ! is_checkout() && ! is_account_page() ) {
            wp_dequeue_style(  'woocommerce-general' );
            wp_dequeue_style(  'woocommerce-layout' );
            wp_dequeue_style(  'woocommerce-smallscreen' );
            wp_dequeue_style(  'wc-block-style' );
            wp_dequeue_script( 'wc-jquery-blockui-js' );
            wp_dequeue_script( 'wc-add-to-cart-js' );
            wp_dequeue_script( 'wc-js-cookie-js' );
            wp_dequeue_script( 'woocommerce-js' );
            wp_dequeue_script( 'sourcebuster-js-js' );
            wp_dequeue_script( 'wc-order-attribution-js' );
        }
    }
    add_action( 'wp_enqueue_scripts', 'crea8iv_remove_woo_scripts', 99 );
}

// ─── 5. REMOVE REACT/METFORM ON NON-CONTACT PAGES ────────────────────
// MetForm loads React (120KB) on every page — only needed on Contact page
if ( ! function_exists('crea8iv_remove_metform_scripts') ) {
    function crea8iv_remove_metform_scripts() {
        $queried = get_queried_object();
        $slug    = isset( $queried->post_name ) ? $queried->post_name : '';
        $form_pages = array( 'contact', 'contact-us', 'get-started', 'book-a-call' );
        if ( ! in_array( $slug, $form_pages, true ) ) {
            wp_dequeue_script( 'htm-js' );
            wp_dequeue_script( 'react-js' );
            wp_dequeue_script( 'react-dom-js' );
            wp_dequeue_script( 'wp-escape-html-js' );
            wp_dequeue_script( 'wp-element-js' );
            wp_dequeue_script( 'metform-app-js' );
            wp_dequeue_script( 'cute-alert-js' );
        }
    }
    add_action( 'wp_enqueue_scripts', 'crea8iv_remove_metform_scripts', 99 );
}

// ─── 6. OUTPUT BUFFER — FIX LOTTIE DUPLICATION + STAGING DOMAIN IMAGES ─
// Lottie: loaded 24 times → loads once. Staging domain images → live domain.
// Both fixes applied to final HTML before it reaches the browser.
if ( ! function_exists('crea8iv_output_buffer_fix') ) {
    function crea8iv_output_buffer_fix( $buffer ) {
        // Fix Lottie: remove all instances, inject one before </head>
        $lottie = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
        if ( substr_count( $buffer, $lottie ) > 1 ) {
            $buffer = str_replace( '<script src="' . $lottie . '"></script>', '', $buffer );
            $buffer = str_replace( '<script src="' . $lottie . '">',          '', $buffer );
            $buffer = str_replace( '</head>', '<script src="' . $lottie . '"></script></head>', $buffer );
        }
        // Fix staging domain: replace ALL image/asset URLs in the HTML output
        $buffer = str_replace(
            'https://darkgray-eland-964548.hostingersite.com',
            'https://crea8ivmedia.com',
            $buffer
        );
        return $buffer;
    }
}
if ( ! function_exists('crea8iv_start_output_buffer') ) {
    function crea8iv_start_output_buffer() {
        if ( ! is_admin() ) {
            ob_start( 'crea8iv_output_buffer_fix' );
        }
    }
    add_action( 'template_redirect', 'crea8iv_start_output_buffer' );
}

// ─── 7. DEFER ONLY SAFE PLUGIN SCRIPTS (NOT theme/animation scripts) ──
// Theme scripts (GSAP, WOW, Waypoints, CounterUp, Appear) stay synchronous
// Only non-critical plugin scripts are deferred
if ( ! function_exists('crea8iv_defer_safe_scripts') ) {
    function crea8iv_defer_safe_scripts( $tag, $handle, $src ) {
        if ( is_admin() ) return $tag;
        // Only defer these specific safe scripts
        $defer_these = array(
            'xs_front_main_js',                       // WP Social plugin
            'xs_social_custom',                       // WP Social plugin
            'hostinger-reach-subscription-block-view', // Hostinger plugin
            'font-awesome-4-shim',                    // FA compatibility (rarely needed)
            'elh-element-helper',                     // ElementsKit helper
        );
        if ( ! in_array( $handle, $defer_these, true ) ) return $tag;
        if ( strpos( $tag, 'defer' ) !== false ) return $tag;
        return str_replace( '<script ', '<script defer ', $tag );
    }
    add_filter( 'script_loader_tag', 'crea8iv_defer_safe_scripts', 10, 3 );
}

// ─── 8. LOAD GOOGLE FONTS NON-BLOCKING ───────────────────────────────
add_filter( 'style_loader_tag', function( $html, $handle ) {
    if ( strpos( $html, 'fonts.googleapis.com' ) !== false ) {
        $html = str_replace( "media='all'", "media='print' onload=\"this.media='all'\"", $html );
        $html = str_replace( 'media="all"', "media='print' onload=\"this.media='all'\"", $html );
        if ( strpos( $html, 'onload' ) === false ) {
            $html = str_replace( "rel='stylesheet'", "media='print' rel='stylesheet' onload=\"this.media='all'\"", $html );
        }
    }
    return $html;
}, 10, 2 );

// ─── 9. BROWSER CACHE HEADERS ────────────────────────────────────────
add_action( 'send_headers', function() {
    if ( ! is_admin() ) {
        header( 'Cache-Control: public, max-age=604800, stale-while-revalidate=86400', false );
        header( 'Vary: Accept-Encoding', false );
    }
});

// ─── 10. REMOVE JUNK HEAD TAGS ───────────────────────────────────────
remove_action( 'wp_head', 'wp_generator' );
remove_action( 'wp_head', 'wlwmanifest_link' );
remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wp_shortlink_wp_head',            10 );
remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10 );
remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
remove_action( 'wp_head', 'rest_output_link_wp_head' );
add_filter( 'xmlrpc_enabled', '__return_false' );
remove_action( 'wp_head', 'wp_pingback_header' );

// ─── 11. REDUCE HEARTBEAT ────────────────────────────────────────────
add_filter( 'heartbeat_settings', function( $s ) {
    $s['interval'] = 60;
    return $s;
});

// ─── 12. LAZY LOAD IFRAMES ───────────────────────────────────────────
add_filter( 'the_content', function( $content ) {
    return preg_replace( '/<iframe(?![^>]*loading=)/i', '<iframe loading="lazy"', $content );
}, 10 );

// ─── 13. FORCE ELEMENTOR PERFORMANCE SETTINGS VIA PHP ────────────────
// Overrides Elementor options at render time — no admin panel needed
add_filter( 'pre_option_elementor_css_print_method',          function() { return 'internal'; } );
add_filter( 'pre_option_elementor_optimized_assets_loading',  function() { return '1'; } );
add_filter( 'pre_option_elementor_optimized_css_loading',     function() { return '1'; } );
add_filter( 'pre_option_elementor_load_fa4_shim',             function() { return ''; } );

// ─── 14. PRELOAD LCP HERO IMAGE ───────────────────────────────────────
// Tells the browser to fetch the above-fold image immediately
if ( ! function_exists('crea8iv_preload_lcp') ) {
    function crea8iv_preload_lcp() {
        if ( is_front_page() || is_home() ) {
            echo '<link rel="preload" as="image" href="https://crea8ivmedia.com/wp-content/uploads/2026/04/48983e3d343694dd9b780b9651e8793d.jpg" fetchpriority="high">' . "\n";
        }
    }
    add_action( 'wp_head', 'crea8iv_preload_lcp', 2 );
}

// ─── 15. REMOVE UNUSED PLUGIN SCRIPTS SITE-WIDE ──────────────────────
if ( ! function_exists('crea8iv_remove_unused_scripts') ) {
    function crea8iv_remove_unused_scripts() {
        if ( is_admin() ) return;
        // WP Social plugin — loads on every page unnecessarily
        wp_dequeue_script( 'xs_front_main_js' );
        wp_dequeue_script( 'xs_social_custom' );
        wp_dequeue_style(  'xs_front_style' );
        // Font Awesome 4 shim — only needed if using FA4 icons (FA5 is backward-compatible)
        wp_dequeue_script( 'font-awesome-4-shim' );
        wp_dequeue_style(  'font-awesome-4-shim' );
    }
    add_action( 'wp_enqueue_scripts', 'crea8iv_remove_unused_scripts', 100 );
}

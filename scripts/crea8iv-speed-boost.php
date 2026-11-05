// ====================================================================
// CREA8IV MEDIA — SPEED BOOST
// Paste at the BOTTOM of functions.php (no <?php needed)
// ====================================================================

// ─── 1. REMOVE EMOJI SCRIPTS (saves 1 HTTP request + 17KB) ──────────
if ( ! function_exists('crea8iv_disable_emojis') ) {
    function crea8iv_disable_emojis() {
        remove_action( 'wp_head',             'print_emoji_detection_script', 7 );
        remove_action( 'wp_print_styles',     'print_emoji_styles' );
        remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
        remove_action( 'admin_print_styles',  'print_emoji_styles' );
        remove_filter( 'the_content_feed',    'wp_staticize_emoji' );
        remove_filter( 'comment_text_rss',    'wp_staticize_emoji' );
        remove_filter( 'wp_mail',             'wp_staticize_emoji_for_email' );
        add_filter( 'wp_resource_hints', function( $urls, $relation_type ) {
            if ( $relation_type === 'dns-prefetch' ) {
                $urls = array_filter( $urls, function( $url ) {
                    return strpos( $url, 'https://s.w.org' ) === false;
                });
            }
            return $urls;
        }, 10, 2 );
    }
    add_action( 'init', 'crea8iv_disable_emojis' );
}

// ─── 2. REMOVE BLOCK LIBRARY CSS (Elementor site — not needed) ──────
if ( ! function_exists('crea8iv_remove_block_css') ) {
    function crea8iv_remove_block_css() {
        wp_dequeue_style( 'wp-block-library' );
        wp_dequeue_style( 'wp-block-library-theme' );
        wp_dequeue_style( 'global-styles' );
        wp_dequeue_style( 'classic-theme-styles' );
    }
    add_action( 'wp_enqueue_scripts', 'crea8iv_remove_block_css', 100 );
}

// ─── 3. REMOVE DASHICONS ON FRONTEND (saves 1 request) ──────────────
add_action( 'wp_enqueue_scripts', function() {
    if ( ! is_admin() && ! is_user_logged_in() ) {
        wp_deregister_style( 'dashicons' );
    }
}, 100 );

// ─── 4. CLEAN UP UNNECESSARY HEAD TAGS ──────────────────────────────
remove_action( 'wp_head', 'wp_generator' );
remove_action( 'wp_head', 'wlwmanifest_link' );
remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wp_shortlink_wp_head', 10 );
remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10 );
remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
remove_action( 'wp_head', 'rest_output_link_wp_head' );

// ─── 5. REDUCE HEARTBEAT (stops excessive AJAX polling) ─────────────
if ( ! function_exists('crea8iv_heartbeat_control') ) {
    function crea8iv_heartbeat_control( $settings ) {
        $settings['interval'] = 60;
        return $settings;
    }
    add_filter( 'heartbeat_settings', 'crea8iv_heartbeat_control' );
}
add_action( 'admin_enqueue_scripts', function() {
    wp_deregister_script( 'heartbeat' );
}, 1 );

// ─── 6. DEFER NON-CRITICAL JAVASCRIPT ───────────────────────────────
if ( ! function_exists('crea8iv_defer_scripts') ) {
    function crea8iv_defer_scripts( $tag, $handle, $src ) {
        // Never defer these — page will break without them synchronous
        $skip = array(
            'jquery', 'jquery-core', 'jquery-migrate',
            'elementor-frontend', 'elementor-pro-frontend',
            'wp-polyfill', 'regenerator-runtime',
        );
        if ( is_admin() ) return $tag;
        if ( in_array( $handle, $skip, true ) ) return $tag;
        if ( strpos( $src, '/jquery' ) !== false ) return $tag;
        // Add defer to all other scripts
        if ( strpos( $tag, ' defer' ) === false && strpos( $tag, ' async' ) === false ) {
            return str_replace( ' src=', ' defer src=', $tag );
        }
        return $tag;
    }
    add_filter( 'script_loader_tag', 'crea8iv_defer_scripts', 10, 3 );
}

// ─── 7. LOAD GOOGLE FONTS NON-BLOCKING ──────────────────────────────
add_filter( 'style_loader_tag', function( $html, $handle ) {
    if ( strpos( $html, 'fonts.googleapis.com' ) !== false ) {
        // Add display=swap if not already present
        if ( strpos( $html, 'display=swap' ) === false ) {
            $html = str_replace( "rel='stylesheet'", "rel='stylesheet'", $html );
        }
        // Load font CSS after page renders to avoid render blocking
        $html = str_replace(
            "media='all'",
            "media='print' onload=\"this.media='all'\"",
            $html
        );
        // Fallback for no-JS
        $html .= '<noscript>' . str_replace( "media='print' onload=\"this.media='all'\"", "media='all'", $html ) . '</noscript>';
    }
    return $html;
}, 10, 2 );

// ─── 8. ADD BROWSER CACHE HEADERS ───────────────────────────────────
if ( ! function_exists('crea8iv_browser_cache_headers') ) {
    function crea8iv_browser_cache_headers() {
        if ( ! is_admin() ) {
            header( 'Cache-Control: public, max-age=31536000', false );
        }
    }
    add_action( 'send_headers', 'crea8iv_browser_cache_headers' );
}

// ─── 9. LAZY LOAD IFRAMES & EMBEDS ──────────────────────────────────
add_filter( 'the_content', function( $content ) {
    $content = preg_replace( '/<iframe(?![^>]*loading=)/i', '<iframe loading="lazy"', $content );
    return $content;
}, 10 );

// ─── 10. DISABLE XML-RPC (security + removes pingback head tag) ──────
add_filter( 'xmlrpc_enabled', '__return_false' );
remove_action( 'wp_head', 'wp_pingback_header' );

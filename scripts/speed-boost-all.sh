#!/bin/bash
# ============================================================
# Crea8iv Media — Full Speed Boost via WP-CLI
# Run this in Hostinger SSH terminal (from WordPress root)
# ============================================================

echo "🚀 Starting full speed optimization..."

# ─── STEP 1: Append speed boost code to functions.php ───────
THEME_DIR=$(wp eval "echo get_template_directory();" --skip-themes 2>/dev/null || echo "wp-content/themes/reliable")
FUNCTIONS_FILE="$THEME_DIR/functions.php"

echo ""
echo "📝 Writing speed boost code to functions.php..."

cat >> "$FUNCTIONS_FILE" << 'PHPCODE'

// ====================================================================
// CREA8IV MEDIA — SPEED BOOST (animation-safe)
// ====================================================================

remove_action( 'wp_head',             'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles',     'print_emoji_styles' );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles',  'print_emoji_styles' );
remove_filter( 'the_content_feed',    'wp_staticize_emoji' );
remove_filter( 'comment_text_rss',    'wp_staticize_emoji' );
remove_filter( 'wp_mail',             'wp_staticize_emoji_for_email' );
add_filter( 'tiny_mce_plugins', function( $p ) { return array_diff( $p, array('wpemoji') ); });
add_filter( 'wp_resource_hints', function( $u, $r ) {
    if ( $r === 'dns-prefetch' ) return array_filter( $u, function($x){ return strpos($x,'s.w.org')===false; });
    return $u;
}, 10, 2 );

if ( ! function_exists('crea8iv_remove_block_css') ) {
    function crea8iv_remove_block_css() {
        wp_dequeue_style('wp-block-library'); wp_dequeue_style('wp-block-library-theme');
        wp_dequeue_style('classic-theme-styles'); wp_deregister_style('global-styles');
    }
    add_action('wp_enqueue_scripts','crea8iv_remove_block_css',100);
}

add_action('wp_enqueue_scripts',function(){
    if(!is_admin()&&!is_user_logged_in()) wp_deregister_style('dashicons');
},100);

if ( ! function_exists('crea8iv_remove_woo_scripts') ) {
    function crea8iv_remove_woo_scripts() {
        if(function_exists('is_woocommerce')&&!is_woocommerce()&&!is_cart()&&!is_checkout()&&!is_account_page()){
            foreach(array('woocommerce-general','woocommerce-layout','woocommerce-smallscreen','wc-block-style') as $s) wp_dequeue_style($s);
            foreach(array('wc-jquery-blockui-js','wc-add-to-cart-js','wc-js-cookie-js','woocommerce-js','sourcebuster-js-js','wc-order-attribution-js') as $s) wp_dequeue_script($s);
        }
    }
    add_action('wp_enqueue_scripts','crea8iv_remove_woo_scripts',99);
}

if ( ! function_exists('crea8iv_remove_metform_scripts') ) {
    function crea8iv_remove_metform_scripts() {
        $slug=isset(get_queried_object()->post_name)?get_queried_object()->post_name:'';
        if(!in_array($slug,array('contact','contact-us','get-started','book-a-call'),true)){
            foreach(array('htm-js','react-js','react-dom-js','wp-escape-html-js','wp-element-js','metform-app-js','cute-alert-js') as $s) wp_dequeue_script($s);
        }
    }
    add_action('wp_enqueue_scripts','crea8iv_remove_metform_scripts',99);
}

if ( ! function_exists('crea8iv_output_buffer_fix') ) {
    function crea8iv_output_buffer_fix($buf) {
        $l='https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
        if(substr_count($buf,$l)>1){
            $buf=str_replace('<script src="'.$l.'"></script>','',$buf);
            $buf=str_replace('<script src="'.$l.'">','',$buf);
            $buf=str_replace('</head>','<script src="'.$l.'"></script></head>',$buf);
        }
        $buf=str_replace('https://darkgray-eland-964548.hostingersite.com','https://crea8ivmedia.com',$buf);
        return $buf;
    }
}
if ( ! function_exists('crea8iv_start_output_buffer') ) {
    function crea8iv_start_output_buffer() { if(!is_admin()) ob_start('crea8iv_output_buffer_fix'); }
    add_action('template_redirect','crea8iv_start_output_buffer');
}

if ( ! function_exists('crea8iv_defer_safe_scripts') ) {
    function crea8iv_defer_safe_scripts($tag,$handle,$src) {
        if(is_admin()) return $tag;
        $d=array('xs_front_main_js','xs_social_custom','hostinger-reach-subscription-block-view','font-awesome-4-shim','elh-element-helper');
        if(!in_array($handle,$d,true)) return $tag;
        if(strpos($tag,'defer')!==false) return $tag;
        return str_replace('<script ','<script defer ',$tag);
    }
    add_filter('script_loader_tag','crea8iv_defer_safe_scripts',10,3);
}

add_filter('style_loader_tag',function($h,$handle){
    if(strpos($h,'fonts.googleapis.com')!==false){
        $h=str_replace("media='all'","media='print' onload=\"this.media='all'\"",$h);
        $h=str_replace('media="all"',"media='print' onload=\"this.media='all'\"",$h);
    }
    return $h;
},10,2);

add_action('send_headers',function(){
    if(!is_admin()){ header('Cache-Control: public, max-age=604800, stale-while-revalidate=86400',false); header('Vary: Accept-Encoding',false); }
});

remove_action('wp_head','wp_generator');
remove_action('wp_head','wlwmanifest_link');
remove_action('wp_head','rsd_link');
remove_action('wp_head','wp_shortlink_wp_head',10);
remove_action('wp_head','adjacent_posts_rel_link_wp_head',10);
remove_action('wp_head','wp_oembed_add_discovery_links');
remove_action('wp_head','rest_output_link_wp_head');
add_filter('xmlrpc_enabled','__return_false');
remove_action('wp_head','wp_pingback_header');
add_filter('heartbeat_settings',function($s){$s['interval']=60;return $s;});
add_filter('the_content',function($c){return preg_replace('/<iframe(?![^>]*loading=)/i','<iframe loading="lazy"',$c);},10);

add_filter('pre_option_elementor_css_print_method',         function(){return 'internal';});
add_filter('pre_option_elementor_optimized_assets_loading', function(){return '1';});
add_filter('pre_option_elementor_optimized_css_loading',    function(){return '1';});
add_filter('pre_option_elementor_load_fa4_shim',            function(){return '';});

if ( ! function_exists('crea8iv_preload_lcp') ) {
    function crea8iv_preload_lcp() {
        if(is_front_page()||is_home())
            echo '<link rel="preload" as="image" href="https://crea8ivmedia.com/wp-content/uploads/2026/04/48983e3d343694dd9b780b9651e8793d.jpg" fetchpriority="high">'."\n";
    }
    add_action('wp_head','crea8iv_preload_lcp',2);
}

if ( ! function_exists('crea8iv_remove_unused_scripts') ) {
    function crea8iv_remove_unused_scripts() {
        if(is_admin()) return;
        foreach(array('xs_front_main_js','xs_social_custom') as $s) wp_dequeue_script($s);
        foreach(array('xs_front_style','font-awesome-4-shim') as $s) wp_dequeue_style($s);
        wp_dequeue_script('font-awesome-4-shim');
    }
    add_action('wp_enqueue_scripts','crea8iv_remove_unused_scripts',100);
}
PHPCODE

echo "✅ Speed boost code added to functions.php"

# ─── STEP 2: Update Elementor options directly ───────────────
echo ""
echo "⚡ Updating Elementor performance settings..."
wp option update elementor_css_print_method "internal"
wp option update elementor_optimized_assets_loading "1"
wp option update elementor_optimized_css_loading "1"
wp option update elementor_load_fa4_shim ""
echo "✅ Elementor settings updated"

# ─── STEP 3: Fix staging domain in database ──────────────────
echo ""
echo "🔗 Fixing staging domain in database..."
wp search-replace 'https://darkgray-eland-964548.hostingersite.com' 'https://crea8ivmedia.com' --all-tables --report-changed-only
echo "✅ Staging domain replaced in database"

# ─── STEP 4: Fix FAQs duplicate title ────────────────────────
echo ""
echo "📄 Fixing FAQs page title..."
wp post meta update 31 _yoast_wpseo_title "Digital Marketing FAQs | Crea8iv Media Rawalpindi"
echo "✅ FAQs title fixed"

# ─── STEP 5: Install & activate LiteSpeed Cache ──────────────
echo ""
echo "📦 Installing LiteSpeed Cache..."
wp plugin install litespeed-cache --activate
echo "✅ LiteSpeed Cache installed and activated"

# ─── STEP 6: Configure LiteSpeed Cache ───────────────────────
echo ""
echo "⚙️  Configuring LiteSpeed Cache..."
wp option patch insert litespeed.conf cache-browser 1
wp option patch insert litespeed.conf cache 1
wp option patch insert litespeed.conf optm-css_min 1
wp option patch insert litespeed.conf optm-js_min 1
wp option patch insert litespeed.conf optm-js_defer 1
wp option patch insert litespeed.conf optm-img_lazy 1
wp option patch insert litespeed.conf optm-webp 1
wp option patch insert litespeed.conf optm-css_async 1
wp option patch insert litespeed.conf optm-google_font_async 1
wp option patch insert litespeed.conf img-lazy_placeholder 1
echo "✅ LiteSpeed Cache configured"

# ─── STEP 7: Regenerate Elementor CSS files ──────────────────
echo ""
echo "🎨 Regenerating Elementor CSS..."
wp elementor flush-css 2>/dev/null || echo "(Elementor CLI not available — regenerate manually)"

# ─── STEP 8: Flush all caches ────────────────────────────────
echo ""
echo "🧹 Flushing all caches..."
wp cache flush
wp litespeed-purge all 2>/dev/null || true
echo "✅ Cache flushed"

# ─── STEP 9: Regenerate Yoast sitemap ────────────────────────
echo ""
echo "🗺️  Regenerating Yoast sitemap..."
wp yoast index 2>/dev/null || true

echo ""
echo "============================================"
echo "🎉 ALL DONE! Summary:"
echo "  ✅ Speed boost code → functions.php"
echo "  ✅ Elementor → internal CSS embedding"
echo "  ✅ Staging domain → fixed in DB"
echo "  ✅ FAQs title → fixed"
echo "  ✅ LiteSpeed Cache → installed & configured"
echo "  ✅ All caches flushed"
echo "============================================"
echo ""
echo "Last manual step: Hostinger panel"
echo "  → Performance → Object Cache → Enable"
echo "  → Performance → CDN → Enable"

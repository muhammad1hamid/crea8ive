// ====================================================================
// CREA8IV MEDIA — SEO FIXES (safe to paste, never conflicts)
// All named functions are wrapped in function_exists() guards.
// No <?php tag needed — paste at the BOTTOM of functions.php
// ====================================================================

// ─── 1. FIX SITE NAME ────────────────────────────────────────────────
add_filter('bloginfo', function($output, $show) {
    if ($show === 'name' && $output === 'crea8ivmedia.com') {
        return 'Crea8iv Media';
    }
    return $output;
}, 10, 2);

add_filter('option_blogname', function($value) {
    if ($value === 'crea8ivmedia.com') {
        return 'Crea8iv Media';
    }
    return $value;
});

// ─── 2. NAV MENU LABELS FIX ──────────────────────────────────────────
if ( ! function_exists('crea8iv_fix_nav_labels') ) {
    function crea8iv_fix_nav_labels( $title, $item, $args, $depth ) {
        $label_map = array(
            'Growth Systems | Digital Marketing'      => 'Growth Systems',
            'Google Business Profile Rawalpindi'      => 'Google Business Profile',
            'Social Media Management Rawalpindi'      => 'Social Media Management',
            'Meta Ads Agency Rawalpindi'              => 'Meta Ads',
            'Google Ads Agency Rawalpindi'            => 'Google Ads',
            'Website Development Rawalpindi'          => 'Website Development',
            'Content Creation Agency Rawalpindi'      => 'Content Creation',
            'Marketing Consultation Rawalpindi'       => 'Consultation',
            'Digital Marketing Results Rawalpindi'    => 'Results',
            'Careers at Crea8iv Media'                => 'Careers',
            'About Us | Digital Marketing Agency'     => 'About',
            'Digital Marketing Agency Rawalpindi'     => 'Home',
            'Digital Marketing FAQs | Crea8iv Media'  => 'FAQs',
            'Digital Marketing Blog | Crea8iv Media'  => 'Blog',
            'Branding &#038; Creative'                => 'Branding & Creative',
        );
        foreach ( $label_map as $match => $replacement ) {
            if ( strpos( $title, $match ) !== false ) {
                return $replacement;
            }
        }
        return $title;
    }
    add_filter( 'nav_menu_item_title', 'crea8iv_fix_nav_labels', 10, 4 );
}

// ─── 3. LOCALBUSINESS SCHEMA ─────────────────────────────────────────
if ( ! function_exists('crea8iv_local_business_schema') ) {
    function crea8iv_local_business_schema() {
        $queried = get_queried_object();
        $slug = isset($queried->post_name) ? $queried->post_name : '';
        if ( ! ( is_front_page() || is_home() || in_array($slug, array('about','contact','our-services')) ) ) return;
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

// ─── 4. SERVICE SCHEMA ───────────────────────────────────────────────
if ( ! function_exists('crea8iv_service_schema') ) {
    function crea8iv_service_schema() {
        $queried = get_queried_object();
        $slug = isset($queried->post_name) ? $queried->post_name : '';
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
        if ( ! isset($services[$slug]) ) return;
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

// ─── 5. FAQ SCHEMA ───────────────────────────────────────────────────
if ( ! function_exists('crea8iv_faq_schema') ) {
    function crea8iv_faq_schema() {
        $queried = get_queried_object();
        $slug = isset($queried->post_name) ? $queried->post_name : '';
        if ( $slug !== 'faqs' ) return;
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

// ─── 6. FIX OG IMAGE ─────────────────────────────────────────────────
add_filter('wpseo_opengraph_image', function($url) {
    return str_replace('darkgray-eland-964548.hostingersite.com', 'crea8ivmedia.com', $url);
});
add_filter('wpseo_twitter_image', function($url) {
    return str_replace('darkgray-eland-964548.hostingersite.com', 'crea8ivmedia.com', $url);
});

// ─── 7. PRECONNECT HINTS ─────────────────────────────────────────────
if ( ! function_exists('crea8iv_preconnect_hints') ) {
    function crea8iv_preconnect_hints() {
        echo '<link rel="preconnect" href="https://fonts.googleapis.com">' . "\n";
        echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
        echo '<link rel="dns-prefetch" href="//connect.facebook.net">' . "\n";
        echo '<link rel="dns-prefetch" href="//www.googletagmanager.com">' . "\n";
    }
    add_action('wp_head', 'crea8iv_preconnect_hints', 1);
}

// ─── 8. REMOVE QUERY STRINGS FROM ASSETS ─────────────────────────────
if ( ! function_exists('crea8iv_remove_query_strings') ) {
    function crea8iv_remove_query_strings($src) {
        if ( strpos($src, '?ver=') ) {
            $src = remove_query_arg('ver', $src);
        }
        return $src;
    }
    add_filter('style_loader_src',  'crea8iv_remove_query_strings', 10, 2);
    add_filter('script_loader_src', 'crea8iv_remove_query_strings', 10, 2);
}

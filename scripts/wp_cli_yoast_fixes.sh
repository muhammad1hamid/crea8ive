#!/bin/bash
# ============================================================
# Crea8iv Media — Yoast SEO Title & Meta Description Fix
# Run via Hostinger SSH / WP-CLI terminal
# ============================================================
# SSH into Hostinger, cd to your WordPress root, then run:
# bash wp_cli_yoast_fixes.sh

# First: fix WordPress Site Title (removes " - crea8ivmedia.com" suffix)
wp option update blogname "Crea8iv Media"
echo "✅ Site name updated to 'Crea8iv Media'"

# ─── YOAST TITLE FIXES (per-page) ────────────────────────────────────────────

wp post meta update 2206  _yoast_wpseo_title "Digital Marketing Agency Rawalpindi | Crea8iv Media"
wp post meta update 9932  _yoast_wpseo_title "Meta Ads Agency Rawalpindi | Facebook Lead Generation"
wp post meta update 10222 _yoast_wpseo_title "Social Media Management Rawalpindi | Crea8iv Media"
wp post meta update 10281 _yoast_wpseo_title "Google Ads Agency Rawalpindi | PPC Leads | Crea8iv"
wp post meta update 10311 _yoast_wpseo_title "Website Development Rawalpindi | Crea8iv Media"
wp post meta update 10317 _yoast_wpseo_title "Branding Agency Rawalpindi | Logo & Identity | Crea8iv"
wp post meta update 10357 _yoast_wpseo_title "Google Business Profile Rawalpindi | Rank #1 Maps"
wp post meta update 10382 _yoast_wpseo_title "Content Creation Agency Rawalpindi | Crea8iv Media"
wp post meta update 10387 _yoast_wpseo_title "Marketing Consultation Rawalpindi | Crea8iv Media"
wp post meta update 10392 _yoast_wpseo_title "Digital Marketing Results Rawalpindi | Crea8iv Media"
wp post meta update 29    _yoast_wpseo_title "Digital Marketing Blog | Crea8iv Media Rawalpindi"
wp post meta update 9995  _yoast_wpseo_title "Careers at Crea8iv Media | Rawalpindi Marketing Jobs"
wp post meta update 9852  _yoast_wpseo_title "Growth Systems | Digital Marketing Rawalpindi"
wp post meta update 23    _yoast_wpseo_title "About Us | Digital Marketing Agency Rawalpindi"
wp post meta update 10608 _yoast_wpseo_title "AI Digital Marketing Course Rawalpindi | Crea8iv"
wp post meta update 25    _yoast_wpseo_title "Our Services | Digital Marketing Rawalpindi"
wp post meta update 27    _yoast_wpseo_title "Meet the Team | Digital Marketing Agency Rawalpindi"
wp post meta update 31    _yoast_wpseo_title "Digital Marketing FAQs | Crea8iv Media Rawalpindi"
wp post meta update 33    _yoast_wpseo_title "Digital Marketing Packages & Pricing | Crea8iv Media"
wp post meta update 37    _yoast_wpseo_title "Contact Crea8iv Media | Digital Marketing Rawalpindi"

echo "✅ All Yoast title tags updated"

# ─── YOAST META DESCRIPTION FIXES ────────────────────────────────────────────

wp post meta update 2206  _yoast_wpseo_metadesc "Rawalpindi digital marketing agency building lead systems via Meta Ads, Google Ads & GMB. Get qualified leads consistently. Book a free strategy call today."
wp post meta update 9932  _yoast_wpseo_metadesc "Run profitable Facebook & Instagram ads with Crea8iv Media in Rawalpindi. We build Meta Ads campaigns that send qualified buyers straight to your WhatsApp."
wp post meta update 10222 _yoast_wpseo_metadesc "Social media management for Rawalpindi & Islamabad businesses. High-converting reels, posts & content strategies that build brand authority and drive leads."
wp post meta update 10281 _yoast_wpseo_metadesc "Expert Google Ads in Rawalpindi & Islamabad. Crea8iv Media runs high-intent PPC campaigns that reach buyers actively searching for your service. Get started."
wp post meta update 10311 _yoast_wpseo_metadesc "Website development in Rawalpindi & Islamabad. Fast, SEO-ready, mobile-optimized sites that generate leads and convert visitors into paying customers."
wp post meta update 10317 _yoast_wpseo_metadesc "Branding & creative design in Rawalpindi & Islamabad. Crea8iv Media builds identities that make your business look credible, premium & impossible to ignore."
wp post meta update 10357 _yoast_wpseo_metadesc "Dominate Google Maps in Rawalpindi & Islamabad with expert GMB optimization. Crea8iv Media ranks your business at the top so local buyers find you first."
wp post meta update 10382 _yoast_wpseo_metadesc "Content creation for Rawalpindi & Islamabad businesses. Scroll-stopping reels, posts & copy that builds brand authority and generates real leads. Get started."
wp post meta update 10387 _yoast_wpseo_metadesc "Book a marketing strategy consultation with Crea8iv Media in Rawalpindi. Get a growth roadmap, marketing audit & actionable plan to generate more leads."
wp post meta update 10392 _yoast_wpseo_metadesc "Real results from Crea8iv Media's digital marketing systems. Case studies from Rawalpindi & Islamabad businesses — lead growth, GMB rankings & Meta Ads ROAS."
wp post meta update 29    _yoast_wpseo_metadesc "Digital marketing insights from Crea8iv Media. Tips, guides & case studies on Meta Ads, Google Ads, SEO, GMB & social media for Rawalpindi businesses."
wp post meta update 9995  _yoast_wpseo_metadesc "Join Crea8iv Media in Rawalpindi. Explore careers & internships in digital marketing, content creation, paid ads, and creative design. Apply now."
wp post meta update 9852  _yoast_wpseo_metadesc "Explore integrated growth systems from Crea8iv Media combining SEO, paid ads, websites, branding & automation for scalable local business growth in Rawalpindi."
wp post meta update 23    _yoast_wpseo_metadesc "Learn how Crea8iv Media helps brands in Rawalpindi & Islamabad grow with strategy, paid ads, local SEO, content creation & lead generation systems."
wp post meta update 10608 _yoast_wpseo_metadesc "Join Crea8iv Media's AI digital marketing course in Rawalpindi. Learn SEO, Meta Ads, Google Ads, content & AI automation with real client projects."
wp post meta update 25    _yoast_wpseo_metadesc "Explore Crea8iv Media's digital marketing services for Rawalpindi & Islamabad businesses — Meta Ads, Google Ads, SEO, social media, websites & branding."
wp post meta update 27    _yoast_wpseo_metadesc "Meet the Crea8iv Media team — the specialists behind SEO, Meta Ads, content, websites & local business growth in Rawalpindi and Islamabad."
wp post meta update 31    _yoast_wpseo_metadesc "Answers to common questions about digital marketing in Rawalpindi. Learn about Meta Ads, Google Ads, SEO, pricing & how Crea8iv Media's systems work."
wp post meta update 33    _yoast_wpseo_metadesc "Transparent digital marketing packages for Rawalpindi businesses. From PKR 50,000/month — Meta Ads, SEO, GMB & social media included. View all packages."
wp post meta update 37    _yoast_wpseo_metadesc "Ready to grow? Contact Crea8iv Media — Rawalpindi's top digital marketing agency. Expert Meta Ads, SEO, GMB & automation. Book a free strategy session today."

echo "✅ All meta descriptions updated"

# ─── NAV MENU LABEL FIXES (restore short names in navigation) ────────────────
echo ""
echo "Fixing nav menu labels..."

wp post meta update 9855  post_title "Growth Systems"
wp post meta update 10381 post_title "Google Business Profile"
wp post meta update 10224 post_title "Social Media Management"
wp post meta update 9934  post_title "Meta Ads"
wp post meta update 10310 post_title "Google Ads"
wp post meta update 10320 post_title "Website Development"
wp post meta update 10396 post_title "Content Creation"
wp post meta update 10395 post_title "Consultation"
wp post meta update 10394 post_title "Results"
wp post meta update 9997  post_title "Careers"
wp post meta update 1702  post_title "About"
wp post meta update 1719  post_title "Home"
wp post meta update 1707  post_title "FAQs"
wp post meta update 1703  post_title "Blog"

# Update the actual post_title directly in the posts table for nav menu items
wp post update 9855  --post_title="Growth Systems"
wp post update 10381 --post_title="Google Business Profile"
wp post update 10224 --post_title="Social Media Management"
wp post update 9934  --post_title="Meta Ads"
wp post update 10310 --post_title="Google Ads"
wp post update 10320 --post_title="Website Development"
wp post update 10396 --post_title="Content Creation"
wp post update 10395 --post_title="Consultation"
wp post update 10394 --post_title="Results"
wp post update 9997  --post_title="Careers"
wp post update 1702  --post_title="About"
wp post update 1719  --post_title="Home"
wp post update 1707  --post_title="FAQs"
wp post update 1703  --post_title="Blog"

echo "✅ Nav menu labels restored to short names"

# ─── FLUSH YOAST CACHE ───────────────────────────────────────────────────────
wp cache flush
echo "✅ Cache flushed"

# Verify a few pages
echo ""
echo "=== VERIFICATION ==="
wp post meta get 2206  _yoast_wpseo_title
wp post meta get 9932  _yoast_wpseo_title
wp post meta get 10222 _yoast_wpseo_title
wp post meta get 2206  _yoast_wpseo_metadesc

echo ""
echo "🎉 All done! Run Yoast SEO indexing to regenerate the sitemap:"
wp yoast index

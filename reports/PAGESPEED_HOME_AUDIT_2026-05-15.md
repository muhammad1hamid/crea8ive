# Homepage Speed Audit

Date: `2026-05-15`
Site: `https://crea8ivmedia.com/`
Page reviewed: homepage

## Snapshot

- Hostinger desktop score shown by the live screenshot: `40`
- Reported metrics in the screenshot:
  - `Total Blocking Time`: `2240 ms`
  - `Largest Contentful Paint`: `3.7 s`
  - `Speed Index`: `4.4 s`
  - `First Contentful Paint`: `0.9 s`
  - `Cumulative Layout Shift`: `0`

## What the metrics mean

- `FCP 0.9 s` is already good, so the page starts showing something quickly.
- `CLS 0` is good, so layout stability is not the problem.
- The main problem is `TBT 2240 ms`, which means too much JavaScript is blocking the browser after the first paint.
- `LCP 3.7 s` and `Speed Index 4.4 s` suggest the main visual area still takes too long to fully settle because the page is carrying too many heavy assets.

## Main reasons the score is low

### 1. Too many frontend files

Homepage totals from the live HTML:

- `49` CSS files
- `63` JS files
- `50` image references
- `74` script tags
- `22` style tags

This is the biggest overall reason the score stays low.

### 2. Heavy JavaScript is causing the high blocking time

Largest JS files found on the homepage:

- `605 KB` `metform/public/assets/js/app.js`
- `384 KB` `unpkg.com/@lottiefiles/lottie-player`
- `148 KB` `themes/reliable/assets/js/swiper.min.js`
- `129 KB` `wp-includes/js/dist/vendor/react-dom.min.js`
- `86 KB` `cdn.trustindex.io/loader.js`
- `80 KB` `themes/reliable/assets/js/bootstrap-min.js`
- `72 KB` `themes/reliable/assets/js/gsap.min.js`

Known JS payload sampled from the page: about `2.24 MB`

This aligns directly with the `2240 ms` blocking time.

### 3. Heavy CSS is slowing the main render

Largest CSS files found on the homepage:

- `466 KB` `elementskit-lite/widgets/init/assets/css/widget-styles.css`
- `306 KB` `themes/reliable/assets/css/reliable-core.css`
- `195 KB` `themes/reliable/assets/css/bootstrap.min.css`
- `116 KB` `metform/public/assets/css/metform-ui.css`
- `96 KB` `themes/reliable/assets/css/fontawesome-min.css`
- `87 KB` `woocommerce/assets/css/woocommerce.css`
- `79 KB` `reliable-core/assets/css/font-awesome.min.css`
- `68 KB` `wp-social/assets/css/frontend.css`

Known CSS payload sampled from the page: about `2.21 MB`

### 4. Plugin bloat on the homepage

Asset mix by plugin on the live homepage:

- CSS:
  - `14` theme/other
  - `10` Elementor
  - `7` Elementor-generated upload CSS files
  - `4` WooCommerce
  - `4` MetForm
  - `3` Reliable Core
  - `2` WP Social
  - `2` ElementsKit Lite

- JS:
  - `36` theme/other
  - `8` WP core
  - `6` WooCommerce
  - `4` Elementor
  - `3` MetForm
  - `2` WP Social
  - `2` ElementsKit Lite

The homepage is loading marketing, form, social, ecommerce, animation, and theme frameworks all at once.

### 5. Too many external domains and third-party assets

Homepage requests include:

- `55` references to `darkgray-eland-964548.hostingersite.com`
- `14` requests touching `fonts.googleapis.com`
- `4` image references from `images.unsplash.com`
- multiple requests to `assets*.lottiefiles.com`
- `2` requests to `cdn.trustindex.io`
- `1` `googletagmanager.com`
- `1` `connect.facebook.net`

This hurts caching consistency and connection overhead.

### 6. Old staging-domain assets are still on the homepage

Even though canonicals are fixed, the homepage HTML still contains many references to the old Hostinger preview domain:

- images
- SVGs
- preview links
- internal links

The sampled homepage HTML still showed `57` staging-domain references.

This is both a speed issue and a cleanup issue.

### 7. Lottie animation usage is high

The homepage HTML contains many Lottie markers:

- `52` matches for `lottie`

That does not automatically mean every animation is wrong, but it strongly suggests animation payload is part of the blocking/render cost.

## What is already healthy

- LiteSpeed page caching is active on the homepage.
- `/our-services/` is also cached.
- Static CSS assets are already returning browser cache headers.
- Layout shift is already stable.
- The low score is not mainly caused by missing cache.

## Highest-impact fixes in order

### Safe and high impact

1. Replace all remaining `darkgray-eland-964548.hostingersite.com` homepage asset and link references with `crea8ivmedia.com`
2. Stop loading unused WooCommerce assets on the homepage if the homepage is not using shop/cart behavior
3. Stop loading MetForm assets on the homepage unless the homepage actually needs the form there
4. Reduce Lottie usage or load only the animations that are truly visible above the fold
5. Reduce duplicate Font Awesome and framework CSS loading

### Medium risk but high payoff

6. Defer or delay non-critical theme animation scripts like Swiper, GSAP, ScrollTrigger, Isotope, Magnific Popup, and WOW where possible
7. Review whether WP Social, Trustindex, and extra marketing widgets need to load on the homepage
8. Trim Elementor and ElementsKit widgets used in the hero and above-the-fold sections

### Last step after cleanup

9. Re-test with LiteSpeed page optimization changes only after the homepage asset stack is lighter

## Best next move

The safest high-impact next action is:

`Remove the old staging-domain asset references from the homepage and stop unnecessary homepage plugin assets from loading.`

That improves score without changing the visible design language.

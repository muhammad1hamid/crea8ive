const WP_URL = 'https://crea8ivmedia.com/wp-json/wp/v2';
const slugs = [
  'growth-systems',
  'google-business-profile-growth',
  'social-media-management',
  'meta-ads',
  'google-ads',
  'website-development',
  'branding-and-creative',
  'content-creation',
  'consultation',
  'results',
  'about',
  'pricing',
  'courses',
  'careers',
  'contact'
];

async function checkSlugs() {
  for (const slug of slugs) {
    try {
      const res = await fetch(`${WP_URL}/pages?slug=${slug}`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        console.log(`✅ Slug "${slug}" found! Title: ${data[0].title.rendered}`);
      } else {
        // Try posts
        const postRes = await fetch(`${WP_URL}/posts?slug=${slug}`);
        const postData = await postRes.json();
        if (Array.isArray(postData) && postData.length > 0) {
          console.log(`✅ Slug "${slug}" found as POST! Title: ${postData[0].title.rendered}`);
        } else {
          console.log(`❌ Slug "${slug}" NOT found in pages or posts!`);
        }
      }
    } catch (err) {
      console.error(`Error checking slug "${slug}":`, err.message);
    }
  }
}

checkSlugs();

import re

with open('crea8ivmedia.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract HTML
html_match = re.search(r'(<section class="cm-hero-ai">.*?</section>)', content, re.DOTALL)
if html_match:
    html = html_match.group(1)
else:
    print("HTML not found")
    exit(1)

# Extract CSS
css_match = re.search(r'(/\* HERO BASE \*/.*?)\s*</style>', content, re.DOTALL)
if css_match:
    css = css_match.group(1)
else:
    print("CSS not found")
    exit(1)

# Convert HTML to JSX
jsx = html.replace('class=', 'className=')
jsx = jsx.replace('<!--', '{/*').replace('-->', '*/}')
jsx = jsx.replace('<br>', '<br />')
jsx = jsx.replace('fetchpriority="high"', 'fetchPriority="high"')

# For tags that need closing
jsx = re.sub(r'(<img[^>]*?)(?<!/)>', r'\1 />', jsx)

# For style attribute (just a quick fix for one inline style)
jsx = jsx.replace('style="color:#fe6a09;"', 'style={{ color: "#fe6a09" }}')

# Write CSS
with open('src/components/HeroSection.css', 'w', encoding='utf-8') as f:
    f.write(css)

# Write JSX
tsx_content = f"""import React from 'react';
import './HeroSection.css';

export default function HeroSection() {{
  return (
    <>
      {jsx}
    </>
  );
}}
"""
with open('src/components/HeroSection.tsx', 'w', encoding='utf-8') as f:
    f.write(tsx_content)

print("HeroSection generated successfully.")

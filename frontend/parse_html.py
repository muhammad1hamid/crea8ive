import urllib.request
from bs4 import BeautifulSoup
import sys

def analyze_html(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    # Extract nav items
    nav = soup.find('nav')
    print("=== NAVBAR ===")
    if nav:
        for item in nav.find_all('a'):
            print(item.text.strip(), item.get('href'))
    
    # Extract sections
    print("\n=== SECTIONS ===")
    sections = soup.find_all(['section', 'div'], class_=lambda c: c and ('elementor-section' in c))
    for i, sec in enumerate(sections[:10]):
        h_tags = sec.find_all(['h1', 'h2', 'h3'])
        p_tags = sec.find_all('p')
        print(f"\nSection {i+1}:")
        if h_tags:
            print("Headings:", [h.text.strip() for h in h_tags])
        if p_tags:
            print("Paragraphs:", [p.text.strip()[:100] for p in p_tags])

if __name__ == '__main__':
    analyze_html('crea8ivmedia.html')

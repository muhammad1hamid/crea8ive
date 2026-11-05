from html.parser import HTMLParser

class HeroParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_hero = False
        self.hero_html = []
        self.section_count = 0
        self.depth = 0

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        classes = attrs_dict.get('class', '')
        
        # Elementor first section is usually the hero
        if tag == 'section' and 'elementor-section' in classes:
            self.section_count += 1
            if self.section_count == 1:
                self.in_hero = True
                self.depth = 1
        elif self.in_hero:
            self.depth += 1
            
        if self.in_hero:
            attr_str = ' '.join(f'{k}="{v}"' for k, v in attrs)
            self.hero_html.append(f"<{tag} {attr_str}>")

    def handle_endtag(self, tag):
        if self.in_hero:
            self.hero_html.append(f"</{tag}>")
            self.depth -= 1
            if self.depth == 0:
                self.in_hero = False

    def handle_data(self, data):
        if self.in_hero:
            self.hero_html.append(data)

parser = HeroParser()
with open('crea8ivmedia.html', 'r', encoding='utf-8') as f:
    parser.feed(f.read())

print(''.join(parser.hero_html)[:2000])

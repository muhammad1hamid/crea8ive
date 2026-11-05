from html.parser import HTMLParser

class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_nav = False
        self.nav_items = []
        self.current_data = []

    def handle_starttag(self, tag, attrs):
        if tag == 'nav':
            self.in_nav = True
        elif self.in_nav and tag == 'a':
            pass

    def handle_endtag(self, tag):
        if tag == 'nav':
            self.in_nav = False
        elif self.in_nav and tag == 'a':
            text = ''.join(self.current_data).strip()
            if text:
                self.nav_items.append(text)
            self.current_data = []

    def handle_data(self, data):
        if self.in_nav:
            self.current_data.append(data)

parser = MyHTMLParser()
with open('crea8ivmedia.html', 'r', encoding='utf-8') as f:
    parser.feed(f.read())

print("=== Nav Items ===")
for item in parser.nav_items:
    print(item)

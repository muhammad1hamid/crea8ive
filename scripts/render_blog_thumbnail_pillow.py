#!/usr/bin/env python3
"""Fallback renderer for branded blog covers when headless Chrome is unavailable."""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

src, dst, title, label = sys.argv[1:5]
W, H = 1280, 720
base = Image.open(src).convert("RGB")
ratio = max(W / base.width, H / base.height)
base = base.resize((round(base.width * ratio), round(base.height * ratio)), Image.Resampling.LANCZOS)
left = (base.width - W) // 2
top = (base.height - H) // 2
base = base.crop((left, top, left + W, top + H)).filter(ImageFilter.UnsharpMask(radius=2, percent=115, threshold=3)).convert("RGBA")
shade = Image.new("RGBA", (W, H), (0, 0, 0, 0))
pixels = shade.load()
for x in range(W):
    strength = int(185 * max(0, 1 - x / 800) ** 1.35)
    for y in range(H): pixels[x, y] = (0, 0, 0, strength)
base = Image.alpha_composite(base, shade)
draw = ImageDraw.Draw(base)
regular = "/System/Library/Fonts/Supplemental/Arial.ttf"
bold = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
def f(path, size): return ImageFont.truetype(path, size)
draw.ellipse((40, 34, 47, 41), fill="#FC6A03")
label_font = f(regular, 18)
label_box = draw.textbbox((0, 0), label, font=label_font)
draw.rounded_rectangle((72, 494, 96 + label_box[2], 530), radius=18, fill=(8, 8, 8, 120), outline=(252, 106, 3, 105), width=1)
draw.text((84, 502), label, font=label_font, fill=(255, 244, 235, 235))
title_font = f(regular, 52 if len(title) <= 28 else 44)
words, lines, current = title.split(), [], ""
for word in words:
    candidate = (current + " " + word).strip()
    if draw.textlength(candidate, font=title_font) <= 610: current = candidate
    else: lines.append(current); current = word
if current: lines.append(current)
y = 548
for line in lines:
    draw.text((72, y), line, font=title_font, fill="white", stroke_width=1, stroke_fill=(0, 0, 0, 160))
    y += 58
draw.rounded_rectangle((72, y + 8, 148, y + 11), radius=2, fill="#FC6A03")
Path(dst).parent.mkdir(parents=True, exist_ok=True)
base.convert("RGB").save(dst, "WEBP", quality=88, method=6)

from __future__ import annotations

import math
import shutil
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "project/assets/blog-covers-2026-premium/source"
OUTPUT_DIR = ROOT / "project/assets/blog-covers-2026-premium/output"
PUBLIC_JUNE = ROOT / "frontend/public/wp-content/uploads/2026/06"
PUBLIC_JULY = ROOT / "frontend/public/wp-content/uploads/2026/07"

W, H = 1200, 675
ORANGE = (255, 115, 16, 255)
ORANGE_SOFT = (255, 154, 70, 255)
CREAM = (255, 225, 196, 255)
GREEN = (39, 198, 124, 255)
BLUE = (82, 157, 255, 255)
WHITE = (255, 255, 255, 255)

FONT_REGULAR = "/System/Library/Fonts/HelveticaNeue.ttc"
FONT_MONO = "/System/Library/Fonts/SFNSMono.ttf"


def font(size: int, mono: bool = False) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT_MONO if mono else FONT_REGULAR, size=size)


def cover_crop(img: Image.Image, size: tuple[int, int]) -> Image.Image:
    img = img.convert("RGB")
    sw, sh = img.size
    tw, th = size
    scale = max(tw / sw, th / sh)
    nw, nh = int(sw * scale), int(sh * scale)
    img = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = max(0, (nw - tw) // 2)
    top = max(0, (nh - th) // 2)
    return img.crop((left, top, left + tw, top + th))


def rounded_rect_mask(size: tuple[int, int], radius: int) -> Image.Image:
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0] - 1, size[1] - 1), radius=radius, fill=255)
    return mask


def paste_layer(base: Image.Image, layer: Image.Image) -> None:
    base.alpha_composite(layer)


def linear_gradient(direction: str, stops: list[tuple[float, tuple[int, int, int, int]]]) -> Image.Image:
    length = W if direction == "x" else H
    strip = Image.new("RGBA", (length, 1), (0, 0, 0, 0))
    pix = strip.load()
    for x in range(length):
        t = x / (length - 1)
        for i in range(len(stops) - 1):
            if stops[i][0] <= t <= stops[i + 1][0]:
                span = stops[i + 1][0] - stops[i][0]
                local = 0 if span == 0 else (t - stops[i][0]) / span
                c0, c1 = stops[i][1], stops[i + 1][1]
                pix[x, 0] = tuple(int(c0[j] + (c1[j] - c0[j]) * local) for j in range(4))
                break
    if direction == "x":
        return strip.resize((W, H), Image.Resampling.BICUBIC)
    return strip.rotate(90, expand=True).resize((W, H), Image.Resampling.BICUBIC)


def radial_glow(cx: int, cy: int, radius: int, color: tuple[int, int, int, int]) -> Image.Image:
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    for r in range(radius, 0, -10):
        alpha = int(color[3] * (1 - r / radius) ** 1.7)
        draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(*color[:3], alpha))
    return layer.filter(ImageFilter.GaussianBlur(18))


def glass(draw: ImageDraw.ImageDraw, xy: tuple[int, int, int, int], radius: int = 24) -> None:
    draw.rounded_rectangle(xy, radius=radius, fill=(15, 12, 10, 142), outline=(255, 115, 16, 170), width=2)
    x1, y1, x2, y2 = xy
    draw.rounded_rectangle((x1 + 1, y1 + 1, x2 - 1, y2 - 1), radius=radius - 1, outline=(255, 255, 255, 34), width=1)


def draw_frame(base: Image.Image, category: str) -> None:
    draw = ImageDraw.Draw(base)
    margin = 28
    draw.rounded_rectangle((margin, margin, W - margin, H - margin), radius=34, outline=(255, 115, 16, 210), width=2)
    draw.rounded_rectangle((margin + 12, margin + 12, W - margin - 12, H - margin - 12), radius=25, outline=(255, 255, 255, 96), width=1)

    pill = (64, 56, 420, 112)
    draw.rounded_rectangle(pill, radius=28, fill=(13, 10, 8, 215), outline=(255, 115, 16, 205), width=2)
    draw.text((92, 73), category.upper(), fill=CREAM, font=font(22, mono=True), spacing=8)

    draw.line((W - 250, 82, W - 90, 82), fill=ORANGE, width=3)
    draw.line((70, H - 78, 260, H - 78), fill=ORANGE, width=3)
    draw.text((70, H - 63), "CREA8IV MEDIA", fill=CREAM, font=font(15, mono=True))


def draw_chart(draw: ImageDraw.ImageDraw, x: int, y: int, w: int, h: int) -> None:
    glass(draw, (x, y, x + w, y + h), 22)
    base = y + h - 34
    values = [0.38, 0.55, 0.48, 0.72, 0.62, 0.84, 0.68]
    bw = w // 12
    points = []
    for i, v in enumerate(values):
        bx = x + 34 + i * ((w - 80) // (len(values) - 1))
        by = int(base - v * (h - 74))
        points.append((bx, by))
        draw.rounded_rectangle((bx - bw // 2, by, bx + bw // 2, base), radius=7, fill=(255, 115, 16, 190))
    draw.line(points, fill=ORANGE_SOFT, width=4)
    for p in points:
        draw.ellipse((p[0] - 5, p[1] - 5, p[0] + 5, p[1] + 5), fill=ORANGE_SOFT)
    draw.line((x + 30, base, x + w - 28, base), fill=(255, 255, 255, 56), width=1)


def draw_phone(draw: ImageDraw.ImageDraw, x: int, y: int, w: int = 128, h: int = 260) -> None:
    draw.rounded_rectangle((x, y, x + w, y + h), radius=28, fill=(17, 14, 12, 210), outline=(255, 115, 16, 210), width=3)
    draw.rounded_rectangle((x + 36, y + 16, x + w - 36, y + 21), radius=4, fill=(255, 255, 255, 120))
    colors = [ORANGE, GREEN, (207, 190, 178, 255), ORANGE]
    for i, c in enumerate(colors):
        yy = y + 58 + i * 48
        draw.rounded_rectangle((x + 26, yy, x + w - 26, yy + 25), radius=12, fill=c)
    draw.ellipse((x + w // 2 - 14, y + h - 38, x + w // 2 + 14, y + h - 10), fill=ORANGE)


def draw_social_list(draw: ImageDraw.ImageDraw, x: int, y: int, w: int, h: int) -> None:
    glass(draw, (x, y, x + w, y + h), 20)
    labels = ["F", "IG", "WA"]
    for i, label in enumerate(labels):
        yy = y + 34 + i * 45
        draw.ellipse((x + 26, yy - 13, x + 52, yy + 13), fill=ORANGE)
        draw.text((x + 35, yy - 9), label, fill=WHITE, font=font(10, mono=True))
        draw.rounded_rectangle((x + 68, yy - 7, x + w - 38, yy + 7), radius=6, fill=(255, 184, 110, 186))


def draw_reviews(draw: ImageDraw.ImageDraw, x: int, y: int, w: int, h: int) -> None:
    glass(draw, (x, y, x + w, y + h), 22)
    for i in range(5):
        cx = x + 42 + i * 44
        draw.regular_polygon((cx, y + 48, 14), n_sides=5, rotation=-math.pi / 2, fill=(255, 184, 61, 255))
    draw.text((x + 34, y + 86), "trusted customer proof", fill=CREAM, font=font(15))
    draw.text((x + 34, y + 112), "reviews -> calls -> visits", fill=(255, 255, 255, 150), font=font(12, mono=True))


def draw_map_pins(draw: ImageDraw.ImageDraw, x: int, y: int) -> None:
    pts = [(x, y), (x + 120, y + 40), (x + 250, y - 10), (x + 330, y + 82), (x + 440, y + 20)]
    draw.line(pts, fill=(255, 115, 16, 116), width=3)
    for px, py in pts:
        draw.ellipse((px - 13, py - 13, px + 13, py + 13), fill=ORANGE)
        draw.ellipse((px - 5, py - 5, px + 5, py + 5), fill=(20, 14, 10, 255))


def draw_code(draw: ImageDraw.ImageDraw, x: int, y: int, w: int, h: int) -> None:
    glass(draw, (x, y, x + w, y + h), 22)
    for i, c in enumerate([ORANGE, (255, 214, 112, 255), GREEN]):
        draw.ellipse((x + 28 + i * 28, y + 28, x + 42 + i * 28, y + 42), fill=c)
    for i in range(6):
        yy = y + 72 + i * 24
        ln = w - 80 - (i % 3) * 55
        draw.rounded_rectangle((x + 32, yy, x + 32 + ln, yy + 4), radius=2, fill=(255, 224, 196, 118))
        if i in (1, 4):
            draw.rounded_rectangle((x + 32, yy + 12, x + 120, yy + 16), radius=2, fill=(255, 115, 16, 165))


def draw_compare(draw: ImageDraw.ImageDraw, x: int, y: int, w: int, h: int) -> None:
    glass(draw, (x, y, x + w, y + h), 22)
    draw.line((x + w // 2, y + 28, x + w // 2, y + h - 28), fill=(255, 255, 255, 80), width=1)
    draw.text((x + 36, y + 42), "SEARCH", fill=CREAM, font=font(16, mono=True))
    draw.text((x + w // 2 + 36, y + 42), "SOCIAL", fill=CREAM, font=font(16, mono=True))
    draw.text((x + 50, y + 96), "intent", fill=WHITE, font=font(29))
    draw.text((x + w // 2 + 50, y + 96), "reach", fill=WHITE, font=font(29))


def draw_funnel(draw: ImageDraw.ImageDraw, x: int, y: int, w: int, h: int) -> None:
    glass(draw, (x, y, x + w, y + h), 22)
    items = ["AUDIENCE", "OFFER", "CHANNEL", "ROI"]
    for i, item in enumerate(items):
        yy = y + 36 + i * 42
        draw.ellipse((x + 34, yy - 8, x + 50, yy + 8), fill=ORANGE)
        draw.text((x + 64, yy - 11), item, fill=CREAM, font=font(14, mono=True))
        draw.line((x + 172, yy, x + w - 38 - i * 22, yy), fill=(255, 230, 204, 120), width=2)


def draw_calculator(draw: ImageDraw.ImageDraw, x: int, y: int) -> None:
    draw.rounded_rectangle((x, y, x + 138, y + 210), radius=26, fill=(19, 15, 12, 220), outline=(255, 115, 16, 220), width=3)
    draw.rounded_rectangle((x + 22, y + 24, x + 116, y + 58), radius=8, fill=(255, 217, 192, 170))
    draw.text((x + 34, y + 31), "PKR", fill=ORANGE, font=font(15, mono=True))
    for row in range(4):
        for col in range(3):
            bx = x + 25 + col * 35
            by = y + 82 + row * 29
            draw.rounded_rectangle((bx, by, bx + 21, by + 18), radius=5, fill=(255, 122, 43, 205))


def draw_network(draw: ImageDraw.ImageDraw, cx: int, cy: int) -> None:
    pts = [(cx - 125, cy + 26), (cx - 60, cy - 38), (cx + 28, cy - 54), (cx + 112, cy - 5), (cx + 70, cy + 72), (cx - 36, cy + 85)]
    draw.line(pts + [pts[0]], fill=(255, 115, 16, 130), width=3)
    for px, py in pts:
        draw.ellipse((px - 11, py - 11, px + 11, py + 11), fill=ORANGE)
    draw.rounded_rectangle((cx - 34, cy + 10, cx + 34, cy + 48), radius=16, fill=(18, 14, 12, 225), outline=(255, 184, 110, 180), width=2)
    draw.text((cx - 13, cy + 18), "AI", fill=WHITE, font=font(15, mono=True))


def render_cover(source: Path, output: Path, category: str, theme: str) -> None:
    source_img = Image.open(source)
    base = cover_crop(source_img, (W, H)).convert("RGBA")
    base = base.filter(ImageFilter.UnsharpMask(radius=2, percent=118, threshold=3))
    paste_layer(base, Image.new("RGBA", (W, H), (0, 0, 0, 58)))
    paste_layer(base, linear_gradient("x", [(0, (0, 0, 0, 82)), (0.55, (0, 0, 0, 12)), (1, (110, 42, 9, 138))]))
    paste_layer(base, linear_gradient("y", [(0, (0, 0, 0, 20)), (0.72, (0, 0, 0, 0)), (1, (0, 0, 0, 115))]))
    paste_layer(base, radial_glow(W - 120, 120, 360, (255, 115, 16, 95)))
    paste_layer(base, radial_glow(100, H - 30, 280, (255, 255, 255, 38)))

    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    draw_frame(overlay, category)

    if theme == "dashboard":
        draw_chart(draw, 760, 265, 330, 210)
        draw_social_list(draw, 710, 145, 320, 145)
    elif theme == "phone":
        draw_phone(draw, 820, 168)
        draw_social_list(draw, 560, 300, 300, 150)
    elif theme == "reviews":
        draw_reviews(draw, 670, 150, 330, 150)
        draw_phone(draw, 710, 330, 120, 230)
    elif theme == "map":
        draw_map_pins(draw, 580, 220)
        draw_reviews(draw, 760, 360, 320, 145)
    elif theme == "code":
        draw_code(draw, 640, 140, 390, 215)
        draw_calculator(draw, 865, 385)
    elif theme == "compare":
        draw_compare(draw, 650, 160, 360, 170)
        draw_funnel(draw, 690, 380, 360, 190)
    elif theme == "funnel":
        draw_funnel(draw, 680, 132, 360, 190)
        draw_network(draw, 710, 435)
    elif theme == "ai":
        draw_network(draw, 760, 238)
        draw_code(draw, 560, 360, 430, 170)
    elif theme == "cost":
        draw_calculator(draw, 840, 120)
        draw_chart(draw, 610, 360, 410, 180)
    else:
        draw_social_list(draw, 700, 150, 330, 160)
        draw_chart(draw, 760, 360, 330, 180)

    paste_layer(base, overlay)
    output.parent.mkdir(parents=True, exist_ok=True)
    base.convert("RGB").save(output, quality=88, method=6)


COVERS = [
    ("generated-bases/digital-operations.png", "pakistan-digital-marketing-statistics-2026-premium-cover.webp", "Digital Marketing", "dashboard", "june"),
    ("generated-bases/digital-operations.png", "google-ads-small-business-pakistan-premium-cover.webp", "Digital Marketing", "dashboard", "june"),
    ("generated-bases/social-ads-phone.png", "instagram-marketing-pakistan-premium-cover.webp", "Digital Marketing", "phone", "june"),
    ("generated-bases/social-ads-phone.png", "whatsapp-business-marketing-pakistan-premium-cover.webp", "Digital Marketing", "phone", "june"),
    ("generated-bases/local-seo-map.png", "seo-services-pakistan-premium-cover.webp", "SEO", "map", "june"),
    ("generated-bases/digital-operations.png", "digital-marketing-agency-rawalpindi-premium-cover.webp", "Digital Marketing", "funnel", "june"),
    ("generated-bases/ai-automation.png", "the-ai-automation-blueprint-for-marketing-2026-guide-premium-cover.webp", "AI Strategy", "ai", "june"),
    ("generated-bases/local-seo-map.png", "how-to-get-more-google-reviews-premium-cover.webp", "SEO", "reviews", "june"),
    ("generated-bases/local-seo-map.png", "google-business-profile-optimization-checklist-premium-cover.webp", "SEO", "map", "june"),
    ("generated-bases/local-seo-map.png", "local-seo-google-maps-pakistan-guide-premium-cover.webp", "SEO", "map", "june"),
    ("generated-bases/social-ads-phone.png", "facebook-instagram-ads-pakistan-guide-premium-cover.webp", "Digital Marketing", "phone", "june"),
    ("generated-bases/web-development.png", "website-cost-pakistan-premium-cover.webp", "Web Development", "code", "june"),
    ("generated-bases/digital-operations.png", "google-ads-vs-facebook-ads-pakistan-premium-cover.webp", "Digital Marketing", "compare", "june"),
    ("generated-bases/social-ads-phone.png", "whatsapp-leads-facebook-ads-premium-cover.webp", "Digital Marketing", "phone", "june"),
    ("generated-bases/local-seo-map.png", "rank-google-maps-rawalpindi-islamabad-premium-cover.webp", "SEO", "map", "june"),
    ("generated-bases/digital-operations.png", "digital-marketing-cost-pakistan-premium-cover.webp", "Digital Marketing", "cost", "june"),
    ("generated-bases/social-ads-phone.png", "facebook-ads-cost-pakistan-premium-cover.webp", "Digital Marketing", "cost", "june"),
    ("generated-bases/digital-operations.png", "get-the-most-out-of-the-creativity-premium-cover.webp", "Digital Marketing", "funnel", "june"),
    ("generated-bases/digital-operations.png", "seo-which-digital-advertising-strategy-is-right-for-you-premium-cover.webp", "SEO", "compare", "june"),
    ("generated-bases/ai-automation.png", "influencer-marketing-trends-2023-what-you-need-to-know-premium-cover.webp", "Digital Marketing", "ai", "june"),
    ("generated-bases/social-ads-phone.png", "social-media-marketing-strategies-for-small-business-premium-cover.webp", "Digital Marketing", "phone", "june"),
    ("generated-bases/local-seo-map.png", "google-business-profile-for-restaurants-in-islamabad-full-setup-guide-premium-cover.webp", "SEO", "map", "july"),
    ("generated-bases/local-seo-map.png", "google-business-profile-restaurants-islamabad-optimization-checklist-cover.webp", "SEO", "reviews", "july"),
    ("generated-bases/local-seo-map.png", "google-reviews-for-restaurants-in-islamabad-cover.webp", "SEO", "reviews", "july"),
    ("generated-bases/social-ads-phone.png", "how-real-estate-businesses-in-pakistan-get-leads-from-facebook-ads-cover.webp", "Digital Marketing", "phone", "july"),
    ("generated-bases/ai-automation.png", "google-ai-overviews-ads-in-pakistan-cover.webp", "AI Strategy", "ai", "july"),
    ("generated-bases/ai-automation.png", "google-conversational-search-ads-pakistan-businesses-cover.webp", "AI Strategy", "ai", "july"),
    ("generated-bases/digital-operations.png", "google-search-console-social-platforms-pakistan-cover.webp", "Digital Marketing", "dashboard", "july"),
    ("generated-bases/ai-automation.png", "who-founded-crea8iv-media-syed-qamar-abbas-cover.webp", "Digital Marketing", "ai", "july"),
    ("generated-bases/ai-automation.png", "founder-pages-ai-search-entity-seo-business-trust-cover.webp", "SEO", "ai", "july"),
]

EXTERNAL_SOURCES = {
    "seo-which-digital-advertising-strategy-is-right-for-you-realistic.webp": ROOT / "generated-thumbnails/seo-which-digital-advertising-strategy-is-right-for-you-realistic.webp",
    "influencer-marketing-trends-2023-what-you-need-to-know-realistic.webp": ROOT / "generated-thumbnails/influencer-marketing-trends-2023-what-you-need-to-know-realistic.webp",
    "social-media-marketing-strategies-for-small-business-realistic.webp": ROOT / "generated-thumbnails/social-media-marketing-strategies-for-small-business-realistic.webp",
}

VARIANT_SUFFIXES = ["100x100", "150x150", "300x169", "300x300", "600x338", "768x432", "1024x576"]


def sync_public(output: Path, month: str) -> None:
    target_dir = PUBLIC_JUNE if month == "june" else PUBLIC_JULY
    target_dir.mkdir(parents=True, exist_ok=True)
    target = target_dir / output.name
    shutil.copy2(output, target)
    if month == "june":
        stem = output.stem
        for suffix in VARIANT_SUFFIXES:
            shutil.copy2(output, target_dir / f"{stem}-{suffix}{output.suffix}")


def main() -> None:
    for source_name, output_name, category, theme, month in COVERS:
        source = EXTERNAL_SOURCES.get(source_name, SOURCE_DIR / source_name)
        if not source.exists():
            raise FileNotFoundError(source)
        output = OUTPUT_DIR / output_name
        render_cover(source, output, category, theme)
        sync_public(output, month)
        print(f"generated {output_name}")


if __name__ == "__main__":
    main()

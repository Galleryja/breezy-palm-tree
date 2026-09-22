#!/usr/bin/env python3
"""
Print artwork for the Eris Jar (120 ml, 76.5 mm diameter, 51 mm tall).

Draws two pieces per balm, at true millimetre dimensions:

    design/labels/lid-<slug>.svg    circular lid label
    design/labels/body-<slug>.svg   wrap-around body label

The copy is read out of data/products.ts, so the label and the website
cannot drift apart. Nothing here is hand-typed except the business block,
which the site does not carry.

    python3 scripts/make-labels.py                    # SVGs only
    python3 scripts/make-labels.py --previews         # + PNGs to inspect
    python3 scripts/make-labels.py --net "3.8 oz (108 g)"

NET CONTENTS IS BLANK BY DEFAULT, on purpose. The jar holds 120 ml, but
whipped tallow has air beaten into it and nobody knows what a filled jar
weighs until one is filled and put on a scale. Weigh it, then pass --net.

The wordmark is lifted from components/wordmark.tsx rather than re-traced,
so the logo on the jar is the same outline as the logo on the site.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "design" / "labels"

# ---------------------------------------------------------------------------
# Jar. Measurements from the Eris Jar spec sheet.
# ---------------------------------------------------------------------------

JAR_DIAMETER = 76.5          # mm, outside of the glass
JAR_HEIGHT = 51.0            # mm
CIRCUMFERENCE = 240.33       # mm, pi * diameter

# The lid's flat top is narrower than the glass — how much narrower depends
# on the closure, which the spec sheet does not give ("thread: special").
# 65 mm is a safe guess for a 76.5 mm jar. Confirm against a real lid before
# ordering; every other number on the lid label follows from this one.
LID_DIAMETER = 65.0

# A full wrap plus a little overlap. The last OVERLAP mm are left blank
# because the leading edge covers them once the label is on.
BODY_HEIGHT = 32.0
OVERLAP = 4.0
BODY_WIDTH = CIRCUMFERENCE + OVERLAP

# ---------------------------------------------------------------------------
# Palette — the site's, so the jar and the website look related.
# ---------------------------------------------------------------------------

INK = "#15181c"
INK_SOFT = "#48515c"
PAPER = "#f6f8fa"
LINE = "#dbe1e8"
ACCENT = "#35597a"

SERIF = "Palatino, Georgia, serif"
SANS = "Helvetica, Arial, sans-serif"

# The one block of copy that is not on the website. Fill the address in
# before printing: US law requires the name and place of business of the
# manufacturer, packer or distributor on the label.
BUSINESS = [
    "SIX SKINCARE PRODUCTS LLC",
    "[street address]",
    "[city, state, ZIP]",
]

NET_PLACEHOLDER = "NET WT ______ OZ (______ g)"


# ---------------------------------------------------------------------------
# Catalogue
# ---------------------------------------------------------------------------

def read_products() -> list[dict]:
    """Pull the four balms out of data/products.ts.

    Deliberately narrow: it reads the PRODUCTS array only, stopping at the
    next top-level export. WHY_TALLOW sits right underneath PRODUCTS in that
    file and has bitten before.
    """
    src = (ROOT / "data" / "products.ts").read_text()

    base = re.search(r'const TALLOW_BASE\s*=\s*\n?\s*"([^"]+)"', src)
    if not base:
        sys.exit("could not find TALLOW_BASE in data/products.ts")
    tallow_base = base.group(1)

    start = src.index("export const PRODUCTS")
    end = src.index("export const", start + 10)
    array = src[start:end]

    products = []
    chunks = re.split(r"\n  \{\n", array)[1:]
    for chunk in chunks:
        def one(pattern, flags=0):
            m = re.search(pattern, chunk, flags)
            return m.group(1) if m else None

        slug = one(r'slug: "([^"]+)"')
        if not slug or not slug.endswith("-balm"):
            continue

        ingredients = one(r"ingredients: `([^`]+)`")
        products.append(
            {
                "slug": slug,
                "name": one(r'name: "([^"]+)"'),
                "size": one(r'size: "([^"]+)"'),
                "ingredients": ingredients.replace("${TALLOW_BASE}", tallow_base),
                "allergens": one(r'allergens:\s*\n?\s*"((?:[^"\\]|\\.)*)"'),
                "swatch": re.search(
                    r'swatch: \["(#[0-9a-fA-F]{6})", "(#[0-9a-fA-F]{6})"\]', chunk
                ).group(2),
            }
        )

    if len(products) != 4:
        sys.exit(f"expected 4 balms, parsed {len(products)}")
    return products


def read_wordmark() -> tuple[str, float, float]:
    """The traced Cloister Black "SIX", straight out of the generated component."""
    src = (ROOT / "components" / "wordmark.tsx").read_text()
    box = re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"', src)
    path = re.search(r'\sd="(M[^"]+)"', src)
    if not (box and path):
        sys.exit("could not find the wordmark path in components/wordmark.tsx")
    return path.group(1), float(box.group(1)), float(box.group(2))


# ---------------------------------------------------------------------------
# Text measurement
#
# Everything is centred or left-aligned by the renderer, so widths are only
# needed to decide where to break a line. Liberation is metrically compatible
# with Times and Helvetica, which is close enough to the stacks above for
# wrapping decisions.
# ---------------------------------------------------------------------------

_metrics: dict[str, tuple] = {}


def _load(family: str):
    if family in _metrics:
        return _metrics[family]
    import subprocess

    from fontTools.ttLib import TTFont

    path = subprocess.run(
        ["fc-match", "-f", "%{file}", family],
        capture_output=True, text=True, check=True,
    ).stdout.strip()
    font = TTFont(path, fontNumber=0, lazy=True)
    cmap = font.getBestCmap()
    hmtx = font["hmtx"]
    upem = font["head"].unitsPerEm
    _metrics[family] = (cmap, hmtx, upem)
    return _metrics[family]


def width(text: str, size: float, serif: bool = True, tracking: float = 0.0) -> float:
    """Width in mm of `text` set at `size` mm, plus `tracking` mm per letter."""
    cmap, hmtx, upem = _load("Liberation Serif" if serif else "Liberation Sans")
    total = 0.0
    for ch in text:
        glyph = cmap.get(ord(ch))
        adv = hmtx[glyph][0] if glyph else upem // 2
        total += adv / upem * size
    return total + tracking * max(len(text) - 1, 0)


def nobreak(name: str) -> str:
    """Keep reduplicated names whole. "Ylang" on its own is not the word."""
    return name.replace("Ylang Ylang", "Ylang\u00a0Ylang")


def wrap(text: str, size: float, limit: float, serif=True, tracking=0.0) -> list[str]:
    lines, current = [], ""
    for word in text.split(" "):
        trial = f"{current} {word}".strip()
        if current and width(trial, size, serif, tracking) > limit:
            lines.append(current)
            current = word
        else:
            current = trial
    if current:
        lines.append(current)
    return lines


# ---------------------------------------------------------------------------
# SVG
# ---------------------------------------------------------------------------

def text(
    x, y, content, size, *, serif=True, fill=INK, anchor="start",
    tracking=0.0, italic=False, weight=None,
):
    bits = [
        f'x="{x:.2f}"',
        f'y="{y:.2f}"',
        f'font-family=\'{SERIF if serif else SANS}\'',
        f'font-size="{size:.2f}"',
        f'fill="{fill}"',
    ]
    if anchor != "start":
        bits.append(f'text-anchor="{anchor}"')
    if tracking:
        bits.append(f'letter-spacing="{tracking:.3f}"')
    if italic:
        bits.append('font-style="italic"')
    if weight:
        bits.append(f'font-weight="{weight}"')
    return f"<text {' '.join(bits)}>{escape(content)}</text>"


def wordmark_at(cx, y, w, path, vw, vh, fill=INK) -> str:
    """Place the arced SIX, `w` mm wide, top edge at `y`, centred on `cx`."""
    scale = w / vw
    x = cx - w / 2
    return (
        f'<g transform="translate({x:.3f} {y:.3f}) scale({scale:.5f})">'
        f'<path d="{path}" fill="{fill}" /></g>'
    )


def svg(width_mm, height_mm, body, *, extra="") -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        f'<svg xmlns="http://www.w3.org/2000/svg" '
        f'width="{width_mm}mm" height="{height_mm}mm" '
        f'viewBox="0 0 {width_mm} {height_mm}">\n'
        f"{extra}"
        f"{body}\n</svg>\n"
    )


# ---------------------------------------------------------------------------
# The lid label
# ---------------------------------------------------------------------------

def _centred(parts: list[str], block_height: float, label_height: float) -> str:
    """Drop a laid-out block into the middle of the label."""
    dy = (label_height - block_height) / 2
    return f'<g transform="translate(0 {dy:.3f})">' + "\n".join(parts) + "</g>"


def lid_label(p, mark, guides, net) -> str:
    path, vw, vh = mark
    d = LID_DIAMETER
    c = d / 2

    # Laid out from y=0 and centred afterwards, so the stack stays optically
    # in the middle of the circle whatever the blend name does.
    mark_w = d * 0.46
    mark_h = mark_w * vh / vw
    size = d * 0.062
    lines = wrap(nobreak(p["name"]), size, d * 0.62)

    block = []
    block.append(wordmark_at(c, 0.0, mark_w, path, vw, vh))
    y = mark_h + d * 0.077

    half = d * 0.13
    block.append(
        f'<line x1="{c - half:.2f}" y1="{y:.2f}" x2="{c - 1.6:.2f}" y2="{y:.2f}" '
        f'stroke="{LINE}" stroke-width="0.3" />'
    )
    block.append(
        f'<line x1="{c + 1.6:.2f}" y1="{y:.2f}" x2="{c + half:.2f}" y2="{y:.2f}" '
        f'stroke="{LINE}" stroke-width="0.3" />'
    )
    # The blend's own colour, holding the centre of the rule.
    block.append(f'<circle cx="{c}" cy="{y:.2f}" r="0.55" fill="{p["swatch"]}" />')

    y += size + d * 0.048
    for line in lines:
        block.append(text(c, y, line, size, anchor="middle"))
        y += size * 1.28
    y -= size * 1.28

    y += d * 0.083
    block.append(
        text(c, y, "WHIPPED TALLOW BALM", d * 0.032, serif=False,
             anchor="middle", fill=INK_SOFT, tracking=d * 0.0105)
    )

    y += d * 0.10
    block.append(
        text(c, y, net, d * 0.031, serif=False, anchor="middle", fill=INK_SOFT,
             tracking=d * 0.004)
    )

    body = [f'<circle cx="{c}" cy="{c}" r="{c}" fill="{PAPER}" />']
    body.append(_centred(block, y + size * 0.25, d))
    if guides:
        body.append(
            f'<circle cx="{c}" cy="{c}" r="{c - 0.05:.2f}" fill="none" '
            f'stroke="{ACCENT}" stroke-width="0.1" stroke-dasharray="1 1" />'
        )
    return svg(d, d, "\n".join(body))


# ---------------------------------------------------------------------------
# The body wrap
#
# Horizontal position is angular position once the label is on the jar, so
# the front panel sits at half the circumference and the seam lands at the
# back, behind it.
# ---------------------------------------------------------------------------

def body_label(p, mark, guides, net) -> str:
    path, vw, vh = mark
    w, h = BODY_WIDTH, BODY_HEIGHT
    front = CIRCUMFERENCE / 2

    body = [f'<rect x="0" y="0" width="{w}" height="{h}" fill="{PAPER}" />']

    # --- front ------------------------------------------------------------
    mark_w = 24.0
    block = [wordmark_at(front, 0.0, mark_w, path, vw, vh)]
    y = mark_w * vh / vw + 4.4
    block.append(text(front, y, nobreak(p["name"]), 3.7, anchor="middle"))
    y += 4.7
    block.append(
        text(front, y, "WHIPPED TALLOW BALM", 2.0, serif=False, anchor="middle",
             fill=INK_SOFT, tracking=0.7)
    )
    y += 3.5
    block.append(
        text(front, y, net, 2.0, serif=False, anchor="middle", fill=INK_SOFT,
             tracking=0.25)
    )
    body.append(_centred(block, y + 0.6, h))

    # --- ingredients, to the left of the front ----------------------------
    left, col = 9.0, 72.0
    block, y = [], 0.0
    block.append(text(left, y, "INGREDIENTS", 1.9, serif=False, tracking=0.6))
    y += 3.5
    for line in wrap(p["ingredients"], 1.95, col, serif=False):
        block.append(text(left, y, line, 1.95, serif=False, fill=INK_SOFT))
        y += 2.7
    y += 1.1
    for line in wrap(p["allergens"], 1.85, col, serif=False):
        block.append(text(left, y, line, 1.85, serif=False, fill=INK_SOFT, italic=True))
        y += 2.5
    body.append(_centred(block, y - 2.5 + 0.6, h))

    # --- business, to the right of the front ------------------------------
    # "Made in the USA" unqualified would be an FTC problem: the shea and the
    # essential oils are imported. The qualified form is the accurate one.
    right = front + 40.0
    block, y = [], 0.0
    block.append(text(right, y, BUSINESS[0], 1.9, serif=False, tracking=0.6))
    y += 3.5
    for line in BUSINESS[1:]:
        block.append(text(right, y, line, 1.95, serif=False, fill=INK_SOFT))
        y += 2.7
    y += 1.3
    for line in (
        "Made in the USA with domestic and imported ingredients.",
        "For external use only. Patch test before first use.",
    ):
        block.append(text(right, y, line, 1.85, serif=False, fill=INK_SOFT))
        y += 2.6
    y += 1.4
    block.append(
        text(right, y, "LOT ____________   BEST BY ____________", 1.8,
             serif=False, fill=INK_SOFT, tracking=0.15)
    )
    body.append(_centred(block, y + 0.6, h))

    # Panel dividers, a third of the way round to each side of the front.
    for x in (front - 33.0, front + 33.0):
        body.append(
            f'<line x1="{x:.2f}" y1="5.5" x2="{x:.2f}" y2="{h - 5.5}" '
            f'stroke="{LINE}" stroke-width="0.2" />'
        )

    if guides:
        body.append(
            f'<rect x="{CIRCUMFERENCE:.2f}" y="0" width="{OVERLAP}" height="{h}" '
            f'fill="{ACCENT}" fill-opacity="0.08" />'
        )
        body.append(
            f'<line x1="{CIRCUMFERENCE:.2f}" y1="0" x2="{CIRCUMFERENCE:.2f}" '
            f'y2="{h}" stroke="{ACCENT}" stroke-width="0.15" '
            f'stroke-dasharray="1 1" />'
        )
    return svg(round(w, 2), h, "\n".join(body))


# ---------------------------------------------------------------------------

def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--previews", action="store_true",
                    help="also write PNGs, with trim and overlap guides shown")
    ap.add_argument("--net", default=NET_PLACEHOLDER,
                    help='net contents, e.g. "NET WT 3.8 OZ (108 g)"')
    args = ap.parse_args()

    OUT.mkdir(parents=True, exist_ok=True)
    mark = read_wordmark()
    products = read_products()

    for p in products:
        stem = p["slug"].removesuffix("-balm")
        for kind, render, size in (
            ("lid", lid_label, LID_DIAMETER),
            ("body", body_label, BODY_WIDTH),
        ):
            path = OUT / f"{kind}-{stem}.svg"
            path.write_text(render(p, mark, False, args.net))
            print(f"  {path.relative_to(ROOT)}")
            if args.previews:
                import cairosvg

                cairosvg.svg2png(
                    bytestring=render(p, mark, True, args.net).encode(),
                    write_to=str(OUT / f"preview-{kind}-{stem}.png"),
                    scale=1200 / size,
                )

    print(f"\n  lid   {LID_DIAMETER:g} mm circle   (jar glass is {JAR_DIAMETER:g} mm)")
    print(f"  body  {BODY_WIDTH:.1f} x {BODY_HEIGHT:g} mm   "
          f"({CIRCUMFERENCE:.1f} mm around + {OVERLAP:g} mm overlap)")
    if args.net == NET_PLACEHOLDER:
        print("\n  net contents left blank — weigh a filled jar, then pass --net")


if __name__ == "__main__":
    main()

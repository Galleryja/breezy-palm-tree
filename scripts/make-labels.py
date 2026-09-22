#!/usr/bin/env python3
"""
Print artwork for the Eris Jar (120 ml, 76.5 mm diameter, 51 mm tall).

Draws two pieces per balm, at true millimetre dimensions:

    design/labels/lid-<slug>.svg      circular lid label
    design/labels/front-<slug>.svg    rectangular front label

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

# A rectangle applied to the front of the jar rather than a full wrap, so
# there is bare glass at the back. Wider reads better but wraps further
# round: at 190 mm the label covers 79% of the way, leaving a 50 mm gap.
FRONT_WIDTH = 190.0
FRONT_HEIGHT = 38.0

# ---------------------------------------------------------------------------
# Palette — the site's, so the jar and the website look related.
# ---------------------------------------------------------------------------

INK = "#15181c"
INK_SOFT = "#48515c"
PAPER = "#f6f8fa"
INK_FAINT = "#636c77"
LINE = "#dbe1e8"
ACCENT = "#35597a"

SERIF = "Palatino, Georgia, serif"
SANS = "Helvetica, Arial, sans-serif"

# The one block of copy that is not on the website. Fill the address in
# before printing: US law requires the name and place of business of the
# manufacturer, packer or distributor on the label.
ORIGIN = "Made in Cave Creek, AZ"
CONTACT = ["@yoursocialhandle", "www.websitehere.com"]

TAGLINE = ["Pure and natural.", "Elevated skincare."]

# One set of directions for all four, rather than the per-blend how-to-use
# copy on the website. Owner's wording — leave it unless asked.
DIRECTIONS = (
    "Start with small amount, massage onto clean, slightly damp skin. "
    "Allow a few minutes for absorption."
)

# Stands in for the reference label's "BENEFITS" paragraph. What is written
# here is what the base is and how it feels — not what it does to anybody.
BENEFITS = (
    "Whipped grass-fed tallow with organic shea butter and organic jojoba. "
    "It melts on contact and leaves skin soft. Tallow naturally carries "
    "vitamins A, D, E and K."
)

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
# needed to decide where to break a line. Measured against DejaVu, which is
# wider than anything the font stacks above will actually resolve to — so a
# line that fits here fits in print, and columns cannot run into each other
# because a printer picked a different face.
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
    cmap, hmtx, upem = _load("DejaVu Serif" if serif else "DejaVu Sans")
    total = 0.0
    for ch in text:
        glyph = cmap.get(ord(ch))
        adv = hmtx[glyph][0] if glyph else upem // 2
        total += adv / upem * size
    return total + tracking * max(len(text) - 1, 0)


def plain(ingredients: str) -> str:
    """Strip the botanical names out of an ingredient declaration.

    Worth knowing what this costs. 21 CFR 701.3 wants ingredients declared by
    their INCI names, and for a plant material the INCI name IS the Latin
    binomial — "Butyrospermum Parkii (Shea) Butter", not "shea butter". A
    declaration in common names only is not a compliant one.

    The website still carries the full declaration on every product page, so
    the information is published either way; this only governs what is set on
    the jar. Delete this function and pass p["ingredients"] straight through
    to put the binomials back.
    """
    return re.sub(r"\s*\([^)]*\)", "", ingredients)


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
# The front label
#
# Three columns under a centred wordmark, after the reference label: what the
# product is in the middle, what is in it on the left, what to do with it on
# the right. Both side columns are ranged left; only the middle is centred.
# ---------------------------------------------------------------------------

def fit(s, start: float, limit: float, tracking: float, serif=True, floor=1.9) -> float:
    """Largest size at or under `start` that keeps `s` inside `limit`."""
    size = start
    while size > floor and width(s, size, serif, tracking) > limit:
        size -= 0.05
    return size


def front_label(p, mark, guides, net) -> str:
    path, vw, vh = mark
    w, h = FRONT_WIDTH, FRONT_HEIGHT

    # Narrow side columns, held out at the margins, so the gutters either
    # side of the centre are wide enough to read as deliberate space.
    left_x, col = 7.0, 47.0
    right_x = w - 7.0 - col
    centre = w / 2

    out = [f'<rect x="0" y="0" width="{w}" height="{h}" fill="{PAPER}" />']

    # --- centre -----------------------------------------------------------
    # The mark is set small and high to open up the gap beneath it; that gap
    # is what makes the blackletter read as a mark rather than as a heading.
    mark_w = 28.0
    out.append(wordmark_at(centre, 3.4, mark_w, path, vw, vh))

    # Sans under the blackletter. A second serif competes with it; a plain
    # grotesque lets the mark be the only decorated thing on the label.
    title = fit("WHIPPED TALLOW", 3.9, 48.0, 0.95, serif=False)
    out.append(
        text(centre, 25.0, "WHIPPED TALLOW", title, serif=False, anchor="middle",
             tracking=0.95)
    )

    blend = nobreak(p["name"]).upper()
    size = fit(blend, 2.3, 48.0, 0.35, serif=False)
    out.append(
        text(centre, 29.3, blend, size, serif=False, anchor="middle",
             fill=INK_SOFT, tracking=0.35)
    )

    out.append(text(centre, 32.8, net, 2.0, serif=False, anchor="middle",
                    fill=INK_SOFT))

    # Name and place of business, which the label is required to carry.
    out.append(
        text(centre, 35.9, "   ·   ".join([ORIGIN] + CONTACT), 1.7,
             serif=False, anchor="middle", fill=INK_FAINT)
    )

    # The two side columns carry different amounts of text per blend, so each
    # is set at the largest scale that still clears the bottom edge, rather
    # than at a size that happens to suit one of the four.
    floor = h - 3.0

    def left_column(k: float) -> tuple[list[str], float]:
        parts = [wordmark_at(left_x + 5.5, 4.4, 11.0, path, vw, vh)]
        y = 11.6
        for line in TAGLINE:
            parts.append(text(left_x, y, line, 2.1 * k, fill=INK_SOFT))
            y += 2.6 * k
        y += 2.2 * k
        parts.append(text(left_x, y, "INGREDIENTS", 1.9 * k, tracking=0.5 * k))
        y += 2.9 * k
        for line in wrap(plain(p["ingredients"]), 1.8 * k, col):
            parts.append(text(left_x, y, line, 1.8 * k, fill=INK_SOFT))
            y += 2.35 * k
        return parts, y - 2.35 * k

    def right_column(k: float) -> tuple[list[str], float]:
        parts, y = [], 7.4
        for heading, copy in (("DIRECTIONS", DIRECTIONS), ("BENEFITS", BENEFITS)):
            parts.append(text(right_x, y, heading, 1.9 * k, tracking=0.5 * k))
            y += 2.9 * k
            for line in wrap(copy, 1.75 * k, col):
                parts.append(text(right_x, y, line, 1.75 * k, fill=INK_SOFT))
                y += 2.3 * k
            y += 1.5 * k
        parts.append(
            text(right_x, y, "Store in a cool, dry place.", 1.7 * k,
                 fill=INK_FAINT, italic=True)
        )
        return parts, y

    for build in (left_column, right_column):
        for step in range(14):
            parts, bottom = build(1.0 - step * 0.025)
            if bottom <= floor:
                break
        out.extend(parts)

    if guides:
        out.append(
            f'<rect x="0.05" y="0.05" width="{w - 0.1}" height="{h - 0.1}" '
            f'fill="none" stroke="{ACCENT}" stroke-width="0.1" '
            f'stroke-dasharray="1 1" />'
        )
    return svg(w, h, "\n".join(out))


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
            ("front", front_label, FRONT_WIDTH),
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

    gap = CIRCUMFERENCE - FRONT_WIDTH
    print(f"\n  lid    {LID_DIAMETER:g} mm circle   (jar glass is {JAR_DIAMETER:g} mm)")
    print(f"  front  {FRONT_WIDTH:g} x {FRONT_HEIGHT:g} mm   "
          f"({gap:.0f} mm of bare glass at the back)")
    if args.net == NET_PLACEHOLDER:
        print("\n  net contents left blank — weigh a filled jar, then pass --net")


if __name__ == "__main__":
    main()

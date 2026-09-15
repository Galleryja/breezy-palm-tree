#!/usr/bin/env python3
"""
Trace the SIX wordmark from a font file into a single SVG path.

Real brands ship a logo as vector artwork, not as live text in a webfont: it
renders identically everywhere, needs no font download, and can never fall
back to the wrong face. This does that conversion once.

    pip install fonttools brotli
    python3 scripts/trace-wordmark.py public/fonts/CloisterBlack.ttf --write

With --write it rewrites components/wordmark.tsx in place, so the logo becomes
frozen vector artwork and the font is no longer needed at runtime. Without it,
the viewBox and path are printed for you to paste yourself.

The curve is specified as a SAGITTA — how far the middle of the word rises
above its ends, in the same units as the cap height. That is the number you
actually care about ("slightly curved"), unlike a radius, which has to be
huge to look subtle and is easy to get wrong by an order of magnitude.
"""

import math
import pathlib
import sys

from fontTools.misc.transform import Transform
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.recordingPen import RecordingPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

TEXT = "SIX"

CAP_HEIGHT = 34.0   # rendered height of the capitals
SAGITTA = 4.5       # how far the middle rides above the ends. 0 = flat.
TRACKING = 1.06     # >1 opens the letterspacing slightly
PAD = 2.0           # breathing room around the traced bounds


def glyph_name(font, char):
    name = font.getBestCmap().get(ord(char))
    if name is None:
        sys.exit(f"error: {font} has no glyph for {char!r}")
    return name


def place(glyphs, names, widths, radius, cx, cy, scale):
    """Lay the glyphs along the arc, yielding a transform for each."""
    total_angle = sum(widths) / radius
    angle = -total_angle / 2.0

    for name, width in zip(names, widths):
        mid = angle + (width / radius) / 2.0

        # Transforms compose right-to-left: scale from font units, rotate to
        # the arc's tangent, then move to the point on the arc.
        yield name, (
            Transform()
            .translate(cx + radius * math.sin(mid), cy - radius * math.cos(mid))
            .rotate(mid)
            .scale(scale, -scale)  # font Y points up, SVG Y points down
            .translate(-(width / scale) / 2.0, 0)
        )

        angle += width / radius


COMPONENT = pathlib.Path(__file__).resolve().parent.parent / "components" / "wordmark.tsx"

TEMPLATE = """/**
 * The Six wordmark: "SIX" set on a shallow arc, as frozen vector artwork.
 *
 * GENERATED FILE — do not hand-edit the path below.
 * Regenerate with:
 *
 *     python3 scripts/trace-wordmark.py <font file> --write
 *
 * Traced from: {source}
 * Cap height {cap:g}, sagitta {sagitta:g}, {sweep:.1f} degree sweep.
 *
 * Because the letters are outlines rather than live text, no font is
 * downloaded to render the logo and it cannot fall back to the wrong face.
 */
export function Wordmark({{
  className = "",
  title = "Six",
}}: {{
  className?: string;
  /** Accessible name for the mark. */
  title?: string;
}}) {{
  return (
    <svg
      viewBox="{viewbox}"
      className={{className}}
      role="img"
      aria-label={{title}}
    >
      <path d="{d}" fill="currentColor" />
    </svg>
  );
}}
"""


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    write = "--write" in sys.argv[1:]
    if len(args) != 1:
        sys.exit(__doc__)

    path = args[0]
    font = TTFont(path, fontNumber=0)
    glyphs = font.getGlyphSet()

    cap = getattr(font["OS/2"], "sCapHeight", 0) if "OS/2" in font else 0
    if not cap:
        cap = font["head"].unitsPerEm * 0.7  # sane default if the table lies
    scale = CAP_HEIGHT / cap

    names = [glyph_name(font, c) for c in TEXT]
    widths = [glyphs[n].width * scale * TRACKING for n in names]
    chord = sum(widths)

    # Radius that produces the requested sagitta over this chord. A shallow
    # curve needs a radius many times the word's width, which is exactly the
    # value that is easy to guess wrong.
    if SAGITTA <= 0:
        sys.exit("error: SAGITTA must be positive; use a tiny value for near-flat")
    radius = (chord**2 / 4.0 + SAGITTA**2) / (2.0 * SAGITTA)

    sweep = math.degrees(chord / radius)
    if sweep > 45:
        sys.exit(f"error: {sweep:.0f} degree sweep is a rainbow, not a curve")

    # Draw once at a nominal origin to measure, then shift into a tight box.
    recorded = []
    bounds = BoundsPen(glyphs)
    for name, t in place(glyphs, names, widths, radius, 0.0, radius, scale):
        rec = RecordingPen()
        glyphs[name].draw(rec)
        rec.replay(TransformPen(bounds, t))
        recorded.append((rec, t))

    if bounds.bounds is None:
        sys.exit("error: traced nothing — are those glyphs empty?")

    x_min, y_min, x_max, y_max = bounds.bounds
    shift = Transform().translate(PAD - x_min, PAD - y_min)

    commands = []
    for rec, t in recorded:
        pen = SVGPathPen(glyphs, ntos=lambda v: f"{round(v, 2):g}")
        rec.replay(TransformPen(pen, shift.transform(t)))
        if pen.getCommands():
            commands.append(pen.getCommands())

    width = x_max - x_min + PAD * 2
    height = y_max - y_min + PAD * 2

    viewbox = f"0 0 {round(width, 2):g} {round(height, 2):g}"
    d = " ".join(commands)

    if write:
        COMPONENT.write_text(
            TEMPLATE.format(
                source=path, cap=CAP_HEIGHT, sagitta=SAGITTA, sweep=sweep,
                viewbox=viewbox, d=d,
            )
        )
        print(f"wrote {COMPONENT.relative_to(COMPONENT.parent.parent)}")
    else:
        print(f"<!-- {TEXT} traced from {path} -->")
        print(f'viewBox="{viewbox}"')
        print()
        print(d)
    print()
    print(
        f"# cap {CAP_HEIGHT:g}, sagitta {SAGITTA:g}, sweep {sweep:.1f} deg, "
        f"radius {radius:.0f}",
        file=sys.stderr,
    )


if __name__ == "__main__":
    main()

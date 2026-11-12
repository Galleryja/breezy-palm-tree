import Link from "next/link";

/**
 * The homepage hero, at every width: a full-bleed media panel with one
 * button centred in it, then the headline and the strapline beneath.
 *
 * The panel is taller in proportion on a phone than on a desktop, because
 * 38vh of a tall narrow screen is a portrait block while 38vh of a wide one
 * is a letterbox. 60vh at desktop keeps it reading as an image rather than
 * a band.
 *
 * Drop a file at one of these paths in /public and it is used automatically.
 * Video wins over image; with neither, the panel renders as a warm dark
 * field that picks up the amber of the real jars, which is a deliberate
 * placeholder rather than an accident.
 *
 *     public/hero.mp4     silent, looping, ~6-10 seconds, under about 4 MB
 *     public/hero.jpg     at least 2000px wide, landscape
 *
 * A hero video must be muted to autoplay on iOS, and `playsInline` stops it
 * hijacking the screen into fullscreen. Both are set below.
 */

const HERO_VIDEO: string | null = null; // e.g. "/hero.mp4"
const HERO_IMAGE: string | null = null; // e.g. "/hero.jpg"

export function Hero() {
  return (
    <section>
      {/* Full-bleed: breaks out of the page gutter to meet both edges. */}
      <div className="relative h-[38vh] min-h-[250px] w-full overflow-hidden bg-ink md:h-[60vh] md:min-h-[420px]">
        {HERO_VIDEO ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={HERO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        ) : HERO_IMAGE ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={HERO_IMAGE}
            alt=""
          />
        ) : (
          // Placeholder: the amber of the jars against near-black, so the
          // slot reads as considered until real footage lands.
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 50% 18%, #6b4a2a 0%, #2a1c12 46%, #14100c 100%)",
            }}
          />
        )}

        {/* Scrim: keeps the button legible over whatever ends up behind it. */}
        <div className="absolute inset-0 bg-black/25" aria-hidden="true" />

        <div className="absolute inset-0 flex items-center justify-center">
          <Link
            href="/products"
            className="rounded-full border border-white/70 bg-white/10 px-9 py-4 text-sm font-medium uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-colors active:bg-white active:text-ink md:px-11 md:py-5 md:hover:bg-white md:hover:text-ink"
          >
            Shop the Range
          </Link>
        </div>
      </div>

      <div className="wrap py-10 md:py-16">
        <h1 className="font-serif text-3xl leading-[1.15] text-ink md:text-5xl">
          Elevated Skincare.
        </h1>

        {/* Client-written, set as written. The tallow sentence shows from md
            up only: on a phone it wraps to three lines and the hard breaks
            around it stop reading as deliberate. */}
        <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft md:mt-6">
          <span className="hidden md:inline">
            Grass-fed tallow, whipped with organic mango butter, jojoba and
            squalane. Blended with essential oils.
            <br />
          </span>
          Natural ingredients, chosen for what they do.
          <br />
          No fillers. No synthetic bulk. No cutting corners. Clean. Made
          properly.
        </p>

        <Link
          href="/about"
          className="mt-6 inline-block text-sm text-ink-soft underline underline-offset-4 transition-colors hover:text-ink"
        >
          Why tallow?
        </Link>
      </div>
    </section>
  );
}

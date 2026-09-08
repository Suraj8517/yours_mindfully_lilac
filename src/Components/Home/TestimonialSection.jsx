import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img1 from "../../assets/hero/img1.webp"
import img2 from "../../assets/hero/img2.jpg"
import img3 from "../../assets/hero/img3.webp"
import img4 from "../../assets/hero/img4.jpg"
import img5 from "../../assets/hero/img5.jpg"
import img6 from "../../assets/hero/img8.jpg"
gsap.registerPlugin(ScrollTrigger);

/**
 * TestimonialSection
 * -------------------------------------------------------------
 * Same pinned "Craft / Honesty / Partnership" idea, but now each
 * position on screen ("slot") is its own little carousel: it
 * rises up through the section like before, but WHILE it rises
 * it also snaps through 2-3 images internally — so you get two
 * layers of motion:
 *
 *   1. Slot motion   -> the whole card rising bottom -> top
 *   2. Image motion  -> a hard, instant cut between the images
 *                       that live inside that slot (no crossfade)
 *
 * z-index over/under the title is now an explicit per-slot
 * setting ("layer: 'front' | 'back'") instead of an implicit
 * stacking order, so you can pin exactly which slots sit above
 * the headline and which sit behind it.
 *
 * --- Stability fixes ---
 * The "title jumps up then settles" glitch was a ScrollTrigger
 * pin-recalculation issue, not a title animation bug: images and
 * the huge clamp() heading font load AFTER ScrollTrigger measures
 * the pin start/end points, so the page height shifts slightly
 * once everything loads and ScrollTrigger silently re-pins,
 * which reads as a snap/jump. Fixes applied:
 *   - invalidateOnRefresh on the ScrollTrigger
 *   - explicit ScrollTrigger.refresh() once fonts + images finish
 *   - static gsap.set() moved OUTSIDE the timeline (no redundant
 *     fromTo "from" re-application on scrub direction changes)
 *   - force3D + will-change so slots/title render on their own
 *     compositor layer instead of occasionally repainting
 *   - ScrollTrigger.config to ignore mobile toolbar resize churn
 *
 * --- Image-swap changes (this version) ---
 *   - No more crossfade: images now hard-cut (instant visibility
 *     swap via gsap.set, zero-duration) instead of tweening
 *     autoAlpha over `switchSpeed`.
 *   - Faster cycling: instead of splitting each slot's on-screen
 *     window evenly across just its own image count, images now
 *     cycle on a short fixed interval (IMAGE_SWITCH_INTERVAL) so
 *     they flip multiple times while the slot is on screen,
 *     rather than once per image.
 */

// Title sits at z-20 (see JSX below). Anything above 20 renders
// OVER the letters, anything below 20 renders UNDER them.
const Z_FRONT = 30;
const Z_BACK = 10;

// How much of the timeline's scroll-window passes between each
// hard image cut, as a fraction of the total timeline (0 -> 1).
// Smaller = images change more often. Tune this to taste.
const IMAGE_SWITCH_INTERVAL = 0.035;

const slots = [
  {
    side: "left",
    xPct: 24,
    width: 320,
    layer: "back", // sits BEHIND the title
    images: [
      img1,
      img2,
      img3,
    ],
  },
  {
    side: "left",
    xPct: 6,
    width: 380,
    layer: "front", // sits OVER the title
    images: [
      img4,
      img5,
    ],
  },
  {
    side: "right",
    xPct: 62,
    width: 340,
    layer: "front",
    images: [
      img6,
      img1,
      img2,
    ],
  },
  {
    side: "right",
    xPct: 48,
    width: 400,
    layer: "back",
    images: [
      img3,
      img4,
    ],
  },
  {
    side: "left",
    xPct: 2,
    width: 360,
    layer: "front",
    images: [
      img6,
      img1,
    ],
  },
];

const LINES = ["Where Your", "Mind & Heart", "Feel at Home."];

export default function TestimonialSection() {
  const rootRef = useRef(null);
  const pinRef = useRef(null);
  const slotRefs = useRef([]);
  const imgRefs = useRef([]);

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      const slotEls = slotRefs.current.filter(Boolean);
      const total = slotEls.length;

      slotEls.forEach((slotEl, i) => {
        gsap.set(slotEl, {
          yPercent: 140,
          rotate: i % 2 === 0 ? -3 : 3,
          zIndex: slots[i].layer === "front" ? Z_FRONT + i : Z_BACK + i,
          force3D: true,
          transformPerspective: 1000,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=500%",
          scrub: 1,
          pin: pinRef.current,
          anticipatePin: 1,
          // Recompute tween start/end values cleanly whenever
          // ScrollTrigger refreshes (e.g. after images/fonts load
          // and the page height changes) instead of jumping.
          invalidateOnRefresh: true,
        },
      });

      slotEls.forEach((slotEl, i) => {
        const slotDuration = 1 / total; // scroll-window this slot owns
        const overlap = 0.55 * slotDuration; // bleed into neighbour for a smooth relay
        const start = i * slotDuration;
        const span = slotDuration + overlap;

        // --- 1. Slot rises bottom -> top ---
        // Uses .to() (not .fromTo()) since the "from" state was
        // already committed by gsap.set() above.
        tl.to(
          slotEl,
          { yPercent: -160, ease: "none", duration: span, force3D: true },
          start
        );
        tl.fromTo(
          slotEl,
          { scale: 0.9 },
          { scale: 1.05, ease: "power1.inOut", duration: span, force3D: true },
          start
        );

        // --- 2. Images inside the slot hard-cut on a fast, fixed interval ---
        const imgs = (imgRefs.current[i] || []).filter(Boolean);
        if (imgs.length > 1) {
          gsap.set(imgs, { autoAlpha: 0 });
          gsap.set(imgs[0], { autoAlpha: 1 });

          // Walk forward through the slot's on-screen window in
          // fixed IMAGE_SWITCH_INTERVAL steps, cycling through the
          // images (wrapping back to the first once we run out),
          // so the cut rate no longer depends on how many images
          // the slot has.
          let steps = Math.floor(span / IMAGE_SWITCH_INTERVAL);
          if (steps < 1) steps = 1;

          let activeIdx = 0;
          for (let s = 1; s <= steps; s++) {
            const swapAt = start + s * IMAGE_SWITCH_INTERVAL;
            const nextIdx = (activeIdx + 1) % imgs.length;

            // Instant, no-duration visibility swap — hard cut, no fade.
            tl.set(imgs[activeIdx], { autoAlpha: 0 }, swapAt);
            tl.set(imgs[nextIdx], { autoAlpha: 1 }, swapAt);

            activeIdx = nextIdx;
          }
        }
      });

      // --- Re-measure once fonts and images have actually loaded ---
      // ScrollTrigger's initial pin start/end is calculated on the
      // layout as it exists at mount time. The clamp()-sized
      // heading and the Unsplash images both change the section's
      // rendered height slightly once they finish loading, so we
      // force one clean refresh after both are ready.
      const refresh = () => ScrollTrigger.refresh();

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(refresh);
      }

      const imgEls = rootRef.current.querySelectorAll("img");
      let pending = imgEls.length;

      if (pending === 0) {
        refresh();
      } else {
        imgEls.forEach((img) => {
          if (img.complete) {
            pending -= 1;
          } else {
            img.addEventListener(
              "load",
              () => {
                pending -= 1;
                if (pending === 0) refresh();
              },
              { once: true }
            );
            img.addEventListener(
              "error",
              () => {
                pending -= 1;
                if (pending === 0) refresh();
              },
              { once: true }
            );
          }
        });
        if (pending === 0) refresh();
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-[#fcfbf8] text-[#4A3F5A]"
      style={{ height: "600vh" }}
    >
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        {/* Fixed centered headline — z-20, the layering reference point */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none z-20"
          style={{ willChange: "transform" }}
        >
          {LINES.map((line) => (
            <h2
              key={line}
              className="font-bold tracking-tight leading-[0.95] text-[clamp(3.5rem,10vw,8rem)]"
            >
              {line}
            </h2>
          ))}
        </div>

        {/* Rising slots, each an internal fast-swap image carousel */}
        {slots.map((slot, i) => (
          <div
            key={i}
            ref={(el) => (slotRefs.current[i] = el)}
            className="absolute bottom-[6%] rounded-sm overflow-hidden shadow-xl"
            style={{
              left: `${slot.xPct}%`,
              width: `${slot.width}px`,
              aspectRatio: "3 / 4",
              willChange: "transform",
            }}
          >
            {slot.images.map((src, j) => (
              <img
                key={src + j}
                ref={(el) => {
                  if (!imgRefs.current[i]) imgRefs.current[i] = [];
                  imgRefs.current[i][j] = el;
                }}
                src={src}
                alt=""
                width={600}
                height={800}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ opacity: j === 0 ? 1 : 0 }}
                draggable={false}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
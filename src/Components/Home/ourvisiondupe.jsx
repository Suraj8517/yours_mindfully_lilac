// OurVisionGallery.jsx
import { useEffect, useRef } from "react";
import blobImage from "../../assets/blob.png";
import sugarImg from "../../assets/img5.jpg";
import glovesImg from "../../assets/img3.jpg";
import petriImg from "../../assets/img4.jpg";
import portraitImg from "../../assets/img2.jpg";
import rootsImg from "../../assets/img6.jpg";

const STAGES = [
  {
    threshold: 0,
    text: (
      <h1 className="text-4xl text-green-900" style={{fontWeight:900}}>
        Our Vision
      </h1>
    ),
  },
  {
    threshold: 0.34,
    text: (
      <>
        To make emotional wellness simple, meaningful, 
      </>
    ),
  },
  {
    threshold: 0.68,
    text: (
      <>
        and accessible while helping individuals build resilience, clarity, and emotional balance.
      </>
    ),
  },
];

// --- Phase boundaries, all expressed as fractions of this section's total
// scroll progress (0–1).
//
// Phase 1 [0 -> BLOB_GROW_END]: blob grows + rotates in place, text cycles.
// The blob is fully opaque here.
//
// Phase 2 [RISE_START -> RISE_END]: the moment growth finishes, the blob
// (and its text) starts translating upward, in sync with the gallery
// images rising up from below the viewport. They move together as one
// motion. The last stage's text also finishes fading out over this same
// window (see TEXT_EXIT_START / TEXT_EXIT_END below), so it doesn't stay
// pinned at full opacity once the blob starts moving.
//
// Phase 3 [SIDE_EXIT_START -> SIDE_EXIT_END]: the portrait image locks in
// place (holds its resting spot) while the 4 side images keep rising
// further and exit upward off-screen. The blob keeps moving upward through
// this phase too, until it's carried off the top of the sticky viewport.
// It also fades to a little transparent, starting once the blob has
// finished growing (BLOB_GROW_END), controlled by BLOB_MIN_OPACITY.
//
// Phase 4 [CONTENT_START -> CONTENT_END]: with the side images gone, some
// copy fades in on the left while the portrait stays locked in its resting
// spot.
//
// Phase 5 [PORTRAIT_EXIT_START -> PORTRAIT_EXIT_END]: the portrait (and the
// left-side content) finally un-lock and rise off-screen together, exactly
// as the section's scroll room runs out — this is what releases the
// sticky pin, so nothing is "stuck" forever.

const BLOB_GROW_END = 0.2; // blob finishes growing + text finishes cycling by here

const RISE_START = BLOB_GROW_END; // 0.2 — blob + gallery start moving together right here
const RISE_END = 0.38; // gallery fully settled into its row position

const SIDE_EXIT_START = 0.42; // the 4 side images (and the blob) rise further and exit
const SIDE_EXIT_END = 0.6;

const CONTENT_START = SIDE_EXIT_END; // 0.6 — left-side content starts fading in
const CONTENT_END = 0.8; // left-side content fully visible, portrait still locked

const PORTRAIT_EXIT_START = CONTENT_END; // 0.8 — portrait + left content finally release
const PORTRAIT_EXIT_END = 1; // fully exited exactly as the section's scroll room ends

// The last STAGES entry has no "next" threshold to fade out against (it
// just fades in and stays), so we give it its own progress-based exit
// window here, timed to finish right as the blob starts lifting off.
const TEXT_EXIT_START = BLOB_GROW_END; // 0.2 — starts fading right as growth ends
const TEXT_EXIT_END = RISE_END; // 0.38 — fully gone by the time the gallery settles

const MIN_SIZE = 460;
const MAX_SIZE = 960;
const MAX_ROTATION = 90;
const FADE_WINDOW = 0.12;
const SMOOTHING = 0.08;

const RISE_DISTANCE = 420; // how far below their resting spot the gallery images start
const EXIT_DISTANCE = 900; // how far up the side images travel as they exit
const PORTRAIT_EXIT_DISTANCE = 900; // how far up the portrait travels once it finally releases

const BLOB_RISE_DISTANCE = 300; // how far the blob moves up while the gallery rises into view
const BLOB_EXIT_DISTANCE = 900; // how much further the blob continues up during the exit phase
const BLOB_MIN_OPACITY = 0.25; // how transparent the blob gets by the very end (1 = no fade)
const BLOB_EXTRA_GAP = 160; // additional lift, eased in together with the rise motion, to open
// up more space above the gallery once things have settled. Unlike a static
// offset applied at every progress value, this is 0 at rest/entry
// (progress 0), so it can never overlap the previous section — it only
// grows in as the blob actually rises (same easedRiseT as BLOB_RISE_DISTANCE).

const CONTENT_SLIDE_DISTANCE = 60; // small slide-in distance for the left content copy

function lerp(a, b, t) {
  return a + (b - a) * t;
}
function clamp01(v) {
  return Math.min(1, Math.max(0, v));
}
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
function easeInCubic(t) {
  return t * t * t;
}

export default function OurVisionGallery() {
  const wrapperRef = useRef(null);
  const blobLayerRef = useRef(null); // handles the blob+text group's upward translate
  const blobRef = useRef(null); // handles the blob's grow/rotate scale
  const blobImgRef = useRef(null); // handles the blob image's opacity fade
  const textRefs = useRef([]);
  const galleryRowRef = useRef(null); // handles the gallery row's visibility (hidden until RISE_START)
  const portraitRef = useRef(null);
  const sideRefs = useRef([]); // [sugar, gloves, petri, roots]
  const leftContentRef = useRef(null); // the copy that appears on the left after side images exit

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    // Mobile gets a plain static layout (see the mobile-only markup below) —
    // skip all the scroll-driven animation work entirely there.
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const computeTarget = () => {
      const el = wrapperRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const scrollableDistance = rect.height - viewportH;

      if (scrollableDistance <= 0) {
        targetProgress.current = 0;
        return;
      }

      const raw = -rect.top / scrollableDistance;
      targetProgress.current = clamp01(raw);
    };

    const applyToDom = (progress) => {
      // --- Blob: grow + rotate over [0, BLOB_GROW_END]. ---
      const blobT = clamp01(progress / BLOB_GROW_END);
      const size = lerp(MIN_SIZE, MAX_SIZE, blobT);
      const rotation = lerp(0, MAX_ROTATION, blobT);
      if (blobRef.current) {
        const scale = size / MAX_SIZE;
        blobRef.current.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
      }

      // --- Text stages, mapped against blob's own sub-progress ---
      STAGES.forEach((stage, i) => {
        const nextThreshold = STAGES[i + 1]?.threshold ?? 1;
        const span = Math.max(nextThreshold - stage.threshold, 0.0001);
        const fade = Math.min(FADE_WINDOW, span / 2);

        const fadeIn = clamp01((blobT - (stage.threshold - fade)) / fade);
        const fadeOut = clamp01((nextThreshold - blobT) / fade);

        let opacity;
        if (i === STAGES.length - 1) {
          // Last stage has no "next" threshold to fade against — instead it
          // fades out against real scroll progress once the blob is done
          // growing, so it doesn't stay stuck on screen forever.
          const lateFadeOut = clamp01(
            (TEXT_EXIT_END - progress) / (TEXT_EXIT_END - TEXT_EXIT_START)
          );
          opacity = Math.min(fadeIn, lateFadeOut);
        } else {
          opacity = Math.min(fadeIn, fadeOut);
        }

        const node = textRefs.current[i];
        if (node) node.style.opacity = opacity;
      });

      const riseT = clamp01(
        (progress - RISE_START) / (RISE_END - RISE_START)
      );
      const easedRiseT = easeOutCubic(riseT);
      const riseY = lerp(RISE_DISTANCE, 0, easedRiseT);

      const exitT = clamp01(
        (progress - SIDE_EXIT_START) / (SIDE_EXIT_END - SIDE_EXIT_START)
      );
      const easedExitT = easeInCubic(exitT);
      const exitY = lerp(0, -EXIT_DISTANCE, easedExitT);

      // --- Blob + text group: rides the same up-then-exit motion, at its
      // own distances, so it visually travels together with the gallery
      // rather than fading away. BLOB_EXTRA_GAP adds a little extra lift on
      // top of that, eased in with the same easedRiseT, so the gap only
      // opens up as the blob rises — never at rest/entry. ---
      const blobRiseY = lerp(0, -BLOB_RISE_DISTANCE, easedRiseT);
      const blobExitY = lerp(0, -BLOB_EXIT_DISTANCE, easedExitT);
      const blobExtraGapY = lerp(0, -BLOB_EXTRA_GAP, easedRiseT);
      if (blobLayerRef.current) {
        blobLayerRef.current.style.transform = `translateY(${
          blobRiseY + blobExitY + blobExtraGapY
        }px)`;
      }

      // --- Blob image: stays fully opaque while growing, then fades to a
      // little transparent from BLOB_GROW_END through the rest of scroll. ---
      const fadeT = clamp01((progress - BLOB_GROW_END) / (1 - BLOB_GROW_END));
      if (blobImgRef.current) {
        blobImgRef.current.style.opacity = lerp(1, BLOB_MIN_OPACITY, fadeT);
      }

      if (galleryRowRef.current) {
        galleryRowRef.current.style.opacity = riseT;
        galleryRowRef.current.style.visibility = riseT > 0 ? "visible" : "hidden";
      }

      // --- Left-side content: fades (+ slides in) once the side images have
      // exited, then exits together with the portrait at the very end. ---
      const contentInT = clamp01(
        (progress - CONTENT_START) / (CONTENT_END - CONTENT_START)
      );
      const easedContentInT = easeOutCubic(contentInT);

      const portraitExitT = clamp01(
        (progress - PORTRAIT_EXIT_START) / (PORTRAIT_EXIT_END - PORTRAIT_EXIT_START)
      );
      const easedPortraitExitT = easeInCubic(portraitExitT);
      const portraitExitY = lerp(0, -PORTRAIT_EXIT_DISTANCE, easedPortraitExitT);

      if (leftContentRef.current) {
        const contentSlideY = lerp(CONTENT_SLIDE_DISTANCE, 0, easedContentInT);
        leftContentRef.current.style.opacity =
          easedContentInT * (1 - easedPortraitExitT);
        leftContentRef.current.style.visibility =
          contentInT > 0 ? "visible" : "hidden";
        leftContentRef.current.style.transform = `translateY(${
  contentSlideY + portraitExitY
}px)`;
      }

      // Portrait: rises once, holds while the side images exit and the left
      // content appears, then finally releases and exits upward too — it's
      // never locked in place forever.
      if (portraitRef.current) {
        portraitRef.current.style.transform = `translateY(${riseY + portraitExitY}px)`;
        portraitRef.current.style.opacity = 1 - easedPortraitExitT;
      }

      // Side images: rise the same way, then additionally exit upward + fade.
      sideRefs.current.forEach((node) => {
        if (!node) return;
        node.style.transform = `translateY(${riseY + exitY}px)`;
        node.style.opacity = 1 - easedExitT;
      });
    };

    const loop = () => {
      const diff = targetProgress.current - currentProgress.current;
      if (Math.abs(diff) > 0.0001) {
        currentProgress.current += diff * SMOOTHING;
      } else {
        currentProgress.current = targetProgress.current;
      }

      applyToDom(currentProgress.current);
      rafId.current = requestAnimationFrame(loop);
    };

    const onScroll = () => computeTarget();
    const onResize = () => computeTarget();

    computeTarget();
    currentProgress.current = targetProgress.current;
    applyToDom(currentProgress.current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
    {/* Mobile — plain static layout, no scroll animation, blob as background art */}
    <section className="relative block w-full overflow-hidden bg-[#FCFBF8] px-6 py-16 md:hidden">
    
      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-black text-green-900">Our Vision</h1>
        <p className="max-w-sm font-serif text-xl leading-snug text-neutral-900">
          To make emotional wellness simple, meaningful, and accessible while
          helping individuals build resilience, clarity, and emotional
          balance.
        </p>

        <div className="mt-4 flex items-end justify-center gap-4">
          <img
            src={portraitImg}
            alt=""
            className="h-[300px] w-[220px] flex-shrink-0 rounded-2xl object-cover"
          />
        
        </div>

        <div className="mt-8 max-w-sm">
          <h3 className="font-serif text-2xl leading-snug text-neutral-900">
            Our Mission
          </h3>
          <p className="mt-3 text-base leading-relaxed text-neutral-700">
            To empower people to understand themselves deeply, embrace their
            emotions with compassion, and create healthier, more fulfilling
            lives.
          </p>
        </div>
      </div>
    </section>

    {/* Desktop — existing scroll-driven animated version, untouched */}
    <section ref={wrapperRef} className="relative hidden h-[450vh] w-full bg-[#FCFBF8] md:block">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        <div
          ref={galleryRowRef}
          className="absolute inset-x-0 bottom-[4%] z-0 flex items-start justify-center gap-4 px-6 md:gap-6 "
          style={{ opacity: 0, visibility: "hidden" }}
        >
          <img
            ref={(node) => (sideRefs.current[0] = node)}
            src={sugarImg}
            alt=""
            className="mt-8 h-[220px] w-[200px] flex-shrink-0 rounded-2xl object-cover will-change-transform md:h-[260px] md:w-[230px]"
          />
          <img
            ref={(node) => (sideRefs.current[1] = node)}
            src={glovesImg}
            alt=""
            className=" h-[300px] w-[220px] flex-shrink-0 rounded-2xl object-left object-cover will-change-transform md:h-[380px] md:w-[260px]"
          />
          <img
            ref={(node) => (sideRefs.current[2] = node)}
            src={petriImg}
            alt=""
            className="mt-10 h-[200px] w-[200px] flex-shrink-0 rounded-2xl object-cover will-change-transform md:h-[240px] md:w-[240px]"
          />
          <img
            ref={portraitRef}
            src={portraitImg}
            alt=""
            className="h-[400px] w-[320px] flex-shrink-0 rounded-2xl object-cover will-change-transform md:h-[560px] md:w-[500px] 2xl:h-[780px] 2xl:w-[680px]"
          />
          <img
            ref={(node) => (sideRefs.current[3] = node)}
            src={rootsImg}
            alt=""
            className="mt-10 h-[220px] w-[200px] flex-shrink-0 rounded-2xl object-cover will-change-transform md:h-[260px] md:w-[230px]"
          />
        </div>

        {/* Left-side copy, revealed once the side images have exited and the
            portrait has settled into its resting spot. */}
        <div
          ref={leftContentRef}
          className="absolute inset-0  flex items-center"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          <div className="mx-auto  w-full max-w-4xl items-center">
             <div className="w-1/2 pr-12">
            <h3 className="font-serif text-3xl leading-snug text-neutral-900 md:text-5xl">
              Our Mission
            </h3>
            <p className="mt-4 text-base leading-relaxed text-neutral-700 md:text-xl">
              To empower people to understand themselves deeply, embrace their emotions with compassion, and create healthier, more fulfilling lives.
            </p>
            </div>
          </div>
        </div>

        <div
          ref={blobLayerRef}
          className="absolute inset-0 z-10 flex items-center justify-center will-change-transform"
        >
          <div
            className="relative flex items-center justify-center"
            style={{
              width: `${MAX_SIZE}px`,
              height: `${MAX_SIZE}px`,
              maxWidth: "90vw",
              maxHeight: "90vw",
            }}
          >
            <div
              ref={blobRef}
              className="absolute inset-0 will-change-transform "
              style={{ transformOrigin: "center center" }}
            >
              <img
                ref={blobImgRef}
                src={blobImage}
                alt=""
                aria-hidden="true"
                className="h-full w-full select-none object-contain pointer-events-none"
                style={{ opacity: 1 }}
              />
            </div>

            <div className="relative z-10 flex h-full w-full items-center justify-center px-10">
              {STAGES.map((stage, i) => (
                <p
                  key={i}
                  ref={(node) => (textRefs.current[i] = node)}
                  className="absolute max-w-[280px] text-center font-serif text-2xl leading-snug text-neutral-900 will-change-[opacity] md:text-[28px]"
                  style={{ opacity: 0 }}
                >
                  {stage.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
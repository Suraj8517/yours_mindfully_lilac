// OurVisionGallery.jsx
import { useEffect, useRef } from "react";
import blobImage from "../../assets/blob.png";
import portraitImg from "../../assets/img2.jpg";
import leafImg from '../../assets/leaf.png' 

const STAGES = [
  {
    threshold: 0,
    text: (
      <h1 className="text-4xl text-[#657C4F]" style={{fontWeight:900}}>
        Our Vision
      </h1>
    ),
  },
  {
    threshold: 0.34,
    text: (
      <h3 className="text-2xl ">
        To make emotional wellness simple, meaningful, 
      </h3>
    ),
  },
  {
    threshold: 0.68,
    text: (
      <h3 className="text-2xl">
        and accessible while helping individuals build resilience, clarity, and emotional balance.
      </h3>
    ),
  },
];

// --- Only phase left: the blob grows + rotates in place over
// [0 -> BLOB_GROW_END], and the text cycles through STAGES in sync with it.
// BLOB_GROW_END is pushed out further (and SMOOTHING lowered) so the grow
// animation feels slower/softer, while the section itself is shorter since
// there's no gallery-rise/exit phase left to make room for.

const BLOB_GROW_END = 0.65; // blob finishes growing + text finishes cycling by here

const MIN_SIZE = 460;
const MAX_SIZE = 620;
const MAX_ROTATION = 90;
const FADE_WINDOW = 0.12;
const SMOOTHING = 0.045; // lower = more lag between scroll and motion = slower feel

// How far the leaves drift while the section is pinned, as a fraction of
// scroll progress (0 -> 1 across the whole pin). Different rates per leaf
// give a subtle depth/parallax feel rather than moving as one flat layer.
const LEAF_TOP_DRIFT = 40; // px
const LEAF_BOTTOM_DRIFT = 60; // px

function lerp(a, b, t) {
  return a + (b - a) * t;
}
function clamp01(v) {
  return Math.min(1, Math.max(0, v));
}

export default function OurVisionGallery() {
  const wrapperRef = useRef(null);
  const blobLayerRef = useRef(null);
  const blobRef = useRef(null);
  const blobImgRef = useRef(null);
  const textRefs = useRef([]);
  const leafTopRef = useRef(null);
  const leafBottomRef = useRef(null);

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

      // --- Leaves: gentle drift while the section is pinned ---
      if (leafTopRef.current) {
        leafTopRef.current.style.transform = `translateY(${progress * LEAF_TOP_DRIFT}px)`;
      }
      if (leafBottomRef.current) {
        leafBottomRef.current.style.transform = `translateY(${-progress * LEAF_BOTTOM_DRIFT}px)`;
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
          opacity = fadeIn;
        } else {
          opacity = Math.min(fadeIn, fadeOut);
        }

        const node = textRefs.current[i];
        if (node) node.style.opacity = opacity;
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
    <section className="relative block w-full overflow-hidden bg-[#FCFBF8] px-6 py-8 md:hidden">
    
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
            className="h-[360px] w-[280px] flex-shrink-0 rounded-2xl object-cover"
          />
        
        </div>
      </div>
    </section>

    {/* Desktop — scroll-driven blob grow animation, shorter section */}
    <section ref={wrapperRef} className="relative hidden h-[150vh] w-full bg-[#FCFBF8] md:block ">
      <div className="sticky top-0 h-screen w-full overflow-hidden ">

        <div
          ref={blobLayerRef}
          className="absolute inset-0 z-10 flex items-center justify-center will-change-transform"
        >
          {/* Ambient leaf background — spans the whole section on a
              diagonal (top-left -> bottom-right) rather than sitting as
              two corner accents, so it reads as full-section art. */}
          <img
            ref={leafTopRef}
            src={leafImg}
            alt=""
            draggable="false"
            className="pointer-events-none select-none absolute -top-16 -left-16 sm:-top-20 sm:-left-20 md:-top-24 md:-left-24 w-[70vw] sm:w-[62vw] md:w-[56vw] opacity-80 will-change-transform"
          />

          <img
            ref={leafBottomRef}
            src={leafImg}
            alt=""
            draggable="false"
            className="pointer-events-none select-none absolute -bottom-16 -right-16 sm:-bottom-20 sm:-right-20 md:-bottom-24 md:-right-24 w-[70vw] sm:w-[62vw] md:w-[56vw] opacity-80 will-change-transform rotate-180"
          />

          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-24 sm:h-32 md:h-40 z-[5]"
            style={{
              background: 'linear-gradient(to top, rgba(252,251,248,0) 0%, #FCFBF8 100%)',
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-32 md:h-52 z-[5]"
            style={{
              background: 'linear-gradient(to bottom, rgba(252,251,248,0) 0%, #FCFBF8 100%)',
            }}
          />

          <div
            className="relative flex items-center justify-center"
            style={{
              width: `${MAX_SIZE}px`,
              height: `${MAX_SIZE}px`,
              maxWidth: "100vw",
              maxHeight: "100vh",
            }}
          >
            
            <div
              ref={blobRef}
              className="absolute inset-0 will-change-transform z-10 "
              style={{ transformOrigin: "center center" }}
            >
              <img
                ref={blobImgRef}
                src={blobImage}
                alt=""
                aria-hidden="true"
                className="h-full w-full select-none object-contain pointer-events-none "
                style={{ opacity: 1 }}
              />

            </div>
            

            <div className="relative z-10 flex h-full w-full items-center justify-center px-10">
              {STAGES.map((stage, i) => (
                <h1
                  key={i}
                  ref={(node) => (textRefs.current[i] = node)}
                  className="absolute max-w-[280px] text-center font-serif leading-snug text-neutral-900 will-change-[opacity] "
                  style={{ opacity: 0 }}
                >
                  {stage.text}
                </h1>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
    </>
  );
}
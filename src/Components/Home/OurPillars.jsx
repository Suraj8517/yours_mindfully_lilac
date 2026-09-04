import React, { useEffect, useRef, useState } from "react";
import img1 from "../../assets/pillars/educate.webp"
import img2 from "../../assets/pillars/community.webp"
import img3 from "../../assets/pillars/empower.webp"
import img4 from "../../assets/pillars/well.webp"


const CARD_HEIGHT_VH_XL = 72; // card height below 1536px (xl and smaller)
const CARD_HEIGHT_VH_2XL = 68; // card height at 1536px and above
const CARD_GAP_VH = 4; // vertical gap between stacked cards, in vh
const TWO_XL_BREAKPOINT = 1536;

// Lilac accent used across the left column and card chrome
const LILAC = "#B497D6";
const LILAC_SOFT = "#E7DDF3"; // pale lilac for inactive states / glows
const INK = "#3F3752"; // deep plum-grey for headings, replaces the old green ink

const slides = [
{
  id: "biomass",
  title: "About Us",
  body: "Mindfully You is an emotional wellness platform helping individuals reconnect with themselves through mindful, evidence-based practices. From therapy and self-paced learning to relationship guidance and wellness programs, we offer support designed around your unique journey.",
  imgAlt: "educating about wellness",
  imgClass: "from-amber-900 via-amber-700 to-stone-800",
  image: img1,
},
  {
    id: "chemistry",
    title: "Our Vision",
    body: "To empower people to understand themselves deeply, embrace their emotions with compassion, and create healthier, more fulfilling lives. ",
    imgAlt: "Amber liquid being poured into a petri dish",
    imgClass: "from-slate-800 via-slate-700 to-amber-700",
    image:img3
  },
  {
    id: "performance",
    title: "Our  Mission",
    body: "To make emotional wellness simple, meaningful, and accessible while helping individuals build resilience, clarity, and emotional balance. ",
    imgAlt: "Material sample under lab lighting",
    imgClass: "from-emerald-900 via-teal-800 to-stone-800",
        image:img2
  }
];

export default function OurPillars() {
  const wrapperRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0 -> 1 across the whole pinned scroll
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardHeightVh, setCardHeightVh] = useState(CARD_HEIGHT_VH_XL);

  // Pick card height based on viewport width (matches Tailwind's 2xl breakpoint)
  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${TWO_XL_BREAKPOINT}px)`);

    function updateCardHeight(e) {
      setCardHeightVh(e.matches ? CARD_HEIGHT_VH_2XL : CARD_HEIGHT_VH_XL);
    }

    updateCardHeight(mql);
    mql.addEventListener("change", updateCardHeight);
    return () => mql.removeEventListener("change", updateCardHeight);
  }, []);

  const STEP_VH = cardHeightVh;

  // Total scroll room the wrapper occupies. The first 100vh is "used up"
  // just getting the section pinned (nothing animates during that part —
  // it's the natural scroll-in). Everything after that is the distance the
  // panels travel, so this is exactly (slides.length - 1) * STEP_VH.
  const wrapperHeightVh = 150 + (slides.length - 1) * STEP_VH;

  useEffect(() => {
    function handleScroll() {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const scrollableDistance = wrapper.offsetHeight - viewportH;

      if (scrollableDistance <= 0) {
        setProgress(0);
        return;
      }

      // How far we've scrolled into the wrapper (0 at top, scrollableDistance at bottom)
      const scrolled = -rect.top;
      const clamped = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);

      setProgress(clamped);
      setActiveIndex(Math.min(slides.length - 1, Math.round(clamped * (slides.length - 1))));
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const translateY = -progress * (slides.length - 1) * STEP_VH; // in vh

  return (
    <section
      ref={wrapperRef}
      className="relative"
      style={{ height: `${wrapperHeightVh}vh` }}
    >
      <h2 className="text-center pb-12 text-5xl">WHY CHOOSE MINDFULLY YOU </h2>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#FCFBF8]">
        <div className="mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 gap-8 px-6 md:grid-cols-[220px_1fr] md:gap-12 md:px-12">
          {/* LEFT: always vertically centered on screen, independent of right column.
              Shows the running list of card titles; the one in view is highlighted. */}
          <div className="hidden sm:flex h-full flex-col justify-center">
            <ul className="flex flex-col gap-5">
              {slides.map((s, i) => {
                const isActive = i === activeIndex;
                return (
                  <li key={s.id} className="flex items-center gap-3">
                    <span
                      className="h-px shrink-0 transition-all duration-300"
                      style={{
                        width: isActive ? "28px" : "14px",
                        backgroundColor: isActive ? LILAC : "#D9D3E3",
                      }}
                    />
                    <span
                      className="font-serif leading-snug transition-all duration-300"
                      style={{
                        color: isActive ? LILAC : "#B7AFC6",
                        fontSize: isActive ? "1.5rem" : "1.05rem",
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      {s.title.trim()}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* mobile: same title list, shown horizontally-ish above the cards */}
          <div className="pt-4 sm:hidden flex h-full flex-col justify-center">
            <ul className="flex flex-col gap-3">
              {slides.map((s, i) => {
                const isActive = i === activeIndex;
                return (
                  <li key={s.id} className="flex items-center gap-3">
                    <span
                      className="h-px shrink-0 transition-all duration-300"
                      style={{
                        width: isActive ? "22px" : "12px",
                        backgroundColor: isActive ? LILAC : "#D9D3E3",
                      }}
                    />
                    <span
                      className="font-serif leading-snug transition-all duration-300"
                      style={{
                        color: isActive ? LILAC : "#B7AFC6",
                        fontSize: isActive ? "1.15rem" : "0.95rem",
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      {s.title.trim()}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* RIGHT: scrolling stacked panels — fixed-height cards, next card peeks at the bottom */}
          <div className="relative h-full min-h-0 w-full overflow-hidden">
            <div
              className="flex flex-col"
              style={{
                transform: `translateY(${translateY}vh)`,
                height: `${slides.length * STEP_VH}vh`,
              }}
            >
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="box-border w-full"
                  style={{
                    height: `${STEP_VH}vh`,
                    paddingBottom: `${CARD_GAP_VH}vh`,
                  }}
                >
                  <div className="relative h-full w-full ">
                    {/* soft lilac glow bleeding out from behind the card */}
                    <div
                      className="pointer-events-none absolute -inset-6 -z-10 rounded-[48px] opacity-70 blur-2xl"
                      
                    />

                    <div
                      className="grid h-full w-full grid-cols-1 bg-[#FCFBF8] overflow-hidden rounded-[112px] sm:grid-cols-[1fr_1.05fr]"
                      style={{
                        boxShadow:
                          "inset 0 0 0 2px rgba(180,151,214,0.25), inset 0 4px 24px 8px rgba(180,151,214,0.22)",
                      }}
                    >
                      {/* Text block */}
                      <div className="flex flex-col justify-center px-6 py-8 sm:px-10 lg:px-12">
                        <h3
                          className="font-serif text-2xl leading-tight sm:text-3xl lg:text-4xl"
                          style={{ color: INK }}
                        >
                          {slide.title}
                        </h3>
                        <p className="mt-4 max-w-md text-[13px] leading-relaxed text-stone-900 sm:text-lg">
                          {slide.body}
                        </p>
                      </div>

                      {/* Image block */}
                      <img
                        src={slide.image}
                        alt={slide.imgAlt}
                        className="w-full h-full object-cover rounded-[112px] border"
                        style={{ borderColor: LILAC_SOFT }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
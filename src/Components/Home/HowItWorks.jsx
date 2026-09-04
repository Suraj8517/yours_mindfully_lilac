import React, { useEffect, useRef, useState } from "react";
import img from "../../assets/img2.jpg"
/**
 * "How to work with us?" — full-bleed textured hero with a 4-column
 * information strip along the bottom, echoing the reference: a warm,
 * hand-held material sample fills the frame, oversized serif headline
 * top-left, four short columns of copy separated by hairline rules.
 *
 * Columns (in order, since this reads left-to-right as a light process,
 * not just a list): who it's for → what you get → why it matters → how
 * we start. That progression is the reason for the ordering, not a
 * generic 01/02/03/04 marker treatment.
 */

const COLUMNS = [
  {
    heading: "Step 1 ",
    body: "Book a Clarity Connect Session or choose the service you're interested in. ",
  },
  {
    heading: "Step 2 ",
    body: "Understand your emotional patterns through professional guidance and assessments. ",
  },
  {
    heading: "Step 3 ",
    body: "Begin your personalized emotional wellness journey with practical tools and structured support. ",
  },
  {
    heading: "Step 4 ",
    body: "Grow with confidence through continued learning, community, and long-term emotional well-being. ",
  },
];

export default function HowToWorkWithUs() {
  const fontLoaded = useRef(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!fontLoaded.current) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,500&family=Inter:wght@400;500&display=swap";
      document.head.appendChild(link);
      fontLoaded.current = true;
    }
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] sm:min-h-screen w-full overflow-hidden bg-[#2b241d]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Textured material backdrop */}
      <div className="absolute inset-0">
        <img
          src={img}
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: "sepia(0.25) saturate(1.0) brightness(0.62)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(10,7,5,0.86) 0%, rgba(10,7,5,0.42) 32%, rgba(10,7,5,0.34) 68%, rgba(10,7,5,0.84) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(8,6,4,0.7) 0%, rgba(8,6,4,0.15) 30%, rgba(8,6,4,0.15) 70%, rgba(8,6,4,0.55) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      <div className="relative mx-auto flex min-h-[70vh] sm:min-h-screen w-full max-w-[90rem] flex-col justify-end px-6 py-14 sm:px-14 sm:py-20 2xl:px-20 2xl:py-24">
  
        <h1
          className={`absolute left-6 top-14 max-w-2xl text-7xl leading-[.8rem] text-[#F6EFE4] transition-all duration-700 ease-out sm:left-17 sm:top-25 2xl:left-20 2xl:top-44 2xl:text-[7.2rem] ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
        >
          How it<br/> works
        </h1>

        {/* Four columns */}
        <div className="grid grid-cols-2 gap-8 sm:mb-6 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-10 lg:mb-10 lg:grid-cols-4 lg:gap-x-0 align-bottom">
          {COLUMNS.map((col, i) => (
            <div
              key={col.heading}
              className={`relative pr-6 transition-all duration-700 ease-out lg:border-[#F6EFE4]/25 lg:px-8 lg:first:pl-0 lg:last:pr-0 ${
                i > 0 ? "lg:border-l" : ""
              } ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: visible ? `${120 + i * 90}ms` : "0ms" }}
            >
              <p
                className="mb-3 text-[1.05rem] italic leading-snug text-[#F6EFE4] 2xl:text-[1.35rem]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
              >
                {col.heading}
              </p>
              <p className="text-[0.82rem] leading-relaxed text-[#F6EFE4]/75 2xl:text-[0.95rem]">
                {col.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
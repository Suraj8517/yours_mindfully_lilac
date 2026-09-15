import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

import img1 from "../../assets/success-stories/Media (1).jpg"
import img2 from "../../assets/success-stories/Media (2).jpg"
import img3 from "../../assets/success-stories/Media (3).jpg"
import img4 from "../../assets/success-stories/Media (4).jpg"
import img5 from "../../assets/success-stories/Media (5).jpg"

// ---- Image testimonials (screenshots) ----
const imagePeople = [
  { type: "image", name: "Dipti", tag: "Daily check-ins", src: img1 },
  { type: "image", name: "Pallavi", tag: "Emotional regulation", src: img2 },
  { type: "image", name: "Mainu", tag: "Sleep & meditation", src: img3 },
  { type: "image", name: "Durga", tag: "EFT tapping", src: img4 },
  { type: "image", name: "Sandhya", tag: "Confidence & routine", src: img5 },
];


const textPeople = [
  {
    type: "text",
    name: "Sai Divya",
    quote:
      "I truly appreciate the patience, understanding, and warmth you brought into every session. Your guidance made me feel safe, supported, and confident to step outside my comfort zone.",
  },
  {
    type: "text",
    name: "Anjana Sanjeev",
    quote: "Thanks a ton!!",
  },
  {
    type: "text",
    name: "Sneha Priya Vuduthalapally",
    quote:
      "Thank you Dr. Arthi for creating a safe space to open up. Your guidance helped me understand myself better and see my marriage more positively.",
  },
  {
    type: "text",
    name: "Keerthi",
    quote:
      "Thank you so much Arthi maam. In a short time, you gave me so much clarity and helped me change my perceptions positively.",
  },
  {
    type: "text",
    name: "Sherin Joseph",
    quote:
      "Thank you for helping me realise that I wasn't weak, but simply suppressing who I truly am. You helped me embrace my 'Version 2' and understand myself better.",
  },
];

// Interleave images and text so both rows get a natural mix.
const interleave = (a, b) => {
  const out = [];
  const max = Math.max(a.length, b.length);
  for (let i = 0; i < max; i++) {
    if (a[i]) out.push(a[i]);
    if (b[i]) out.push(b[i]);
  }
  return out;
};

const people = interleave(imagePeople, textPeople);

// Repeat the full set enough times that even a very wide monitor never runs
// out of cards before the loop point. Bump REPEATS up if you add a wider
// max-width container, or down if you only ever have 2-3 real testimonials.
const REPEATS = 5;
const buildRow = (order) =>
  Array.from({ length: REPEATS }).flatMap((_, i) =>
    order.map((p) => ({ ...p, key: `${p.name}-${i}` }))
  );

const rowOneItems = buildRow(people);
const rowTwoItems = buildRow([...people].reverse());

// Shared card shell so image and text testimonials read as one family:
// same size, same radius, same border/shadow, same name footer.
function CardShell({ children, footerName }) {
  return (
    <figure
      className="mx-3 flex w-[220px] shrink-0 flex-col overflow-hidden rounded-2xl border bg-white sm:w-[250px]"
      style={{
        borderColor: "#E4DEE9",
        boxShadow: "0 10px 15px -20px rgba(36,27,46,0.35)",
      }}
    >
      <div className="relative h-[280px] w-full overflow-hidden sm:h-[320px]">
        {children}
      </div>
      <figcaption
        className="flex items-center justify-between border-t px-4 py-3"
        style={{ borderColor: "#EEE9F2" }}
      >
        <span className="text-sm" style={{ color: "#241B2E", fontWeight: 600 }}>
          {footerName}
        </span>
      </figcaption>
    </figure>
  );
}

function ImageCard({ item }) {
  return (
    <CardShell footerName={item.name}>
      <img
        src={item.src}
        alt={`Feedback message from ${item.name}`}
        className="h-full w-full object-contain object-center"
        loading="lazy"
      />
    </CardShell>
  );
}

function TextCard({ item }) {
  return (
    <CardShell footerName={item.name}>
      <div
        className="flex h-full w-full flex-col px-5 py-5"
        style={{ backgroundColor: "#FAF8FB" }}
      >
        <span
          aria-hidden="true"
          className="leading-none"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "2.75rem",
            color: "#C9B8E0",
          }}
        >
          &ldquo;
        </span>
        <p
          className="mt-1 flex-1 overflow-hidden text-[13.5px] leading-relaxed sm:text-sm"
          style={{ color: "#4A4353" }}
        >
          {item.quote}
        </p>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10"
          style={{ background: "linear-gradient(to top, #FAF8FB, transparent)" }}
        />
      </div>
    </CardShell>
  );
}

function Card({ item }) {
  return item.type === "image" ? <ImageCard item={item} /> : <TextCard item={item} />;
}

export default function ScreenshotMarquee() {
  const trackARef = useRef(null);
  const trackBRef = useRef(null);
  const tweenARef = useRef(null);
  const tweenBRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      tweenARef.current = gsap.to(trackARef.current, {
        xPercent: -50,
        duration: 46,
        ease: "none",
        repeat: -1,
      });

      gsap.set(trackBRef.current, { xPercent: -50 });
      tweenBRef.current = gsap.to(trackBRef.current, {
        xPercent: 0,
        duration: 56,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  const pause = () => {
    tweenARef.current?.pause();
    tweenBRef.current?.pause();
  };
  const resume = () => {
    tweenARef.current?.play();
    tweenBRef.current?.play();
  };

  return (
    <section
      className="overflow-hidden px-6 py-20 sm:px-10 lg:px-16"
      style={{ backgroundColor: "#FCFBFA", fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500&family=Inter:wght@400;500;600&display=swap');
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm" style={{ color: "#7C6A9C" }}>
          As shared with us
        </p>
        <h2
          className="mt-3 text-3xl leading-snug sm:text-4xl"
          style={{ fontFamily: "'Fraunces', serif", color: "#7C5FA6", fontWeight: 500 }}
        >
          The messages we hold onto
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed" style={{ color: "#6B6470" }}>
          Unedited, exactly as they reached us
        </p>
      </div>

      <div className="relative mt-14" onMouseEnter={pause} onMouseLeave={resume}>
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32"
          style={{ background: "linear-gradient(to right, #FCFBFA, transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32"
          style={{ background: "linear-gradient(to left, #FCFBFA, transparent)" }}
        />

        <div className="flex overflow-hidden py-3">
          <div ref={trackARef} className="flex w-max">
            {rowOneItems.map((item) => (
              <Card item={item} key={`a-${item.key}`} />
            ))}
          </div>
        </div>

        <div className="mt-6 flex overflow-hidden py-3">
          <div ref={trackBRef} className="flex w-max">
            {rowTwoItems.map((item) => (
              <Card item={item} key={`b-${item.key}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
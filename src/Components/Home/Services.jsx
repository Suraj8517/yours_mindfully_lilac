import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  HeartHandshake,
  Users,
  Layers,
  BookOpen,
  Video,
  UsersRound,
  ArrowRight,
  Download,
} from "lucide-react";

import clarity from "../../assets/services/clarity.webp";
import relation from "../../assets/services/relationship.webp";
import emotional from "../../assets/services/emotional wellness.webp";
import community from "../../assets/services/community.webp";
import journey from "../../assets/services/journey.webp";
import growth from "../../assets/services/growth.webp";
import webinars from "../../assets/services/webinars.webp";

// ---------------------------------------------------------------------------
// Shared "Request a Callback" destination — used across every program that
// offers a callback option, so it only needs to change in one place.
// ---------------------------------------------------------------------------
const CALLBACK_FORM_LINK = "#request-a-callback";

// ---------------------------------------------------------------------------
// Brochure downloads
// ---------------------------------------------------------------------------
// Put the actual PDF files in your app's static/public folder, e.g.:
//   public/brochures/personal-growth-and-healing.pdf
//   public/brochures/relationship-wellness.pdf
//   public/brochures/relationship-renewal.pdf
// The paths below assume a Vite/CRA-style `public/` folder served from `/`.
// If you're using Next.js, the same rule applies — files in `public/brochures/`
// are reachable at `/brochures/...`.
//
// Each entry needs:
//   - href:     the path/URL to the PDF
//   - fileName: the filename the browser will save it as (via the `download`
//               attribute) — this works for same-origin files. If a PDF is
//               hosted on a different origin (e.g. a CDN), most browsers will
//               ignore `download` and just open it in a new tab instead; in
//               that case proxy it through your own domain if you need a
//               forced download.
const BROCHURES = {
  "personal-growth": {
    href: "/brochures/personal-growth-and-healing.pdf",
    fileName: "Personal-Growth-and-Healing-Brochure.pdf",
  },
  "relationship-wellness": {
    href: "/brochures/relationship-wellness.pdf",
    fileName: "Relationship-Wellness-Brochure.pdf",
  },
  "relationship-renewal": {
    href: "/brochures/relationship renewal.pdf",
    fileName: "Relationship-Renewal-Brochure.pdf",
  },
};

const VALUES = [
  {
    format: "1:1 Session",
    title: "Clarity Connect",
    eyebrow: "Not sure what you need?",
    subtitle: "Start with Clarity Connect.",
    body:
      "A 30-minute one-on-one conversation to help you understand where you are, what you may need, and the best way forward.",
    icon: MessageCircle,
    accent: "#6B5B95",
    image: clarity,
    ctas: [
      { label: "Book a Clarity Connect Session", href: "#payment-link", primary: true },
    ],
  },
  {
    format: "Therapy Program",
    title: "Personal Growth & Healing",
    subtitle: "Understand your patterns. Heal. Grow differently.",
    body:
      "Structured emotional support to help you understand yourself, work through emotional patterns, and create meaningful change.",
    icon: HeartHandshake,
    accent: "#8E7CC3",
    image: growth,
    ctas: [
      {
        label: "Download Brochure",
        primary: true,
        download: BROCHURES["personal-growth"],
      },
      { label: "Request a Callback", href: CALLBACK_FORM_LINK },
    ],
  },
  {
    format: "Couples Program",
    title: "Relationship Wellness",
    subtitle: "Better relationships begin with better understanding.",
    body:
      "Support for individuals and couples who want to prepare for, strengthen, heal, or better understand their relationships.",
    icon: Users,
    accent: "#9B6FA8",
    image: relation,
    ctas: [
      {
        label: "For Unmarried",
        primary: true,
        download: BROCHURES["relationship-wellness"],
      },
      {
        label: "For Married",
        primary: true,
        download: BROCHURES["relationship-renewal"],
      },
    ],
  },
  {
    format: "Program",
    title: "Emotional Wellness Programs",
    subtitle: "Support for the journeys that matter to you.",
    body:
      "Structured emotional wellness programs designed to support you through different stages and experiences of life.",
    icon: Layers,
    accent: "#A084C4",
    image: emotional,
    ctas: [
      { label: "Request a Callback", href: CALLBACK_FORM_LINK, primary: true },
    ],
  },
  {
    format: "Self-paced Course",
    title: "Journey to Yourself",
    subtitle: "Small lessons. Meaningful change.",
    body:
      "Self-paced emotional wellness modules designed to help you learn, reflect, and grow at your own pace.",
    icon: BookOpen,
    accent: "#7C5FA6",
    image: journey,
    ctas: [
      { label: "Request a Callback", href: CALLBACK_FORM_LINK, primary: true },
    ],
  },
  {
    format: "Live Event",
    title: "Webinars & Masterclasses",
    subtitle: "Learn. Reflect. Grow.",
    body:
      "Upcoming webinars and masterclasses will be added to this section as and when they are scheduled.",
    icon: Video,
    accent: "#8B6BAE",
    image: webinars,
    ctas: [
      { label: "View Upcoming Events", href: "#upcoming-events", primary: true },
    ],
  },
  {
    format: "Community",
    title: "Community",
    subtitle: "You don't have to grow alone.",
    body:
      "A supportive space for reflection, connection, shared learning, and continued emotional growth.",
    icon: UsersRound,
    accent: "#6D5A96",
    image: community,
    ctas: [
      { label: "Join our WhatsApp Community", href: "#whatsapp-community", primary: true },
    ],
  },
];

function CTAButton({ label, href, primary, download }) {
  const isDownload = Boolean(download);

  return (
    <a
      href={isDownload ? download.href : href || "#"}
 
      download={isDownload ? download.fileName : undefined}
      className={`group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.68rem] font-medium transition-opacity duration-200 sm:px-5 sm:py-2.5 sm:text-[0.82rem] no-underline ${
        primary
          ? "bg-[#4A3B6B] text-white hover:opacity-85 active:opacity-70"
          : "border border-[#4A3B6B]/15 bg-white text-[#4A3B6B] hover:opacity-70 active:opacity-55"
      }`}
    >
      {label}
      {isDownload ? (
        <Download
          size={13}
          strokeWidth={2}
          className="transition-transform duration-200 group-hover:translate-y-0.5"
        />
      ) : (
        <ArrowRight
          size={13}
          strokeWidth={2}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </a>
  );
}

export default function StackingValues() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const fontLoaded = useRef(false);

  useEffect(() => {
    if (!fontLoaded.current) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500;1,9..144,600&family=Inter:wght@400;500;600&display=swap";
      document.head.appendChild(link);
      fontLoaded.current = true;
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      {
        root: null,
        // Treat the vertical center band of the viewport as the trigger
        // zone — a section counts as "active" once it crosses the middle.
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lets a click on the left-hand title list jump straight to that
  // service's content block, in addition to the observer's automatic
  // highlighting as the user scrolls normally.
  const scrollToSection = (idx) => {
    const el = sectionRefs.current[idx];
    if (!el) return;
    setActiveIndex(idx);
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative w-full"
      style={{ background: "#fcfbf8" }}
    >
      {/* Header block */}
      <div className="w-full px-6 sm:px-10 lg:px-12 pt-16 pb-14 sm:pt-10 sm:pb-16 lg:pb-20">
        <div className="max-w-6xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[0.62rem] sm:text-[0.76rem] font-medium uppercase tracking-[0.14em] text-[#9A9C93] mb-4">
            Our Services
          </span>

          <h2
            className="text-[1.6rem] sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-[-0.01em] text-[#7C5FA6] max-w-3xl"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontOpticalSizing: "auto" }}
          >
            Find the support that feels right for you
          </h2>

          <p className="mt-5 max-w-xl text-[0.85rem] sm:text-[0.95rem] lg:text-[1rem] leading-relaxed text-[#68695F]/90">
            Everyone's journey is different. Whether you're looking for clarity, healing,
            support for your relationships, or a space to grow, choose what feels right for you.
          </p>
        </div>
      </div>

      <div className="mx-auto px-6 sm:px-10 lg:px-16 pb-20 lg:pb-28">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:gap-16">
          {/* LEFT — sticky title list (desktop only) */}
          <div className="hidden lg:flex lg:w-2/5 lg:sticky lg:top-0 lg:h-screen flex-col justify-center pt-10">
            <div className="flex flex-col gap-5">
              {VALUES.map((v, i) => {
                const Icon = v.icon;
                const isActive = activeIndex === i;
                return (
                  <button
                    key={v.title}
                    type="button"
                    onClick={() => scrollToSection(i)}
                    aria-current={isActive ? "true" : "false"}
                    className="group flex items-center gap-3 text-left transition-all duration-500 ease-out cursor-pointer bg-transparent border-0 p-0 appearance-none"
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-500 group-hover:scale-105"
                      style={{
                        backgroundColor: isActive ? v.accent : "transparent",
                        border: isActive ? "none" : "1px solid rgba(107,91,149,0.18)",
                      }}
                    >
                      <Icon
                        size={16}
                        strokeWidth={1.8}
                        color={isActive ? "#fff" : "#C3B8D9"}
                      />
                    </div>
                    <h3
                      className="leading-[1.15] tracking-tight text-xl xl:text-2xl transition-colors duration-500 ease-out group-hover:opacity-80"
                      style={{
                        fontWeight: 600,
                        color: isActive ? "#4A3B6B" : "#B5A6C9",
                      }}
                    >
                      {v.title}
                    </h3>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT — scrolling content blocks */}
          <div className="lg:w-3/5 flex flex-col gap-16 sm:gap-20 lg:gap-28 py-6 lg:py-10">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  ref={(el) => (sectionRefs.current[i] = el)}
                  className="flex flex-col gap-5"
                >
                  {/* Title shown per-block on mobile/tablet since the pinned list is hidden */}
                  <div className="lg:hidden flex items-center gap-2.5">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: value.accent }}
                    >
                      <Icon size={15} strokeWidth={1.8} color="#fff" />
                    </div>
                    <h4
                      className="text-lg sm:text-xl"
                      style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, color: value.accent }}
                    >
                      {value.title}
                    </h4>
                  </div>

                  {/* Visual card with image */}
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-black/[0.06]">
                    <img
                      src={value.image}
                      alt={value.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(165deg, ${value.accent}66 0%, ${value.accent}1a 55%, ${value.accent}00 80%)`,
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(0deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 45%)",
                      }}
                    />
                    <div className="hidden lg:flex absolute inset-0 items-start p-6">
                      <div className="flex items-center gap-3 rounded-full bg-black/40 backdrop-blur-md px-4 py-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
                          <Icon size={22} strokeWidth={1.6} color={value.accent} />
                        </div>
                        <h2
                          className="text-lg font-extrabold text-white whitespace-nowrap"
                          style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, letterSpacing: "-0.01em" }}
                        >
                          {value.title}
                        </h2>
                      </div>
                    </div>
                    <span
                      className="absolute top-3 right-3 lg:top-4 lg:right-4 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[0.62rem] lg:text-[0.7rem] font-medium uppercase tracking-[0.08em]"
                      style={{ color: value.accent }}
                    >
                      {value.format}
                    </span>
                  </div>

                  {value.eyebrow && (
                    <p className="text-[0.7rem] sm:text-[0.78rem] font-medium text-[#A0A196]">
                      {value.eyebrow}
                    </p>
                  )}

                  <p
                    className="text-[0.85rem] sm:text-[0.95rem] lg:text-[1.05rem] leading-snug italic"
                    style={{ color: value.accent, fontFamily: "'Fraunces', serif", fontWeight: 500 }}
                  >
                    {value.subtitle}
                  </p>

                  <p className="text-[0.8rem] sm:text-[0.9rem] lg:text-[1rem] leading-relaxed text-[#68695F]/90 max-w-lg">
                    {value.body}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2 border-t border-black/[0.06] mt-1">
                    {value.ctas.map((cta) => (
                      <CTAButton
                        key={cta.label}
                        label={cta.label}
                        href={cta.href}
                        primary={cta.primary}
                        download={cta.download}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
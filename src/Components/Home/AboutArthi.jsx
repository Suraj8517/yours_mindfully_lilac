import { useEffect, useRef, useState } from "react";
import {
  User,
  Check,
  Feather,
  Users,
  Award,
  Sparkles,
  HeartHandshake,
  Trophy,
} from "lucide-react";
import img from "../../assets/arthi.webp";

// ---------------------------------------------------------------------------
// A single lilac / lavender family — one deep tone for headings and CTAs,
// one mid tone for the signature accent moments, one pale tint for fills.
// Kept intentionally narrow so the section reads as one cohesive palette
// rather than several competing accent colors.
// ---------------------------------------------------------------------------
const PALETTE = {
  cream: "#FCFBF8",     // base background — matches the Services section above it
  paper: "#F4EEFB",     // pale lavender wash used behind panels
  ink: "#2E2740",       // near-black plum for headings
  body: "#5C5568",      // body copy
  accent: "#7C5FA6",    // primary lilac — headline, icons
  accentDeep: "#4A3B6B",// deep plum-lilac — labels, dark text on light fills
  accentSoft: "#9B6FA8",// secondary lavender — borders, secondary emphasis
  fill: "#EFE7F8",      // pale lilac fill — chips, cards
  fillDeep: "#E3D6F4",  // slightly deeper lilac fill for the featured card
  line: "rgba(107,91,149,0.18)",
};

const EXPERTISE = [
  "Cognitive Behaviour Therapy",
  "Rational Emotive Behaviour Therapy",
  "Behavioural Modification Therapy",
  "Imago Relationship Therapy",
  "Shadow Mastery Coaching",
  "Inner Child Healing",
  "Family & Couple Counselling",
];

// The lifetime achievement sits first so it can be pulled out as the
// featured credential in the bento layout below.
const CREDENTIALS = [
  {
    title: "Lifetime Achievement Award",
    org: "Mental Health Awareness",
    icon: Trophy,
    featured: true,
  },
  {
    title: "Member",
    org: "Counsellors Council of India (CCI)",
    icon: Award,
  },
  {
    title: "Associate Counsellor",
    org: "World Mental Health Care Association",
    icon: HeartHandshake,
  },
  {
    title: "Certified Shadow Mastery Coach",
    org: "",
    icon: Feather,
  },
  {
    title: "Trained Imago Relationship Therapist",
    org: "",
    icon: Sparkles,
  },
];

const IMG_SRC = img;

function useFonts() {
  useEffect(() => {
    if (document.getElementById("mt-fonts")) return;
    const link = document.createElement("link");
    link.id = "mt-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Jost:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: visible ? "translateY(0)" : "translateY(18px)",
        opacity: visible ? 1 : 0,
        transition: `opacity 0.7s cubic-bezier(.22,.61,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,.61,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// Slim gradient rule with a small centered dot — a quieter, more current
// stand-in for the old wavy divider line.
function GradientRule({ color = PALETTE.accentSoft, className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} style={{ width: 120 }}>
      <span
        className="h-px flex-1"
        style={{ background: `linear-gradient(90deg, transparent, ${color})` }}
      />
      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
      <span
        className="h-px flex-1"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />
    </div>
  );
}

// Soft, blurred gradient shapes sitting behind the content — the
// "aurora mesh" background treatment, used once for the whole section
// rather than repeated on every panel.
function AuroraBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -top-24 -right-24 h-[26rem] w-[26rem] rounded-full opacity-60"
        style={{ background: PALETTE.fillDeep, filter: "blur(90px)" }}
      />
      <div
        className="absolute top-1/3 -left-32 h-[22rem] w-[22rem] rounded-full opacity-50"
        style={{ background: PALETTE.fill, filter: "blur(100px)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 h-[18rem] w-[18rem] rounded-full opacity-40"
        style={{ background: "#E9DEF7", filter: "blur(80px)" }}
      />
    </div>
  );
}

function BreathingPortrait() {
  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      {/* gradient ring frame — a single soft-edged lilac halo behind the photo */}
      <div
        className="absolute -inset-3 rounded-[2.5rem]"
        style={{
          background: `linear-gradient(155deg, ${PALETTE.accentSoft}55, ${PALETTE.fill}00 60%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] mt-4 sm:mt-1 shadow-[0_30px_60px_-30px_rgba(46,39,64,0.35)]">
        <img
          src={IMG_SRC}
          alt="Ms. Arthi Sujai, Psychotherapist"
          className="h-full w-full object-cover object-top"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${PALETTE.ink}66, transparent 55%)`,
          }}
        />
      </div>

      {/* floating stat chip — small bento moment tucked over the top-left corner */}
      <div
        className="absolute top-3 left-1 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
        style={{
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(10px)",
          border: `1px solid rgba(255,255,255,0.6)`,
        }}
      >
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            color: PALETTE.accentDeep,
            fontSize: 10.5,
            letterSpacing: "0.06em",
            fontWeight: 500,
          }}
        >
          13+ YEARS
        </span>
      </div>

      {/* name badge — glass pill floating over the bottom edge */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-3 rounded-full"
        style={{
          bottom: "-6%",
          background: "rgba(252,251,248,0.85)",
          backdropFilter: "blur(14px)",
          border: `1px solid ${PALETTE.line}`,
          boxShadow: "0 20px 40px -22px rgba(46,39,64,0.45)",
          whiteSpace: "nowrap",
        }}
      >
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full shrink-0"
          style={{ background: PALETTE.fill }}
        >
          <User size={14} style={{ color: PALETTE.accent }} />
        </span>
        <div className="leading-tight">
          <h3 className="font-semibold" style={{ color: PALETTE.accentDeep }}>
            Arthi Sujai
          </h3>
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: PALETTE.accentSoft,
              fontSize: 10,
              letterSpacing: "0.08em",
            }}
          >
            PSYCHOTHERAPIST
          </p>
        </div>
      </div>
    </div>
  );
}

function ExpertiseTags() {
  return (
    <div>
      <p
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.14em",
          color: PALETTE.accentSoft,
        }}
        className="uppercase mb-3"
      >
        Expertise
      </p>
      <div className="flex flex-wrap gap-2">
        {EXPERTISE.map((item) => (
          <span
            key={item}
            className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 transition-all duration-300 hover:-translate-y-0.5"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 12.5,
              color: PALETTE.ink,
              background: "#ffffff",
              border: `1px solid ${PALETTE.line}`,
              borderRadius: 999,
            }}
          >
            <span
              className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors duration-300"
              style={{ background: PALETTE.fill }}
            >
              <Check size={9} strokeWidth={3} style={{ color: PALETTE.accent }} />
            </span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Full-bleed "On record" band, redone as a small bento grid: the
 * lifetime-achievement credential is pulled out as a wide featured card,
 * with the remaining credentials sitting underneath as compact tiles.
 */
function CredentialsBand() {
  const featured = CREDENTIALS.find((c) => c.featured);
  const rest = CREDENTIALS.filter((c) => !c.featured);

  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-14 lg:py-16">
        <p
          className="uppercase text-center mb-8"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.16em",
            color: PALETTE.accentSoft,
          }}
        >
          Professional Credentials
        </p>

        {/* featured card */}
        <Reveal>
          <div
            className="flex items-center gap-5 rounded-[1.75rem] px-6 py-6 sm:px-8 sm:py-7 mb-5"
            style={{
              background: `linear-gradient(120deg, ${PALETTE.fillDeep}, ${PALETTE.fill})`,
              border: `1px solid ${PALETTE.line}`,
            }}
          >
            <span
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
              style={{ background: PALETTE.accentDeep }}
            >
              <Trophy size={24} color="#fff" strokeWidth={1.7} />
            </span>
            <div>
              <p
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 19,
                  color: PALETTE.ink,
                  lineHeight: 1.3,
                }}
              >
                {featured.title}
              </p>
              <p
                className="mt-1"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 13,
                  color: PALETTE.body,
                }}
              >
                {featured.org}
              </p>
            </div>
          </div>
        </Reveal>

        {/* compact tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {rest.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={0.05 + i * 0.06}>
                <div
                  className="h-full rounded-2xl px-4 py-5 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "#ffffff",
                    border: `1px solid ${PALETTE.line}`,
                  }}
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: PALETTE.fill }}
                  >
                    <Icon size={18} style={{ color: PALETTE.accent }} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: 14.5,
                        color: PALETTE.ink,
                        lineHeight: 1.35,
                      }}
                    >
                      {item.title}
                    </p>
                    {item.org && (
                      <p
                        className="mt-1"
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          fontSize: 11.5,
                          color: PALETTE.body,
                          lineHeight: 1.4,
                        }}
                      >
                        {item.org}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function MeetYourTherapist() {
  useFonts();

  return (
    <section className="relative w-full overflow-hidden" style={{ background: PALETTE.cream }} id="therapist">
      <AuroraBackdrop />

      {/* ---------------- DESKTOP ---------------- */}
      <div className="relative hidden md:block">
        <div className="max-w-6xl mx-auto px-10 lg:px-16 pt-24 pb-16 grid grid-cols-12 gap-x-14 items-start">
          {/* vertical eyebrow rail */}
          <div className="col-span-1 hidden lg:flex justify-center">
            <div
              className="flex items-center gap-3"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.25em",
                  color: PALETTE.accentSoft,
                }}
              >
                MEET YOUR THERAPIST
              </span>
              <span className="w-px h-14" style={{ background: PALETTE.line }} />
            </div>
          </div>

          {/* portrait column */}
          <div className="col-span-12 lg:col-span-5">
            <Reveal>
              <BreathingPortrait />
            </Reveal>
          </div>

          {/* content column */}
          <div className="col-span-12 lg:col-span-6 pt-6 lg:pt-0">
            <Reveal>
              <h2
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: PALETTE.accent,
                  fontSize: "3.6rem",
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                }}
              >
                Ms. Arthi Sujai
              </h2>
              <p
                className="mt-4 uppercase"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11.5,
                  letterSpacing: "0.16em",
                  color: PALETTE.accentDeep,
                }}
              >
                Psychotherapist &middot; Counselling Psychologist &middot; Emotional Well-being Coach
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p
                className="mt-7 leading-relaxed"
                style={{ fontFamily: "'Jost', sans-serif", color: PALETTE.body, fontSize: 15 }}
              >
                With over 13 years of experience, Arthi has helped individuals, couples,
                and families understand emotional patterns, strengthen relationships, and
                create healthier, more fulfilling lives.
              </p>
              <p
                className="mt-3 leading-relaxed"
                style={{ fontFamily: "'Jost', sans-serif", color: PALETTE.body, fontSize: 15 }}
              >
                Her approach combines evidence-based psychological practices with
                compassionate guidance to create meaningful and sustainable change.
              </p>
            </Reveal>

            <Reveal delay={0.14} className="mt-8">
              <GradientRule />
            </Reveal>

            <Reveal delay={0.16} className="mt-6">
              <ExpertiseTags />
            </Reveal>
          </div>
        </div>

        <CredentialsBand />

        <div className="flex flex-col items-center py-20">
          <GradientRule className="mb-6" />
          <p
            className="text-center max-w-md px-6"
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontSize: 21,
              color: PALETTE.accent,
            }}
          >
            Where your mind &amp; heart feel at home.
          </p>
        </div>
      </div>

      {/* ---------------- MOBILE ---------------- */}
      <div className="relative md:hidden">
        <div className="px-6 pt-16 pb-10">
          <p
            className="uppercase mb-3"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10.5,
              letterSpacing: "0.2em",
              color: PALETTE.accentSoft,
            }}
          >
            Meet your therapist
          </p>
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              color: PALETTE.ink,
              fontSize: "2.6rem",
              lineHeight: 1,
            }}
            className="mb-7"
          >
            Ms. Arthi Sujai
          </h2>

          <BreathingPortrait />

          <p
            className="uppercase mt-16 mb-4"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.14em",
              color: PALETTE.accentDeep,
            }}
          >
            Psychotherapist &middot; Emotional Well-being Coach
          </p>
          <p
            className="leading-relaxed"
            style={{ fontFamily: "'Jost', sans-serif", color: PALETTE.body, fontSize: 14.5 }}
          >
            With over 13 years of experience, Arthi has helped individuals, couples, and
            families understand emotional patterns, strengthen relationships, and create
            healthier, more fulfilling lives.
          </p>
          <p
            className="leading-relaxed mt-3"
            style={{ fontFamily: "'Jost', sans-serif", color: PALETTE.body, fontSize: 14.5 }}
          >
            Her approach combines evidence-based psychological practices with compassionate
            guidance to create meaningful and sustainable change.
          </p>

          <GradientRule className="my-7" />

          <ExpertiseTags />
        </div>

        {/* full-bleed credentials band, directly under the image */}
        <CredentialsBand />

        <div className="flex flex-col items-center pt-14 pb-16 px-6">
          <GradientRule className="mb-6" />
          <p
            className="text-center"
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontSize: 18,
              color: PALETTE.accent,
            }}
          >
            Where your mind &amp; heart feel at home.
          </p>
        </div>
      </div>
    </section>
  );
}
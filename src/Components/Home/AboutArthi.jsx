import { useEffect, useState } from "react";
import img from "../../assets/arthi.png";

// ---------------------------------------------------------------------------
// A single lilac family, kept narrow on purpose: one deep plum-lilac for
// dark fills, one mid lilac for accents and headings, one pale lilac tint
// worked into the paper itself so the palette carries through the whole
// section rather than sitting only in one badge or button.
// ---------------------------------------------------------------------------
const PALETTE = {
  paper: "#F8F5FC", // pale lilac-tinted paper
  ink: "#2A2438", // deep plum-black
  body: "#5B5468", // body copy
  accent: "#7C5FA6", // primary lilac — lead-in, headings, small accents
  accentDeep: "#372B54", // deep plum-lilac — portrait wash, closing panel
  accentMuted: "#B9A4D1", // soft lilac — muted text on the dark panel
  line: "rgba(90,70,120,0.18)", // lilac-tinted hairline rules
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

// The lifetime achievement is called out with slightly heavier weight in
// the list below, rather than being pulled into a separate card treatment.
const CREDENTIALS = [
  {
    title: "Lifetime Achievement Award",
    org: "Mental Health Awareness",
    lead: true,
  },
  { title: "Member", org: "Counsellors Council of India (CCI)" },
  {
    title: "Associate Counsellor",
    org: "World Mental Health Care Association",
  },
  { title: "Certified Shadow Mastery Coach", org: "" },
  { title: "Trained Imago Relationship Therapist", org: "" },
];

const IMG_SRC = img;

function useFonts() {
  useEffect(() => {
    if (document.getElementById("mt-fonts")) return;
    const link = document.createElement("link");
    link.id = "mt-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&family=Inter:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}

// One deliberate, orchestrated entrance for the header and portrait on
// mount — rather than a fade-and-slide-up triggered on every section as
// the person scrolls, which is the generic default.
function useEntrance() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setReady(true);
      return;
    }
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, []);
  return ready;
}

export default function MeetYourTherapist() {
  useFonts();
  const ready = useEntrance();

  const lead = CREDENTIALS.find((c) => c.lead);
  const rest = CREDENTIALS.filter((c) => !c.lead);

  return (
    <section id="therapist" className="w-full bg-[#FCFBF8]" >
      {/* header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-20 sm:pt-24 pb-2">
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            color: PALETTE.accent,
            fontSize: 15,
            fontWeight: 500,
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
          className="mb-4"
        >
          Meet the person guiding your sessions
        </p>
        <h2
          style={{
            fontFamily: "'Newsreader', serif",
            color: PALETTE.ink,
            fontWeight: 500,
            fontSize: "clamp(2.3rem, 5vw, 3.4rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.8s ease 0.06s, transform 0.8s ease 0.06s",
          }}
        >
          Arthi Sujai
        </h2>
        <p
          className="mt-3"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: PALETTE.body,
            fontSize: 15.5,
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.8s ease 0.12s, transform 0.8s ease 0.12s",
          }}
        >
          Psychotherapist, counselling psychologist, and emotional well-being coach.
        </p>
      </div>

      {/* portrait + content — same grid row, so the image column stretches
          to match the content column's natural height on desktop */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-10 pb-16 sm:pb-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 md:items-stretch">
        <div className="md:col-span-4 flex flex-col">
          <div
            className="relative overflow-hidden aspect-[4/5] md:aspect-auto md:flex-1"
            style={{
              borderRadius: 10,
              background: PALETTE.accentDeep,
              opacity: ready ? 1 : 0,
              transform: ready ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.9s ease 0.16s, transform 0.9s ease 0.16s",
            }}
          >
            <img
              src={IMG_SRC}
              alt="Ms. Arthi Sujai, Psychotherapist"
              className="w-full h-full object-cover object-top"
              style={{ filter: "grayscale(0.15) contrast(1.02)" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, transparent 55%, ${PALETTE.accentDeep}77)`,
              }}
              aria-hidden="true"
            />
          </div>
          <div
            className="flex items-center gap-3 mt-4"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 13 }}
          >
            <span style={{ color: PALETTE.ink, fontWeight: 500 }}>Arthi Sujai</span>
            <span
              style={{ width: 1, height: 12, background: PALETTE.accent, opacity: 0.5 }}
              aria-hidden="true"
            />
            <span style={{ color: PALETTE.body }}>13 years in practice</span>
          </div>
        </div>

        <div className="md:col-span-8 flex flex-col">
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: PALETTE.body,
              fontSize: 15.5,
              lineHeight: 1.75,
              maxWidth: "82ch",
            }}
          >
            With over 13 years of experience, Arthi has helped individuals, couples, and
            families understand emotional patterns, strengthen relationships, and build
            healthier, more fulfilling lives. Her approach combines evidence-based
            psychological practice with compassionate guidance, aimed at change that
            actually holds.
          </p>

          {/* credentials — a plain resume-style list, not icon cards,
              with a lilac rule marking the standout credential */}
          <div className="mt-10">
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                color: PALETTE.accent,
                fontWeight: 600,
                fontSize: 13.5,
              }}
              className="mb-1"
            >
              Credentials
            </h3>
            <div style={{ borderTop: `1px solid ${PALETTE.accent}` }}>
              <div
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
                style={{ borderBottom: `1px solid ${PALETTE.line}` }}
              >
                <span
                  style={{
                    fontFamily: "'Newsreader', serif",
                    fontWeight: 500,
                    fontSize: 16.5,
                    color: PALETTE.ink,
                  }}
                >
                  {lead.title}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: PALETTE.accent,
                  }}
                >
                  {lead.org}
                </span>
              </div>
              {rest.map((c) => (
                <div
                  key={c.title}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
                  style={{ borderBottom: `1px solid ${PALETTE.line}` }}
                >
                  <span
                    style={{
                      fontFamily: "'Newsreader', serif",
                      fontSize: 15.5,
                      color: PALETTE.ink,
                    }}
                  >
                    {c.title}
                  </span>
                  {c.org && (
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        color: PALETTE.body,
                      }}
                    >
                      {c.org}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* expertise — flowing prose, not pill chips */}
          <div className="mt-10">
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                color: PALETTE.accent,
                fontWeight: 600,
                fontSize: 13.5,
              }}
              className="mb-2"
            >
              Areas of focus
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                color: PALETTE.body,
                fontSize: 15,
                lineHeight: 1.8,
                maxWidth: "62ch",
              }}
            >
              {EXPERTISE.join(", ")}.
            </p>
          </div>

          {/* spacer keeps the flex column from collapsing shorter than
              the image on tall viewports without forcing artificial gaps */}
          <div className="flex-1" />
        </div>
      </div>

    </section>
  );
}
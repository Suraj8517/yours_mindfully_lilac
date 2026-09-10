import React, { useState } from "react";
import { Link2, Check, ArrowUp } from "lucide-react";
import logo from "../../assets/logo.png"
const quickLinks = [
  { label: "Therapist", href: "#therapist" },
  { label: "About", href: "#about-us" },
  { label: "Services", href: "#services" },
  { label: "Programs", href: "#programs" },
];

const tags = ["Emotional Wellness", "Self-Awareness", "Healing", "Relationships", "Personal Growth"];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
    href: "https://www.instagram.com/mindfullyyouuu?igsh=OG81NDljcW1lbWpv",
  },
  {
    label: "Phone",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    href: "tel:+918825611379",
  },
];

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "mindfullyyouu@gmail.com ";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable, ignore
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-x-hidden bg-[linear-gradient(180deg,#FCFBF8_0%,#F1EAF9_25%,#E4D6F0_50%,#D6C2E8_75%,#C8AEDF_100%)] text-[#3A2E4A]">
      <div className="mx-auto max-w-6xl px-6 pb-24 sm:pt-16 sm:px-10 sm:pb-14 lg:px-12">
        {/* top row: contact/social — logo — quick links */}
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-3 md:gap-14">
          {/* Left: email + social — centered on mobile to sit balanced
              under the centered logo, left-aligned again once the
              3-column row has room at md */}
          <div className="order-2 flex flex-col items-center md:order-1 md:items-start">
            <div className="flex items-center gap-2.5">
              <a
                href={`mailto:${email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium text-[#3A2E4A] transition-colors hover:text-[#8B5FA8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5FA8] rounded-sm"
              >
                {email}
              </a>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy email address"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EDE3F7] text-[#3A2E4A] transition-colors hover:bg-[#DCC7EF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5FA8]"
              >
                {copied ? <Check className="h-3.5 w-3.5" strokeWidth={2} /> : <Link2 className="h-3.5 w-3.5" strokeWidth={2} />}
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2.5">
              {SOCIAL_LINKS.map(({ label, icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D6C2E8] text-[#3A2E4A] transition-colors hover:border-[#8B5FA8] hover:text-[#8B5FA8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5FA8]"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Center: logo */}
          <div className="order-1 flex justify-center md:order-2">
            <img
              src={logo}
              alt="Mindfully You logo"
              className="h-20 w-auto object-contain sm:h-24 md:h-28"
            />
          </div>

          {/* Right: quick links as hash anchors */}
          <div className="order-3 flex flex-col items-center gap-2 md:items-end">
            <span className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#6B5B87]">
              Quick Links
            </span>
            <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 md:justify-end">
              {quickLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-sm text-[#3A2E4A] transition-colors hover:text-[#8B5FA8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5FA8] rounded-sm"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* credit row */}
        <div className="mt-14 border-t border-[#D6C2E8] pt-6 text-center sm:mt-16">
          <p className="text-xs text-[#7A6B8C]">
            © {new Date().getFullYear()} Mindfully You. All rights reserved.
          </p>
        </div>

        {/* tagline + tags, below credit section */}
        <div className="mt-6 flex flex-col items-center text-center">
          <p className="text-sm italic text-[#5A4C6B]" style={{ fontFamily: "'Lora', Georgia, serif" }}>
            Where your mind &amp; heart feel at home.
          </p>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs uppercase tracking-wide text-[#6B5B87]">
            {tags.map((tag, i) => (
              <li key={tag} className="flex items-center gap-3">
                {i !== 0 && <span className="h-1 w-1 rounded-full bg-[#C7A9E0]" aria-hidden="true" />}
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* back to top — a touch smaller and closer to the corner on
          mobile, with the extra bottom padding above (pb-24) giving it
          clear space so it doesn't sit on top of the tag list */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#3A2E4A] text-[#FBF8F1] shadow-md transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5FA8] sm:bottom-8 sm:right-10 sm:h-11 sm:w-11 lg:right-12"
      >
        <ArrowUp className="h-4 w-4" strokeWidth={2} />
      </button>
    </footer>
  );
}
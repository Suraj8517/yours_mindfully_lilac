import React from "react";

/**
 * BookSessionCTA
 * A calm, grounded call-to-action for a therapy / emotional-wellness service.
 * Signature element: slow "breathing" rings behind the headline, echoing the
 * rhythm of a guided breath — literal to the subject matter, not decorative.
 * No required props — renders complete on its own.
 */
export default function CTASection({ onBook = () => {} }) {
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-b from-[#FCFBF8] to-[#fcfbf8] py-28 px-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,500&family=Work+Sans:wght@400;500&display=swap');

        .cta-display { font-family: 'Fraunces', serif; }
        .cta-body { font-family: 'Work Sans', sans-serif; }

        @keyframes breathe {
          0%, 100% { transform: scale(0.94); opacity: 0.35; }
          50% { transform: scale(1.08); opacity: 0.6; }
        }
        @keyframes breathe-slow {
          0%, 100% { transform: scale(0.9); opacity: 0.2; }
          50% { transform: scale(1.05); opacity: 0.4; }
        }
        .ring-a { animation: breathe 9s ease-in-out infinite; }
        .ring-b { animation: breathe-slow 9s ease-in-out infinite; animation-delay: -1.5s; }
        .ring-c { animation: breathe 9s ease-in-out infinite; animation-delay: -3s; }

        @keyframes exhale {
          0% { transform: scale(0.6); opacity: 0.55; }
          100% { transform: scale(2.1); opacity: 0; }
        }
        .btn-wrap:hover .exhale-ring {
          animation: exhale 1.4s ease-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .ring-a, .ring-b, .ring-c, .btn-wrap:hover .exhale-ring {
            animation: none !important;
          }
        }
      `}</style>

    


      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="cta-body mb-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#6B5B87]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#9B7FC7]" />
          Begin at your own pace
          <span className="h-1.5 w-1.5 rounded-full bg-[#9B7FC7]" />
        </span>

        <h2 className="cta-display text-4xl italic leading-tight text-[#3A2E4A] sm:text-5xl">
          Your emotional well-being deserves the same care as your physical health.
        </h2>

        <p className="cta-body mt-6 max-w-xl text-lg leading-relaxed text-[#5A4C6B]">
          Whether you're looking for clarity, healing, stronger relationships, or
          lifelong emotional wellness, your journey can begin today.
        </p>

        <div className="btn-wrap group relative mt-10 inline-block">
          <span className="exhale-ring absolute left-1/2 top-1/2 h-14 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8B5FA8]" />
          <button
            onClick={onBook}
            className="cta-body relative rounded-full bg-[#8B5FA8] px-9 py-4 text-base font-medium text-[#FBF8F1] shadow-lg shadow-[#3A2E4A]/15 transition-transform duration-300 ease-out hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B79ADB]"
          >
            Book Your First Session
          </button>
        </div>

        <p className="cta-body mt-5 text-xs text-[#8A7A9E]">
         Take the first step toward emotional clarity and lasting well-being with a personalized therapy session.
        </p>
      </div>
    </section>
  );
}
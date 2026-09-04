import React from "react";
import InfiniteImageStrip from "./ImageScroll";
import logo from "../../assets/logo.png"

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[90vh] w-full overflow-hidden flex flex-col bg-[linear-gradient(180deg,#C8B2D8_0%,#D4C4E2_25%,#E1D8EA_50%,#F4E7F4_75%,#F4E7F4_100%)]">
      {/* soft vignette, same treatment as before, tuned to the lilac palette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0)_55%)]" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center md:pt-16 ">
                  <img src={logo} className="w-14 md:w-52" />
        
        <h1 className="2xl:max-w-5xl max-w-3xl text-5xl md:text-[70px] 2xl:text-[90px] text-[#4A3F5A] font-bold ">
          Where your Mind & Heart Feel at Home.
        </h1>

        <p className="2xl:mt-6 mt-6 text-lg 2xl:text-xl  text-[#4A3F5A]/80 max-w-xl">
          Understand Yourself. Heal Emotional Patterns. Build Meaningful Relationships. Live with Clarity.
        </p>

        <button
          type="button"
          className="mt-9 mb-5 rounded-full border border-[#4A3F5A]/30 bg-[#5A4C6E] px-8 py-3.5 text-sm md:text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-[#4A3F5A] hover:-translate-y-0.5 [font-family:var(--font-body)]"
        >
          Start Your Journey
        </button>
      </div>
     
    </section>
  );
}
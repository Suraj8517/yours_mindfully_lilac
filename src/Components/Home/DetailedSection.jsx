import React from 'react'
import img1 from "../../assets/img1.png"


export default function DetailedSection() {
  return (
    <section className="w-full bg-[#FCFBF8] px-6 py-4 sm:px-10 sm:py-20 md:py-24 lg:px-14 lg:py-28 xl:px-20 xl:py-18 2xl:px-28">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-12 xl:gap-20 2xl:gap-28">
        {/* ---------- Image collage ---------- */}
        <div className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-none lg:flex-1 py-2 lg:py-10 lg:pl-10 xl:py-14 xl:pl-14">
          {/* Main image */}
          <img src={img1}
            label="Studio space"
            className=" w-full"
          />
        </div>

        {/* ---------- Text column ---------- */}
        <div className="w-full text-center lg:flex-1 lg:text-left">
          <h2
            className="text-[#82719A]"
            style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: 'clamp(2.75rem, 4vw, 4.6rem)',
              lineHeight: 1.05,
            }}
          >
            Emotional Wellness, Designed for Real Life.
          </h2>

          <p className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-neutral-800 sm:text-lg lg:mx-0 lg:mt-14 xl:mt-16 xl:max-w-2xl ">
            Life doesn't come with a manual for handling stress, relationships, overwhelming emotions, or life transitions. At Mindfully You, we help you understand yourself better through science-backed emotional wellness services that empower you to heal, grow, and thrive. 
Whether you're seeking clarity, emotional healing, stronger relationships, or lifelong emotional well-being, we're here to support your journey. 
          </p>

          <button
            type="button"
            className="mt-8 rounded-full bg-[#76559D]  px-8 py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#e0556c] sm:text-base lg:mt-10"
          >
            Book a Discovery Session
          </button>
        </div>
      </div>
    </section>
  )
}
import React from 'react'
import yourWellnessImage from "../../assets/aboutus.jpg"
export default function AboutUs() {
  return (
    <section className="relative h-[70vh] lg:h-[130vh] 2xl:[100vh] w-full overflow-hidden p-4 sm:p-6 lg:p-8" id='about-us'>
      {/* Rounded frame — relative + overflow-hidden here is what makes the
          rounded-3xl corners actually clip the image/overlay/content inside it. */}
      <div className="relative h-full w-full overflow-hidden rounded-3xl">
        {/* Background image — swap this div for a real <img> / next/image once you have one.
            Suggestion: a soft, natural wellness image (hands, water, plants, skin, linen) works well here. */}
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              'linear-gradient(135deg, #b9c4a4 0%, #8a9a7e 35%, #5f7266 70%, #3f4f45 100%)',
          }}
        />
     
          <img
            src={yourWellnessImage}
            alt="Wellness background"
            className="absolute inset-0 h-full w-full object-cover"
          />
        

        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Content */}
        <div className="relative z-10 flex h-full w-full flex-col justify-center px-6 sm:px-8 md:px-10 lg:px-14 xl:px-20">
          <div className="mx-auto w-full max-w-[1440px]">
            {/* Heading row */}
            <div className="flex flex-col gap-2 sm:gap-3 lg:flex-row lg:items-center lg:gap-8">
              <span
                className="text-4xl leading-none text-white sm:text-5xl lg:whitespace-nowrap lg:text-5xl xl:text-6xl"
                style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}
              >
                About
              </span>

              <div className="hidden h-px w-110 2xl:w-210 bg-white/50 lg:block" />

              <h1
                className="text-5xl leading-[1.05] text-white sm:text-4xl md:text-5xl lg:shrink-0 lg:text-5xl xl:text-6xl"
                style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}
              >
                Mindfully
                <br />
                You
              </h1>
            </div>

            <div className="mt-8 max-w-md sm:mt-10 sm:max-w-sm lg:ml-auto lg:mt-12 lg:max-w-sm">
              <p className="text-sm leading-relaxed text-white/90  md:text-sm 2xl:text-lg">
                Mindfully You is an emotional wellness platform dedicated to helping individuals reconnect with themselves through mindful, evidence-based psychological practices. 
We believe emotional wellness isn't just about overcoming challenges—it's about understanding yourself deeply, building resilience, creating healthier relationships, and living with greater awareness. 
Whether you're looking for a one-time conversation, structured therapy, self-paced learning, relationship guidance, or emotional wellness programs, you'll find support designed around your unique journey.
              </p>

              <a
                href="#vision"
                className="mt-6 inline-flex items-center gap-1.5 text-sm italic text-white/90 transition-colors hover:text-white sm:text-base"
                style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}
              >
                Our vision
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
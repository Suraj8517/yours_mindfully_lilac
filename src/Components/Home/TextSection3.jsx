import React, { useEffect, useRef, useState } from 'react'
import leafImg from '../../assets/leaf.png' 

export default function TextSection() {
  const sectionRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    const updateOffset = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        // distance the section has traveled through the viewport
        const progress = window.innerHeight - rect.top
        setScrollY(progress)
      }
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateOffset)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateOffset()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[40vh] sm:min-h-[70vh] md:min-h-[80vh] w-full flex justify-center items-center bg-[#FCFBF8] overflow-hidden px-6 py-16 sm:px-8 md:px-12 md:py-0"
    >
      <img
        src={leafImg}
        alt=""
        draggable="false"
        className="pointer-events-none select-none absolute -top-8 -left-8 sm:-top-12 sm:-left-12 md:-top-16 md:-left-16 w-[60vw] sm:w-[52vw] md:w-[48vw] opacity-90 will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.12}px) ` }}
      />

      <img
        src={leafImg}
        alt=""
        draggable="false"
        className="pointer-events-none select-none absolute -top-4 -right-8 sm:-top-12 sm:-right-12 md:-top-16 md:-right-16 w-[56vw] sm:w-[42vw] md:w-[38vw] opacity-90 will-change-transform scale-x-[-1]"
        style={{ transform: `translateY(${scrollY * 0.2}px) scaleX(1) ` }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-32 md:h-52 z-[5]"
        style={{
          background: 'linear-gradient(to bottom, rgba(252,251,248,0) 0%, #FCFBF8 100%)',
        }}
      />
      <h2
        className="relative z-10 text-3xl sm:text-4xl md:text-6xl 2xl:text-[100px] leading-snug sm:leading-tight text-center max-w-xs sm:max-w-xl md:max-w-4xl 2xl:max-w-6xl text-[#76559D] will-change-transform"
        style={{ transform: `translateY(${-scrollY * 0.06}px)` }}
      >
        Understand yourself, strengthen relationships, and thrive with confidence.
      </h2>
    </div>
  )
}
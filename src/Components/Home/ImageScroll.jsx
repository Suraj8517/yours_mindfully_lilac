import React from "react";
import img1 from "../../assets/hero/img1.webp"
import img2 from "../../assets/hero/img2.webp"
import img3 from "../../assets/hero/img3.webp"
import img4 from "../../assets/hero/img4.webp"
import img5 from "../../assets/hero/img5.webp"

const images = [
  {
    src: img1,
    alt: "group of women",
  },
  {
    src: img2,
    alt: "meditation",
  },
  {
    src: img3,
    alt: "relation",
  },
  {
    src: img4,
    alt: "group",
  },
  {
    src: img5,
    alt: "women meditating",
  },
];

export default function InfiniteImageStrip() {
  const track = [...images, ...images];

  return (
    <section className="pb-8 sm:pb-12 md:pb-16 relative h-[60vh] sm:h-[75vh] md:h-screen w-full overflow-hidden bg-[linear-gradient(180deg,#F4E7F4_0%,#F6EBF3_30%,#F8EEF4_60%,#FAF1F7_85%,#FCFBF8_100%)]">
      <div className="strip-track flex h-full w-max items-center py-5 sm:py-8 md:py-10">
        {track.map((img, i) => (
          <div
            key={i}
            className={`strip-item h-full flex-none w-[68vw] mx-2 sm:w-[45vw] sm:mx-3 md:w-[35vw] md:mx-4 ${
              i % 2 === 0 ? "strip-item-even" : "strip-item-odd"
            }`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl"
              draggable={false}
            />
          </div>
        ))}
      </div>

      <style>{`
        .strip-track {
          animation: scroll-left 32s linear infinite;
        }
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .strip-item-even { transform: translateY(-20px); }
        .strip-item-odd { transform: translateY(20px); }

        @media (min-width: 640px) {
          .strip-item-even { transform: translateY(-32px); }
          .strip-item-odd { transform: translateY(32px); }
          .strip-track { animation-duration: 28s; }
        }

        @media (min-width: 768px) {
          .strip-item-even { transform: translateY(-40px); }
          .strip-item-odd { transform: translateY(40px); }
          .strip-track { animation-duration: 32s; }
        }

        @media (prefers-reduced-motion: reduce) {
          .strip-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
import React from "react";
import { BookOpen, Compass, Users, Sunrise } from "lucide-react";

const pillars = [
  {
    title: "Educate & inspire",
    body: "We reconnect people with themselves through mindful, evidence-based psychological practice — learning that changes how a day feels, not just what you know.",
    Icon: BookOpen,
  },
  {
    title: "Empower practice",
    body: "Insight only matters once it's usable. We hand people guided tools and structured exercises they can reach for in the moment they actually need them.",
    Icon: Compass,
  },
  {
    title: "Foster community",
    body: "Healing rarely happens alone. We build rooms, in person and online, where people can be honest about where they are and still feel held.",
    Icon: Users,
  },
  {
    title: "Advance well-being",
    body: "Emotional wellness isn't a single fix; it shifts with each season of life. Our work meets people where they are now, and again where they'll be next.",
    Icon: Sunrise,
  },
];

export default function OurPillars() {
  return (
    <section className="bg-[#FCFBF8] px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
   

      <div className="mx-auto max-w-[1120px]">
        <div className="max-w-[800px]">
          <p className="pillars-sans text-[13px] sm:text-[18px] font-medium text-[#6E5A9C]">
            Why choose Mindfully You
          </p>
          <h2 className="pillars-serif mt-3 text-[2.1rem]  leading-[1.15] text-[#2E2440] sm:text-[3rem]">
            Four pillars hold up everything we do.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7">
          {pillars.map(({ title, body, Icon }) => (
            <div
              key={title}
              className="rounded-[20px] border border-[#DFCEF2] bg-[#FBF8FE] p-8"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E4D6F5]">
                <Icon className="h-5 w-5 text-[#5B4B82]" strokeWidth={1.75} />
              </div>
              <h3 className="pillars-serif mt-6 text-[1.4rem] leading-tight text-[#2E2440]">
                {title}
              </h3>
              <p className="pillars-sans mt-3 max-w-[42ch] text-[0.97rem] leading-relaxed text-[#5B5170]">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "../ui/card";
import SplitText from "../ui/bg-animations/SplitText";

type Sponsor = {
  id: string;
  tier: string; // e.g., Title Sponsor / Associate Sponsor
  name: string;
  imageSrc: string; // path from public folder
};

const sponsors: Sponsor[] = [
  {
    id: "bonbloc",
    tier: "Title Sponsor",
    name: "Bonbloc",
    imageSrc: "/bonbloc.png",
  },
  {
    id: "cock",
    tier: "Associate Sponsor",
    name: "Cock",
    imageSrc: "/cock.png",
  },
];

export function SponsorsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isSectionInView = useInView(sectionRef, { once: true, margin: "-120px" });

  return (
    <section id="nav-sponsors-section" ref={sectionRef} className="flex flex-col items-center justify-center pt-4 pb-16 px-6">
      {/* Heading matches About (font-bitgrid) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      ><div className="h-[2cm]" />
        <h2 className="mb-2 text-cyan-300 text-center font-bitgrid text-4xl sm:text-5xl tracking-wider">
          <SplitText text="SPONSORS" delay={0.15} scrollTrigger={isSectionInView} tag="span" />
        </h2>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {sponsors.map((sponsor, index) => (
          <motion.div
            key={sponsor.id}
            initial={{ opacity: 0, y: 40 }}
            animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
            whileHover={{ scale: 1.035, y: -2 }}
            transition={{ duration: 0.7, delay: 0.2 + index * 0.1, ease: "easeOut" }}
          >
            <div className="relative group">
              {/* Hover glow (blue-cyan radial) */}
              <div
                className="pointer-events-none absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 ease-out blur-3xl"
                style={{
                  background:
                    "radial-gradient(220px 220px at 50% 50%, rgba(34,211,238,0.45), rgba(59,130,246,0.28) 45%, transparent 70%)",
                }}
              />

              <Card
                className="relative overflow-hidden rounded-2xl border border-white/10 shadow-xl bg-neutral-900 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.25)] transition-shadow duration-500 font-[Poppins] tracking-wide"
              >
                <div className="px-6 pt-6 pb-4">
                {/* Tier line */}
                  <div className="text-center text-base md:text-lg font-semibold tracking-wide text-gray-200/95 border-b border-white/10 pb-3">
                  {sponsor.tier}
                </div>

                {/* Logo */}
                <div className="flex items-center justify-center py-8">
                  <img
                    src={sponsor.imageSrc}
                    alt={sponsor.name}
                    className="h-24 md:h-28 object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Name line */}
                  <div className="text-center border-t border-white/10 pt-3 pb-2">
                  <p className="text-xl md:text-2xl font-semibold text-gray-100 tracking-wide">
                    {sponsor.name}
                  </p>
                </div>
                </div>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default SponsorsSection;



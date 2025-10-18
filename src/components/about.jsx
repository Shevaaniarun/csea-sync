import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import SpotlightCard from "../components/ui/spotlight";

export default function AboutUs() {
  return (
    <>
    <div id="nav-about-div"></div>
    <section className="flex flex-col items-center justify-center pt-0 pb-16 px-6" id="nav-about-div">
      
      {/* Title - match Events styling and transition */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="mb-4 text-cyan-300 text-center font-bitgrid text-6xl sm:text-7xl tracking-wider">
          ABOUT
        </h2>
      </motion.div>
      
      <SpotlightCard
        className="max-w-5xl w-full text-center backdrop-blur-md border border-white/10 shadow-xl"
        spotlightColor="rgba(0, 229, 255, 0.25)"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left mb-8 md:mb-10">
          <p className="text-gray-200 leading-relaxed text-sm sm:text-base text-justify">
            Sync is an intra-college symposium hosted by the Department of
            Computer Science. It is conducted with the notion of aggrandizing
            the intellect and kindling the passion for computer science in
            budding engineers. Sync promotes inter-department collaboration and
            interdisciplinary activities. Apart from technical events, it
            focuses on other nontechnical events to maintain the perfect
            equilibrium between tech and non-tech events.
          </p>

          <p className="text-gray-200 leading-relaxed text-sm sm:text-base text-justify">
            This year, we have decided to have the events around Digital
            Well-being. Sync ‘25 is about to blossom afresh on 25th and 26th of
            October, 2025. Encompassing multifarious events, this version has
            the benchmark features to enthrall the multitude, albeit in a
            sustainable manner. Every experience brings a greater clarity of
            vision and thus with the past experiences, Sync ‘25 is all set to
            reach further horizons.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-start gap-4 text-left bg-black/20 p-4 sm:p-5 rounded-xl border border-white/10 hover:border-cyan-400 transition-all duration-300 w-full"
        >
          <div className="flex-shrink-0 text-cyan-400">
            <Calendar size={30} className="sm:w-10 sm:h-10 w-8 h-8" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl sm:text-2xl font-bold text-white break-words">
              15+ Events
            </h3>
            <p className="text-gray-300 font-semibold text-sm sm:text-base break-words">
              Experience..Expertise..Everytime
            </p>
            <p className="text-gray-400 mt-1 text-sm sm:text-base break-words">
              Come and participate in the exceptional tech and non-tech events…
            </p>
          </div>
        </motion.div>
      </SpotlightCard>
    </section>
    </>
  );
}
import { useState, useMemo } from "react";
import { Calendar } from "lucide-react";
import { Event } from "./EventCard";
import { StackedEventCard } from "./StackedEventCard";
import { EventFilters, FilterOptions } from "./EventFilters";
import LightRays from "../ui/bg-animations/LightRays";
import ParticlesBackground from "../ui/bg-animations/ParticlesBackground";
import { motion, useInView } from "framer-motion";
import SplitText from "../ui/bg-animations/SplitText";
import React, { useRef } from "react";

const day1Events: Event[] = [
  {
    id: "d1-1",
    title: "Hello World",
    description:
      "A two-round coding challenge testing aptitude and programming skills.",
    date: "October 25, 2025",
    time: "09:30 AM - 12:30 PM (Round 1), 02:00 PM - 05:00 PM (Round 2)",
    venue: "Round 1: R1, DCSE | Round 2: GFL, DCSE",
    category: "Tech",
    prizePool: "Rs.2000/-",
    participation: "Solo or Team of 2",
    contacts: [
      { name: "Renjitha", phone: "7907854731" },
      { name: "Pradeep", phone: "7904137572" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1551033406-611cf9a28f67",
    rules: [
      "Round 1: Aptitude quiz (logical, quantitative, verbal).",
      "Round 2: Coding on HackerRank — 2 problems based on logic and efficiency.",
      "Evaluation on correctness and code optimization.",
      "Top scorers from Round 1 qualify for Round 2.",
    ],
  },
  {
    id: "d1-2",
    title: "OSPC",
    description:
      "A two-round coding and problem-solving contest for sharp minds.",
    date: "October 25, 2025",
    time: "09:30 AM - 04:00 PM (Round 1)",
    venue: "Round 1: FFL, DCSE",
    category: "Tech",
    prizePool: "Rs.2500/-",
    participation: "Solo or Team of 2",
    contacts: [
      { name: "Harisangar", phone: "9952878399" },
      { name: "Dhanush", phone: "8124868540" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1581091870622-7c92df9a8b32",
    rules: [
      "Round 1: MCQ quiz on DS, Algorithms, and Problem Solving.",
      "Round 2: Coding + Secret Code Challenge.",
      "Special problem reveals a bonus round that teams can bid points on.",
      "Winning depends on total score and time efficiency.",
    ],
  },
  {
    id: "d1-3",
    title: "Algobazaar",
    description:
      "A strategic coding event combining algorithms and bidding challenges.",
    date: "October 25, 2025",
    time: "09:30 AM - 12:30 PM (Round 1), 02:00 PM - 05:00 PM (Round 2)",
    venue: "Round 1: TFL, DCSE | Round 2: TFL, DCSE",
    category: "Tech",
    prizePool: "Rs.2000/-",
    participation: "Team of 2",
    contacts: [
      { name: "Sahana", phone: "7418247031" },
      { name: "Balaji", phone: "8220706643" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    rules: [
      "Round 1: MCQs + short coding (earn AlgoCoins).",
      "Round 2: Teams bid AlgoCoins to buy algorithms before solving challenges.",
      "Scoring: 50% correctness, 25% efficiency, 25% smart algorithm use.",
      "Trading algorithms between teams is allowed.",
      "Highest cumulative score wins.",
    ],
  },
  {
    id: "d1-4",
    title: "Breakpoint",
    description:
      "A competitive coding event testing debugging skills, logical reasoning, and programming proficiency. Participants identify errors, understand code behavior, and implement efficient fixes.",
    date: "October 25, 2025",
    time: "09:30 AM - 12:30 PM (Round 1), 02:00 PM - 05:00 PM (Round 2)",
    venue: "Round 1: SFL, DCSE | Round 2: SFL, DCSE",
    category: "Tech",
    prizePool: "Rs.2000/-",
    participation: "Solo or Team of 2",
    contacts: [
      { name: "Sahana", phone: "7418247031" },
      { name: "Pradeep", phone: "7904137572" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1551033406-611cf9a28f67",
    rules: [
      "Round 1: 25 MCQs on logical reasoning, general quizzes, and programming concepts.",
      "Round 2: Debugging Challenge on programs with intentional syntax or logic errors (recursion, arrays, sorting, pointers).",
      "Buggy codes provided via HackerRank link; difficulty increases progressively.",
      "Evaluation: correctness, efficiency, speed, innovative approaches, and clean code.",
      "Highest cumulative score wins."
    ],
  },
  {
    id: "d1-5",
    title: "Mystery Quest",
    description:
      "Unravel a thrilling mystery by decoding puzzles, ciphers, and logic challenges.",
    date: "October 25, 2025",
    time: "10:00 AM - 04:00 PM (Round 1)",
    venue: "Round 1: R4, DCSE",
    category: "Non-Tech",
    prizePool: "Rs.1000/-",
    participation: "Team of 2",
    contacts: [
      { name: "Sahana", phone: "7418247031" },
      { name: "Varsha", phone: "8056246330" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1532614338840-ab30cf10ed36",
    rules: [
      "Teams of 2 only; no external help or devices allowed.",
      "Solve logic puzzles, ciphers, and hidden clues to find the culprit.",
      "Final submission must include murderer, motive, and reasoning.",
      "Fastest correct team wins.",
      "Misconduct or plagiarism leads to disqualification.",
    ],
  },
  {
    id: "d1-6",
    title: "Treasure Hunt",
    description:
      "Solve clues, explore campus locations, and find the hidden treasure before others!",
    date: "October 25, 2025",
    time: "10:00 AM - 04:00 PM (Round 1)",
    venue: "Round 1: Registration Desk, in front of DCSE",
    category: "Non-Tech",
    prizePool: "Rs.1000/-",
    participation: "Team of 3",
    contacts: [
      { name: "Harisangar", phone: "9952878399" },
      { name: "Balaji", phone: "8220706643" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1499428665502-503f6c608263",
    rules: [
      "Teams of 3 must stay together throughout.",
      "Clues must be followed in order; skipping is not allowed.",
      "Damaging or revealing clues to others leads to disqualification.",
      "Winners are decided by correct completion order and time.",
      "Organizers' decision is final.",
    ],
  },
  {
    id: "d1-7",
    title: "Three Dragon Quiz",
    description:
      "A cinematic showdown for true fans - the “Three Dragon Quiz” by Quizzers Anonymous celebrates the legends Rajni, Kamal, and ARR. Test your fandom and prove you know the magic behind Tamil cinema’s greatest trio!",
    date: "October 25, 2025",
    time: "10:00 AM - 01:00 PM (Round 1), 02:00 PM - 05:00 PM (Round 2)",
    venue: "Round 1: Turing Hall, DCSE | Round 2: R1, DCSE",
    category: "Non-Tech",
    prizePool: "Rs.1000/-",
    participation: "Team of 2",
    contacts: [
      { name: "Sarvesh", phone: "8939733220" },
      { name: "Renjitha", phone: "7907854731" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4",
    rules: [
      "Round 1: General knowledge and current affairs quiz.",
      "Round 2: Rapid fire and buzzer rounds.",
      "No mobile phones or external help allowed.",
      "Highest total score wins.",
      "Organizers' decision is final.",
    ],
  },
  {
    id: "w-1",
    title: "AI on Logic",
    description:
      'Join an exclusive hands-on workshop by "Bonbloc Technologies" exploring the evolution of AI from Machine Learning to Agentic Systems. Build your own RAG assistant and multi-agent system in real time!',
    date: "October 25, 2025",
    time: "09:30 AM - 12:30 PM",
    venue: "GFL (Ground Floor Lab), CSE Dept",
    category: "Workshop",
    prizePool: "E-Certificates for all active participants",
    participation: "Open to all students",
    contacts: [
      { name: "Sanjay", phone: "8448358787" },
      { name: "Deepak", phone: "6380156548" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    rules: [
      "Register before 20th October 2025 using the provided form link.",
      "Open to all students; no registration fee required.",
      "Bring your own laptop for hands-on practice.",
      "Ensure Python, Streamlit, and basic ML libraries are pre-installed.",
      "Workshop covers LangChain, Ollama, FAISS/ChromaDB, Streamlit, and LangGraph.",
      "Participants will build an AI RAG Assistant and a Multi-Agent System.",
      "Certificates will be provided to active participants.",
    ],
  },
];

const day2Events: Event[] = [
  {
    id: "d2-1",
    title: "IPL Auction",
    description:
      "Form your dream IPL team in this intense two-round event featuring quizzes and a live auction.",
    date: "October 26, 2025",
    time: "09:30 AM - 12:30 PM (Round 1), 02:00 PM - 04:30 PM (Round 2)",
    venue: "Round 1: R1, DCSE | Round 2: R1, DCSE",
    category: "Non-Tech",
    prizePool: "Rs.1000/-",
    participation: "Team of 2–3",
    contacts: [
      { name: "Renjitha", phone: "7907854731" },
      { name: "Sarvesh", phone: "8939733220" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
    rules: [
      "Round 1: Quiz on IPL and world cricket; top 8–10 teams qualify.",
      "Round 2: Each team gets ₹60 Cr virtual purse to buy 9 players.",
      "Team composition: 3 batsmen, 3 bowlers, 1 wicketkeeper, 1 all-rounder, 1 extra.",
      "Top 7 players' points count for final scoring.",
      "Player stats are based on real IPL/T20 data.",
      "Overspending or violating composition rules leads to disqualification.",
      "Highest total team points wins.",
    ],
  },
  {
    id: "d2-2",
    title: "Rayan Rumble",
    description:
      "A memory-based IQ competition testing logic, recall, and teamwork through puzzles and mini-games.",
    date: "October 26, 2025",
    time: "09:30 AM - 12:30 PM (Round 1), 02:00 PM - 04:30 PM (Round 2)",
    venue: "Round 1: R2, DCSE | Round 2: R2, DCSE",
    category: "Non-Tech",
    prizePool: "Rs.1000/-",
    participation: "Team of 2–3",
    contacts: [
      { name: "Kiruthiga", phone: "8870413188"},
      { name: "Sarvesh", phone: "8939733220" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    rules: [
      "Round 1: IQ, logic, and observation-based MCQs with a memory scene task.",
      "Top 10–14 teams qualify for Round 2.",
      "Round 2: Mini-games like Rhyme Recall, Rapid Recall, Picture Chain, and Visual Quiz.",
      "No mobiles or external help allowed.",
      "Judging based on accuracy, recall, creativity, and teamwork.",
    ],
  },
  {
    id: "d2-3",
    title: "CyberSprint",
    description:
      "Hands-on cybersecurity event where teams find and exploit web vulnerabilities in OWASP Juice Shop, simulating real-world ethical hacking.",
    date: "October 26, 2025",
    time: "09:30 AM - 12:30 PM (Round 1), 02:00 PM - 04:30 PM (Round 2)",
    venue: "Round 1: GFL, DCSE | Round 2: GFL, DCSE",
    category: "Tech",
    prizePool: "Rs.2000/-",
    participation: "Solo or Team of 2",
    contacts: [
      { name: "Dhanush", phone: "8124868540" },
      { name: "Pradeep", phone: "7904137572" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1605902711622-cfb43c44367f",
    rules: [
       "Round 1: Short MCQs on web security basics (SQLi, XSS, CSRF).",
        "Round 2: Exploit vulnerabilities in Juice Shop for points (login bypass, XSS, API exploits).",
        "Ranking based on number/severity of vulnerabilities, proof quality, and speed.",
        "Follow lab rules; no destructive attacks."
    ],
  },
  {
    id: "d2-4",
    title: "OSPC",
    description:
      "A two-round coding and problem-solving contest for sharp minds.",
    date: "October 26, 2025",
    time: "09:30 AM - 12:30 PM (Round 2)",
    venue: "Round 2: TFL, DCSE",
    category: "Tech",
    prizePool: "Rs.2500/-",
    participation: "Solo or Team of 2",
    contacts: [
      { name: "Harisangar", phone: "9952878399" },
      { name: "Dhanush", phone: "8124868540" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1581091870622-7c92df9a8b32",
    rules: [
      "Round 1: MCQ quiz on DS, Algorithms, and Problem Solving.",
      "Round 2: Coding + Secret Code Challenge.",
      "Special problem reveals a bonus round that teams can bid points on.",
      "Winning depends on total score and time efficiency.",
    ],
  },
  {
    id: "d2-5",
    title: "Ctrl + HER",
    description:
      "An exclusive coding relay challenge celebrating women in tech.",
    date: "October 26, 2025",
    time: "09:30 AM - 12:30 PM (Round 1), 02:00 PM - 04:30 PM (Round 2)",
    venue: "Round 1: TFL, DCSE | Round 2: TFL, DCSE",
    category: "Tech",
    prizePool: "Rs.2000/-",
    participation: "Team of 2 (Girls Only)",
    contacts: [
      { name: "Renjitha", phone: "7907854731" },
      { name: "Varsha", phone: "8056246330" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1581090700227-4c4f4a6b6a73",
    rules: [
      "Round 1: Quiz on data structures, algorithms, and pseudocode.",
      "Round 2: Coding relay — 10 minutes per member, no communication during switches.",
      "Judging: accuracy, logic, efficiency.",
      "Plagiarism or communication leads to disqualification.",
    ],
  },

  {
    id: "d2-7",
    title: "Two Minds, One Flow",
    description:
      "A fun coding communication challenge pairing coders with non-coders.",
    date: "October 26, 2025",
    time: "09:30 AM - 12:30 PM (Round 1), 02:00 PM - 04:30 PM (Round 2)",
    venue: "Round 1: SFL, DCSE | Round 2: SFL, DCSE",
    category: "Tech",
    prizePool: "Rs.2000/-",
    participation: "Team of 2",
    contacts: [
      { name: "Kiruthiga", phone: "8870413188" },
      { name: "Pradeep", phone: "7904137572" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    rules: [
      "Round 1: Non-CSE reads code aloud, coder predicts output while blindfolded.",
      "Top 6 teams qualify for Round 2.",
      "Round 2: Non-coder types as coder instructs verbally; no screen viewing allowed.",
      "Bonus riddles give extra time for coding.",
      "Judged on teamwork, coordination, and accuracy.",
    ],
  },
];

export function EventsSection() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({ categoryFilter: [] });
  const [filtering, setFiltering] = useState(false);

  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  const filterEvents = (events: Event[]) =>
    filters.categoryFilter.length === 0
      ? events
      : events.filter((event) =>
          filters.categoryFilter.includes(event.category)
        );

  const filteredDay1 = useMemo(() => filterEvents(day1Events), [filters]);
  const filteredDay2 = useMemo(() => filterEvents(day2Events), [filters]);

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setExpandedCard(null);
    setFiltering(true);
    setTimeout(() => setFiltering(false), 100);
  };

  // Dynamic height calculation (fixes footer overlap + gaps)
  const getContainerHeight = (events: Event[]) => {
    if (events.length === 0) return "100px";
    if (expandedCard) {
      const expandedCardIndex = events.findIndex(
        (event) => event.id === expandedCard
      );
      return expandedCardIndex !== -1
        ? `${expandedCardIndex * 60 + 410}px`
        : `${events.length * 60 + 100}px`;
    }
    return `${events.length * 60 + 100}px`;
  };

  const baseDelay = filtering ? 0 : 1;

  return (
    <section
      ref={sectionRef}
      className="pb-16 lg:pt-5 pt-2 px-4 font-sans tracking-wide relative z-20"
      id="nav-events-section"
    >
      <div className="max-w-6xl mx-auto">
        <div className="h-[1.5cm]" />

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4 text-cyan-300 text-center font-bitgrid text-6xl sm:text-7xl  tracking-wider">
            EVENTS
          </h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <EventFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </motion.div>

        {/* Event stacks */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 mt-12">
          {/* Day 1 */}
          <motion.div
            key={`day1-${filters.categoryFilter.join("-")}`} // <-- forces refresh
            initial={{ opacity: 0, y: 40 }}
            animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: baseDelay }}
            className="flex-1 min-w-0"
          >
            <h3 className="flex items-center justify-center gap-2 text-lg font-semibold mb-6 text-cyan-300">
              <Calendar className="w-4 h-4" />
              <SplitText
                text="Day &nbsp; 1&nbsp; -&nbsp; October&nbsp;' 25"
                delay={0.2}
                scrollTrigger={isSectionInView}
                tag="span"
              />
            </h3>
            <div
              className="relative w-full max-w-sm mx-auto"
              style={{ height: getContainerHeight(filteredDay1) }}
            >
              {filteredDay1.length > 0 ? (
                filteredDay1.map((event, index) => (
                  <StackedEventCard
                    key={event.id}
                    event={event}
                    index={index}
                    totalCards={filteredDay1.length}
                    isExpanded={expandedCard === event.id}
                    onExpand={() => setExpandedCard(event.id)}
                    onCollapse={() => setExpandedCard(null)}
                  />
                ))
              ) : (
                <p className="text-center text-cyan-400/70 py-8">
                  No events found for Day 1.
                </p>
              )}
            </div>
          </motion.div>

          {/* Day 2 */}
          <motion.div
            key={`day2-${filters.categoryFilter.join("-")}`} // <-- forces refresh
            initial={{ opacity: 0, y: 40 }}
            animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: baseDelay + 0.5 }}
            className="flex-1 min-w-0"
          >
            <h3 className="flex items-center justify-center gap-2 text-lg font-semibold mb-6 text-cyan-300">
              <Calendar className="w-4 h-4" />
              <SplitText
                text="Day &nbsp;2 &nbsp;- &nbsp;October &nbsp;'26"
                delay={0.1}
                scrollTrigger={isSectionInView}
                tag="span"
              />
            </h3>
            <div
              className="relative w-full max-w-sm mx-auto"
              style={{ height: getContainerHeight(filteredDay2) }}
            >
              {filteredDay2.length > 0 ? (
                filteredDay2.map((event, index) => (
                  <StackedEventCard
                    key={event.id}
                    event={event}
                    index={index}
                    totalCards={filteredDay2.length}
                    isExpanded={expandedCard === event.id}
                    onExpand={() => setExpandedCard(event.id)}
                    onCollapse={() => setExpandedCard(null)}
                  />
                ))
              ) : (
                <p className="text-center text-cyan-400/70 py-8">
                  No events found for Day 2.
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {/* No results */}
        {filters.categoryFilter.length > 0 &&
          filteredDay1.length === 0 &&
          filteredDay2.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isSectionInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mt-12"
            >
              <p className="text-cyan-400/70 text-lg">
                No events found for the selected filters.
              </p>
            </motion.div>
          )}
      </div>
    </section>
  );
}

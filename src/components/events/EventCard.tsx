import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card.tsx";
import { Badge } from "../ui/badge.tsx";
import { Calendar, MapPin, Users, Gift } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: "Tech" | "Non-Tech" | "Workshop";
  prizePool: string;
  participation: string;
  contacts: { name: string; phone: string }[];
  imageUrl: string;
  rules?: string[];
}

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [viewRules, setViewRules] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 40, scale: 0.9 }
      }
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="w-full max-w-sm mx-auto glassy-blue shadow-[0_0_20px_rgba(0,255,255,0.16)] hover:shadow-[0_0_30px_rgba(0,255,255,0.26)] transition-all duration-500 rounded-xl font-[Poppins] tracking-wide relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
          <div className="neon-border-animation">
            <div className="vertical-left"></div>
            <div className="vertical-right"></div>
          </div>
        </div>

        {/* Top image placeholder */}
        <div className="relative h-40 overflow-hidden rounded-t-lg bg-gradient-to-tr from-blue-950 via-black to-blue-950">
          <Badge className="absolute top-3 left-3 glassy-chip text-cyan-200 text-xs px-3 py-1">
            {event.category}
          </Badge>
        </div>

        <AnimatePresence mode="wait">
          {!viewRules ? (
            <motion.div
              key="description"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
            >
              <CardHeader className="pb-3">
                <CardTitle className="font-semibold text-lg text-cyan-200 glowing-title">
                  {event.title}
                </CardTitle>
                <CardDescription className="text-cyan-100/70 mt-1">
                  {event.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2 text-sm text-cyan-200/80 pb-5">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>
                    {event.date}, {event.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>{event.participation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-cyan-400" />
                  <span>{event.prizePool}</span>
                </div>

                <div>
                  <span className="font-medium text-cyan-300">Contacts: </span>
                  {event.contacts.map((c, i) => (
                    <span key={i} className="block">
                      {c.name}: {c.phone}
                    </span>
                  ))}
                </div>

                {event.rules && event.rules.length > 0 && (
                  <div className="flex justify-end mt-4">
                    <motion.button
                      onClick={() => setViewRules(true)}
                      whileHover={{ scale: 1.08, boxShadow: "0 0 12px #00eaff" }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-200 text-sm font-medium hover:bg-cyan-500/30 transition-all"
                    >
                      View Rules →
                    </motion.button>
                  </div>
                )}
              </CardContent>
            </motion.div>
          ) : (
            <motion.div
              key="rules"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
            >
              <CardHeader className="pb-3">
                <CardTitle className="font-semibold text-lg text-cyan-200 glowing-title">
                  {event.title} - Rules
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-cyan-200/80 pb-5">
                <ul className="list-disc list-inside space-y-1">
                  {event.rules?.map((rule, i) => (
                    <li key={i}>{rule}</li>
                  ))}
                </ul>
                <div className="flex justify-start mt-4">
                  <motion.button
                    onClick={() => setViewRules(false)}
                    whileHover={{ scale: 1.08, boxShadow: "0 0 12px #00eaff" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-200 text-sm font-medium hover:bg-cyan-500/30 transition-all"
                  >
                    ← Back
                  </motion.button>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Neon animation and glow styling */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
          @keyframes neonMoveHorizontal {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes neonMoveVertical {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          .neon-border-animation::before,
          .neon-border-animation::after,
          .neon-border-animation .vertical-left,
          .neon-border-animation .vertical-right {
            content: '';
            position: absolute;
            background: linear-gradient(90deg, transparent, #00eaff, #00eaff, transparent);
          }
          .neon-border-animation::before {
            top: 0; left: 0; right: 0; height: 3px;
            animation: neonMoveHorizontal 4s linear infinite;
          }
          .neon-border-animation::after {
            bottom: 0; left: 0; right: 0; height: 3px;
            animation: neonMoveHorizontal 4s linear infinite reverse;
          }
          .neon-border-animation .vertical-left {
            top: 0; bottom: 0; left: 0; width: 3px;
            background: linear-gradient(180deg, transparent, #00eaff, #00eaff, transparent);
            animation: neonMoveVertical 4s linear infinite reverse;
          }
          .neon-border-animation .vertical-right {
            top: 0; bottom: 0; right: 0; width: 3px;
            background: linear-gradient(180deg, transparent, #00eaff, #00eaff, transparent);
            animation: neonMoveVertical 4s linear infinite;
          }
          .glowing-title {
            text-shadow: 0 0 6px rgba(0, 234, 255, 0.7), 0 0 14px rgba(0, 234, 255, 0.5);
          }
        `}</style>
      </Card>
    </motion.div>
  );
}

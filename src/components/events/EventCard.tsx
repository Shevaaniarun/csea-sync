import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card.tsx";
import { Badge } from "../ui/badge.tsx";
import { Calendar, MapPin, Users, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";

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
      <Card className="w-full max-w-sm mx-auto glassy-blue shadow-[0_0_18px_rgba(0,255,255,0.14)] hover:shadow-[0_0_26px_rgba(0,255,255,0.24)] transition-all duration-300 rounded-xl font-sans tracking-wide">

        {/* Top Image */}
        <div className="relative h-40 overflow-hidden rounded-t-lg">
          <Badge className="absolute top-3 left-3 glassy-chip text-cyan-200">
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
              transition={{ duration: 0.3 }}
            >
              {/* Content */}
              <CardHeader className="pb-3">
                <CardTitle className="line-clamp-2 font-bold text-cyan-200">
                  {event.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 text-cyan-100/70">
                  {event.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2 text-sm text-cyan-200/80">
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

                {/* Button to show rules */}
                {event.rules && event.rules.length > 0 && (
                  <button
                    onClick={() => setViewRules(true)}
                    className="text-cyan-300 underline hover:text-cyan-200 mt-2"
                  >
                    View Rules
                  </button>
                )}
              </CardContent>
            </motion.div>
          ) : (
            <motion.div
              key="rules"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CardHeader className="pb-3">
                <CardTitle className="line-clamp-2 font-bold text-cyan-200">
                  {event.title} - Rules
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-2 text-sm text-cyan-200/80">
                <ul className="list-disc list-inside space-y-1">
                  {event.rules?.map((rule, i) => (
                    <li key={i}>{rule}</li>
                  ))}
                </ul>

                <button
                  onClick={() => setViewRules(false)}
                  className="text-cyan-300 underline hover:text-cyan-200 mt-2"
                >
                  Back
                </button>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

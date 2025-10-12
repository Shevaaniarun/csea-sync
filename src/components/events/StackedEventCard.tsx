import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card.tsx";
import { Calendar, MapPin, Users, Gift, X } from "lucide-react";
import { Event } from "./EventCard";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface StackedEventCardProps {
  event: Event;
  index: number;
  totalCards: number;
  isExpanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export function StackedEventCard({
  event,
  index,
  totalCards,
  isExpanded,
  onExpand,
  onCollapse,
}: StackedEventCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showRules, setShowRules] = useState(false);
  const inView = useInView(cardRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isExpanded) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        onCollapse();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded, onCollapse]);

  const getCardStyle = (): React.CSSProperties => {
    const baseOffset = index * 60;
    const zIndex = totalCards - index;
    const style: React.CSSProperties = { top: `${baseOffset}px`, zIndex };
    if (isExpanded) style.zIndex = 1000;
    return style;
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8, y: 40 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        duration: 0.15,
        delay: index * 0.1,
        ease: [0.25, 0.8, 0.25, 1],
      }}
      className="absolute w-full transition-all duration-300 ease-out cursor-pointer font-[Poppins]"
      style={getCardStyle()}
      onClick={isExpanded ? onCollapse : onExpand}
    >
      <Card
        className={`w-full max-w-sm mx-auto transition-all duration-300 rounded-xl overflow-hidden ${
          isExpanded
            ? "glassy-blue shadow-[0_0_30px_rgba(0,255,255,0.22)]"
            : "bg-gradient-to-tr from-blue-950 via-black to-blue-950 border border-cyan-400/30 shadow-[0_0_14px_rgba(0,255,255,0.12)]"
        }`}
      >
        {isExpanded && (
          <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
            <div className="neon-border-animation">
              <div className="vertical-left"></div>
              <div className="vertical-right"></div>
            </div>
          </div>
        )}

        {isExpanded && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCollapse();
            }}
            className="absolute top-3 right-3 z-10 p-1 rounded-full glassy-button hover:bg-cyan-700/40 transition"
          >
            <X className="w-3 h-3 text-cyan-300" />
          </button>
        )}

        <div
          className={`transition-all duration-300 overflow-hidden ${
            isExpanded ? "max-h-[600px] opacity-100" : "max-h-20 opacity-100"
          }`}
        >
          <AnimatePresence mode="wait">
            {!showRules ? (
              <motion.div
                key="description"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="line-clamp-2 text-lg font-semibold text-cyan-200 p-1 rounded-md glowing-title">
                    {event.title}
                  </CardTitle>
                  {isExpanded && (
                    <CardDescription className="text-cyan-100/70 mt-2">
                      {event.description}
                    </CardDescription>
                  )}
                </CardHeader>

                {isExpanded && (
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

                    {event.rules && event.rules.length > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowRules(true);
                        }}
                        className="text-cyan-300 underline hover:text-cyan-200 mt-2"
                      >
                        View Rules
                      </button>
                    )}
                  </CardContent>
                )}
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
                  <CardTitle className="line-clamp-2 text-lg font-semibold text-cyan-200 p-1 rounded-md glowing-title">
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowRules(false);
                    }}
                    className="text-cyan-300 underline hover:text-cyan-200 mt-2"
                  >
                    Back
                  </button>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>

      {/* Neon CSS */}
      <style>{`
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
        .neon-border-animation::before { top: 0; left: 0; right: 0; height: 3px; animation: neonMoveHorizontal 4s linear infinite; }
        .neon-border-animation::after { bottom: 0; left: 0; right: 0; height: 3px; animation: neonMoveHorizontal 4s linear infinite reverse; }
        .neon-border-animation .vertical-left { top: 0; bottom: 0; left: 0; width: 3px; background: linear-gradient(180deg, transparent, #00eaff, #00eaff, transparent); animation: neonMoveVertical 4s linear infinite reverse; }
        .neon-border-animation .vertical-right { top: 0; bottom: 0; right: 0; width: 3px; background: linear-gradient(180deg, transparent, #00eaff, #00eaff, transparent); animation: neonMoveVertical 4s linear infinite; }
        .glowing-title {
          text-shadow: 0 0 6px rgba(0, 234, 255, 0.7), 0 0 14px rgba(0, 234, 255, 0.5);
        }
      `}</style>
    </motion.div>
  );
}

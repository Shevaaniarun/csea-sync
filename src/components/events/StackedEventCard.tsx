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
import { motion, useInView } from "framer-motion";

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
  const [isAnimating, setIsAnimating] = useState(false);

  // detect when card enters viewport (only once)
  const inView = useInView(cardRef, { once: true, margin: "-50px" });

  // Close when clicking outside
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
    const style: React.CSSProperties = {
      top: `${baseOffset}px`,
      zIndex,
    };
    if (isExpanded) {
      style.zIndex = 1000;
      // Keep the card in its original position when expanded
      style.top = `${baseOffset}px`;
    }
    return style;
  };

  const handleTransitionStart = () => setIsAnimating(true);
  const handleTransitionEnd = () => setIsAnimating(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8, y: 40 }}
      animate={
        inView
          ? { opacity: 1, scale: 1, y: 0 }
          : {}
      }
      transition={{
        duration: 0.3,
        delay: index * 0.15,
        ease: [0.25, 0.8, 0.25, 1], 
      }}
      className="absolute w-full transition-all duration-300 ease-out cursor-pointer font-[Poppins]"
      style={getCardStyle()}
      onClick={isExpanded ? onCollapse : onExpand}
    >
      <Card
        className={`w-full max-w-sm mx-auto bg-gradient-to-tr from-blue-950 via-black to-blue-950 border border-cyan-400/40 shadow-[0_0_20px_rgba(0,255,255,0.15)] transition-all duration-300 rounded-xl overflow-hidden ${
          isExpanded ? "shadow-[0_0_35px_rgba(0,255,255,0.4)]" : ""
        }`}
      >
        {/* Neon animated border - only visible when expanded */}
        {isExpanded && (
          <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
            <div className="neon-border-animation">
              <div className="vertical-left"></div>
              <div className="vertical-right"></div>
            </div>
          </div>
        )}

        {/* Close button */}
        {isExpanded && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCollapse();
            }}
            className="absolute top-3 right-3 z-10 p-1 rounded-full bg-cyan-900/50 hover:bg-cyan-700/60 transition border border-cyan-400/40"
          >
            <X className="w-3 h-3 text-cyan-300" />
          </button>
        )}

        {/* Content */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isExpanded ? "max-h-[600px] opacity-100" : "max-h-20 opacity-100"
          }`}
        >
          <CardHeader className="pb-3">
            <CardTitle
              className="line-clamp-2 text-lg font-semibold text-cyan-200 bg-blue-40 p-1 rounded-md glowing-title"
            >
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
            </CardContent>
          )}
        </div>
      </Card>

      {/* Neon border + glowing title CSS */}
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
        .neon-border-animation::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #00eaff, #00eaff, transparent);
          animation: neonMoveHorizontal 4s linear infinite;
        }
        .neon-border-animation::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #00eaff, #00eaff, transparent);
          animation: neonMoveHorizontal 4s linear infinite reverse;
        }
        .neon-border-animation .vertical-left {
          position: absolute;
          top: 0; bottom: 0; left: 0;
          width: 3px;
          background: linear-gradient(180deg, transparent, #00eaff, #00eaff, transparent);
          animation: neonMoveVertical 4s linear infinite reverse;
        }
        .neon-border-animation .vertical-right {
          position: absolute;
          top: 0; bottom: 0; right: 0;
          width: 3px;
          background: linear-gradient(180deg, transparent, #00eaff, #00eaff, transparent);
          animation: neonMoveVertical 4s linear infinite;
        }

        .glowing-title {
          text-shadow: 0 0 6px rgba(0, 234, 255, 0.7), 
                       0 0 14px rgba(0, 234, 255, 0.5);
        }
      `}</style>
    </motion.div>
  );
}
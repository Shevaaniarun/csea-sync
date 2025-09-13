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

  const getCardStyle = () => {
    const baseOffset = index * 50;
    const zIndex = totalCards - index;
    if (isExpanded) return { transform: "translateY(0px) scale(1)", zIndex: 1000 };
    return { transform: `translateY(${baseOffset}px) scale(${1 - index * 0.02})`, zIndex };
  };

  const handleTransitionStart = () => setIsAnimating(true);
  const handleTransitionEnd = () => setIsAnimating(false);

  return (
    <div
      ref={cardRef}
      className="absolute w-full transition-all duration-500 ease-out cursor-pointer"
      style={getCardStyle()}
      onTransitionStart={handleTransitionStart}
      onTransitionEnd={handleTransitionEnd}
      onClick={isExpanded ? onCollapse : onExpand}
    >
      <Card
        className={`w-full max-w-sm mx-auto bg-black border border-[#7de2fc]/50 shadow-[0_0_15px_rgba(125,226,252,0.25)] transition-all duration-500 rounded-xl overflow-hidden ${
          isExpanded ? "shadow-[0_0_35px_rgba(125,226,252,0.6)] scale-105" : ""
        }`}
      >
        {/* Neon animated border */}
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
            className="absolute top-3 right-3 z-10 p-1 rounded-full bg-[#0a836eff]/30 hover:bg-[#00f7c7]/50 transition border border-[#7de2fc]/40"
          >
            <X className="w-3 h-3 text-[#00f7c7]" />
          </button>
        )}

        {/* Content */}
        <div
          className={`transition-all duration-500 overflow-hidden ${
            isExpanded ? "max-h-[600px] opacity-100" : "max-h-20 opacity-100"
          }`}
        >
          <CardHeader className="pb-3">
            <CardTitle className="line-clamp-2 text-lg font-semibold p-1 rounded-md gradient-text">
              {event.title}
            </CardTitle>
            {isExpanded && (
              <CardDescription className="mt-2 gradient-text text-sm">
                {event.description}
              </CardDescription>
            )}
          </CardHeader>

          {isExpanded && (
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#7de2fc]" />
                <span className="gradient-text">
                  {event.date}, {event.time}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#7de2fc]" />
                <span className="gradient-text">{event.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#7de2fc]" />
                <span className="gradient-text">{event.participation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-[#7de2fc]" />
                <span className="gradient-text">{event.prizePool}</span>
              </div>
              <div>
                <span className="font-medium gradient-text">Contacts: </span>
                {event.contacts.map((c, i) => (
                  <span key={i} className="block gradient-text">
                    {c.name}: {c.phone}
                  </span>
                ))}
              </div>
            </CardContent>
          )}
        </div>
      </Card>

      {/* CSS for Neon Gradient */}
      <style>{`
        /* Neon Border Animation */
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
          background: linear-gradient(90deg, transparent, #0a836eff, #00f7c7, #a29bfe, #c721ecff, transparent);
          animation: neonMoveHorizontal 5s linear infinite;
        }
        .neon-border-animation::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #0a836eff, #00f7c7, #1a73e8, #c721ecff, transparent);
          animation: neonMoveHorizontal 5s linear infinite reverse;
        }
        .neon-border-animation .vertical-left {
          position: absolute;
          top: 0; bottom: 0; left: 0;
          width: 3px;
          background: linear-gradient(180deg, transparent, #0a836eff, #00f7c7, #a29bfe, transparent);
          animation: neonMoveVertical 5s linear infinite reverse;
        }
        .neon-border-animation .vertical-right {
          position: absolute;
          top: 0; bottom: 0; right: 0;
          width: 3px;
          background: linear-gradient(180deg, transparent, #0a836eff, #1a73e8, #c721ecff, transparent);
          animation: neonMoveVertical 5s linear infinite;
        }

        /* Full Gradient Text */
        .gradient-text {
          background: linear-gradient(90deg, #7de2fc, #1a73e8, #a29bfe, #00f7c7, #c721ecff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}

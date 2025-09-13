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

  // Card stacking style
  const getCardStyle = () => {
    const baseOffset = index * 50;
    const zIndex = totalCards - index;

    if (isExpanded) {
      return {
        transform: "translateY(0px) scale(1)",
        zIndex: 1000,
      };
    }

    return {
      transform: `translateY(${baseOffset}px) scale(${1 - index * 0.02})`,
      zIndex,
    };
  };

  // Handle animation state
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
        className={`w-full max-w-sm mx-auto bg-black border border-cyan-400/50 shadow-[0_0_15px_rgba(173,216,230,0.2)] transition-all duration-500 rounded-xl overflow-hidden ${
          isExpanded ? "shadow-[0_0_30px_rgba(173,216,230,0.4)] scale-105" : ""
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
          className={`transition-all duration-500 overflow-hidden ${
            isExpanded ? "max-h-[600px] opacity-100" : "max-h-20 opacity-100"
          }`}
        >
          <CardHeader className="pb-3">
            <CardTitle
              className="line-clamp-2 text-lg font-semibold text-cyan-300 bg-black/40 p-1 rounded-md glowing-title"
            >
              {event.title}
            </CardTitle>
            {isExpanded && (
              <CardDescription className="text-cyan-200/70 mt-2">
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
          height: 4px;
          background: linear-gradient(90deg, transparent, #7de2fc, #7de2fc, transparent);
          animation: neonMoveHorizontal 4s linear infinite;
        }
        .neon-border-animation::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, transparent, #7de2fc, #7de2fc, transparent);
          animation: neonMoveHorizontal 4s linear infinite reverse;
        }
        .neon-border-animation .vertical-left {
          position: absolute;
          top: 0; bottom: 0; left: 0;
          width: 4px;
          background: linear-gradient(180deg, transparent, #7de2fc, #7de2fc, transparent);
          animation: neonMoveVertical 4s linear infinite reverse;
        }
        .neon-border-animation .vertical-right {
          position: absolute;
          top: 0; bottom: 0; right: 0;
          width: 4px;
          background: linear-gradient(180deg, transparent, #7de2fc, #7de2fc, transparent);
          animation: neonMoveVertical 4s linear infinite;
        }

        /* Subtle glowing title */
        .glowing-title {
          text-shadow: 0 0 6px rgba(125, 226, 252, 0.6), 
                       0 0 12px rgba(125, 226, 252, 0.4);
        }
      `}</style>
    </div>
  );
}

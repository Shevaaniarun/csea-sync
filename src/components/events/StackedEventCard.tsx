import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card.tsx";
import { Badge } from "../ui/badge.tsx";
import { Calendar, MapPin, Users, Gift } from "lucide-react";
import { Event } from "./EventCard";
import { useRef, useEffect } from "react";

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

  return (
    <div
      ref={cardRef}
      className="absolute w-full transition-all duration-500 ease-out cursor-pointer"
      style={getCardStyle()}
      onClick={isExpanded ? onCollapse : onExpand} 
    >
      <Card
        className={`w-full max-w-sm mx-auto bg-white shadow-lg transition-all duration-500 ${
          isExpanded ? "shadow-2xl scale-105" : "hover:shadow-xl"
        }`}
      >
        {/* Top Image (optional, uncomment if needed) */}
        {/*
        <div className="relative h-32 overflow-hidden rounded-t-lg">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            {event.category}
          </Badge>
        </div>
        */}

        {/* Content */}
        <div
          className={`transition-all duration-500 overflow-hidden ${
            isExpanded ? "max-h-[600px] opacity-100" : "max-h-20 opacity-100"
          }`}
        >
          <CardHeader className="pb-3">
            <CardTitle className="line-clamp-2 text-lg leading-snug font-semibold">
              {event.title}
            </CardTitle>
            {isExpanded && (
              <CardDescription>{event.description}</CardDescription>
            )}
          </CardHeader>

          {isExpanded && (
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {event.date}, {event.time}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{event.participation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4" />
                <span>{event.prizePool}</span>
              </div>
              <div>
                <span className="font-medium">Contacts: </span>
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
    </div>
  );
}

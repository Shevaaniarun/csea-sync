import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card.tsx";
import { Badge } from "../ui/badge.tsx";
import { Calendar, MapPin, Users, Gift } from "lucide-react";

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
}

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="w-full max-w-sm mx-auto bg-gradient-to-br from-blue-950 to-black border border-cyan-400/40 shadow-[0_0_20px_rgba(0,255,255,0.15)] hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] transition-all duration-300 rounded-xl font-sans tracking-wide">
      {/* Top Image */}
      <div className="relative h-40 overflow-hidden rounded-t-lg">
        <Badge className="absolute top-3 left-3 bg-cyan-600/20 text-cyan-300 border-cyan-400/40">
          {event.category}
        </Badge>
      </div>

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
      </CardContent>
    </Card>
  );
}

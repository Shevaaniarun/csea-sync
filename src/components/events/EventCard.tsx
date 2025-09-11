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
    <Card className="w-full max-w-sm mx-auto bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Top Image */}
      <div className="relative h-40 overflow-hidden rounded-t-lg">
        {/*<img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />*/}
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
          {event.category}
        </Badge>
      </div>

      {/* Content */}
      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-2 font:bold">{event.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {event.description}
        </CardDescription>
      </CardHeader>

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
    </Card>
  );
}

import { useState, useMemo } from "react";
import { Calendar } from "lucide-react";
import { Event } from "./EventCard";
import { StackedEventCard } from "./StackedEventCard";
import { EventFilters, FilterOptions } from "./EventFilters";

const day1Events: Event[] = [
  {
    id: "d1-1",
    title: "Code Bingo",
    description: "Step into the captivating world of Coding, an exhilarating coding adventure where each challenge unlocks the secrets of the next thrilling quest!",
    date: "September 28, 2024",
    time: "09:30 AM - 12:30 PM",
    venue: "RUSA Gallery, KP",
    category: "Tech",
    prizePool: "Rs.2000/-",
    participation: "Team of 2",
    contacts: [
      { name: "Sreenithika S", phone: "4716826672" },
      { name: "Ahalya V S", phone: "7124947967" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1551033406-611cf9a28f67"
  },
  {
    id: "d1-2",
    title: "Bug Hunt",
    description: "Race against time to debug code snippets and find hidden errors in real-world problems.",
    date: "September 28, 2024",
    time: "01:30 PM - 03:00 PM",
    venue: "Lab 101, CS Block",
    category: "Tech",
    prizePool: "Rs.1500/-",
    participation: "Solo",
    contacts: [{ name: "Rahul R", phone: "9876543210" }],
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475"
  },
  {
    id: "d1-3",
    title: "Capture the Flag",
    description: "A thrilling cybersecurity contest where participants solve real-world hacking challenges.",
    date: "September 28, 2024",
    time: "03:30 PM - 05:30 PM",
    venue: "Cyber Lab",
    category: "Tech",
    prizePool: "Rs.3000/-",
    participation: "Team of 3",
    contacts: [{ name: "Meera P", phone: "9845612345" }],
    imageUrl: "https://images.unsplash.com/photo-1605902711622-cfb43c44367f"
  },
  {
    id: "d1-4",
    title: "AI Quizathon",
    description: "A fast-paced quiz competition testing your AI and ML knowledge.",
    date: "September 28, 2024",
    time: "11:00 AM - 12:30 PM",
    venue: "Seminar Hall A",
    category: "Tech",
    prizePool: "Rs.1000/-",
    participation: "Team of 2",
    contacts: [{ name: "Arjun M", phone: "9876501234" }],
    imageUrl: "https://images.unsplash.com/photo-1581091870622-7c92df9a8b32"
  },
  {
    id: "d1-5",
    title: "Pixel Perfect",
    description: "A digital art competition where creativity meets technology.",
    date: "September 28, 2024",
    time: "02:00 PM - 04:00 PM",
    venue: "Art Studio",
    category: "Non-Tech",
    prizePool: "Rs.1200/-",
    participation: "Solo",
    contacts: [{ name: "Neha K", phone: "9998823456" }],
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  },
  {
    id: "d1-6",
    title: "Photography Challenge",
    description: "Capture campus moments and tell a story through your lens.",
    date: "September 28, 2024",
    time: "Full Day",
    venue: "Campus Grounds",
    category: "Non-Tech",
    prizePool: "Rs.2000/-",
    participation: "Solo",
    contacts: [{ name: "Kiran S", phone: "8899776655" }],
    imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
  },
  {
    id: "d1-7",
    title: "Treasure Hunt",
    description: "Decode clues and race across campus in this adventurous challenge.",
    date: "September 28, 2024",
    time: "10:00 AM - 12:00 PM",
    venue: "Campus",
    category: "Non-Tech",
    prizePool: "Rs.1500/-",
    participation: "Team of 4",
    contacts: [{ name: "Anu T", phone: "7776655443" }],
    imageUrl: "https://images.unsplash.com/photo-1499428665502-503f6c608263"
  },
  {
    id: "d1-8",
    title: "Movie Mania",
    description: "A fun quiz on movies, series, and pop culture.",
    date: "September 28, 2024",
    time: "01:00 PM - 02:30 PM",
    venue: "Auditorium",
    category: "Non-Tech",
    prizePool: "Rs.800/-",
    participation: "Team of 2",
    contacts: [{ name: "Deepa V", phone: "7788996655" }],
    imageUrl: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4"
  },
  {
    id: "d1-9",
    title: "UI/UX Design Workshop",
    description: "Learn how to design user-friendly and visually appealing applications.",
    date: "September 28, 2024",
    time: "09:30 AM - 11:30 AM",
    venue: "Design Lab",
    category: "Workshop",
    prizePool: "Certificates",
    participation: "Solo",
    contacts: [{ name: "Ramesh P", phone: "9877701234" }],
    imageUrl: "https://images.unsplash.com/photo-1587614295999-6c8c9b87e7f6"
  },
  {
    id: "d1-10",
    title: "Agile Project Workshop",
    description: "Hands-on training in Agile project management and Scrum practices.",
    date: "September 28, 2024",
    time: "02:00 PM - 05:00 PM",
    venue: "Workshop Hall",
    category: "Workshop",
    prizePool: "Certificates",
    participation: "Team of 2",
    contacts: [{ name: "Shalini N", phone: "976543210" }],
    imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
  }
];

const day2Events: Event[] = [
  {
    id: "d2-1",
    title: "Hackathon",
    description: "An all-day coding marathon where participants solve real-world problems.",
    date: "September 29, 2024",
    time: "09:00 AM - 06:00 PM",
    venue: "Innovation Hub",
    category: "Tech",
    prizePool: "Rs.5000/-",
    participation: "Team of 3",
    contacts: [{ name: "Vishnu K", phone: "9876541111" }],
    imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
  },
  {
    id: "d2-2",
    title: "Tech Debate",
    description: "Debate on the most impactful technologies shaping our future.",
    date: "September 29, 2024",
    time: "11:00 AM - 01:00 PM",
    venue: "Auditorium",
    category: "Tech",
    prizePool: "Rs.2000/-",
    participation: "Team of 2",
    contacts: [{ name: "Aravind S", phone: "9812345670" }],
    imageUrl: "https://images.unsplash.com/photo-1532614338840-ab30cf10ed36"
  },
  {
    id: "d2-3",
    title: "Cloud Challenge",
    description: "Solve real-world problems using cloud technologies in a timed event.",
    date: "September 29, 2024",
    time: "02:00 PM - 04:00 PM",
    venue: "Cloud Lab",
    category: "Tech",
    prizePool: "Rs.2500/-",
    participation: "Team of 2",
    contacts: [{ name: "Priya G", phone: "9812765432" }],
    imageUrl: "https://images.unsplash.com/photo-1581090700227-4c4f4a6b6a73"
  },
  {
    id: "d2-4",
    title: "Quiz Bowl",
    description: "A brain-teasing quiz on science, tech, and general knowledge.",
    date: "September 29, 2024",
    time: "10:00 AM - 11:30 AM",
    venue: "Seminar Hall B",
    category: "Tech",
    prizePool: "Rs.1200/-",
    participation: "Team of 2",
    contacts: [{ name: "Manoj T", phone: "9888776655" }],
    imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df"
  },
  {
    id: "d2-5",
    title: "Cooking Without Fire",
    description: "A fun culinary contest to create unique dishes without fire.",
    date: "September 29, 2024",
    time: "12:00 PM - 01:30 PM",
    venue: "Cafeteria",
    category: "Non-Tech",
    prizePool: "Rs.1000/-",
    participation: "Team of 2",
    contacts: [{ name: "Sneha R", phone: "9898123456" }],
    imageUrl: "https://images.unsplash.com/photo-1600891963932-db97d1d4a0b1"
  },
  {
    id: "d2-6",
    title: "Dance Battle",
    description: "Showcase your moves in this high-energy dance contest.",
    date: "September 29, 2024",
    time: "03:00 PM - 05:00 PM",
    venue: "Open Stage",
    category: "Non-Tech",
    prizePool: "Rs.2500/-",
    participation: "Solo/Team",
    contacts: [{ name: "Akash M", phone: "9911223344" }],
    imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
  },
  {
    id: "d2-7",
    title: "Drama Fest",
    description: "Perform a short drama on social issues or comedy skits.",
    date: "September 29, 2024",
    time: "05:30 PM - 07:00 PM",
    venue: "Auditorium",
    category: "Non-Tech",
    prizePool: "Rs.2000/-",
    participation: "Team of 5-8",
    contacts: [{ name: "Riya P", phone: "9800765432" }],
    imageUrl: "https://images.unsplash.com/photo-1515165562835-c4c9e0caf67b"
  },
  {
    id: "d2-8",
    title: "Fashion Show",
    description: "Walk the ramp with creative themes and style.",
    date: "September 29, 2024",
    time: "07:30 PM - 09:00 PM",
    venue: "Main Stage",
    category: "Non-Tech",
    prizePool: "Rs.5000/-",
    participation: "Team",
    contacts: [{ name: "Asha K", phone: "9823456789" }],
    imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
  },
  {
    id: "d2-9",
    title: "AR/VR Workshop",
    description: "Hands-on session to build augmented and virtual reality apps.",
    date: "September 29, 2024",
    time: "09:30 AM - 12:00 PM",
    venue: "VR Lab",
    category: "Workshop",
    prizePool: "Certificates",
    participation: "Team of 2",
    contacts: [{ name: "Rohit K", phone: "9834561234" }],
    imageUrl: "https://images.unsplash.com/photo-1581092334607-1e27f23d2e45"
  },
  {
    id: "d2-10",
    title: "Entrepreneurship Workshop",
    description: "Learn startup pitching, funding basics, and team building.",
    date: "September 29, 2024",
    time: "01:00 PM - 04:00 PM",
    venue: "Innovation Hall",
    category: "Workshop",
    prizePool: "Certificates",
    participation: "Solo/Team",
    contacts: [{ name: "Varun S", phone: "9886543211" }],
    imageUrl: "https://images.unsplash.com/photo-1532614338840-ab30cf10ed36"
  }
];

export function EventsSection() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    categoryFilter: [],
  });

  const filterEvents = (events: Event[]) => {
    if (filters.categoryFilter.length === 0) return events;
    return events.filter(event =>
      filters.categoryFilter.includes(event.category)
    );
  };

  const filteredDay1 = useMemo(() => filterEvents(day1Events), [filters]);
  const filteredDay2 = useMemo(() => filterEvents(day2Events), [filters]);

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setExpandedCard(null);
  };

  const handleExpand = (eventId: string) => setExpandedCard(eventId);
  const handleCollapse = () => setExpandedCard(null);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        {/*
        <div className="text-center mb-12">
          <h2 className="mb-4 text-cyan-300 font-bold text-4xl tracking-wider">SYNC 2025</h2>
          <p className="text-cyan-200/80 max-w-2xl mx-auto">
            Two amazing days of learning, networking, and innovation.
          </p>
        </div>
        */}

        {/* Filters */}
        <EventFilters filters={filters} onFiltersChange={handleFiltersChange} />

        {/* Two stacks side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          {/* Day 1 */}
          <div>
            <h3 className="flex items-center justify-center gap-2 text-lg font-semibold mb-6 text-cyan-300">
              <Calendar className="w-4 h-4" />
              Day 1 - March 15
            </h3>
            <div className="relative w-full max-w-sm mx-auto" style={{ height: expandedCard ? '600px' : '700px' }}>
              {filteredDay1.map((event, index) => (
                <StackedEventCard
                  key={event.id}
                  event={event}
                  index={index}
                  totalCards={filteredDay1.length}
                  isExpanded={expandedCard === event.id}
                  onExpand={() => handleExpand(event.id)}
                  onCollapse={handleCollapse}
                />
              ))}
            </div>
            {filteredDay1.length === 0 && (
              <p className="text-center text-cyan-400/70 mt-8">
                No events found for Day 1.
              </p>
            )}
          </div>

          {/* Day 2 */}
          <div>
            <h3 className="flex items-center justify-center gap-2 text-lg font-semibold mb-6 text-cyan-300">
              <Calendar className="w-4 h-4" />
              Day 2 - March 16
            </h3>
            <div className="relative w-full max-w-sm mx-auto" style={{ height: expandedCard ? '600px' : '700px' }}>
              {filteredDay2.map((event, index) => (
                <StackedEventCard
                  key={event.id}
                  event={event}
                  index={index}
                  totalCards={filteredDay2.length}
                  isExpanded={expandedCard === event.id}
                  onExpand={() => handleExpand(event.id)}
                  onCollapse={handleCollapse}
                />
              ))}
            </div>
            {filteredDay2.length === 0 && (
              <p className="text-center text-cyan-400/70 mt-8">
                No events found for Day 2.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

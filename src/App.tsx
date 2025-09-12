import { EventsSection } from "./components/events/EventsSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <EventsSection />
      <Footer />
    </div>
  );
}
import { EventsSection } from "./components/events/EventsSection";
import NavbarComponet from "./navbar-components/NavbarComponent";
import HomeComponent from "./home-components/HomeComponent";
export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <NavbarComponet/>
      <HomeComponent/>
      <EventsSection />
    </div>
  );
}
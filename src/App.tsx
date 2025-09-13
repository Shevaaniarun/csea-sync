import { EventsSection } from "./components/events/EventsSection";
import { Footer } from "./components/Footer";
import HomeComponent from "./home-components/HomeComponent";
import NavbarComponent from "./navbar-components/NavbarComponent";
export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <NavbarComponent />
      <HomeComponent />
      <EventsSection />
      <Footer />
    </div>
  );
}

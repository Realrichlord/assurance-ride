import { BrowserRouter, Routes as RouterRoutes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Book from "./pages/Book";
import ServicesPage from "./pages/ServicesPage";
import RoutesPage from "./pages/RoutesPage";
import About from "./pages/About";
import Drivers from "./pages/Drivers";
import Contact from "./pages/Contact";
import DriverPortal from "./pages/DriverPortal";
function AppLayout() {
  const location = useLocation();
  const isDriverPortal = location.pathname.startsWith("/driver");
  return <>{!isDriverPortal && <Header />}<main><RouterRoutes>
    <Route path="/" element={<Home />} /><Route path="/book" element={<Book />} />
    <Route path="/services" element={<ServicesPage />} /><Route path="/routes" element={<RoutesPage />} />
    <Route path="/about" element={<About />} /><Route path="/drivers" element={<Drivers />} />
    <Route path="/contact" element={<Contact />} /><Route path="/driver" element={<DriverPortal />} />
  </RouterRoutes></main>{!isDriverPortal && <Footer />}</>;
}
export default function App() { return <BrowserRouter><AppLayout /></BrowserRouter>; }

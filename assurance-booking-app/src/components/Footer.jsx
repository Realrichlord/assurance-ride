import { Link } from "react-router-dom";
import Brand from "./Brand";

const PHONE = "0705 064 1933";
const WHATSAPP = "2347050641933";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Link to="/" aria-label="Assurance Ride home">
              <Brand />
            </Link>
            <p>
              Private rides across Asaba, Onitsha, Awka, Enugu and beyond.
            </p>
          </div>

          <div className="footer-links">
            <h4>Explore</h4>
            <Link to="/services">Services</Link>
            <Link to="/routes">Routes</Link>
            <Link to="/about">About</Link>
            <Link to="/drivers">Drivers</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <a href="tel:+2347050641933">{PHONE}</a>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <Link to="/book">Book a ride</Link>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Assurance Ride. All rights reserved.</span>
          <span>Comfort • Safety • Private Ride</span>
        </div>
      </footer>

      <div className="mobile-cta">
        <a href="tel:+2347050641933">☎ Call</a>
        <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <Link to="/book">Book Ride</Link>
      </div>
    </>
  );
}

export default Footer;

import { useState } from "react";
import { Link } from "react-router-dom";
import Brand from "./Brand";

const PHONE = "0705 064 1933";

function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>24/7 private ride service</span>
          <a href="tel:+2347050641933">Call {PHONE}</a>
        </div>
      </div>

      <header className="header">
        <div className="container nav">
          <Link to="/" onClick={closeMenu} aria-label="Assurance Ride home">
            <Brand />
          </Link>

          <button
            className="menu-btn"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            type="button"
          >
            ☰
          </button>

          <nav className={open ? "nav-links show" : "nav-links"}>
            <Link to="/" onClick={closeMenu}>Home</Link>
            <Link to="/services" onClick={closeMenu}>Services</Link>
            <Link to="/routes" onClick={closeMenu}>Routes</Link>
            <Link to="/about" onClick={closeMenu}>About</Link>
            <Link to="/drivers" onClick={closeMenu}>Become a Driver</Link>
            <Link to="/driver" onClick={closeMenu}>Driver Portal</Link>
            <Link to="/contact" onClick={closeMenu}>Contact</Link>
            <Link className="nav-book" to="/book" onClick={closeMenu}>
              Book a Ride
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;

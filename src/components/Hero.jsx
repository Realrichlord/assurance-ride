
const WHATSAPP = "2347050641933";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-grid">

        {/* LEFT SIDE */}
        <div className="hero-copy">

          <div className="eyebrow">
            <span className="pulse" />
            Available 24 hours • 7 days
          </div>

          <h1>
            Your private ride.
            <br />
            <span>Comfort on every trip.</span>
          </h1>

          <p className="hero-text">
            Move around Asaba, Onitsha, Awka, Enugu and beyond
            with a private car service built around comfort,
            safety and reliable pickup.
          </p>

          <div className="hero-actions">
            <a
              href="/book"
              className="btn btn-primary"
            >
              Book Your Private Ride →
            </a>

            <a
              href={`https://wa.me/${WHATSAPP}?text=Hello%20Assurance%20Ride%2C%20I%20want%20to%20book%20a%20private%20ride.`}
              className="btn btn-ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Us
            </a>
          </div>

          <div className="trust-row">
            <div>
              <strong>24/7</strong>
              <span>Service</span>
            </div>

            <div>
              <strong>Private</strong>
              <span>Rides</span>
            </div>

            <div>
              <strong>4+</strong>
              <span>Key routes</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hero-card-wrap">

          <div className="hero-card">

            <div className="card-top">
              <span className="live-dot" />
              <span>Ride availability</span>
              <strong>OPEN</strong>
            </div>

            <div className="route-visual">
              <div className="map-line" />

              <div className="map-dot dot-a" />
              <div className="map-dot dot-b" />
              <div className="map-dot dot-c" />

              <div className="route-label label-a">
                ASABA
              </div>

              <div className="route-label label-b">
                ONITSHA
              </div>

              <div className="route-label label-c">
                ENUGU
              </div>

              <div className="car-illustration">
                🚘
              </div>
            </div>

            <div className="card-bottom">
              <div>
                <small>Starting from</small>
                <strong>Request a quote</strong>
              </div>

              <a href="/book">
                ↗
              </a>
            </div>
          </div>

          <div className="floating-badge badge-one">
            ✓ Safe & private
          </div>

          <div className="floating-badge badge-two">
            ★ Trusted service
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
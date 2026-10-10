import Why from "../components/Why";
import Fleet from "../components/Fleet";

function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="section-kicker">ABOUT ASSURANCE RIDE</span>
          <h1>Comfort, safety and dependable private travel.</h1>
          <p>
            Assurance Ride connects customers with private car rides around
            Asaba, Onitsha, Awka, Enugu and beyond.
          </p>
        </div>
      </section>
      <Why />
      <Fleet />
      <section className="testimonial-section">
        <div className="container testimonial-wrap">
          <div>
            <span className="section-kicker">OUR PROMISE</span>
            <h2>Travel with peace of mind.</h2>
          </div>
          <div className="quote-card">
            <div className="stars">★★★★★</div>
            <blockquote>“Your comfort & safety is our priority.”</blockquote>
            <p>Assurance Ride</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;

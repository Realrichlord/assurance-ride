import Hero from "../components/Hero";
import Quick from "../components/Quick";
import Services from "../components/Services";
import Routes from "../components/Routes";
import Why from "../components/Why";
import Fleet from "../components/Fleet";
import FAQ from "../components/FAQ";

function Home() {
  return (
    <>
      <Hero />
      <Quick />
      <Services />
      <Routes />
      <Why />
      <Fleet />
      <section className="testimonial-section">
        <div className="container testimonial-wrap">
          <div>
            <span className="section-kicker">THE EXPERIENCE</span>
            <h2>Travel with peace of mind.</h2>
          </div>
          <div className="quote-card">
            <div className="stars">★★★★★</div>
            <blockquote>“Your comfort & safety is our priority.”</blockquote>
            <p>Assurance Ride</p>
          </div>
        </div>
      </section>
      <FAQ />
    </>
  );
}

export default Home;

import Services from "../components/Services";
import Fleet from "../components/Fleet";

function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="section-kicker">OUR SERVICES</span>
          <h1>Private travel built around your schedule.</h1>
          <p>
            City rides, intercity trips and flexible pickup for personal
            and business travel.
          </p>
        </div>
      </section>
      <Services />
      <Fleet />
    </>
  );
}

export default ServicesPage;

import Routes from "../components/Routes";

function RoutesPage() {
  return (
    <>
      <section className="page-hero page-hero-dark">
        <div className="container">
          <span className="section-kicker">SERVICE AREAS</span>
          <h1>Where are you going?</h1>
          <p>
            Choose a popular route or request another destination.
          </p>
        </div>
      </section>
      <Routes />
    </>
  );
}

export default RoutesPage;

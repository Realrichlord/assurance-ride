import DriverApply from "../components/DriverApply";

function Drivers() {
  return (
    <>
      <section className="page-hero page-hero-dark">
        <div className="container">
          <span className="section-kicker">DRIVER NETWORK</span>
          <h1>Drive with Assurance Ride.</h1>
          <p>
            Apply to join our growing network of private drivers.
            Applications are reviewed before approval.
          </p>
        </div>
      </section>
      <DriverApply />
    </>
  );
}

export default Drivers;

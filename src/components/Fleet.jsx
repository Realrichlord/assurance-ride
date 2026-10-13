function Fleet() {
  const fleetOptions = [
    {
      number: "01",
      title: "Personal trips",
      description:
        "Move around town without shared transport.",
    },
    {
      number: "02",
      title: "Business travel",
      description:
        "Plan transport for meetings and appointments.",
    },
    {
      number: "03",
      title: "Longer journeys",
      description:
        "Request intercity trips beyond the listed routes.",
    },
  ];

  return (
    <section className="vehicle-section">
      <div className="container">

        {/* Section heading */}
        <div className="section-heading">
          <div>
            <span className="section-kicker">
              PRIVATE TRAVEL
            </span>

            <h2>Ride in comfort.</h2>
          </div>

          <p>
            For everyday movement, appointments and
            intercity travel, request a private ride
            around your schedule.
          </p>
        </div>

        {/* Fleet content */}
        <div className="fleet-grid">

          {/* Main vehicle card */}
          <article className="fleet-card">

            <div className="fleet-art">
              <div className="road"></div>

              <div className="fleet-car">
                <span className="wheel wheel1"></span>
                <span className="wheel wheel2"></span>
              </div>
            </div>

            <div className="fleet-info">
              <span>PRIVATE VEHICLE</span>

              <h3>
                Comfortable city & intercity trips
              </h3>

              <p>
                Tell us your route, preferred time and
                number of passengers. Availability and
                fare are confirmed directly.
              </p>

              <a href="/book">
                Request this ride →
              </a>
            </div>
          </article>

          {/* Fleet options */}
          <div className="fleet-side">
            {fleetOptions.map((option) => (
              <div
                className="fleet-option"
                key={option.number}
              >
                <span>{option.number}</span>

                <strong>{option.title}</strong>

                <p>{option.description}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default Fleet;
function Routes() {
  const routes = [
    {
      number: "01",
      pickup: "Asaba",
      destination: "Onitsha",
    },
    {
      number: "02",
      pickup: "Asaba",
      destination: "Awka",
    },
    {
      number: "03",
      pickup: "Asaba",
      destination: "Enugu",
    },
    {
      number: "04",
      pickup: "",
      destination: "",
      other: true,
    },
  ];

  const selectRoute = (pickup, destination) => {
    const params = new URLSearchParams({
      pickup,
      dropoff: destination,
    });

    window.location.href = `/book?${params.toString()}`;
  };

  return (
    <section className="routes-section" id="routes">
      <div className="container">

        <div className="section-heading light">
          <div>
            <span className="section-kicker">
              POPULAR ROUTES
            </span>

            <h2>
              Where are you going?
            </h2>
          </div>

          <p>
            These are some of our advertised service areas.
            If your destination isn't listed, ask us.
          </p>
        </div>

        <div className="route-grid">
          {routes.map((route) => (
            <button
              className="route-card"
              key={route.number}
              type="button"
              onClick={() =>
                selectRoute(
                  route.pickup,
                  route.destination
                )
              }
            >
              <span className="route-top">
                <span>{route.number}</span>
                <i>↗</i>
              </span>

              <strong>
                {route.other
                  ? "Other destinations"
                  : `${route.pickup} → ${route.destination}`}
              </strong>

              <small>
                {route.other
                  ? "Ask for availability"
                  : "Private ride"}
              </small>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Routes;
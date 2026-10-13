function Quick() {
  const routes = [
    {
      pickup: "Asaba",
      destination: "Onitsha",
    },
    {
      pickup: "Asaba",
      destination: "Awka",
    },
    {
      pickup: "Asaba",
      destination: "Enugu",
    },
    {
      pickup: "Other",
      destination: "Other destination",
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
    <section className="instant-quote">
      <div className="container instant-quote-inner">

        <div className="instant-quote-copy">
          <span className="section-kicker">
            QUICK BOOKING
          </span>

          <h2>
            Know your route. Request your ride.
          </h2>

          <p>
            Select a popular route and jump straight
            to the booking form.
          </p>
        </div>

        <div className="quote-pills">
          {routes.map((route) => (
            <button
              key={`${route.pickup}-${route.destination}`}
              type="button"
              onClick={() =>
                selectRoute(
                  route.pickup,
                  route.destination
                )
              }
            >
              {route.pickup} → {route.destination}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Quick;
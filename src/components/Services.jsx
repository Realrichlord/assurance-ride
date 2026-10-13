function Services() {
  const services = [
    {
      number: "01",
      icon: "🚘",
      title: "Private City Rides",
      description:
        "Comfortable point-to-point transportation for personal and business trips.",
    },
    {
      number: "02",
      icon: "🛣️",
      title: "Intercity Trips",
      description:
        "Travel between Asaba, Onitsha, Awka, Enugu and other destinations.",
    },
    {
      number: "03",
      icon: "🕐",
      title: "24/7 Pickup",
      description:
        "Early morning, daytime or late-night travel — request your preferred time.",
    },
  ];

  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="section-kicker">WHAT WE DO</span>
            <h2>Ride your way.</h2>
          </div>

          <p>
            Whether you're heading to work, the airport, an event or another
            city, tell us where you're going and we'll help arrange your
            private ride.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <span className="service-number">
                {service.number}
              </span>

              <div className="service-icon">
                {service.icon}
              </div>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <a href="/book">
                Book this service →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
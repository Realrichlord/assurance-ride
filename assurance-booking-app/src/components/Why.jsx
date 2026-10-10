function Why() {
  const benefits = [
    [
      "01",
      "Private, not shared",
      "Your booking is for your ride — not a bus full of strangers.",
    ],
    [
      "02",
      "Book around your schedule",
      "Choose a pickup date and preferred time when making your request.",
    ],
    [
      "03",
      "Direct communication",
      "Confirm your trip by phone or WhatsApp before you travel.",
    ],
  ];

  return (
    <section className="section" id="why-us">
      <div className="container split-section">

        {/* LEFT — CONTENT */}
        <div className="why-copy">
          <span className="section-kicker">
            WHY ASSURANCE RIDE
          </span>

          <h2>
            Simple booking.
            <br />
            <span>Better travel.</span>
          </h2>

          <p>
            We focus on the things that matter when you're
            paying for a private ride: a clear pickup plan,
            a comfortable journey and easy communication.
          </p>

          <div className="benefit-list">
            {benefits.map(([number, title, description]) => (
              <div className="benefit-item" key={number}>
                <span className="benefit-number">
                  {number}
                </span>

                <div>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            className="text-link"
            href="/book"
          >
            Start a booking request →
          </a>
        </div>

        {/* RIGHT — FLYER */}
        <div className="photo-panel">
          <img
            src="/assurance-ride-flyer.png"
            alt="Assurance Ride promotional flyer"
          />

          <div className="photo-tag">
            ★ Your comfort & safety is our priority
          </div>
        </div>

      </div>
    </section>
  );
}

export default Why;
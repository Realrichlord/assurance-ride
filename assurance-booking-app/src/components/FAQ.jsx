const PHONE = "0705 064 1933";
const WHATSAPP = "2347050641933";

function FAQ() {
  const qs = [
    [
      "Do you offer rides 24/7?",
      "Yes. The service is advertised as 24-hour, 7-day availability. Send your preferred pickup time so availability can be confirmed.",
    ],
    [
      "Are the rides private?",
      "Yes. Assurance Ride is positioned as a private car ride service rather than shared public transport.",
    ],
    [
      "Can I travel outside the listed routes?",
      "Yes. Submit an Other Destination request. Availability and pricing can be confirmed directly.",
    ],
    [
      "How do I know the price?",
      "Prices are confirmed based on your requested route and trip details.",
    ],
    [
      "Can I schedule a ride in advance?",
      "Yes. Provide your preferred date and pickup time for confirmation.",
    ],
  ];

  return (
    <section className="faq-section section" id="faq">
      <div className="container faq-layout">

        <div>
          <span className="section-kicker">FAQ</span>

          <h2>
            Questions?
            <br />
            We've got you.
          </h2>

          <p>
            Still unsure? Call or WhatsApp and we'll help you plan the trip.
          </p>

          <div className="faq-actions">
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Chat on WhatsApp →
            </a>

            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              className="text-link"
            >
              Call {PHONE} →
            </a>
          </div>
        </div>

        <div className="faq-list">
          {qs.map(([question, answer], index) => (
            <details open={index === 0} key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FAQ;
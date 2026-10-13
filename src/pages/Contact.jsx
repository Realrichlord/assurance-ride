import FAQ from "../components/FAQ";

const PHONE = "0705 064 1933";
const WHATSAPP = "2347050641933";

function Contact() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="section-kicker">CONTACT</span>
          <h1>Let's plan your next ride.</h1>
          <p>
            Call or WhatsApp Assurance Ride for availability, pricing and
            trip questions.
          </p>

          <div className="page-hero-actions">
            <a className="btn btn-primary" href={`tel:+2347050641933`}>
              Call {PHONE}
            </a>
            <a
              className="btn btn-ghost"
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
      <FAQ />
    </>
  );
}

export default Contact;

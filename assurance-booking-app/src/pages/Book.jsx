import Booking from "../components/Booking";

function Book() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="section-kicker">BOOK A RIDE</span>
          <h1>Tell us where you're going.</h1>
          <p>
            Request a private ride and we'll confirm availability,
            pickup details and pricing with you.
          </p>
        </div>
      </section>
      <Booking />
    </>
  );
}

export default Book;

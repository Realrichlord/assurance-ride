import { useEffect, useState } from "react";

const GOOGLE_BOOKING_URL =
 "https://script.google.com/macros/s/AKfycbyRYX9l06urdTso0FT-nDTZHDtQ8IqOmUYdquzQBW_nvvWJbAItdiTv8OSdcLfWSIsK4Q/exec";

const PHONE = "0705 064 1933";
const WHATSAPP = "2347050641933";

function Booking() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState(null);

  const [route, setRoute] = useState({
    pickup: "",
    dropoff: "",
  });

  const [dateMin] = useState(
    () => new Date().toISOString().split("T")[0]
  );

  // ==================================================
  // REMOVE FOCUS AFTER SUCCESS SCREEN IS RENDERED
  // ==================================================

  useEffect(() => {
    if (submittedBooking) {
      requestAnimationFrame(() => {
        const activeElement = document.activeElement;

        if (activeElement instanceof HTMLElement) {
          activeElement.blur();
        }
      });
    }
  }, [submittedBooking]);

  // ==================================================
  // READ ROUTE FROM MULTI-PAGE BOOKING URL
  // ==================================================

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pickup = params.get("pickup") || "";
    const dropoff = params.get("dropoff") || "";

    if (pickup || dropoff) {
      setRoute({ pickup, dropoff });
    }
  }, []);

  // ==================================================
  // LISTEN FOR ROUTE EVENTS
  // ==================================================

  useEffect(() => {
    const handleRoute = (event) => {
      setRoute({
        pickup: event.detail?.pickup || "",
        dropoff: event.detail?.dropoff || "",
      });

      document.getElementById("booking")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    window.addEventListener("route", handleRoute);

    return () => {
      window.removeEventListener("route", handleRoute);
    };
  }, []);

  // ==================================================
  // SUBMIT BOOKING
  // ==================================================

  async function submit(event) {
    event.preventDefault();

    const form = event.currentTarget;

    // Remove focus immediately
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setLoading(true);
    setStatus("Sending your booking request...");

    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());

    // ==================================================
    // NIGERIAN PHONE VALIDATION
    // ==================================================

    const cleanPhone = String(values.phone || "").replace(/\s+/g, "");

    const nigeriaPhoneRegex =
      /^(?:\+234|0)(?:7|8|9)\d{9}$/;

    if (!nigeriaPhoneRegex.test(cleanPhone)) {
      setStatus(
        "Please enter a valid Nigerian phone number, e.g. 0705 064 1933."
      );

      setLoading(false);

      requestAnimationFrame(() => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      });

      return;
    }

    // ==================================================
    // FORMAT DATE
    // ==================================================

    const date = values.date
      ? new Date(`${values.date}T00:00:00`).toLocaleDateString(
          "en-NG",
          {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        )
      : "Not specified";

    // ==================================================
    // CREATE BOOKING REFERENCE
    // ==================================================

    const bookingId =
      "AR-" + Date.now().toString(36).toUpperCase();

    // ==================================================
    // BOOKING DATA FOR GOOGLE SHEETS
    // ==================================================

    const booking = {
      bookingId,
      customer: values.name || "",
      phone: values.phone || "",
      pickup: values.pickup || "",
      destination: values.dropoff || "",
      rideDate: date,
      rideTime: values.time || "",
      passengers: values.passengers || "",
      tripType: values.tripType || "",
      notes: values.note || "",
    };

    // ==================================================
    // WHATSAPP MESSAGE
    // ==================================================

    const message = `Hello Assurance Ride,

I want to book a private ride.

Booking Reference: ${bookingId}

Name: ${values.name}

Phone: ${values.phone}

Pickup: ${values.pickup}

Destination: ${values.dropoff}

Date: ${date}

Pickup time: ${values.time}

Passengers: ${values.passengers}

Trip type: ${values.tripType}

Extra information: ${values.note || "None"}

Please confirm availability and the price.

Thank you.`;

    const whatsappUrl =
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

    // ==================================================
    // OPEN WHATSAPP
    // ==================================================

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );

    try {
      // ==================================================
      // SEND DATA TO GOOGLE APPS SCRIPT
      // ==================================================

      await fetch(GOOGLE_BOOKING_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(booking),
      });

      // ==================================================
      // REMOVE FOCUS
      // ==================================================

      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      // ==================================================
      // SHOW SUCCESS SCREEN
      // ==================================================

      setSubmittedBooking(booking);
      setStatus("");

      form.reset();

      setRoute({
        pickup: "",
        dropoff: "",
      });
    } catch (error) {
      console.error("Booking submission error:", error);

      setStatus(
        "WhatsApp is open. Please send the message there to confirm your request."
      );
    } finally {
      setLoading(false);

      // Final cleanup
      requestAnimationFrame(() => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      });
    }
  }

  // ==================================================
  // SUCCESS / CONFIRMATION SCREEN
  // ==================================================

  if (submittedBooking) {
    return (
      <section
        className="booking-section"
        id="booking"
      >
        <div className="container booking-wrap">
          <div className="booking-success">

            <div className="success-icon">
              ✓
            </div>

            <span className="section-kicker">
              REQUEST RECEIVED
            </span>

            <h2>
              Thank you, {submittedBooking.customer}.
            </h2>

            <p className="success-intro">
              Your Assurance Ride request has been
              submitted. Please continue on WhatsApp
              so we can confirm availability and your
              fare.
            </p>

            <div className="booking-reference">
              <span>Booking reference</span>

              <strong>
                {submittedBooking.bookingId}
              </strong>
            </div>

            <div className="trip-summary">

              <div className="trip-item">
                <span>From</span>

                <strong>
                  {submittedBooking.pickup}
                </strong>
              </div>

              <div className="trip-item">
                <span>To</span>

                <strong>
                  {submittedBooking.destination}
                </strong>
              </div>

              <div className="trip-item">
                <span>Date</span>

                <strong>
                  {submittedBooking.rideDate}
                </strong>
              </div>

              <div className="trip-item">
                <span>Time</span>

                <strong>
                  {submittedBooking.rideTime}
                </strong>
              </div>

              <div className="trip-item">
                <span>Passengers</span>

                <strong>
                  {submittedBooking.passengers}
                </strong>
              </div>

              <div className="trip-item">
                <span>Trip type</span>

                <strong>
                  {submittedBooking.tripType}
                </strong>
              </div>

            </div>

            <a
              className="btn btn-primary"
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              onMouseDown={(event) => {
                event.currentTarget.blur();
              }}
            >
              Continue on WhatsApp →
            </a>

            <button
              type="button"
              className="booking-new"
              onClick={(event) => {
                event.currentTarget.blur();

                setSubmittedBooking(null);
                setStatus("");

                requestAnimationFrame(() => {
                  document
                    .querySelector(".booking-form input")
                    ?.focus();
                });
              }}
            >
              Make another booking
            </button>

            <p className="success-note">
              Keep your booking reference for
              communication with Assurance Ride.
            </p>

          </div>
        </div>
      </section>
    );
  }

  // ==================================================
  // BOOKING FORM
  // ==================================================

  return (
    <section
      className="booking-section"
      id="booking"
    >
      <div className="container booking-wrap">

        {/* LEFT SIDE */}

        <div className="booking-intro">

          <span className="section-kicker">
            BOOK A RIDE
          </span>

          <h2>
            Tell us your trip.
          </h2>

          <p>
            Fill in your details. Your booking request
            is submitted and WhatsApp opens for
            confirmation.
          </p>

          <div className="booking-contact">

            <a href="tel:+2347050641933">
              <span>☎</span>

              <div>
                <small>Call us</small>

                <strong>
                  {PHONE}
                </strong>
              </div>
            </a>

            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>WA</span>

              <div>
                <small>WhatsApp</small>

                <strong>
                  {PHONE}
                </strong>
              </div>
            </a>

          </div>
        </div>

        {/* FORM */}

        <form
          className="booking-form"
          onSubmit={submit}
        >

          <div className="form-head">
            <strong>
              Ride request
            </strong>

            <span>
              Secure • Quick • WhatsApp
            </span>
          </div>

          <div className="form-grid">

            {/* NAME */}

            <label>
              Full name

              <input
                name="name"
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </label>

            {/* PHONE */}

            <label>
              Phone number

              <input
                name="phone"
                type="tel"
                placeholder="0705 064 1933"
                autoComplete="tel"
                inputMode="tel"
                required
              />
            </label>

            {/* PICKUP */}

            <label>
              Pickup location

              <input
                name="pickup"
                value={route.pickup}
                onChange={(event) =>
                  setRoute((current) => ({
                    ...current,
                    pickup: event.target.value,
                  }))
                }
                placeholder="e.g. Asaba"
                required
              />
            </label>

            {/* DESTINATION */}

            <label>
              Destination

              <input
                name="dropoff"
                value={route.dropoff}
                onChange={(event) =>
                  setRoute((current) => ({
                    ...current,
                    dropoff: event.target.value,
                  }))
                }
                placeholder="e.g. Enugu"
                required
              />
            </label>

            {/* DATE */}

            <label>
              Date

              <input
                name="date"
                type="date"
                min={dateMin}
                required
              />
            </label>

            {/* TIME */}

            <label>
              Pickup time

              <input
                name="time"
                type="time"
                required
              />
            </label>

            {/* PASSENGERS */}

            <label>
              Passengers

              <select name="passengers">
                <option>1 passenger</option>
                <option>2 passengers</option>
                <option>3 passengers</option>
                <option>4 passengers</option>
                <option>5+ passengers</option>
              </select>
            </label>

            {/* TRIP TYPE */}

            <label>
              Trip type

              <select name="tripType">
                <option>One way</option>
                <option>Round trip</option>
                <option>Airport transfer</option>
                <option>Business trip</option>
              </select>
            </label>

          </div>

          {/* NOTES */}

          <label>
            Extra information (optional)

            <textarea
              name="note"
              rows="3"
              placeholder="Pickup landmark, flight time, special request..."
            />
          </label>

          {/* CONSENT */}

          <label className="consent">

            <input
              type="checkbox"
              required
            />

            <span>
              I confirm these trip details are
              correct.
            </span>

          </label>

          {/* BOTTOM */}

          <div className="form-bottom">

            <p>
              Your details are used only to respond
              to this ride request.
            </p>

            <button
              className="btn btn-primary"
              disabled={loading}
              type="submit"
              onMouseDown={(event) => {
                event.currentTarget.blur();
              }}
            >
              {loading
                ? "Sending..."
                : "Continue on WhatsApp →"}
            </button>

          </div>

          {/* STATUS */}

          <div
            className="form-message"
            role="status"
            aria-live="polite"
          >
            {status}
          </div>

        </form>
      </div>
    </section>
  );
}

export default Booking;
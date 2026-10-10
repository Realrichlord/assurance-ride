import { useState } from "react";

const GOOGLE_BOOKING_URL =
  "https://script.google.com/macros/s/AKfycbyRYX9l06urdTso0FT-nDTZHDtQ8IqOmUYdquzQBW_nvvWJbAItdiTv8OSdcLfWSIsK4Q/exec";

const WHATSAPP = "2347050641933";

function DriverApply() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function submit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const values = Object.fromEntries(
      new FormData(form).entries()
    );

    const phone = String(values.phone || "").replace(/\s+/g, "");

    const nigeriaPhoneRegex =
      /^(?:\+234|0)(?:7|8|9)\d{9}$/;

    if (!nigeriaPhoneRegex.test(phone)) {
      setStatus(
        "Please enter a valid Nigerian phone number, e.g. 0705 064 1933."
      );
      return;
    }

    setLoading(true);
    setStatus("Submitting your driver application...");

    const applicationId =
      `DRV-${Date.now().toString(36).toUpperCase()}`;

    const application = {
      mode: "driver_application",
      applicationId,
      name: values.name || "",
      phone: values.phone || "",
      email: values.email || "",
      city: values.city || "",
      serviceAreas: values.serviceAreas || "",
      vehicle: values.vehicle || "",
      vehicleYear: values.vehicleYear || "",
      plateNumber: values.plateNumber || "",
      tripTypes: values.tripTypes || "",
      availability: values.availability || "",
      notes: values.notes || "",
    };

    const whatsappMessage = `Hello Assurance Ride,

I have submitted a driver application.

Application ID: ${applicationId}

Name: ${application.name}
Phone: ${application.phone}
City: ${application.city}
Vehicle: ${application.vehicle}
Plate Number: ${application.plateNumber}

Please let me know the next steps.`;

    try {
      await fetch(GOOGLE_BOOKING_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(application),
      });

      setSubmitted(true);
      setStatus("");
      form.reset();

      window.open(
        `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
          whatsappMessage
        )}`,
        "_blank",
        "noopener,noreferrer"
      );
    } catch (error) {
      console.error(
        "Driver application error:",
        error
      );

      setStatus(
        "Your application could not be submitted. Please contact Assurance Ride on WhatsApp."
      );
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section
        className="driver-section"
        id="drivers"
      >
        <div className="container driver-success">

          <span className="success-icon">
            ✓
          </span>

          <span className="section-kicker">
            APPLICATION RECEIVED
          </span>

          <h2>
            Thank you for your interest.
          </h2>

          <p>
            Your driver application has been
            submitted for review. We will contact
            you if your profile is suitable for the
            Assurance Ride network.
          </p>

          <button
            className="btn btn-primary"
            type="button"
            onClick={() => setSubmitted(false)}
          >
            Submit another application
          </button>

        </div>
      </section>
    );
  }

  return (
    <section
      className="driver-section"
      id="drivers"
    >
      <div className="container driver-grid">

        <div className="driver-copy">

          <span className="section-kicker">
            ASSURANCE RIDE DRIVER NETWORK
          </span>

          <h2>
            Drive with Assurance Ride.
          </h2>

          <p>
            We are building a trusted network of
            private drivers for customers who need
            safe, dependable transportation across
            Asaba, Onitsha, Awka, Enugu and other
            destinations.
          </p>

          <div className="driver-points">

            <div>
              <strong>01</strong>
              <span>Apply online</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Your details are reviewed</span>
            </div>

            <div>
              <strong>03</strong>
              <span>
                Approved drivers can receive trip
                assignments
              </span>
            </div>

          </div>

          <p className="driver-note">
            Driver applications are reviewed before
            a driver is added to the network.
            Customer-facing driver contact details
            are not published on this page.
          </p>

        </div>

        <form
          className="driver-form"
          onSubmit={submit}
        >

          <div className="form-head">
            <strong>
              Driver application
            </strong>

            <span>
              Free to apply
            </span>
          </div>

          <div className="form-grid">

            <label>
              Full name
              <input
                name="name"
                required
                placeholder="Your full name"
              />
            </label>

            <label>
              Phone / WhatsApp
              <input
                name="phone"
                required
                inputMode="tel"
                placeholder="0705 064 1933"
              />
            </label>

            <label>
              Email
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
              />
            </label>

            <label>
              Base city
              <input
                name="city"
                required
                placeholder="e.g. Asaba"
              />
            </label>

            <label>
              Service areas / routes
              <input
                name="serviceAreas"
                required
                placeholder="Asaba, Onitsha, Awka, Enugu"
              />
            </label>

            <label>
              Vehicle
              <input
                name="vehicle"
                required
                placeholder="e.g. Toyota Camry"
              />
            </label>

            <label>
              Vehicle year
              <input
                name="vehicleYear"
                inputMode="numeric"
                placeholder="e.g. 2020"
              />
            </label>

            <label>
              Plate number
              <input
                name="plateNumber"
                required
                placeholder="e.g. ABC-123XY"
              />
            </label>

            <label>
              Trip types
              <select
                name="tripTypes"
                defaultValue="Private rides"
              >
                <option>
                  Private rides
                </option>

                <option>
                  Airport transfers
                </option>

                <option>
                  Business trips
                </option>

                <option>
                  Long distance trips
                </option>

                <option>
                  All of the above
                </option>
              </select>
            </label>

            <label>
              Availability
              <select
                name="availability"
                defaultValue="Flexible"
              >
                <option>
                  Flexible
                </option>

                <option>
                  Weekdays
                </option>

                <option>
                  Weekends
                </option>

                <option>
                  Evenings
                </option>

                <option>
                  By arrangement
                </option>
              </select>
            </label>

          </div>

          <label>
            Additional information

            <textarea
              name="notes"
              rows="4"
              placeholder="Tell us anything useful about your driving experience, routes or availability."
            />
          </label>

          <label className="consent">

            <input
              type="checkbox"
              required
            />

            <span>
              I confirm that the information I
              provided is accurate.
            </span>

          </label>

          <div className="form-bottom">

            <p>
              Applications are reviewed before
              approval.
            </p>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : "Apply as a Driver →"}
            </button>

          </div>

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

export default DriverApply;
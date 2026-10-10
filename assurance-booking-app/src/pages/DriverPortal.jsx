import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./DriverPortal.css";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyRYX9l06urdTso0FT-nDTZHDtQ8IqOmUYdquzQBW_nvvWJbAItdiTv8OSdcLfWSIsK4Q/exec";
const SESSION_KEY = "assuranceRideDriverSession";
function jsonp(url) {
  return new Promise((resolve, reject) => {
    const callback = `arDriverCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const timer = window.setTimeout(() => { cleanup(); reject(new Error("Driver service timed out. Check the Apps Script deployment and connection.")); }, 15000);
    function cleanup() { window.clearTimeout(timer); delete window[callback]; script.remove(); }
    window[callback] = (data) => { cleanup(); data?.success ? resolve(data) : reject(new Error(data?.error || "Unable to load driver account.")); };
    script.onerror = () => { cleanup(); reject(new Error("Could not connect to the driver service.")); };
    script.src = `${url}${url.includes("?") ? "&" : "?"}callback=${callback}&_=${Date.now()}`;
    document.body.appendChild(script);
  });
}
function loadDriver(creds) {
  const query = new URLSearchParams({ action: "driverData", applicationId: creds.applicationId, phone: creds.phone });
  return jsonp(`${SCRIPT_URL}?${query}`);
}
async function postAction(creds, action, extra = {}) {
  await fetch(SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ mode: "driver_portal_action", applicationId: creds.applicationId, phone: creds.phone, action, ...extra }) });
  await new Promise((resolve) => window.setTimeout(resolve, 1100));
  const refreshed = await loadDriver(creds);
  if (action === "Available" || action === "Offline") {
    if (String(refreshed.driver?.availability || "").toLowerCase() !== action.toLowerCase()) throw new Error("The availability change was not saved. Refresh and try again.");
  } else {
    const updatedTrip = (refreshed.trips || []).find(t => String(t["Booking ID"]) === String(extra.bookingId));
    if (!updatedTrip || String(updatedTrip.Status || "").toLowerCase() !== action.toLowerCase()) throw new Error("The trip update was not saved. The owner may have changed its status; refresh and check again.");
  }
  return refreshed;
}
const norm = (s) => String(s || "Pending").trim().toLowerCase();
const statusClass = (s) => `dp-status dp-${norm(s).replaceAll(" ", "-")}`;
function formatDate(value) { if (!value) return "—"; const date = new Date(value); return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString(); }

export default function DriverPortal() {
  const [credentials, setCredentials] = useState(() => { try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null"); } catch { return null; } });
  const [applicationId, setApplicationId] = useState("");
  const [phone, setPhone] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [notes, setNotes] = useState("");
  const loadData = useCallback(async (creds) => {
    if (!creds) return;
    setLoading(true); setError("");
    try { const result = await loadDriver(creds); setData(result); setCredentials(creds); sessionStorage.setItem(SESSION_KEY, JSON.stringify(creds)); }
    catch (e) { setError(e.message || "Could not load your driver account."); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { if (credentials) loadData(credentials); }, []);
  const activeTrip = useMemo(() => (data?.trips || []).find(t => ["assigned", "accepted", "en route", "picked up"].includes(norm(t.Status))), [data]);
  const history = useMemo(() => (data?.trips || []).filter(t => ["completed", "cancelled", "declined"].includes(norm(t.Status))), [data]);
  async function login(e) {
    e.preventDefault(); const creds = { applicationId: applicationId.trim(), phone: phone.trim() };
    if (!creds.applicationId || !creds.phone) return;
    setLoading(true); setError(""); setNotice("");
    try { const result = await loadDriver(creds); setCredentials(creds); setData(result); sessionStorage.setItem(SESSION_KEY, JSON.stringify(creds)); setNotice(`Welcome${result.driver?.name ? `, ${result.driver.name}` : ""}.`); }
    catch (err) { setError(err.message || "Sign-in failed. Check your details and approval status."); }
    finally { setLoading(false); }
  }
  async function action(name, extra = {}) {
    if (!credentials) return; setBusy(name); setError(""); setNotice("");
    try { const payload = (name === "Available" || name === "Offline") ? extra : { ...extra, bookingId: activeTrip?.["Booking ID"] }; const result = await postAction(credentials, name, payload); setData(result); setNotice(({ Available:"You are now available.", Offline:"You are now offline.", Accepted:"Trip accepted.", Declined:"Trip declined and released.", "En Route":"Trip marked en route.", "Picked Up":"Passenger pickup recorded.", Completed:"Trip completed. You are available for the next trip." })[name] || "Update saved."); if (name === "Completed") setNotes(""); }
    catch (err) { setError(err.message || "Update could not be confirmed. Refresh and check the current status."); await loadData(credentials); }
    finally { setBusy(""); }
  }
  function logout() { sessionStorage.removeItem(SESSION_KEY); setCredentials(null); setData(null); setApplicationId(""); setPhone(""); setError(""); setNotice(""); }

  if (!credentials || (!data && !loading && error)) return <main className="dp-login-wrap"><section className="dp-login"><Link to="/" className="dp-back">← Assurance Ride home</Link><div className="dp-mark">AR</div><p className="dp-eyebrow">DRIVER NETWORK</p><h1>Driver Portal</h1><p className="dp-muted">Sign in with your Application ID and registered phone number. Only approved drivers can access trips.</p><form onSubmit={login} className="dp-form"><label>Driver Application ID<input value={applicationId} onChange={e=>setApplicationId(e.target.value)} placeholder="e.g. DRV-123456789" autoComplete="username" required /></label><label>Registered phone number<input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="e.g. 0705 064 1933" inputMode="tel" autoComplete="tel" required /></label>{error && <p className="dp-alert dp-error" role="alert">{error}</p>}<button className="dp-primary" disabled={loading}>{loading ? "Checking account…" : "Sign in"}</button></form><p className="dp-help">If you cannot access your account, contact the Assurance Ride owner.</p></section></main>;

  return <main className="dp-app"><header className="dp-top"><Link to="/" className="dp-logo"><span>AR</span><strong>ASSURANCE RIDE<small>DRIVER PORTAL</small></strong></Link><div className="dp-top-buttons"><button onClick={()=>loadData(credentials)} disabled={loading}>↻ Refresh</button><button onClick={logout}>Sign out</button></div></header><div className="dp-content">
    <section className="dp-welcome"><div><p className="dp-eyebrow">YOUR OPERATIONS</p><h1>Hello, {data?.driver?.name || "Driver"}</h1><p className="dp-muted">Manage availability and keep trip progress up to date.</p></div><span className={statusClass(data?.driver?.availability)}>{data?.driver?.availability || "Offline"}</span></section>
    {error && <p className="dp-alert dp-error" role="alert">{error}</p>}{notice && <p className="dp-alert dp-success" role="status">{notice}</p>}
    <section className="dp-stats"><article><span>Driver ID</span><strong>{data?.driver?.applicationId || "—"}</strong></article><article><span>Closed trips</span><strong>{history.length}</strong></article><article><span>Completed trips</span><strong>{history.filter(t=>norm(t.Status)==="completed").length}</strong></article></section>
    <section className="dp-panel"><div className="dp-panel-title"><div><p className="dp-eyebrow">AVAILABILITY</p><h2>Ready for your next trip?</h2></div><p className="dp-muted">Availability is locked during an active trip.</p></div><div className="dp-actions"><button className="dp-primary" onClick={()=>action("Available")} disabled={!!activeTrip || !!busy || norm(data?.driver?.availability)==="available"}>Set Available</button><button className="dp-secondary" onClick={()=>action("Offline")} disabled={!!activeTrip || !!busy || norm(data?.driver?.availability)==="offline"}>Go Offline</button></div></section>
    <section className="dp-panel"><div className="dp-panel-title"><div><p className="dp-eyebrow">CURRENT ASSIGNMENT</p><h2>Active Trip</h2></div></div>{!activeTrip ? <div className="dp-empty"><span>✓</span><strong>No active trip</strong><p className="dp-muted">When the owner assigns a trip to you, its details appear here.</p></div> : <div className="dp-trip"><div className="dp-trip-head"><div><small>{activeTrip["Booking ID"]}</small><h3>{activeTrip.Customer || "Customer"}</h3></div><span className={statusClass(activeTrip.Status)}>{activeTrip.Status}</span></div><div className="dp-route-grid"><div><span>Pickup</span><strong>{activeTrip.Pickup || "—"}</strong></div><div><span>Destination</span><strong>{activeTrip.Destination || "—"}</strong></div><div><span>Date / time</span><strong>{[activeTrip["Ride Date"],activeTrip["Ride Time"]].filter(Boolean).join(" · ") || "—"}</strong></div><div><span>Passengers / trip type</span><strong>{[activeTrip.Passengers,activeTrip["Trip Type"]].filter(Boolean).join(" · ") || "—"}</strong></div><div><span>Customer phone</span><strong>{activeTrip.Phone || "—"}</strong></div><div><span>Assigned at</span><strong>{formatDate(activeTrip["Assigned At"])}</strong></div></div>{norm(activeTrip.Status)==="assigned" && <div className="dp-actions"><button className="dp-primary" disabled={!!busy} onClick={()=>action("Accepted")}>{busy==="Accepted"?"Saving…":"Accept Trip"}</button><button className="dp-danger" disabled={!!busy} onClick={()=>action("Declined")}>Decline</button></div>}{norm(activeTrip.Status)==="accepted" && <button className="dp-primary" disabled={!!busy} onClick={()=>action("En Route")}>Mark En Route</button>}{norm(activeTrip.Status)==="en route" && <button className="dp-primary" disabled={!!busy} onClick={()=>action("Picked Up")}>Passenger Picked Up</button>}{norm(activeTrip.Status)==="picked up" && <div className="dp-complete"><label>Completion note (optional)<textarea rows="3" value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Add trip completion notes…" /></label><button className="dp-primary" disabled={!!busy} onClick={()=>action("Completed",{notes})}>{busy==="Completed"?"Completing…":"Complete Trip"}</button></div>}<p className="dp-footnote">Only update a status after that step has actually happened. Contact the owner if any details look incorrect.</p></div>}</section>
    <section className="dp-panel"><div className="dp-panel-title"><div><p className="dp-eyebrow">PAST ASSIGNMENTS</p><h2>Trip History</h2></div></div>{!history.length ? <div className="dp-empty"><strong>No closed trips yet</strong><p className="dp-muted">Your completed and closed trips will appear here.</p></div> : <div className="dp-history">{history.slice().reverse().map(t=><article key={t["Booking ID"]}><div><strong>{t["Booking ID"]}</strong><p>{t.Pickup || "—"} → {t.Destination || "—"}</p><small>{formatDate(t["Completed At"] || t["Cancelled At"] || t["Assigned At"])}</small></div><span className={statusClass(t.Status)}>{t.Status}</span></article>)}</div>}</section><footer className="dp-footer">Assurance Ride · Private rides, handled with care.</footer>
  </div></main>;
}

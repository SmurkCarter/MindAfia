import { useState, useEffect } from "react";
import api from "../../services/api";

const BookAppointment = () => {

  const [clinicians, setClinicians] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  const [selectedClinician, setSelectedClinician] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);

  const [appointmentType, setAppointmentType] = useState("Online");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("idle");

  /* =========================
     LOAD CLINICIANS
  ========================= */

  useEffect(() => {
    fetchClinicians();
  }, []);

  const fetchClinicians = async () => {
    try {
      const res = await api.get("appointments/clinicians/");
      setClinicians(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* =========================
     LOAD SLOTS
  ========================= */

  useEffect(() => {
    if (selectedClinician && selectedDate) {
      fetchSlots();
    }
  }, [selectedClinician, selectedDate]);

  const fetchSlots = async () => {
    try {

      const res = await api.get(
        `appointments/slots/${selectedClinician.id}/?date=${selectedDate}`
      );

      setAvailableTimes(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  /* =========================
     BOOK APPOINTMENT
  ========================= */

 const handleBooking = async () => {

  if (!selectedClinician || !selectedDate || !selectedTime) {
    alert("Please complete all required fields.");
    return;
  }

  try {

    console.log("Booking payload:", {
      doctor: selectedClinician.id,
      availability: selectedTime.id,
      scheduled_date: selectedDate
    });

    await api.post("appointments/book/", {
      doctor: selectedClinician.id,
      availability: selectedTime.id,
      scheduled_date: selectedDate,
      appointment_type: appointmentType,
      reason: notes
    });

    setStatus("success");

  } catch (err) {
    console.error(err);
    alert("Booking failed");
  }
};

  /* =========================
     SUCCESS PAGE
  ========================= */

  if (status === "success") {
    return (
      <div className="appointment-success">
        <div className="success-card">
          <div className="success-check">✓</div>

          <h2>Appointment Confirmed</h2>

          <p>
            You have booked with <strong>{selectedClinician.name}</strong>
          </p>

          <p>
            {selectedDate} at {selectedTime?.scheduled_time}
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="appointment-container">

      <h1>Book an Appointment</h1>

      <div className="appointment-grid">

        {/* LEFT SIDE */}
        <div className="appointment-left">

          {/* CLINICIANS */}
          <div className="card">

            <h3>Select Clinician</h3>

            <div className="clinician-list">

              {clinicians.map((doc) => (

                <div
                  key={doc.id}
                  className={`clinician-card ${
                    selectedClinician?.id === doc.id ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSelectedClinician(doc);
                    setSelectedTime(null);
                    setAvailableTimes([]);
                  }}
                >

                  <div className="avatar"></div>

                  <div>
                    <strong>{doc.name}</strong>
                    <p>{doc.specialization}</p>

                    <span className="status available">
                      Available
                    </span>
                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* DATE */}
          <div className="card">

            <h3>Select Date</h3>

            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-input"
            />

          </div>

          {/* TIME */}
          <div className="card">
            <h3>Select Time</h3>
            <div className="time-grid">
              {availableTimes.length === 0 && (
                <p style={{color:"#888"}}>No slots available</p>
                )}
                {availableTimes.map((slot) => (
                  <button
                  key={slot.id}
                  className={`time-slot ${
                    selectedTime?.id === slot.id ? "active" : ""
                  }`}
                  onClick={() => {
                    console.log("Selected slot:", slot);
                    setSelectedTime(slot);
                  }}
                  >
                    {slot.scheduled_time || slot.time}
                  </button>
                ))}
            </div>
          </div>

          {/* TYPE */}
          <div className="card">

            <h3>Appointment Type</h3>

            <select
              value={appointmentType}
              onChange={(e) => setAppointmentType(e.target.value)}
              className="select-input"
            >
              <option>Online</option>
              <option>In Clinic</option>
            </select>

          </div>

          {/* NOTES */}
          <div className="card">

            <h3>Notes</h3>

            <textarea
              placeholder="Optional message to clinician..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="textarea-input"
            />

          </div>

          <button className="book-btn" onClick={handleBooking}>
            Confirm Appointment
          </button>

        </div>

        {/* SUMMARY */}

        <div className="appointment-summary card">

          <h3>Booking Summary</h3>

          <p><strong>Clinician:</strong> {selectedClinician?.name || "-"}</p>
          <p><strong>Date:</strong> {selectedDate || "-"}</p>
          <p><strong>Time:</strong> {selectedTime?.scheduled_time || "-"}</p>
          <p><strong>Type:</strong> {appointmentType}</p>

        </div>

      </div>

    </div>
  );
};

export default BookAppointment;
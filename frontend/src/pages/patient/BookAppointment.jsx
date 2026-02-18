import { useState } from "react";

const clinicians = [
  {
    id: 1,
    name: "Dr. Sarah Kim",
    specialty: "Psychiatrist",
    available: true,
  },
  {
    id: 2,
    name: "Dr. Michael Lee",
    specialty: "Clinical Psychologist",
    available: true,
  },
  {
    id: 3,
    name: "Dr. Emma Brown",
    specialty: "Therapist",
    available: false,
  },
];

const availableTimes = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
];

const BookAppointment = () => {
  const [selectedClinician, setSelectedClinician] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointmentType, setAppointmentType] = useState("Online");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("idle"); // idle | success

  const handleBooking = () => {
    if (!selectedClinician || !selectedDate || !selectedTime) {
      alert("Please complete all required fields.");
      return;
    }

    setStatus("success");
  };

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
            {selectedDate} at {selectedTime}
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

          {/* Clinician Selection */}
          <div className="card">
            <h3>Select Clinician</h3>
            <div className="clinician-list">
              {clinicians.map((doc) => (
                <div
                  key={doc.id}
                  className={`clinician-card ${
                    selectedClinician?.id === doc.id ? "selected" : ""
                  } ${!doc.available ? "disabled" : ""}`}
                  onClick={() => doc.available && setSelectedClinician(doc)}
                >
                  <div className="avatar"></div>
                  <div>
                    <strong>{doc.name}</strong>
                    <p>{doc.specialty}</p>
                    <span
                      className={`status ${
                        doc.available ? "available" : "unavailable"
                      }`}
                    >
                      {doc.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Date */}
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

          {/* Time Slots */}
          <div className="card">
            <h3>Select Time</h3>
            <div className="time-grid">
              {availableTimes.map((time, index) => (
                <button
                  key={index}
                  className={`time-slot ${
                    selectedTime === time ? "active" : ""
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Appointment Type */}
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

          {/* Notes */}
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

        {/* RIGHT SIDE SUMMARY */}
        <div className="appointment-summary card">
          <h3>Booking Summary</h3>

          <p><strong>Clinician:</strong> {selectedClinician?.name || "-"}</p>
          <p><strong>Date:</strong> {selectedDate || "-"}</p>
          <p><strong>Time:</strong> {selectedTime || "-"}</p>
          <p><strong>Type:</strong> {appointmentType}</p>
        </div>

      </div>
    </div>
  );
};

export default BookAppointment;

import { useEffect, useState } from "react";
import api from "../../services/api";
import Chat from "./chat";

const ChatSession = () => {

  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {

    const loadAppointments = async () => {

      try {

        const res = await api.get("appointments/");

        setAppointments(res.data);

        if (res.data.length > 0) {
          setSelectedAppointment(res.data[0].id);
        }

      } catch (err) {

        console.error("Failed to load appointments", err);

      }

    };

    loadAppointments();

  }, []);


  return (

    <div>

      <h2>Select Appointment</h2>

      <select
        onChange={(e) => setSelectedAppointment(e.target.value)}
      >

        {appointments.map((appt) => (

          <option key={appt.id} value={appt.id}>

            {appt.scheduled_date} - Dr {appt.doctor_name}

          </option>

        ))}

      </select>

      {selectedAppointment && (
        <Chat appointmentId={selectedAppointment} />
      )}

    </div>

  );

};

export default ChatSession;
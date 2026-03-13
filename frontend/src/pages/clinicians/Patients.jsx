import { useEffect, useState } from "react";
import api from "../../services/api";

const Patients = () => {

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {

    try {

      const res = await api.get("patients/");
      setPatients(res.data);

    } catch (err) {
      console.error(err);
    }

  };

  return (

    <div className="dashboard-card">

      <h2>My Patients</h2>

      <table className="modern-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>

          {patients.map(p => (

            <tr key={p.id}>
              <td>{p.user.username}</td>
              <td>{p.user.email}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
};

export default Patients;
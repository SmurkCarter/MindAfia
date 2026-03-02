import api from "./api";

// Login
export const loginUser = async (credentials) => {
  const response = await api.post("auth/token/", credentials);

  const { access, refresh } = response.data;

  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);

  return response.data;
};

// Register Patient
export const registerPatient = (data) =>
  api.post("auth/register/patient/", data);

// Register Doctor
export const registerDoctor = (data) =>
  api.post("auth/register/doctor/", data);

// Logout
export const logoutUser = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};
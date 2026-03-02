import Navbar from "./Navbar";
import { useAuth } from "../../context/AuthContext";

const PageLayout = ({ children }) => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      <main
        style={{
          padding: "1.5rem",
          minHeight: "100vh",
          backgroundColor: user?.is_clinician ? "#f5f7fa" : "#ffffff",
        }}
      >
        {children}
      </main>
    </>
  );
};

export default PageLayout;
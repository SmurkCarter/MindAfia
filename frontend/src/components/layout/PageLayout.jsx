import Navbar from "./Navbar";

const PageLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ padding: "1.5rem" }}>{children}</main>
    </>
  );
};

export default PageLayout;

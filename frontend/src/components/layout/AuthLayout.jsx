const AuthLayout = ({ children }) => {
  return (
    <div className="auth-page">
      <div className="auth-overlay">
        <div className="auth-card fade-in">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

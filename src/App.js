import React, { useState } from "react";
import StudentTable from "./components/StudentTable";
import Login from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <div>
      {authenticated ? (
        <StudentTable onLogout={handleLogout} />
      ) : (
        <Login onLogin={setAuthenticated} />
      )}
    </div>
  );
}

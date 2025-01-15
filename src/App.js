import React, { useContext } from "react";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext"; // Ensure to import AuthContext

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/* If user exists, navigate to Home, otherwise go to Register */}
        <Route path="/" element={user ? <Home /> : <Register />} />

        {/* Navigate to Home if user exists, otherwise display Login */}
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

        {/* Navigate to Home if user exists, otherwise display Register */}
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />

        {/* Profile page */}
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;

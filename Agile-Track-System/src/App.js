import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import UserProfile from './components/UserProfile/UserProfile';
import SignUp from './components/Signup/SignUp';
import { UserProvider, UserContext } from '../src/context/UserContext';
import './App.css';


const App = () => {
  return (
    <UserProvider>
      <Router>
        <Nav /> {/* Move Nav inside Router but before Routes */}
        <div className="app">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profiles" element={<UserProfile />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

// ✅ Move Nav to a separate functional component inside <Router>
const Nav = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate(); // ✅ Now, useNavigate() will work properly

  const handleLogout = () => {
    logout();
    navigate('/login'); // ✅ Now, it correctly redirects
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/profiles">Profiles</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default App;

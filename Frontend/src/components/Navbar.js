import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/">Cloud Notes</Link>
      <div className="ms-auto">
        {!isLoggedIn ? (
          <>
            <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
            <Link className="btn btn-outline-success" to="/register">Register</Link>
          </>
        ) : (
          <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
}

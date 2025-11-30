import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/auth/login', user);
      localStorage.setItem('token', response.data.token);

      // 🔥 Confirmation popup
      const ok = window.confirm("Login successful! Go to Home page?");

      if (ok) {
        navigate('/');
      }

    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };



  return (
    <div className="login-page">
      <div className="login-card">

        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to your Cloud Notes</p>

        <form onSubmit={handleSubmit}>

          <input
            className="input-box"
            type="email"
            name="email"
            placeholder="Email address"
            onChange={handleChange}
            required
          />

          <input
            className="input-box"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button className="login-btn" type="submit">
            Login
          </button>

        </form>

        <p className="register-text">
          Don’t have an account? <a href="/register">Register</a>
        </p>

      </div>
    </div>
  );
}

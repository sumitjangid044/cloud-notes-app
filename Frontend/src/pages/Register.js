import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export default function Register() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();   // 🔥 page reload STOP
    try {
      const res = await axios.post('/auth/register', user);

      console.log(res.data);
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>Create Account ✨</h2>
        <p className="subtitle">Join Cloud Notes today</p>

        {/* IMPORTANT: form must wrap everything */}
        <form onSubmit={handleSubmit}>

          <div className="name-row">
            <input
              className="input-box"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={user.firstName}
              onChange={handleChange}
              required
            />

            <input
              className="input-box"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={user.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <input
            className="input-box"
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={user.mobile}
            onChange={handleChange}
            maxLength="10"
            required
          />

          <input
            className="input-box"
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            className="input-box"
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <button className="register-btn" type="submit">
            Register
          </button>
        </form>

        <p className="login-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

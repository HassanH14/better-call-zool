// src/components/Navbar.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import logo from '../logo.png';

const Navbar = () => {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [cartCount] = useState(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.length;
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="Better Call Zool" className="nav-logo-img" />
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Products</Link>
          </li>

          {user ? (
            <>
              <li className="nav-item">
                <Link to="/orders" className="nav-link">My Orders</Link>
              </li>
              
              {isAdmin() && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link admin-link">
                    Admin Panel
                  </Link>
                </li>
              )}

              <li className="nav-item">
                <Link to="/cart" className="nav-link cart-link">
                  🛒 Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </Link>
              </li>

              <li className="nav-item">
                <span className="nav-user">👤 {user.name}</span>
              </li>

              <li className="nav-item">
                <button onClick={toggleTheme} className="nav-btn theme-btn">
                  {isDarkMode ? '☀️' : '🌙'}
                </button>
              </li>

              <li className="nav-item">
                <button onClick={handleLogout} className="nav-btn logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-btn">Login</Link>
              </li>
              <li className="nav-item">
                <button onClick={toggleTheme} className="nav-btn theme-btn">
                  {isDarkMode ? '☀️' : '🌙'}
                </button>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-btn signup-btn">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
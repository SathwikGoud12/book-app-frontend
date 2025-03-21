import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HiViewGridAdd } from "react-icons/hi";
import { MdOutlineManageHistory } from "react-icons/md";
import './DashboardLayout.css';

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
  };

  return (
    <section className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <a href="/" className="logo-container">
          <img src="/fav-icon.png" alt="Logo" />
        </a>
        <div className="sidebar-menu">
          <nav className="nav-links">
            <Link to="/dashboard" className="nav-item active">
              <svg className="icon" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="menu-text">Dashboard</span>
            </Link>
            <Link to="/dashboard/add-new-book" className="nav-item">
              <HiViewGridAdd className="icon"/>
              <span className="menu-text">Add New Book</span>
            </Link>
            <Link to="/dashboard/manage-books" className="nav-item">
              <MdOutlineManageHistory className="icon"/>
              <span className="menu-text">Manage Books</span>
            </Link>
          </nav>
          <button className="settings-btn">
            <svg className="icon" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm8.94-2.66c-.08-.29-.3-.54-.59-.62l-2.34-.58c-.2-.05-.34-.24-.34-.44l-.02-2.34c0-.29-.24-.53-.53-.59-1.1-.24-2.14-.78-3.06-1.53-.28-.23-.65-.28-.96-.12l-1.65 1c-.19.12-.42.09-.58-.05-1.02-1.02-2.38-1.58-3.82-1.58-1.44 0-2.8.56-3.82 1.58-.16.14-.39.17-.58.05l-1.65-1c-.31-.16-.68-.11-.96.12-.92.75-1.96 1.29-3.06 1.53-.29.06-.53.3-.53.59l-.02 2.34c0 .2-.14.39-.34.44l-2.34.58c-.29.08-.51.33-.59.62-.24 1.1-.78 2.14-1.53 3.06-.23.28-.18.65.12.96l1 1.65c.12.19.09.42-.05.58-1.02 1.02-1.58 2.38-1.58 3.82 0 1.44.56 2.8 1.58 3.82.14.16.17.39.05.58l-1 1.65c-.3.31-.35.68-.12.96.75.92 1.29 1.96 1.53 3.06.08.29.33.51.62.59l2.34.58c.2.05.34.24.34.44l.02 2.34c0 .29.24.53.53.59 1.1.24 2.14.78 3.06 1.53.28.23.65.28.96.12l1.65-1c.19-.12.42-.09.58.05 1.02 1.02 2.38 1.58 3.82 1.58 1.44 0 2.8-.56 3.82-1.58.16-.14.39-.17.58-.05l1.65 1c.31.16.68.11.96-.12.92-.75 1.96-1.29 3.06-1.53.29-.06.53-.3.53-.59l.02-2.34c0-.2.14-.39.34-.44l2.34-.58c.29-.08.51-.33.59-.62.24-1.1.78-2.14 1.53-3.06.23-.28.18-.65-.12-.96l-1-1.65c-.12-.19-.09-.42.05-.58 1.02-1.02 1.58-2.38 1.58-3.82 0-1.44-.56-2.8-1.58-3.82-.14-.16-.17-.39-.05-.58l1-1.65c.3-.31.35-.68.12-.96-.75-.92-1.29-1.96-1.53-3.06z" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <button className="menu-btn">
            <svg className="icon" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          <input type="text" placeholder="Search..." className="search-box" />
          <div className="profile-container">
            <button className="profile-btn">
              <div className="profile-info">
                <span className="profile-name">Grace Simmons</span>
                <span className="profile-role">Lecturer</span>
              </div>
              <span className="profile-pic">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="user profile" />
              </span>
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              <svg className="icon" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7" />
              </svg>
            </button>
          </div>
        </header>

        <main className="dashboard-content">
          <div className="dashboard-header">
            <div>
              <h1 className="dashboard-title">Dashboard</h1>
              <h2 className="dashboard-subtitle">Book Store Inventory</h2>
            </div>
            <div className="dashboard-actions">
              <Link to="/dashboard/manage-books" className="btn manage-books">
                Manage Books
              </Link>
              <Link to="/dashboard/add-new-book" className="btn add-book">
                Add New Book
              </Link>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default DashboardLayout;
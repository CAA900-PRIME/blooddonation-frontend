import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUser, FiHeart, FiBarChart2 } from "react-icons/fi";

const Sidebar = () => (
  <div className="sidebar bg-dark text-white vh-100 p-3 position-fixed" style={{ width: "250px" }}>
    <h2 className="mb-4">Dashboard</h2>
    <ul className="nav flex-column">
      <li className="nav-item mb-2">
        <Link to="/dashboard" className="nav-link text-white"><FiHome /> Dashboard</Link>
      </li>
      <li className="nav-item mb-2">
        <Link to="/users" className="nav-link text-white"><FiUser /> Users</Link>
      </li>
      <li className="nav-item mb-2">
        <Link to="/donations" className="nav-link text-white"><FiHeart /> Donations</Link>
      </li>
      <li className="nav-item mb-2">
        <Link to="/info" className="nav-link text-white"><FiBarChart2 /> Info</Link>
      </li>
    </ul>
  </div>
);

const Navbar = () => (
  <div className="navbar bg-light p-3" style={{ marginLeft: "250px" }}>
    <h2 className="d-inline-block">Welcome to the Dashboard</h2>
    <div className="float-end">
      <button className="btn btn-warning me-2">🔔 Notifications</button>
      <button className="btn btn-secondary">👤 Profile</button>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="content p-4 w-100" style={{ marginLeft: "250px" }}>
        <Navbar />
        <div className="mt-4">
          <h3 className="text-center">Dashboard Overview</h3>
          <div className="row mt-3">
            <div className="col-md-4">
              <div className="card p-3 text-center">
                <h5>Total Donations</h5>
                <p className="fs-4">120</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 text-center">
                <h5>Active Users</h5>
                <p className="fs-4">35</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 text-center">
                <h5>Pending Requests</h5>
                <p className="fs-4">10</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

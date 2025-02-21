import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FiHome, FiUser, FiHeart, FiBarChart2 } from "react-icons/fi";
import InfoPage from "./InfoPage";

const Sidebar = () => (
  <div className="w-64 bg-gray-900 h-screen p-5 text-white fixed">
    <h2 className="text-xl font-bold mb-5">Dashboard</h2>
    <nav>
      <ul>
        <li className="mb-3"><Link to="/dashboard" className="flex items-center gap-2"><FiHome /> Dashboard</Link></li>
        <li className="mb-3"><Link to="/users" className="flex items-center gap-2"><FiUser /> Users</Link></li>
        <li className="mb-3"><Link to="/donations" className="flex items-center gap-2"><FiHeart /> Donations</Link></li>
        <li className="mb-3"><Link to="/info" className="flex items-center gap-2"><FiBarChart2 /> Info</Link></li>
      </ul>
    </nav>
  </div>
);

const Navbar = ({ user }) => (
  <div className="ml-64 bg-gray-100 p-4 shadow flex justify-between">
    <h2 className="text-xl font-bold">Welcome, {user ? user.name : "Guest"}</h2>
    <div>
      <button className="mr-4">🔔 Notifications</button>
      <button>👤 Profile</button>
    </div>
  </div>
);

const Home = () => (
  <div className="p-5">
    <h2 className="text-2xl font-bold">Overview</h2>
    <div className="grid grid-cols-3 gap-5 mt-5">
      <div className="bg-white p-5 shadow rounded">Total Donations: 120</div>
      <div className="bg-white p-5 shadow rounded">Active Users: 35</div>
      <div className="bg-white p-5 shadow rounded">Pending Requests: 10</div>
    </div>
  </div>
);

const Dashboard = ({ user }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <Navbar user={user} />
        <div className="p-5">
          <Routes>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/users" element={<div>Users Page</div>} />
            <Route path="/donations" element={<div>Donations Page</div>} />
            <Route path="/info" element={<InfoPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

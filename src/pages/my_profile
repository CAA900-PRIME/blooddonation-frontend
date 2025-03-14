import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCamera } from "react-icons/fa";

const Profile = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center bg-danger bg-gradient">
      <div className="card shadow-lg w-75 p-4 d-flex flex-row">
        <aside className="border-end pe-4 text-center">
          <div className="position-relative mb-3">
            <label htmlFor="profile-image" className="cursor-pointer">
              <img
                src={image || "https://via.placeholder.com/100"}
                alt="Profile"
                className="rounded-circle border img-fluid"
                style={{ width: "100px", height: "100px" }}
              />
              <FaCamera className="position-absolute bottom-0 end-0 bg-light p-1 rounded-circle" />
            </label>
            <input
              type="file"
              id="profile-image"
              accept="image/*"
              className="d-none"
              onChange={handleImageChange}
            />
          </div>
          <h2 className="h5">Your Name</h2>
          <p className="text-muted">Blood Group: -</p>
          <nav className="nav flex-column">
            <button className="btn btn-light mb-2">Dashboard</button>
            <button className="btn btn-danger text-white mb-2">Profile</button>
            <button className="btn btn-light mb-2">Settings</button>
            <button className="btn btn-light">Logout</button>
          </nav>
        </aside>
        <main className="ps-4 flex-grow-1">
          <h1 className="h4 mb-4">Profile</h1>
          <div className="row mb-4">
            <div className="col-auto">
              <img
                src={image || "https://via.placeholder.com/100"}
                alt="Profile"
                className="rounded-circle border img-fluid"
                style={{ width: "100px", height: "100px" }}
              />
            </div>
            <div className="col">
              <p><strong>Name:</strong> -</p>
              <p><strong>Username:</strong> -</p>
              <p><strong>Email:</strong> -</p>
              <p><strong>Mobile:</strong> -</p>
              <p><strong>Availability:</strong> -</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <p><strong>Blood Group:</strong> -</p>
              <p><strong>Last Donate:</strong> -</p>
              <p><strong>Gender:</strong> -</p>
              <p><strong>Date of Birth:</strong> -</p>
            </div>
            <div className="col-md-6">
              <p><strong>Country:</strong> -</p>
              <p><strong>State:</strong> -</p>
              <p><strong>City:</strong> -</p>
              <p><strong>Address:</strong> -</p>
            </div>
          </div>
          <div className="mt-4">
            <p><strong>Social Media:</strong> -</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;

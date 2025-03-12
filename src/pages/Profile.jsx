import React, { useState } from "react";
import { FaUser, FaEnvelope, FaMobile, FaTint, FaCalendarAlt, FaGlobe, FaMapMarkerAlt, FaMale, FaBirthdayCake, FaPhone, FaCamera, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

const MyProfile = () => {
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
                src={image || "https://via.placeholder.com/80"}
                alt="Profile"
                className="rounded-circle border img-fluid"
                style={{ width: "80px", height: "80px" }}
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
          <h2 className="h5">Shakib</h2>
          <p className="text-muted">Blood Group: B+</p>
          <nav className="nav flex-column">
            <button className="btn btn-light mb-2">Dashboard</button>
            <button className="btn btn-danger text-white mb-2">My Profile</button>
            <button className="btn btn-light mb-2">Settings</button>
            <button className="btn btn-light">Logout</button>
          </nav>
        </aside>
        <main className="ps-4 flex-grow-1">
          <h1 className="h4 mb-4">My Profile</h1>
          <div className="row mb-4">
            <div className="col-auto">
              <img
                src={image || "https://via.placeholder.com/80"}
                alt="Profile"
                className="rounded-circle border img-fluid"
                style={{ width: "80px", height: "80px" }}
              />
            </div>
            <div className="col">
              <p><strong>Name:</strong> Sakhawat Hossain</p>
              <p><strong>Username:</strong> shakib</p>
              <p><strong>Email:</strong> imshshakib2001@gmail.com</p>
              <p><strong>Mobile:</strong> 01849687969</p>
              <p><strong>Availability:</strong> Available</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <p><FaTint className="text-danger" /> <strong>Blood Group:</strong> B+</p>
              <p><FaCalendarAlt className="text-danger" /> <strong>Last Donate:</strong> 2024-01-09</p>
              <p><FaMale className="text-danger" /> <strong>Gender:</strong> Male</p>
              <p><FaBirthdayCake className="text-danger" /> <strong>Date of Birth:</strong> January 9, 2001</p>
            </div>
            <div className="col-md-6">
              <p><FaGlobe className="text-danger" /> <strong>Country:</strong> Bangladesh</p>
              <p><FaMapMarkerAlt className="text-danger" /> <strong>State:</strong> Bagerhat</p>
              <p><FaMapMarkerAlt className="text-danger" /> <strong>City:</strong> Dhaka</p>
              <p><FaMapMarkerAlt className="text-danger" /> <strong>Address:</strong> Lake Circus, Kalabagan, Dhaka</p>
            </div>
          </div>
          <div className="mt-4">
            <p><strong>Social Media:</strong> <FaFacebook className="mx-1 text-danger" /> <FaTwitter className="mx-1 text-danger" /> <FaInstagram className="mx-1 text-danger" /> <FaLinkedin className="mx-1 text-danger" /></p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyProfile;

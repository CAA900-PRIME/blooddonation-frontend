import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCamera } from "react-icons/fa";


const Profile = () => {
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="container py-5">
      <div className="d-flex flex-column flex-md-row">
        <aside className="border-end pe-4 me-4 text-center">
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
              id="profile-image"
              type="file"
              accept="image/*"
              className="d-none"
              onChange={handleImageChange}
            />
          </div>
          <h2 className="h5">
            {user?.firstName || ""} {user?.lastName || ""}
          </h2>
          <p className="text-muted">Blood Group: {user?.bloodType || "-"}</p>
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
              <p><strong>Name:</strong> {user?.firstName || "-"} {user?.lastName || "-"}</p>
              <p><strong>Username:</strong> {user?.username || "-"}</p>
              <p><strong>Email:</strong> {user?.email || "-"}</p>
              <p><strong>Mobile:</strong> {user?.phoneNumber || "-"}</p>
              <p><strong>Availability:</strong> -</p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <p><strong>Blood Group:</strong> {user?.bloodType || "-"}</p>
              <p><strong>Last Donate:</strong> -</p>
              <p><strong>Gender:</strong> {user?.gender || "-"}</p>
              <p><strong>Date of Birth:</strong> {user?.dob || "-"}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Country:</strong> {user?.country || "-"}</p>
              <p><strong>State:</strong> {user?.state || "-"}</p>
              <p><strong>City:</strong> {user?.city || "-"}</p>
              <p><strong>Address:</strong> {user?.homeAddress || "-"}</p>
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
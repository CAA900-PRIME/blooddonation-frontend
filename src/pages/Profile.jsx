import React, { useEffect, useState } from "react";
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
<<<<<<< HEAD
				{/* Sidebar */}
=======
>>>>>>> ccb4744 (fix: get-my-applications added on dashbaord, minor tweaks on profile page to match the backend)
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
<<<<<<< HEAD
					<p className="text-muted">Blood Group: {user?.bloodType || "-"}</p>
					<nav className="nav flex-column">
						<button className="btn btn-light mb-2">Dashboard</button>
						<button className="btn btn-danger text-white mb-2">Profile</button>
=======
					<p className="text-muted">Blood Group: {user?.blood_type || "-"}</p>
					<nav className="nav flex-column">
						<button className="btn btn-light mb-2">Dashboard</button>
						<button className="btn btn-danger text-white mb-2">Profile</button>
						<button className="btn btn-light mb-2">Settings</button>
>>>>>>> ccb4744 (fix: get-my-applications added on dashbaord, minor tweaks on profile page to match the backend)
						<button className="btn btn-light">Logout</button>
					</nav>
				</aside>

<<<<<<< HEAD
				{/* Main content */}
				<main className="ps-4 flex-grow-1">
					<div className="d-flex justify-content-between align-items-center mb-4">
						<h1 className="h4">Profile</h1>
						<button className="btn btn-outline-danger">Edit</button>
					</div>
=======
				<main className="ps-4 flex-grow-1">
					<h1 className="h4 mb-4">Profile</h1>
>>>>>>> ccb4744 (fix: get-my-applications added on dashbaord, minor tweaks on profile page to match the backend)

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
<<<<<<< HEAD
							<p><strong>Mobile:</strong> {user?.phoneNumber || "-"}</p>
=======
							<p><strong>Mobile:</strong> {user?.phone_number || "-"}</p>
>>>>>>> ccb4744 (fix: get-my-applications added on dashbaord, minor tweaks on profile page to match the backend)
							<p><strong>Availability:</strong> -</p>
						</div>
					</div>

					<div className="row">
						<div className="col-md-6">
<<<<<<< HEAD
							<p><strong>Blood Group:</strong> {user?.bloodType || "-"}</p>
							<p><strong>Last Donate:</strong> -</p>
							<p><strong>Gender:</strong> {user?.gender || "-"}</p>
=======
							<p><strong>Blood Group:</strong> {user?.blood_type || "-"}</p>
							<p><strong>Last Donate:</strong> -</p>
							<p><strong>Sex:</strong> {user?.sex || "-"}</p>
>>>>>>> ccb4744 (fix: get-my-applications added on dashbaord, minor tweaks on profile page to match the backend)
							<p><strong>Date of Birth:</strong> {user?.dob || "-"}</p>
						</div>
						<div className="col-md-6">
							<p><strong>Country:</strong> {user?.country || "-"}</p>
							<p><strong>City:</strong> {user?.city || "-"}</p>
<<<<<<< HEAD
							<p><strong>Address:</strong> {user?.homeAddress || "-"}</p>
						</div>
					</div>
=======
							<p><strong>Address:</strong> {user?.home_address || "-"}</p>
						</div>
					</div>
<<<<<<< HEAD

					<div className="mt-4">
						<p><strong>Social Media:</strong> -</p>
					</div>
>>>>>>> ccb4744 (fix: get-my-applications added on dashbaord, minor tweaks on profile page to match the backend)
=======
>>>>>>> 0f7a93c (update & fix: minor update to bloodRequest, adding api request to delete blood request applications of logged in users. Added get-countries and get-cities api request in sign up page. Tested)
				</main>
			</div>
		</div>
	);
};

export default Profile;

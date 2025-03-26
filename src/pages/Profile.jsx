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
				{/* Sidebar */}
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
						{user?.firstName || "-"} {user?.lastName || "-"}
					</h2>
					<p className="text-muted">Blood Group: {user?.blood_type || "-"}</p>
					<nav className="nav flex-column">
						<button className="btn btn-light mb-2">Dashboard</button>
						<button className="btn btn-danger text-white mb-2">Profile</button>
						<button className="btn btn-light">Logout</button>
					</nav>
				</aside>

				{/* Main content */}
				<main className="ps-4 flex-grow-1">
					<div className="d-flex justify-content-between align-items-center mb-4">
						<h1 className="h4">Profile</h1>
						<button className="btn btn-outline-danger">Edit</button>
					</div>

					<div className="row mb-4">
						<div className="col">
							<p><strong>Name:</strong> {user?.firstName || "-"} {user?.lastName || "-"}</p>
							<p><strong>Username:</strong> {user?.username || "-"}</p>
							<p><strong>Email:</strong> {user?.email || "-"}</p>
							<p><strong>Mobile:</strong> {user?.phone_number || "-"}</p>
						</div>
					</div>

					<div className="row">
						<div className="col-md-6">
							<p><strong>Blood Group:</strong> {user?.blood_type || "-"}</p>
							<p><strong>Last Donate:</strong> -</p>
							<p><strong>Sex:</strong> {user?.sex || "-"}</p>
							<p><strong>Date of Birth:</strong> {user?.dob || "-"}</p>
						</div>
						<div className="col-md-6">
							<p><strong>Country:</strong> {user?.country || "-"}</p>
							<p><strong>State:</strong> {user?.state || "-"}</p>
							<p><strong>City:</strong> {user?.city || "-"}</p>
							<p><strong>Address:</strong> {user?.home_address || "-"}</p>
						</div>
					</div>

					<hr className="my-4" />
					<h5 className="mb-3">Security</h5>

					<div className="row mb-3 align-items-center">
						<div className="col-md-3">
							<strong>🔒 Password</strong>
						</div>
						<div className="col-md-6">
							<input
								type="password"
								value="********"
								disabled
								className="form-control"
							/>
						</div>
						<div className="col-md-3">
							<button className="btn btn-outline-secondary">Change password</button>
						</div>
					</div>

					<div className="row align-items-center">
						<div className="col-md-3">
							<strong>🛡️ 2 Factor Authentication</strong>
						</div>
						<div className="col-md-6 text-primary">
							<small className="text-primary"> Recommended</small>
						</div>
						<div className="col-md-3">
							<button className="btn btn-danger">Set up now</button>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default Profile;

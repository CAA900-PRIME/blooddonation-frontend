import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
const apiUrl = import.meta.env.VITE_API_URL;

const Profile = ({ showAlert }) => {
	const [image, setImage] = useState(null);
	const [user, setUser] = useState(null);

	const handleImageChange = async (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = async () => {
				setImage(reader.result);
				const formData = new FormData();
				formData.append("profile_pic", file);

				try {
					const response = await fetch(`${apiUrl}/api/users/update-profile-picture`, {
						method: "POST",
						body: formData,
						credentials: "include",
					});
					const data = await response.json();
					if (response.ok) {
						showAlert("Profile picture updated succesfully!", "success");
					} else {
						showAlert(data.error, "danger");
					}
				} catch (error) {
					showAlert(error, "danger");
				}
			};
			reader.readAsDataURL(file);
		}
	};
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await fetch(`${apiUrl}/api/users/get-user`, {
					method: "GET",
					credentials: "include",
				});
				if (response.ok) {
					const data = await response.json();
					setUser(data)
				} else {
					showAlert("Error fetching profile picture", "danger")
				}
			} catch (error) {
				console.log("Error fetching image:", error);
			}
		};

		const fetchProfilePicture = async () => {
			try {
				const response = await fetch(`${apiUrl}/api/users/get-profile-picture`, {
					method: "GET",
					credentials: "include",
				});
				if (response.ok) {
					const blob = await response.blob();
					setImage(URL.createObjectURL(blob));
				} else {
					console.log("Error fetching profile picture");
				}
			} catch (error) {
				console.log("Error fetching image:", error);
			}
		};

		fetchUser();
		fetchProfilePicture();
	}, []);

	return (
		<div className="container py-5">
			<div className="d-flex flex-column flex-md-row">
				{/* Sidebar */}
				<aside className="border-end pe-4 me-4 text-center">
					<div className="position-relative mb-3">
						<label htmlFor="profile-image" className="cursor-pointer">
							<img
								src={image || "/avatar.png"}
								alt="Profile"
								className="rounded-circle border img-fluid"
								style={{ width: "100px", height: "100px" }}
							/>
							<FaCamera className="position-absolute bottom-0 end-0 bg-light p-1 rounded-circle" style={{ fontSize: "32px" }} />
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
					<nav className="nav flex-column">
						<a href="/edit-profile" className="btn btn-outline-danger">Edit Profile</a>
					</nav>
				</aside>

				{/* Main content */}
				<main className="ps-4 flex-grow-1">
					<div className="d-flex justify-content-between align-items-center mb-4">
						<h1 className="h4">Profile</h1>
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
							<button className="btn btn-outline-secondary" style={{ width: "170px" }}>Change password</button>
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
							<button className="btn btn-danger" style={{ width: "170px" }}>Set up now</button>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default Profile;

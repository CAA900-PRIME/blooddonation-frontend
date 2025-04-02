import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const NavBar = ({ user, setUser }) => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
			<div className="container-fluid">
				<a className="navbar-brand" href="/">Blood Donation App</a>
				<button
					className="navbar-toggler"
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					aria-controls="navbarNav"
					aria-expanded={isOpen}
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
					<ul className="navbar-nav ms-auto">
						{user ? (
							<>
								<li className="nav-item">
									<Link className="nav-link" to="/dashboard">Dashboard</Link>
								</li>
								{/*<li className="nav-item">
									<Link className="nav-link" to="/info">Information</Link>
								</li> */}
								<li className="nav-item">
									<Link className="nav-link" to="/blood-request">Request Blood</Link>
								</li>
								<li className="nav-item">
									<Link className="btn btn-warning me-2" to="/logs">🔔</Link>
								</li>
								<li className="nav-item">
									<Link to="/profile" className="btn btn-light me-2 d-flex align-items-center position-relative">
										👤 {user.username}
										<span className="badge rounded-pill bg-primary ms-2">Profile</span>
									</Link>
								</li>
								<li className="nav-item">
									<button className="btn btn-danger" onClick={() => {
										localStorage.removeItem("user");
										setUser(null);
										navigate("/login");
									}}>Logout</button>
								</li>
							</>
						) : (
							<>
								<li className="nav-item">
									<Link className="nav-link" to="/login">Login</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/signup">Signup</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;

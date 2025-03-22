import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = ({ user, setUser }) => {
	const navigate = useNavigate();
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
			<div className="container-fluid">
				<a className="navbar-brand" href="/">Blood Donation App</a>
				<div className="collapse navbar-collapse">
					<ul className="navbar-nav ms-auto">
						{user ? (
							<>
								<li className="nav-item">
									<Link className="nav-link" to="/dashboard">Dashboard</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/info">Information</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/blood-request">Request Blood</Link>
								</li>
								<li className="nav-item">
									<button className="btn btn-warning me-2">🔔 Notifications</button>
								</li>
								<li className="nav-item">
									<Link to="/profile" className="btn btn-light me-2">👤 Profile</Link>
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

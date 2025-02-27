import { Link } from "react-router-dom";

const NavBar = ({ user, setUser }) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
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
									<button className="btn btn-danger" onClick={() => {
										localStorage.removeItem("user");
										setUser(null);
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

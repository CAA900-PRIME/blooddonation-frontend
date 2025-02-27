import { Link } from "react-router-dom";
function Home() {
	return (
		<div className="container mt-5">
			<div className="jumbotron p-5 bg-danger text-white rounded">
				<h1 className="display-4">Donate Blood, Save Lives</h1>
				<p className="lead">Every drop counts! Join our mission to help those in need by becoming a blood donor.</p>
				<hr className="my-4" />
				<p>Sign up today and make a difference in someone's life.</p>
				<Link className="btn btn-light btn-lg me-2" to="/signup">Become a Donor</Link>
				<Link className="btn btn-outline-light btn-lg" to="/login">Login</Link>
			</div>
		</div>
	);
}

export default Home;

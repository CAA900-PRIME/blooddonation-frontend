import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import { FaClock, FaSyringe, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import animationData from "../assets/donate-animation.json"; // Make sure this exists
import { useState } from "react";

function Home() {
	const [user] = useState(() => JSON.parse(localStorage.getItem("user")));
	const bloodStats = [
		{ type: "O+", needed: 120 },
		{ type: "A-", needed: 75 },
		{ type: "B+", needed: 95 },
		{ type: "AB-", needed: 20 },
	];

	return (
		<div className="container mt-5">

			{/* Hero Section */}
			<motion.div
				initial={{ opacity: 0, y: -30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="p-5 text-white rounded shadow-lg mb-5 position-relative"
				style={{
					background: "linear-gradient(135deg, #d32f2f, #b71c1c)",
					borderRadius: "1rem",
				}}
			>
				<div className="row align-items-center">
					<div className="col-md-6 text-center text-md-start">
						<h1 className="display-4 fw-bold mb-3" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}>
							Donate Blood,<br /> Save Lives
						</h1>
						<p className="lead mb-4">
							Every drop counts. Join our mission to help those in need by becoming a blood donor.
						</p>
						<div className="d-flex gap-3 justify-content-center justify-content-md-start">
							<Link className="btn btn-light btn-lg px-4 btn-donor" to="/signup">
								❤️ Become a Donor
							</Link>
							{user ? (
								null
							) : (
								<Link className="btn btn-outline-light btn-lg px-4" to="/login">
									Login
								</Link>
							)}
						</div>
						<p className="text-light mt-3">
							⏳ Blood banks are running low. Be the reason someone sees tomorrow.
						</p>
					</div>

					<div className="col-md-6 d-flex justify-content-center">
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ delay: 0.3 }}
							style={{ maxWidth: 250 }}
						>
							<Lottie animationData={animationData} loop />
						</motion.div>
					</div>
				</div>

				{/* 🔽 Scroll Indicator */}
				<div className="text-center mt-4">
					<span className="text-white fs-4 animate-bounce">⬇</span>
				</div>
			</motion.div>

			{/* Why Donate Section */}
			<section className="text-center mb-5">
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
				>
					<h3 className="mb-4 fw-semibold">Why Donate Blood?</h3>
					<p className="text-muted mb-5">
						Your donation can save up to <strong>three lives</strong>. It's quick, safe, and incredibly meaningful.
					</p>

					<div className="row g-4">
						<div className="col-md-4">
							<div className="p-4 border rounded h-100">
								<FaClock size={40} className="text-danger mb-3" />
								<h5>Quick Process</h5>
								<p className="text-muted">It takes just 15 minutes to make a lasting impact.</p>
							</div>
						</div>
						<div className="col-md-4">
							<div className="p-4 border rounded h-100">
								<FaSyringe size={40} className="text-danger mb-3" />
								<h5>Safe & Easy</h5>
								<p className="text-muted">Trained professionals ensure a smooth and safe experience.</p>
							</div>
						</div>
						<div className="col-md-4">
							<div className="p-4 border rounded h-100">
								<FaUsers size={40} className="text-danger mb-3" />
								<h5>Community Impact</h5>
								<p className="text-muted">Support patients and hospitals in your local community.</p>
							</div>
						</div>
					</div>
				</motion.div>
			</section>

			{/* Blood Stats Section */}
			<motion.div
				className="text-center mt-5"
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				viewport={{ once: true }}
			>
				<h4 className="mb-4">📈 Current Blood Type Demand</h4>
				<div className="row justify-content-center">
					{bloodStats.map(({ type, needed }) => (
						<div key={type} className="col-6 col-md-3 mb-3">
							<div className="p-3 border rounded text-center shadow-sm">
								<h5 className="text-danger">{type}</h5>
								<p className="mb-0">{needed} units needed</p>
							</div>
						</div>
					))}
				</div>
			</motion.div>

			{/* Optional bounce animation styling */}
			<style>{`
				.animate-bounce {
					animation: bounce 1.5s infinite;
				}
				@keyframes bounce {
					0%, 100% {
						transform: translateY(0);
					}
					50% {
						transform: translateY(-10px);
					}
				}
				.btn-donor:hover {
					transform: scale(1.05);
					box-shadow: 0 4px 12px rgba(0,0,0,0.2);
					transition: all 0.3s ease;
				}
			`}</style>
		</div>
	);
}

export default Home;

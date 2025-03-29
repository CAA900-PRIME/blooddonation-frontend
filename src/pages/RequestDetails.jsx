import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const RequestDetails = ({ showAlert }) => {
	const { id } = useParams();
	const [requestData, setRequestData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${apiUrl}/api/app/get-approved-application-details`, {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					credentials: 'include',
					body: JSON.stringify({ app_id: id })
				});

				if (!response.ok) {
					throw new Error('Failed to fetch application details');
				}
				const data = await response.json()
				setRequestData(data.app_details);
			} catch (err) {
				showAlert("Error fetching application details", "danger")
				console.error(err);
			}
		};

		fetchData();
	}, [id]);

	return (
		<div style={{ margin: "15px" }}>
			{requestData ? (
				<div className="container text-center">
					<h1 style={{ margin: "10px", textAlign: "left" }}>Request Details</h1>
					<div className="row align-items-start">
						<div className="col">
							<div className="card" style={{ padding: "0", textAlign: "left" }}>
								<h5 className="card-header">Requester</h5>
								<div className="card-body">
									<h5 className="card-title">{requestData.rqFirstName + " " + requestData.rqLastName}</h5>
									<div className="card-text">
										<table className="table table-bordered">
											<tbody>
												<tr>
													<td>Phone</td>
													<td>{requestData.rqPhone}</td>
												</tr>
												<tr>
													<td>Email</td>
													<td>{requestData.rqEmail}</td>
												</tr>
												<tr>
													<td>Blood Type</td>
													<td>{requestData.rqBloodType}</td>
												</tr>
												<tr>
													<td>Sex</td>
													<td>{requestData.rqSex}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
						<div className="col">
							<div className="card" style={{ padding: "0", textAlign: "left" }}>
								<h5 className="card-header">Application Blood Request</h5>
								<div className="card-body">
									<h5 className="card-title">Request Details Appointment</h5>
									<div className="card-text">
										<table className="table table-bordered">
											<tbody>
												<tr>
													<td>Hospital Name</td>
													<td>{requestData.appHospitalName}</td>
												</tr>
												<tr>
													<td>Hospital Address</td>
													<td>{requestData.appHospitalAddress}</td>
												</tr>
												<tr>
													<td>Country</td>
													<td>{requestData.appCountry}</td>
												</tr>
												<tr>
													<td>City</td>
													<td>{requestData.appCity}</td>
												</tr>
												<tr>
													<td>Status</td>
													<td>{requestData.appStatus}</td>
												</tr>
												<tr>
													<td>Appointment</td>
													<td>{requestData.appAppointment}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
						<div className="col">
							<div className="card" style={{ padding: "0", textAlign: "left" }}>
								<h5 className="card-header">Donor</h5>
								<div className="card-body">
									<h5 className="card-title">{requestData.doFirstName + " " + requestData.doLastName}</h5>
									<div className="card-text">
										<table className="table table-bordered">
											<tbody>
												<tr>
													<td>Phone</td>
													<td>{requestData.doPhone}</td>
												</tr>
												<tr>
													<td>Email</td>
													<td>{requestData.doEmail}</td>
												</tr>
												<tr>
													<td>Blood Type</td>
													<td>{requestData.doBloodType}</td>
												</tr>
												<tr>
													<td>Sex</td>
													<td>{requestData.doSex}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>) : (
				<p>Loading...</p>
			)}
		</div>
	);
};


export default RequestDetails 

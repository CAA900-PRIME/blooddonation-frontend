import React, { useState, useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

const Logs = ({ showAlert }) => {
	const [logs, setLogs] = useState([])
	useEffect(() => {
		const fetchLogs = async () => {
			try {
				const response = await fetch(`${apiUrl}/api/log/get-logs`, {
					method: "GET",
					credentials: "include",
					headers: { 'Content-Type': 'application/json' },
				});
				const data = await response.json();
				if (response.ok) {
					setLogs(data);
				} else {
					showAlert(data.error, "danger")
				}
			} catch (error) {
				showAlert(error, "danger")
			}
		};
		fetchLogs();
	}, [])

	const renderLogList = (logs) => {
		return logs.length > 0 ? (
			[...logs].reverse().map((log) => (
				<div key={log.id} className="card text-bg-secondary mb-3" style={{ padding: 0 }}>
					<div className="card-header">
						{log.action_type}
					</div>
					<div className="card-body">
						<h5 className="card-title">{log.action_description}</h5>
						<p className="card-text">
							<strong>IP Address:</strong> {log.ip_address || "N/A"} <br />
							<strong>Timestamp:</strong> {new Date(log.timestamp).toLocaleString()}
						</p>
					</div>
				</div>
			))
		) : (
			<p>No logs available</p>
		);
	};
	return (
		<div className="card shadow-sm" style={{ margin: "20px", marginLeft: "50px", marginRight: "50px", padding: 0 }}>
			<div className="card-header text-center">
				<h4 className="mb-0">Logs</h4>
			</div>
			<div className="card-body overflow-auto">
				{renderLogList(logs)}
			</div>
		</div>
	)
}
export default Logs;

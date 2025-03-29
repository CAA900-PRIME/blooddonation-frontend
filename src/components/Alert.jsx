import React from "react";

const Alert = ({ alertMessage, alertType = "primary" }) => {
	if (!alertMessage) return null;

	return (
		<div style={{ margin: "10px" }} className={`alert alert-${alertType}`} role="alert">
			{alertMessage}
		</div>
	);
};

export default Alert;

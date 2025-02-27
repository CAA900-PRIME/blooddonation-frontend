import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
	return (
		<Router>
			<NavBar />
			<div className="container mt-4">
				<AppRoutes />
			</div>
		</Router>
	);
}



export default App;

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./ui/Dashboard";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Navigate replace to="/dashboard" />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

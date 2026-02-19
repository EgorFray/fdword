import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Navigate replace to="" />} />
				<Route path="/dashboard" element="" />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

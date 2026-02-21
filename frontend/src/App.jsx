import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Manual from "./pages/Manual";
import AppLayout from "./ui/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manual" element={<Manual />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

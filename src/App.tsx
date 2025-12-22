import { Link, Route, Routes } from "react-router-dom";
import IssuesPage from "./pages/IssuesPage";

export default function App() {
  return (
    <div className="app">
      <header>
        <h1><Link to="/">Issue Triage Dashboard</Link></h1>
        <div className="small muted">Vite + React + TS</div>
      </header>

      <Routes>
        <Route path="/" element={<IssuesPage />} />
        <Route path="/issues/:id" element={<IssuesPage />} />
      </Routes>
    </div>
  );
}

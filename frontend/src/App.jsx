import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";

export default function App() {
  return (
    <div className="min-h-screen  w-full flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-semibold text-blue-600">
             Real Trust
            </Link>
            <div className="space-x-4">
              <Link
                to="/"
                className="text-sm font-medium text-slate-700 hover:text-blue-600"
              >
                Home
              </Link>
              <Link
                to="/admin"
                className="text-sm font-medium text-slate-700 hover:text-blue-600"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 text-center py-4 text-sm">
        &copy; {new Date().getFullYear()} Real Trust. All rights reserved.
      </footer>
    </div>
  );
}




import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MyExpenses from "./pages/MyExpenses";
import SubmitExpense from "./pages/SubmitExpense";
import PendingApprovals from "./pages/PendingApprovals";
import ManageUsers from "./pages/ManageUsers";

// Components
import Sidebar from "./components/Sidebar";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* --- Protected App Routes (With Sidebar Layout) --- */}
        <Route
          path="/app/*"
          element={
            <PrivateRoute>
              <div className="flex min-h-screen bg-gray-50">
                {/* Fixed Sidebar */}
                <Sidebar />

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto">
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="my-expenses" element={<MyExpenses />} />
                    <Route path="submit" element={<SubmitExpense />} />
                    <Route path="approvals" element={<PendingApprovals />} />
                    <Route path="manage-users" element={<ManageUsers />} />
                    
                    {/* Default redirect if user just hits /app */}
                    <Route path="*" element={<Navigate to="dashboard" replace />} />
                  </Routes>
                </main>
              </div>
            </PrivateRoute>
          }
        />

        {/* --- Fallback Routes --- */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* 404 Catch-all */}
        <Route path="*" element={
          <div className="flex items-center justify-center h-screen bg-white">
            <div className="text-center">
              <h1 className="text-6xl font-black text-gray-200">404</h1>
              <p className="text-gray-500 mt-2 font-bold">Page Not Found</p>
              <button 
                onClick={() => window.location.href = "/"}
                className="mt-4 text-blue-600 font-bold hover:underline"
              >
                Go back home
              </button>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get user role from localStorage to hide/show links
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role?.toLowerCase() || "employee";

  const menuItems = [
    { name: "Dashboard", path: "/app/dashboard", icon: "📊", roles: ["employee", "manager", "admin"] },
    { name: "Submit Expense", path: "/app/submit", icon: "➕", roles: ["employee", "manager", "admin"] },
    { name: "My Expenses", path: "/app/my-expenses", icon: "📁", roles: ["employee", "manager", "admin"] },
    { name: "Approvals", path: "/app/approvals", icon: "✅", roles: ["manager", "admin"] },
    { name: "Manage Users", path: "/app/manage-users", icon: "👥", roles: ["admin"] },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="w-64 bg-slate-900 h-screen sticky top-0 flex flex-col text-white shadow-2xl">
      <div className="p-6">
        <h1 className="text-2xl font-black tracking-tighter text-blue-400">EXPENSIFY.ai</h1>
        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Hackathon v1.0</p>
      </div>

      <nav className="flex-1 mt-4">
        {menuItems.map((item) => (
          item.roles.includes(role) && (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-6 py-4 transition-all duration-200 ${
                location.pathname === item.path 
                ? "bg-blue-600 border-r-4 border-white font-bold" 
                : "hover:bg-slate-800 text-slate-400"
              }`}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          )
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-xs">
            {user.name?.charAt(0) || "U"}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">{user.name || "User"}</p>
            <p className="text-[10px] text-slate-500 uppercase font-black">{role}</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full text-left text-xs font-bold text-red-400 hover:text-red-300 transition"
        >
          🚪 LOGOUT SYSTEM
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
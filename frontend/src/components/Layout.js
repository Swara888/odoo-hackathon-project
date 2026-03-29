import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Expense App</h2>

        <ul className="space-y-4">
          <li
            className="cursor-pointer hover:text-blue-400"
            onClick={() => navigate("/app/dashboard")}
          >
            Dashboard
          </li>

          <li
            className="cursor-pointer hover:text-blue-400"
            onClick={() => navigate("/app/submit-expense")}
          >
            Submit Expense
          </li>

          <li
            className="cursor-pointer hover:text-blue-400"
            onClick={() => navigate("/app/my-expenses")}
          >
            My Expenses
          </li>
        </ul>
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <div className="bg-white shadow p-4 flex justify-between">
          <h1 className="font-semibold">Dashboard</h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6 bg-gray-100 flex-1 overflow-auto">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default Layout;
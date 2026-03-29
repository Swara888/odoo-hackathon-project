import React, { useEffect, useState } from "react";
import api from "../services/api";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "employee", managerId: "" });
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/admin/users");
      setUsers(res.data.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/admin/users/create", newUser);
      alert("User onboarded and password sent!");
      setNewUser({ name: "", email: "", role: "employee", managerId: "" });
      fetchUsers();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Create User Form (The "Onboarding" from your sketch) */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-fit">
          <h2 className="text-xl font-black text-gray-800 mb-6">Onboard New Member</h2>
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase text-gray-400">Full Name</label>
              <input 
                type="text" 
                className="w-full border-b-2 border-gray-100 focus:border-blue-500 py-2 outline-none transition"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-gray-400">Email Address</label>
              <input 
                type="email" 
                className="w-full border-b-2 border-gray-100 focus:border-blue-500 py-2 outline-none transition"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-gray-400">Role</label>
              <select 
                className="w-full mt-1 p-2 bg-gray-50 rounded-lg"
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager/Approver</option>
                <option value="admin">System Admin</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-gray-400">Assign Manager</label>
              <select 
                className="w-full mt-1 p-2 bg-gray-50 rounded-lg text-sm"
                value={newUser.managerId}
                onChange={(e) => setNewUser({...newUser, managerId: e.target.value})}
              >
                <option value="">None (Top Level)</option>
                {users.filter(u => u.role === 'manager').map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
            <button 
              disabled={loading}
              className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold mt-4 hover:bg-black transition shadow-lg"
            >
              {loading ? "CREATING..." : "ADD TO ORGANIZATION"}
            </button>
          </form>
        </div>

        {/* Right Side: User Directory Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-widest font-black">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Reports To</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4">
                    <div className="font-bold text-gray-800">{u.name}</div>
                    <div className="text-xs text-gray-400">{u.email}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      u.role === 'admin' ? 'bg-purple-100 text-purple-600' : 
                      u.role === 'manager' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {u.manager?.name || "—"}
                  </td>
                  <td className="p-4">
                    <button className="text-red-400 hover:text-red-600 text-xs font-bold">DEACTIVATE</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default ManageUsers;
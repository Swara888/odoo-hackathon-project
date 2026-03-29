import React, { useEffect, useState } from "react";
import api from "../services/api";

const PendingApprovals = () => {
  const [pendingExpenses, setPendingExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch all expenses that need approval
  const fetchPending = async () => {
    try {
      // Check with your teammate if the endpoint is /api/expenses/pending
      const res = await api.get("/api/expenses/pending");
      setPendingExpenses(res.data.data);
    } catch (err) {
      console.error("Error fetching approvals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  // 2. Handle Approve/Reject Actions
  const handleAction = async (id, status) => {
    try {
      // status will be 'Approved' or 'Rejected'
      await api.put(`/api/expenses/${id}/status`, { status });
      
      // Update local state to remove the item or change its look
      setPendingExpenses((prev) => 
        prev.map(exp => exp.id === id ? { ...exp, status } : exp)
      );
      
      alert(`Expense ${status} successfully!`);
    } catch (err) {
      alert("Action failed: " + err.message);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading Approvals...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">Approval Inbox</h1>
          <p className="text-gray-500 font-medium">Review and process team reimbursement requests</p>
        </header>

        {pendingExpenses.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-dashed border-gray-300">
            <p className="text-gray-400 text-lg">No pending approvals found. You're all caught up! 🎉</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-white text-xs uppercase tracking-widest">
                <tr>
                  <th className="p-5">Employee</th>
                  <th className="p-5">Description</th>
                  <th className="p-5">Category</th>
                  <th className="p-5 text-right">Amount</th>
                  <th className="p-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pendingExpenses.map((exp) => (
                  <tr key={exp.id} className={`transition ${exp.status !== 'Pending' ? 'opacity-50 grayscale' : 'hover:bg-blue-50/30'}`}>
                    <td className="p-5 font-bold text-gray-800">{exp.user?.name || "Team Member"}</td>
                    <td className="p-5">
                      <div className="text-sm font-medium">{exp.description}</div>
                      <div className="text-xs text-gray-400">{exp.date}</div>
                    </td>
                    <td className="p-5">
                      <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-600">{exp.category}</span>
                    </td>
                    <td className="p-5 text-right font-black text-blue-600">
                      ₹{exp.amount}
                    </td>
                    <td className="p-5">
                      {exp.status === 'Pending' ? (
                        <div className="flex justify-center gap-3">
                          <button 
                            onClick={() => handleAction(exp.id, 'Approved')}
                            className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-md transition"
                          >
                            APPROVE
                          </button>
                          <button 
                            onClick={() => handleAction(exp.id, 'Rejected')}
                            className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-md transition"
                          >
                            REJECT
                          </button>
                        </div>
                      ) : (
                        <div className="text-center font-bold text-sm uppercase tracking-tighter italic">
                          {exp.status}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingApprovals;
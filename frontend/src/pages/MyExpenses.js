import React, { useEffect, useState } from "react";
import api from "../services/api";

const MyExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchMyExpenses = async () => {
    try {
      const res = await api.get("/api/expenses/my");
      setExpenses(res.data.data);
    } catch (err) {
      console.error("Error fetching your expenses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyExpenses();
  }, []);

  // Filter logic for the tabs
  const filteredExpenses = filter === "All" 
    ? expenses 
    : expenses.filter(exp => exp.status === filter);

  if (loading) return <div className="p-10 text-center font-bold text-gray-400">Loading your history...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">My Expense History</h1>
            <p className="text-gray-500">Track and manage your personal claims</p>
          </div>
          
          {/* Status Filter Tabs */}
          <div className="flex bg-gray-200 p-1 rounded-xl">
            {["All", "Pending", "Approved", "Rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                  filter === tab ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        {filteredExpenses.length === 0 ? (
          <div className="bg-white p-20 text-center rounded-3xl border-2 border-dashed border-gray-200">
            <span className="text-4xl">📂</span>
            <p className="mt-4 text-gray-400 font-medium">No {filter !== "All" ? filter : ""} expenses found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredExpenses.map((exp) => (
              <div 
                key={exp.id} 
                className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl group-hover:bg-blue-600 group-hover:text-white transition">
                    {exp.category === 'Food' ? '🍔' : exp.category === 'Travel' ? '✈️' : '📦'}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{exp.description}</h3>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-tighter">
                      {exp.date} • {exp.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-lg font-black text-gray-900">₹{exp.amount}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{exp.paidBy || 'Self'}</p>
                  </div>
                  
                  <div className={`w-28 text-center py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                    exp.status === 'Approved' ? 'bg-green-50 text-green-600 border-green-100' :
                    exp.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-100' :
                    'bg-yellow-50 text-yellow-600 border-yellow-100'
                  }`}>
                    {exp.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyExpenses;
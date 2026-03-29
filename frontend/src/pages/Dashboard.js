// import React, { useEffect, useState } from "react";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const [expenses, setExpenses] = useState([]);
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   const fetchExpenses = async () => {
//     try {
//       const res = await api.get("/api/expenses/my");
//       setExpenses(res.data.data);
//     } catch (err) { console.error(err); }
//   };

//   useEffect(() => { fetchExpenses(); }, []);

//   // Calculate Summary Totals from your wireframe
//   const totals = {
//     toSubmit: expenses.filter(e => e.status === "Draft").reduce((acc, curr) => acc + curr.amount, 0),
//     waiting: expenses.filter(e => e.status === "Pending").reduce((acc, curr) => acc + curr.amount, 0),
//     approved: expenses.filter(e => e.status === "Approved").reduce((acc, curr) => acc + curr.amount, 0),
//   };

//   return (
//     <div className="p-6 lg:p-10 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Hello, {user.name} 👋</h1>
//           <p className="text-gray-500">Here's your expense summary</p>
//         </div>
//         <div className="flex gap-4">
//           <button onClick={() => navigate("/app/submit")} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:shadow-lg transition">
//             + New Expense
//           </button>
//           <button onClick={() => { localStorage.clear(); navigate("/login"); }} className="text-red-500 font-medium">Logout</button>
//         </div>
//       </div>

//       {/* Summary Cards from Wireframe 2 */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-400">
//           <p className="text-sm text-gray-500 uppercase font-bold">To Submit</p>
//           <p className="text-2xl font-black">₹{totals.toSubmit}</p>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-400">
//           <p className="text-sm text-gray-500 uppercase font-bold">Waiting Approval</p>
//           <p className="text-2xl font-black text-blue-600">₹{totals.waiting}</p>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-400">
//           <p className="text-sm text-gray-500 uppercase font-bold">Approved</p>
//           <p className="text-2xl font-black text-green-600">₹{totals.approved}</p>
//         </div>
//       </div>

//       {/* Modern Table */}
//       <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//         <div className="p-4 border-b border-gray-100 flex justify-between">
//           <h3 className="font-bold text-gray-700">Recent Transactions</h3>
//           <button className="text-blue-600 text-sm font-semibold">View All</button>
//         </div>
//         <table className="w-full text-left border-collapse">
//           <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
//             <tr>
//               <th className="p-4">Description</th>
//               <th className="p-4">Category</th>
//               <th className="p-4">Amount</th>
//               <th className="p-4">Status</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {expenses.map((exp) => (
//               <tr key={exp.id} className="hover:bg-gray-50 transition">
//                 <td className="p-4 font-medium">{exp.description}</td>
//                 <td className="p-4 text-gray-500">{exp.category}</td>
//                 <td className="p-4 font-bold">₹{exp.amount}</td>
//                 <td className="p-4">
//                   <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                     exp.status === "Approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
//                   }`}>
//                     {exp.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // 1. Get User Data from LocalStorage
  const user = JSON.parse(localStorage.getItem("user") || '{"role":"employee", "name":"Guest User"}');
  const isManager = user.role === "manager";

  // 2. State for Mock Data (since backend is off)
  const [stats, setStats] = useState({
    personal: { toSubmit: "₹2,400", pending: "₹12,000", approved: "₹45,000" },
    team: { pendingCount: "14", totalSpend: "₹84,200", rate: "92%" }
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      
      {/* --- TOP HEADER SECTION --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
            Hello, {user.name} <span className="animate-bounce">👋</span>
          </h1>
          <p className="text-gray-400 font-bold mt-1 uppercase text-xs tracking-widest">
            {isManager ? "Management Portal • Team Analytics" : "Personal Portal • Expense Tracker"}
          </p>
        </div>

        {/* Dynamic Action Button */}
        <button 
          onClick={() => navigate(isManager ? "/app/approvals" : "/app/submit")}
          className={`group flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-white shadow-xl transition-all active:scale-95 ${
            isManager ? "bg-indigo-600 hover:bg-indigo-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isManager ? "REVIEW TEAM CLAIMS" : "+ NEW EXPENSE"}
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </header>

      {/* --- STAT CARDS SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {isManager ? (
          <>
            <StatCard title="Team Pending" value={stats.team.pendingCount} sub="Requests Awaiting" color="bg-orange-500" textColor="text-orange-600" />
            <StatCard title="Total Team Spend" value={stats.team.totalSpend} sub="Current Month" color="bg-indigo-600" textColor="text-slate-900" />
            <StatCard title="Approval Rate" value={stats.team.rate} sub="Process Efficiency" color="bg-green-500" textColor="text-green-600" />
          </>
        ) : (
          <>
            <StatCard title="To Submit" value={stats.personal.toSubmit} sub="Saved Drafts" color="bg-yellow-400" textColor="text-yellow-600" />
            <StatCard title="Waiting Approval" value={stats.personal.pending} sub="In Review" color="bg-blue-500" textColor="text-blue-600" />
            <StatCard title="Total Approved" value={stats.personal.approved} sub="Lifetime" color="bg-green-500" textColor="text-green-600" />
          </>
        )}
      </div>

      {/* --- RECENT ACTIVITY SECTION --- */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">
              {isManager ? "Team Submission Log" : "Recent Activity"}
            </h3>
            <p className="text-gray-400 text-sm font-medium">Last updated: Just now</p>
          </div>
          <button onClick={() => navigate(isManager ? "/app/approvals" : "/app/my-expenses")} className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition">
            View All
          </button>
        </div>

        {/* Empty State Mockup */}
        <div className="flex flex-col items-center justify-center py-20 border-4 border-dotted border-gray-50 rounded-[2rem]">
          <div className="text-5xl mb-4 opacity-20">📂</div>
          <p className="text-gray-400 font-bold italic">No recent transactions found for this period.</p>
          {!isManager && (
            <button onClick={() => navigate("/app/submit")} className="mt-4 text-blue-600 font-black text-sm hover:underline">
              Create your first claim now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable StatCard Component
const StatCard = ({ title, value, sub, color, textColor }) => (
  <div className="group bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
    <div className={`absolute top-0 left-0 w-2 h-full ${color}`}></div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em]">{title}</p>
    <p className={`text-4xl font-black mt-3 tracking-tighter ${textColor}`}>{value}</p>
    <p className="text-xs text-gray-400 font-bold mt-2 flex items-center gap-1">
      <span className="inline-block w-1 h-1 rounded-full bg-gray-300"></span>
      {sub}
    </p>
  </div>
);

export default Dashboard;
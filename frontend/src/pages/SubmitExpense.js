// import { useState } from "react";
// import api from "../services/api";

// const SubmitExpense = () => {
//   const [form, setForm] = useState({
//     amount: "",
//     currency: "",
//     category: "",
//     description: "",
//     date: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await api.post("/expenses", form);

//       alert("Expense submitted successfully");

//       // reset form
//       setForm({
//         amount: "",
//         currency: "",
//         category: "",
//         description: "",
//         date: "",
//       });

//     } catch (err) {
//       console.error(err);
//       alert("Failed to submit expense");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Submit Expense</h2>

//       <form onSubmit={handleSubmit} className="space-y-3">

//         <input
//           type="number"
//           name="amount"
//           placeholder="Amount"
//           value={form.amount}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />

//         <input
//           type="text"
//           name="currency"
//           placeholder="Currency (e.g. USD)"
//           value={form.currency}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />

//         <input
//           type="text"
//           name="category"
//           placeholder="Category"
//           value={form.category}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />

//         <input
//           type="text"
//           name="description"
//           placeholder="Description"
//           value={form.description}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />

//         <input
//           type="date"
//           name="date"
//           value={form.date}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-500 text-white p-2 rounded"
//         >
//           {loading ? "Submitting..." : "Submit Expense"}
//         </button>

//       </form>
//     </div>
//   );
// };

// export default SubmitExpense;
// src/pages/SubmitExpense.js
import React, { useState } from "react";
import api from "../services/api"; // Import your custom axios instance
import { useNavigate } from "react-router-dom";

export default function SubmitExpense() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    category: "Food",
    date: "",
    paidBy: "",
    remarks: "",
    amount: "",
    currency: "INR", // Based on your "Country Dropdown" logic
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // In a hackathon, ensure your backend endpoint matches (e.g., /expenses/create)
      await api.post("/expenses", formData);
      alert("Expense Submitted Successfully!");
      navigate("/app/dashboard");
    } catch (err) {
      alert("Failed to submit: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Submit Expense</h2>
            <p className="text-gray-500 text-sm">Fill in the details from your receipt</p>
          </div>
          <button 
            type="button"
            className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-semibold hover:bg-blue-100 transition"
          >
            <span>📎</span> Receipt +
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Description - Full Width */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <input 
              name="description"
              type="text" 
              required
              onChange={handleChange}
              placeholder="e.g. Client Dinner at Marriott"
              className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition" 
            />
          </div>

          {/* Amount & Currency */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Amount</label>
            <div className="flex">
              <select 
                name="currency"
                onChange={handleChange}
                className="border border-gray-200 border-r-0 rounded-l-lg p-3 bg-gray-50 text-sm font-bold"
              >
                <option value="INR">₹</option>
                <option value="USD">$</option>
                <option value="EUR">€</option>
              </select>
              <input 
                name="amount"
                type="number" 
                required
                onChange={handleChange}
                placeholder="0.00"
                className="w-full border border-gray-200 rounded-r-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
            <input 
              name="date"
              type="date" 
              required
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
            <select 
              name="category"
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="Food">Food & Beverage</option>
              <option value="Travel">Travel/Transport</option>
              <option value="Office">Office Supplies</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Paid By */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Paid By</label>
            <input 
              name="paidBy"
              type="text" 
              onChange={handleChange}
              placeholder="e.g. Self / Corporate Card"
              className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>

          {/* Remarks - Full Width */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Remarks</label>
            <textarea 
              name="remarks"
              rows="3"
              onChange={handleChange}
              placeholder="Any additional notes for the manager..."
              className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className={`col-span-2 mt-4 py-4 rounded-xl font-bold text-lg shadow-lg transform transition active:scale-95 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? "SUBMITTING..." : "SUBMIT EXPENSE"}
          </button>
        </form>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "employee", country: "India" });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/signup", formData);
      alert("Account created! Please login.");
      navigate("/login");
    } catch (err) {
      alert("Signup failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
            onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          
          <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          
          <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
            onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          
          <select className="w-full px-4 py-2 border rounded-lg" onChange={(e) => setFormData({...formData, role: e.target.value})}>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            
          </select>

          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
            Create Organization Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
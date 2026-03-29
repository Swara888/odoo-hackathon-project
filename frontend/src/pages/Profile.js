import React, { useState } from "react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [isParallel, setIsParallel] = useState(false); // Admin Logic

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* User Info Card */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-3xl font-black text-white">
            {user.name?.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900">{user.name}</h1>
            <p className="text-gray-500 font-medium">{user.email}</p>
            <span className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black uppercase rounded-full">
              {user.role} Account
            </span>
          </div>
        </div>

        {/* Admin Settings Card (From your Wireframe Logic) */}
        {user.role === 'admin' && (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-black text-gray-800 mb-6 underline decoration-blue-500 decoration-4 underline-offset-4">
              Organization Approval Rules
            </h2>
            
            <div className="space-y-6">
              {/* Toggle Logic */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div>
                  <p className="font-bold text-gray-700">Approval Workflow</p>
                  <p className="text-xs text-gray-400">Switch between Sequential or Parallel approval chains</p>
                </div>
                <button 
                  onClick={() => setIsParallel(!isParallel)}
                  className={`w-32 py-2 rounded-xl font-black text-[10px] transition ${
                    isParallel ? "bg-purple-600 text-white" : "bg-slate-800 text-white"
                  }`}
                >
                  {isParallel ? "PARALLEL" : "SEQUENTIAL"}
                </button>
              </div>

              {/* Approval Threshold */}
              <div className="p-4 bg-gray-50 rounded-2xl">
                <label className="font-bold text-gray-700 text-sm">Minimum Approval Threshold (%)</label>
                <input 
                  type="range" 
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-4 accent-blue-600" 
                />
                <div className="flex justify-between text-[10px] font-black text-gray-400 mt-2">
                  <span>50% (Majority)</span>
                  <span>100% (Unanimous)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Section */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Security</h2>
          <button className="text-sm font-bold text-blue-600 hover:underline">Change Password</button>
          <p className="text-xs text-gray-400 mt-1">Last login: Today, {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
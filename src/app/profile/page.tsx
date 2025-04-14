"use client";

import React, { useState } from 'react';
import { Pencil, X, LogOutIcon } from 'lucide-react';
import { useRouter } from "next/navigation";

interface Allergy {
  id: string;
  name: string;
  selected: boolean;
}

function Profile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('account');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [allergies, setAllergies] = useState<Allergy[]>([
    { id: '1', name: 'Gluten', selected: false },
    { id: '2', name: 'Lactose', selected: false },
    { id: '3', name: 'Eggs', selected: false },
    { id: '4', name: 'Nuts', selected: false },
    { id: '5', name: 'Soy', selected: false },
    { id: '6', name: 'Shellfish', selected: false },
  ]);

  // Security tab form state
  const [securityForm, setSecurityForm] = useState({
    name: '',
    phone: '+254',
    email: 'john.doe@example.com', // Example email, would come from backend
    password: '',
  });

  const handleSecurityFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecurityForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleAllergy = (id: string) => {
    setAllergies(allergies.map(allergy => 
      allergy.id === id ? { ...allergy, selected: !allergy.selected } : allergy
    ));
  };

  // Logout handler: route to the auth page
  const handleLogout = () => {
    router.push("/auth");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-xl text-gray-600 font-bold mb-6">Settings</h2>
          <nav>
            <button
              className={`w-full text-left p-3 text-gray-400 rounded-lg mb-2 ${
                activeTab === 'account' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('account')}
            >
              Account
            </button>
            <button
              className={`w-full text-left p-3 text-gray-400 rounded-lg ${
                activeTab === 'security' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('security')}
            >
              Security
            </button>
          </nav>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full text-left p-3 text-gray-400 rounded-lg mt-4 hover:bg-purple-100 flex items-center gap-2"
          >
            <LogOutIcon className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 text-gray-600">
        {activeTab === 'account' && (
          <div className="max-w-3xl mx-auto">
            {/* Profile Section */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100">
                  <Pencil className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <h2 className="mt-4 text-2xl font-bold">John Doe</h2>
            </div>

            {/* User Metrics */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">User Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Age"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Weight"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Allergies Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Allergies</h3>
              <div className="flex flex-wrap gap-3">
                {allergies.map((allergy) => (
                  <button
                    key={allergy.id}
                    onClick={() => toggleAllergy(allergy.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                      allergy.selected
                        ? 'bg-purple-100 border-purple-500 text-purple-700'
                        : 'border-gray-300 hover:border-purple-500'
                    }`}
                  >
                    {allergy.name}
                    {allergy.selected && (
                      <X className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Cancel Changes
              </button>
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
              
              {/* Security Form */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <label className="w-24 text-sm font-medium text-gray-700">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={securityForm.name}
                    onChange={handleSecurityFormChange}
                    placeholder="Name"
                    className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-24 text-sm font-medium text-gray-700">Phone:</label>
                  <input
                    type="tel"
                    name="phone"
                    value={securityForm.phone}
                    onChange={handleSecurityFormChange}
                    placeholder="+254"
                    className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-24 text-sm font-medium text-gray-700">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={securityForm.email}
                    disabled
                    className="flex-1 p-2 border rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-24 text-sm font-medium text-gray-700">Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={securityForm.password}
                    onChange={handleSecurityFormChange}
                    placeholder="Password"
                    className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Cancel Changes
                </button>
                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { ProgressRing } from '@/components/ProgressRing';
import { BottomNav } from '@/components/BottomNav';
import { Header } from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

// Sidebar Component
function Sidebar() {
  const navigate = useNavigate();

  // Define navigation items
  const navItems = [
    { label: 'Home', path: '/dashboard' },
    { label: 'Feedback', path: '/feedback' },
    { label: 'Meal Plan', path: '/mealplan' },
    { label: 'Progress', path: '/progress' },
  ];

  // Logout handler: call Supabase signOut then navigate to /auth
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <div className="w-64 min-h-screen bg-white shadow-md">
      <div className="p-4">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className="block w-full text-left py-2 px-4 hover:bg-gray-100"
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="block w-full text-left py-2 px-4 mt-4 hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

// Home Page Component
function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex">
      {/* Sidebar Navigation */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1">
        <Header />
        
        {/* Today's Progress Section */}
        <motion.section 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="px-4 py-4"
          aria-labelledby="progress-heading"
        >
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 id="progress-heading" className="font-semibold text-lg">Today's Progress</h2>
              <button className="text-blue-600 text-sm hover:text-blue-700 transition-colors">
                View more
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <ProgressRing progress={20} color="#3b82f6">
                    <span className="text-sm font-medium">1,284</span>
                  </ProgressRing>
                  <span className="text-xs text-gray-500 mt-1 block">Calories</span>
                </div>
                <div className="text-center">
                  <ProgressRing progress={65} color="#10b981">
                    <span className="text-xs font-medium">20%</span>
                  </ProgressRing>
                  <span className="text-xs text-gray-500 mt-1 block">Protein</span>
                </div>
                <div className="text-center">
                  <ProgressRing progress={85} color="#6366f1">
                    <span className="text-xs font-medium">85%</span>
                  </ProgressRing>
                  <span className="text-xs text-gray-500 mt-1 block">Water</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-sm">
                  <p className="text-gray-600">Keep the pace!</p>
                  <p className="font-medium">You're doing great.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
        
        {/* Food Images Section */}
        <motion.section 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.2, duration: 0.5 }}
          className="px-4 space-y-4"
        >
          <motion.div 
            className="rounded-2xl overflow-hidden shadow-sm"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80" 
              alt="Healthy breakfast bowl with fruits and grains" 
              className="w-full h-48 object-cover"
            />
          </motion.div>
          <motion.div 
            className="rounded-2xl overflow-hidden shadow-sm"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80" 
              alt="Grilled salmon with vegetables" 
              className="w-full h-48 object-cover"
            />
          </motion.div>
        </motion.section>

        <BottomNav />
      </div>
    </div>
  );
}

export default Home;
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChefHat, ListTodo, MessageCircle } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

function NavItem({ icon, label, isActive = false }: NavItemProps) {
  return (
    <button 
      className={`flex flex-col items-center ${isActive ? 'text-blue-600' : 'text-gray-400'}`}
      aria-label={label}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
}

export function BottomNav() {
  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 px-6 py-2 shadow-lg"
    >
      <nav className="flex justify-between items-center" aria-label="Main navigation">
        <NavItem icon={<Calendar className="w-6 h-6" />} label="Today" isActive={true} />
        <NavItem icon={<ChefHat className="w-6 h-6" />} label="Meal Plan" />
        <NavItem icon={<ListTodo className="w-6 h-6" />} label="Grocery List" />
        <NavItem icon={<MessageCircle className="w-6 h-6" />} label="Chat" />
      </nav>
    </motion.div>
  );
}
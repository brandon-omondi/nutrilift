import { motion } from 'framer-motion';
import { MoreHorizontal } from 'lucide-react';

export function Header() {
  return (
    <header className="px-4 py-6 flex justify-between items-center">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center gap-2"
      >
        <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
      <button 
        aria-label="More options"
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <MoreHorizontal className="text-gray-600 w-5 h-5" />
      </button>
    </header>
  );
}
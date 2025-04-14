import { motion } from 'framer-motion';

interface MealCardProps {
  image: string;
  title: string;
  calories: number;
  time: string;
}

export function MealCard({ image, title, calories, time }: MealCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl overflow-hidden shadow-lg"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
        <div className="flex items-center justify-between text-white/90 text-sm">
          <span>{calories} kcal</span>
          <span>{time}</span>
        </div>
      </div>
    </motion.div>
  );
}
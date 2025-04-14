"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

type FeedbackOption =
  | 'Application bugs'
  | 'Customer service'
  | 'Slow loading'
  | 'Bad navigation'
  | 'Weak functionality'
  | 'Other problems';

function Feedback() {
  const router = useRouter();
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<FeedbackOption[]>([]);
  const [notes, setNotes] = useState('');

  const feedbackOptions: FeedbackOption[] = [
    'Application bugs',
    'Customer service',
    'Slow loading',
    'Bad navigation',
    'Weak functionality',
    'Other problems'
  ];

  const emojis = ['😢', '🙁', '😐', '🙂', '😍'];

  const handleOptionToggle = (option: FeedbackOption) => {
    setSelectedOptions(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6">
      {/* Centered container with max-width for desktop */}
      <div className="max-w-3xl mx-auto">
        {/* Header with Back and Skip buttons */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="flex items-center text-gray-800"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="ml-2">Back</span>
          </motion.button>
          <button className="text-blue-500 text-sm">Skip</button>
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            How was your overall experience?
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            It will help us to serve you better.
          </p>

          <div className="flex justify-between mt-6">
            {emojis.map((emoji, index) => (
              <motion.button
                key={index}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedRating(index)}
                className={`text-3xl ${
                  selectedRating === index ? 'transform scale-110' : ''
                }`}
              >
                {emoji}
              </motion.button>
            ))}
          </div>

          <h2 className="text-lg font-semibold mt-8 text-gray-800">
            What is wrong?
          </h2>
          <div className="flex flex-wrap gap-2 mt-3">
            {feedbackOptions.map((option) => (
              <motion.button
                key={option}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOptionToggle(option)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedOptions.includes(option)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {option}
              </motion.button>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800">Notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How can we do better?"
              className="w-full mt-3 p-3 border border-gray-200 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full bg-purple-600 text-white py-4 rounded-lg mt-8 font-medium"
          >
            Submit Feedback
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
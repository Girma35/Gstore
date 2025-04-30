'use client';

import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <motion.div
        className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"
        aria-label="Loading"
      />
    </div>
  );
};

export default Loading;

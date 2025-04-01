import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/paintings/9.jpg"
          alt="Seasonal Freshness by Annibale Pace"
          className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6"
        >
          Annibale Pace
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-200 mb-8"
        >
          Contemporary Artist
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <a
            href="/portfolio"
            className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition-colors"
          >
            View Portfolio
          </a>
          <a
            href="/gallery"
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
          >
            Gallery
          </a>
        </motion.div>
      </div>
    </div>
  );
} 
'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchTrending } from '@/lib/features/contentSlice';
import { TrendingUp, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrendingSection() {
  const dispatch = useAppDispatch();
  const trending = useAppSelector(state => state.content.trending);

  useEffect(() => {
    dispatch(fetchTrending());
  }, [dispatch]);

  if (trending.length === 0) {
    return null;
  }

  return (
    <div className="p-6 border-b border-gray-200/20 dark:border-gray-700/20">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="h-5 w-5 text-orange-500" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Trending Now
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trending.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-4 border border-orange-200/20 dark:border-orange-700/20 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 dark:text-orange-400 font-bold text-sm">
                  #{index + 1}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  {item.source}
                </p>
                <button className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 text-xs flex items-center space-x-1">
                  <ExternalLink className="h-3 w-3" />
                  <span>Read</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
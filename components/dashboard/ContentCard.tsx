'use client';

import { useState } from 'react';
import { Heart, ExternalLink, Share2, Clock } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addFavorite, removeFavorite } from '@/lib/features/userSlice';
import { ContentItem } from '@/lib/features/contentSlice';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

interface ContentCardProps {
  item: ContentItem;
  index: number;
}

export default function ContentCard({ item, index }: ContentCardProps) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.user.favorites);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isFavorite = favorites.includes(item.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(item.id));
    } else {
      dispatch(addFavorite(item.id));
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'news':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'movie':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'social':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-sm border border-gray-200/20 dark:border-gray-700/20 overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      <div className="relative">
        <div className="aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse" />
          )}
        </div>
        
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
            {item.type}
          </span>
        </div>

        <div className="absolute top-4 right-4 flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavoriteToggle}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isFavorite
                ? 'bg-red-500 text-white'
                : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart className="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} />
          </motion.button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {item.source}
          </span>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4 mr-1" />
            {formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {item.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-sm"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Read More</span>
            </motion.button>
          </div>

          <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
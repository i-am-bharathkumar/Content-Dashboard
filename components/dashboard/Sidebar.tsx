'use client';

import { Home, TrendingUp, Heart, Bookmark, Settings, Filter } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setActiveFilter } from '@/lib/features/contentSlice';
import { motion } from 'framer-motion';

const menuItems = [
  { id: 'all', label: 'All Content', icon: Home },
  { id: 'news', label: 'News', icon: Filter },
  { id: 'movie', label: 'Movies', icon: Filter },
  { id: 'social', label: 'Social', icon: Filter },
];

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const activeFilter = useAppSelector(state => state.content.activeFilter);
  const favorites = useAppSelector(state => state.user.favorites);

  return (
    <aside className="w-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-r border-gray-200/20 dark:border-gray-700/20 h-screen sticky top-0">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeFilter === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => dispatch(setActiveFilter(item.id as any))}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Quick Access
          </h3>
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <TrendingUp className="h-5 w-5" />
              <span className="font-medium">Trending</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Heart className="h-5 w-5" />
              <span className="font-medium">Favorites</span>
              <span className="ml-auto text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                {favorites.length}
              </span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Bookmark className="h-5 w-5" />
              <span className="font-medium">Saved</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
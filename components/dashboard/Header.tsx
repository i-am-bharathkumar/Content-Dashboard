'use client';

import { useState } from 'react';
import { Search, Settings, Moon, Sun, Bell, User } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { toggleTheme, toggleSettings } from '@/lib/features/userSlice';
import { setSearchQuery } from '@/lib/features/contentSlice';
import { useDebounce } from 'use-debounce';
import { useEffect } from 'react';

export default function Header() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.user.theme);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearchInput] = useDebounce(searchInput, 300);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchInput));
  }, [debouncedSearchInput, dispatch]);

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/20 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Content Dashboard
          </h1>
        </div>

        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>

          <button
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>

          <button
            onClick={() => dispatch(toggleSettings())}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>

          <button
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Profile"
          >
            <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
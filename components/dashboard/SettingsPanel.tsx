'use client';

import { useState } from 'react';
import { X, Save } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { toggleSettings, setPreferences } from '@/lib/features/userSlice';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  { id: 'technology', label: 'Technology', description: 'Latest tech news and innovations' },
  { id: 'business', label: 'Business', description: 'Market trends and business insights' },
  { id: 'entertainment', label: 'Entertainment', description: 'Movies, TV shows, and celebrity news' },
  { id: 'sports', label: 'Sports', description: 'Sports news and updates' },
  { id: 'science', label: 'Science', description: 'Scientific discoveries and research' },
  { id: 'health', label: 'Health', description: 'Health and wellness information' },
];

const languages = [
  { id: 'en', label: 'English' },
  { id: 'es', label: 'Spanish' },
  { id: 'fr', label: 'French' },
  { id: 'de', label: 'German' },
];

const countries = [
  { id: 'us', label: 'United States' },
  { id: 'uk', label: 'United Kingdom' },
  { id: 'ca', label: 'Canada' },
  { id: 'au', label: 'Australia' },
];

export default function SettingsPanel() {
  const dispatch = useAppDispatch();
  const { isSettingsOpen, preferences } = useAppSelector(state => state.user);
  const [localPreferences, setLocalPreferences] = useState(preferences);

  const handleSave = () => {
    dispatch(setPreferences(localPreferences));
    dispatch(toggleSettings());
  };

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = localPreferences.categories.includes(categoryId)
      ? localPreferences.categories.filter(id => id !== categoryId)
      : [...localPreferences.categories, categoryId];
    
    setLocalPreferences(prev => ({ ...prev, categories: newCategories }));
  };

  return (
    <AnimatePresence>
      {isSettingsOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => dispatch(toggleSettings())}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-x-auto md:inset-y-8 md:w-2xl md:left-1/2 md:-translate-x-1/2 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200/20 dark:border-gray-700/20 z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Settings
              </h2>
              <button
                onClick={() => dispatch(toggleSettings())}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Content Preferences
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {categories.map(category => (
                      <label
                        key={category.id}
                        className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={localPreferences.categories.includes(category.id)}
                          onChange={() => handleCategoryToggle(category.id)}
                          className="mt-1 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                        />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {category.label}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {category.description}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Language
                    </label>
                    <select
                      value={localPreferences.language}
                      onChange={(e) => setLocalPreferences(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    >
                      {languages.map(lang => (
                        <option key={lang.id} value={lang.id}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Country
                    </label>
                    <select
                      value={localPreferences.country}
                      onChange={(e) => setLocalPreferences(prev => ({ ...prev, country: e.target.value }))}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    >
                      {countries.map(country => (
                        <option key={country.id} value={country.id}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => dispatch(toggleSettings())}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
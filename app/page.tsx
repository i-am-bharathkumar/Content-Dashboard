'use client';

import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import ContentGrid from '@/components/dashboard/ContentGrid';
import TrendingSection from '@/components/dashboard/TrendingSection';
import SettingsPanel from '@/components/dashboard/SettingsPanel';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="relative">
            <TrendingSection />
            <ContentGrid />
          </main>
        </div>
      </div>
      <SettingsPanel />
    </div>
  );
}
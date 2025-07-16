'use client';

import { useEffect } from 'react';
import { useAppSelector } from '@/lib/hooks';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useAppSelector(state => state.user.theme);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
}
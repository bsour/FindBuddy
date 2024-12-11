import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: true,
      toggleTheme: () => set((state) => {
        const newIsDark = !state.isDark;
        // Update document class for Tailwind dark mode
        if (newIsDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { isDark: newIsDark };
      }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

// Initialize theme on app load
if (typeof window !== 'undefined') {
  const isDark = useTheme.getState().isDark;
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
} 
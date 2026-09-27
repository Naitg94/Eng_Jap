import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type {
  LearningItem,
  PracticeConfig
} from '../types/learning';
import {
  loadAllSRSData
} from '../services/storage';
import { getDueItemsCount } from '../services/spacedRepetition';

export type ThemeMode = 'light' | 'dark';

interface AppContextType {
  dueCount: number;
  refreshStats: () => void;
  selectedModalItem: LearningItem | null;
  openCharacterModal: (item: LearningItem) => void;
  closeCharacterModal: () => void;
  quickPracticeConfig: Partial<PracticeConfig> | null;
  setQuickPracticeConfig: (cfg: Partial<PracticeConfig> | null) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dueCount, setDueCount] = useState<number>(0);
  const [selectedModalItem, setSelectedModalItem] = useState<LearningItem | null>(null);
  const [quickPracticeConfig, setQuickPracticeConfig] = useState<Partial<PracticeConfig> | null>(null);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('japanese_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const refreshStats = () => {
    const srsStore = loadAllSRSData();
    setDueCount(getDueItemsCount(srsStore));
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('japanese_theme', theme);
  }, [theme]);

  useEffect(() => {
    refreshStats();
  }, []);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const openCharacterModal = (item: LearningItem) => {
    setSelectedModalItem(item);
  };

  const closeCharacterModal = () => {
    setSelectedModalItem(null);
  };

  return (
    <AppContext.Provider
      value={{
        dueCount,
        refreshStats,
        selectedModalItem,
        openCharacterModal,
        closeCharacterModal,
        quickPracticeConfig,
        setQuickPracticeConfig,
        activeTab,
        setActiveTab,
        theme,
        toggleTheme,
        setTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

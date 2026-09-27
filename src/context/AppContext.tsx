import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type {
  LearningItem,
  PracticeConfig
} from '../types/learning';
import {
  loadAllSRSData
} from '../services/storage';
import { getDueItemsCount } from '../services/spacedRepetition';

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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dueCount, setDueCount] = useState<number>(0);
  const [selectedModalItem, setSelectedModalItem] = useState<LearningItem | null>(null);
  const [quickPracticeConfig, setQuickPracticeConfig] = useState<Partial<PracticeConfig> | null>(null);
  const [activeTab, setActiveTab] = useState<string>('home');

  const refreshStats = () => {
    const srsStore = loadAllSRSData();
    setDueCount(getDueItemsCount(srsStore));
  };

  useEffect(() => {
    // Keep clean light mode
    document.documentElement.classList.remove('dark');
    refreshStats();
  }, []);

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
        setActiveTab
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

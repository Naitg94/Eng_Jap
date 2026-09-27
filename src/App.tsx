import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Learn } from './pages/Learn';
import { Practice } from './pages/Practice';
import { Flashcards } from './pages/Flashcards';
import { CharacterCardModal } from './components/hiragana/CharacterCardModal';
import type { LearningItem } from './types/learning';

const MainApp: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    selectedModalItem,
    closeCharacterModal,
    setQuickPracticeConfig
  } = useApp();

  const handlePracticeWriting = (item: LearningItem) => {
    closeCharacterModal();
    setQuickPracticeConfig({
      selectedItemIds: [item.id],
      questionTypes: ['writing'],
      directions: ['romaji-to-hiragana'],
      questionCount: 5,
      sessionSource: 'random'
    });
    setActiveTab('practice');
  };

  const handlePracticeRecognition = (item: LearningItem) => {
    closeCharacterModal();
    setQuickPracticeConfig({
      selectedItemIds: [item.id],
      questionTypes: ['characters'],
      directions: ['hiragana-to-romaji'],
      questionCount: 5,
      sessionSource: 'random'
    });
    setActiveTab('practice');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-stone-900 font-sans selection:bg-red-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col">
        {activeTab === 'home' && <Home />}
        {activeTab === 'learn' && <Learn />}
        {activeTab === 'practice' && <Practice />}
        {activeTab === 'flashcards' && <Flashcards />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Character Detail Modal */}
      <CharacterCardModal
        item={selectedModalItem}
        onClose={closeCharacterModal}
        onPracticeWriting={handlePracticeWriting}
        onPracticeRecognition={handlePracticeRecognition}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

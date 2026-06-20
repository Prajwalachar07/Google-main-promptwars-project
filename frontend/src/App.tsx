import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Journal } from './pages/Journal';
import { Patterns } from './pages/Patterns';
import { StressMap } from './pages/StressMap';
import { Burnout } from './pages/Burnout';
import { Guidance } from './pages/Guidance';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'journal':
        return <Journal />;
      case 'patterns':
        return <Patterns />;
      case 'stress-map':
        return <StressMap />;
      case 'burnout':
        return <Burnout />;
      case 'guidance':
        return <Guidance />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070712] bg-dots text-foreground flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 flex flex-col overflow-hidden bg-white/[0.01]">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;

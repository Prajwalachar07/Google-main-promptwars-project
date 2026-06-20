import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Journal } from './pages/Journal';
import { History } from './pages/History';
import { Patterns } from './pages/Patterns';
import { Burnout } from './pages/Burnout';
import { StressMap } from './pages/StressMap';
import { Guidance } from './pages/Guidance';
import { Settings } from './pages/Settings';
import { Landing } from './pages/Landing';

const AppContent: React.FC = () => {
  const [isAppStarted, setIsAppStarted] = useState(() => {
    return localStorage.getItem('mindmitra_started') === 'true';
  });
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleStart = () => {
    localStorage.setItem('mindmitra_started', 'true');
    setIsAppStarted(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem('mindmitra_started');
    setIsAppStarted(false);
  };

  if (!isAppStarted) {
    return <Landing onStart={handleStart} />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'journal':
        return <Journal />;
      case 'history':
        return <History />;
      case 'patterns':
        return <Patterns />;
      case 'burnout':
        return <Burnout />;
      case 'guidance':
        return <Guidance />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070712] bg-dots text-foreground flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Customized sidebar including signout/back buttons */}
        <div className="flex flex-col justify-between border-r border-white/10 w-64 bg-background/50 backdrop-blur-md">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="p-4 border-t border-white/5">
            <button
              onClick={handleSignOut}
              className="w-full text-center text-xs text-muted-foreground hover:text-white py-2 rounded-xl hover:bg-white/5 font-bold transition"
            >
              Exit to Landing Page
            </button>
          </div>
        </div>

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

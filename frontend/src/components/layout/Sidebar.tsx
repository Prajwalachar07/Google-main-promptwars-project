import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Fingerprint, 
  Map, 
  Activity, 
  Lightbulb, 
  Settings,
  HelpCircle
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Wellness Intelligence', icon: LayoutDashboard },
    { id: 'journal', label: 'AI Journal & Editor', icon: BookOpen },
    { id: 'patterns', label: 'Hidden Stress Triggers', icon: Fingerprint },
    { id: 'stress-map', label: 'Stress Map Viz', icon: Map },
    { id: 'burnout', label: 'Burnout Assessment', icon: Activity },
    { id: 'guidance', label: 'AI Study Mentor', icon: Lightbulb },
  ];

  return (
    <aside className="w-64 border-r border-white/10 h-[calc(100vh-73px)] bg-background/50 backdrop-blur-md p-4 flex flex-col justify-between">
      <div className="flex flex-col gap-1">
        <p className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase px-4 mb-2">
          Dashboard Tabs
        </p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={isActive ? 'sidebar-item-active' : 'sidebar-item-inactive'}
            >
              <Icon className="h-4.5 w-4.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-2 mt-auto">
        <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-[11px] text-muted-foreground">
          <p className="font-semibold text-white mb-1">Disclaimer</p>
          MindMitra AI is an educational study advisor and cognitive tracker, not a medical or diagnostic utility.
        </div>
        
        <div className="text-[10px] text-center text-muted-foreground font-mono">
          v1.0.0 Stable Build
        </div>
      </div>
    </aside>
  );
};

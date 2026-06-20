import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Fingerprint, 
  Map, 
  Activity, 
  Lightbulb, 
  History,
  Settings
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Wellness Dashboard', icon: LayoutDashboard },
    { id: 'journal', label: 'AI Journal & Editor', icon: BookOpen },
    { id: 'history', label: 'Journals History', icon: History },
    { id: 'patterns', label: 'Stress Patterns', icon: Fingerprint },
    { id: 'stress-map', label: 'Stress Trigger Map', icon: Map },
    { id: 'burnout', label: 'Burnout Assessment', icon: Activity },
    { id: 'guidance', label: 'AI Study Mentor', icon: Lightbulb },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <aside className="w-full p-4 flex flex-col justify-between">
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
    </aside>
  );
};
export default Sidebar;

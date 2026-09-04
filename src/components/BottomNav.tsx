import React from 'react';
import { LayoutGrid, Package, Wrench, ClipboardCheck } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  pendingApprovalsCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  pendingApprovalsCount,
}) => {
  const tabs = [
    { id: 'overview' as TabType, label: 'ภาพรวม', icon: LayoutGrid },
    { id: 'assets' as TabType, label: 'ครุภัณฑ์', icon: Package },
    { id: 'maintenance' as TabType, label: 'ซ่อมบำรุง', icon: Wrench },
    {
      id: 'approvals' as TabType,
      label: 'เบิก-อนุมัติ',
      icon: ClipboardCheck,
      badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined,
    },
  ];

  return (
    <nav
      id="main-bottom-navigation"
      className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#e2e7ff] pb-safe"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 relative transition-colors ${
                isActive ? 'text-[#00236f]' : 'text-[#757682] hover:text-[#131b2e]'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge !== undefined && (
                  <span
                    id="approvals-badge-indicator"
                    className="absolute -top-1.5 -right-2 bg-[#dc2626] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white shadow-xs"
                  >
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[11px] mt-1 tracking-tight ${
                  isActive ? 'font-bold text-[#00236f]' : 'font-medium text-[#757682]'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-[#00236f] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

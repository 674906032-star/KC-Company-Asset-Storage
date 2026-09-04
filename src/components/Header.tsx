import React from 'react';
import { Bell } from 'lucide-react';
import { TabType, AdminProfile } from '../types';

interface HeaderProps {
  activeTab: TabType;
  unreadNotificationsCount?: number;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  adminProfile?: AdminProfile;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  unreadNotificationsCount = 3,
  onOpenNotifications,
  onOpenProfile,
  adminProfile,
}) => {
  const getSubhead = () => {
    switch (activeTab) {
      case 'overview':
        return 'Overview';
      case 'assets':
        return 'Asset Registry';
      case 'maintenance':
        return 'Maintenance';
      case 'approvals':
        return 'Approvals';
      case 'formats':
        return 'Standard Formats';
      default:
        return 'Overview';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#e2e7ff] px-4 py-2.5 transition-all print:hidden">
      <div className="flex items-center justify-between">
        {/* Left: KC Logo & Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00236f] to-[#1e3a8a] flex items-center justify-center shadow-sm text-white font-black tracking-tighter text-base">
            <span className="flex items-center">
              <span className="text-white font-bold text-lg">K</span>
              <span className="text-[#86f2e4] -ml-0.5 font-bold text-lg">C</span>
            </span>
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-wider text-[12px] text-[#00236f] font-serif uppercase">
                KC
              </span>
            </div>
            <span className="font-bold text-sm text-[#131b2e] leading-tight -mt-0.5">
              {getSubhead()}
            </span>
          </div>
        </div>

        {/* Right: Notifications Bell & Avatar */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            id="header-notification-btn"
            onClick={onOpenNotifications}
            className="relative p-2 rounded-full text-[#444651] hover:text-[#00236f] hover:bg-[#f2f3ff] transition-colors focus:outline-none"
            aria-label="การแจ้งเตือน"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#dc2626] rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          <button
            type="button"
            id="header-profile-btn"
            onClick={onOpenProfile}
            className="relative rounded-full ring-2 ring-[#e2e7ff] hover:ring-[#00236f] transition-all p-0.5 focus:outline-none group"
            aria-label="โปรไฟล์ผู้ใช้งาน"
            title={`ผู้ดูแล: ${adminProfile?.name || 'ผู้ดูแลระบบ'} (${adminProfile?.gmail || ''})`}
          >
            {adminProfile?.avatarUrl ? (
              <img
                src={adminProfile.avatarUrl}
                alt={adminProfile.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#00236f] text-white flex items-center justify-center text-xs font-bold font-sans">
                {adminProfile?.name?.charAt(0) || 'K'}
              </div>
            )}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#16a34a] border-2 border-white rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
};

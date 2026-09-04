import React from 'react';
import { X, Bell, CheckCheck, Clock, ArrowRight } from 'lucide-react';
import { NOTIFICATIONS } from '../data/mockData';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction?: (type: string) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  onSelectAction,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[85vh] overflow-y-auto p-5 shadow-2xl border border-[#e2e7ff] animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e7ff]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#00236f] text-white flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#131b2e]">การแจ้งเตือน</h3>
              <p className="text-xs text-[#757682]">อัปเดตสถานะทรัพย์สินและคำขอ</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-[#757682]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2.5 mt-3">
          {NOTIFICATIONS.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-2xl border transition-all ${
                n.unread
                  ? 'bg-[#f2f3ff] border-[#b6c4ff]'
                  : 'bg-white border-[#e2e7ff]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-xs font-bold text-[#131b2e]">
                  {n.title}
                </h4>
                {n.unread && (
                  <span className="w-2 h-2 rounded-full bg-[#dc2626] shrink-0 mt-1" />
                )}
              </div>
              <p className="text-xs text-[#444651] mt-1 leading-relaxed">
                {n.description}
              </p>
              <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#e2e7ff]/60 text-[10px] text-[#757682]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {n.time}
                </span>
                <span className="text-[#00236f] font-semibold flex items-center hover:underline cursor-pointer">
                  ดูรายการ
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

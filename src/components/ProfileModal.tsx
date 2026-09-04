import React from 'react';
import { X, UserCheck, Building, ShieldCheck, Mail, Phone, LogOut } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[85vh] overflow-y-auto p-5 shadow-2xl border border-[#e2e7ff] animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e7ff]">
          <h3 className="text-base font-bold text-[#131b2e]">โปรไฟล์ผู้ใช้งาน</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-[#757682]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-3.5 mt-4 p-3.5 bg-[#f2f3ff] rounded-2xl border border-[#e2e7ff]">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
              alt="คุณภัสสร"
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white shadow-xs"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#16a34a] border-2 border-white rounded-full" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-base font-bold text-[#131b2e]">
                ภัสสร ศิริโชคชัย
              </h4>
            </div>
            <p className="text-xs font-semibold text-[#00236f]">
              ผู้ดูแลพัสดุอาวุโส (Senior Asset Controller)
            </p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-[#dcfce7] text-[#16a34a] text-[10px] font-bold">
              สิทธิ์ผู้อนุมัติระดับ 2 (Approval Tier 2)
            </span>
          </div>
        </div>

        {/* Organization Info */}
        <div className="space-y-2.5 mt-4 text-xs">
          <div className="p-3 bg-white rounded-xl border border-[#e2e7ff] flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-[#444651]">
              <Building className="w-4 h-4 text-[#00236f]" />
              <span>องค์กร / สังกัด:</span>
            </div>
            <span className="font-bold text-[#131b2e]">KC ENTERPRISE CO., LTD.</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-[#e2e7ff] flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-[#444651]">
              <ShieldCheck className="w-4 h-4 text-[#006a61]" />
              <span>รหัสพนักงาน:</span>
            </div>
            <span className="font-mono font-bold text-[#131b2e]">EMP-KC-0419</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-[#e2e7ff] flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-[#444651]">
              <Mail className="w-4 h-4 text-[#757682]" />
              <span>อีเมล:</span>
            </div>
            <span className="font-mono text-[#131b2e]">passorn.s@kcenterprise.com</span>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-[#e2e7ff] text-[#dc2626] text-xs font-bold hover:bg-[#fee2e2]/50 transition-all flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>ปิดหน้าต่างโปรไฟล์</span>
          </button>
        </div>
      </div>
    </div>
  );
};

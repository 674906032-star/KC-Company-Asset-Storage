import React, { useState } from 'react';
import {
  X,
  Building,
  ShieldCheck,
  Mail,
  LogOut,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Edit3,
} from 'lucide-react';
import { AdminProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  adminProfile: AdminProfile;
  onUpdateAdminProfile: (updated: AdminProfile) => void;
  onShowToast?: (type: 'success' | 'error' | 'info', title: string, message?: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  adminProfile,
  onUpdateAdminProfile,
  onShowToast,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [gmailInput, setGmailInput] = useState(adminProfile.gmail || '');
  const [nameInput, setNameInput] = useState(adminProfile.name || '');
  const [roleInput, setRoleInput] = useState(adminProfile.role || 'ผู้ดูแลพัสดุอาวุโส (Senior Asset Controller)');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    let trimmedGmail = gmailInput.trim().toLowerCase();
    if (!trimmedGmail) {
      setErrorMsg('กรุณาระบุบัญชี Gmail ของผู้ดูแล');
      return;
    }

    // Auto-complete @gmail.com if user only typed username
    if (!trimmedGmail.includes('@')) {
      trimmedGmail = `${trimmedGmail}@gmail.com`;
    }

    // Check if it's a valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedGmail)) {
      setErrorMsg('รูปแบบที่อยู่อีเมลไม่ถูกต้อง');
      return;
    }

    // Auto generate name if empty
    let finalName = nameInput.trim();
    if (!finalName) {
      const usernamePart = trimmedGmail.split('@')[0];
      finalName = `ผู้ดูแล (${usernamePart})`;
    }

    const updatedProfile: AdminProfile = {
      ...adminProfile,
      name: finalName,
      gmail: trimmedGmail,
      role: roleInput.trim() || 'ผู้ดูแลพัสดุ (Asset Controller)',
      tier: 'สิทธิ์ผู้อนุมัติระดับ 2 (Approval Tier 2)',
    };

    onUpdateAdminProfile(updatedProfile);
    setIsEditing(false);
    if (onShowToast) {
      onShowToast('success', 'เปลี่ยนผู้ดูแลระบบเรียบร้อยแล้ว', `ผู้ดูแลปัจจุบัน: ${finalName} (${trimmedGmail})`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto p-5 shadow-2xl border border-[#e2e7ff] animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e7ff]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#00236f] text-white flex items-center justify-center font-bold text-xs">
              KC
            </div>
            <h3 className="text-base font-bold text-[#131b2e]">โปรไฟล์ผู้ดูแลระบบ</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-[#757682]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Profile Card (No image, only name and position) */}
        <div className="mt-4 p-4 bg-[#f2f3ff] rounded-2xl border border-[#e2e7ff] relative overflow-hidden">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#757682] block">
                ผู้ดูแลระบบปัจจุบัน (Active Admin)
              </span>
              <h4 className="text-lg font-bold text-[#131b2e] mt-0.5">
                {adminProfile.name}
              </h4>
              <p className="text-xs font-semibold text-[#00236f] mt-0.5">
                ตำแหน่ง: {adminProfile.role}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setGmailInput(adminProfile.gmail || '');
                setNameInput(adminProfile.name || '');
                setIsEditing(!isEditing);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-[#b6c4ff] text-[#00236f] text-xs font-semibold hover:bg-[#eaedff] flex items-center gap-1.5 shadow-2xs shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'ยกเลิก' : 'เปลี่ยนผู้ดูแล'}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-3 pt-2.5 border-t border-[#e2e7ff]/70">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#dcfce7] text-[#16a34a] text-[11px] font-bold">
              <CheckCircle2 className="w-3 h-3" />
              <span>{adminProfile.tier}</span>
            </span>
            <span className="font-mono text-xs font-semibold text-[#00236f] bg-white px-2 py-0.5 rounded border border-[#e2e7ff]">
              {adminProfile.gmail}
            </span>
          </div>
        </div>

        {/* Change Admin Form (When Editing or Prompted) */}
        {isEditing ? (
          <form onSubmit={handleSave} className="mt-4 p-4 rounded-2xl bg-[#faf8ff] border-2 border-[#00236f]/30 space-y-3">
            <div className="flex items-center justify-between border-b border-[#e2e7ff] pb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#00236f]">
                <Mail className="w-4 h-4" />
                <span>ระบุ Gmail เพื่อเปลี่ยนผู้ดูแลระบบ</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#e2e7ff] text-[#00236f] font-bold">
                KC Admin Core
              </span>
            </div>

            {errorMsg && (
              <div className="p-2 rounded-xl bg-[#fee2e2] text-[#dc2626] text-xs flex items-center gap-1.5 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label htmlFor="input-admin-gmail" className="block text-xs font-semibold text-[#444651] mb-1">
                บัญชี Gmail ของผู้ดูแลใหม่ <span className="text-[#dc2626]">*</span>
              </label>
              <div className="relative">
                <input
                  id="input-admin-gmail"
                  type="text"
                  value={gmailInput}
                  onChange={(e) => setGmailInput(e.target.value)}
                  placeholder="เช่น somchai.kc@gmail.com"
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-[#c5c5d3] focus:outline-none focus:ring-2 focus:ring-[#00236f] bg-white font-mono"
                  autoFocus
                />
                <Mail className="w-4 h-4 text-[#757682] absolute left-2.5 top-2.5" />
              </div>
              <span className="text-[10px] text-[#757682] mt-0.5 block">
                สามารถพิมพ์เฉพาะชื่อผู้ใช้ได้ ระบบจะต่อท้ายด้วย @gmail.com ให้อัตโนมัติ
              </span>
            </div>

            <div>
              <label htmlFor="input-admin-name" className="block text-xs font-semibold text-[#444651] mb-1">
                ชื่อ-นามสกุล ผู้ดูแล
              </label>
              <input
                id="input-admin-name"
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="เช่น วิทวัส วัฒนา (หรือเว้นว่างเพื่อใช้ชื่อจาก Gmail)"
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#c5c5d3] focus:outline-none focus:ring-2 focus:ring-[#00236f] bg-white"
              />
            </div>

            <div>
              <label htmlFor="input-admin-role" className="block text-xs font-semibold text-[#444651] mb-1">
                ตำแหน่ง / บทบาท
              </label>
              <input
                id="input-admin-role"
                type="text"
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
                placeholder="ผู้ดูแลพัสดุอาวุโส (Senior Asset Controller)"
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#c5c5d3] focus:outline-none focus:ring-2 focus:ring-[#00236f] bg-white"
              />
            </div>

            {/* Quick Gmail presets */}
            <div className="pt-1">
              <span className="text-[10px] font-semibold text-[#757682] block mb-1">ตัวเลือกตัวอย่างด่วน:</span>
              <div className="flex flex-wrap gap-1.5">
                {['admin.kc@gmail.com', 'asset.manager.kc@gmail.com', 'supervisor.kc@gmail.com'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setGmailInput(preset);
                      if (!nameInput) {
                        setNameInput(preset.split('@')[0]);
                      }
                    }}
                    className="px-2 py-0.5 rounded-lg bg-white border border-[#e2e7ff] text-[10px] font-mono text-[#00236f] hover:bg-[#f2f3ff]"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 py-2 rounded-xl border border-[#e2e7ff] text-xs font-semibold text-[#444651] hover:bg-slate-100"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                id="save-admin-gmail-btn"
                className="flex-1 py-2 rounded-xl bg-[#00236f] text-white text-xs font-bold hover:bg-[#1e3a8a] shadow-xs flex items-center justify-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>บันทึกผู้ดูแลใหม่</span>
              </button>
            </div>
          </form>
        ) : (
          /* Organization & Account Info */
          <div className="space-y-2.5 mt-4 text-xs">
            <div className="p-3 bg-white rounded-xl border border-[#e2e7ff] flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-[#444651]">
                <Building className="w-4 h-4 text-[#00236f]" />
                <span>องค์กร / สังกัด:</span>
              </div>
              <span className="font-extrabold text-[#00236f] text-sm">KC</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#e2e7ff] flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-[#444651]">
                <Mail className="w-4 h-4 text-[#ea4335]" />
                <span>บัญชี Gmail ผู้ดูแล:</span>
              </div>
              <span className="font-mono font-bold text-[#131b2e] bg-[#f2f3ff] px-2 py-0.5 rounded-md border border-[#e2e7ff]">
                {adminProfile.gmail}
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#e2e7ff] flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-[#444651]">
                <ShieldCheck className="w-4 h-4 text-[#006a61]" />
                <span>รหัสพนักงาน:</span>
              </div>
              <span className="font-mono font-bold text-[#131b2e]">
                {adminProfile.empId || 'EMP-KC-0419'}
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#e2e7ff] flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-[#444651]">
                <Sparkles className="w-4 h-4 text-[#00236f]" />
                <span>แผนก / ฝ่าย:</span>
              </div>
              <span className="font-semibold text-[#131b2e]">
                {adminProfile.department || 'KC Asset Administration'}
              </span>
            </div>
          </div>
        )}

        {/* Quick Action to switch admin if not editing */}
        {!isEditing && (
          <div className="mt-4">
            <button
              type="button"
              id="open-change-admin-btn"
              onClick={() => {
                setGmailInput(adminProfile.gmail || '');
                setNameInput(adminProfile.name || '');
                setIsEditing(true);
              }}
              className="w-full py-2.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#00236f] text-xs font-bold border border-[#b6c4ff] flex items-center justify-center gap-1.5 transition-all shadow-2xs"
            >
              <Mail className="w-4 h-4 text-[#ea4335]" />
              <span>เปลี่ยนผู้ดูแลระบบด้วย Gmail</span>
            </button>
          </div>
        )}

        <div className="pt-3">
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

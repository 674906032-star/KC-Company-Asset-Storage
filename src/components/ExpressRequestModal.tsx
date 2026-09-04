import React, { useState } from 'react';
import { X, ShoppingCart, Send } from 'lucide-react';
import { Asset, ApprovalRequest } from '../types';

interface ExpressRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  assets: Asset[];
  onAddApproval: (req: ApprovalRequest) => void;
}

export const ExpressRequestModal: React.FC<ExpressRequestModalProps> = ({
  isOpen,
  onClose,
  assets,
  onAddApproval,
}) => {
  const availableAssets = assets.filter((a) => a.status === 'available');
  const [selectedAssetId, setSelectedAssetId] = useState(
    availableAssets[0]?.id || assets[0]?.id || ''
  );
  const [requesterName, setRequesterName] = useState('คุณสิริพร นิลภักดี');
  const [department, setDepartment] = useState('ฝ่ายการตลาด');
  const [purpose, setPurpose] = useState('งานบันทึกวิดีโอสัมภาษณ์ผู้บริหารนอกสถานที่');
  const [location, setLocation] = useState('โรงแรมสยามเคมปินสกี้ กรุงเทพฯ');
  const [durationDays, setDurationDays] = useState('3');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const asset = assets.find((a) => a.id === selectedAssetId) || assets[0];

    const newReq: ApprovalRequest = {
      id: `app-${Date.now()}`,
      code: `REQ-OUT-2024-${Math.floor(100 + Math.random() * 900)}`,
      urgency: 'urgent',
      urgencyLabel: 'ด่วนพิเศษ',
      timeAgo: 'เมื่อสักครู่',
      requester: {
        name: requesterName.trim() || 'คุณสิริพร นิลภักดี',
        role: 'เจ้าหน้าที่ผู้ขอเบิก',
        department: department.trim() || 'ฝ่ายการตลาด',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
        phone: '081-456-7890',
      },
      period: {
        start: 'วันนี้ (ทันที)',
        end: `อีก ${durationDays} วัน`,
        durationText: `รวม ${durationDays} วัน`,
      },
      purpose: purpose.trim() || 'ใช้งานภายนอกตามภารกิจองค์กร',
      location: location.trim() || 'กรุงเทพมหานคร',
      items: [
        {
          code: asset.code,
          name: asset.name,
          condition: 'สภาพสมบูรณ์ 100%',
          imageUrl: asset.imageUrl,
          quantity: '1 รายการ',
        },
      ],
      totalValue: asset.price,
      approvalChain: [
        { step: 1, role: 'หัวหน้าแผนก', status: 'approved', label: 'อนุมัติแล้ว' },
        { step: 2, role: 'ผู้ดูแลทรัพย์สิน', status: 'pending', label: 'รอคุณอนุมัติ' },
        { step: 3, role: 'รปภ. ประตู 1', status: 'upcoming', label: 'ตรวจปล่อย' },
      ],
      status: 'pending',
    };

    onAddApproval(newReq);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto p-5 shadow-2xl border border-[#e2e7ff] animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e7ff]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#00236f] text-white flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#131b2e]">
                ขอเบิกด่วน / จองอุปกรณ์
              </h3>
              <p className="text-xs text-[#757682]">สร้างคำขอเบิกครุภัณฑ์นำออกนอกสถานที่</p>
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 mt-4">
          <div>
            <label className="text-xs font-bold text-[#131b2e] block mb-1">
              เลือกอุปกรณ์ที่ต้องการเบิก
            </label>
            <select
              value={selectedAssetId}
              onChange={(e) => setSelectedAssetId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#e2e7ff] text-xs text-[#131b2e] bg-white focus:outline-none focus:ring-2 focus:ring-[#00236f]"
            >
              {assets.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.code} - {a.name} ({a.statusLabel})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-xs font-bold text-[#131b2e] block mb-1">
                ชื่อผู้ขอเบิก
              </label>
              <input
                type="text"
                value={requesterName}
                onChange={(e) => setRequesterName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-[#e2e7ff] text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00236f]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#131b2e] block mb-1">
                แผนก / สังกัด
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#e2e7ff] text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00236f]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#131b2e] block mb-1">
              วัตถุประสงค์การใช้งาน
            </label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl border border-[#e2e7ff] text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00236f]"
            />
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div className="col-span-2">
              <label className="text-xs font-bold text-[#131b2e] block mb-1">
                สถานที่นำไปใช้งาน
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#e2e7ff] text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00236f]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#131b2e] block mb-1">
                ระยะเวลา (วัน)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#e2e7ff] text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00236f]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#00236f] text-white text-xs font-bold hover:bg-[#1e3a8a] active:scale-95 transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>ส่งคำขอเบิกด่วนเข้าระบบ Live Queue</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

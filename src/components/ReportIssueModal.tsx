import React, { useState } from 'react';
import { X, Wrench, AlertTriangle } from 'lucide-react';
import { MaintenanceTicket, MaintenanceTicketType, Asset } from '../types';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  assets: Asset[];
  onAddTicket: (ticket: MaintenanceTicket) => void;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  isOpen,
  onClose,
  assets,
  onAddTicket,
}) => {
  const [selectedAssetId, setSelectedAssetId] = useState(assets[0]?.id || '');
  const [ticketType, setTicketType] = useState<MaintenanceTicketType>('corrective');
  const [title, setTitle] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [contractor, setContractor] = useState('บจก. ไอที เซอร์วิส โซลูชั่น');
  const [estimatedCost, setEstimatedCost] = useState('2500');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const asset = assets.find((a) => a.id === selectedAssetId) || assets[0];

    const typeLabels: Record<MaintenanceTicketType, string> = {
      corrective: 'ซ่อมด่วน (Corrective)',
      pending_inspection: 'ซ่อมเสร็จ รอตรวจรับ',
      scheduled: 'รอช่างเข้าซ่อม',
    };

    const newTicket: MaintenanceTicket = {
      id: `rep-${Date.now()}`,
      code: `REP-2024-${Math.floor(100 + Math.random() * 900)}`,
      type: ticketType,
      typeLabel: typeLabels[ticketType],
      title: title.trim() || asset.name,
      issueDescription: issueDescription.trim() || 'แจ้งซ่อมอาการขัดข้องจากผู้ใช้งาน',
      assetCode: asset.code,
      contractor: contractor.trim() || 'ทีมช่างส่วนกลาง',
      estimatedCost: parseFloat(estimatedCost) || 0,
      timeAgo: 'เมื่อสักครู่',
      dateStr: 'วันนี้',
      imageUrl: asset.imageUrl,
      status: 'in_progress',
    };

    onAddTicket(newTicket);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto p-5 shadow-2xl border border-[#e2e7ff] animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e7ff]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#006a61] text-white flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#131b2e]">
                เปิดใบแจ้งซ่อมบำรุง (Maintenance Ticket)
              </h3>
              <p className="text-xs text-[#757682]">แจ้งอาการขัดข้องเพื่อส่งช่างหรือศูนย์บริการ</p>
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
              เลือกทรัพย์สินที่ต้องซ่อม
            </label>
            <select
              value={selectedAssetId}
              onChange={(e) => {
                setSelectedAssetId(e.target.value);
                const a = assets.find((x) => x.id === e.target.value);
                if (a) setTitle(a.name);
              }}
              className="w-full px-3 py-2 rounded-xl border border-[#e2e7ff] text-xs text-[#131b2e] bg-white focus:outline-none focus:ring-2 focus:ring-[#00236f]"
            >
              {assets.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.code} - {a.name} ({a.location})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-[#131b2e] block mb-1">
              ประเภทการแจ้งซ่อม
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTicketType('corrective')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  ticketType === 'corrective'
                    ? 'bg-[#fee2e2] text-[#dc2626] border-[#fecaca]'
                    : 'bg-white text-[#444651] border-[#e2e7ff]'
                }`}
              >
                • ซ่อมด่วน (Corrective)
              </button>
              <button
                type="button"
                onClick={() => setTicketType('scheduled')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  ticketType === 'scheduled'
                    ? 'bg-[#eaedff] text-[#00236f] border-[#b6c4ff]'
                    : 'bg-white text-[#444651] border-[#e2e7ff]'
                }`}
              >
                • รอช่างเข้าซ่อม
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#131b2e] block mb-1">
              อาการขัดข้อง / ปัญหาที่พบ
            </label>
            <textarea
              rows={3}
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              placeholder="ระบุอาการเสีย เช่น กระดาษติดบ่อย, สัมผัสหน้าจอไม่ติด, แอร์มีน้ำหยด..."
              required
              className="w-full px-3.5 py-2 rounded-xl border border-[#e2e7ff] text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00236f]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-xs font-bold text-[#131b2e] block mb-1">
                ศูนย์บริการ / ผู้รับเหมา
              </label>
              <input
                type="text"
                value={contractor}
                onChange={(e) => setContractor(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#e2e7ff] text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00236f]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#131b2e] block mb-1">
                ประมาณการค่าซ่อม (บาท)
              </label>
              <input
                type="number"
                value={estimatedCost}
                onChange={(e) => setEstimatedCost(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#e2e7ff] text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00236f]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#006a61] text-white text-xs font-bold hover:bg-[#005049] active:scale-95 transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <Wrench className="w-4 h-4" />
              <span>ยืนยันเปิดใบแจ้งซ่อม</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

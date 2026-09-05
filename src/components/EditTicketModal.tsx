import React, { useState, useEffect } from 'react';
import { X, Wrench, Trash2, CheckCircle2, AlertTriangle, Save, Clock } from 'lucide-react';
import { MaintenanceTicket, MaintenanceTicketType } from '../types';

interface EditTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: MaintenanceTicket | null;
  onUpdateTicket: (updated: MaintenanceTicket) => void;
  onDeleteTicket: (ticketId: string) => void;
}

export const EditTicketModal: React.FC<EditTicketModalProps> = ({
  isOpen,
  onClose,
  ticket,
  onUpdateTicket,
  onDeleteTicket,
}) => {
  const [title, setTitle] = useState('');
  const [assetCode, setAssetCode] = useState('');
  const [type, setType] = useState<MaintenanceTicketType>('corrective');
  const [issueDescription, setIssueDescription] = useState('');
  const [contractor, setContractor] = useState('');
  const [requester, setRequester] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [actualCost, setActualCost] = useState('');
  const [warrantyStatus, setWarrantyStatus] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (ticket) {
      setTitle(ticket.title || '');
      setAssetCode(ticket.assetCode || '');
      setType(ticket.type || 'corrective');
      setIssueDescription(ticket.issueDescription || '');
      setContractor(ticket.contractor || '');
      setRequester(ticket.requester || '');
      setEstimatedCost(ticket.estimatedCost !== undefined ? String(ticket.estimatedCost) : '');
      setActualCost(ticket.actualCost !== undefined ? String(ticket.actualCost) : '');
      setWarrantyStatus(ticket.warrantyStatus || '');
      setShowDeleteConfirm(false);
    }
  }, [ticket]);

  if (!isOpen || !ticket) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const typeLabels: Record<MaintenanceTicketType, string> = {
      corrective: 'ซ่อมด่วน (Corrective)',
      pending_inspection: 'ซ่อมเสร็จ รอตรวจรับ',
      scheduled: 'ตรวจรับมอบเรียบร้อย',
    };

    const updatedTicket: MaintenanceTicket = {
      ...ticket,
      title: title.trim() || ticket.title,
      assetCode: assetCode.trim() || ticket.assetCode,
      type,
      typeLabel: typeLabels[type],
      issueDescription: issueDescription.trim() || ticket.issueDescription,
      contractor: contractor.trim() || ticket.contractor,
      requester: requester.trim() || ticket.requester,
      estimatedCost: estimatedCost ? parseFloat(estimatedCost) : undefined,
      actualCost: actualCost ? parseFloat(actualCost) : undefined,
      warrantyStatus: warrantyStatus.trim() || undefined,
      status:
        type === 'scheduled'
          ? 'completed'
          : type === 'pending_inspection'
          ? 'ready_for_review'
          : 'in_progress',
    };

    onUpdateTicket(updatedTicket);
    onClose();
  };

  const handleDelete = () => {
    onDeleteTicket(ticket.id);
    setShowDeleteConfirm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[92vh] overflow-y-auto p-5 shadow-2xl border border-[#e2e7ff] animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e7ff]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#eaedff] text-[#00236f] flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black text-[#00236f]">
                  {ticket.code}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#f2f3ff] text-[#444651] text-[10px] font-bold">
                  {ticket.timeAgo || 'รายการซ่อม'}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#131b2e] leading-tight">
                แก้ไขรายละเอียดใบแจ้งซ่อม
              </h3>
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

        {/* Delete Confirmation Banner if active */}
        {showDeleteConfirm ? (
          <div className="mt-4 p-4 rounded-2xl bg-[#fee2e2] border border-[#fecaca] space-y-3 animate-in fade-in duration-150">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-[#dc2626] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#991b1b]">
                  ยืนยันการลบใบแจ้งซ่อมนี้หรือไม่?
                </h4>
                <p className="text-xs text-[#b91c1c] mt-0.5 leading-relaxed">
                  เมื่อลบแล้ว รายการใบแจ้งซ่อม <span className="font-mono font-bold">{ticket.code}</span> จะถูกลบออกจากระบบอย่างถาวร
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3 py-1.5 rounded-xl bg-white text-[#444651] text-xs font-semibold hover:bg-slate-50 border border-[#fecaca]"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                id="confirm-delete-ticket-btn"
                onClick={handleDelete}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#dc2626] text-white text-xs font-bold hover:bg-[#b91c1c] shadow-xs active:scale-95 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>ยืนยันลบรายการ</span>
              </button>
            </div>
          </div>
        ) : null}

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#131b2e] block mb-1">
                ชื่อรายการซ่อม / ครุภัณฑ์
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="เช่น เครื่องพิมพ์ Laser Multifunction"
                required
                className="w-full px-3 py-2 rounded-xl border border-[#e2e7ff] text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00236f]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#131b2e] block mb-1">
                รหัสครุภัณฑ์
              </label>
              <input
                type="text"
                value={assetCode}
                onChange={(e) => setAssetCode(e.target.value)}
                placeholder="เช่น KC-PRN-2024-001"
                className="w-full px-3 py-2 rounded-xl border border-[#e2e7ff] text-xs text-[#131b2e] font-mono focus:outline-none focus:ring-2 focus:ring-[#00236f]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#131b2e] block mb-1">
              สถานะ / ขั้นตอนงานซ่อม
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setType('corrective')}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                  type === 'corrective'
                    ? 'bg-[#fee2e2] text-[#dc2626] border-[#dc2626] shadow-xs'
                    : 'bg-white text-[#444651] border-[#e2e7ff] hover:bg-[#f8fafc]'
                }`}
              >
                ซ่อมด่วน (กำลังซ่อม)
              </button>

              <button
                type="button"
                onClick={() => setType('pending_inspection')}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                  type === 'pending_inspection'
                    ? 'bg-[#ccfbf1] text-[#0f766e] border-[#0f766e] shadow-xs'
                    : 'bg-white text-[#444651] border-[#e2e7ff] hover:bg-[#f8fafc]'
                }`}
              >
                รอตรวจรับงาน
              </button>

              <button
                type="button"
                onClick={() => setType('scheduled')}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                  type === 'scheduled'
                    ? 'bg-[#dcfce7] text-[#16a34a] border-[#16a34a] shadow-xs'
                    : 'bg-white text-[#444651] border-[#e2e7ff] hover:bg-[#f8fafc]'
                }`}
              >
                ตรวจรับแล้ว / เสร็จสิ้น
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#131b2e] block mb-1">
              อาการเสีย / รายละเอียดปัญหาที่แจ้ง
            </label>
            <textarea
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              rows={2}
              placeholder="ระบุอาการชำรุด หรือชิ้นส่วนที่ต้องเปลี่ยน..."
              required
              className="w-full px-3 py-2 rounded-xl border border-[#e2e7ff] text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00236f]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#131b2e] block mb-1">
                ผู้รับเหมา / ศูนย์บริการที่ดูแล
              </label>
              <input
                type="text"
                value={contractor}
                onChange={(e) => setContractor(e.target.value)}
                placeholder="เช่น บจก. ไอที เซอร์วิส หรือ ทีมช่างส่วนกลาง"
                className="w-full px-3 py-2 rounded-xl border border-[#e2e7ff] text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00236f]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#131b2e] block mb-1">
                ผู้แจ้งซ่อม (ชื่อ / แผนก)
              </label>
              <input
                type="text"
                value={requester}
                onChange={(e) => setRequester(e.target.value)}
                placeholder="เช่น คุณสมศรี แผนกการเงิน"
                className="w-full px-3 py-2 rounded-xl border border-[#e2e7ff] text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00236f]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label className="text-xs font-bold text-[#131b2e] block mb-1">
                ประมาณการค่าซ่อม (฿)
              </label>
              <input
                type="number"
                value={estimatedCost}
                onChange={(e) => setEstimatedCost(e.target.value)}
                placeholder="เช่น 2500"
                className="w-full px-3 py-2 rounded-xl border border-[#e2e7ff] text-xs text-[#131b2e] font-mono focus:outline-none focus:ring-2 focus:ring-[#00236f]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#131b2e] block mb-1">
                ยอดเบิกจ่ายจริง (฿)
              </label>
              <input
                type="number"
                value={actualCost}
                onChange={(e) => setActualCost(e.target.value)}
                placeholder="เช่น 2450"
                className="w-full px-3 py-2 rounded-xl border border-[#e2e7ff] text-xs text-[#131b2e] font-mono focus:outline-none focus:ring-2 focus:ring-[#00236f]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#131b2e] block mb-1">
                การรับประกันงานซ่อม
              </label>
              <input
                type="text"
                value={warrantyStatus}
                onChange={(e) => setWarrantyStatus(e.target.value)}
                placeholder="เช่น ประกันซ่อม 90 วัน"
                className="w-full px-3 py-2 rounded-xl border border-[#e2e7ff] text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00236f]"
              />
            </div>
          </div>

          {/* Action Buttons Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[#e2e7ff]">
            <button
              type="button"
              id="edit-ticket-delete-btn"
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[#dc2626] hover:bg-[#fee2e2] text-xs font-bold transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>ลบใบแจ้งซ่อม</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#444651] hover:bg-slate-100"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                id="edit-ticket-save-btn"
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#00236f] text-white text-xs font-bold hover:bg-[#1e3a8a] shadow-xs active:scale-95 transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>บันทึกการแก้ไข</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

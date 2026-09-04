import React, { useState } from 'react';
import {
  Zap,
  Phone,
  Calendar,
  MapPin,
  Camera,
  CheckCircle2,
  Hourglass,
  Shield,
  X,
  PenTool,
  MoreVertical,
  ChevronRight,
  Laptop,
  Check,
  RotateCcw,
  Clock,
} from 'lucide-react';
import { ApprovalRequest, ReturnHistoryItem } from '../types';

interface ApprovalsViewProps {
  approvals: ApprovalRequest[];
  returnHistory: ReturnHistoryItem[];
  onOpenSignatureModal: (request: ApprovalRequest) => void;
  onRejectRequest: (request: ApprovalRequest) => void;
  onSelectApprovalDetail: (request: ApprovalRequest) => void;
  onCallRequester: (phone: string, name: string) => void;
}

export const ApprovalsView: React.FC<ApprovalsViewProps> = ({
  approvals,
  returnHistory,
  onOpenSignatureModal,
  onRejectRequest,
  onSelectApprovalDetail,
  onCallRequester,
}) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'active' | 'history'>('pending');

  const pendingApprovals = approvals.filter((a) => a.status === 'pending');
  const urgentRequest = pendingApprovals.find((a) => a.urgency === 'urgent') || pendingApprovals[0];
  const otherPending = pendingApprovals.filter((a) => a.id !== urgentRequest?.id);
  const activeApprovals = approvals.filter((a) => a.status === 'approved');

  return (
    <div className="space-y-3.5 pb-28">
      {/* 1. Top Segmented Tabs */}
      <div className="bg-[#eaedff]/70 p-1 rounded-2xl flex items-center gap-1 border border-[#e2e7ff]">
        <button
          type="button"
          id="approvals-tab-pending"
          onClick={() => setActiveTab('pending')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'pending'
              ? 'bg-white text-[#00236f] shadow-xs'
              : 'text-[#444651] hover:text-[#131b2e]'
          }`}
        >
          <span>รออนุมัติ</span>
          {pendingApprovals.length > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#dc2626] text-white text-[10px] font-bold flex items-center justify-center">
              {pendingApprovals.length}
            </span>
          )}
        </button>

        <button
          type="button"
          id="approvals-tab-active"
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'active'
              ? 'bg-white text-[#00236f] shadow-xs'
              : 'text-[#444651] hover:text-[#131b2e]'
          }`}
        >
          <span>กำลังใช้งาน</span>
          <span className="text-[11px] text-[#757682] font-semibold">{activeApprovals.length}</span>
        </button>

        <button
          type="button"
          id="approvals-tab-history"
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'history'
              ? 'bg-white text-[#00236f] shadow-xs'
              : 'text-[#444651] hover:text-[#131b2e]'
          }`}
        >
          <span>ประวัติการคืน</span>
        </button>
      </div>

      {activeTab === 'pending' ? (
        <>
          {/* 2. Urgent Live Queue Banner */}
          {urgentRequest && (
            <div className="bg-[#eaedff] border border-[#c5c5d3]/60 rounded-2xl p-2.5 px-3.5 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00236f]">
                <Zap className="w-4 h-4 text-[#00236f] fill-[#00236f]" />
                <span>
                  มีรายการต้องตัดสินใจเร่งด่วน 1 รายการ
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#86f2e4] text-[#004f47] text-[10px] font-extrabold tracking-wide">
                Live Queue
              </span>
            </div>
          )}

          {/* 3. Main Urgent Request Card */}
          {urgentRequest ? (
            <div
              id={`approval-urgent-card-${urgentRequest.code}`}
              className="bg-white rounded-2xl border-2 border-[#ffdad6] shadow-sm overflow-hidden"
            >
              {/* Top Bar with red indicator */}
              <div className="bg-[#fff8f7] px-4 py-2.5 border-b border-[#ffdad6] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#dc2626] rounded-full" />
                  <span className="font-mono text-sm font-extrabold text-[#131b2e]">
                    {urgentRequest.code}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#fee2e2] text-[#dc2626] text-[10px] font-extrabold">
                    {urgentRequest.urgencyLabel}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#757682]">
                  <span className="text-[11px]">{urgentRequest.timeAgo}</span>
                  <button
                    type="button"
                    onClick={() => onSelectApprovalDetail(urgentRequest)}
                    className="p-1 hover:bg-slate-100 rounded-full"
                  >
                    <MoreVertical className="w-4 h-4 text-[#757682]" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-3.5">
                {/* Requester Profile Row */}
                <div className="bg-[#f2f3ff] rounded-2xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={urgentRequest.requester.avatar}
                      alt={urgentRequest.requester.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-white"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-[#131b2e]">
                        {urgentRequest.requester.name}
                      </h4>
                      <p className="text-[11px] text-[#444651] mt-0.5">
                        {urgentRequest.requester.role} • {urgentRequest.requester.department}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    id="call-requester-btn"
                    onClick={() =>
                      onCallRequester(
                        urgentRequest.requester.phone,
                        urgentRequest.requester.name
                      )
                    }
                    className="w-9 h-9 rounded-xl bg-white border border-[#e2e7ff] text-[#00236f] flex items-center justify-center hover:bg-[#eaedff] active:scale-95 transition-all shadow-xs"
                    title={`โทร ${urgentRequest.requester.phone}`}
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                </div>

                {/* Timeline & Location Section */}
                <div className="bg-[#faf8ff] rounded-2xl p-3 border border-[#e2e7ff] space-y-2">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-[#006a61] mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[11px] text-[#757682] block">
                        ระยะเวลานำออก
                      </span>
                      <p className="text-xs font-bold text-[#131b2e]">
                        {urgentRequest.period.start} → {urgentRequest.period.end}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-[#eaedff] text-[#00236f] text-[10px] font-semibold">
                        {urgentRequest.period.durationText}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-2 border-t border-[#e2e7ff]">
                    <MapPin className="w-4 h-4 text-[#006a61] mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[11px] text-[#757682] block">
                        วัตถุประสงค์และสถานที่ใช้งาน
                      </span>
                      <p className="text-xs font-bold text-[#131b2e] truncate">
                        {urgentRequest.purpose}
                      </p>
                      <p className="text-[11px] text-[#444651] truncate">
                        {urgentRequest.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Requested Items Section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#131b2e]">
                      <Camera className="w-3.5 h-3.5 text-[#00236f]" />
                      <span>อุปกรณ์ที่ขอเบิก ({urgentRequest.items.length} รายการ)</span>
                    </div>
                    <span className="text-xs font-bold text-[#006a61]">
                      มูลค่ารวม ฿{urgentRequest.totalValue.toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {urgentRequest.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-[#f2f3ff] rounded-xl p-2 border border-[#e2e7ff] flex flex-col justify-between"
                      >
                        <div className="relative rounded-lg overflow-hidden h-24 mb-2 bg-slate-200">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-black/60 text-white font-mono text-[9px]">
                            {item.code}
                          </span>
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-[#131b2e] truncate">
                            {item.name}
                          </h5>
                          <div className="flex items-center justify-between mt-1 text-[10px]">
                            <span className="text-[#757682] truncate">
                              {item.condition}
                            </span>
                            <span className="px-1.5 py-0.2 rounded-md bg-[#86f2e4] text-[#004f47] font-bold shrink-0">
                              {item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Approval Chain Timeline */}
                <div className="bg-[#f2f3ff]/70 rounded-2xl p-3 border border-[#e2e7ff]">
                  <span className="text-[10px] font-bold text-[#757682] tracking-wider uppercase block text-center mb-2.5">
                    ลำดับขั้นตอนการอนุมัติ (APPROVAL CHAIN)
                  </span>

                  <div className="relative flex items-center justify-between px-2">
                    {/* Background Connecting line */}
                    <div className="absolute top-3.5 left-8 right-8 h-0.5 bg-[#cbd5e1] -z-0" />

                    {urgentRequest.approvalChain.map((step) => (
                      <div
                        key={step.step}
                        className="relative z-10 flex flex-col items-center text-center"
                      >
                        {step.status === 'approved' && (
                          <div className="w-7 h-7 rounded-full bg-[#16a34a] text-white flex items-center justify-center shadow-xs">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                        )}
                        {step.status === 'pending' && (
                          <div className="w-7 h-7 rounded-full bg-[#00236f] text-white flex items-center justify-center shadow-xs animate-pulse">
                            <Hourglass className="w-3.5 h-3.5" />
                          </div>
                        )}
                        {step.status === 'upcoming' && (
                          <div className="w-7 h-7 rounded-full bg-[#cbd5e1] text-white flex items-center justify-center shadow-xs">
                            <Shield className="w-3.5 h-3.5" />
                          </div>
                        )}

                        <span className="text-[11px] font-bold text-[#131b2e] mt-1.5">
                          {step.role}
                        </span>
                        <span
                          className={`text-[10px] font-semibold ${
                            step.status === 'approved'
                              ? 'text-[#16a34a]'
                              : step.status === 'pending'
                              ? 'text-[#dc2626]'
                              : 'text-[#757682]'
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <button
                    type="button"
                    id="approval-reject-btn"
                    onClick={() => onRejectRequest(urgentRequest)}
                    className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[#fee2e2] text-[#dc2626] text-xs font-bold hover:bg-[#fecaca] active:scale-95 transition-all"
                  >
                    <X className="w-4 h-4 stroke-[2.5]" />
                    <span>ปฏิเสธ</span>
                  </button>

                  <button
                    type="button"
                    id="approval-sign-btn"
                    onClick={() => onOpenSignatureModal(urgentRequest)}
                    className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[#00236f] text-white text-xs font-bold hover:bg-[#1e3a8a] active:scale-95 transition-all shadow-md"
                  >
                    <PenTool className="w-4 h-4" />
                    <span>ลงนามอนุมัติ</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center border border-[#e2e7ff] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#eaedff] text-[#00236f] flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6 text-[#00236f]" />
              </div>
              <p className="text-sm font-bold text-[#131b2e]">
                ไม่มีคำขอเบิกที่ค้างพิจารณา
              </p>
              <p className="text-xs text-[#757682] mt-1 max-w-xs mx-auto">
                คำขอเบิกเดิมถูกล้างข้อมูลเรียบร้อยแล้ว คุณสามารถส่งคำขอเบิกครุภัณฑ์รายการใหม่ได้ทันที
              </p>
            </div>
          )}

          {/* 4. Other Pending Approvals Section */}
          {otherPending.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#131b2e]">
                  รายการรอตรวจสอบอื่น ๆ
                </h3>
                <span className="text-[11px] text-[#757682]">
                  {otherPending.length} รายการ
                </span>
              </div>

              {otherPending.map((req) => (
                <div
                  key={req.id}
                  id={`pending-other-${req.code}`}
                  onClick={() => onSelectApprovalDetail(req)}
                  className="bg-white rounded-2xl p-3.5 border border-[#e2e7ff] shadow-xs cursor-pointer hover:border-[#00236f] transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#131b2e]">
                        {req.code}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#00236f] text-[10px] font-bold">
                        {req.urgencyLabel}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#757682]">{req.timeAgo}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#86f2e4] text-[#004f47] flex items-center justify-center font-bold text-xs shrink-0">
                      {req.requester.name.slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold text-[#131b2e] truncate">
                        {req.requester.name}
                      </h5>
                      <p className="text-[11px] text-[#757682] truncate">
                        {req.requester.department}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#f2f3ff] rounded-xl p-2 mt-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <Laptop className="w-4 h-4 text-[#00236f] shrink-0" />
                      <div className="truncate">
                        <span className="font-bold text-[#131b2e] truncate block text-xs">
                          {req.items[0]?.name}
                        </span>
                        <span className="text-[10px] text-[#757682] font-mono">
                          รหัสครุภัณฑ์: {req.items[0]?.code}
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-white text-[#00236f] text-[10px] font-bold shrink-0 ml-2">
                      {req.items[0]?.quantity || '1 เครื่อง'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2.5 text-xs text-[#757682]">
                    <span className="text-[11px]">
                      กำหนดส่งคืน: {req.returnDeadline || 'ตามกำหนด'}
                    </span>
                    <span className="text-[#00236f] font-bold flex items-center">
                      ตรวจสอบ <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 5. Recent Return History Section */}
          {returnHistory.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                  <h3 className="text-xs font-bold text-[#131b2e]">
                    ประวัติการคืนล่าสุด
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('history')}
                  className="text-xs text-[#00236f] font-semibold hover:underline"
                >
                  ดูทั้งหมด
                </button>
              </div>

              {returnHistory.map((ret) => (
                <div
                  key={ret.id}
                  className="bg-white rounded-2xl p-3 border border-[#e2e7ff] shadow-xs flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-[#dcfce7] text-[#16a34a] flex items-center justify-center shrink-0">
                      <RotateCcw className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold text-[#131b2e]">
                          {ret.code}
                        </span>
                        <span className="px-1.5 py-0.2 rounded-md bg-[#dcfce7] text-[#16a34a] text-[10px] font-bold">
                          {ret.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#444651] truncate mt-0.5">
                        {ret.title} • ส่งคืนโดย {ret.returnedBy}
                      </p>
                      <p className="text-[10px] text-[#757682] mt-0.5">
                        {ret.recordedAt} • {ret.checkpoint}
                      </p>
                    </div>
                  </div>

                  <div className="w-5 h-5 rounded-full bg-[#dcfce7] text-[#16a34a] flex items-center justify-center shrink-0 ml-2">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : activeTab === 'active' ? (
        /* Active Checked Out Items */
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-4 border border-[#e2e7ff]">
            <h3 className="text-sm font-bold text-[#131b2e] mb-1">
              ทรัพย์สินที่กำลังเบิกใช้งาน ({activeApprovals.length} รายการ)
            </h3>
            <p className="text-xs text-[#757682]">
              ติดตามสถานะการนำทรัพย์สินออกนอกสถานที่และกำหนดส่งคืน
            </p>
          </div>

          {activeApprovals.length > 0 ? (
            <div className="space-y-2">
              {activeApprovals.map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-2xl p-3 border border-[#e2e7ff] shadow-xs flex items-center justify-between"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-[#006a61]">
                      {req.items[0]?.code || req.code}
                    </span>
                    <h4 className="text-xs font-bold text-[#131b2e]">
                      {req.items[0]?.name || 'ครุภัณฑ์'}
                    </h4>
                    <p className="text-[11px] text-[#757682]">
                      ผู้ถือครอง: {req.requester.name} ({req.requester.department})
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#ffedd5] text-[#c2410c] text-[10px] font-bold">
                    {req.period?.end ? `ครบกำหนด ${req.period.end}` : 'กำลังใช้งาน'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center border border-[#e2e7ff] shadow-xs">
              <p className="text-xs font-bold text-[#131b2e]">
                ไม่มีครุภัณฑ์ที่กำลังเบิกใช้งานในขณะนี้
              </p>
              <p className="text-[11px] text-[#757682] mt-1">
                เมื่อมีการอนุมัติคำขอเบิก รายการจะแสดงที่นี่เพื่อติดตามสถานะการคืน
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Return History Full Tab */
        <div className="space-y-2.5">
          <div className="bg-white rounded-2xl p-4 border border-[#e2e7ff]">
            <h3 className="text-sm font-bold text-[#131b2e] mb-1">
              ประวัติการตรวจรับคืนครุภัณฑ์ ({returnHistory.length} รายการ)
            </h3>
            <p className="text-xs text-[#757682]">
              รายการที่ผ่านการตรวจสภาพและรับคืนเข้าคลังสมบูรณ์
            </p>
          </div>

          {returnHistory.length > 0 ? (
            returnHistory.map((ret) => (
              <div
                key={ret.id}
                className="bg-white rounded-2xl p-3.5 border border-[#e2e7ff] shadow-xs"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold text-[#00236f]">
                    {ret.code}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#16a34a] text-[10px] font-bold">
                    {ret.badge}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[#131b2e]">{ret.title}</h4>
                <p className="text-xs text-[#444651] mt-0.5">
                  ส่งคืนโดย: {ret.returnedBy}
                </p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#f2f3ff] text-[11px] text-[#757682]">
                  <span>{ret.recordedAt}</span>
                  <span>{ret.checkpoint}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center border border-[#e2e7ff] shadow-xs">
              <p className="text-xs font-bold text-[#131b2e]">
                ยังไม่มีประวัติการตรวจรับคืนครุภัณฑ์
              </p>
              <p className="text-[11px] text-[#757682] mt-1">
                เมื่อมีการส่งคืนครุภัณฑ์และตรวจรับเข้าคลัง ประวัติจะแสดงที่นี่
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import {
  Plus,
  Calendar,
  Wrench,
  CheckSquare,
  Search,
  SlidersHorizontal,
  ChevronDown,
  ArrowRight,
  Phone,
  AlertTriangle,
  CheckCircle2,
  Info,
  Clock,
  Building2,
  User,
  Pencil,
  Trash2,
} from 'lucide-react';
import { MaintenanceTicket, PMRoutineItem } from '../types';

interface MaintenanceViewProps {
  tickets: MaintenanceTicket[];
  pmRoutines: PMRoutineItem[];
  onOpenCreateTicket: () => void;
  onSelectTicket: (ticket: MaintenanceTicket) => void;
  onEditTicket: (ticket: MaintenanceTicket) => void;
  onDeleteTicket: (ticketId: string) => void;
  onInspectPM: (pm: PMRoutineItem) => void;
  onAcceptWork: (ticketId: string) => void;
  onCallContractor: (ticket: MaintenanceTicket) => void;
}

export const MaintenanceView: React.FC<MaintenanceViewProps> = ({
  tickets,
  pmRoutines,
  onOpenCreateTicket,
  onSelectTicket,
  onEditTicket,
  onDeleteTicket,
  onInspectPM,
  onAcceptWork,
  onCallContractor,
}) => {
  const [activeSegment, setActiveSegment] = useState<'pm' | 'tickets'>('pm');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'cost'>('latest');
  const [deletingTicketId, setDeletingTicketId] = useState<string | null>(null);

  const inProgressCount = tickets.filter(
    (t) => t.status === 'in_progress' || t.type === 'corrective'
  ).length;
  const inspectionCount = tickets.filter(
    (t) => t.type === 'pending_inspection' || t.status === 'ready_for_review'
  ).length;
  const pmDueCount = pmRoutines.length;

  const filteredTickets = tickets.filter((t) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      t.title.toLowerCase().includes(q) ||
      t.code.toLowerCase().includes(q) ||
      t.contractor.toLowerCase().includes(q) ||
      t.issueDescription.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4 pb-28">
      {/* 1. Subheader and Title with "+ เปิดใบแจ้งซ่อม" button */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-[#006a61] block leading-tight">
            ศูนย์ซ่อมบำรุงและดูแลรักษา
          </span>
          <h2 className="text-lg font-bold text-[#131b2e] leading-tight mt-0.5">
            งานซ่อมบำรุง (Maintenance)
          </h2>
        </div>

        <button
          type="button"
          id="maintenance-top-create-btn"
          onClick={onOpenCreateTicket}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#006a61] text-white text-xs font-bold shadow-sm hover:bg-[#005049] active:scale-95 transition-all shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>เปิดใบแจ้งซ่อม</span>
        </button>
      </div>

      {/* 2. Segmented Toggle Pills */}
      <div className="bg-[#eaedff]/70 p-1 rounded-2xl flex items-center gap-1 border border-[#e2e7ff]">
        <button
          type="button"
          id="toggle-segment-pm"
          onClick={() => setActiveSegment('pm')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeSegment === 'pm'
              ? 'bg-white text-[#00236f] shadow-xs'
              : 'text-[#444651] hover:text-[#131b2e]'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>แผนตรวจเช็ค (PM)</span>
          <span className="px-1.5 py-0.2 rounded-full bg-[#e2e7ff] text-[#00236f] text-[10px]">
            {pmRoutines.length}
          </span>
        </button>

        <button
          type="button"
          id="toggle-segment-tickets"
          onClick={() => setActiveSegment('tickets')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeSegment === 'tickets'
              ? 'bg-white text-[#00236f] shadow-xs'
              : 'text-[#444651] hover:text-[#131b2e]'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>แจ้งซ่อม / ประวัติ (Tickets)</span>
          <span className="px-1.5 py-0.2 rounded-full bg-[#fee2e2] text-[#dc2626] text-[10px]">
            {tickets.length}
          </span>
        </button>
      </div>

      {/* 3. 3 Stat KPI Cards */}
      <div className="grid grid-cols-3 gap-2">
        {/* Stat 1: กำลังดำเนินการซ่อม */}
        <div className="bg-white p-2.5 rounded-2xl border border-[#e2e7ff] shadow-xs">
          <div className="flex items-center justify-between">
            <div className="w-6 h-6 rounded-lg bg-[#fee2e2] flex items-center justify-center text-[#dc2626]">
              <Wrench className="w-3 h-3" />
            </div>
            <span className="text-[10px] font-bold text-[#dc2626]">ด่วน</span>
          </div>
          <div className="mt-1">
            <span className="text-xl font-black text-[#131b2e]">{inProgressCount}</span>
          </div>
          <p className="text-[10px] text-[#757682] mt-0.5 truncate">
            กำลังดำเนินการซ่อม
          </p>
        </div>

        {/* Stat 2: รอตรวจรับมอบงาน */}
        <div className="bg-white p-2.5 rounded-2xl border border-[#e2e7ff] shadow-xs">
          <div className="flex items-center justify-between">
            <div className="w-6 h-6 rounded-lg bg-[#dcfce7] flex items-center justify-center text-[#006a61]">
              <CheckSquare className="w-3 h-3" />
            </div>
            <span className="text-[10px] font-semibold text-[#006a61]">
              ขั้นตอนตรวจ
            </span>
          </div>
          <div className="mt-1">
            <span className="text-xl font-black text-[#131b2e]">{inspectionCount}</span>
          </div>
          <p className="text-[10px] text-[#757682] mt-0.5 truncate">
            รอตรวจรับมอบงาน
          </p>
        </div>

        {/* Stat 3: ถึงรอบตรวจ */}
        <div className="bg-white p-2.5 rounded-2xl border border-[#e2e7ff] shadow-xs">
          <div className="flex items-center justify-between">
            <div className="w-6 h-6 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#00236f]">
              <Calendar className="w-3 h-3" />
            </div>
          </div>
          <div className="mt-1">
            <span className="text-xl font-black text-[#131b2e]">{pmDueCount}</span>
          </div>
          <p className="text-[10px] text-[#757682] mt-0.5 truncate">
            ถึงรอบตรวจ
          </p>
        </div>
      </div>

      {/* 4. PM Routine Horizontal Cards */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Wrench className="w-4 h-4 text-[#006a61]" />
            <h3 className="text-xs font-bold text-[#131b2e]">
              รอบตรวจเช็คสภาพเชิงป้องกัน (PM Routine)
            </h3>
          </div>
          <button
            type="button"
            className="text-xs text-[#00236f] font-semibold hover:underline"
          >
            ดูทั้งหมด (8)
          </button>
        </div>

        {/* Horizontal Card Scroll */}
        <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
          {pmRoutines.map((pm) => (
            <div
              key={pm.id}
              className="bg-white rounded-2xl p-3 border border-[#e2e7ff] shadow-xs min-w-[280px] max-w-[290px] shrink-0 flex flex-col justify-between"
            >
              <div>
                {/* Badge & Code Header */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      pm.isUrgent
                        ? 'bg-[#fee2e2] text-[#dc2626]'
                        : 'bg-[#eaedff] text-[#00236f]'
                    }`}
                  >
                    • {pm.dueDateBadge}
                  </span>
                  <span className="font-mono text-[11px] text-[#757682] font-semibold">
                    {pm.code}
                  </span>
                </div>

                {/* Content Row with Thumbnail */}
                <div className="flex gap-2.5">
                  <img
                    src={pm.imageUrl}
                    alt={pm.title}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#e2e7ff]"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#131b2e] truncate">
                      {pm.title}
                    </h4>
                    <p className="text-[11px] text-[#757682] truncate mt-0.5">
                      {pm.location}
                    </p>
                    <p className="text-[10px] text-[#006a61] font-medium mt-0.5">
                      {pm.cycle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer: Team and Action */}
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#f2f3ff]">
                <div className="flex items-center gap-1 text-[11px] text-[#444651]">
                  <User className="w-3 h-3 text-[#757682]" />
                  <span className="truncate">{pm.assignedTeam}</span>
                </div>

                <button
                  type="button"
                  id={`pm-inspect-btn-${pm.id}`}
                  onClick={() => onInspectPM(pm)}
                  className="flex items-center gap-1 px-3 py-1 rounded-xl bg-[#00236f] text-white text-[11px] font-semibold hover:bg-[#1e3a8a] active:scale-95 transition-all shadow-xs"
                >
                  <span>เริ่มตรวจเช็ค</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Search Bar with Filter Icon */}
      <div className="flex items-center gap-2 pt-1">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#757682] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="maintenance-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาเลขที่ตั๋วซ่อม, ชื่อทรัพย์สิน, ผู้รับเหมา..."
            className="w-full pl-9 pr-3.5 py-2.5 bg-white rounded-2xl border border-[#e2e7ff] text-xs text-[#131b2e] placeholder-[#757682] focus:outline-none focus:ring-2 focus:ring-[#00236f] shadow-xs"
          />
        </div>

        <button
          type="button"
          className="w-11 h-11 rounded-2xl bg-[#f2f3ff] border border-[#e2e7ff] text-[#00236f] flex items-center justify-center hover:bg-[#eaedff] active:scale-95 transition-all shrink-0"
          aria-label="ตัวกรอง"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* 6. Section Title & Sort */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Wrench className="w-4 h-4 text-[#00236f]" />
          <h3 className="text-sm font-bold text-[#131b2e]">
            รายการใบแจ้งซ่อมล่าสุด
          </h3>
        </div>

        <button
          type="button"
          onClick={() => setSortBy(sortBy === 'latest' ? 'cost' : 'latest')}
          className="flex items-center gap-1 text-xs text-[#444651] font-medium"
        >
          <span>เรียง: {sortBy === 'latest' ? 'ล่าสุด' : 'ค่าซ่อม'}</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* 7. Tickets List */}
      <div className="space-y-3">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            id={`ticket-card-${ticket.code}`}
            onClick={() => onSelectTicket(ticket)}
            className="bg-white rounded-2xl p-3.5 border border-[#e2e7ff] shadow-xs hover:border-[#00236f] cursor-pointer transition-all"
          >
            {/* Header: Ticket Code, Badge, Edit/Delete & Date */}
            <div className="flex items-center justify-between gap-1 mb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-extrabold text-[#00236f]">
                  {ticket.code}
                </span>

                {ticket.type === 'corrective' && (
                  <span className="px-2 py-0.5 rounded-full bg-[#fee2e2] text-[#dc2626] text-[10px] font-bold">
                    • {ticket.typeLabel}
                  </span>
                )}
                {ticket.type === 'pending_inspection' && (
                  <span className="px-2 py-0.5 rounded-full bg-[#ccfbf1] text-[#0f766e] text-[10px] font-bold">
                    • {ticket.typeLabel}
                  </span>
                )}
                {ticket.type === 'scheduled' && (
                  <span className="px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] text-[10px] font-bold">
                    • {ticket.typeLabel}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-[#757682] hidden sm:inline">{ticket.timeAgo}</span>
                <button
                  type="button"
                  title="แก้ไขใบแจ้งซ่อม"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditTicket(ticket);
                  }}
                  className="p-1 rounded-lg text-[#00236f] hover:bg-[#eaedff] active:scale-95 transition-all"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="ลบใบแจ้งซ่อม"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeletingTicketId(ticket.id);
                  }}
                  className="p-1 rounded-lg text-[#dc2626] hover:bg-[#fee2e2] active:scale-95 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Inline deletion confirmation if active */}
            {deletingTicketId === ticket.id && (
              <div
                className="mb-2.5 p-2.5 rounded-xl bg-[#fee2e2] border border-[#fecaca] flex items-center justify-between gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-1.5 text-xs text-[#991b1b] font-medium min-w-0">
                  <AlertTriangle className="w-4 h-4 text-[#dc2626] shrink-0" />
                  <span className="truncate">ยืนยันลบใบแจ้งซ่อม {ticket.code}?</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setDeletingTicketId(null)}
                    className="px-2.5 py-1 rounded-lg bg-white text-[#444651] text-[11px] font-semibold hover:bg-slate-50 border border-[#fecaca]"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onDeleteTicket(ticket.id);
                      setDeletingTicketId(null);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#dc2626] text-white text-[11px] font-bold hover:bg-[#b91c1c] shadow-xs active:scale-95 transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>ลบ</span>
                  </button>
                </div>
              </div>
            )}

            {/* Thumbnail and Info */}
            <div className="flex gap-3">
              <img
                src={ticket.imageUrl}
                alt={ticket.title}
                className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#e2e7ff]"
              />

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-[#131b2e] truncate">
                  {ticket.title}
                </h4>

                {/* Alert/Issue text */}
                <div className="flex items-start gap-1 mt-1 text-xs">
                  {ticket.type === 'corrective' ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-[#dc2626] shrink-0 mt-0.5" />
                  ) : ticket.type === 'pending_inspection' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0f766e] shrink-0 mt-0.5" />
                  ) : (
                    <Info className="w-3.5 h-3.5 text-[#00236f] shrink-0 mt-0.5" />
                  )}
                  <span
                    className={`text-[11px] leading-tight ${
                      ticket.type === 'corrective'
                        ? 'text-[#b91c1c] font-medium'
                        : ticket.type === 'pending_inspection'
                        ? 'text-[#0f766e] font-medium'
                        : 'text-[#444651]'
                    }`}
                  >
                    {ticket.issueDescription}
                  </span>
                </div>

                {/* Contractor / Requester */}
                <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-[#757682]">
                  {ticket.contractor && (
                    <>
                      <Building2 className="w-3 h-3 text-[#757682]" />
                      <span className="truncate">{ticket.contractor}</span>
                    </>
                  )}
                  {ticket.requester && (
                    <>
                      <User className="w-3 h-3 text-[#757682]" />
                      <span className="truncate">ผู้แจ้ง: {ticket.requester}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Row: Cost and Action Buttons */}
            <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#f2f3ff]">
              <div>
                {ticket.estimatedCost !== undefined && (
                  <div>
                    <span className="text-[10px] text-[#757682] block">
                      ประมาณการค่าซ่อม
                    </span>
                    <span className="text-sm font-black text-[#00236f]">
                      ฿{ticket.estimatedCost.toLocaleString()}
                    </span>
                  </div>
                )}
                {ticket.actualCost !== undefined && (
                  <div>
                    <span className="text-[10px] text-[#757682] block">
                      ยอดเบิกจ่ายจริง
                    </span>
                    <span className="text-sm font-black text-[#006a61]">
                      ฿{ticket.actualCost.toLocaleString()}
                    </span>
                  </div>
                )}
                {ticket.warrantyStatus && (
                  <div>
                    <span className="text-[10px] text-[#757682] block">
                      การรับประกัน
                    </span>
                    <span className="text-xs font-bold text-[#006a61]">
                      {ticket.warrantyStatus}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons based on status */}
              <div className="flex items-center gap-1.5 flex-wrap justify-end">
                <button
                  type="button"
                  id={`edit-btn-${ticket.code}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditTicket(ticket);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#eaedff] text-[#00236f] text-xs font-semibold hover:bg-[#dbe1ff] transition-all"
                >
                  <Pencil className="w-3 h-3" />
                  <span>แก้ไข</span>
                </button>

                {ticket.type === 'corrective' && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTicket(ticket);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-[#f2f3ff] text-[#00236f] text-xs font-semibold hover:bg-[#eaedff] transition-all"
                    >
                      ดูรายละเอียด
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCallContractor(ticket);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#00236f] text-white text-xs font-bold hover:bg-[#1e3a8a] active:scale-95 transition-all shadow-xs"
                    >
                      <Phone className="w-3 h-3" />
                      <span>โทรตามช่าง</span>
                    </button>
                  </>
                )}

                {ticket.type === 'pending_inspection' && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAcceptWork(ticket.id);
                    }}
                    className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-[#006a61] text-white text-xs font-bold hover:bg-[#005049] active:scale-95 transition-all shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>ตรวจรับงาน</span>
                  </button>
                )}

                {ticket.type === 'scheduled' && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTicket(ticket);
                    }}
                    className="px-2.5 py-1.5 rounded-xl bg-[#f2f3ff] text-[#444651] text-xs font-semibold hover:bg-[#eaedff] transition-all"
                  >
                    ดูรายละเอียด
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredTickets.length === 0 && (
          <div className="text-center py-12 px-4 bg-white rounded-2xl border border-dashed border-[#b6c4ff] space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#f2f3ff] text-[#006a61] flex items-center justify-center">
              <Wrench className="w-7 h-7" />
            </div>
            {tickets.length === 0 ? (
              <div className="space-y-1.5 max-w-xs mx-auto">
                <h4 className="text-sm font-bold text-[#131b2e]">
                  พร้อมเปิดใบแจ้งซ่อมรายการใหม่
                </h4>
                <p className="text-xs text-[#565e74] leading-relaxed">
                  ลบรายการแจ้งซ่อมเดิมทั้งหมดออกเรียบร้อยแล้ว กดปุ่มด้านล่างเพื่อเปิดใบแจ้งซ่อมครุภัณฑ์รายการใหม่ได้ทันที
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenCreateTicket}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#006a61] text-white text-xs font-bold hover:bg-[#005049] shadow-xs active:scale-95 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>เปิดใบแจ้งซ่อมใหม่</span>
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#757682]">ไม่พบรายการแจ้งซ่อมที่ค้นหา</p>
            )}
          </div>
        )}
      </div>

      {/* Bottom Floating Action Button */}
      <div className="fixed bottom-20 right-4 z-20">
        <button
          type="button"
          id="fab-open-repair-ticket"
          onClick={onOpenCreateTicket}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#00236f] text-white shadow-lg hover:bg-[#1e3a8a] active:scale-95 transition-all font-bold text-sm"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>เปิดใบแจ้งซ่อม</span>
        </button>
      </div>
    </div>
  );
};

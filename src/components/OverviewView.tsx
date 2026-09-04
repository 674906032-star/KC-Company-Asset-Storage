import React from 'react';
import {
  QrCode,
  ShoppingCart,
  Wrench,
  CheckCircle2,
  Package,
  ArrowUpRight,
  ChevronRight,
  Check,
  Calendar,
  AlertCircle,
  Truck,
  Wind,
} from 'lucide-react';
import { TabType, ApprovalRequest } from '../types';

interface OverviewViewProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenScanner: () => void;
  onOpenExpressRequest: () => void;
  onOpenReportIssue: () => void;
  urgentApproval: ApprovalRequest | null;
  onApproveUrgent: (id: string) => void;
  onViewApprovalDetail: (req: ApprovalRequest) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onNavigateTab,
  onOpenScanner,
  onOpenExpressRequest,
  onOpenReportIssue,
  urgentApproval,
  onApproveUrgent,
  onViewApprovalDetail,
}) => {
  return (
    <div className="space-y-4 pb-6">
      {/* 1. User Greeting Card */}
      <div className="bg-white rounded-2xl p-3.5 border border-[#e2e7ff] shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
              alt="คุณภัสสร"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-[#e2e7ff]"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#16a34a] border-2 border-white rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h2 className="text-base font-bold text-[#131b2e]">
                สวัสดีคุณภัสสร
              </h2>
              <span className="text-base">👏</span>
            </div>
            <p className="text-xs text-[#757682] mt-0.5">
              วันอังคารที่ 24 ต.ค. • ผู้ดูแลพัสดุอาวุโส
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#dcfce7] text-[#16a34a] text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-ping opacity-75" />
          <span>ระบบพร้อม</span>
        </div>
      </div>

      {/* 2. Quick Action 3-Card Grid */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* Button 1: QR Scanner */}
        <button
          type="button"
          id="overview-quick-scan"
          onClick={onOpenScanner}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#00236f] text-white shadow-sm hover:bg-[#1e3a8a] active:scale-95 transition-all text-center group"
        >
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
            <QrCode className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-bold leading-tight">สแกน QR</span>
          <span className="text-[10px] text-white/80 font-normal leading-tight">
            ครุภัณฑ์
          </span>
        </button>

        {/* Button 2: Express Request */}
        <button
          type="button"
          id="overview-quick-borrow"
          onClick={onOpenExpressRequest}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#f2f3ff] text-[#00236f] border border-[#e2e7ff] hover:bg-[#eaedff] active:scale-95 transition-all text-center group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#00236f]/10 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
            <ShoppingCart className="w-5 h-5 text-[#00236f]" />
          </div>
          <span className="text-xs font-bold leading-tight">ขอเบิกด่วน</span>
          <span className="text-[10px] text-[#444651] font-normal leading-tight">
            จองอุปกรณ์
          </span>
        </button>

        {/* Button 3: Report Issue */}
        <button
          type="button"
          id="overview-quick-repair"
          onClick={onOpenReportIssue}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#f2f3ff] text-[#00236f] border border-[#e2e7ff] hover:bg-[#eaedff] active:scale-95 transition-all text-center group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#00236f]/10 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
            <Wrench className="w-5 h-5 text-[#00236f]" />
          </div>
          <span className="text-xs font-bold leading-tight">แจ้งซ่อม</span>
          <span className="text-[10px] text-[#444651] font-normal leading-tight">
            ทันที 24 ชม.
          </span>
        </button>
      </div>

      {/* 3. Summary Statistics Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-[#131b2e]">
            สถิติครุภัณฑ์รวม
          </h3>
          <span className="text-[11px] text-[#006a61] font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]" />
            อัปเดตเรียลไทม์
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Card 1: Total Assets */}
          <div
            onClick={() => onNavigateTab('assets')}
            className="bg-white p-3 rounded-2xl border border-[#e2e7ff] shadow-xs cursor-pointer hover:border-[#00236f] transition-all"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs text-[#757682]">ทรัพย์สินทั้งหมด</span>
              <div className="w-7 h-7 rounded-lg bg-[#f2f3ff] flex items-center justify-center text-[#00236f]">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-1">
              <span className="text-2xl font-black tracking-tight text-[#131b2e]">
                1,482
              </span>
            </div>
            <p className="text-[11px] text-[#006a61] font-medium mt-0.5">
              มูลค่า ฿42.8M
            </p>
          </div>

          {/* Card 2: Ready for Use */}
          <div
            onClick={() => onNavigateTab('assets')}
            className="bg-white p-3 rounded-2xl border border-[#e2e7ff] shadow-xs cursor-pointer hover:border-[#16a34a] transition-all"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs text-[#757682]">พร้อมใช้งาน</span>
              <div className="w-7 h-7 rounded-lg bg-[#dcfce7] flex items-center justify-center text-[#16a34a]">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-1">
              <span className="text-2xl font-black tracking-tight text-[#131b2e]">
                1,128
              </span>
            </div>
            <p className="text-[11px] text-[#16a34a] font-medium mt-0.5">
              76.1% ของคลัง
            </p>
          </div>

          {/* Card 3: In Use / Checked Out */}
          <div
            onClick={() => onNavigateTab('approvals')}
            className="bg-white p-3 rounded-2xl border border-[#e2e7ff] shadow-xs cursor-pointer hover:border-[#ea580c] transition-all"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs text-[#757682]">กำลังเบิกใช้งาน</span>
              <div className="w-7 h-7 rounded-lg bg-[#ffedd5] flex items-center justify-center text-[#ea580c]">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-1">
              <span className="text-2xl font-black tracking-tight text-[#131b2e]">
                312
              </span>
            </div>
            <div className="mt-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#fee2e2] text-[#dc2626] text-[10px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
              เกินกำหนด 4 รายการ
            </div>
          </div>

          {/* Card 4: In Maintenance */}
          <div
            onClick={() => onNavigateTab('maintenance')}
            className="bg-white p-3 rounded-2xl border border-[#e2e7ff] shadow-xs cursor-pointer hover:border-[#dc2626] transition-all"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs text-[#757682]">ส่งซ่อมบำรุง</span>
              <div className="w-7 h-7 rounded-lg bg-[#fee2e2] flex items-center justify-center text-[#dc2626]">
                <Wrench className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-1">
              <span className="text-2xl font-black tracking-tight text-[#131b2e]">
                42
              </span>
            </div>
            <p className="text-[11px] text-[#757682] mt-0.5">
              อยู่ในคิวช่าง 8 ชิ้น
            </p>
          </div>
        </div>
      </div>

      {/* 4. Category Ratio Breakdown */}
      <div className="bg-white rounded-2xl p-3.5 border border-[#e2e7ff] shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full border-2 border-[#00236f] border-t-transparent animate-spin-slow" />
            <span className="text-xs font-bold text-[#131b2e]">
              สัดส่วนหมวดหมู่ครุภัณฑ์
            </span>
          </div>
          <span className="text-[11px] text-[#757682]">4 หมวดหลัก</span>
        </div>

        {/* Multi-segment Bar */}
        <div className="w-full h-3 rounded-full overflow-hidden flex bg-[#f2f3ff]">
          <div style={{ width: '42%' }} className="bg-[#00236f] h-full" title="อุปกรณ์ไอที 42%" />
          <div style={{ width: '28%' }} className="bg-[#006a61] h-full" title="ยานพาหนะ 28%" />
          <div style={{ width: '18%' }} className="bg-[#b45309] h-full" title="เครื่องมือช่าง 18%" />
          <div style={{ width: '12%' }} className="bg-[#94a3b8] h-full" title="เฟอร์นิเจอร์ 12%" />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 mt-3 pt-1 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00236f]" />
              <span className="text-[#444651]">อุปกรณ์ไอที</span>
            </div>
            <span className="font-bold text-[#131b2e]">42%</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a61]" />
              <span className="text-[#444651]">ยานพาหนะ</span>
            </div>
            <span className="font-bold text-[#131b2e]">28%</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#b45309]" />
              <span className="text-[#444651]">เครื่องมือช่าง</span>
            </div>
            <span className="font-bold text-[#131b2e]">18%</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#94a3b8]" />
              <span className="text-[#444651]">เฟอร์นิเจอร์</span>
            </div>
            <span className="font-bold text-[#131b2e]">12%</span>
          </div>
        </div>
      </div>

      {/* 5. Pending Urgent Approval Card */}
      {urgentApproval && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-[#131b2e]">
                คำขอเบิกด่วนรอพิจารณา
              </h3>
              <span className="w-5 h-5 rounded-full bg-[#dc2626] text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('approvals')}
              className="text-xs text-[#00236f] font-semibold flex items-center hover:underline"
            >
              ดูทั้งหมด <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          <div className="bg-[#f2f3ff] rounded-2xl p-3.5 border border-[#c5c5d3]/50 shadow-xs">
            <div className="flex gap-3">
              <img
                src={urgentApproval.items[0]?.imageUrl || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80'}
                alt={urgentApproval.items[0]?.name}
                className="w-16 h-16 rounded-xl object-cover border border-[#e2e7ff] bg-white shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-sm font-bold text-[#131b2e] truncate">
                    {urgentApproval.items[0]?.name || 'MacBook Pro 16" M3 Max'}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-[#ffedd5] text-[#c2410c] text-[10px] font-bold shrink-0">
                    เร่งด่วน
                  </span>
                </div>

                <p className="text-[11px] text-[#757682] mt-0.5">
                  รหัส: {urgentApproval.items[0]?.code || 'KC-NB-2024-0089'}
                </p>

                <div className="flex items-center gap-1.5 mt-1 text-xs text-[#131b2e]">
                  <span className="truncate">👤 {urgentApproval.requester.name}</span>
                </div>
              </div>
            </div>

            {/* Purpose */}
            <div className="mt-2.5 pt-2 border-t border-[#e2e7ff] flex items-center justify-between text-xs">
              <span className="text-[#444651] truncate pr-2">
                วัตถุประสงค์: {urgentApproval.purpose}
              </span>
              <span className="text-[#006a61] font-semibold shrink-0">
                {urgentApproval.period.durationText}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-3">
              <button
                type="button"
                id="overview-tap-approve-btn"
                onClick={() => onApproveUrgent(urgentApproval.id)}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#006a61] text-white text-xs font-bold hover:bg-[#005049] active:scale-95 transition-all shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                อนุมัติด่วน (1-Tap)
              </button>

              <button
                type="button"
                id="overview-tap-detail-btn"
                onClick={() => onViewApprovalDetail(urgentApproval)}
                className="flex items-center justify-center py-2 px-3 rounded-xl bg-white border border-[#c5c5d3] text-[#131b2e] text-xs font-semibold hover:bg-slate-50 active:scale-95 transition-all"
              >
                รายละเอียด
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Scheduled Maintenance PM */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#131b2e]">
            กำหนดตรวจสภาพบำรุงรักษา (PM)
          </h3>
          <span className="text-xs text-[#dc2626] font-semibold">
            2 รายการเร่งด่วน
          </span>
        </div>

        <div className="space-y-2">
          {/* PM Item 1 */}
          <div
            onClick={() => onNavigateTab('maintenance')}
            className="bg-white rounded-2xl p-3 border border-[#e2e7ff] shadow-xs flex items-center justify-between cursor-pointer hover:border-[#00236f] transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#fee2e2] flex items-center justify-center text-[#dc2626] shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-[#131b2e] truncate">
                  รถตู้ส่วนกลาง Toyota Com...
                </h4>
                <p className="text-[11px] text-[#757682] truncate mt-0.5">
                  ทะเบียน 1นข-4920 กทม. • เช็คระยะ 40,000 กม.
                </p>
              </div>
            </div>

            <span className="px-2 py-0.5 rounded-full bg-[#dc2626] text-white text-[10px] font-bold shrink-0 ml-2">
              ครบกำหนดวันนี้
            </span>
          </div>

          {/* PM Item 2 */}
          <div
            onClick={() => onNavigateTab('maintenance')}
            className="bg-white rounded-2xl p-3 border border-[#e2e7ff] shadow-xs flex items-center justify-between cursor-pointer hover:border-[#00236f] transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#00236f] shrink-0">
                <Wind className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-[#131b2e] truncate">
                  ระบบแอร์สำนักงาน ชั้น 4 ฝั่งต...
                </h4>
                <p className="text-[11px] text-[#757682] truncate mt-0.5">
                  Daikin VRV System • ล้างฟิลเตอร์และเติมน้ำยาแอร์
                </p>
              </div>
            </div>

            <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#00236f] border border-[#b6c4ff] text-[10px] font-semibold shrink-0 ml-2">
              พรุ่งนี้ 10:00 น.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

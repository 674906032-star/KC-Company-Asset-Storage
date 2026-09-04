import React, { useState, useMemo } from 'react';
import {
  FileText,
  Tag,
  Hash,
  Printer,
  Copy,
  Check,
  Download,
  QrCode,
  CheckCircle2,
  Calendar,
  Building,
  User,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Layers,
  ArrowRight,
  ExternalLink,
  Plus,
} from 'lucide-react';
import { Asset, ApprovalRequest, MaintenanceTicket } from '../types';

interface StandardFormatsViewProps {
  assets: Asset[];
  approvals: ApprovalRequest[];
  tickets: MaintenanceTicket[];
  onOpenRegisterAssetWithCode?: (code: string) => void;
  onShowToast: (type: 'success' | 'error' | 'info', title: string, message?: string) => void;
}

type SubTab = 'official_forms' | 'label_tags' | 'code_scheme';
type FormId = 'KP01' | 'KP02' | 'KP03' | 'KP04' | 'KP05';
type TagSize = 'standard' | 'compact' | 'industrial' | 'sheet';

export const StandardFormatsView: React.FC<StandardFormatsViewProps> = ({
  assets,
  approvals,
  tickets,
  onOpenRegisterAssetWithCode,
  onShowToast,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('official_forms');

  // Form selection
  const [selectedFormId, setSelectedFormId] = useState<FormId>('KP01');
  const [selectedAssetId, setSelectedAssetId] = useState<string>(assets[0]?.id || '');
  const [includeDigitalSignature, setIncludeDigitalSignature] = useState<boolean>(true);
  const [copiedState, setCopiedState] = useState<boolean>(false);

  // Label Tag options
  const [tagSize, setTagSize] = useState<TagSize>('standard');
  const [showBarcode, setShowBarcode] = useState<boolean>(true);
  const [showQr, setShowQr] = useState<boolean>(true);
  const [showPrice, setShowPrice] = useState<boolean>(true);
  const [showWarning, setShowWarning] = useState<boolean>(true);
  const [showDepartment, setShowDepartment] = useState<boolean>(true);

  // Code generator state
  const [genPrefix, setGenPrefix] = useState('KC');
  const [genCategory, setGenCategory] = useState('IT');
  const [genYear, setGenYear] = useState('2024');
  const [genSequence, setGenSequence] = useState('0145');
  const [generatedCodeCopied, setGeneratedCodeCopied] = useState(false);

  // Active selected asset
  const currentAsset = useMemo(() => {
    return assets.find((a) => a.id === selectedAssetId) || assets[0] || {
      id: 'default',
      code: 'KC-IT-2024-0089',
      name: 'MacBook Pro 16" M3 Max',
      category: 'it' as const,
      categoryName: 'อุปกรณ์ไอที',
      status: 'available' as const,
      statusLabel: 'พร้อมใช้งาน',
      serialNumber: 'C02G40ZPMD6R',
      location: 'สำนักงานใหญ่ ชั้น 4 (ห้องเซิร์ฟเวอร์ A)',
      price: 112900,
      conditionGrade: 'สภาพสมบูรณ์ 98%',
      assignedUser: 'ภัสสร วงศ์สุวรรณ (ฝ่ายพัฒนาผลิตภัณฑ์)',
      department: 'Technology & Innovation',
      receivedDate: '15 ม.ค. 2024',
      specs: 'Apple M3 Max 16-core CPU, 40-core GPU, 64GB Unified RAM, 1TB SSD',
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
      iconType: 'laptop' as const,
    };
  }, [assets, selectedAssetId]);

  const generatedCode = `${genPrefix}-${genCategory}-${genYear}-${genSequence.padStart(4, '0')}`;

  const officialFormsList = [
    {
      id: 'KP01' as FormId,
      code: 'แบบ คภ. 01',
      title: 'คำขอเบิก-ยืมพัสดุครุภัณฑ์นอกสถานที่',
      subtitle: 'Asset Requisition & Gate Pass Form',
      desc: 'สำหรับขออนุญาตนำทรัพย์สินออกนอกสถานที่และผ่านจุดตรวจ รปภ.',
      badge: 'แบบฟอร์มหลัก',
    },
    {
      id: 'KP02' as FormId,
      code: 'แบบ คภ. 02',
      title: 'ใบส่งมอบ-ตรวจรับคืนพัสดุครุภัณฑ์เข้าคลัง',
      subtitle: 'Asset Return & Inspection Clearance',
      desc: 'ตรวจนับสภาพอุปกรณ์เมื่อนำกลับมาส่งคืนพร้อมบันทึกความสมบูรณ์',
      badge: 'งานคลัง',
    },
    {
      id: 'KP03' as FormId,
      code: 'แบบ คภ. 03',
      title: 'ใบแจ้งซ่อมบำรุงและประเมินความเสียหาย',
      subtitle: 'Maintenance Request & Assessment',
      desc: 'ระบุอาการชำรุด ผลการตรวจสอบทางเทคนิค และประมาณการค่าใช้จ่าย',
      badge: 'ซ่อมบำรุง',
    },
    {
      id: 'KP04' as FormId,
      code: 'แบบ คภ. 04',
      title: 'ทะเบียนคุมทรัพย์สินรายตัว (Ledger Card)',
      subtitle: 'Individual Asset Ledger & Depreciation',
      desc: 'บันทึกประวัติการถือครอง อัตราค่าเสื่อมราคา 20% และการบำรุงรักษา',
      badge: 'การเงิน/บัญชี',
    },
    {
      id: 'KP05' as FormId,
      code: 'แบบ คภ. 05',
      title: 'แบบขออนุมัติตัดจำหน่ายพัสดุชำรุด/เสื่อมสภาพ',
      subtitle: 'Asset Disposal & Decommissioning',
      desc: 'รายงานคณะกรรมการจำหน่ายพัสดุสำหรับครุภัณฑ์หมดอายุการใช้งาน',
      badge: 'จำหน่ายพัสดุ',
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleCopyFormContent = () => {
    const textToCopy = `[แบบฟอร์มมาตรฐาน ${selectedFormId}]
องค์กร: KC
รหัสเอกสาร: KC-${selectedFormId}-2024/098
ครุภัณฑ์: ${currentAsset.name} (${currentAsset.code})
Serial Number: ${currentAsset.serialNumber || 'N/A'}
มูลค่าประเมิน: ฿${currentAsset.price.toLocaleString()}
ผู้รับผิดชอบ: ${currentAsset.assignedUser || 'ฝ่ายพัสดุส่วนกลาง'}
สถานะการอนุมัติ: ผ่านการรับรองระบบดิจิทัล (Digital Verified)`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedState(true);
    onShowToast('success', 'คัดลอกข้อความฟอร์แมตแล้ว', 'นำไปใช้อ้างอิงในเอกสารราชการหรืออีเมลได้ทันที');
    setTimeout(() => setCopiedState(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setGeneratedCodeCopied(true);
    onShowToast('success', 'คัดลอกรหัสครุภัณฑ์มาตรฐานแล้ว', generatedCode);
    setTimeout(() => setGeneratedCodeCopied(false), 2000);
  };

  // Helper for simulated Barcode lines (SVG)
  const renderBarcodeSVG = (code: string, width = 180, height = 36) => {
    // Generate deterministic bar widths from string characters
    const bars: number[] = [];
    for (let i = 0; i < code.length; i++) {
      const charCode = code.charCodeAt(i);
      bars.push(charCode % 2 === 0 ? 2 : 1);
      bars.push(charCode % 3 === 0 ? 3 : 1);
      bars.push(charCode % 5 === 0 ? 2 : 1);
    }
    let currentX = 10;
    return (
      <svg width={width} height={height} className="overflow-visible" xmlns="http://www.w3.org/2000/svg">
        {bars.map((barWidth, idx) => {
          const x = currentX;
          currentX += barWidth + (idx % 2 === 0 ? 1.5 : 2);
          if (idx % 2 === 1) return null;
          return (
            <rect
              key={idx}
              x={x}
              y={0}
              width={barWidth}
              height={height - 10}
              fill="#111827"
            />
          );
        })}
        <text
          x={width / 2}
          y={height - 1}
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fontWeight="bold"
          fill="#374151"
        >
          *{code}*
        </text>
      </svg>
    );
  };

  return (
    <div className="space-y-4 pb-24">
      {/* 1. Top Section Intro Banner */}
      <div className="bg-gradient-to-br from-[#00236f] via-[#0d338a] to-[#006a61] text-white p-4 rounded-3xl shadow-sm relative overflow-hidden print:hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-xs text-[11px] font-semibold text-[#86f2e4] mb-1.5">
            <Sparkles className="w-3 h-3" />
            <span>มาตรฐานพัสดุและครุภัณฑ์องค์กร</span>
          </div>
          <h2 className="text-lg font-black tracking-tight leading-tight">
            ฟอร์เม็ตและแบบฟอร์มมาตรฐาน
          </h2>
          <p className="text-xs text-white/80 mt-1 leading-relaxed">
            ระเบียบแบบฟอร์ม คภ.01 - คภ.05, ป้ายสติกเกอร์ QR/Barcode แท็กอุปกรณ์ และโครงสร้างรหัสพัสดุทางการ
          </p>
        </div>
        <div className="absolute right-[-15px] bottom-[-20px] opacity-15 pointer-events-none">
          <FileText className="w-36 h-36" />
        </div>
      </div>

      {/* 2. Sub-Tab Switcher (3 Pills) */}
      <div className="grid grid-cols-3 gap-1.5 bg-[#e8ecf8] p-1 rounded-2xl print:hidden">
        <button
          type="button"
          id="tab-sub-official-forms"
          onClick={() => setActiveSubTab('official_forms')}
          className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'official_forms'
              ? 'bg-white text-[#00236f] shadow-xs'
              : 'text-[#444651] hover:text-[#131b2e]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="truncate">แบบฟอร์มทางการ</span>
        </button>

        <button
          type="button"
          id="tab-sub-label-tags"
          onClick={() => setActiveSubTab('label_tags')}
          className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'label_tags'
              ? 'bg-white text-[#00236f] shadow-xs'
              : 'text-[#444651] hover:text-[#131b2e]'
          }`}
        >
          <Tag className="w-3.5 h-3.5" />
          <span className="truncate">ป้ายสติกเกอร์/QR</span>
        </button>

        <button
          type="button"
          id="tab-sub-code-scheme"
          onClick={() => setActiveSubTab('code_scheme')}
          className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'code_scheme'
              ? 'bg-white text-[#00236f] shadow-xs'
              : 'text-[#444651] hover:text-[#131b2e]'
          }`}
        >
          <Hash className="w-3.5 h-3.5" />
          <span className="truncate">รหัสมาตรฐาน</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: OFFICIAL FORMS (คภ.01 - คภ.05) */}
      {/* ========================================================================= */}
      {activeSubTab === 'official_forms' && (
        <div className="space-y-4">
          {/* Form Selector Carousel */}
          <div className="bg-white p-3 rounded-2xl border border-[#e2e7ff] shadow-xs print:hidden space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#131b2e] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#00236f]" />
                เลือกแบบฟอร์มมาตรฐาน:
              </span>
              <span className="text-[11px] text-[#006a61] font-semibold">
                ระเบียบงานพัสดุ พ.ศ. 2567
              </span>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {officialFormsList.map((form) => {
                const isSelected = selectedFormId === form.id;
                return (
                  <button
                    key={form.id}
                    type="button"
                    onClick={() => setSelectedFormId(form.id)}
                    className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-center transition-all ${
                      isSelected
                        ? 'bg-[#00236f] text-white shadow-xs scale-102 font-bold'
                        : 'bg-[#f2f3ff] text-[#444651] hover:bg-[#eaedff]'
                    }`}
                  >
                    <span className="text-[11px] leading-tight font-black">{form.id}</span>
                    <span className="text-[9px] opacity-80 leading-tight truncate w-full">
                      {form.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Form Description */}
            {(() => {
              const f = officialFormsList.find((item) => item.id === selectedFormId);
              if (!f) return null;
              return (
                <div className="p-2.5 rounded-xl bg-[#faf8ff] border border-[#e2e7ff] flex items-start justify-between gap-2 text-xs">
                  <div>
                    <span className="font-bold text-[#00236f] block">{f.code}: {f.title}</span>
                    <p className="text-[11px] text-[#757682] mt-0.5">{f.desc}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-[#e2e7ff] text-[#00236f] text-[10px] font-bold shrink-0">
                    {f.badge}
                  </span>
                </div>
              );
            })()}

            {/* Data Source Selector: Pick which asset to load */}
            <div className="pt-1 flex items-center justify-between gap-2">
              <label htmlFor="form-asset-selector" className="text-xs text-[#444651] font-semibold shrink-0">
                ดึงข้อมูลครุภัณฑ์:
              </label>
              <select
                id="form-asset-selector"
                value={selectedAssetId}
                onChange={(e) => setSelectedAssetId(e.target.value)}
                className="flex-1 text-xs py-1.5 px-2 bg-white rounded-xl border border-[#c5c5d3] text-[#131b2e] focus:outline-none focus:ring-1 focus:ring-[#00236f]"
              >
                {assets.map((asset) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.code} - {asset.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Options Row */}
            <div className="flex items-center justify-between pt-1 border-t border-[#f2f3ff] text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer text-[#444651]">
                <input
                  type="checkbox"
                  checked={includeDigitalSignature}
                  onChange={(e) => setIncludeDigitalSignature(e.target.checked)}
                  className="rounded text-[#00236f] focus:ring-[#00236f]"
                />
                <span className="text-[11px] font-medium">แสดงลายเซ็นดิจิทัล & ตราประทับอนุมัติ</span>
              </label>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleCopyFormContent}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f2f3ff] text-[#00236f] text-[11px] font-semibold hover:bg-[#eaedff]"
                >
                  {copiedState ? <Check className="w-3 h-3 text-[#16a34a]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedState ? 'คัดลอกแล้ว' : 'คัดลอก'}</span>
                </button>

                <button
                  type="button"
                  id="print-official-form-btn"
                  onClick={handlePrint}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#00236f] text-white text-[11px] font-bold hover:bg-[#1e3a8a] shadow-xs"
                >
                  <Printer className="w-3 h-3" />
                  <span>พิมพ์ฟอร์ม (A4)</span>
                </button>
              </div>
            </div>
          </div>

          {/* ================= ACTUAL A4 PRINTABLE DOCUMENT SHEET ================= */}
          <div className="print-page bg-white p-5 rounded-2xl border border-[#c5c5d3] shadow-md text-[#131b2e] space-y-4">
            {/* 1. Official Header */}
            <div className="border-b-2 border-[#131b2e] pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-11 h-11 rounded-lg bg-[#00236f] text-white flex items-center justify-center font-serif font-black text-xl shadow-xs">
                    KC
                  </div>
                  <div>
                    <h1 className="text-sm font-black text-[#00236f] tracking-wide font-serif uppercase">
                      KC
                    </h1>
                    <p className="text-[10px] text-[#444651]">
                      KC • ส่วนบริหารจัดการพัสดุและครุภัณฑ์
                    </p>
                    <p className="text-[9px] text-[#757682]">
                      เลขทะเบียนนิติบุคคล 0107567000123 • สำนักงานใหญ่ KC
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-2.5 py-0.5 bg-[#00236f] text-white font-mono font-bold text-xs rounded">
                    {selectedFormId === 'KP01' && 'แบบ คภ. 01'}
                    {selectedFormId === 'KP02' && 'แบบ คภ. 02'}
                    {selectedFormId === 'KP03' && 'แบบ คภ. 03'}
                    {selectedFormId === 'KP04' && 'แบบ คภ. 04'}
                    {selectedFormId === 'KP05' && 'แบบ คภ. 05'}
                  </span>
                  <p className="text-[10px] font-mono text-[#757682] mt-1">
                    เลขที่: KC-{selectedFormId}-2024/098
                  </p>
                  <p className="text-[9px] text-[#757682]">
                    วันที่: 24 ตุลาคม 2567
                  </p>
                </div>
              </div>

              {/* Form Title Banner */}
              <div className="mt-3 text-center py-1.5 bg-[#f2f3ff] rounded-lg border border-[#e2e7ff]">
                <h2 className="text-sm font-bold text-[#00236f]">
                  {selectedFormId === 'KP01' && 'แบบคำขอเบิก-ยืมพัสดุครุภัณฑ์นอกสถานที่ (Asset Gate Pass)'}
                  {selectedFormId === 'KP02' && 'ใบส่งมอบและตรวจรับคืนพัสดุครุภัณฑ์เข้าคลัง (Return & Clearance)'}
                  {selectedFormId === 'KP03' && 'ใบแจ้งซ่อมบำรุงและประเมินความเสียหาย (Maintenance Assessment)'}
                  {selectedFormId === 'KP04' && 'ทะเบียนคุมทรัพย์สินรายตัวและตารางค่าเสื่อมราคา (Asset Ledger Card)'}
                  {selectedFormId === 'KP05' && 'แบบขออนุมัติตัดจำหน่ายพัสดุชำรุด/เสื่อมสภาพ (Disposal Form)'}
                </h2>
              </div>
            </div>

            {/* 2. Requester / Subject Section */}
            <div className="grid grid-cols-2 gap-2 text-xs bg-[#faf8ff] p-2.5 rounded-xl border border-[#e2e7ff]">
              <div>
                <span className="text-[10px] text-[#757682] block">ผู้ยื่นคำขอ / ผู้ถือครอง:</span>
                <span className="font-bold text-[#131b2e]">
                  {currentAsset.assignedUser || 'คุณภัสสร วงศ์สุวรรณ'}
                </span>
                <span className="text-[11px] text-[#444651] block">
                  ตำแหน่ง: เจ้าหน้าที่ปฏิบัติการอาวุโส ({currentAsset.department || 'ฝ่ายเทคโนโลยี'})
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[#757682] block">วัตถุประสงค์การใช้งาน:</span>
                <span className="font-semibold text-[#131b2e]">
                  {selectedFormId === 'KP01' && 'ปฏิบัติงานนอกสถานที่และบันทึกภาคสนาม'}
                  {selectedFormId === 'KP02' && 'ส่งมอบคืนหลังสิ้นสุดภารกิจโครงการ'}
                  {selectedFormId === 'KP03' && 'แจ้งซ่อมอาการขัดข้องเพื่อตรวจเช็คระบบ'}
                  {selectedFormId === 'KP04' && 'บันทึกคุมทะเบียนทรัพย์สินถาวรประจำปี'}
                  {selectedFormId === 'KP05' && 'ตัดจำหน่ายเนื่องจากครบอายุการใช้งาน'}
                </span>
                <span className="text-[10px] text-[#006a61] block mt-0.5">
                  กำหนดระยะเวลา: 24 ต.ค. 2567 - 28 ต.ค. 2567 (5 วันทำการ)
                </span>
              </div>
            </div>

            {/* 3. Items Table */}
            <div>
              <span className="text-xs font-bold text-[#131b2e] block mb-1">
                รายการพัสดุครุภัณฑ์ที่ขออนุมัติ:
              </span>
              <table className="w-full text-left text-xs border border-[#c5c5d3] rounded-lg overflow-hidden">
                <thead className="bg-[#f2f3ff] text-[#00236f] font-bold border-b border-[#c5c5d3]">
                  <tr>
                    <th className="p-1.5 text-center w-8">ลำดับ</th>
                    <th className="p-1.5">รหัสครุภัณฑ์</th>
                    <th className="p-1.5">รายการ / ข้อมูลจำเพาะ</th>
                    <th className="p-1.5 text-center">Serial No.</th>
                    <th className="p-1.5 text-center">สภาพ</th>
                    <th className="p-1.5 text-right">มูลค่า (บาท)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e7ff]">
                  <tr className="hover:bg-slate-50">
                    <td className="p-1.5 text-center font-bold">1</td>
                    <td className="p-1.5 font-mono text-[11px] font-bold text-[#006a61]">
                      {currentAsset.code}
                    </td>
                    <td className="p-1.5">
                      <span className="font-bold block text-[#131b2e]">{currentAsset.name}</span>
                      <span className="text-[10px] text-[#757682]">{currentAsset.specs || currentAsset.categoryName}</span>
                    </td>
                    <td className="p-1.5 text-center font-mono text-[10px]">
                      {currentAsset.serialNumber || 'N/A'}
                    </td>
                    <td className="p-1.5 text-center">
                      <span className="px-1.5 py-0.5 rounded bg-[#dcfce7] text-[#16a34a] text-[10px] font-bold">
                        {currentAsset.conditionGrade || 'สมบูรณ์'}
                      </span>
                    </td>
                    <td className="p-1.5 text-right font-bold text-[#00236f]">
                      {currentAsset.price.toLocaleString()}
                    </td>
                  </tr>

                  {/* Optional 2nd row for multi-item illustration */}
                  <tr className="hover:bg-slate-50 text-[#757682]">
                    <td className="p-1.5 text-center font-bold">2</td>
                    <td className="p-1.5 font-mono text-[11px]">KC-ACC-2024-0312</td>
                    <td className="p-1.5">
                      <span className="font-semibold block text-[#444651]">ชุดอะแดปเตอร์และสายต่อพ่วงมาตรฐาน</span>
                      <span className="text-[10px]">140W USB-C Power Adapter + MagSafe Cable</span>
                    </td>
                    <td className="p-1.5 text-center font-mono text-[10px]">W0893421</td>
                    <td className="p-1.5 text-center">
                      <span className="px-1.5 py-0.5 rounded bg-[#dcfce7] text-[#16a34a] text-[10px] font-bold">
                        สมบูรณ์
                      </span>
                    </td>
                    <td className="p-1.5 text-right font-semibold">3,590</td>
                  </tr>
                </tbody>
                <tfoot className="bg-[#faf8ff] font-bold border-t border-[#c5c5d3]">
                  <tr>
                    <td colSpan={5} className="p-1.5 text-right text-xs">
                      มูลค่ารวมทั้งสิ้น (Total Value):
                    </td>
                    <td className="p-1.5 text-right text-[#00236f] text-xs">
                      ฿{(currentAsset.price + 3590).toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* 4. Terms and Security Conditions */}
            <div className="text-[10px] text-[#757682] p-2 bg-[#f8fafc] rounded-lg border border-[#e2e7ff] space-y-1">
              <span className="font-bold text-[#444651] block">เงื่อนไขข้อบังคับด้านพัสดุและระเบียบรักษาความปลอดภัย:</span>
              <p>1. ผู้ยื่นคำขอต้องดูแลรักษาทรัพย์สินให้อยู่ในสภาพพร้อมใช้งาน ห้ามมิให้โอนสิทธิ์หรือส่งมอบให้บุคคลภายนอกโดยไม่ได้รับอนุมัติ</p>
              <p>2. กรณีพัสดุสูญหายหรือชำรุดจากการประมาทเลินเล่อ ผู้เบิกต้องรับผิดชอบชดใช้ค่าเสียหายตามระเบียบบริษัทฯ ข้อ 14</p>
              <p>3. ต้องนำพัสดุผ่านการตรวจนับ ณ ประตูตรวจปล่อย (Security Checkpoint) ทุกครั้งที่มีการเคลื่อนย้ายเข้า-ออก</p>
            </div>

            {/* 5. Triple Approval & Signature Section */}
            <div className="pt-2 border-t border-[#c5c5d3]">
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {/* Sign 1: Requester */}
                <div className="p-2 border border-[#e2e7ff] rounded-xl bg-slate-50 flex flex-col justify-between h-28">
                  <span className="text-[10px] text-[#757682] font-semibold">ผู้ขอเบิก / ผู้ส่งมอบ</span>
                  <div className="my-auto">
                    {includeDigitalSignature ? (
                      <div className="font-serif italic text-xs font-bold text-[#00236f] tracking-wide">
                        ภัสสร วงศ์สุวรรณ
                        <span className="block text-[8px] font-sans not-italic text-[#16a34a] font-bold">
                          ✓ ดิจิทัลซิกเนเจอร์ e-Sign
                        </span>
                      </div>
                    ) : (
                      <div className="border-b border-dashed border-[#757682] w-24 mx-auto my-3" />
                    )}
                  </div>
                  <div className="text-[9px] text-[#757682]">
                    <span>(คุณภัสสร วงศ์สุวรรณ)</span>
                    <span className="block">วันที่ 24 ต.ค. 2567</span>
                  </div>
                </div>

                {/* Sign 2: Approver / Manager */}
                <div className="p-2 border border-[#e2e7ff] rounded-xl bg-slate-50 flex flex-col justify-between h-28 relative overflow-hidden">
                  <span className="text-[10px] text-[#757682] font-semibold">ผู้มีอำนาจอนุมัติ (VP / ผอ.)</span>
                  <div className="my-auto">
                    {includeDigitalSignature ? (
                      <div>
                        <div className="font-serif italic text-xs font-bold text-[#00236f] tracking-wide">
                          กมล สุขประเสริฐ
                        </div>
                        <span className="block text-[8px] font-sans not-italic text-[#006a61] font-bold">
                          ✓ อนุมัติผ่านระบบเรียบร้อย
                        </span>
                      </div>
                    ) : (
                      <div className="border-b border-dashed border-[#757682] w-24 mx-auto my-3" />
                    )}
                  </div>
                  <div className="text-[9px] text-[#757682]">
                    <span>(ดร.กมล สุขประเสริฐ)</span>
                    <span className="block">ผู้อำนวยการฝ่ายปฏิบัติการ</span>
                  </div>
                  {includeDigitalSignature && (
                    <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none">
                      <ShieldCheck className="w-12 h-12 text-[#16a34a]" />
                    </div>
                  )}
                </div>

                {/* Sign 3: Guard / Asset Controller */}
                <div className="p-2 border border-[#e2e7ff] rounded-xl bg-slate-50 flex flex-col justify-between h-28">
                  <span className="text-[10px] text-[#757682] font-semibold">จนท.พัสดุ / รปภ. ตรวจปล่อย</span>
                  <div className="my-auto">
                    {includeDigitalSignature ? (
                      <div>
                        <div className="font-serif italic text-xs font-bold text-[#00236f] tracking-wide">
                          สมพงษ์ ทองดี
                        </div>
                        <span className="block text-[8px] font-sans not-italic text-[#16a34a] font-bold">
                          ✓ ตรวจสอบ Serial ตรงตามใบเบิก
                        </span>
                      </div>
                    ) : (
                      <div className="border-b border-dashed border-[#757682] w-24 mx-auto my-3" />
                    )}
                  </div>
                  <div className="text-[9px] text-[#757682]">
                    <span>(นายสมพงษ์ ทองดี)</span>
                    <span className="block">เจ้าหน้าที่ตรวจปล่อย Gate 2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Document Security Footer with QR Verification */}
            <div className="pt-2 border-t border-[#e2e7ff] flex items-center justify-between text-[9px] text-[#757682]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-white border border-[#c5c5d3] p-0.5 rounded flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-[#00236f]" />
                </div>
                <div>
                  <span className="font-mono font-bold text-[#131b2e] block">
                    AUTH-HASH: 8F2B-91CE-KC{selectedFormId}
                  </span>
                  <span>สแกน QR เพื่อตรวจสอบความถูกต้องของเอกสารต้นฉบับในฐานข้อมูล</span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-bold text-[#00236f]">KC Asset Core</span>
                <span className="block">ISO 9001:2015 Certified Asset Management</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: STANDARD LABEL TAGS (ป้ายสติกเกอร์ QR / Barcode) */}
      {/* ========================================================================= */}
      {activeSubTab === 'label_tags' && (
        <div className="space-y-4">
          {/* Controls Box */}
          <div className="bg-white p-3.5 rounded-2xl border border-[#e2e7ff] shadow-xs space-y-3 print:hidden">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#131b2e] flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#00236f]" />
                กำหนดขนาดและฟอร์แมตป้ายสติกเกอร์:
              </h3>
              <span className="text-[11px] text-[#006a61] font-semibold">
                ขนาดมาตรฐานราชการ & กกท.
              </span>
            </div>

            {/* Preset Size Buttons */}
            <div className="grid grid-cols-4 gap-1.5">
              <button
                type="button"
                onClick={() => setTagSize('standard')}
                className={`p-2 rounded-xl text-center text-xs transition-all ${
                  tagSize === 'standard'
                    ? 'bg-[#00236f] text-white shadow-xs font-bold'
                    : 'bg-[#f2f3ff] text-[#444651] hover:bg-[#eaedff]'
                }`}
              >
                <span className="block font-bold">50 × 30 mm</span>
                <span className="text-[9px] opacity-80">มาตรฐานองค์กร</span>
              </button>

              <button
                type="button"
                onClick={() => setTagSize('compact')}
                className={`p-2 rounded-xl text-center text-xs transition-all ${
                  tagSize === 'compact'
                    ? 'bg-[#00236f] text-white shadow-xs font-bold'
                    : 'bg-[#f2f3ff] text-[#444651] hover:bg-[#eaedff]'
                }`}
              >
                <span className="block font-bold">40 × 20 mm</span>
                <span className="text-[9px] opacity-80">อุปกรณ์เล็ก/IT</span>
              </button>

              <button
                type="button"
                onClick={() => setTagSize('industrial')}
                className={`p-2 rounded-xl text-center text-xs transition-all ${
                  tagSize === 'industrial'
                    ? 'bg-[#00236f] text-white shadow-xs font-bold'
                    : 'bg-[#f2f3ff] text-[#444651] hover:bg-[#eaedff]'
                }`}
              >
                <span className="block font-bold">70 × 40 mm</span>
                <span className="text-[9px] opacity-80">เครื่องจักร/ยานพาหนะ</span>
              </button>

              <button
                type="button"
                onClick={() => setTagSize('sheet')}
                className={`p-2 rounded-xl text-center text-xs transition-all ${
                  tagSize === 'sheet'
                    ? 'bg-[#00236f] text-white shadow-xs font-bold'
                    : 'bg-[#f2f3ff] text-[#444651] hover:bg-[#eaedff]'
                }`}
              >
                <span className="block font-bold">A4 Sheet</span>
                <span className="text-[9px] opacity-80">ชุดรวม 24 ดวง</span>
              </button>
            </div>

            {/* Asset Selector */}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#f2f3ff]">
              <span className="text-xs text-[#444651] font-semibold shrink-0">
                เลือกครุภัณฑ์:
              </span>
              <select
                value={selectedAssetId}
                onChange={(e) => setSelectedAssetId(e.target.value)}
                className="flex-1 text-xs py-1.5 px-2 bg-white rounded-xl border border-[#c5c5d3] text-[#131b2e] focus:outline-none focus:ring-1 focus:ring-[#00236f]"
              >
                {assets.map((asset) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.code} - {asset.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-xs text-[#444651]">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showBarcode}
                  onChange={(e) => setShowBarcode(e.target.checked)}
                  className="rounded text-[#00236f]"
                />
                <span className="text-[11px]">บาร์โค้ด Code-128</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showQr}
                  onChange={(e) => setShowQr(e.target.checked)}
                  className="rounded text-[#00236f]"
                />
                <span className="text-[11px]">QR Code สแกน</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPrice}
                  onChange={(e) => setShowPrice(e.target.checked)}
                  className="rounded text-[#00236f]"
                />
                <span className="text-[11px]">แสดงราคาจัดซื้อ</span>
              </label>
            </div>

            {/* Action buttons */}
            <div className="pt-2 border-t border-[#f2f3ff] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00236f] text-white text-xs font-bold hover:bg-[#1e3a8a] active:scale-95 transition-all shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>พิมพ์ป้ายสติกเกอร์ (Print Tag)</span>
              </button>
            </div>
          </div>

          {/* ================= TAG VISUAL PREVIEW ================= */}
          {tagSize !== 'sheet' ? (
            <div className="bg-slate-200/80 p-6 rounded-3xl flex flex-col items-center justify-center min-h-[220px]">
              <span className="text-[11px] text-[#757682] font-semibold mb-2 print:hidden">
                ตัวอย่างป้ายสติกเกอร์ความละเอียดสูง (ตามขนาด {tagSize === 'standard' ? '50×30 mm' : tagSize === 'compact' ? '40×20 mm' : '70×40 mm'})
              </span>

              {/* Physical Sticker Card Simulation */}
              <div
                id="printable-asset-tag"
                className={`bg-white rounded-lg border-2 border-slate-400 shadow-xl p-3 text-[#131b2e] relative overflow-hidden transition-all print:shadow-none print:border-black ${
                  tagSize === 'standard'
                    ? 'w-80 h-48'
                    : tagSize === 'compact'
                    ? 'w-72 h-36 p-2'
                    : 'w-96 h-56 p-4'
                }`}
              >
                {/* Silver Foil Trim Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00236f] via-[#006a61] to-[#00236f]" />

                {/* Tag Header */}
                <div className="flex items-center justify-between border-b border-slate-300 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded bg-[#00236f] text-white flex items-center justify-center font-bold font-serif text-xs">
                      KC
                    </div>
                    <div>
                      <span className="font-extrabold text-[11px] text-[#00236f] tracking-tight block font-serif uppercase">
                        KC
                      </span>
                      <span className="text-[8px] text-[#757682] block -mt-0.5">
                        ทรัพย์สินถาวรองค์กร (FIXED ASSET)
                      </span>
                    </div>
                  </div>

                  <span className="text-[9px] font-bold text-[#006a61] px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">
                    {currentAsset.categoryName}
                  </span>
                </div>

                {/* Center Content: QR + Code + Details */}
                <div className="flex items-center gap-3 py-2">
                  {showQr && (
                    <div className="w-16 h-16 bg-white border border-slate-300 p-1 rounded-md shrink-0 flex flex-col items-center justify-center shadow-2xs">
                      <QrCode className="w-14 h-14 text-[#00236f]" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-[#757682] block">รหัสครุภัณฑ์ (Asset Code)</span>
                    <span className="font-mono text-base font-black text-[#00236f] tracking-tight block">
                      {currentAsset.code}
                    </span>

                    <span className="font-bold text-xs text-[#131b2e] truncate block mt-0.5">
                      {currentAsset.name}
                    </span>

                    <div className="flex items-center gap-2 text-[9px] text-[#757682] mt-0.5">
                      <span>S/N: {currentAsset.serialNumber || 'N/A'}</span>
                      {showPrice && (
                        <span className="font-bold text-[#006a61]">
                          ฿{currentAsset.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Barcode Section */}
                {showBarcode && (
                  <div className="flex flex-col items-center justify-center pt-1 border-t border-slate-200">
                    {renderBarcodeSVG(currentAsset.code, tagSize === 'compact' ? 190 : 230, 32)}
                  </div>
                )}

                {/* Bottom Legal Warning */}
                {showWarning && (
                  <div className="mt-1 pt-1 border-t border-slate-200 flex items-center justify-between text-[8px] text-[#757682]">
                    <span>⚠️ ทรัพย์สินของบริษัท ห้ามแกะ ขูด ลบ หรือทำลาย</span>
                    <span className="font-mono">VERIFIED 2024</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* A4 Sheet Print Mode (24 Stickers Preview) */
            <div className="print-page bg-white p-4 rounded-2xl border border-[#c5c5d3] shadow-md space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h4 className="text-xs font-bold text-[#00236f]">
                    แผ่นสติกเกอร์มาตรฐานขนาด A4 (24 ป้าย/แผ่น - 3 คอลัมน์ × 8 แถว)
                  </h4>
                  <p className="text-[10px] text-[#757682]">
                    ใช้กับกระดาษสติกเกอร์ไดคัทมาตรฐาน ตราตราช้าง / Tomoegawa ขนาด 50×30 mm
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3 py-1 bg-[#00236f] text-white text-xs font-bold rounded-lg hover:bg-[#1e3a8a]"
                >
                  สั่งพิมพ์ทั้งแผ่น
                </button>
              </div>

              {/* Grid of 6 representative sample stickers for A4 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {assets.slice(0, 6).map((item) => (
                  <div
                    key={item.id}
                    className="p-2 border border-slate-300 rounded-lg bg-white text-left text-xs relative"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 pb-0.5 text-[8px]">
                      <span className="font-bold text-[#00236f]">KC</span>
                      <span className="text-[#757682] font-mono">{item.receivedDate}</span>
                    </div>

                    <div className="flex items-center gap-1.5 py-1">
                      <QrCode className="w-8 h-8 text-[#00236f] shrink-0" />
                      <div className="min-w-0">
                        <span className="font-mono font-bold text-[10px] text-[#00236f] block truncate">
                          {item.code}
                        </span>
                        <span className="font-semibold text-[9px] text-[#131b2e] block truncate">
                          {item.name}
                        </span>
                      </div>
                    </div>

                    <div className="text-[7px] text-[#757682] border-t border-slate-200 pt-0.5 flex justify-between">
                      <span>S/N: {item.serialNumber || 'N/A'}</span>
                      <span className="font-bold text-[#006a61]">฿{item.price.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: CODE SCHEME & STANDARDIZED NAMING CONVENTION */}
      {/* ========================================================================= */}
      {activeSubTab === 'code_scheme' && (
        <div className="space-y-4">
          {/* Standard Syntax Breakdown Card */}
          <div className="bg-white p-4 rounded-2xl border border-[#e2e7ff] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#131b2e] flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-[#00236f]" />
                โครงสร้างรหัสครุภัณฑ์มาตรฐาน (Standard Asset Syntax)
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#16a34a]">
                ISO 55000 Compliant
              </span>
            </div>

            {/* Formula Block */}
            <div className="bg-[#f2f3ff] p-3 rounded-xl border border-[#c5c5d3]/50 text-center">
              <span className="font-mono text-lg font-black text-[#00236f] tracking-wider">
                [PREFIX] - [CATEGORY] - [YEAR] - [SEQUENCE]
              </span>
              <p className="text-[11px] text-[#757682] mt-1">
                เช่น: <span className="font-mono font-bold text-[#006a61]">KC-IT-2024-0089</span> หรือ <span className="font-mono font-bold text-[#006a61]">KC-VH-2024-0012</span>
              </p>
            </div>

            {/* 4 Block Explanation */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#faf8ff] border border-[#e2e7ff]">
                <span className="font-mono font-bold text-[#00236f] block">1. PREFIX (รหัสองค์กร)</span>
                <span className="text-[11px] text-[#444651] mt-0.5 block">
                  ตัวย่อชื่อองค์กร เช่น <strong className="text-[#00236f]">KC</strong>
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#faf8ff] border border-[#e2e7ff]">
                <span className="font-mono font-bold text-[#00236f] block">2. CATEGORY (หมวดหมู่)</span>
                <span className="text-[11px] text-[#444651] mt-0.5 block">
                  IT (ไอที), VH (ยานพาหนะ), TL (เครื่องมือ), FN (เฟอร์นิเจอร์)
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#faf8ff] border border-[#e2e7ff]">
                <span className="font-mono font-bold text-[#00236f] block">3. YEAR (ปีงบประมาณ)</span>
                <span className="text-[11px] text-[#444651] mt-0.5 block">
                  ปี ค.ศ. หรือ พ.ศ. ที่รับครุภัณฑ์เข้าคลัง เช่น <strong className="text-[#00236f]">2024</strong>
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#faf8ff] border border-[#e2e7ff]">
                <span className="font-mono font-bold text-[#00236f] block">4. SEQUENCE (ลำดับที่)</span>
                <span className="text-[11px] text-[#444651] mt-0.5 block">
                  เลขรันนิ่ง 4 หลักต่อเนื่องในรอบปี เช่น <strong className="text-[#00236f]">0001 - 9999</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Code Generator Tool */}
          <div className="bg-white p-4 rounded-2xl border border-[#e2e7ff] shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-[#131b2e] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#006a61]" />
              เครื่องมือสร้างรหัสครุภัณฑ์มาตรฐาน (Code Generator)
            </h3>

            {/* Inputs Grid */}
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div>
                <label className="text-[10px] font-semibold text-[#757682] block mb-1">
                  Prefix
                </label>
                <input
                  type="text"
                  value={genPrefix}
                  onChange={(e) => setGenPrefix(e.target.value.toUpperCase())}
                  maxLength={4}
                  className="w-full font-mono font-bold text-center py-1.5 px-2 bg-[#f2f3ff] rounded-xl border border-[#c5c5d3] text-[#00236f]"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-[#757682] block mb-1">
                  หมวดหมู่
                </label>
                <select
                  value={genCategory}
                  onChange={(e) => setGenCategory(e.target.value)}
                  className="w-full font-mono font-bold py-1.5 px-1 bg-[#f2f3ff] rounded-xl border border-[#c5c5d3] text-[#00236f] text-xs"
                >
                  <option value="IT">IT (ไอที)</option>
                  <option value="VH">VH (ยานพาหนะ)</option>
                  <option value="TL">TL (เครื่องมือ)</option>
                  <option value="FN">FN (เฟอร์นิเจอร์)</option>
                  <option value="AV">AV (โสตทัศน์)</option>
                  <option value="NB">NB (โน้ตบุ๊ก)</option>
                  <option value="DR">DR (โดรน)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-[#757682] block mb-1">
                  ปีจัดซื้อ
                </label>
                <input
                  type="text"
                  value={genYear}
                  onChange={(e) => setGenYear(e.target.value)}
                  maxLength={4}
                  className="w-full font-mono font-bold text-center py-1.5 px-2 bg-[#f2f3ff] rounded-xl border border-[#c5c5d3] text-[#00236f]"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-[#757682] block mb-1">
                  ลำดับรันนิ่ง
                </label>
                <input
                  type="text"
                  value={genSequence}
                  onChange={(e) => setGenSequence(e.target.value)}
                  maxLength={4}
                  className="w-full font-mono font-bold text-center py-1.5 px-2 bg-[#f2f3ff] rounded-xl border border-[#c5c5d3] text-[#00236f]"
                />
              </div>
            </div>

            {/* Generated Result Display */}
            <div className="p-3 bg-[#faf8ff] rounded-xl border border-[#00236f]/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#757682] block">ผลลัพธ์รหัสมาตรฐานที่ได้:</span>
                <span className="font-mono text-base font-black text-[#00236f]">
                  {generatedCode}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#c5c5d3] text-[#00236f] text-xs font-bold hover:bg-slate-50 transition-all"
                >
                  {generatedCodeCopied ? <Check className="w-3.5 h-3.5 text-[#16a34a]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{generatedCodeCopied ? 'คัดลอกแล้ว' : 'คัดลอกรหัส'}</span>
                </button>

                {onOpenRegisterAssetWithCode && (
                  <button
                    type="button"
                    onClick={() => onOpenRegisterAssetWithCode(generatedCode)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#00236f] text-white text-xs font-bold hover:bg-[#1e3a8a] transition-all shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>ใช้ลงทะเบียน</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Reference Table of Standard Depreciation & Category Codes */}
          <div className="bg-white p-4 rounded-2xl border border-[#e2e7ff] shadow-xs space-y-2">
            <h4 className="text-xs font-bold text-[#131b2e]">
              ตารางรหัสและอัตราค่าเสื่อมราคามาตรฐาน (Depreciation Rate Schedule)
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#f2f3ff] text-[#00236f] font-bold">
                  <tr>
                    <th className="p-2">หมวด</th>
                    <th className="p-2">ชื่อหมวดหมู่ภาษาไทย</th>
                    <th className="p-2 text-center">อายุใช้งาน</th>
                    <th className="p-2 text-right">ค่าเสื่อม/ปี</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e7ff]">
                  <tr>
                    <td className="p-2 font-mono font-bold text-[#006a61]">IT</td>
                    <td className="p-2">เครื่องคอมพิวเตอร์และอุปกรณ์ประมวลผล</td>
                    <td className="p-2 text-center font-semibold">5 ปี</td>
                    <td className="p-2 text-right font-bold text-[#00236f]">20% ต่อปี</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-bold text-[#006a61]">VH</td>
                    <td className="p-2">ยานพาหนะและเครื่องจักรกลขนส่ง</td>
                    <td className="p-2 text-center font-semibold">5 ปี</td>
                    <td className="p-2 text-right font-bold text-[#00236f]">20% ต่อปี</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-bold text-[#006a61]">TL</td>
                    <td className="p-2">เครื่องมือวิทยาศาสตร์และเครื่องมือช่าง</td>
                    <td className="p-2 text-center font-semibold">5 ปี</td>
                    <td className="p-2 text-right font-bold text-[#00236f]">20% ต่อปี</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-bold text-[#006a61]">FN</td>
                    <td className="p-2">ครุภัณฑ์สำนักงานและเฟอร์นิเจอร์</td>
                    <td className="p-2 text-center font-semibold">10 ปี</td>
                    <td className="p-2 text-right font-bold text-[#00236f]">10% ต่อปี</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-bold text-[#006a61]">AV</td>
                    <td className="p-2">อุปกรณ์โสตทัศนูปกรณ์และกล้องถ่ายภาพ</td>
                    <td className="p-2 text-center font-semibold">5 ปี</td>
                    <td className="p-2 text-right font-bold text-[#00236f]">20% ต่อปี</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

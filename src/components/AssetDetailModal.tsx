import React from 'react';
import {
  X,
  QrCode,
  MapPin,
  Calendar,
  DollarSign,
  Tag,
  Wrench,
  ShoppingCart,
  Share2,
  Printer,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { Asset } from '../types';

interface AssetDetailModalProps {
  asset: Asset | null;
  onClose: () => void;
  onRequestBorrow: (asset: Asset) => void;
  onReportRepair: (asset: Asset) => void;
  onToggleStatus: (asset: Asset) => void;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  asset,
  onClose,
  onRequestBorrow,
  onReportRepair,
  onToggleStatus,
}) => {
  if (!asset) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto p-5 shadow-2xl border border-[#e2e7ff] animate-in slide-in-from-bottom duration-200">
        {/* Header with image */}
        <div className="relative rounded-2xl overflow-hidden h-44 mb-4 border border-[#e2e7ff] bg-slate-100">
          <img
            src={asset.imageUrl}
            alt={asset.name}
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 backdrop-blur-xs"
          >
            <X className="w-4 h-4" />
          </button>

          <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white font-mono text-xs font-bold">
            {asset.code}
          </span>
        </div>

        {/* Title & Status */}
        <div className="space-y-1 pb-3 border-b border-[#e2e7ff]">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-extrabold text-[#131b2e]">
              {asset.name}
            </h3>
            {asset.status === 'available' && (
              <span className="px-2.5 py-1 rounded-full bg-[#dcfce7] text-[#16a34a] text-xs font-bold">
                {asset.statusLabel}
              </span>
            )}
            {asset.status === 'checked_out' && (
              <span className="px-2.5 py-1 rounded-full bg-[#ffedd5] text-[#c2410c] text-xs font-bold">
                {asset.statusLabel}
              </span>
            )}
            {asset.status === 'maintenance' && (
              <span className="px-2.5 py-1 rounded-full bg-[#fee2e2] text-[#dc2626] text-xs font-bold">
                {asset.statusLabel}
              </span>
            )}
          </div>
          <p className="text-xs text-[#006a61] font-semibold">
            หมวดหมู่: {asset.categoryName}
          </p>
        </div>

        {/* Specs and Details Grid */}
        <div className="grid grid-cols-2 gap-2.5 py-3 border-b border-[#e2e7ff] text-xs">
          <div className="bg-[#f2f3ff] p-2.5 rounded-xl">
            <span className="text-[11px] text-[#757682] block">ราคาประเมิน</span>
            <span className="font-black text-[#00236f] text-sm mt-0.5 block">
              ฿{asset.price.toLocaleString()}
            </span>
          </div>

          <div className="bg-[#f2f3ff] p-2.5 rounded-xl">
            <span className="text-[11px] text-[#757682] block">สภาพครุภัณฑ์</span>
            <span className="font-bold text-[#131b2e] text-xs mt-0.5 block truncate">
              {asset.conditionGrade || 'สภาพดี 98%'}
            </span>
          </div>

          <div className="bg-[#f2f3ff] p-2.5 rounded-xl">
            <span className="text-[11px] text-[#757682] block">Serial Number</span>
            <span className="font-mono text-[#131b2e] text-xs mt-0.5 block truncate">
              {asset.serialNumber || 'N/A'}
            </span>
          </div>

          <div className="bg-[#f2f3ff] p-2.5 rounded-xl">
            <span className="text-[11px] text-[#757682] block">สถานที่ประจำการ</span>
            <span className="font-semibold text-[#131b2e] text-xs mt-0.5 block truncate">
              {asset.location}
            </span>
          </div>
        </div>

        {/* Technical Specs description if available */}
        {asset.specs && (
          <div className="py-2.5 border-b border-[#e2e7ff]">
            <span className="text-[11px] font-bold text-[#757682] block uppercase tracking-wider mb-1">
              สเปกและรายละเอียดทางเทคนิค
            </span>
            <p className="text-xs text-[#444651] leading-relaxed">
              {asset.specs}
            </p>
          </div>
        )}

        {/* Simulated QR Code Tag for Printing */}
        <div className="mt-3 bg-[#faf8ff] p-3 rounded-2xl border border-[#e2e7ff] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl border border-[#c5c5d3] p-1 flex items-center justify-center">
              <QrCode className="w-9 h-9 text-[#00236f]" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#131b2e] block">
                แท็กติดอุปกรณ์ (Digital Asset Tag)
              </span>
              <span className="font-mono text-[10px] text-[#757682]">
                QR-HASH: {asset.code}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert(`ส่งคำสั่งพิมพ์แท็ก QR สำหรับ ${asset.code} ไปยังเครื่องพิมพ์สติกเกอร์เรียบร้อยแล้ว`)}
            className="p-2 rounded-xl bg-white border border-[#e2e7ff] text-[#00236f] hover:bg-[#eaedff] transition-colors"
            title="พิมพ์แท็ก"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            type="button"
            onClick={() => {
              onRequestBorrow(asset);
              onClose();
            }}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#00236f] text-white text-xs font-bold hover:bg-[#1e3a8a] active:scale-95 transition-all shadow-sm"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>ขอเบิกใช้งาน</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onReportRepair(asset);
              onClose();
            }}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#f2f3ff] border border-[#e2e7ff] text-[#00236f] text-xs font-bold hover:bg-[#eaedff] active:scale-95 transition-all"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>แจ้งซ่อมบำรุง</span>
          </button>
        </div>
      </div>
    </div>
  );
};

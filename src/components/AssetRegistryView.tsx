import React, { useState, useMemo } from 'react';
import {
  Search,
  QrCode,
  Laptop,
  Car,
  Wrench,
  Armchair,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Monitor,
  Video,
  Plane,
  ArrowUpDown,
  MapPin,
  Calendar,
  Plus,
  Tag,
  Warehouse,
  Package,
} from 'lucide-react';
import { Asset, AssetCategory } from '../types';

interface AssetRegistryViewProps {
  assets: Asset[];
  onOpenScanner: () => void;
  onOpenRegisterAsset: () => void;
  onSelectAsset: (asset: Asset) => void;
}

export const AssetRegistryView: React.FC<AssetRegistryViewProps> = ({
  assets,
  onOpenScanner,
  onOpenRegisterAsset,
  onSelectAsset,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'price_high' | 'name'>('newest');

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesCategory =
        selectedCategory === 'all' || asset.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        asset.name.toLowerCase().includes(q) ||
        asset.code.toLowerCase().includes(q) ||
        (asset.serialNumber && asset.serialNumber.toLowerCase().includes(q)) ||
        asset.location.toLowerCase().includes(q) ||
        (asset.assignedUser && asset.assignedUser.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [assets, selectedCategory, searchQuery]);

  const sortedAssets = useMemo(() => {
    const list = [...filteredAssets];
    if (sortOrder === 'price_high') {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortOrder === 'name') {
      return list.sort((a, b) => a.name.localeCompare(b.name, 'th'));
    }
    return list; // default 'newest'
  }, [filteredAssets, sortOrder]);

  const categories = [
    { id: 'all', label: 'ทั้งหมด', count: assets.length, icon: null },
    { id: 'it', label: 'อุปกรณ์ไอที', icon: Laptop },
    { id: 'vehicle', label: 'ยานพาหนะ', icon: Car },
    { id: 'tool', label: 'เครื่องมือช่าง', icon: Wrench },
    { id: 'furniture', label: 'เฟอร์นิเจอร์', icon: Armchair },
  ];

  // Helper for item thumbnail badge icon
  const getThumbnailIcon = (iconType: Asset['iconType']) => {
    switch (iconType) {
      case 'laptop':
        return <Laptop className="w-3.5 h-3.5" />;
      case 'camera':
        return <Video className="w-3.5 h-3.5" />;
      case 'drone':
        return <Plane className="w-3.5 h-3.5" />;
      case 'vehicle':
        return <Car className="w-3.5 h-3.5" />;
      case 'furniture':
        return <Armchair className="w-3.5 h-3.5" />;
      default:
        return <Monitor className="w-3.5 h-3.5" />;
    }
  };

  // Dynamic KPI counts
  const totalCount = assets.length;
  const availableCount = assets.filter((a) => a.status === 'available').length;
  const inUseOrMaintCount = assets.filter((a) => a.status === 'maintenance' || a.status === 'checked_out').length;
  const completionPercent = totalCount > 0 ? Math.round((availableCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-3.5 pb-28 relative">
      {/* 1. Search Bar with QR Button */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#757682] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="asset-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหารหัสครุภัณฑ์, Serial No, หรือชื่อ..."
            className="w-full pl-9 pr-3.5 py-2.5 bg-white rounded-2xl border border-[#e2e7ff] text-xs text-[#131b2e] placeholder-[#757682] focus:outline-none focus:ring-2 focus:ring-[#00236f] shadow-xs"
          />
        </div>

        <button
          type="button"
          id="asset-scan-qr-btn"
          onClick={onOpenScanner}
          className="w-11 h-11 rounded-2xl bg-[#00236f] text-white flex items-center justify-center hover:bg-[#1e3a8a] active:scale-95 transition-all shrink-0 shadow-xs"
          aria-label="สแกน QR ครุภัณฑ์"
        >
          <QrCode className="w-5 h-5" />
        </button>
      </div>

      {/* 2. 3 Stat KPI Cards */}
      <div className="grid grid-cols-3 gap-2">
        {/* Stat 1: ในระบบ */}
        <div className="bg-white p-2.5 rounded-2xl border border-[#e2e7ff] shadow-xs">
          <div className="flex items-center gap-1.5 text-xs text-[#444651]">
            <Monitor className="w-3.5 h-3.5 text-[#006a61]" />
            <span className="font-medium text-[11px]">ในระบบ</span>
          </div>
          <div className="mt-1">
            <span className="text-xl font-black text-[#131b2e]">{totalCount.toLocaleString()}</span>
          </div>
          <p className="text-[10px] text-[#757682] mt-0.5 truncate">
            {totalCount === 0 ? 'รอลงทะเบียน' : 'ชิ้นส่วนทั้งหมด'}
          </p>
        </div>

        {/* Stat 2: พร้อมใช้ */}
        <div className="bg-white p-2.5 rounded-2xl border border-[#e2e7ff] shadow-xs">
          <div className="flex items-center gap-1.5 text-xs text-[#444651]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a]" />
            <span className="font-medium text-[11px]">พร้อมใช้</span>
          </div>
          <div className="mt-1">
            <span className="text-xl font-black text-[#006a61]">{availableCount.toLocaleString()}</span>
          </div>
          <p className="text-[10px] text-[#16a34a] font-medium mt-0.5 truncate">
            {totalCount > 0 ? `${completionPercent}% พร้อมใช้งาน` : '0%'}
          </p>
        </div>

        {/* Stat 3: เบิก/ซ่อม */}
        <div className="bg-white p-2.5 rounded-2xl border border-[#e2e7ff] shadow-xs">
          <div className="flex items-center gap-1.5 text-xs text-[#444651]">
            <Wrench className="w-3.5 h-3.5 text-[#ea580c]" />
            <span className="font-medium text-[11px]">เบิก/ซ่อม</span>
          </div>
          <div className="mt-1">
            <span className="text-xl font-black text-[#ea580c]">{inUseOrMaintCount.toLocaleString()}</span>
          </div>
          <p className="text-[10px] text-[#ea580c] font-medium mt-0.5 truncate">
            {inUseOrMaintCount > 0 ? 'กำลังถูกใช้งาน' : 'ไม่มีค้าง'}
          </p>
        </div>
      </div>

      {/* 3. Category Horizontal Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              id={`cat-filter-${cat.id}`}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-[#00236f] text-white shadow-xs'
                  : 'bg-[#f2f3ff] text-[#444651] border border-[#e2e7ff] hover:bg-[#eaedff]'
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              <span>{cat.label}</span>
              {cat.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-white text-[#757682]'
                  }`}
                >
                  {cat.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 4. Section Title & Sort */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-[#131b2e]">รายการครุภัณฑ์</h3>
          <span className="px-2 py-0.5 rounded-full bg-[#f2f3ff] border border-[#e2e7ff] text-[11px] text-[#444651] font-semibold">
            {sortedAssets.length} รายการ
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            if (sortOrder === 'newest') setSortOrder('price_high');
            else if (sortOrder === 'price_high') setSortOrder('name');
            else setSortOrder('newest');
          }}
          className="flex items-center gap-1 text-xs text-[#444651] font-medium hover:text-[#00236f]"
        >
          <ArrowUpDown className="w-3 h-3" />
          <span>
            {sortOrder === 'newest'
              ? 'ล่าสุด'
              : sortOrder === 'price_high'
              ? 'ราคาสูงสุด'
              : 'ตามชื่อ'}
          </span>
        </button>
      </div>

      {/* 5. Asset Cards List */}
      <div className="space-y-2.5">
        {sortedAssets.map((asset) => (
          <div
            key={asset.id}
            id={`asset-card-${asset.code}`}
            onClick={() => onSelectAsset(asset)}
            className="bg-white rounded-2xl p-3 border border-[#e2e7ff] shadow-xs hover:border-[#00236f] cursor-pointer transition-all flex gap-3 group"
          >
            {/* Thumbnail with overlay icon */}
            <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-[#e2e7ff] bg-slate-100">
              <img
                src={asset.imageUrl}
                alt={asset.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-1 right-1 w-5 h-5 rounded-md bg-black/60 backdrop-blur-xs text-white flex items-center justify-center">
                {getThumbnailIcon(asset.iconType)}
              </div>
            </div>

            {/* Asset Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                {/* Top Code & 3-dots */}
                <div className="flex items-center justify-between gap-1">
                  <span className="font-mono text-xs font-bold text-[#006a61]">
                    {asset.code}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectAsset(asset);
                    }}
                    className="text-[#757682] hover:text-[#131b2e] p-0.5 rounded-full"
                    aria-label="ตัวเลือกเพิ่มเติม"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                {/* Name */}
                <h4 className="text-sm font-bold text-[#131b2e] truncate mt-0.5">
                  {asset.name}
                </h4>

                {/* Status Badge & Condition/SN */}
                <div className="flex flex-wrap items-center gap-1.5 mt-1">
                  {asset.status === 'available' && (
                    <span className="px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#16a34a] text-[10px] font-bold inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
                      {asset.statusLabel}
                    </span>
                  )}
                  {asset.status === 'checked_out' && (
                    <span className="px-2 py-0.5 rounded-full bg-[#ffedd5] text-[#c2410c] text-[10px] font-bold inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c2410c]" />
                      {asset.statusLabel}
                    </span>
                  )}
                  {asset.status === 'maintenance' && (
                    <span className="px-2 py-0.5 rounded-full bg-[#fee2e2] text-[#dc2626] text-[10px] font-bold inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
                      {asset.statusLabel}
                    </span>
                  )}

                  {asset.serialNumber && (
                    <span className="text-[11px] text-[#757682] font-mono">
                      {asset.serialNumber.startsWith('ทะเบียน')
                        ? asset.serialNumber
                        : `S/N: ${asset.serialNumber}`}
                    </span>
                  )}
                  {asset.conditionGrade && !asset.serialNumber?.startsWith('ทะเบียน') && (
                    <span className="text-[11px] text-[#757682]">
                      {asset.conditionGrade}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Details Row */}
              <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#f2f3ff] text-xs">
                {asset.assignedUser ? (
                  <div className="flex items-center gap-1 text-[#444651] truncate">
                    <span>👤</span>
                    <span className="truncate">{asset.assignedUser}</span>
                  </div>
                ) : asset.location ? (
                  <div className="flex items-center gap-1 text-[#757682] truncate">
                    <MapPin className="w-3 h-3 shrink-0 text-[#006a61]" />
                    <span className="truncate">{asset.location}</span>
                  </div>
                ) : (
                  <span className="text-[11px] text-[#757682]">
                    {asset.receivedDate}
                  </span>
                )}

                {/* Price or Note */}
                {asset.status === 'maintenance' ? (
                  <span className="text-[11px] text-[#dc2626] font-semibold">
                    เช็คระยะรอบ 60,000 กม.
                  </span>
                ) : (
                  <span className="font-bold text-[#00236f] text-xs shrink-0">
                    ฿{asset.price.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {sortedAssets.length === 0 && (
          <div className="text-center py-12 px-4 bg-white rounded-2xl border border-dashed border-[#b6c4ff] space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#f2f3ff] text-[#00236f] flex items-center justify-center">
              <Package className="w-7 h-7" />
            </div>
            {assets.length === 0 ? (
              <div className="space-y-1.5 max-w-xs mx-auto">
                <h4 className="text-sm font-bold text-[#131b2e]">
                  พร้อมลงทะเบียนครุภัณฑ์ชุดใหม่
                </h4>
                <p className="text-xs text-[#565e74] leading-relaxed">
                  ลบคุรุภัณฑ์เดิมทั้งหมดออกเรียบร้อยแล้ว กดปุ่มด้านล่างเพื่อเริ่มลงทะเบียนครุภัณฑ์ชิ้นใหม่ได้ทันที
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenRegisterAsset}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00236f] text-white text-xs font-bold hover:bg-[#1e3a8a] shadow-xs active:scale-95 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ลงทะเบียนครุภัณฑ์ใหม่</span>
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#757682]">ไม่พบข้อมูลครุภัณฑ์ที่ค้นหา</p>
            )}
          </div>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-20 right-4 z-20 flex flex-col items-end gap-2.5">
        {/* Floating pill: Scan QR tag */}
        <button
          type="button"
          id="fab-scan-qr-tag"
          onClick={onOpenScanner}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-[#131b2e] border border-[#e2e7ff] shadow-md hover:bg-slate-50 active:scale-95 transition-all text-xs font-bold"
        >
          <QrCode className="w-4 h-4 text-[#00236f]" />
          <span>สแกนแท็ก QR</span>
        </button>

        {/* Main Big FAB: Register New Asset */}
        <button
          type="button"
          id="fab-register-new-asset"
          onClick={onOpenRegisterAsset}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#00236f] text-white shadow-lg hover:bg-[#1e3a8a] active:scale-95 transition-all font-bold text-sm"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>ลงทะเบียนใหม่</span>
        </button>
      </div>
    </div>
  );
};

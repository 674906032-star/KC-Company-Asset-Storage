import React, { useState } from 'react';
import { X, Plus, Image as ImageIcon, Laptop, Car, Wrench, Armchair } from 'lucide-react';
import { Asset, AssetCategory } from '../types';

interface RegisterAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAsset: (newAsset: Asset) => void;
}

export const RegisterAssetModal: React.FC<RegisterAssetModalProps> = ({
  isOpen,
  onClose,
  onAddAsset,
}) => {
  const [code, setCode] = useState(`KC-IT-2024-${Math.floor(1000 + Math.random() * 9000)}`);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<AssetCategory>('it');
  const [price, setPrice] = useState('45000');
  const [location, setLocation] = useState('สำนักงานใหญ่ ชั้น 3');
  const [serialNumber, setSerialNumber] = useState('');
  const [conditionGrade, setConditionGrade] = useState('สภาพ 100% (ใหม่)');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const categoryNames: Record<AssetCategory, string> = {
      it: 'อุปกรณ์ไอที',
      vehicle: 'ยานพาหนะ',
      tool: 'เครื่องมือช่าง',
      furniture: 'เฟอร์นิเจอร์',
    };

    const iconTypeMap: Record<AssetCategory, Asset['iconType']> = {
      it: 'laptop',
      vehicle: 'vehicle',
      tool: 'tool',
      furniture: 'furniture',
    };

    const newAsset: Asset = {
      id: `asset-${Date.now()}`,
      code: code.trim(),
      name: name.trim(),
      category,
      categoryName: categoryNames[category],
      status: 'available',
      statusLabel: 'พร้อมใช้งาน',
      serialNumber: serialNumber.trim() || undefined,
      location: location.trim() || 'คลังพัสดุกลาง',
      price: parseFloat(price) || 0,
      conditionGrade,
      receivedDate: 'รับเข้าวันนี้',
      imageUrl,
      iconType: iconTypeMap[category],
    };

    onAddAsset(newAsset);
    onClose();
  };

  const sampleImages = [
    { label: 'MacBook', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
    { label: 'Camera', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80' },
    { label: 'Drone', url: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80' },
    { label: 'Vehicle', url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80' },
    { label: 'Furniture', url: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=600&q=80' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto p-5 shadow-2xl border border-[#e2e7ff] animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e7ff]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#00236f] text-white flex items-center justify-center">
              <Plus className="w-4 h-4 stroke-[3]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#131b2e]">
                ลงทะเบียนครุภัณฑ์ใหม่
              </h3>
              <p className="text-xs text-[#757682]">เพิ่มข้อมูลเข้าสู่ระบบ Asset Registry</p>
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
              รหัสครุภัณฑ์ (Asset Tag ID)
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="w-full px-3.5 py-2 rounded-xl border border-[#e2e7ff] text-xs font-mono font-bold text-[#00236f] bg-[#f2f3ff] focus:outline-none focus:ring-2 focus:ring-[#00236f]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#131b2e] block mb-1">
              ชื่อครุภัณฑ์ / รายการ
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="เช่น iPad Pro 12.9 M2 Wi-Fi 256GB"
              required
              className="w-full px-3.5 py-2 rounded-xl border border-[#e2e7ff] text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00236f]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-xs font-bold text-[#131b2e] block mb-1">
                หมวดหมู่
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AssetCategory)}
                className="w-full px-3 py-2 rounded-xl border border-[#e2e7ff] text-xs text-[#131b2e] bg-white focus:outline-none focus:ring-2 focus:ring-[#00236f]"
              >
                <option value="it">อุปกรณ์ไอที</option>
                <option value="vehicle">ยานพาหนะ</option>
                <option value="tool">เครื่องมือช่าง</option>
                <option value="furniture">เฟอร์นิเจอร์</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-[#131b2e] block mb-1">
                ราคาจัดซื้อ (บาท)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-[#e2e7ff] text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00236f]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-xs font-bold text-[#131b2e] block mb-1">
                Serial Number
              </label>
              <input
                type="text"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                placeholder="เช่น C02XN099PL8R"
                className="w-full px-3 py-2 rounded-xl border border-[#e2e7ff] text-xs text-[#131b2e] font-mono focus:outline-none focus:ring-2 focus:ring-[#00236f]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#131b2e] block mb-1">
                สภาพเริ่มต้น
              </label>
              <input
                type="text"
                value={conditionGrade}
                onChange={(e) => setConditionGrade(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#e2e7ff] text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00236f]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#131b2e] block mb-1">
              สถานที่จัดเก็บ / ประจำการ
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-[#e2e7ff] text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00236f]"
            />
          </div>

          {/* Quick Photo Selection */}
          <div>
            <label className="text-xs font-bold text-[#131b2e] block mb-1">
              เลือกรูปภาพตัวอย่าง
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {sampleImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setImageUrl(img.url)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 relative ${
                    imageUrl === img.url ? 'border-[#00236f] ring-2 ring-[#00236f]/30' : 'border-transparent'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  <span className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[9px] text-center">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#00236f] text-white text-xs font-bold hover:bg-[#1e3a8a] active:scale-95 transition-all shadow-md"
            >
              บันทึกและสร้างแท็ก QR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  X,
  Camera,
  Flashlight,
  Volume2,
  VolumeX,
  CheckCircle,
  Laptop,
  Video,
  Plane,
  Car,
  Armchair,
} from 'lucide-react';
import { Asset } from '../types';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  assets: Asset[];
  onAssetScanned: (asset: Asset) => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
  assets,
  onAssetScanned,
}) => {
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [scannedAsset, setScannedAsset] = useState<Asset | null>(null);

  if (!isOpen) return null;

  const handleSimulateScan = (asset: Asset) => {
    setScannedAsset(asset);
    setTimeout(() => {
      onAssetScanned(asset);
      setScannedAsset(null);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-between p-4 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between text-white pt-2">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-[#86f2e4]" />
          <span className="font-bold text-sm">สแกนแท็ก QR ครุภัณฑ์</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFlashlightOn(!flashlightOn)}
            className={`p-2 rounded-full transition-all ${
              flashlightOn ? 'bg-amber-400 text-black' : 'bg-white/10 text-white'
            }`}
            aria-label="ไฟฉาย"
          >
            <Flashlight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setSoundOn(!soundOn)}
            className="p-2 rounded-full bg-white/10 text-white transition-all"
            aria-label="เสียงแจ้งเตือน"
          >
            {soundOn ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all"
            aria-label="ปิด"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Center Viewfinder */}
      <div className="flex flex-col items-center justify-center my-auto">
        <div className="relative w-64 h-64 border-2 border-[#86f2e4]/50 rounded-3xl overflow-hidden flex items-center justify-center shadow-2xl">
          {/* Corner brackets */}
          <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-[#86f2e4] rounded-tl-xl" />
          <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-[#86f2e4] rounded-tr-xl" />
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-[#86f2e4] rounded-bl-xl" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-[#86f2e4] rounded-br-xl" />

          {/* Laser scanning line */}
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#86f2e4] to-transparent shadow-[0_0_12px_#86f2e4] animate-pulse" />

          {/* Flash effect on scan */}
          {scannedAsset ? (
            <div className="flex flex-col items-center justify-center bg-[#00236f]/90 p-4 rounded-2xl text-center text-white animate-in zoom-in-90">
              <CheckCircle className="w-10 h-10 text-[#86f2e4] mb-2" />
              <span className="font-mono text-xs text-[#86f2e4]">
                {scannedAsset.code}
              </span>
              <span className="font-bold text-sm mt-1">{scannedAsset.name}</span>
            </div>
          ) : (
            <div className="text-center text-white/70 px-4">
              <p className="text-xs">
                จัดตำแหน่ง QR Code หรือ Barcode ให้อยู่ในกรอบ
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Quick Test Barcode Bar */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 text-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-white/90">
            จำลองการสแกนแท็ก (กดเพื่อทดสอบ):
          </span>
          <span className="text-[10px] text-white/60">คลิก 1 รายการ</span>
        </div>

        {assets.length > 0 ? (
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {assets.slice(0, 5).map((asset) => (
              <button
                key={asset.id}
                type="button"
                onClick={() => handleSimulateScan(asset)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-[#00236f] text-xs font-mono whitespace-nowrap transition-all border border-white/20"
              >
                <span className="text-[#86f2e4]">{asset.code}</span>
                <span className="text-white/80 text-[11px] font-sans truncate max-w-[90px]">
                  {asset.name}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs text-white/70 py-1 text-center">
            ยังไม่มีครุภัณฑ์ในระบบ — ท่านสามารถลงทะเบียนครุภัณฑ์ชิ้นใหม่ได้ทันที
          </p>
        )}
      </div>
    </div>
  );
};

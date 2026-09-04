import React, { useState, useRef } from 'react';
import { X, PenTool, CheckCircle, ShieldCheck, Trash2 } from 'lucide-react';
import { ApprovalRequest, AdminProfile } from '../types';

interface SignatureApprovalModalProps {
  request: ApprovalRequest | null;
  onClose: () => void;
  onConfirmApproval: (request: ApprovalRequest, signatureData: string) => void;
  adminProfile?: AdminProfile;
}

export const SignatureApprovalModal: React.FC<SignatureApprovalModalProps> = ({
  request,
  onClose,
  onConfirmApproval,
  adminProfile,
}) => {
  const [typedName, setTypedName] = useState(
    adminProfile
      ? `${adminProfile.name} (${adminProfile.gmail})`
      : 'ภัสสร ศิริโชคชัย (passorn.kc@gmail.com)'
  );
  const [hasDrawn, setHasDrawn] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);

  if (!request) return null;

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#00236f';
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
    setHasDrawn(true);
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleConfirm = () => {
    onConfirmApproval(request, typedName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto p-5 shadow-2xl border border-[#e2e7ff] animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e7ff]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#00236f] text-white flex items-center justify-center">
              <PenTool className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#131b2e]">
                ลงนามอนุมัติคำขอเบิก
              </h3>
              <span className="font-mono text-xs text-[#006a61] font-bold">
                {request.code}
              </span>
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

        {/* Summary Info */}
        <div className="bg-[#f2f3ff] rounded-2xl p-3 mt-3 text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-[#757682]">ผู้ขอเบิก:</span>
            <span className="font-bold text-[#131b2e]">{request.requester.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#757682]">อุปกรณ์:</span>
            <span className="font-bold text-[#131b2e] truncate max-w-[220px]">
              {request.items.map((i) => i.name).join(', ')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#757682]">ระยะเวลา:</span>
            <span className="font-bold text-[#006a61]">{request.period.durationText}</span>
          </div>
        </div>

        {/* Digital Signature Pad */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-[#131b2e] flex items-center gap-1">
              <PenTool className="w-3.5 h-3.5 text-[#00236f]" />
              <span>ลายเซ็นดิจิทัล (วาดด้วยนิ้วมือหรือเมาส์)</span>
            </label>
            <button
              type="button"
              onClick={clearCanvas}
              className="text-[11px] text-[#dc2626] font-medium flex items-center gap-1 hover:underline"
            >
              <Trash2 className="w-3 h-3" />
              ล้างลายเซ็น
            </button>
          </div>

          <div className="relative border-2 border-dashed border-[#b6c4ff] rounded-2xl overflow-hidden bg-slate-50 touch-none h-36 flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={380}
              height={144}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-full cursor-crosshair"
            />
            {!hasDrawn && (
              <span className="absolute pointer-events-none text-xs text-[#757682]/60 select-none">
                เซ็นชื่อที่นี่ (Sign here)
              </span>
            )}
          </div>
        </div>

        {/* Electronic Name Verification */}
        <div className="mt-3">
          <label className="text-xs font-bold text-[#131b2e] block mb-1">
            ชื่อและตำแหน่งผู้อนุมัติ
          </label>
          <input
            type="text"
            value={typedName}
            onChange={(e) => setTypedName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-[#e2e7ff] text-xs text-[#131b2e] bg-[#f2f3ff] focus:outline-none"
          />
        </div>

        {/* Security Stamp Notice */}
        <div className="mt-3 p-2.5 rounded-xl bg-[#dcfce7]/60 border border-[#bbf7d0] flex items-center gap-2 text-[11px] text-[#166534]">
          <ShieldCheck className="w-4 h-4 shrink-0 text-[#16a34a]" />
          <span>
            ลงนามด้วยใบรับรองดิจิทัล KC Audit Trail v2.4 (บันทึกเวลาและ IP)
          </span>
        </div>

        {/* Confirm Action Button */}
        <div className="pt-3">
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full py-3 rounded-xl bg-[#00236f] text-white text-xs font-bold hover:bg-[#1e3a8a] active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4 text-[#86f2e4]" />
            <span>ยืนยันการอนุมัติและส่งต่อ รปภ. ตรวจปล่อย</span>
          </button>
        </div>
      </div>
    </div>
  );
};

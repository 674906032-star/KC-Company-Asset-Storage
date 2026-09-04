import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto p-3 rounded-2xl shadow-xl border flex items-start gap-2.5 animate-in slide-in-from-top duration-300 ${
            t.type === 'success'
              ? 'bg-white border-[#bbf7d0] text-[#131b2e]'
              : t.type === 'error'
              ? 'bg-white border-[#fecaca] text-[#131b2e]'
              : 'bg-white border-[#b6c4ff] text-[#131b2e]'
          }`}
        >
          {t.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-[#16a34a] shrink-0 mt-0.5" />
          )}
          {t.type === 'error' && (
            <AlertCircle className="w-5 h-5 text-[#dc2626] shrink-0 mt-0.5" />
          )}
          {t.type === 'info' && (
            <Info className="w-5 h-5 text-[#00236f] shrink-0 mt-0.5" />
          )}

          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-bold leading-tight">{t.title}</h5>
            {t.message && (
              <p className="text-[11px] text-[#444651] mt-0.5 leading-snug">
                {t.message}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => onDismiss(t.id)}
            className="text-[#757682] hover:text-[#131b2e] p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

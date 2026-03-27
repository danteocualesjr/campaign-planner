"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
}

export default function ConfirmModal({ open, onClose, onConfirm, title, message, confirmText = "Delete" }: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      ref.current?.focus();
      const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
      document.addEventListener("keydown", esc);
      return () => document.removeEventListener("keydown", esc);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-base/80 backdrop-blur-sm modal-backdrop" onClick={onClose} />
      <div className="relative w-full max-w-sm card p-5 animate-scale">
        <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-md text-text-subtle hover:text-text">
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-danger-muted flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-danger" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-text mb-1">{title}</h3>
            <p className="text-[13px] text-text-muted leading-relaxed">{message}</p>
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="h-9 px-4 btn btn-ghost text-[13px]">Cancel</button>
          <button ref={ref} onClick={() => { onConfirm(); onClose(); }} className="h-9 px-4 btn bg-danger text-white hover:bg-danger/90 text-[13px]">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

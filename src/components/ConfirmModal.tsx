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
      <div className="absolute inset-0 bg-bg/90 backdrop-blur-xl modal-backdrop" onClick={onClose} />
      <div className="relative w-full max-w-sm glass rounded-2xl p-6 animate-scale">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-elevated border border-border flex items-center justify-center text-text-tertiary hover:text-text hover:border-border-light transition-colors">
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-red-bg border border-red/20 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-red" />
          </div>
          <div className="pt-1">
            <h3 className="text-lg font-bold text-text mb-1">{title}</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{message}</p>
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="h-10 px-5 btn-secondary text-sm font-semibold">Cancel</button>
          <button 
            ref={ref} 
            onClick={() => { onConfirm(); onClose(); }} 
            className="h-10 px-5 rounded-xl bg-gradient-to-r from-red to-orange text-white font-semibold text-sm shadow-lg shadow-red/20 hover:shadow-red/40 transition-all"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

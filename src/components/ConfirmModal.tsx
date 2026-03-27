"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  confirmVariant?: "danger" | "primary";
}

export default function ConfirmModal({ open, onClose, onConfirm, title, message, confirmText = "Confirm", confirmVariant = "danger" }: ConfirmModalProps) {
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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm modal-backdrop" onClick={onClose} />
      <div className="relative w-full max-w-sm glass rounded-xl anim-scale" role="alertdialog" aria-modal="true">
        <div className="p-5">
          <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-lg text-muted hover:text-primary" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-red-soft flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4 text-red" />
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-primary mb-1">{title}</h3>
              <p className="text-[12px] text-muted leading-relaxed">{message}</p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button onClick={onClose} className="h-8 px-3 rounded-lg btn-ghost text-[12px]">Cancel</button>
            <button
              ref={ref}
              onClick={() => { onConfirm(); onClose(); }}
              className={`h-8 px-3 rounded-lg text-[12px] font-semibold transition-all ${
                confirmVariant === "danger" ? "bg-red text-white hover:bg-red/90" : "btn-primary"
              }`}
            >{confirmText}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

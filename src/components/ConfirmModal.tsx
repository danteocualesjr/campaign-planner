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

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  confirmVariant = "danger",
}: ConfirmModalProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      confirmRef.current?.focus();
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm modal-backdrop" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        className="relative w-full max-w-sm anim-scale"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="absolute inset-0 glass rounded-2xl" />
        <div className="absolute top-0 left-0 w-32 h-32 bg-red/20 rounded-full blur-3xl" />
        
        <div className="relative p-6">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-1.5 rounded-lg text-muted hover:text-primary hover:bg-card transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-soft flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-red" />
            </div>
            <div>
              <h3 id="modal-title" className="text-[16px] font-semibold text-primary mb-1">
                {title}
              </h3>
              <p id="modal-description" className="text-[13px] text-secondary leading-relaxed">
                {message}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="h-9 px-4 rounded-lg btn-ghost text-[13px]"
            >
              Cancel
            </button>
            <button
              ref={confirmRef}
              type="button"
              onClick={() => { onConfirm(); onClose(); }}
              className={`h-9 px-4 rounded-lg text-[13px] font-semibold transition-all ${
                confirmVariant === "danger"
                  ? "bg-red text-white hover:bg-red/90 focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  : "btn-primary"
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

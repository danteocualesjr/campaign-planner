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

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      ref.current?.focus();
      const esc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", esc);
      return () => document.removeEventListener("keydown", esc);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 modal-backdrop animate-fade" onClick={onClose} />

      <div className="relative w-full max-w-sm bg-surface-lowest rounded-[2rem] p-8 animate-scale">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-sl400 hover:text-sl900 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-error-container flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-md-error" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-on-bg mb-2">{title}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="btn-outline px-5 py-2.5 text-sm">
            Cancel
          </button>
          <button
            ref={ref}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-md-error text-white font-bold text-sm rounded-full hover:opacity-90 transition-opacity"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

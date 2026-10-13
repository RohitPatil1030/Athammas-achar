"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useId, useRef } from "react";

export function ConfirmModal({
  open,
  summary,
  onClose,
}: {
  open: boolean;
  summary: string;
  onClose: () => void;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-forest/55 p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="presentation"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="w-full max-w-md rounded-[1.8rem] bg-cream p-6 shadow-2xl sm:p-8"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16 }}
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">Inquiry received</p>
            <h2 id={titleId} className="mt-3 font-serif text-3xl font-semibold text-forest">
              The kitchen has your note
            </h2>
            <p className="mt-3 leading-7 text-forest/80">
              Athamma’s side has your inquiry. We will reply on the number you shared. Parcels are not being sent yet.
            </p>
            {summary ? (
              <p className="mt-4 rounded-2xl bg-parchment px-4 py-3 text-sm leading-6 text-forest">{summary}</p>
            ) : null}
            <button ref={closeRef} type="button" className="btn-primary mt-6" onClick={onClose}>
              <X className="h-4 w-4" aria-hidden="true" />
              Back to the kitchen
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

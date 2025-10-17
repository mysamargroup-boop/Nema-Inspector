// FIX: Import React and hooks
import React, { useEffect } from 'react';

// FIX: Export DetailModal component
export const DetailModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  data: {
    title: string;
    value: string | number | boolean;
    description: string;
  } | null;
}> = ({ isOpen, onClose, data }) => {
  
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen || !data) {
    return null;
  }

  const renderValue = () => {
    if (typeof data.value === 'boolean') {
        return (
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${data.value ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300'}`}>
                {data.value ? 'Enabled' : 'Disabled'}
            </span>
        );
    }
    return <span className="text-lg font-medium text-slate-900 dark:text-white break-all">{String(data.value)}</span>;
  }

  return (
    <>
    <style>{`
      .modal-fade-enter { opacity: 0; }
      .modal-fade-enter-active { opacity: 1; transition: opacity 200ms; }
      .modal-fade-exit { opacity: 1; }
      .modal-fade-exit-active { opacity: 0; transition: opacity 200ms; }
      .modal-content-enter { transform: scale(0.95); opacity: 0; }
      .modal-content-enter-active { transform: scale(1); opacity: 1; transition: all 200ms; }
      .modal-content-exit { transform: scale(1); opacity: 1; }
      .modal-content-exit-active { transform: scale(0.95); opacity: 0; transition: all 200ms; }
    `}</style>
    <div
      className={`modal-fade-enter-active fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm`}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`modal-content-enter-active relative w-full max-w-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-2xl shadow-black/30`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{data.title}</h2>
        </div>
        <div className="p-6 space-y-4">
            <div className="p-4 rounded-lg bg-slate-100 dark:bg-neutral-800/50">
                {renderValue()}
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-base">{data.description}</p>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-800 rounded-b-xl flex justify-end">
            <button
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-slate-200 dark:bg-neutral-700 text-sm text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300 dark:hover:bg-neutral-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
                Close
            </button>
        </div>
        <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-700/80 transition-all duration-200"
        >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
    </>
  );
};
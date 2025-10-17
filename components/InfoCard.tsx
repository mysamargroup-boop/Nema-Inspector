// FIX: Import React and hooks
import React, { useState } from 'react';
// FIX: Import Icon component and IconName type
import { Icon, IconName } from './Icon';

const MotionDiv: React.FC<{ index: number; children: React.ReactNode; className?: string; onClick: () => void; }> = ({ index, children, className, onClick }) => {
    // A simple animation to fade in and slide up. The delay is based on the index.
    const style = {
        animation: `fadeInUp 0.5s ease-out forwards`,
        animationDelay: `${index * 0.05}s`,
        opacity: 0,
    };

    return (
        <>
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
            <div style={style} className={className} onClick={onClick}>
                {children}
            </div>
        </>
    );
};


interface InfoCardProps {
  iconName: IconName;
  title: string;
  value: string | number | boolean;
  index: number;
  isApproximate?: boolean;
  onClick: () => void;
}

const renderValue = (title: string, value: string | number | boolean) => {
    if (typeof value === 'boolean') {
        return (
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${value ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300'}`}>
                {value ? 'Enabled' : 'Disabled'}
            </span>
        );
    }
    
    if (['User Agent', 'Browser Vendor', 'Timezone', 'Screen Orientation', 'IP Address', 'ISP', 'Operating System', 'Device Model'].includes(title)) {
        return <span className="text-sm font-medium text-slate-800 dark:text-white break-all">{String(value)}</span>;
    }

    const unitMatch = title.match(/\(([^)]+)\)/);
    if (unitMatch) {
        const unit = unitMatch[1];
        return <><span className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">{String(value)}</span><span className="text-slate-500 dark:text-slate-400 text-lg ml-1.5">{unit}</span></>;
    }

    if (typeof value === 'string' && value.includes('%')) {
         const parts = value.match(/(\d+\.?\d*)(.*)/);
         if(parts) {
            return <><span className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">{parts[1]}</span><span className="text-slate-500 dark:text-slate-400 text-lg ml-1">{parts[2]}</span></>
         }
    }

    return <span className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white break-words">{String(value)}</span>;
}

// FIX: Export InfoCard component
export const InfoCard: React.FC<InfoCardProps> = ({ iconName, title, value, index, isApproximate, onClick }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event when copying
    if (isCopied) return;
    navigator.clipboard.writeText(String(value)).then(
      () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      },
      (err) => {
        console.error('Failed to copy: ', err);
      }
    );
  };
  
  return (
    <MotionDiv
      index={index}
      onClick={onClick}
      className="relative group bg-white/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 backdrop-blur-sm transition-all duration-300 hover:border-sky-500/50 hover:bg-white dark:hover:bg-neutral-800/60 hover:-translate-y-1 cursor-pointer"
    >
      <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:radial-gradient(100px_circle_at_var(--x)_var(--y),rgba(14,165,233,0.15),transparent_40%)] group-hover:opacity-100 transition-opacity duration-300" 
         onMouseMove={(e) => {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
            e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
        }}></div>

      <div className="relative flex items-start gap-4">
        <div className="bg-slate-100 dark:bg-neutral-800/50 p-2 rounded-lg">
          <Icon name={iconName} className="w-6 h-6 text-sky-500 dark:text-sky-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1 truncate">
            {title}
            {isApproximate && <span className="text-red-500 ml-1">*</span>}
          </p>
          <div className="min-h-[44px] flex items-center">{renderValue(title, value)}</div>
        </div>
      </div>
       <button
        onClick={handleCopy}
        aria-label={`Copy ${title} to clipboard`}
        className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 dark:bg-neutral-800/60 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-neutral-700/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
      >
        {isCopied ? (
          <Icon name="check" className="w-4 h-4 text-green-500 dark:text-green-400" />
        ) : (
          <Icon name="copy" className="w-4 h-4" />
        )}
      </button>
    </MotionDiv>
  );
};
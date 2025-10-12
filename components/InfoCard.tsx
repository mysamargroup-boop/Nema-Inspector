import React from 'react';
import { Icon, IconName } from './Icon';

// Since we can't import framer-motion, we will simulate the animation with CSS
const MotionDiv: React.FC<{ index: number; children: React.ReactNode; className?: string }> = ({ index, children, className }) => {
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
            <div style={style} className={className}>
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
}

const renderValue = (title: string, value: string | number | boolean) => {
    if (typeof value === 'boolean') {
        return (
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${value ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                {value ? 'Enabled' : 'Disabled'}
            </span>
        );
    }
    
    // Use smaller font for long text values to prevent overflow
    if (title === 'User Agent' || title === 'Browser Vendor' || title === 'Timezone' || title === 'Screen Orientation') {
        return <span className="text-base font-medium text-white break-all">{String(value)}</span>;
    }

    if (typeof value === 'string' && (value.endsWith('px') || value.endsWith('%'))) {
         const parts = value.match(/(\d+)(.*)/);
         if(parts) {
            return <><span className="text-2xl sm:text-3xl font-bold text-white">{parts[1]}</span><span className="text-slate-400 text-lg ml-1">{parts[2]}</span></>
         }
    }

    return <span className="text-2xl sm:text-3xl font-bold text-white break-words">{String(value)}</span>;
}

export const InfoCard: React.FC<InfoCardProps> = ({ iconName, title, value, index }) => {
  return (
    <MotionDiv
      index={index}
      className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 backdrop-blur-sm transition-all duration-300 hover:border-sky-500/50 hover:bg-neutral-800 hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        <div className="bg-neutral-800/50 p-2 rounded-lg">
          <Icon name={iconName} className="w-6 h-6 text-sky-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-400 mb-1 truncate">{title}</p>
          <div className="min-h-[44px] flex items-center">{renderValue(title, value)}</div>
        </div>
      </div>
    </MotionDiv>
  );
};
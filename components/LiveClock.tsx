import React, { useState, useEffect } from 'react';
import { Icon } from './Icon.tsx';

export const LiveClock: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    return (
        <div className="flex items-center gap-2">
            <Icon name="clock" className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-200">
                {time.toLocaleTimeString()}
            </span>
        </div>
    );
};
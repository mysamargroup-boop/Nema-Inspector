// FIX: Import React
import React from 'react';

// FIX: Export IconName type
export type IconName = 
  'smartphone' | 'monitor' | 'globe' | 'zap' | 'wifi' | 
  'cpu' | 'cookie' | 'browser' | 'window' | 'palette' |
  'memory' | 'signal' | 'battery' | 'touch' | 'ratio' |
  'timezone' | 'vendor' | 'shield' | 'pdf' | 'screen-arrows' |
  'orientation' | 'location' | 'ip' | 'isp' | 'city' | 
  'country' | 'copy' | 'check' | 'logo' | 'download' | 'clock' |
  'speed' | 'rtt' | 'data-saver' | 'os' | 'device' | 'twitter' | 'facebook' | 'linkedin' | 'sun' | 'moon';

interface IconProps {
  name: IconName;
  className?: string;
}

// FIX: Export Icon component
export const Icon: React.FC<IconProps> = ({ name, className }) => {
  const icons: Record<IconName, React.ReactElement> = {
    smartphone: <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />,
    monitor: <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" />,
    globe: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 0 1-9-9 9 9 0 0 1 9-9 9 9 0 0 1 9 9 9 9 0 0 1-9 9Zm0 0a8.949 8.949 0 0 0 5.61-1.923A8.949 8.949 0 0 0 6.39 19.077 8.949 8.949 0 0 0 12 21Zm0 0a8.949 8.949 0 0 0-5.61-1.923A8.949 8.949 0 0 0 17.61 19.077 8.949 8.949 0 0 0 12 21Z" />,
    zap: <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />,
    wifi: <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a3.75 3.75 0 0 1 7.424 0M5.136 12.036a7.5 7.5 0 0 1 13.728 0M2.013 9.012A11.25 11.25 0 0 1 21.987 9.012" />,
    cpu: <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M8.25 21v-1.5M4.5 15.75H3m18 0h-1.5M15.75 3v1.5m-12 4.5h1.5m12 0h1.5m-12 4.5h1.5m12 0h1.5M15.75 21v-1.5m-4.5-1.5a3 3 0 0 1-3-3V12a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v1.5a3 3 0 0 1-3 3h-3Z" />,
    cookie: <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 10.5a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" />,
    browser: <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 15l-2.25-3-1.5-1.5a.75.75 0 0 1 0-1.06L5.25 5.25a.75.75 0 0 1 1.06 0l4.22 4.22a.75.75 0 0 0 1.06 0l1.5-1.5a2.25 2.25 0 0 0-1.591-3.908Z" />,
    window: <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m-15 0a9 9 0 1 0 18 0 9 9 0 1 0-18 0Z" />,
    palette: <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.375A2.25 2.25 0 0 1 15 5.625v12.75a2.25 2.25 0 0 1-2.25 2.25H9.375a2.25 2.25 0 0 1-2.25-2.25V5.625a2.25 2.25 0 0 1 2.25-2.25h3.375Z" />,
    memory: <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m-15 0a9 9 0 1 0 18 0 9 9 0 1 0-18 0Zm0-4.5h15m-15 9h15" />,
    signal: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h.008v.008H3.75v-.008Zm0 4.5h.008v.008H3.75v-.008Zm4.5-4.5h.008v.008H8.25v-.008Zm4.5 0h.008v.008h-.008v-.008Zm0 4.5h.008v.008h-.008v-.008Zm4.5-4.5h.008v.008h-.008v-.008Zm-8.992-6.428a.75.75 0 0 1 .644-.067l5.25 2.25a.75.75 0 0 1 0 1.366l-5.25 2.25a.75.75 0 0 1-.941-.532V6.32a.75.75 0 0 1 .297-.6Z" />,
    battery: <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 18h13.5a2.25 2.25 0 0 0 2.25-2.25V8.25a2.25 2.25 0 0 0-2.25-2.25H3.75A2.25 2.25 0 0 0 1.5 8.25v7.5A2.25 2.25 0 0 0 3.75 18Z" />,
    touch: <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.5-2.5m2.5 2.5-2.5-2.5M13.684 16.6l-2.5-2.5m2.5 2.5 2.5 2.5m-5-5L9 9.166M13.684 16.6l-2.5-2.5m2.5 2.5 2.5 2.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
    ratio: <path strokeLinecap="round" strokeLinejoin="round" d="M3 6.75A2.25 2.25 0 0 1 5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v10.5A2.25 2.25 0 0 1 18.75 19.5H5.25A2.25 2.25 0 0 1 3 17.25V6.75Z M9 15.75V8.25l-1.5 1.5" />,
    timezone: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
    vendor: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6.375a.375.375 0 0 1 .375.375v1.5a.375.375 0 0 1-.375.375H9a.375.375 0 0 1-.375-.375v-1.5a.375.375 0 0 1 .375-.375ZM9 12.75h6.375a.375.375 0 0 1 .375.375v1.5a.375.375 0 0 1-.375.375H9a.375.375 0 0 1-.375-.375v-1.5a.375.375 0 0 1 .375-.375Z" />,
    shield: <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.6-3.75A11.959 11.959 0 0 1 12 2.964Z" />,
    pdf: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />,
    'screen-arrows': <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m4.5 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />,
    orientation: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25L12 21m0 0-3.75-3.75M12 21V3" />,
    location: <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm0 0c0 2.683-3.15 5.62-5.25 7.373a.75.75 0 0 1-1.002 0C6.65 16.12 3.5 13.183 3.5 10.5a6.5 6.5 0 1 1 13 0Z" />,
    ip: <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364" />,
    isp: <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.65H8.228a3.375 3.375 0 0 0-3.285 2.65l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m15.56 0a2.25 2.25 0 0 1-2.25 2.25H6.94a2.25 2.25 0 0 1-2.25-2.25m15.56 0v-1.5a2.25 2.25 0 0 0-2.25-2.25H6.94a2.25 2.25 0 0 0-2.25 2.25v1.5m15.56 0h-12.5" />,
    city: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75v.75h-.75V6.75Zm0 3h.75v.75h-.75V9.75Zm0 3h.75v.75h-.75V12.75Zm0 3h.75v.75h-.75V15.75Zm3-9h.75v.75h-.75V6.75Zm0 3h.75v.75h-.75V9.75Zm0 3h.75v.75h-.75V12.75Zm0 3h.75v.75h-.75V15.75Zm3-9h.75v.75h-.75V6.75Zm0 3h.75v.75h-.75V9.75Zm0 3h.75v.75h-.75V12.75Z" />,
    country: <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-1.5m18 0v1.5M21 3v-1.5M8.25 3h7.5M8.25 21h7.5m-15-12v6.75c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V9.75M8.25 9.75h7.5" />,
    copy: <path strokeLinecap="round" strokeLinejoin="round" d="M9 5.25H7.525a2.25 2.25 0 0 0-2.25 2.25v10.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V7.525a2.25 2.25 0 0 0-2.25-2.25H15m-3-3v3.75m-3.75-3.75h7.5" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />,
    logo: <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.462 0-9.922 4.394-9.995 9.848-.052 3.821 2.058 7.29 5.237 8.89a9.782 9.782 0 0 0 4.758 1.262c5.462 0 9.922-4.394 9.995-9.848.052-3.821-2.058-7.29-5.237-8.89a9.782 9.782 0 0 0-4.758-1.262Z M12 2.25v19.5" />,
    download: <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
    speed: <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3.75h7.5a2.25 2.25 0 0 1 2.25 2.25v12a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-12a2.25 2.25 0 0 1 2.25-2.25Zm0 3.75V12m0 0v3.75m0-3.75h7.5m-7.5 0h.008v.008H8.25V12Zm2.25-4.5h.008v.008H10.5V7.5Zm3 0h.008v.008H13.5V7.5Z" />,
    rtt: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h12.75m2.25-12L21 9m0 0-4.5-4.5M21 9H8.25" />,
    'data-saver': <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 0 1-9-9 9 9 0 0 1 9-9 9 9 0 0 1 9 9c0 2.347-.94 4.486-2.475 6.025A9.75 9.75 0 0 1 12 21Z" />,
    os: <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5 3 12l3.75 4.5M17.25 7.5 21 12l-3.75 4.5M14.25 4.5l-4.5 15" />,
    device: <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75A2.25 2.25 0 0 0 15.75 1.5h-2.25m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />,
    twitter: <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.26C11.73,8.6 11.77,8.92 11.84,9.22C8.28,9.03 5.15,7.38 3.02,4.76C2.66,5.39 2.45,6.13 2.45,6.91C2.45,8.43 3.23,9.78 4.34,10.5C3.62,10.48 2.96,10.28 2.38,9.95C2.38,9.97 2.38,9.99 2.38,10.01C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16.03 6.02,17.25 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.62 20.33,8.45 20.32,8.28C21.17,7.67 21.88,6.89 22.46,6Z" />,
    facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
    linkedin: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM6 9h-4V21h4V9zM4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />,
    sun: <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />,
    moon: <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25c0 5.385 4.365 9.75 9.75 9.75 2.572 0 4.92-.99 6.697-2.648Z" />
  };
  
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className={className || "w-6 h-6"}
    >
      {icons[name]}
    </svg>
  );
};
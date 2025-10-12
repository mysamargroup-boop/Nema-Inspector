import React from 'react';
import { useDeviceInfo } from './hooks/useDeviceInfo';
import { InfoCard } from './components/InfoCard';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { IconName } from './components/Icon';

const App: React.FC = () => {
  const { deviceInfo, loading } = useDeviceInfo();

  const infoItems: { key: keyof typeof deviceInfo; title: string; icon: IconName }[] = [
    { key: 'onlineStatus', title: 'Network Status', icon: 'wifi' },
    { key: 'connectionType', title: 'Connection Type', icon: 'signal' },
    { key: 'ipAddress', title: 'IP Address', icon: 'ip' },
    { key: 'isp', title: 'ISP', icon: 'isp' },
    { key: 'city', title: 'City', icon: 'city' },
    { key: 'country', title: 'Country', icon: 'country' },
    { key: 'userAgent', title: 'User Agent', icon: 'browser' },
    { key: 'platform', title: 'Platform', icon: 'cpu' },
    { key: 'language', title: 'Language', icon: 'globe' },
    { key: 'browserVendor', title: 'Browser Vendor', icon: 'vendor' },
    { key: 'doNotTrack', title: 'Do Not Track', icon: 'shield' },
    { key: 'cookiesEnabled', title: 'Cookies Enabled', icon: 'cookie' },
    { key: 'pdfViewerEnabled', title: 'PDF Viewer Enabled', icon: 'pdf' },
    { key: 'touchSupport', title: 'Touch Support', icon: 'touch' },
    { key: 'screenWidth', title: 'Screen Width', icon: 'monitor' },
    { key: 'screenHeight', title: 'Screen Height', icon: 'monitor' },
    { key: 'availableScreenWidth', title: 'Available Screen Width', icon: 'screen-arrows' },
    { key: 'availableScreenHeight', title: 'Available Screen Height', icon: 'screen-arrows' },
    { key: 'windowWidth', title: 'Window Width', icon: 'window' },
    { key: 'windowHeight', title: 'Window Height', icon: 'window' },
    { key: 'screenOrientation', title: 'Screen Orientation', icon: 'orientation' },
    { key: 'colorDepth', title: 'Color Depth', icon: 'palette' },
    { key: 'pixelDepth', title: 'Pixel Depth', icon: 'palette' },
    { key: 'devicePixelRatio', title: 'Device Pixel Ratio', icon: 'ratio' },
    { key: 'deviceMemory', title: 'Device Memory (GB)', icon: 'memory' },
    { key: 'cpuCores', title: 'CPU Cores', icon: 'cpu' },
    { key: 'timezone', title: 'Timezone', icon: 'timezone' },
    { key: 'geolocationPermission', title: 'Geolocation Permission', icon: 'location' },
    { key: 'batteryLevel', title: 'Battery Level', icon: 'battery' },
    { key: 'isCharging', title: 'Charging Status', icon: 'zap' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />

        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sky-400"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {infoItems.map((item, index) => {
              const value = deviceInfo[item.key];
              if (value === null || value === undefined || value === 'N/A' || value === 'Unavailable') return null;
              
              return (
                <InfoCard
                  key={item.key}
                  title={item.title}
                  value={value}
                  iconName={item.icon}
                  index={index}
                />
              );
            })}
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default App;
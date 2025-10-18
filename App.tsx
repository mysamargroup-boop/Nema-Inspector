// FIX: Import React and hooks
import React, { useState } from 'react';
// FIX: Import necessary components, hooks, types, and utils
import { useDeviceInfo } from './hooks/useDeviceInfo';
import { Header } from './components/Header';
import { InfoCard } from './components/InfoCard';
import { Footer } from './components/Footer';
import { DetailModal } from './components/DetailModal';
import { IconName } from './components/Icon';
import { dataDescriptions } from './utils/dataDescriptions';
import { LocationMap } from './components/LocationMap';
import { PrivacyScore } from './components/PrivacyScore';


// FIX: Add type declaration for jspdf library at the top level
declare global {
  interface Window {
    jspdf: any;
  }
}

interface ModalData {
  title: string;
  value: string | number | boolean;
  description: string;
}

// FIX: Export App component
export const App: React.FC = () => {
  const { deviceInfo, loading } = useDeviceInfo();
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const infoItems: { key: keyof ReturnType<typeof useDeviceInfo>['deviceInfo']; title: string; icon: IconName }[] = [
    { key: 'ipAddress', title: 'IP Address', icon: 'ip' },
    { key: 'isp', title: 'ISP', icon: 'isp' },
    { key: 'city', title: 'City', icon: 'city' },
    { key: 'country', title: 'Country', icon: 'country' },
    { key: 'onlineStatus', title: 'Network Status', icon: 'wifi' },
    { key: 'connectionType', title: 'Connection Type', icon: 'signal' },
    { key: 'networkSpeed', title: 'Network Speed (Mbps)', icon: 'speed' },
    { key: 'roundTripTime', title: 'Round-Trip Time (ms)', icon: 'rtt' },
    { key: 'os', title: 'Operating System', icon: 'os' },
    { key: 'deviceModel', title: 'Device Model', icon: 'device' },
    { key: 'userAgent', title: 'User Agent', icon: 'browser' },
    { key: 'language', title: 'Language', icon: 'globe' },
    { key: 'browserVendor', title: 'Browser Vendor', icon: 'vendor' },
    { key: 'touchSupport', title: 'Touch Support', icon: 'touch' },
    { key: 'availableScreenWidth', title: 'Available Screen Width', icon: 'screen-arrows' },
    { key: 'availableScreenHeight', title: 'Available Screen Height', icon: 'screen-arrows' },
    { key: 'screenOrientation', title: 'Screen Orientation', icon: 'orientation' },
    { key: 'colorDepth', title: 'Color Depth', icon: 'palette' },
    { key: 'pixelDepth', title: 'Pixel Depth', icon: 'palette' },
    { key: 'devicePixelRatio', title: 'Device Pixel Ratio', icon: 'ratio' },
    { key: 'deviceMemory', title: 'Device Memory (GB)', icon: 'memory' },
    { key: 'cpuCores', title: 'Processor (Cores)', icon: 'cpu' },
    { key: 'timezone', title: 'Timezone', icon: 'timezone' },
    { key: 'geolocationPermission', title: 'Geolocation Permission', icon: 'location' },
    { key: 'batteryLevel', title: 'Battery Level', icon: 'battery' },
    { key: 'isCharging', title: 'Charging Status', icon: 'zap' },
    { key: 'screenWidth', title: 'Screen Width', icon: 'monitor' },
    { key: 'screenHeight', title: 'Screen Height', icon: 'monitor' },
    { key: 'windowWidth', title: 'Window Width', icon: 'window' },
    { key: 'windowHeight', title: 'Window Height', icon: 'window' },
    { key: 'doNotTrack', title: 'Do Not Track', icon: 'shield' },
    { key: 'cookiesEnabled', title: 'Cookies Enabled', icon: 'cookie' },
    { key: 'pdfViewerEnabled', title: 'PDF Viewer Enabled', icon: 'pdf' },
    { key: 'dataSaverEnabled', title: 'Data Saver', icon: 'data-saver' },
  ];

  const approximateKeys: (keyof ReturnType<typeof useDeviceInfo>['deviceInfo'])[] = [
      'deviceMemory', 'cpuCores', 'connectionType', 'ipAddress', 'isp', 'city', 'country', 
      'os', 'deviceModel', 'networkSpeed', 'roundTripTime'
  ];

  const handleDownloadReport = () => {
    // FIX: Access jspdf correctly from the window object
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Nema Inspector - Device Report', 105, 20, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont('Helvetica', 'normal');
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 28, { align: 'center' });

    let y = 45;
    infoItems.forEach(item => {
        if (y > 280) { // New page if content overflows
            doc.addPage();
            y = 20;
        }
        const value = deviceInfo[item.key];
        if (value !== null && value !== undefined && value !== 'N/A' && value !== 'Unavailable') {
            let formattedValue = String(value);
            if (typeof value === 'boolean') formattedValue = value ? 'Enabled' : 'Disabled';

            doc.setFont('Helvetica', 'bold');
            doc.text(`${item.title}:`, 15, y);
            
            doc.setFont('Helvetica', 'normal');
            const splitValue = doc.splitTextToSize(formattedValue, 130);
            doc.text(splitValue, 65, y);
            
            y += (splitValue.length * 5) + 4; // Increment y position
        }
    });

    doc.save('nema-inspector-report.pdf');
  };
  
  const handleCardClick = (title: string, value: string | number | boolean) => {
    setModalData({
      title,
      value,
      description: dataDescriptions[title] || "No additional information available."
    });
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-white flex flex-col">
      <Header onDownloadReport={handleDownloadReport} />
      
      <main className="w-full max-w-[1576px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 flex-grow">
        <div className="text-center mb-10">
           <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 to-blue-500 text-transparent bg-clip-text">
              Device Inspector
            </h1>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Your device's vital statistics, beautifully presented. Here's what the browser knows about you.
            </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sky-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    isApproximate={approximateKeys.includes(item.key)}
                    onClick={() => handleCardClick(item.title, value)}
                  />
                );
              })}
            </div>

            <div className="mt-16">
                <PrivacyScore
                    doNotTrack={deviceInfo.doNotTrack}
                    cookiesEnabled={deviceInfo.cookiesEnabled}
                    geolocationPermission={deviceInfo.geolocationPermission}
                    dataSaverEnabled={deviceInfo.dataSaverEnabled}
                />
            </div>
            
            {deviceInfo.latitude && deviceInfo.longitude && (
              <div className="mt-16 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white mb-6">
                  Your Approximate Location
                </h2>
                <div className="max-w-4xl mx-auto">
                  <LocationMap latitude={deviceInfo.latitude} longitude={deviceInfo.longitude} />
                </div>
              </div>
            )}
          </>
        )}
      </main>
      
      <Footer />

      <DetailModal 
        isOpen={!!modalData}
        onClose={() => setModalData(null)}
        data={modalData}
      />
    </div>
  );
};

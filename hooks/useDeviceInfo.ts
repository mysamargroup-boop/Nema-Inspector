import { useState, useEffect } from 'react';
import { DeviceInfo } from '../types';

export const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({} as DeviceInfo);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        const info: DeviceInfo = {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          language: navigator.language,
          onlineStatus: navigator.onLine,
          cookiesEnabled: navigator.cookieEnabled,
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight,
          colorDepth: window.screen.colorDepth,
          pixelDepth: window.screen.pixelDepth,
          deviceMemory: (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory}` : 'N/A',
          cpuCores: navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency}` : 'N/A',
          connectionType: ((navigator as any).connection?.effectiveType)?.toUpperCase() || 'N/A',
          batteryLevel: null,
          isCharging: null,
          touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
          devicePixelRatio: window.devicePixelRatio,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          browserVendor: navigator.vendor || 'N/A',
          doNotTrack: (navigator as any).doNotTrack || 'N/A',
          pdfViewerEnabled: navigator.pdfViewerEnabled,
          availableScreenWidth: window.screen.availWidth,
          availableScreenHeight: window.screen.availHeight,
          screenOrientation: window.screen.orientation.type,
          geolocationPermission: 'N/A',
        };

        try {
          if ('getBattery' in navigator) {
            const battery = await (navigator as any).getBattery();
            info.batteryLevel = `${Math.floor(battery.level * 100)}%`;
            info.isCharging = battery.charging;
          } else {
             info.batteryLevel = 'N/A';
             info.isCharging = null;
          }
        } catch (e) {
            info.batteryLevel = 'N/A';
            info.isCharging = null;
        }

        try {
            if ('permissions' in navigator) {
                const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
                info.geolocationPermission = permissionStatus.state;
            }
        } catch (e) {
            console.warn("Could not query geolocation permission:", e);
            info.geolocationPermission = 'Unavailable';
        }

        try {
            const ipResponse = await fetch('https://ipapi.co/json/');
            if (ipResponse.ok) {
                const ipData = await ipResponse.json();
                info.ipAddress = ipData.ip || 'N/A';
                info.city = ipData.city || 'N/A';
                info.country = ipData.country_name || 'N/A';
                info.isp = ipData.org || 'N/A';
            } else {
                throw new Error('IP API request failed');
            }
        } catch (e) {
            console.warn("Could not fetch IP info:", e);
            info.ipAddress = 'Unavailable';
            info.city = 'Unavailable';
            info.country = 'Unavailable';
            info.isp = 'Unavailable';
        }

        setDeviceInfo(info);
      } catch (error) {
        console.error("Failed to fetch device info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceInfo();

    const handleResize = () => {
        setDeviceInfo(prev => ({
            ...prev,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
        }));
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { deviceInfo, loading };
};
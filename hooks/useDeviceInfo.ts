import { useState, useEffect } from 'react';
import { DeviceInfo } from '../types.ts';

const parseUserAgent = (ua: string) => {
    let os = 'Unknown OS';
    let deviceModel = 'Unknown Device';

    // OS Detection
    if (/android/i.test(ua)) {
        const match = ua.match(/Android ([\d.]+)/);
        os = match ? `Android ${match[1]}` : 'Android';
    } else if (/iPad|iPhone|iPod/.test(ua)) {
        const match = ua.match(/OS ([\d_]+)/);
        os = match ? `iOS ${match[1].replace(/_/g, '.')}` : 'iOS';
    } else if (/Windows NT 10.0/.test(ua)) {
        os = 'Windows 11/10';
    } else if (/Windows NT 6.3/.test(ua)) {
        os = 'Windows 8.1';
    } else if (/Windows NT 6.2/.test(ua)) {
        os = 'Windows 8';
    } else if (/Windows NT 6.1/.test(ua)) {
        os = 'Windows 7';
    } else if (/Mac OS X/.test(ua)) {
        const match = ua.match(/Mac OS X ([\d_]+)/);
        os = match ? `macOS ${match[1].replace(/_/g, '.')}` : 'macOS';
    } else if (/Linux/.test(ua) && !/android/i.test(ua)) {
        os = 'Linux';
    }

    // Device Model Detection
    const androidModelMatch = ua.match(/\(Linux; Android [\d.]+; (.*?)\)/);
    if (androidModelMatch && androidModelMatch[1]) {
        deviceModel = androidModelMatch[1].split(' Build/')[0];
    } else if (/iPhone/.test(ua)) {
        deviceModel = 'iPhone';
    } else if (/iPad/.test(ua)) {
        deviceModel = 'iPad';
    } else if (/iPod/.test(ua)) {
        deviceModel = 'iPod Touch';
    } else if (os.startsWith('Windows') || os.startsWith('macOS') || os === 'Linux') {
        deviceModel = 'Desktop / Laptop';
    }
    
    return { os, deviceModel };
};

export const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({} as DeviceInfo);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        const { os, deviceModel } = parseUserAgent(navigator.userAgent);
        const connection = (navigator as any).connection;

        const info: Partial<DeviceInfo> = {
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
          connectionType: connection?.effectiveType?.toUpperCase() || 'N/A',
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
          os,
          deviceModel,
          networkSpeed: connection?.downlink ? `${connection.downlink}` : 'N/A',
          roundTripTime: connection?.rtt ? `${connection.rtt}` : 'N/A',
          dataSaverEnabled: connection?.saveData ?? null,
        };

        try {
          if ('getBattery' in navigator) {
            const battery = await (navigator as any).getBattery();
            info.batteryLevel = `${(battery.level * 100).toFixed(0)}%`;
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

        setDeviceInfo(info as DeviceInfo);
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
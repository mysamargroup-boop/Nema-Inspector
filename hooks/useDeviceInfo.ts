// FIX: Import React and hooks
import React, { useState, useEffect } from 'react';
// FIX: Import DeviceInfo type
import { DeviceInfo } from '../types';

// FIX: Export useDeviceInfo hook
export const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({} as DeviceInfo);
  const [loading, setLoading] = useState<boolean>(true);

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

  const fetchIPLocation = async () => {
      try {
          const ipResponse = await fetch('https://ipapi.co/json/');
          if (ipResponse.ok) {
              const ipData = await ipResponse.json();
              setDeviceInfo(prev => ({
                  ...prev,
                  ipAddress: ipData.ip || 'N/A',
                  city: ipData.city || 'N/A',
                  country: ipData.country_name || 'N/A',
                  isp: ipData.org || 'N/A',
                  latitude: prev.latitude ?? ipData.latitude,
                  longitude: prev.longitude ?? ipData.longitude,
              }));
          } else {
              throw new Error('IP API request failed');
          }
      } catch (e) {
          console.warn("Could not fetch IP info:", e);
          setDeviceInfo(prev => ({
              ...prev,
              ipAddress: 'Unavailable',
              city: 'Unavailable',
              country: 'Unavailable',
              isp: 'Unavailable',
          }));
      }
  };

  const requestGeolocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setDeviceInfo((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            geolocationPermission: 'granted',
          }));
        },
        () => {
          setDeviceInfo((prev) => ({
            ...prev,
            geolocationPermission: 'denied',
          }));
        }
      );
    } else {
        setDeviceInfo((prev) => ({
            ...prev,
            geolocationPermission: 'unavailable'
        }))
    }
  };

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

                if (permissionStatus.state === 'granted') {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            setDeviceInfo(prev => ({
                                ...prev,
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            }));
                        },
                        async () => {
                            await fetchIPLocation();
                        }
                    );
                } else {
                    await fetchIPLocation();
                }
            } else {
                await fetchIPLocation();
            }
        } catch (e) {
            console.warn("Could not query geolocation permission:", e);
            info.geolocationPermission = 'Unavailable';
            await fetchIPLocation();
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

  return { deviceInfo, loading, requestGeolocation };
};

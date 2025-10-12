
export interface DeviceInfo {
  userAgent: string;
  platform: string;
  language: string;
  onlineStatus: boolean;
  cookiesEnabled: boolean;
  screenWidth: number;
  screenHeight: number;
  windowWidth: number;
  windowHeight: number;
  colorDepth: number;
  pixelDepth: number;
  deviceMemory?: string | null;
  cpuCores?: string | null;
  connectionType?: string | null;
  batteryLevel?: string | null;
  isCharging?: boolean | null;
  touchSupport: boolean;
  devicePixelRatio: number;
  timezone: string;
  browserVendor: string;
  doNotTrack: string | null;
  pdfViewerEnabled: boolean;
  availableScreenWidth: number;
  availableScreenHeight: number;
  screenOrientation: string;
  geolocationPermission: string;
}
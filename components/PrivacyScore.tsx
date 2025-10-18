import React from 'react';

interface PrivacyScoreProps {
  doNotTrack: string | null;
  cookiesEnabled: boolean;
  geolocationPermission: string;
  dataSaverEnabled: boolean | null;
}

export const PrivacyScore: React.FC<PrivacyScoreProps> = ({ doNotTrack, cookiesEnabled, geolocationPermission, dataSaverEnabled }) => {
  const calculateScore = () => {
    let score = 0;
    if (doNotTrack === '1') score += 25;
    if (!cookiesEnabled) score += 25;
    if (geolocationPermission === 'denied') score += 25;
    if (dataSaverEnabled) score += 25;
    return score;
  };

  const score = calculateScore();
  const scoreColor = score > 75 ? 'text-green-500' : score > 50 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white mb-6">
        Privacy Score
      </h2>
      <div className={`text-7xl font-extrabold ${scoreColor}`}>
        {score}
      </div>
      <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
        This score represents how well your browser is configured for privacy. A higher score is better.
      </p>
    </div>
  );
};
import { useEffect, useState } from 'react';
import './App.css';

type FeatureFlags = {
  newUI: boolean;
  betaFeatures: boolean;
}

function App() {
  const [features, setFeatures] = useState<FeatureFlags | null>(null);

  useEffect(() => {
    const fetchFeatureFlags = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/feature-flags/${import.meta.env.VITE_APP_ENV}/${import.meta.env.VITE_APP_PROJECT}`);
        if (!response.ok) {
          throw new Error(`Network response was not ok status: ${response.status}`);
        }
        const { flags }: { flags: FeatureFlags } = await response.json();
        setFeatures(flags);
      } catch (error) {
        console.error('Error fetching feature flags:', error);
      }
    };

    fetchFeatureFlags();
  }, []);

  return (
    <>
      {features ? (
        <div>
          <h1>Feature Flags</h1>
          <p>New UI: {features?.newUI ? 'Enabled' : 'Disabled'}</p>
          <p>Beta Features: {features?.betaFeatures ? 'Enabled' : 'Disabled'}</p>
        </div>
      ) : (
        <p>Loading feature flags...</p>
      )}
    </>
  );
}

export default App;

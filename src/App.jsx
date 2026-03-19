import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Layout/Header';
import TabNav from './components/Layout/TabNav';
import MapView from './components/Map/MapView';
import RegulationsPanel from './components/Regulations/RegulationsPanel';

const queryClient = new QueryClient();

export default function App() {
  const [activeTab, setActiveTab] = useState('map');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col h-screen">
        <Header />
        <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 overflow-auto min-h-0">
          {activeTab === 'map' ? (
            <div className="h-full">
              <MapView />
            </div>
          ) : (
            <RegulationsPanel />
          )}
        </div>
      </div>
    </QueryClientProvider>
  );
}

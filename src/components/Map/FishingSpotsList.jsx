import { useState } from 'react';

export default function FishingSpotsList({
  troutData,
  accessData,
  easementsData,
  onSpotClick,
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('stocked');

  const troutFeatures = troutData?.features || [];
  const accessFeatures = accessData?.features || [];
  const easementFeatures = easementsData?.features || [];

  const sortedTrout = [...troutFeatures].sort((a, b) => {
    const na = a.properties?.WATER_NAME || '';
    const nb = b.properties?.WATER_NAME || '';
    return na.localeCompare(nb);
  });

  const publicSpots = [
    ...easementFeatures.map((f) => ({
      name: f.properties?.name || 'PFBC Fishing Easement',
      type: 'Fishing Easement',
      county: f.properties?.county || f.properties?.COUNTY || '',
      water: f.properties?.waterway || f.properties?.targetSpecies || '',
      color: '#9333ea',
      feature: f,
    })),
    ...accessFeatures.map((f) => {
      const p = f.properties;
      return {
        name: p?.SITE_NAME || p?.name || p?.ACCESS_NAME || 'Access Point',
        type: p?.ACCESS_TYPE || 'Access Point',
        county: p?.COUNTY || p?.county || '',
        water: p?.WATERWAY || p?.waterBody || '',
        color: '#1d4ed8',
        feature: f,
      };
    }),
  ].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="absolute top-2 left-2 z-[1000] flex flex-col items-start">
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="bg-white border border-gray-200 rounded-lg shadow px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 select-none"
        title={open ? 'Hide fishing spots list' : 'Show fishing spots list'}
      >
        {/* List icon */}
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <span className="hidden sm:inline">Fishing Spots</span>
        <span className="text-gray-400 text-xs">{open ? '▴' : '▾'}</span>
      </button>

      {/* Panel */}
      {open && (
        <div className="mt-1 bg-white rounded-lg shadow-lg border border-gray-200 w-52 sm:w-64 max-h-[65vh] sm:max-h-[75vh] flex flex-col">

          {/* Tabs */}
          <div className="flex border-b border-gray-200 flex-shrink-0">
            <button
              className={`flex-1 py-2 text-xs font-semibold transition-colors ${
                tab === 'stocked'
                  ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setTab('stocked')}
            >
              Stocked Waters
              <span className="ml-1 text-gray-400">({sortedTrout.length})</span>
            </button>
            <button
              className={`flex-1 py-2 text-xs font-semibold transition-colors ${
                tab === 'public'
                  ? 'text-blue-600 border-b-2 border-blue-500 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setTab('public')}
            >
              Public Access
              <span className="ml-1 text-gray-400">({publicSpots.length})</span>
            </button>
          </div>

          {/* Stocked Waters tab */}
          {tab === 'stocked' && (
            <div className="overflow-y-auto flex-1">
              <div className="px-3 py-2 bg-orange-50 border-b border-orange-100 flex-shrink-0">
                <p className="text-[10px] text-orange-700 leading-snug">
                  PFBC stocked streams, rivers, lakes &amp; ponds. Click any row to highlight &amp; zoom on the map.
                </p>
              </div>
              <div className="divide-y divide-gray-100">
                {sortedTrout.length === 0 ? (
                  <div className="px-3 py-4 text-sm text-gray-400 text-center">
                    No stocked waters loaded yet — ensure the Stocked Trout Waters layer is on.
                  </div>
                ) : sortedTrout.map((f, i) => {
                  const name = f.properties?.WATER_NAME || 'Unnamed';
                  const county = f.properties?.COUNTY || '';
                  const type = f.properties?._layerType;
                  const isLake = type === 'trout_lake';
                  return (
                    <button
                      key={i}
                      className="w-full text-left px-3 py-2 hover:bg-orange-50 flex items-start gap-2 group"
                      onClick={() => onSpotClick(f)}
                    >
                      <span
                        className={`mt-1 w-2.5 h-2.5 flex-shrink-0 ${isLake ? 'rounded-full' : 'rounded-sm'}`}
                        style={{ background: '#f97316', border: '1.5px solid #ea580c' }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-800 font-medium leading-snug group-hover:text-orange-700 truncate">
                          {name}
                        </div>
                        <div className="text-xs text-gray-400 leading-tight">
                          {isLake ? 'Lake / Pond' : 'Stream / River'}
                          {county ? ` · ${county} Co.` : ''}
                        </div>
                      </div>
                      <svg className="w-3 h-3 text-gray-300 group-hover:text-orange-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Public Access tab */}
          {tab === 'public' && (
            <div className="overflow-y-auto flex-1">
              {/* Public lands note */}
              <div className="px-3 py-2 bg-green-50 border-b border-green-100 flex-shrink-0">
                <p className="text-[10px] text-green-700 leading-snug">
                  All <strong>State Game Lands</strong>, <strong>State Forests</strong>, and <strong>State Parks</strong> shown on the map (green/blue areas) allow public fishing. Below are specific PFBC-designated access points and easements.
                </p>
              </div>
              <div className="divide-y divide-gray-100">
                {publicSpots.length === 0 ? (
                  <div className="px-3 py-4 text-sm text-gray-400 text-center">
                    No public access points loaded.
                  </div>
                ) : publicSpots.map((spot, i) => (
                  <button
                    key={i}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 flex items-start gap-2 group"
                    onClick={() => onSpotClick(spot.feature)}
                  >
                    <span
                      className="mt-1 w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: spot.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-800 font-medium leading-snug group-hover:text-blue-700 truncate">
                        {spot.name}
                      </div>
                      <div className="text-xs text-gray-400 leading-tight">
                        {spot.type}
                        {spot.county ? ` · ${spot.county} Co.` : ''}
                        {spot.water ? ` · ${spot.water}` : ''}
                      </div>
                    </div>
                    <svg className="w-3 h-3 text-gray-300 group-hover:text-blue-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

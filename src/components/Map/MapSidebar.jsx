const LEGEND_ITEMS = [
  // Public Lands
  { swatch: { type: 'fill', bg: 'rgba(163,230,53,0.5)',   border: '#65a30d' }, label: 'State Game Land' },
  { swatch: { type: 'fill', bg: 'rgba(220,252,231,0.7)',  border: '#166534' }, label: 'State Forest' },
  { swatch: { type: 'fill', bg: 'rgba(186,230,253,0.6)',  border: '#0369a1' }, label: 'State Park' },
  // Waterways
  { swatch: { type: 'line', color: '#60a5fa' },                                label: 'Streams & Rivers' },
  { swatch: { type: 'fill', bg: 'rgba(147,197,253,0.5)', border: '#3b82f6' }, label: 'Lakes & Ponds' },
  // Trout
  { swatch: { type: 'dash', color: '#f97316' },                                label: 'Stocked Trout Streams' },
  { swatch: { type: 'fill', bg: 'rgba(254,215,170,0.6)', border: '#ea580c' }, label: 'Stocked Trout Lakes' },
  // Other
  { swatch: { type: 'dash', color: '#9333ea' },                                label: 'Fishing Easement' },
  { swatch: { type: 'dot',  color: '#1d4ed8' },                                label: 'Boat Launch / Access' },
  { swatch: { type: 'dash', color: '#1e40af' },                                label: 'County Boundary' },
  { swatch: { type: 'dot',  color: '#be185d' },                                label: 'Fly Shop / Tackle' },
];

function Swatch({ s }) {
  if (s.type === 'fill') {
    return (
      <span
        className="inline-block w-4 h-3 rounded-sm flex-shrink-0"
        style={{ background: s.bg, border: `1.5px solid ${s.border}` }}
      />
    );
  }
  if (s.type === 'line') {
    return (
      <span
        className="flex-shrink-0"
        style={{ display: 'inline-block', width: 20, height: 0, borderTop: `2px solid ${s.color}` }}
      />
    );
  }
  if (s.type === 'dash') {
    return (
      <span
        className="flex-shrink-0"
        style={{ display: 'inline-block', width: 20, height: 0, borderTop: `2.5px dashed ${s.color}` }}
      />
    );
  }
  if (s.type === 'dot') {
    return (
      <span
        className="inline-block w-3 h-3 rounded-full flex-shrink-0"
        style={{ background: s.color, border: '2px solid white', boxShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
      />
    );
  }
  return null;
}

export default function MapSidebar({ open, onToggle, layers, onLayerToggle, loadingIds = [], errorIds = [] }) {
  return (
    <div className="absolute top-2 right-2 z-[1000] flex flex-col items-end">
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="bg-white border border-gray-200 rounded-lg shadow px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 select-none"
        title={open ? 'Hide layers panel' : 'Show layers & legend'}
      >
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 16l4.553-2.276A1 1 0 0021 19.382V8.618a1 1 0 00-.553-.894L15 5m0 2v14" />
        </svg>
        <span className="hidden sm:inline">Layers</span>
        <span className="text-gray-400 text-xs">{open ? '▴' : '▾'}</span>
      </button>

      {/* Panel */}
      {open && (
        <div className="mt-1 bg-white rounded-lg shadow-lg border border-gray-200 w-44 sm:w-52 max-h-[65vh] sm:max-h-[75vh] overflow-y-auto">

          {/* Layer Toggles */}
          <div className="p-3">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Show / Hide Layers
            </p>
            <div className="space-y-1">
              {layers.map(layer => {
                const isLoading = loadingIds.includes(layer.id);
                const isError = errorIds.includes(layer.id);
                return (
                  <label
                    key={layer.id}
                    className="flex items-center gap-2 py-0.5 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={layer.visible}
                      onChange={() => onLayerToggle(layer.id)}
                      className="rounded border-gray-300 text-blue-600 w-3.5 h-3.5 flex-shrink-0"
                    />
                    <span
                      className="w-3 h-3 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: layer.color }}
                    />
                    <span className={`text-sm flex-1 leading-tight ${layer.visible ? 'text-gray-800' : 'text-gray-400'}`}>
                      {layer.label}
                    </span>
                    {isLoading && (
                      <span className="text-blue-400 text-xs animate-spin inline-block leading-none">↻</span>
                    )}
                    {isError && !isLoading && (
                      <span className="text-amber-500 text-xs leading-none" title="Could not load — data may be temporarily unavailable">⚠</span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Legend */}
          <div className="p-3">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Legend
            </p>
            <div className="space-y-1.5">
              {LEGEND_ITEMS.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Swatch s={item.swatch} />
                  <span className="text-xs text-gray-600">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

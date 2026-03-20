import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  MapContainer,
  TileLayer,
  WMSTileLayer,
  GeoJSON,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import CountyFilter from './CountyFilter';
import MapSidebar from './MapSidebar';
import FishingSpotsList from './FishingSpotsList';
import { useOverpassWaterways } from '../../hooks/useOverpassWaterways';
import { useAccessPoints } from '../../hooks/useAccessPoints';
import { useTroutWaters } from '../../hooks/useTroutWaters';
import { usePublicLands } from '../../hooks/usePublicLands';
import { useFishingEasements } from '../../hooks/useFishingEasements';
import { countyBounds, defaultView } from '../../data/countyBounds';
import { specialWaterways } from '../../data/regulations2026';

// Fix Leaflet default icon path issues with Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom PFBC access point marker
const accessIcon = L.divIcon({
  className: '',
  html: `<div style="background:#1d4ed8;border:2px solid white;border-radius:50%;width:12px;height:12px;box-shadow:0 1px 3px rgba(0,0,0,0.5)"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
  popupAnchor: [0, -10],
});

// Public land styles — each type uses a distinct color family
function makePublicLandStyles(hl) {
  return {
    'State Game Land': { color: '#65a30d', weight: hl ? 2 : 1, fillColor: '#a3e635', fillOpacity: hl ? 0.65 : 0.40 },
    'State Forest':    { color: '#166534', weight: hl ? 2 : 1, fillColor: '#dcfce7', fillOpacity: hl ? 0.75 : 0.50 },
    'State Park':      { color: '#0369a1', weight: hl ? 2 : 1, fillColor: '#bae6fd', fillOpacity: hl ? 0.70 : 0.45 },
  };
}

function makeGetPublicLandStyle(hl) {
  const styles = makePublicLandStyles(hl);
  return (feature) => styles[feature.properties?._landType] || styles['State Game Land'];
}

function publicLandOnEachFeature(feature, layer) {
  const p = feature.properties;
  const label = p?._label || p?._landType || 'Public Land';
  const type = p?._landType || '';
  const acres = p?.ACREAGE || p?.ACRES || '';
  layer.bindPopup(`
    <div style="font-family:system-ui,sans-serif;min-width:160px">
      <h3 style="font-weight:700;color:#14532d;font-size:13px;margin:0 0 4px">${label}</h3>
      <span style="background:#dcfce7;color:#166534;font-size:11px;padding:2px 8px;border-radius:999px">${type}</span>
      ${acres ? `<p style="font-size:11px;color:#6b7280;margin:4px 0 0">~${Math.round(acres).toLocaleString()} acres</p>` : ''}
      <p style="font-size:11px;color:#15803d;font-weight:600;margin:6px 0 0">Public land — fishing allowed</p>
    </div>
  `);
}

// GeoJSON styles — normal (all counties) vs highlighted (single county selected)
function makeStyles(hl) {
  return {
    waterwayLine: { color: '#3b82f6', weight: hl ? 3   : 1.5, opacity: hl ? 1   : 0.7 },
    waterwayPoly: { color: '#1d4ed8', weight: hl ? 2   : 1,   fillColor: '#60a5fa', fillOpacity: hl ? 0.65 : 0.4 },
    troutStream:  { color: '#f97316', weight: hl ? 4   : 2.5, opacity: hl ? 1   : 0.9, dashArray: '8 4' },
    troutLake:    { color: '#ea580c', weight: hl ? 3   : 2,   fillColor: '#fed7aa', fillOpacity: hl ? 0.7  : 0.45 },
    easement:     { color: '#9333ea', weight: hl ? 5   : 3,   opacity: hl ? 1   : 0.88, dashArray: '5 3' },
  };
}

const countyStyle = { color: '#1e40af', weight: 2.5, fillOpacity: 0, dashArray: '8 5' };

function makeGetWaterwayStyle(hl) {
  const s = makeStyles(hl);
  return (feature) => {
    const t = feature.geometry?.type;
    return t === 'Polygon' || t === 'MultiPolygon' ? s.waterwayPoly : s.waterwayLine;
  };
}

function makeGetTroutStyle(hl) {
  const s = makeStyles(hl);
  return (feature) => {
    const t = feature.geometry?.type;
    return t === 'Polygon' || t === 'MultiPolygon' ? s.troutLake : s.troutStream;
  };
}

function makeGetEasementStyle(hl) {
  const s = makeStyles(hl);
  return () => s.easement;
}

// Fly to county when selection changes
function FlyToCounty({ county }) {
  const map = useMap();
  useEffect(() => {
    if (county === 'all') {
      map.flyTo(defaultView.center, defaultView.zoom, { duration: 1 });
    } else if (countyBounds[county]) {
      map.flyToBounds(countyBounds[county].bounds, { duration: 1, padding: [30, 30] });
    }
  }, [county, map]);
  return null;
}

// Fly to a search result
function FlyToTarget({ target }) {
  const map = useMap();
  useEffect(() => {
    if (!target) return;
    if (target.bounds) {
      map.fitBounds(target.bounds, { padding: [40, 40], maxZoom: 15, duration: 1 });
    } else if (target.latlng) {
      map.flyTo(target.latlng, target.zoom || 14, { duration: 1 });
    }
  }, [target, map]);
  return null;
}

// Compute bounds/center from a GeoJSON feature for search fly-to
function getFeatureTarget(feature) {
  const geom = feature.geometry;
  if (!geom) return null;
  if (geom.type === 'Point') {
    const [lng, lat] = geom.coordinates;
    return { latlng: [lat, lng], zoom: 14 };
  }
  try {
    const bounds = L.geoJSON(feature).getBounds();
    if (bounds.isValid()) return { bounds };
  } catch {}
  return null;
}

async function fetchCountyBoundaries() {
  const fips = encodeURIComponent("('049','039','123')");
  const url =
    `https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/State_County/MapServer/1/query` +
    `?where=STATE%3D'42'+AND+COUNTY+IN+${fips}&f=geojson&outFields=NAME,COUNTY`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('TIGER fetch failed');
    return await res.json();
  } catch {
    return null;
  }
}

function buildPopupHTML(props) {
  const name = props?.name || props?.WATER_NAME || 'Unnamed Waterway';
  const type = props?.waterway || props?.water || props?._layerType || 'waterway';
  const special = specialWaterways.find(
    (w) => name && w.name.toLowerCase().includes(name.toLowerCase().split(' ')[0])
  );
  const pfbcLink =
    special?.pfbcLink || 'https://www.pa.gov/agencies/fishandboat/fishing/regulations';

  let rulesHTML = '';
  if (special) {
    const items = Object.entries(special.rules)
      .map(
        ([sp, rule]) =>
          `<li><b style="text-transform:capitalize">${sp}:</b> ${rule}</li>`
      )
      .join('');
    rulesHTML = `
      <p style="font-weight:600;font-size:11px;color:#374151;margin:4px 0 2px">Key 2026 Regulations:</p>
      <ul style="margin:0;padding-left:14px;font-size:11px;color:#4b5563;line-height:1.6">${items}</ul>
      ${special.permitRequired ? `<p style="font-size:11px;color:#b45309;font-weight:600;margin:4px 0">⚠️ ${special.permitRequired}</p>` : ''}
      ${special.notes ? `<p style="font-size:11px;color:#6b7280;font-style:italic;margin:4px 0">${special.notes}</p>` : ''}
    `;
  }

  const displayType = type.replace(/_/g, ' ');
  return `
    <div style="min-width:210px;max-width:290px;font-family:system-ui,sans-serif">
      <h3 style="font-weight:700;color:#1e3a5f;font-size:14px;margin:0 0 6px">${name}</h3>
      <div style="margin-bottom:6px">
        <span style="background:#dbeafe;color:#1e40af;font-size:11px;padding:2px 8px;border-radius:999px;text-transform:capitalize">${displayType}</span>
      </div>
      ${rulesHTML}
      <a href="${pfbcLink}" target="_blank" rel="noopener noreferrer"
         style="display:inline-block;margin-top:6px;font-size:11px;color:#1d4ed8;font-weight:600;text-decoration:none">
        View Full PFBC Regulations ↗
      </a>
    </div>
  `;
}

function waterwayOnEachFeature(feature, layer) {
  const name =
    feature.properties?.name ||
    feature.properties?.WATER_NAME ||
    feature.properties?.waterway ||
    'Unnamed';
  layer.on('click', function (e) {
    L.popup({ maxWidth: 320 })
      .setLatLng(e.latlng)
      .setContent(buildPopupHTML(feature.properties))
      .openOn(e.target._map);
  });
  if (name && name !== 'Unnamed') {
    layer.bindTooltip(name, { permanent: false, direction: 'top', className: 'text-xs' });
  }
}

// Highlight styles for stocked waters when selected
const TROUT_HIGHLIGHT_LINE = { color: '#facc15', weight: 8, opacity: 1, dashArray: null };
const TROUT_HIGHLIGHT_POLY = { color: '#facc15', weight: 6, fillColor: '#fef08a', fillOpacity: 0.85 };

export default function MapView() {
  const [county, setCounty] = useState('all');
  const [countyGeoJSON, setCountyGeoJSON] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [flyTarget, setFlyTarget] = useState(null);
  const searchRef = useRef(null);
  // Ref tracking the currently highlighted stocked-water Leaflet layer
  const selectedTroutLayerRef = useRef(null);

  const [layers, setLayers] = useState([
    { id: 'publicLands',      label: 'Public Lands',          visible: true,  color: '#65a30d' },
    { id: 'fishingEasements', label: 'Fishing Easements',     visible: true,  color: '#9333ea' },
    { id: 'nhd',              label: 'USGS Waterways',        visible: true,  color: '#3b82f6' },
    { id: 'osmWaterways',     label: 'Streams & Rivers',      visible: true,  color: '#60a5fa' },
    { id: 'troutWaters',      label: 'Stocked Trout Waters',  visible: true,  color: '#f97316' },
    { id: 'accessPoints',     label: 'Boat Launches & Access',visible: true,  color: '#1d4ed8' },
    { id: 'countyBounds',     label: 'County Boundaries',     visible: true,  color: '#1e40af' },
  ]);

  const { data: waterwayData,    isLoading: osmLoading,      isError: osmError      } = useOverpassWaterways(county);
  const { data: accessData,      isLoading: accessLoading,   isError: accessError   } = useAccessPoints(county);
  const { data: troutData,       isLoading: troutLoading,    isError: troutError    } = useTroutWaters(county);
  const { data: publicLandsData, isLoading: landsLoading,    isError: landsError    } = usePublicLands(county);
  const { data: easementsData,   isLoading: easementsLoading,isError: easementsError} = useFishingEasements(county);

  const loadingIds = [
    osmLoading       && 'osmWaterways',
    accessLoading    && 'accessPoints',
    troutLoading     && 'troutWaters',
    landsLoading     && 'publicLands',
    easementsLoading && 'fishingEasements',
  ].filter(Boolean);

  const errorIds = [
    osmError       && 'osmWaterways',
    accessError    && 'accessPoints',
    troutError     && 'troutWaters',
    landsError     && 'publicLands',
    easementsError && 'fishingEasements',
  ].filter(Boolean);

  // Search across all loaded features
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 2) return [];
    const results = [];

    waterwayData?.features?.forEach(f => {
      const name = f.properties?.name;
      if (name && name.toLowerCase().includes(q))
        results.push({ name, type: 'Stream / River', feature: f, color: '#3b82f6' });
    });

    troutData?.features?.forEach(f => {
      const name = f.properties?.WATER_NAME;
      if (name && name.toLowerCase().includes(q))
        results.push({ name, type: 'Stocked Trout Water', feature: f, color: '#f97316' });
    });

    accessData?.features?.forEach(f => {
      const p = f.properties;
      const name = p?.SITE_NAME || p?.name || p?.ACCESS_NAME;
      if (name && name.toLowerCase().includes(q))
        results.push({ name, type: 'Access Point', feature: f, color: '#1d4ed8' });
    });

    return results.slice(0, 8);
  }, [searchQuery, waterwayData, troutData, accessData]);

  useEffect(() => {
    fetchCountyBoundaries().then(setCountyGeoJSON);
  }, []);

  // Close search dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function toggleLayer(id) {
    setLayers((prev) => prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l)));
  }

  const isVisible = (id) => layers.find((l) => l.id === id)?.visible;
  const hl = county !== 'all';

  // Highlight stocked water on click + show popup
  const troutOnEachFeature = useCallback((feature, layer) => {
    const name = feature.properties?.WATER_NAME || feature.properties?.name || 'Stocked Water';
    if (name) layer.bindTooltip(name, { permanent: false, direction: 'top', className: 'text-xs' });

    layer.on('click', (e) => {
      // Reset the previously highlighted layer back to its normal style
      if (selectedTroutLayerRef.current && selectedTroutLayerRef.current !== layer) {
        const prev = selectedTroutLayerRef.current;
        const prevGeom = prev.feature?.geometry?.type;
        const s = makeStyles(hl);
        prev.setStyle(
          (prevGeom === 'Polygon' || prevGeom === 'MultiPolygon') ? s.troutLake : s.troutStream
        );
      }
      // Apply highlight to clicked layer
      selectedTroutLayerRef.current = layer;
      const geomType = feature.geometry?.type;
      layer.setStyle(
        (geomType === 'Polygon' || geomType === 'MultiPolygon')
          ? TROUT_HIGHLIGHT_POLY
          : TROUT_HIGHLIGHT_LINE
      );
      // Show popup
      L.popup({ maxWidth: 320 })
        .setLatLng(e.latlng)
        .setContent(buildPopupHTML(feature.properties))
        .openOn(e.target._map);
    });
  }, [hl]);

  // Fly to a spot from the FishingSpotsList
  function handleSpotClick(feature) {
    const target = getFeatureTarget(feature);
    if (target) setFlyTarget({ ...target, _id: Date.now() });
    // If it's a trout feature, highlight it on the map too
    // (the GeoJSON layer ref isn't directly accessible here, so we rely on
    //  the user clicking the feature on the map for the highlight effect)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-3 py-2 flex flex-wrap items-center gap-2 flex-shrink-0">

        {/* Search */}
        <div ref={searchRef} className="relative flex-1 min-w-[180px] max-w-sm">
          <div className="relative">
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search streams, lakes, access points…"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setShowResults(true); }}
              onFocus={() => setShowResults(true)}
              className="w-full pl-8 pr-7 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); setShowResults(false); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs leading-none"
                title="Clear search"
              >✕</button>
            )}
          </div>

          {/* Dropdown results */}
          {showResults && searchQuery.length >= 2 && (
            <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-[2000] max-h-60 overflow-y-auto">
              {searchResults.length > 0 ? searchResults.map((r, i) => (
                <button
                  key={i}
                  className="w-full text-left px-3 py-2 hover:bg-blue-50 flex items-center gap-2 border-b border-gray-100 last:border-0"
                  onClick={() => {
                    const target = getFeatureTarget(r.feature);
                    if (target) setFlyTarget({ ...target, _id: Date.now() });
                    setShowResults(false);
                    setSearchQuery(r.name);
                  }}
                >
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: r.color }} />
                  <span className="text-sm text-gray-800 flex-1 truncate">{r.name}</span>
                  <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{r.type}</span>
                </button>
              )) : (
                <div className="px-3 py-2 text-sm text-gray-500">No results — try a different name</div>
              )}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-5 w-px bg-gray-200 flex-shrink-0" />

        {/* County filter */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-gray-500 font-medium whitespace-nowrap hidden sm:inline">Zoom to county:</span>
          <CountyFilter selected={county} onChange={setCounty} />
        </div>

        {/* Loading indicator */}
        {loadingIds.length > 0 && (
          <span className="ml-auto text-xs text-blue-500 animate-pulse flex-shrink-0 whitespace-nowrap">
            Loading…
          </span>
        )}
      </div>

      {/* Map + Controls */}
      <div className="relative flex-1">
        <MapContainer
          center={defaultView.center}
          zoom={defaultView.zoom}
          className="h-full w-full"
        >
          <FlyToCounty county={county} />
          <FlyToTarget target={flyTarget} />

          {/* OSM base layer */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            maxZoom={19}
          />

          {/* Public Lands (Game Lands, State Forests, State Parks) */}
          {isVisible('publicLands') && publicLandsData?.features?.length > 0 && (
            <GeoJSON
              key={`publicLands-${county}-${publicLandsData.features.length}`}
              data={publicLandsData}
              style={makeGetPublicLandStyle(hl)}
              onEachFeature={publicLandOnEachFeature}
            />
          )}

          {/* PFBC Public Fishing Easements */}
          {isVisible('fishingEasements') && easementsData?.features?.length > 0 && (
            <GeoJSON
              key={`easements-${county}-${easementsData.features.length}`}
              data={easementsData}
              style={makeGetEasementStyle(hl)}
              onEachFeature={(feature, layer) => {
                const p = feature.properties;
                const name = p?.name || 'PFBC Fishing Easement';
                layer.bindTooltip(name, { permanent: false, direction: 'top', className: 'text-xs' });
                layer.on('click', function (e) {
                  L.popup({ maxWidth: 320 })
                    .setLatLng(e.latlng)
                    .setContent(`
                      <div style="min-width:210px;max-width:290px;font-family:system-ui,sans-serif">
                        <h3 style="font-weight:700;color:#581c87;font-size:14px;margin:0 0 6px">${name}</h3>
                        <span style="background:#f3e8ff;color:#7e22ce;font-size:11px;padding:2px 8px;border-radius:999px">PFBC Public Fishing Easement</span>
                        ${p?.description ? `<p style="font-size:11px;color:#374151;margin:6px 0 4px">${p.description}</p>` : ''}
                        ${p?.targetSpecies ? `<p style="font-size:11px;color:#374151;margin:2px 0"><b>Target species:</b> ${p.targetSpecies}</p>` : ''}
                        ${p?.permitRequired ? `<p style="font-size:11px;color:#b45309;font-weight:600;margin:4px 0">&#9888; ${p.permitRequired}</p>` : ''}
                        <a href="${p?.pfbcLink || 'https://www.pa.gov/agencies/fishandboat/fishing/regulations'}"
                           target="_blank" rel="noopener noreferrer"
                           style="display:inline-block;margin-top:6px;font-size:11px;color:#7e22ce;font-weight:600;text-decoration:none">
                          View PFBC Info &#8599;
                        </a>
                      </div>
                    `)
                    .openOn(e.target._map);
                });
              }}
            />
          )}

          {/* USGS NHD: cached tile layer (background) */}
          {isVisible('nhd') && (
            <TileLayer
              url="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/{z}/{y}/{x}"
              attribution="USGS National Hydrography"
              opacity={0.55}
              maxZoom={16}
            />
          )}

          {/* USGS NHD WMS: flowlines (streams/rivers) — layer 6 */}
          {isVisible('nhd') && (
            <WMSTileLayer
              url="https://hydro.nationalmap.gov/arcgis/services/nhd/MapServer/WMSServer"
              layers="6"
              format="image/png"
              transparent={true}
              version="1.3.0"
              opacity={0.75}
              attribution="USGS NHD"
            />
          )}

          {/* USGS NHD WMS: waterbodies (lakes/ponds) — layer 12 */}
          {isVisible('nhd') && (
            <WMSTileLayer
              url="https://hydro.nationalmap.gov/arcgis/services/nhd/MapServer/WMSServer"
              layers="12"
              format="image/png"
              transparent={true}
              version="1.3.0"
              opacity={0.65}
            />
          )}

          {/* County boundaries */}
          {isVisible('countyBounds') && countyGeoJSON && (
            <GeoJSON data={countyGeoJSON} style={countyStyle} />
          )}

          {/* OSM Waterways from Overpass */}
          {isVisible('osmWaterways') && waterwayData && (
            <GeoJSON
              key={`osm-${county}-${waterwayData.features?.length}`}
              data={waterwayData}
              style={makeGetWaterwayStyle(hl)}
              onEachFeature={waterwayOnEachFeature}
            />
          )}

          {/* Stocked Trout Waters (PASDA) — click to highlight */}
          {isVisible('troutWaters') && troutData && troutData.features?.length > 0 && (
            <GeoJSON
              key={`trout-${county}-${troutData.features.length}`}
              data={troutData}
              style={makeGetTroutStyle(hl)}
              onEachFeature={troutOnEachFeature}
            />
          )}

          {/* PFBC Access Points */}
          {isVisible('accessPoints') &&
            accessData?.features?.map((feature, i) => {
              const [lng, lat] = feature.geometry.coordinates;
              const p = feature.properties;
              const name =
                p?.SITE_NAME || p?.name || p?.Name || p?.ACCESS_NAME || 'Access Point';
              const countyName = p?.COUNTY || p?.county || p?.County || '';
              const type = p?.ACCESS_TYPE || p?.type || p?.Type || '';
              const waterBody = p?.WATERWAY || p?.waterBody || p?.WaterBody || '';
              const facilities = p?.facilities || p?.Facilities || '';
              const fee = p?.fee || '';

              return (
                <Marker key={i} position={[lat, lng]} icon={accessIcon}>
                  <Popup maxWidth={290}>
                    <div style={{ fontFamily: 'system-ui,sans-serif', fontSize: '13px' }}>
                      <h3 style={{ fontWeight: 700, color: '#1e3a5f', margin: '0 0 4px' }}>
                        {name}
                      </h3>
                      {waterBody && (
                        <p style={{ margin: '0 0 2px', color: '#374151' }}>
                          <b>Water:</b> {waterBody}
                        </p>
                      )}
                      {countyName && (
                        <p style={{ margin: '0 0 2px', color: '#6b7280', fontSize: '11px' }}>
                          {countyName} County
                        </p>
                      )}
                      {type && (
                        <p style={{ margin: '0 0 2px', color: '#374151', fontSize: '11px' }}>
                          <b>Type:</b> {type}
                        </p>
                      )}
                      {facilities && (
                        <p style={{ margin: '0 0 2px', color: '#374151', fontSize: '11px' }}>
                          <b>Facilities:</b> {facilities}
                        </p>
                      )}
                      {fee && (
                        <p style={{ margin: '0 0 4px', color: '#374151', fontSize: '11px' }}>
                          <b>Fee:</b> {fee}
                        </p>
                      )}
                      <a
                        href="https://www.pa.gov/agencies/fishandboat/fishing/regulations"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '11px', color: '#1d4ed8', fontWeight: 600 }}
                      >
                        PFBC Regulations ↗
                      </a>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
        </MapContainer>

        {/* Combined layers + legend sidebar */}
        <MapSidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen(v => !v)}
          layers={layers}
          onLayerToggle={toggleLayer}
          loadingIds={loadingIds}
          errorIds={errorIds}
        />

        {/* Fishing Spots list panel (left side) */}
        <FishingSpotsList
          troutData={troutData}
          accessData={accessData}
          easementsData={easementsData}
          onSpotClick={handleSpotClick}
        />
      </div>
    </div>
  );
}

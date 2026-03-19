import { useState, useEffect } from 'react';
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
import LayerControls from './LayerControls';
import { useOverpassWaterways } from '../../hooks/useOverpassWaterways';
import { useAccessPoints } from '../../hooks/useAccessPoints';
import { useTroutWaters } from '../../hooks/useTroutWaters';
import { usePublicLands } from '../../hooks/usePublicLands';
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

// Public land styles
const publicLandStyles = {
  'State Game Land': { color: '#15803d', weight: 1, fillColor: '#86efac', fillOpacity: 0.35 },
  'State Forest':   { color: '#166534', weight: 1, fillColor: '#4ade80', fillOpacity: 0.3  },
  'State Park':     { color: '#065f46', weight: 1, fillColor: '#34d399', fillOpacity: 0.35 },
};

function getPublicLandStyle(feature) {
  return publicLandStyles[feature.properties?._landType] || publicLandStyles['State Game Land'];
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

// GeoJSON styles
const waterwayLineStyle = { color: '#3b82f6', weight: 1.5, opacity: 0.7 };
const waterwayPolyStyle = { color: '#1d4ed8', weight: 1, fillColor: '#60a5fa', fillOpacity: 0.4 };
const troutStreamStyle = { color: '#0d9488', weight: 2.5, opacity: 0.85, dashArray: '8 4' };
const troutLakeStyle = { color: '#0d9488', weight: 2, fillColor: '#5eead4', fillOpacity: 0.35 };
const countyStyle = { color: '#1e40af', weight: 2.5, fillOpacity: 0, dashArray: '8 5' };

function getWaterwayStyle(feature) {
  const t = feature.geometry?.type;
  return t === 'Polygon' || t === 'MultiPolygon' ? waterwayPolyStyle : waterwayLineStyle;
}

function getTroutStyle(feature) {
  const t = feature.geometry?.type;
  return t === 'Polygon' || t === 'MultiPolygon' ? troutLakeStyle : troutStreamStyle;
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

export default function MapView() {
  const [county, setCounty] = useState('all');
  const [countyGeoJSON, setCountyGeoJSON] = useState(null);
  const [layers, setLayers] = useState([
    { id: 'publicLands', label: 'Public Lands', visible: true, color: '#16a34a' },
    { id: 'nhd', label: 'USGS Hydrography', visible: true, color: '#3b82f6' },
    { id: 'osmWaterways', label: 'OSM Waterways', visible: true, color: '#60a5fa' },
    { id: 'troutWaters', label: 'Stocked Trout Waters', visible: true, color: '#0d9488' },
    { id: 'accessPoints', label: 'PFBC Access Points', visible: true, color: '#1d4ed8' },
    { id: 'countyBounds', label: 'County Boundaries', visible: true, color: '#1e40af' },
  ]);

  const { data: waterwayData, isLoading: waterwaysLoading } = useOverpassWaterways(county);
  const { data: accessData } = useAccessPoints(county);
  const { data: troutData } = useTroutWaters(county);
  const { data: publicLandsData } = usePublicLands(county);

  useEffect(() => {
    fetchCountyBoundaries().then(setCountyGeoJSON);
  }, []);

  function toggleLayer(id) {
    setLayers((prev) => prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l)));
  }

  const isVisible = (id) => layers.find((l) => l.id === id)?.visible;

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 flex items-center gap-3 flex-wrap flex-shrink-0">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">County:</span>
        <CountyFilter selected={county} onChange={setCounty} />
        {waterwaysLoading && (
          <span className="text-xs text-blue-600 ml-auto animate-pulse">Loading waterways…</span>
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
              style={getPublicLandStyle}
              onEachFeature={publicLandOnEachFeature}
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
              style={getWaterwayStyle}
              onEachFeature={waterwayOnEachFeature}
            />
          )}

          {/* Stocked Trout Waters (PASDA) */}
          {isVisible('troutWaters') && troutData && troutData.features?.length > 0 && (
            <GeoJSON
              key={`trout-${county}-${troutData.features.length}`}
              data={troutData}
              style={getTroutStyle}
              onEachFeature={waterwayOnEachFeature}
            />
          )}

          {/* PFBC Access Points */}
          {isVisible('accessPoints') &&
            accessData?.features?.map((feature, i) => {
              const [lng, lat] = feature.geometry.coordinates;
              const p = feature.properties;
              const name =
                p?.SITE_NAME || p?.name || p?.Name || p?.ACCESS_NAME || 'Access Point';
              const county = p?.COUNTY || p?.county || p?.County || '';
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
                      {county && (
                        <p style={{ margin: '0 0 2px', color: '#6b7280', fontSize: '11px' }}>
                          {county} County
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

        {/* Layer Controls overlay */}
        <div className="absolute bottom-10 right-2 z-[1000]">
          <LayerControls layers={layers} onToggle={toggleLayer} />
        </div>

        {/* Legend */}
        <div className="absolute bottom-10 left-2 z-[1000] bg-white rounded shadow p-2 text-xs space-y-1.5">
          <p className="font-semibold text-gray-700 uppercase tracking-wide text-xs mb-1">
            Legend
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-block w-4 h-3 rounded-sm border border-green-700" style={{ background: 'rgba(134,239,172,0.5)' }} />
            <span className="text-gray-600">Public Land (Game Lands)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-4 h-3 rounded-sm border border-green-800" style={{ background: 'rgba(74,222,128,0.45)' }} />
            <span className="text-gray-600">State Forest</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-4 h-3 rounded-sm border border-emerald-800" style={{ background: 'rgba(52,211,153,0.45)' }} />
            <span className="text-gray-600">State Park</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-5 h-0.5 bg-blue-400" />
            <span className="text-gray-600">Rivers / Streams (OSM)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-4 h-3 bg-blue-300 border border-blue-500 rounded-sm" />
            <span className="text-gray-600">Lakes / Ponds</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-5 h-0"
              style={{
                borderTop: '2px dashed #0d9488',
                display: 'inline-block',
                width: 20,
                height: 0,
              }}
            />
            <span className="text-gray-600">Stocked Trout Waters</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-blue-700 rounded-full border-2 border-white shadow" />
            <span className="text-gray-600">PFBC Access Point</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-5 border-t-2 border-dashed border-blue-800" />
            <span className="text-gray-600">County Boundary</span>
          </div>
        </div>
      </div>
    </div>
  );
}

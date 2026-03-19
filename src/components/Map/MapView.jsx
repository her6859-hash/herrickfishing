import { useState, useEffect, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import { specialWaterways } from '../../data/regulations2026';
import L from 'leaflet';
import CountyFilter from './CountyFilter';
import LayerControls from './LayerControls';
import WaterwayPopup from './WaterwayPopup';
import { useOverpassWaterways } from '../../hooks/useOverpassWaterways';
import { useAccessPoints } from '../../hooks/useAccessPoints';
import { countyBounds, defaultView } from '../../data/countyBounds';

// Fix Leaflet default icon path issues with Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom fishing access marker icon
const fishingIcon = L.divIcon({
  className: '',
  html: `<div style="background:#1d4ed8;border:2px solid white;border-radius:50%;width:12px;height:12px;box-shadow:0 1px 3px rgba(0,0,0,0.4)"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
  popupAnchor: [0, -8],
});

// GeoJSON style for rivers/streams (lines)
const waterwayLineStyle = {
  color: '#3b82f6',
  weight: 1.5,
  opacity: 0.7,
};

// GeoJSON style for lakes/ponds (polygons)
const waterwayPolyStyle = {
  color: '#1d4ed8',
  weight: 1,
  fillColor: '#60a5fa',
  fillOpacity: 0.4,
};

function getWaterwayStyle(feature) {
  const geomType = feature.geometry?.type;
  if (geomType === 'Polygon' || geomType === 'MultiPolygon') return waterwayPolyStyle;
  return waterwayLineStyle;
}

// County boundary style
const countyStyle = {
  color: '#1e40af',
  weight: 2,
  fillOpacity: 0,
  dashArray: '6 4',
};

// Component to handle map view changes when county filter changes
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

// Fetches county boundary GeoJSON from Census TIGER service
async function fetchCountyBoundaries() {
  const fipsCodes = "('049','039','123')";
  const url =
    `https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/State_County/MapServer/1/query` +
    `?where=STATE%3D'42'+AND+COUNTY+IN+${encodeURIComponent(fipsCodes)}&f=geojson&outFields=NAME,COUNTY`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('TIGER fetch failed');
    return await res.json();
  } catch {
    return null;
  }
}

export default function MapView() {
  const [county, setCounty] = useState('all');
  const [countyGeoJSON, setCountyGeoJSON] = useState(null);
  const [layers, setLayers] = useState([
    { id: 'nhd', label: 'USGS Hydrography', visible: true, color: '#3b82f6' },
    { id: 'osmWaterways', label: 'OSM Waterways', visible: true, color: '#60a5fa' },
    { id: 'accessPoints', label: 'PFBC Access Points', visible: true, color: '#1d4ed8' },
    { id: 'countyBounds', label: 'County Boundaries', visible: true, color: '#1e40af' },
  ]);

  const { data: waterwayData, isLoading: waterwaysLoading } = useOverpassWaterways(county);
  const { data: accessData } = useAccessPoints();

  useEffect(() => {
    fetchCountyBoundaries().then(setCountyGeoJSON);
  }, []);

  function toggleLayer(id) {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l))
    );
  }

  const isVisible = (id) => layers.find((l) => l.id === id)?.visible;

  function waterwayOnEachFeature(feature, layer) {
    const name = feature.properties?.name || 'Unnamed Waterway';
    const type = feature.properties?.waterway || feature.properties?.water || 'waterway';
    layer.on('click', function (e) {
      const popup = L.popup({ maxWidth: 320 })
        .setLatLng(e.latlng)
        .setContent(buildPopupHTML(feature.properties));
      popup.openOn(e.target._map);
    });
    layer.bindTooltip(name !== 'Unnamed Waterway' ? name : type, {
      permanent: false,
      direction: 'top',
      className: 'text-xs',
    });
  }

  function buildPopupHTML(props) {
    const name = props?.name || 'Unnamed Waterway';
    const type = props?.waterway || props?.water || 'waterway';
    const special = specialWaterways.find(
      (w) => name && w.name.toLowerCase().includes(name.toLowerCase().split(' ')[0])
    );
    const pfbcLink =
      special?.pfbcLink || 'https://www.pa.gov/agencies/fishandboat/fishing/regulations';

    let rulesHTML = '';
    if (special) {
      const ruleItems = Object.entries(special.rules)
        .map(([sp, rule]) => `<li><b style="text-transform:capitalize">${sp}:</b> ${rule}</li>`)
        .join('');
      rulesHTML = `
        <p style="font-weight:600;font-size:11px;color:#374151;margin:4px 0 2px">Key 2026 Regulations:</p>
        <ul style="margin:0;padding-left:14px;font-size:11px;color:#4b5563">${ruleItems}</ul>
        ${special.notes ? `<p style="font-size:11px;color:#6b7280;font-style:italic;margin:4px 0">${special.notes}</p>` : ''}
      `;
    }

    return `
      <div style="min-width:200px;max-width:280px;font-family:system-ui,sans-serif">
        <h3 style="font-weight:700;color:#1e3a5f;font-size:14px;margin:0 0 6px">${name}</h3>
        <div style="margin-bottom:6px">
          <span style="background:#dbeafe;color:#1e40af;font-size:11px;padding:2px 8px;border-radius:999px;text-transform:capitalize;margin-right:4px">${type}</span>
        </div>
        ${rulesHTML}
        <a href="${pfbcLink}" target="_blank" rel="noopener noreferrer"
           style="font-size:11px;color:#1d4ed8;font-weight:600;text-decoration:none">
          View Full PFBC Regulations ↗
        </a>
      </div>
    `;
  }

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

      {/* Map + Layer Controls */}
      <div className="relative flex-1">
        <MapContainer
          center={defaultView.center}
          zoom={defaultView.zoom}
          className="h-full w-full"
          zoomControl={true}
        >
          <FlyToCounty county={county} />

          {/* Base layer */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            maxZoom={19}
          />

          {/* USGS NHD Hydrography tile layer */}
          {isVisible('nhd') && (
            <TileLayer
              url="https://basemap.nationalmap.gov/arcgis/rest/services/USGSHydroCached/MapServer/tile/{z}/{y}/{x}"
              attribution="USGS National Hydrography"
              opacity={0.65}
              maxZoom={16}
            />
          )}

          {/* County boundaries */}
          {isVisible('countyBounds') && countyGeoJSON && (
            <GeoJSON data={countyGeoJSON} style={countyStyle} />
          )}

          {/* OSM Waterways from Overpass */}
          {isVisible('osmWaterways') && waterwayData && (
            <GeoJSON
              key={`${county}-${waterwayData.features?.length}`}
              data={waterwayData}
              style={getWaterwayStyle}
              onEachFeature={waterwayOnEachFeature}
            />
          )}

          {/* PFBC Access Points */}
          {isVisible('accessPoints') && accessData?.features?.map((feature, i) => {
            const [lng, lat] = feature.geometry.coordinates;
            const props = feature.properties;
            const name = props?.name || props?.Name || props?.ACCESS_NAME || 'Access Point';
            const county = props?.county || props?.County || props?.COUNTY || '';
            const type = props?.type || props?.Type || props?.ACCESS_TYPE || '';
            const waterBody = props?.waterBody || props?.WATER_BODY || props?.WaterBody || '';
            const facilities = props?.facilities || props?.Facilities || '';
            const fee = props?.fee || '';

            return (
              <Marker key={i} position={[lat, lng]} icon={fishingIcon}>
                <Popup maxWidth={280}>
                  <div style={{ fontFamily: 'system-ui,sans-serif', fontSize: '13px' }}>
                    <h3 style={{ fontWeight: 700, color: '#1e3a5f', margin: '0 0 4px' }}>{name}</h3>
                    {waterBody && <p style={{ margin: '0 0 2px', color: '#374151' }}>Water: {waterBody}</p>}
                    {county && <p style={{ margin: '0 0 2px', color: '#6b7280', fontSize: '11px' }}>{county} County</p>}
                    {type && <p style={{ margin: '0 0 2px', color: '#374151', fontSize: '11px' }}>Type: {type}</p>}
                    {facilities && <p style={{ margin: '0 0 2px', color: '#374151', fontSize: '11px' }}>Facilities: {facilities}</p>}
                    {fee && <p style={{ margin: '0 0 4px', color: '#374151', fontSize: '11px' }}>Fee: {fee}</p>}
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
        <div className="absolute bottom-8 right-2 z-[1000]">
          <LayerControls layers={layers} onToggle={toggleLayer} />
        </div>

        {/* Legend */}
        <div className="absolute bottom-8 left-2 z-[1000] bg-white rounded shadow p-2 text-xs space-y-1">
          <p className="font-semibold text-gray-700 uppercase tracking-wide text-xs mb-1">Legend</p>
          <div className="flex items-center gap-2">
            <span className="inline-block w-5 h-0.5 bg-blue-500" />
            <span className="text-gray-600">Rivers / Streams</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-4 h-3 bg-blue-300 border border-blue-500 rounded-sm" />
            <span className="text-gray-600">Lakes / Ponds</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-blue-700 rounded-full border-2 border-white shadow" />
            <span className="text-gray-600">PFBC Access Point</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-5 h-0.5 bg-blue-800 border-dashed border-t-2" />
            <span className="text-gray-600">County Boundary</span>
          </div>
        </div>
      </div>
    </div>
  );
}

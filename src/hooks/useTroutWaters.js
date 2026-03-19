import { useQuery } from '@tanstack/react-query';

// PASDA PAFishBoat MapServer — Layer 3: Stocked Trout Waters (streams/rivers)
// Layer 1/2: Stocked Trout Waterbodies (lakes/ponds)
// Public, no API key required
const PASDA_TROUT_STREAMS_URL =
  'https://mapservices.pasda.psu.edu/server/rest/services/pasda/PAFishBoat/MapServer/3/query';

const PASDA_TROUT_LAKES_URL =
  'https://mapservices.pasda.psu.edu/server/rest/services/pasda/PAFishBoat/MapServer/2/query';

// Bounding boxes [xmin, ymin, xmax, ymax] per county (WGS84)
const COUNTY_BBOXES = {
  all: '-80.52,41.37,-78.93,42.27',
  erie: '-80.52,41.85,-79.76,42.27',
  warren: '-79.52,41.62,-78.94,42.00',
  crawford: '-80.52,41.37,-79.90,41.85',
};

async function fetchLayer(url, county) {
  const bbox = COUNTY_BBOXES[county] || COUNTY_BBOXES.all;
  const params = new URLSearchParams({
    geometry: bbox,
    geometryType: 'esriGeometryEnvelope',
    spatialRel: 'esriSpatialRelIntersects',
    outFields: 'WATER_NAME,COUNTY,WATER_CODE',
    f: 'geojson',
    resultRecordCount: '1000',
  });
  const response = await fetch(`${url}?${params}`);
  if (!response.ok) throw new Error(`PASDA responded ${response.status}`);
  return response.json();
}

async function fetchTroutWaters(county) {
  try {
    const [streams, lakes] = await Promise.allSettled([
      fetchLayer(PASDA_TROUT_STREAMS_URL, county),
      fetchLayer(PASDA_TROUT_LAKES_URL, county),
    ]);

    const features = [];
    if (streams.status === 'fulfilled' && streams.value.features) {
      features.push(
        ...streams.value.features.map((f) => ({
          ...f,
          properties: { ...f.properties, _layerType: 'trout_stream' },
        }))
      );
    }
    if (lakes.status === 'fulfilled' && lakes.value.features) {
      features.push(
        ...lakes.value.features.map((f) => ({
          ...f,
          properties: { ...f.properties, _layerType: 'trout_lake' },
        }))
      );
    }
    return { type: 'FeatureCollection', features };
  } catch (err) {
    console.warn('PASDA trout waters fetch failed:', err.message);
    return { type: 'FeatureCollection', features: [] };
  }
}

export function useTroutWaters(county = 'all') {
  return useQuery({
    queryKey: ['troutWaters', county],
    queryFn: () => fetchTroutWaters(county),
    staleTime: 60 * 60 * 1000,
    retry: 1,
  });
}

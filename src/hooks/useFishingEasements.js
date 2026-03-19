import { useQuery } from '@tanstack/react-query';
import { fishingEasementsGeoJSON } from '../data/fishingEasements';

// PASDA PAFishBoat MapServer — attempt to load PFBC fishing easement polygons/lines.
// Layer 0 = Access Points, 2 = Trout Waterbodies, 3 = Trout Streams
// Layer 1 may contain additional PFBC feature data; we attempt it and fall back gracefully.
const PASDA_EASEMENTS_URL =
  'https://mapservices.pasda.psu.edu/server/rest/services/pasda/PAFishBoat/MapServer/1/query';

const COUNTY_BBOXES = {
  all: '-80.52,41.37,-78.93,42.27',
  erie: '-80.52,41.85,-79.76,42.27',
  warren: '-79.52,41.62,-78.94,42.00',
  crawford: '-80.52,41.37,-79.90,41.85',
};

async function fetchEasements(county) {
  const bbox = COUNTY_BBOXES[county] || COUNTY_BBOXES.all;
  try {
    const params = new URLSearchParams({
      geometry: bbox,
      geometryType: 'esriGeometryEnvelope',
      spatialRel: 'esriSpatialRelIntersects',
      outFields: '*',
      f: 'geojson',
      resultRecordCount: '500',
    });
    const res = await fetch(`${PASDA_EASEMENTS_URL}?${params}`);
    if (!res.ok) throw new Error(`PASDA layer 1 responded ${res.status}`);
    const json = await res.json();
    // If PASDA returns valid features, use them; otherwise fall back to static
    if (json?.features?.length > 0) {
      return {
        type: 'FeatureCollection',
        features: json.features.map((f) => ({
          ...f,
          properties: { ...f.properties, _source: 'pasda' },
        })),
      };
    }
  } catch {
    // Silently fall through to static data
  }

  // Filter static easements by county
  const filtered =
    county === 'all'
      ? fishingEasementsGeoJSON.features
      : fishingEasementsGeoJSON.features.filter(
          (f) => f.properties?.county?.toLowerCase() === county.toLowerCase()
        );

  return { type: 'FeatureCollection', features: filtered };
}

export function useFishingEasements(county = 'all') {
  return useQuery({
    queryKey: ['fishingEasements', county],
    queryFn: () => fetchEasements(county),
    staleTime: 60 * 60 * 1000,
    retry: 1,
  });
}

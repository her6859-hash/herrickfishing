import { useQuery } from '@tanstack/react-query';

// PASDA PAFishBoat MapServer — Layer 28: WWCW Fisheries Streams 202411
// Warmwater & coolwater sport fishing streams identified by PFBC biologists
// Fields include species presence: Walleye, Smallmouth, White_Bass, Tiger_Musk, etc.
const PASDA_WARMWATER_URL =
  'https://mapservices.pasda.psu.edu/server/rest/services/pasda/PAFishBoat/MapServer/28/query';

const COUNTY_BBOXES = {
  all:      '-80.52,41.37,-78.93,42.27',
  erie:     '-80.52,41.85,-79.76,42.27',
  warren:   '-79.52,41.62,-78.94,42.00',
  crawford: '-80.52,41.37,-79.90,41.85',
};

const SPECIES_FIELDS = [
  'WATER_NAME', 'COUNTY',
  'Walleye', 'Sauger', 'Saugeye',
  'Smallmouth', 'Spotted_Ba', 'Striped_Ba', 'White_Bass',
  'Tiger_Musk',
  'White_Crap', 'White_Perc', 'Yellow_Per', 'Rock_Bass',
];

async function fetchWarmwaterStreams(county) {
  const bbox = COUNTY_BBOXES[county] || COUNTY_BBOXES.all;
  const params = new URLSearchParams({
    geometry: bbox,
    geometryType: 'esriGeometryEnvelope',
    spatialRel: 'esriSpatialRelIntersects',
    outFields: SPECIES_FIELDS.join(','),
    f: 'geojson',
    resultRecordCount: '1000',
  });
  try {
    const response = await fetch(`${PASDA_WARMWATER_URL}?${params}`);
    if (!response.ok) throw new Error(`PASDA Layer 28 responded ${response.status}`);
    const data = await response.json();
    return {
      type: 'FeatureCollection',
      features: (data.features || []).map((f) => ({
        ...f,
        properties: { ...f.properties, _layerType: 'warmwater_stream' },
      })),
    };
  } catch (err) {
    console.warn('PASDA warmwater streams fetch failed:', err.message);
    return { type: 'FeatureCollection', features: [] };
  }
}

export function useWarmwaterStreams(county = 'all') {
  return useQuery({
    queryKey: ['warmwaterStreams', county],
    queryFn: () => fetchWarmwaterStreams(county),
    staleTime: 60 * 60 * 1000,
    retry: 1,
  });
}

// Build a human-readable list of species present on this stream
export function getWarmwaterSpecies(props) {
  const map = {
    Walleye:    'Walleye',
    Sauger:     'Sauger',
    Saugeye:    'Saugeye',
    Smallmouth: 'Smallmouth Bass',
    Spotted_Ba: 'Spotted Bass',
    Striped_Ba: 'Striped Bass',
    White_Bass: 'White Bass',
    Tiger_Musk: 'Tiger Muskie',
    White_Crap: 'White Crappie',
    White_Perc: 'White Perch',
    Yellow_Per: 'Yellow Perch',
    Rock_Bass:  'Rock Bass',
  };
  return Object.entries(map)
    .filter(([key]) => props?.[key] && props[key] !== 'N' && props[key] !== '0' && props[key] !== null)
    .map(([, label]) => label);
}

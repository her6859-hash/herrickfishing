import { useQuery } from '@tanstack/react-query';

// PASDA ArcGIS services — all public, no API key required
const GAME_LANDS_URL =
  'https://mapservices.pasda.psu.edu/server/rest/services/pasda/PGCGameLands2024/MapServer/0/query';
const STATE_FORESTS_URL =
  'https://mapservices.pasda.psu.edu/server/rest/services/pasda/DCNR_StateForests/MapServer/0/query';
const STATE_PARKS_URL =
  'https://mapservices.pasda.psu.edu/server/rest/services/pasda/DCNRStateParksBoundary2021/MapServer/0/query';

const COUNTY_BBOXES = {
  all: '-80.52,41.37,-78.93,42.27',
  erie: '-80.52,41.85,-79.76,42.27',
  warren: '-79.52,41.62,-78.94,42.00',
  crawford: '-80.52,41.37,-79.90,41.85',
};

async function fetchLayer(url, county, outFields, labelField, landType) {
  const bbox = COUNTY_BBOXES[county] || COUNTY_BBOXES.all;
  const params = new URLSearchParams({
    geometry: bbox,
    geometryType: 'esriGeometryEnvelope',
    spatialRel: 'esriSpatialRelIntersects',
    outFields,
    f: 'geojson',
    resultRecordCount: '500',
  });
  const res = await fetch(`${url}?${params}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!data.features) return [];
  return data.features.map((f) => ({
    ...f,
    properties: { ...f.properties, _landType: landType, _label: f.properties[labelField] || landType },
  }));
}

async function fetchPublicLands(county) {
  const results = await Promise.allSettled([
    fetchLayer(GAME_LANDS_URL, county, 'GAMESLAND,ACREAGE', 'GAMESLAND', 'State Game Land'),
    fetchLayer(STATE_FORESTS_URL, county, 'DISTRICT_N,ACRES', 'DISTRICT_N', 'State Forest'),
    fetchLayer(STATE_PARKS_URL, county, 'PARKNAME,ACRES', 'PARKNAME', 'State Park'),
  ]);

  const features = [];
  for (const r of results) {
    if (r.status === 'fulfilled') features.push(...r.value);
  }
  return { type: 'FeatureCollection', features };
}

export function usePublicLands(county = 'all') {
  return useQuery({
    queryKey: ['publicLands', county],
    queryFn: () => fetchPublicLands(county),
    staleTime: 60 * 60 * 1000,
    retry: 1,
  });
}

import { useQuery } from '@tanstack/react-query';
import { accessPointsGeoJSON } from '../data/accessPoints';

// PASDA PAFishBoat MapServer — Layer 0: Fishing & Boating Access Points
// Public, no API key required
const PASDA_ACCESS_URL =
  'https://mapservices.pasda.psu.edu/server/rest/services/pasda/PAFishBoat/MapServer/0/query';

const COUNTY_MAP = {
  all: "COUNTY IN ('ERIE','WARREN','CRAWFORD')",
  erie: "COUNTY='ERIE'",
  warren: "COUNTY='WARREN'",
  crawford: "COUNTY='CRAWFORD'",
};

async function fetchAccessPoints(county = 'all') {
  const where = COUNTY_MAP[county] || COUNTY_MAP.all;
  try {
    const params = new URLSearchParams({
      where,
      outFields: 'SITE_NAME,ACCESS_TYPE,WATERWAY,COUNTY,LATITUDE,LONGITUDE',
      f: 'geojson',
      resultRecordCount: '500',
    });
    const response = await fetch(`${PASDA_ACCESS_URL}?${params}`);
    if (!response.ok) throw new Error(`PASDA responded ${response.status}`);
    const data = await response.json();
    if (!data.features || data.features.length === 0) throw new Error('No features returned');
    return data;
  } catch (err) {
    console.warn('PASDA access points fetch failed, using static fallback:', err.message);
    // Filter static fallback by county
    if (county === 'all') return accessPointsGeoJSON;
    const countyName = county.charAt(0).toUpperCase() + county.slice(1);
    return {
      ...accessPointsGeoJSON,
      features: accessPointsGeoJSON.features.filter(
        (f) => f.properties.county === countyName
      ),
    };
  }
}

export function useAccessPoints(county = 'all') {
  return useQuery({
    queryKey: ['accessPoints', county],
    queryFn: () => fetchAccessPoints(county),
    staleTime: 60 * 60 * 1000, // 1 hour
    retry: 1,
  });
}

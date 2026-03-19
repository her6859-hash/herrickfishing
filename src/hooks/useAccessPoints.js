import { useQuery } from '@tanstack/react-query';
import { accessPointsGeoJSON } from '../data/accessPoints';

// PFBC Fishing & Boating Access Points via ArcGIS REST (no API key needed)
const ARCGIS_URL =
  'https://services1.arcgis.com/fBc8EJBxQRMcHlei/arcgis/rest/services/PFBC_Fishing_Boating_Access/FeatureServer/0/query';

async function fetchAccessPoints() {
  try {
    const params = new URLSearchParams({
      where: "COUNTY IN ('ERIE','WARREN','CRAWFORD')",
      f: 'geojson',
      outFields: '*',
      resultRecordCount: '500',
    });
    const response = await fetch(`${ARCGIS_URL}?${params}`);
    if (!response.ok) throw new Error('ArcGIS fetch failed');
    const data = await response.json();
    if (!data.features || data.features.length === 0) throw new Error('No features');
    return data;
  } catch {
    // Fall back to static data
    return accessPointsGeoJSON;
  }
}

export function useAccessPoints() {
  return useQuery({
    queryKey: ['accessPoints'],
    queryFn: fetchAccessPoints,
    staleTime: 60 * 60 * 1000, // 1 hour
    retry: 1,
  });
}

import { useQuery } from '@tanstack/react-query';

// Bounding boxes [south, west, north, east] for Overpass API
const COUNTY_BBOXES = {
  all: [41.37, -80.52, 42.27, -78.94],
  erie: [41.85, -80.52, 42.27, -79.76],
  warren: [41.62, -79.52, 42.00, -78.94],
  crawford: [41.37, -80.52, 41.85, -79.90],
};

function buildOverpassQuery(bbox) {
  const [s, w, n, e] = bbox;
  const bboxStr = `${s},${w},${n},${e}`;
  return `
    [out:json][timeout:45];
    (
      way["waterway"~"^(river|stream|canal|drain)$"](${bboxStr});
      way["natural"="water"]["water"~"^(lake|reservoir|pond|river)$"](${bboxStr});
      relation["natural"="water"]["water"~"^(lake|reservoir|pond|river)$"](${bboxStr});
    );
    out body;
    >;
    out skel qt;
  `.trim();
}

function osmToGeoJSON(elements) {
  const nodes = {};
  const ways = [];
  const relations = [];

  for (const el of elements) {
    if (el.type === 'node') nodes[el.id] = [el.lon, el.lat];
    else if (el.type === 'way') ways.push(el);
    else if (el.type === 'relation') relations.push(el);
  }

  const features = [];

  for (const way of ways) {
    if (!way.nodes) continue;
    const coords = way.nodes.map((id) => nodes[id]).filter(Boolean);
    if (coords.length < 2) continue;

    const isPolygon =
      coords.length > 3 &&
      coords[0][0] === coords[coords.length - 1][0] &&
      coords[0][1] === coords[coords.length - 1][1];

    features.push({
      type: 'Feature',
      geometry: {
        type: isPolygon ? 'Polygon' : 'LineString',
        coordinates: isPolygon ? [coords] : coords,
      },
      properties: {
        id: way.id,
        name: way.tags?.name || null,
        waterway: way.tags?.waterway || null,
        natural: way.tags?.natural || null,
        water: way.tags?.water || null,
        type: way.tags?.waterway || way.tags?.water || 'waterway',
      },
    });
  }

  return { type: 'FeatureCollection', features };
}

async function fetchWaterways(county) {
  const bbox = COUNTY_BBOXES[county] || COUNTY_BBOXES.all;
  const query = buildOverpassQuery(bbox);
  const response = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: query,
  });
  if (!response.ok) throw new Error('Overpass API error');
  const data = await response.json();
  return osmToGeoJSON(data.elements);
}

export function useOverpassWaterways(county = 'all') {
  return useQuery({
    queryKey: ['waterways', county],
    queryFn: () => fetchWaterways(county),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

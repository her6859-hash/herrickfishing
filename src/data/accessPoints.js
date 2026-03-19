// Static fallback PFBC Fishing & Boating Access Points
// for Erie, Warren, and Crawford Counties, PA
// Source: PA Fish & Boat Commission / PASDA

export const accessPointsGeoJSON = {
  type: 'FeatureCollection',
  features: [
    // --- ERIE COUNTY ---
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-80.0853, 42.1534] },
      properties: {
        name: 'Presque Isle State Park — Marina',
        county: 'Erie',
        type: 'Boat Launch / Bank Fishing',
        waterBody: 'Presque Isle Bay / Lake Erie',
        facilities: 'Boat ramp, parking, restrooms',
        fee: 'Park entry fee may apply',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-80.0985, 42.1492] },
      properties: {
        name: 'Presque Isle Bay Access — East',
        county: 'Erie',
        type: 'Bank Fishing',
        waterBody: 'Presque Isle Bay',
        facilities: 'Shore access, parking',
        fee: 'Free',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-80.1450, 42.1302] },
      properties: {
        name: 'Freeport Beach Access',
        county: 'Erie',
        type: 'Bank Fishing',
        waterBody: 'Lake Erie',
        facilities: 'Shore access',
        fee: 'Free',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-80.2320, 42.1205] },
      properties: {
        name: 'Walnut Creek Access Area',
        county: 'Erie',
        type: 'Boat Launch / Bank Fishing',
        waterBody: 'Lake Erie / Walnut Creek',
        facilities: 'Boat ramp, parking',
        fee: 'Free',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.9850, 42.0120] },
      properties: {
        name: 'Edinboro Lake Access',
        county: 'Erie',
        type: 'Boat Launch',
        waterBody: 'Edinboro Lake',
        facilities: 'Boat ramp, parking',
        fee: 'Free',
      },
    },
    // --- CRAWFORD COUNTY ---
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-80.3052, 41.6264] },
      properties: {
        name: 'Pymatuning State Park — Linesville Boat Launch',
        county: 'Crawford',
        type: 'Boat Launch',
        waterBody: 'Pymatuning Reservoir',
        facilities: 'Boat ramp, parking, restrooms, concessions',
        fee: 'State park fee may apply',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-80.4450, 41.7020] },
      properties: {
        name: 'Pymatuning State Park — Jamestown Launch',
        county: 'Crawford',
        type: 'Boat Launch',
        waterBody: 'Pymatuning Reservoir',
        facilities: 'Boat ramp, parking',
        fee: 'State park fee may apply',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-80.3122, 41.6342] },
      properties: {
        name: 'Conneaut Lake — PFBC Access',
        county: 'Crawford',
        type: 'Boat Launch / Bank Fishing',
        waterBody: 'Conneaut Lake',
        facilities: 'Boat ramp, parking, shore access',
        fee: 'Free',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-80.1782, 41.7640] },
      properties: {
        name: 'French Creek Access — Meadville',
        county: 'Crawford',
        type: 'Bank Fishing',
        waterBody: 'French Creek',
        facilities: 'Shore access, parking',
        fee: 'Free',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-80.2010, 41.6980] },
      properties: {
        name: 'Sugar Creek Access',
        county: 'Crawford',
        type: 'Bank Fishing',
        waterBody: 'Sugar Creek',
        facilities: 'Shore access',
        fee: 'Free',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-80.1530, 41.5920] },
      properties: {
        name: 'Cussewago Creek Access',
        county: 'Crawford',
        type: 'Bank Fishing',
        waterBody: 'Cussewago Creek',
        facilities: 'Shore access',
        fee: 'Free',
      },
    },
    // --- WARREN COUNTY ---
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.1450, 41.8490] },
      properties: {
        name: 'Allegheny River Access — Warren City',
        county: 'Warren',
        type: 'Boat Launch / Bank Fishing',
        waterBody: 'Allegheny River',
        facilities: 'Boat ramp, parking, shore access',
        fee: 'Free',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.3820, 41.8340] },
      properties: {
        name: 'Brokenstraw Creek Access — Youngsville',
        county: 'Warren',
        type: 'Bank Fishing',
        waterBody: 'Brokenstraw Creek',
        facilities: 'Shore access, parking',
        fee: 'Free',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.2680, 41.8780] },
      properties: {
        name: 'Allegheny River — Stoneham Access',
        county: 'Warren',
        type: 'Boat Launch',
        waterBody: 'Allegheny River',
        facilities: 'Boat ramp, parking',
        fee: 'Free',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.0490, 41.9320] },
      properties: {
        name: 'Kinzua Dam Tailwater Access',
        county: 'Warren',
        type: 'Bank Fishing / Wading',
        waterBody: 'Allegheny River (below Kinzua Dam)',
        facilities: 'Shore access, parking',
        fee: 'Free — Army Corps land',
      },
    },
  ],
};

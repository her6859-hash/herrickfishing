// PA Fish & Boat Commission — Class A Wild Trout Waters
// Source: PFBC Class A Wild Trout Streams list, February 20, 2026
//
// Definition: Streams that support a population of naturally produced trout of
// sufficient size and abundance to support a long-term and rewarding sport fishery.
// Management: Natural reproduction only — NO STOCKING on these sections.
//
// Filtered to NW Region counties: Erie, Crawford, Warren, Forest, Venango,
// Mercer-Venango, Lawrence.
//
// Coordinates are the LOWER LIMIT (downstream/mouth end) of each classified section.
// % Public = percent of stream section within publicly owned land (SGL, State Forest, State Park).
//
// IMPORTANT: Many waters are on private property. PFBC listing does NOT guarantee
// public access. Always obtain permission to fish on private property.

export const CLASS_A_FISHERY_COLORS = {
  'Brook':            '#0d9488', // teal
  'Brown':            '#b45309', // amber-brown
  'Rainbow':          '#7c3aed', // purple
  'Mixed Brook/Brown':'#0f766e', // dark teal
};

export const classAWildTroutGeoJSON = {
  type: 'FeatureCollection',
  features: [

    // ── ERIE COUNTY ────────────────────────────────────────────────────────
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.819444, 41.949167] },
      properties: {
        id: 'a-erie-1', county: 'Erie', name: 'Alder Run', section: 1,
        fishery: 'Brook', sectionLimits: 'Headwaters to Fenno Road Bridge',
        lengthMi: 1.87, pctPublic: 58,
        note: '58% public land — mostly accessible.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.739400, 41.891000] },
      properties: {
        id: 'a-erie-2', county: 'Erie', name: 'Beaver Run', section: 1,
        fishery: 'Brown', sectionLimits: 'Messenger Road (T-788) bridge to Mouth',
        lengthMi: 4.90, pctPublic: 8,
        note: 'Mostly private — stay in stream bed or obtain permission.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.967900, 41.959810] },
      properties: {
        id: 'a-erie-3', county: 'Erie', name: 'Benson Run', section: 1,
        fishery: 'Brown', sectionLimits: 'Headwaters to Mouth',
        lengthMi: 3.16, pctPublic: 20,
        note: '20% public land.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-80.361563, 42.010470] },
      properties: {
        id: 'a-erie-4', county: 'Erie', name: 'Elk Creek Park Run', section: 1,
        fishery: 'Brown', sectionLimits: 'Headwaters to Mouth',
        lengthMi: 3.59, pctPublic: 4,
        note: 'Near Girard/Elk Creek area. Mostly private.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.684200, 41.919160] },
      properties: {
        id: 'a-erie-5', county: 'Erie', name: 'Spencer Creek', section: 1,
        fishery: 'Brook', sectionLimits: 'Headwaters to Mouth',
        lengthMi: 3.86, pctPublic: 3,
        note: 'Wild brook trout. Almost entirely private — obtain permission.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.978400, 41.927280] },
      properties: {
        id: 'a-erie-6', county: 'Erie', name: 'Trout Run', section: 2,
        fishery: 'Brown', sectionLimits: 'LR 25129 to Mouth',
        lengthMi: 2.40, pctPublic: 0,
        note: 'Entirely private land — obtain permission before fishing.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.815787, 41.896047] },
      properties: {
        id: 'a-erie-7', county: 'Erie', name: 'UNT to South Branch French Creek',
        section: 1,
        fishery: 'Brook', sectionLimits: 'Headwaters to Mouth (RM 6.34)',
        lengthMi: 0.81, pctPublic: 0,
        note: 'Wild brook trout tributary. Private land.',
        _layerType: 'classAWildTrout',
      },
    },

    // ── CRAWFORD COUNTY ────────────────────────────────────────────────────
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-80.010000, 41.536667] },
      properties: {
        id: 'a-craw-1', county: 'Crawford', name: 'Deckard Run', section: 2,
        fishery: 'Brown', sectionLimits: '576 m upstream Gravel Pit Access Road to Mouth',
        lengthMi: 1.95, pctPublic: 0,
        note: 'Private land. Near Meadville area.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.662800, 41.708090] },
      properties: {
        id: 'a-craw-2', county: 'Crawford', name: 'Dolly Run', section: 1,
        fishery: 'Brown', sectionLimits: 'Headwaters to Mouth',
        lengthMi: 2.17, pctPublic: 0,
        note: 'Entirely private.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.852200, 41.603840] },
      properties: {
        id: 'a-craw-3', county: 'Crawford', name: 'East Branch Sugar Creek',
        section: 2,
        fishery: 'Brown', sectionLimits: 'SR 0428 to Mouth',
        lengthMi: 3.60, pctPublic: 0,
        note: 'Entirely private.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.642778, 41.723333] },
      properties: {
        id: 'a-craw-4', county: 'Crawford', name: 'Shirley Run', section: 1,
        fishery: 'Brown', sectionLimits: 'Headwaters to State Route 1032 bridge',
        lengthMi: 2.11, pctPublic: 0,
        note: 'Upper section. Private.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.665100, 41.703100] },
      properties: {
        id: 'a-craw-5', county: 'Crawford', name: 'Shirley Run', section: 2,
        fishery: 'Brown', sectionLimits: 'LR 20120 bridge to SR 89 bridge',
        lengthMi: 2.00, pctPublic: 0,
        note: 'Middle section. Private.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.667500, 41.681944] },
      properties: {
        id: 'a-craw-6', county: 'Crawford', name: 'Shirley Run', section: 3,
        fishery: 'Brown', sectionLimits: 'SR 89 bridge (Cloverdale Corners) to Mouth',
        lengthMi: 1.70, pctPublic: 0,
        note: 'Lower section to mouth. Private.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.679167, 41.671944] },
      properties: {
        id: 'a-craw-7', county: 'Crawford', name: 'Thompson Creek', section: 1,
        fishery: 'Brown', sectionLimits: 'Headwaters to 100 m upstream SR 2031 bridge',
        lengthMi: 3.29, pctPublic: 0,
        note: 'Also in NW region regulated stocked section downstream of this. Private land.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.790300, 41.684670] },
      properties: {
        id: 'a-craw-8', county: 'Crawford', name: 'UNT to Marsh Run', section: 1,
        fishery: 'Brook', sectionLimits: 'Headwaters to Mouth (RM 0.56)',
        lengthMi: 3.04, pctPublic: 0,
        note: 'Wild brook trout. Private.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.639600, 41.618325] },
      properties: {
        id: 'a-craw-9', county: 'Crawford-Venango',
        name: 'UNT to Pine Creek', section: 1,
        fishery: 'Brook', sectionLimits: 'Headwaters to Mouth (RM 1.09)',
        lengthMi: 1.62, pctPublic: 0,
        note: 'Straddles Crawford/Venango county line. Private.',
        _layerType: 'classAWildTrout',
      },
    },

    // ── FOREST COUNTY ──────────────────────────────────────────────────────
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.168056, 41.606944] },
      properties: {
        id: 'a-for-1', county: 'Forest', name: 'Blood Run', section: 1,
        fishery: 'Brook', sectionLimits: 'Headwaters to Mouth',
        lengthMi: 2.40, pctPublic: 94,
        note: '94% public land — excellent public access.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.202782, 41.499722] },
      properties: {
        id: 'a-for-2', county: 'Forest', name: 'Guiton Run', section: 1,
        fishery: 'Brook', sectionLimits: 'Headwaters to Mouth',
        lengthMi: 2.31, pctPublic: 62,
        note: '62% public land.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.171900, 41.598660] },
      properties: {
        id: 'a-for-3', county: 'Forest', name: 'Logan Run', section: 1,
        fishery: 'Brook', sectionLimits: 'Headwaters to Mouth',
        lengthMi: 1.80, pctPublic: 100,
        note: '100% public land — fully accessible.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-78.991269, 41.623004] },
      properties: {
        id: 'a-for-4', county: 'Forest', name: 'Tuttle Run', section: 1,
        fishery: 'Brook', sectionLimits: 'Headwaters to Mouth',
        lengthMi: 0.87, pctPublic: 100,
        note: '100% public land.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.179359, 41.596470] },
      properties: {
        id: 'a-for-5', county: 'Forest', name: 'UNT to Tionesta Creek',
        section: 1,
        fishery: 'Brook', sectionLimits: 'Headwaters to Mouth (RM 25.85)',
        lengthMi: 0.90, pctPublic: 0,
        note: 'Private.',
        _layerType: 'classAWildTrout',
      },
    },

    // ── VENANGO COUNTY ─────────────────────────────────────────────────────
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.913900, 41.354200] },
      properties: {
        id: 'a-ven-1', county: 'Venango', name: 'Bear Run', section: 1,
        fishery: 'Brook', sectionLimits: 'Headwaters to Mouth',
        lengthMi: 0.87, pctPublic: 75,
        note: '75% public land.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.643900, 41.497590] },
      properties: {
        id: 'a-ven-2', county: 'Venango', name: 'Cherry Run', section: 1,
        fishery: 'Brown', sectionLimits: 'T-599 to SR 227 bridge at Plumer',
        lengthMi: 3.10, pctPublic: 0,
        note: 'Private — obtain permission.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.647117, 41.572388] },
      properties: {
        id: 'a-ven-3', county: 'Venango', name: 'Husband Run', section: 1,
        fishery: 'Brook', sectionLimits: 'Headwaters to Mouth',
        lengthMi: 1.88, pctPublic: 56,
        note: '56% public land.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.655968, 41.435692] },
      properties: {
        id: 'a-ven-4', county: 'Venango', name: 'Lamb Run', section: 1,
        fishery: 'Brook', sectionLimits: 'Headwaters to Mouth',
        lengthMi: 1.96, pctPublic: 0,
        note: 'Private.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.551400, 41.427430] },
      properties: {
        id: 'a-ven-5', county: 'Venango', name: 'Porcupine Creek', section: 1,
        fishery: 'Brook', sectionLimits: 'Headwaters to 1,700 m upstream Mouth',
        lengthMi: 3.97, pctPublic: 0,
        note: 'Upper section. Private.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.544800, 41.440070] },
      properties: {
        id: 'a-ven-6', county: 'Venango', name: 'Porcupine Creek', section: 2,
        fishery: 'Rainbow', sectionLimits: '1,700 m upstream Mouth to Mouth',
        lengthMi: 1.06, pctPublic: 0,
        note: 'Wild rainbow trout lower section. Private.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.516500, 41.379600] },
      properties: {
        id: 'a-ven-7', county: 'Venango', name: 'Reese Run', section: 1,
        fishery: 'Rainbow', sectionLimits: 'Headwaters to Mouth',
        lengthMi: 3.60, pctPublic: 0,
        note: 'Wild rainbow. Private.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.836400, 41.326660] },
      properties: {
        id: 'a-ven-8', county: 'Venango', name: 'Snyder Run', section: 1,
        fishery: 'Brook', sectionLimits: 'Headwaters to Mouth',
        lengthMi: 1.62, pctPublic: 0,
        note: 'Private.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.829710, 41.261270] },
      properties: {
        id: 'a-ven-9', county: 'Venango',
        name: 'UNT to Allegheny River', section: 1,
        fishery: 'Brook', sectionLimits: 'Headwaters to Mouth (RM 107.57)',
        lengthMi: 1.61, pctPublic: 0,
        note: 'Private.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.927282, 41.417953] },
      properties: {
        id: 'a-ven-10', county: 'Venango',
        name: 'UNT to French Creek', section: 1,
        fishery: 'Brook', sectionLimits: 'Headwaters to Mouth (RM 7.75)',
        lengthMi: 1.47, pctPublic: 0,
        note: 'Private.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.754220, 41.499377] },
      properties: {
        id: 'a-ven-11', county: 'Venango',
        name: 'UNT to Twomile Run', section: 1,
        fishery: 'Brook', sectionLimits: 'Headwaters to Mouth (RM 8.28)',
        lengthMi: 0.65, pctPublic: 2,
        note: 'Nearly private.',
        _layerType: 'classAWildTrout',
      },
    },

    // ── MERCER-VENANGO ─────────────────────────────────────────────────────
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.988056, 41.382778] },
      properties: {
        id: 'a-mv-1', county: 'Mercer-Venango', name: 'Little Sandy Creek',
        section: 1,
        fishery: 'Brown',
        sectionLimits: 'Headwaters to 400 m upstream bridge on Bombishi Road (T-304)',
        lengthMi: 4.23, pctPublic: 0,
        note: 'Class A upper section. Below this point is PFBC-regulated stocked section + C&R fly-only. Private.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.985984, 41.379858] },
      properties: {
        id: 'a-mv-2', county: 'Mercer-Venango',
        name: 'UNT to Little Sandy Creek', section: 1,
        fishery: 'Brown', sectionLimits: 'Headwaters to Mouth (RM 5.64)',
        lengthMi: 3.21, pctPublic: 0,
        note: 'Private.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.998035, 41.386813] },
      properties: {
        id: 'a-mv-3', county: 'Mercer-Venango',
        name: 'UNT to Little Sandy Creek', section: 1,
        fishery: 'Mixed Brook/Brown', sectionLimits: 'Headwaters to Mouth (RM 6.70)',
        lengthMi: 1.57, pctPublic: 0,
        note: 'Private.',
        _layerType: 'classAWildTrout',
      },
    },

    // ── WARREN COUNTY ──────────────────────────────────────────────────────
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-78.997700, 41.836980] },
      properties: {
        id: 'a-war-1', county: 'Warren', name: 'Bent Run', section: 1,
        fishery: 'Brook', sectionLimits: 'Headwaters to Mouth',
        lengthMi: 1.26, pctPublic: 90,
        note: '90% public land — excellent access. Allegheny National Forest area.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.228600, 41.750350] },
      properties: {
        id: 'a-war-2', county: 'Warren', name: 'Mix Run', section: 1,
        fishery: 'Brook', sectionLimits: 'Headwaters to Mouth',
        lengthMi: 1.14, pctPublic: 100,
        note: '100% public land — fully accessible.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.086670, 41.793056] },
      properties: {
        id: 'a-war-3', county: 'Warren', name: 'Possum Run', section: 1,
        fishery: 'Mixed Brook/Brown', sectionLimits: 'Headwaters to Mouth',
        lengthMi: 2.42, pctPublic: 0,
        note: 'Private.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-78.984141, 41.712324] },
      properties: {
        id: 'a-war-4', county: 'Warren', name: 'Roystone Run', section: 1,
        fishery: 'Brook', sectionLimits: 'Headwaters to Mouth',
        lengthMi: 1.17, pctPublic: 100,
        note: '100% public land — fully accessible. ANF area.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.514900, 41.863190] },
      properties: {
        id: 'a-war-5', county: 'Warren', name: 'Spring Creek', section: 3,
        fishery: 'Brown', sectionLimits: 'SR 3001 bridge to Mouth',
        lengthMi: 2.58, pctPublic: 0,
        note: 'Lower section. Private. Also a PFBC regulated stocked section above this.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.557800, 41.853873] },
      properties: {
        id: 'a-war-6', county: 'Warren',
        name: 'UNT to Spring Creek', section: 1,
        fishery: 'Brook', sectionLimits: 'Headwaters to Mouth (RM 2.77)',
        lengthMi: 1.09, pctPublic: 0,
        note: 'Private.',
        _layerType: 'classAWildTrout',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-79.571400, 41.693510] },
      properties: {
        id: 'a-war-7', county: 'Warren', name: 'West Branch Caldwell Creek',
        section: 3,
        fishery: 'Brown',
        sectionLimits: 'Three Bridge Run to West Branch bridge on Flat Road',
        lengthMi: 2.76, pctPublic: 0,
        note: 'Note: the C&R artificial lures only section (2.75 mi) overlaps this reach. Private land but regulated.',
        _layerType: 'classAWildTrout',
      },
    },

    // ── LAWRENCE COUNTY ────────────────────────────────────────────────────
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-80.215100, 40.915610] },
      properties: {
        id: 'a-law-1', county: 'Lawrence', name: 'Hell Run', section: 2,
        fishery: 'Brown', sectionLimits: 'T-395 bridge to Mouth',
        lengthMi: 1.86, pctPublic: 96,
        note: '96% public land — excellent access.',
        _layerType: 'classAWildTrout',
      },
    },
  ],
};

// Flat array for easy lookup / regulation panel use
export const classAWildTroutList = classAWildTroutGeoJSON.features.map(f => f.properties);

// Counties represented in this filtered dataset
export const CLASS_A_COUNTIES = ['Erie', 'Crawford', 'Crawford-Venango', 'Forest', 'Venango', 'Mercer-Venango', 'Warren', 'Lawrence'];

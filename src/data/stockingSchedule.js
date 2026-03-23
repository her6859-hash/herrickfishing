// PFBC 2026 Stocking Schedule — Erie / Crawford / Warren / adjacent counties
// Data transcribed from official PFBC stocking results pages.
// Each reach has: name, section, coordinates (upper & lower limit),
// regulation zone, meeting place, hatchery, and all stocking events.
// If upper === lower the water is a pond/lake — rendered as a point marker.
// Stream reaches are rendered as a line from upper → lower with a midpoint marker.

export const SPECIES_COLORS = {
  Brown:    '#92400e',   // amber-brown
  Rainbow:  '#0369a1',   // sky blue
  Steelhead:'#7e22ce',   // purple (treated as Rainbow/steelhead)
  Golden:   '#ca8a04',   // yellow-gold
};

// Helper — midpoint between two [lat,lng] pairs
function mid(a, b) {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

// stockingEvents: [{ date, species: ['Brown','Rainbow',...] }]
const RAW_REACHES = [
  // ── PRESQUE ISLE / ERIE CITY area ponds ───────────────────────────────────
  {
    name: 'West Basin Pond',
    section: 0,
    regulation: 'Stocked Trout Waters',
    meetingPlace: 'Niagara Boat Launch Parking Lot',
    hatchery: 'Corry',
    upper: { lat: 42.14780000, lng: -80.13306000, desc: '' },
    lower: { lat: 42.14780000, lng: -80.13306000, desc: '' },
    stockingEvents: [
      { date: '2026-03-12', species: ['Brown'] },
      { date: '2026-04-07', species: ['Brown'] },
      { date: '2026-12-14', species: ['Brown'] },
    ],
  },
  {
    name: 'East Basin Pond',
    section: 0,
    regulation: 'Stocked Trout Waters',
    meetingPlace: 'Niagara Boat Launch Parking Lot',
    hatchery: 'Corry',
    upper: { lat: 42.14940000, lng: -80.13190000, desc: '' },
    lower: { lat: 42.14940000, lng: -80.13190000, desc: '' },
    stockingEvents: [
      { date: '2026-03-12', species: ['Brown'] },
      { date: '2026-04-07', species: ['Brown'] },
      { date: '2026-12-14', species: ['Brown'] },
    ],
  },
  {
    name: 'Upper Gravel Pit',
    section: 0,
    regulation: 'Stocked Trout Waters',
    meetingPlace: 'Upper Gravel Pit / Niagara Boat Launch Parking Lot',
    hatchery: 'Corry',
    upper: { lat: 42.03072000, lng: -80.28022000, desc: '' },
    lower: { lat: 42.03072000, lng: -80.28022000, desc: '' },
    stockingEvents: [
      { date: '2026-02-18', species: ['Brown'] },
      { date: '2026-04-07', species: ['Brown'] },
      { date: '2026-12-14', species: ['Brown'] },
    ],
  },

  // ── LAKE PLEASANT (Warren County) ────────────────────────────────────────
  {
    name: 'Lake Pleasant',
    section: 0,
    regulation: 'Miscellaneous Special Regulations',
    meetingPlace: 'Lake Pleasant-SR8',
    hatchery: 'Corry',
    upper: { lat: 42.00418999, lng: -79.89780000, desc: '' },
    lower: { lat: 42.00418999, lng: -79.89780000, desc: '' },
    stockingEvents: [
      { date: '2026-02-20', species: ['Rainbow', 'Golden'] },
      { date: '2026-04-23', species: ['Rainbow'] },
      { date: '2026-12-15', species: ['Rainbow'] },
    ],
  },

  // ── FRENCH CREEK ─────────────────────────────────────────────────────────
  {
    name: 'French Creek',
    section: 1,
    regulation: 'Stocked Trout Water',
    meetingPlace: 'SR 8 & SR 89',
    hatchery: 'Corry',
    upper: { lat: 42.01982352, lng: -79.76210794, desc: 'PA NY LINE' },
    lower: { lat: 41.99937925, lng: -79.81194550, desc: 'CONFL W BR' },
    stockingEvents: [
      { date: '2026-03-02', species: ['Brown', 'Rainbow', 'Golden'] },
    ],
  },
  {
    name: 'South Branch French Creek',
    section: 2,
    regulation: 'Stocked Trout Water',
    meetingPlace: 'Corry State Fish Hatchery-SR6',
    hatchery: 'Corry',
    upper: { lat: 41.91662900, lng: -79.65963000, desc: 'BRIDGE ON SR2018 CORRY LIMITS' },
    lower: { lat: 41.90301000, lng: -79.90212000, desc: 'MOUTH' },
    stockingEvents: [
      { date: '2026-03-16', species: ['Brown', 'Rainbow', 'Golden'] },
      { date: '2026-04-10', species: ['Brown', 'Rainbow'] },
    ],
  },

  // ── CONNEAUTTEE CREEK (Crawford County) ──────────────────────────────────
  {
    name: 'Conneauttee Creek',
    section: 1,
    regulation: 'Stocked Trout Water',
    meetingPlace: 'Edinboro Municipal Building Back Lower Parking Lot',
    hatchery: 'Corry',
    upper: { lat: 41.87319000, lng: -80.13286900, desc: 'DAM AT OUTFLOW OF EDINBORO LAKE' },
    lower: { lat: 41.87070999, lng: -80.13165999, desc: 'NORMAL ST BRIDGE' },
    stockingEvents: [
      { date: '2026-04-02', species: ['Brown'] },
    ],
  },
  {
    name: 'Conneauttee Creek',
    section: 2,
    regulation: 'Stocked Trout Water',
    meetingPlace: 'Edinboro Municipal Building Back Lower Parking Lot',
    hatchery: 'Corry',
    upper: { lat: 41.87054900, lng: -80.13150900, desc: 'NORMAL ST BRIDGE' },
    lower: { lat: 41.85700000, lng: -80.12087000, desc: 'ROUTE 99' },
    stockingEvents: [
      { date: '2026-04-02', species: ['Brown', 'Rainbow'] },
      { date: '2026-04-21', species: ['Rainbow'] },
    ],
  },

  // ── ELK CREEK (Erie County) ───────────────────────────────────────────────
  {
    name: 'Elk Creek',
    section: 2,
    regulation: 'Lake Erie, Presque Isle Bay, and Tribs',
    meetingPlace: 'St. Francis-Xavier church parking lot — RT99 McKean',
    hatchery: 'Corry',
    upper: { lat: 41.99785158, lng: -80.16357746, desc: '200m UPSTREAM OF I-79 (NB) BRIDGE' },
    lower: { lat: 41.98114246, lng: -80.23746898, desc: '500m DOWNSTREAM OF SR 98 BRIDGE' },
    stockingEvents: [
      { date: '2026-04-03', species: ['Brown'] },
      { date: '2026-04-13', species: ['Brown'] },
    ],
  },
  {
    name: 'Elk Creek',
    section: 4,
    regulation: 'Lake Erie, Presque Isle Bay, and Tribs',
    meetingPlace: 'St. Francis-Xavier church parking lot — RT99 McKean',
    hatchery: 'Corry',
    upper: { lat: 41.99390199, lng: -80.31727999, desc: '500m UPSTREAM OF HALLS RUN' },
    lower: { lat: 42.02493999, lng: -80.37096999, desc: 'MOUTH AT LAKE ERIE' },
    stockingEvents: [
      { date: '2026-04-03', species: ['Brown'] },
      { date: '2026-04-13', species: ['Brown'] },
    ],
  },

  // ── TWENTYMILE CREEK (Erie County) ───────────────────────────────────────
  {
    name: 'Twentymile Creek',
    section: 2,
    regulation: 'Lake Erie, Presque Isle Bay, and Tribs',
    meetingPlace: 'Northeast Conservation Park, 12146 East Lake Rd, Northeast PA',
    hatchery: 'Corry',
    upper: { lat: 42.23746000, lng: -79.77152000, desc: 'SR 20 BRIDGE' },
    lower: { lat: 42.25443000, lng: -79.77644999, desc: 'DOHLER PROPERTY LINE' },
    stockingEvents: [
      { date: '2026-04-03', species: ['Brown'] },
      { date: '2026-04-14', species: ['Brown'] },
    ],
  },

  // ── CASCADE CREEK (Erie County — Presque Isle Bay tributary) ─────────────
  {
    name: 'Cascade Creek',
    section: 2,
    regulation: 'Lake Erie, Presque Isle Bay, and Tribs',
    meetingPlace: 'St. Francis-Xavier church parking lot — RT99 McKean / Niagara Boat Launch Parking Lot',
    hatchery: 'Corry',
    upper: { lat: 42.12500000, lng: -80.11082900, desc: '12TH ST BRIDGE' },
    lower: { lat: 42.12675999, lng: -80.11319999, desc: 'MOUTH AT PRESQUE ISLE BAY' },
    stockingEvents: [
      { date: '2026-04-03', species: ['Brown'] },
      { date: '2026-04-07', species: ['Brown'] },
    ],
  },

  // ── CROOKED CREEK (Erie County) ───────────────────────────────────────────
  {
    name: 'Crooked Creek',
    section: 2,
    regulation: 'Lake Erie, Presque Isle Bay, and Tribs',
    meetingPlace: 'St. Francis-Xavier church parking lot — RT99 McKean',
    hatchery: 'Corry',
    upper: { lat: 41.94469899, lng: -80.36826114, desc: 'GLOSKEY RD BRIDGE (T360)' },
    lower: { lat: 41.99553603, lng: -80.42068557, desc: 'RR BRIDGE NORTH OF SR 5' },
    stockingEvents: [
      { date: '2026-04-03', species: ['Brown'] },
      { date: '2026-04-13', species: ['Brown'] },
    ],
  },
];

// Build a GeoJSON FeatureCollection from the raw reaches
// Points (ponds/lakes): geometry = Point at the single coordinate
// Stream reaches: geometry = LineString from upper → lower
export const stockingGeoJSON = {
  type: 'FeatureCollection',
  features: RAW_REACHES.map((reach) => {
    const isPoint =
      reach.upper.lat === reach.lower.lat && reach.upper.lng === reach.lower.lng;

    const allSpecies = [...new Set(reach.stockingEvents.flatMap((e) => e.species))];
    const primarySpecies = allSpecies[0] || 'Brown';

    const sortedEvents = [...reach.stockingEvents].sort((a, b) =>
      a.date.localeCompare(b.date)
    );

    const geometry = isPoint
      ? { type: 'Point', coordinates: [reach.upper.lng, reach.upper.lat] }
      : {
          type: 'LineString',
          coordinates: [
            [reach.upper.lng, reach.upper.lat],
            [reach.lower.lng, reach.lower.lat],
          ],
        };

    const midpoint = isPoint
      ? [reach.upper.lat, reach.upper.lng]
      : mid(
          [reach.upper.lat, reach.upper.lng],
          [reach.lower.lat, reach.lower.lng]
        );

    return {
      type: 'Feature',
      geometry,
      properties: {
        name: reach.name,
        section: reach.section,
        regulation: reach.regulation,
        meetingPlace: reach.meetingPlace,
        hatchery: reach.hatchery,
        upperDesc: reach.upper.desc,
        lowerDesc: reach.lower.desc,
        stockingEvents: sortedEvents,
        allSpecies,
        primarySpecies,
        isPoint,
        midLat: midpoint[0],
        midLng: midpoint[1],
        _layerType: 'stocking_reach',
      },
    };
  }),
};

// All unique species found across the dataset
export const ALL_STOCKING_SPECIES = ['Brown', 'Rainbow', 'Golden', 'Steelhead'];

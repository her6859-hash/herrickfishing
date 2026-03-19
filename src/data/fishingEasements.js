// PFBC Public Fishing Easements — Erie, Crawford, Warren Counties PA
// These are stream segments where the PA Fish & Boat Commission has purchased
// or secured public fishing access rights (separate from stocked trout designation).
// Sources: PFBC press releases, PASDA, fishandboat.com
// Coordinates are approximate centerlines based on known geography.

export const fishingEasementsGeoJSON = {
  type: 'FeatureCollection',
  features: [
    // --- ERIE COUNTY ---

    // Walnut Creek — PFBC public fishing easement south of Manchester Road (US Rte 20)
    // Millcreek Township. Manchester Rd crosses Walnut Creek at ~42.080°N.
    // PFBC has secured riparian easements on the south (upstream) section.
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [-80.1860, 42.0795], // Manchester Rd (US Rte 20) crossing
          [-80.1865, 42.0720],
          [-80.1870, 42.0655],
          [-80.1880, 42.0580],
          [-80.1890, 42.0510],
          [-80.1900, 42.0435], // ~1.5 miles of public easement south of Rte 20
        ],
      },
      properties: {
        name: 'Walnut Creek — Public Fishing Easement (South of Manchester Rd)',
        county: 'Erie',
        township: 'Millcreek Township',
        waterway: 'Walnut Creek',
        accessType: 'PFBC Fishing Easement',
        description:
          'PFBC-secured public fishing access on Walnut Creek upstream (south) of Manchester Road (US Rte 20). Steelhead and stocked trout. Lake Erie Permit required.',
        permitRequired: 'Lake Erie Permit ($9.97)',
        targetSpecies: 'Steelhead (rainbow trout), stocked brown trout',
        pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
      },
    },

    // Walnut Creek — Lower public section (mouth to Manchester Rd, PFBC access area)
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [-80.2320, 42.1195], // PFBC access area / mouth at Lake Erie
          [-80.2265, 42.1110],
          [-80.2200, 42.1030],
          [-80.2120, 42.0960],
          [-80.2020, 42.0890],
          [-80.1940, 42.0820],
          [-80.1860, 42.0795], // Manchester Rd crossing
        ],
      },
      properties: {
        name: 'Walnut Creek — Lower Public Section (Mouth to Manchester Rd)',
        county: 'Erie',
        township: 'Millcreek Township',
        waterway: 'Walnut Creek',
        accessType: 'PFBC Access Area / Public Fishing',
        description:
          'Public fishing from the PFBC Walnut Creek Access Area at the mouth on Lake Erie upstream to Manchester Road. Premier steelhead (rainbow trout) fishery. 6 boat ramps, parking, fish-cleaning station.',
        permitRequired: 'Lake Erie Permit ($9.97)',
        targetSpecies: 'Steelhead (rainbow trout), bass, catfish, panfish',
        pfbcLink: 'https://www.pa.gov/agencies/fishandboat/boating/where-to-boat/walnut-creek-marina',
      },
    },

    // Twenty Mile Creek — PFBC acquired ~9,000 linear feet in North East Township (2024/2025)
    // PFBC's largest public fishing easement acquisition in Erie County.
    // Parking at North East Township Community Conservation Park.
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [-79.8350, 42.2050], // Upper extent of easement
          [-79.8340, 42.1960],
          [-79.8320, 42.1880],
          [-79.8300, 42.1800],
          [-79.8280, 42.1720], // ~9,000 linear feet (~1.7 miles)
        ],
      },
      properties: {
        name: 'Twenty Mile Creek — PFBC Public Fishing Easement',
        county: 'Erie',
        township: 'North East Township',
        waterway: 'Twenty Mile Creek',
        accessType: 'PFBC Fishing Easement',
        description:
          "Nearly 9,000 linear feet of PFBC public fishing easement — the commission's largest acquisition in Erie County. Parking available at North East Township Community Conservation Park.",
        permitRequired: 'Lake Erie Permit ($9.97)',
        targetSpecies: 'Steelhead (rainbow trout), bass',
        pfbcLink: 'https://www.pa.gov/agencies/fishandboat/newsroom/pfbc-announces-significant-addition-of-public-fishing-access-on-twentymile-creek-in-erie-county',
      },
    },

    // Elk Creek — PFBC 8-acre public access area, Girard Township
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [-80.3150, 42.0000], // Upper access boundary
          [-80.3140, 41.9940],
          [-80.3130, 41.9870],
          [-80.3120, 41.9800],
        ],
      },
      properties: {
        name: 'Elk Creek — PFBC Public Access',
        county: 'Erie',
        township: 'Girard Township',
        waterway: 'Elk Creek',
        accessType: 'PFBC Fishing Easement',
        description:
          '8-acre PFBC public access area off Elk Park Road, Girard Township. One of the top steelhead streams in PA. Lake Erie Permit required.',
        permitRequired: 'Lake Erie Permit ($9.97)',
        targetSpecies: 'Steelhead (rainbow trout), stocked brown trout',
        pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
      },
    },

    // --- CRAWFORD COUNTY ---

    // Conneaut Creek — Spring Township easement (3,960 linear feet)
    // Off Fisher Road and South Creek Road, north of Conneautville
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [-80.3680, 41.7620], // Fisher Rd / South Creek Rd area
          [-80.3670, 41.7560],
          [-80.3660, 41.7500],
          [-80.3650, 41.7450], // ~3,960 linear feet
        ],
      },
      properties: {
        name: 'Conneaut Creek — Spring Township Public Easement',
        county: 'Crawford',
        township: 'Spring Township',
        waterway: 'Conneaut Creek',
        accessType: 'PFBC Fishing Easement',
        description:
          '3,960 linear feet of PFBC public fishing easement in Spring Township, off Fisher Road and South Creek Road, north of Conneautville. Steelhead run extends south to Dicksonburg.',
        permitRequired: 'Lake Erie Permit ($9.97)',
        targetSpecies: 'Steelhead (rainbow trout), stocked brown trout (Section 2)',
        pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
      },
    },
  ],
};

// 2026 PA Fish & Boat Commission Fishing Regulations
// Source: https://www.pa.gov/agencies/fishandboat/fishing/regulations
// Data current as of March 2026

export const generalInfo = {
  licenseRequired: 'All persons 16 years of age and older must have a valid PA fishing license.',
  licenseNote:
    'Licenses must be in possession while fishing. Special rates available for seniors, disabled veterans, and disabled persons.',
  keyDates: {
    licenseValidDates: 'December 1, 2025 – December 31, 2026',
    mentoredYouthTroutDay: 'March 28, 2026 (youth with licensed adult mentor)',
    troutSeasonOpens: 'April 4, 2026',
    bassNoHarvestBegins: 'April 11, 2026 (immediate release required)',
    walleyeSaugerSeasonOpens: 'May 2, 2026 (first Saturday in May)',
    bassNoHarvestEnds: 'June 12, 2026',
    troutExtendedSeasonOpens: 'Day after Labor Day 2026 (reduced limits)',
    troutExtendedSeasonEnds: 'February 15, 2027',
  },
  troutStocking:
    '3.2 million adult trout stocked statewide in 684 streams and 130 lakes for 2026.',
  pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
  purchaseLicenseUrl: 'https://huntfish.pa.gov',
};

export const licenseInfo = {
  residentAnnual: { label: 'PA Resident Annual', fee: '$22.97' },
  nonResidentAnnual: { label: 'Non-Resident Annual', fee: '$52.97' },
  nonResidentStudent: { label: 'Non-Resident In-State Student', fee: '$27.97' },
  seniorLifetime: { label: 'Senior Lifetime (65+)', fee: '$5.00 one-time' },
  troutStampResident: { label: 'Trout/Salmon Permit (Resident)', fee: '$9.97' },
  troutStampNonResident: { label: 'Trout/Salmon Permit (Non-Resident)', fee: '$19.97' },
  lakeEriePermit: {
    label: 'Lake Erie Permit',
    fee: '$9.97',
    note: 'Required for all fishing in Lake Erie, Presque Isle Bay, and all Lake Erie tributaries',
  },
  combinationTroutLakeErie: {
    label: 'Combination Trout/Salmon + Lake Erie Permit',
    fee: '$16.97',
  },
  purchaseUrl: 'https://huntfish.pa.gov',
};

// minSize in inches, null = no minimum
// dailyLimit: null = no limit
export const speciesRegulations = [
  {
    species: 'Trout (All Species Combined)',
    includes: 'Brook, Brown, Rainbow, Tiger, Lake, Golden Rainbow',
    minSize: 7,
    dailyLimit: 5,
    season: 'Apr 4 – Labor Day (regular, 5/day); after Labor Day – Feb 15 (extended, 3/day)',
    notes:
      'Trout/Salmon Permit required in addition to base license. Class A wild trout streams: catch-and-release only, artificial lures only on many. Check PFBC for designated waters.',
  },
  {
    species: 'Bass (Largemouth)',
    minSize: 12,
    dailyLimit: 6,
    season: 'Year-round (no-harvest Apr 11 – Jun 12)',
    notes:
      'Must immediately release during no-harvest period. Big Bass Program waters have 15"–20" minimums.',
  },
  {
    species: 'Bass (Smallmouth)',
    minSize: 12,
    dailyLimit: 6,
    season: 'Year-round (no-harvest Apr 11 – Jun 12)',
    notes: 'Same no-harvest rules as largemouth.',
  },
  {
    species: 'Walleye & Sauger',
    minSize: 15,
    dailyLimit: 6,
    season: 'Jan 1 – Mar 14; May 2 – Dec 31',
    notes:
      'Lake Erie walleye has interstate Total Allowable Catch (TAC) limits announced annually by March 1.',
  },
  {
    species: 'Walleye (Lake Erie)',
    minSize: 15,
    dailyLimit: 6,
    season: 'Jan 1 – Mar 14; May 2 – Dec 31 (check current TAC announcement)',
    notes:
      'Erie County only. Lake Erie Permit required. Interstate regulations — verify annually at fishandboat.com.',
  },
  {
    species: 'Muskellunge',
    minSize: 36,
    dailyLimit: 1,
    season: 'Year-round (standard waters)',
    notes:
      '45" minimum on Muskie Enhancement Program waters. Only 1 muskie may be possessed at a time. Tiger muskellunge: 30" min.',
  },
  {
    species: 'Northern Pike',
    minSize: 24,
    dailyLimit: 5,
    season: 'Year-round',
    notes: 'Lake Erie has separate interstate regulations.',
  },
  {
    species: 'Yellow Perch',
    minSize: null,
    dailyLimit: 50,
    season: 'Year-round',
    notes:
      'Lake Erie has separate limits (check PFBC). Panfish Enhancement Program waters may have 7"–8" minimum.',
  },
  {
    species: 'Chain Pickerel',
    minSize: null,
    dailyLimit: 20,
    season: 'Year-round',
    notes: '',
  },
  {
    species: 'Bluegill / Sunfish',
    minSize: null,
    dailyLimit: 50,
    season: 'Year-round',
    notes: 'Combined 50-fish limit for all sunfish. Panfish Enhancement Program may set 7"–8" min.',
  },
  {
    species: 'Crappie (Black & White)',
    minSize: null,
    dailyLimit: 50,
    season: 'Year-round',
    notes: 'Combined panfish limit of 50 applies.',
  },
  {
    species: 'Channel Catfish',
    minSize: null,
    dailyLimit: 15,
    season: 'Year-round',
    notes: '',
  },
  {
    species: 'Carp',
    minSize: null,
    dailyLimit: null,
    season: 'Year-round',
    notes: 'No size or creel limit. Bow fishing permitted in some areas.',
  },
];

// Notable public waterways in Erie, Warren, Crawford Counties
export const specialWaterways = [
  {
    name: 'Lake Erie (PA Waters)',
    county: 'Erie',
    type: 'lake',
    rules: {
      walleye: '15" min, 6/day (Jan 1–Mar 14 & May 2–Dec 31)',
      bass: '12" min, 6/day',
      perch: 'No minimum, 50/day',
      pike: '24" min, 5/day',
      trout: 'Trout/Salmon + Lake Erie Permit both required',
    },
    notes:
      'Pennsylvania portion of Lake Erie. Interstate TAC regulations. Lake Erie Permit required. Check PFBC annually for TAC announcements.',
    pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
    permitRequired: 'Lake Erie Permit ($9.97)',
  },
  {
    name: 'Presque Isle Bay',
    county: 'Erie',
    type: 'bay',
    rules: {
      walleye: '15" min, 6/day (Lake Erie regs apply)',
      bass: '12" min, 6/day',
      trout: 'Standard trout regs + Lake Erie Permit required',
      perch: '50/day',
    },
    notes:
      'Within Presque Isle State Park. Lake Erie Permit required. Excellent perch fishing.',
    pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
    permitRequired: 'Lake Erie Permit ($9.97)',
  },
  {
    name: 'Conneaut Creek',
    county: 'Erie',
    type: 'stream',
    rules: {
      steelhead: 'Rainbow trout regs — 7" min, 5/day (regular), 3/day (extended)',
      bass: '12" min, 6/day',
    },
    notes:
      'Premier Lake Erie tributary. Steelhead (rainbow trout) runs October–April. Lake Erie Permit required in tributary.',
    pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
    permitRequired: 'Lake Erie Permit ($9.97)',
  },
  {
    name: 'Elk Creek',
    county: 'Erie',
    type: 'stream',
    rules: {
      steelhead: 'Rainbow trout regs — 7" min, 5/day (regular), 3/day (extended)',
      bass: '12" min, 6/day',
    },
    notes:
      'Premier steelhead stream — one of the best in PA. Lake Erie Permit required. Run peaks November–January.',
    pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
    permitRequired: 'Lake Erie Permit ($9.97)',
  },
  {
    name: 'Walnut Creek',
    county: 'Erie',
    type: 'stream',
    rules: {
      steelhead: 'Rainbow trout regs — 7" min, 5/day (regular), 3/day (extended)',
      trout: '7" min, stocked sections Apr 4',
    },
    notes:
      'Lake Erie tributary. PFBC has public fishing easements both below AND south of Manchester Road (US Rte 20) in Millcreek Township. PFBC access area with 6 boat ramps at the mouth. Lake Erie Permit required throughout.',
    pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
    permitRequired: 'Lake Erie Permit ($9.97)',
  },
  {
    name: 'Twenty Mile Creek',
    county: 'Erie',
    type: 'stream',
    rules: {
      steelhead: 'Rainbow trout regs — 7" min, 5/day (regular), 3/day (extended)',
      bass: '12" min, 6/day',
    },
    notes:
      "PFBC's largest public fishing easement acquisition in Erie County — nearly 9,000 linear feet in North East Township. Parking at North East Township Community Conservation Park. Lake Erie Permit required.",
    pfbcLink:
      'https://www.pa.gov/agencies/fishandboat/newsroom/pfbc-announces-significant-addition-of-public-fishing-access-on-twentymile-creek-in-erie-county',
    permitRequired: 'Lake Erie Permit ($9.97)',
  },
  {
    name: 'French Creek',
    county: 'Crawford / Erie',
    type: 'stream',
    rules: {
      trout: '7" min, 5/day — stocked, opens Apr 4',
      bass: '12" min, 6/day (no-harvest Apr 11–Jun 12)',
      muskie: '36" min, 1/day (lower sections)',
      walleye: '15" min, 6/day',
    },
    notes:
      'One of the most biologically diverse streams in PA. Warmwater fishery with excellent smallmouth bass. Special designated sections may have additional rules.',
    pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
  },
  {
    name: 'Pymatuning Reservoir (PA Side)',
    county: 'Crawford',
    type: 'lake',
    rules: {
      walleye: '15" min, 6/day',
      muskie: '36" min, 1/day',
      bass: '12" min, 6/day (no-harvest Apr 11–Jun 12)',
      pike: '24" min, 5/day',
      perch: '50/day',
    },
    notes:
      'PA laws apply on PA side. Shared border with Ohio. One of the best walleye fisheries in the state. Stocked with walleye, muskellunge, and bass.',
    pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
  },
  {
    name: 'Conneaut Lake',
    county: 'Crawford',
    type: 'lake',
    rules: {
      bass: '12" min, 6/day (no-harvest Apr 11–Jun 12)',
      pike: '24" min, 5/day',
      walleye: '15" min, 6/day',
      trout: '7" min, 5/day (if stocked)',
    },
    notes: "Pennsylvania's largest natural lake. Several PFBC public access areas.",
    pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
  },
  {
    name: 'Allegheny River (Warren Co.)',
    county: 'Warren',
    type: 'river',
    rules: {
      walleye: '15" min, 6/day (May 2 – Dec 31)',
      muskie: '36" min, 1/day',
      bass: '12" min, 6/day (no-harvest Apr 11–Jun 12)',
      trout: '7" min, 5/day (stocked sections, opens Apr 4)',
    },
    notes:
      'Excellent muskie, walleye, and smallmouth bass fishery. Tailwater below Kinzua Dam offers year-round trout fishing.',
    pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
  },
  {
    name: 'Brokenstraw Creek',
    county: 'Warren',
    type: 'stream',
    rules: {
      trout: '7" min, 5/day — stocked (preseason and in-season)',
      bass: '12" min, 6/day',
    },
    notes:
      'Tributary of the Allegheny River. 4.64 miles stocked from Davey Hill Road bridge downstream to Matthews Run.',
    pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
  },
  {
    name: 'Sugar Creek',
    county: 'Crawford',
    type: 'stream',
    rules: {
      trout: '7" min, 5/day — stocked',
      bass: '12" min, 6/day',
    },
    notes: 'Tributary of French Creek. Stocked trout water.',
    pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
  },
  {
    name: 'Cussewago Creek',
    county: 'Crawford',
    type: 'stream',
    rules: {
      trout: '7" min, 5/day — stocked',
      bass: '12" min, 6/day',
    },
    notes: 'Flows into French Creek. Stocked with trout annually.',
    pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
  },
  {
    name: 'Edinboro Lake',
    county: 'Erie',
    type: 'lake',
    rules: {
      bass: '12" min, 6/day',
      pike: '24" min, 5/day',
      trout: '7" min, 5/day (if stocked)',
    },
    notes: 'Public access available. Good bass and pike fishing.',
    pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
  },
];

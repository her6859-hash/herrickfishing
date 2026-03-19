// 2026 PA Fish & Boat Commission Fishing Regulations
// Source: https://www.pa.gov/agencies/fishandboat/fishing/regulations
// Last updated: March 2026

export const generalInfo = {
  licenseRequired: 'All persons 16 years of age and older must have a valid PA fishing license.',
  licenseNote: 'Special licenses available: senior, disabled veteran, disabled person rates.',
  keyDates: {
    licenseYearStart: 'January 1, 2026',
    youthMentoredTroutDay: 'March 28, 2026',
    troutSeasonOpen: 'April 4, 2026',
    troutSeasonClose: 'February 28, 2027',
  },
  troutStocking:
    '3.2 million adult trout stocked statewide in 684 streams and 130 lakes for 2026.',
  pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
};

// minSize in inches, null = no minimum
export const speciesRegulations = [
  {
    species: 'Trout (All Species)',
    includes: 'Brook, Brown, Rainbow, Tiger, Lake',
    minSize: 7,
    dailyLimit: 5,
    season: 'Apr 4 – Feb 28',
    notes:
      'Special regulations apply on many designated Class A and delayed-harvest waters. Check specific waterway.',
  },
  {
    species: 'Bass (Largemouth & Smallmouth)',
    minSize: 12,
    dailyLimit: 6,
    season: 'Year-round',
    notes: 'Some waters have special minimum size rules. Lake Erie has its own limits.',
  },
  {
    species: 'Walleye & Sauger',
    minSize: 15,
    dailyLimit: 6,
    season: 'May 2 – Feb 22',
    notes: 'Lake Erie has a special extended season. See Lake Erie entry below.',
  },
  {
    species: 'Walleye (Lake Erie)',
    minSize: 15,
    dailyLimit: 6,
    season: 'May 2 – Mar 15',
    notes:
      'Erie County only — applies to Lake Erie and Presque Isle Bay. Great Lakes compact applies.',
  },
  {
    species: 'Northern Pike',
    minSize: 24,
    dailyLimit: 3,
    season: 'Apr 18 – Feb 22',
    notes: '',
  },
  {
    species: 'Muskellunge (Muskie)',
    minSize: 36,
    dailyLimit: 1,
    season: 'Jun 6 – Feb 22',
    notes: 'Tiger muskellunge: 30" minimum.',
  },
  {
    species: 'Yellow Perch',
    minSize: null,
    dailyLimit: 50,
    season: 'Year-round',
    notes: 'Lake Erie: special open-water season rules may apply.',
  },
  {
    species: 'Crappie (Black & White)',
    minSize: null,
    dailyLimit: 50,
    season: 'Year-round',
    notes: '',
  },
  {
    species: 'Bluegill / Sunfish',
    minSize: null,
    dailyLimit: 50,
    season: 'Year-round',
    notes: 'Combined limit of 50 for all sunfish species.',
  },
  {
    species: 'Catfish (Channel, Flathead, Brown Bullhead)',
    minSize: null,
    dailyLimit: 50,
    season: 'Year-round',
    notes: '',
  },
  {
    species: 'Carp',
    minSize: null,
    dailyLimit: null,
    season: 'Year-round',
    notes: 'No size or creel limit.',
  },
];

// Notable waterways in Erie, Warren, Crawford Counties with key regulation notes
export const specialWaterways = [
  {
    name: 'Lake Erie (PA Waters)',
    county: 'Erie',
    type: 'lake',
    rules: {
      walleye: '15" min, 6/day — extended season to Mar 15',
      bass: '12" min, 6/day',
      perch: 'No minimum, 50/day',
      pike: '24" min, 3/day',
    },
    notes:
      'Pennsylvania has jurisdiction over its portion of Lake Erie. Great Lakes Compact regulations apply. Check PFBC for current year updates.',
    pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
  },
  {
    name: 'Presque Isle Bay',
    county: 'Erie',
    type: 'bay',
    rules: {
      walleye: '15" min, 6/day (Lake Erie regs apply)',
      bass: '12" min, 6/day',
      trout: 'Standard trout regs — stocked seasonally',
    },
    notes: 'Within Presque Isle State Park. Subject to Lake Erie special regulations.',
    pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
  },
  {
    name: 'French Creek',
    county: 'Crawford / Erie',
    type: 'stream',
    rules: {
      trout: '7" min, 5/day — stocked sections open Apr 4',
      bass: '12" min, 6/day',
      muskie: '36" min, 1/day (lower sections)',
    },
    notes:
      'One of the most biologically diverse streams in PA. Special regulations may apply on designated sections. Verify with PFBC.',
    pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
  },
  {
    name: 'Conneaut Lake',
    county: 'Crawford',
    type: 'lake',
    rules: {
      bass: '12" min, 6/day',
      pike: '24" min, 3/day',
      walleye: '15" min, 6/day',
      trout: '7" min, 5/day (if stocked)',
    },
    notes: "Pennsylvania's largest natural lake. Public access via several PFBC access areas.",
    pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
  },
  {
    name: 'Pymatuning Reservoir (PA Side)',
    county: 'Crawford',
    type: 'lake',
    rules: {
      walleye: '15" min, 6/day',
      muskie: '36" min, 1/day',
      bass: '12" min, 6/day',
      pike: '24" min, 3/day',
    },
    notes:
      'Shared border with Ohio. PA regulations apply on PA waters. One of the best walleye fisheries in the state.',
    pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
  },
  {
    name: 'Allegheny River (Warren Co.)',
    county: 'Warren',
    type: 'river',
    rules: {
      walleye: '15" min, 6/day',
      muskie: '36" min, 1/day',
      bass: '12" min, 6/day',
      trout: '7" min, 5/day (stocked sections)',
    },
    notes:
      'Excellent muskie and walleye fishery. Portions may be stocked with trout. Check PFBC for special designated sections.',
    pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
  },
  {
    name: 'Sugar Creek',
    county: 'Crawford',
    type: 'stream',
    rules: {
      trout: '7" min, 5/day — stocked sections open Apr 4',
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
      trout: '7" min, 5/day',
      bass: '12" min, 6/day',
    },
    notes: 'Flows into French Creek. Stocked with trout.',
    pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
  },
  {
    name: 'Brokenstraw Creek',
    county: 'Warren',
    type: 'stream',
    rules: {
      trout: '7" min, 5/day — stocked',
      bass: '12" min, 6/day',
    },
    notes: 'Tributary of the Allegheny River. Regularly stocked with trout.',
    pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
  },
  {
    name: 'Edinboro Lake',
    county: 'Erie',
    type: 'lake',
    rules: {
      bass: '12" min, 6/day',
      pike: '24" min, 3/day',
      trout: '7" min, 5/day (if stocked)',
    },
    notes: 'Public access available. Good bass and pike fishing.',
    pfbcLink: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations',
  },
];

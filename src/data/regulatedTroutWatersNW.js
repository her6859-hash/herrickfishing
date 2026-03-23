// PA Fish & Boat Commission — Northwest Region Regulated Trout Waters
// Source: 2026 PA Fishing Summary, Northwest Region
// Counties: Butler, Clarion, Crawford, Erie, Forest, Lawrence, Mercer, Venango, Warren
// These are the officially designated stocked / regulated trout stream sections.
// Note: sections are described by landmark boundaries (no GPS coordinates in source).

// Regulation type keys
export const REG_TYPES = {
  STOCKED:      'Stocked Trout Water',
  YEAR_ROUND:   'Year-Round Fishing',
  CR_ARTIFICIAL: 'Catch & Release — Artificial Lures Only',
  CR_FLY:       'Catch & Release — Fly Fishing Only',
  DELAYED:      'Delayed Harvest — Artificial Lures Only',
};

// Each entry: { name, county, section, regType, miles? }
// section = landmark description from PFBC summary
export const regulatedTroutWatersNW = [

  // ── BUTLER ──────────────────────────────────────────────────────────────
  { county: 'Butler', name: 'Bear Creek',                    regType: REG_TYPES.STOCKED,   section: 'T-712 upstream Troutman to first bridge upstream Bruin' },
  { county: 'Butler', name: 'Bonnie Brook',                  regType: REG_TYPES.STOCKED,   section: 'Bonnie Brook Road to mouth' },
  { county: 'Butler', name: 'Buffalo Creek',                 regType: REG_TYPES.STOCKED,   section: 'Upstream end of Chicora Borough Park to 0.87 mile downstream Sarver Road (SR 3004) bridge' },
  { county: 'Butler', name: 'Connoquenessing Creek',         regType: REG_TYPES.STOCKED,   section: 'Lake Oneida to SR 0356 bridge' },
  { county: 'Butler', name: 'Glade Run Lake',                regType: REG_TYPES.STOCKED,   section: 'Entire lake' },
  { county: 'Butler', name: 'Harbar Acres Lake',             regType: REG_TYPES.STOCKED,   section: 'Entire lake' },
  { county: 'Butler', name: 'Little Buffalo Run',            regType: REG_TYPES.STOCKED,   section: 'Clearfield Road bridge to mouth' },
  { county: 'Butler', name: 'Little Connoquenessing Creek',  regType: REG_TYPES.STOCKED,   section: 'SR 0422 bridge to SR 3029 bridge' },
  { county: 'Butler', name: 'North Branch Slippery Rock Creek', regType: REG_TYPES.STOCKED, section: 'White Oak Road bridge to mouth' },
  { county: 'Butler', name: 'Silver Creek',                  regType: REG_TYPES.STOCKED,   section: 'T-633 bridge to mouth' },
  { county: 'Butler', name: 'Slippery Rock Creek',           regType: REG_TYPES.STOCKED,   section: '0.75 mile downstream Slippery Rock Road to Heinz Camp property' },
  { county: 'Butler', name: 'Thorn Creek',                   regType: REG_TYPES.STOCKED,   section: 'Great Belt Road bridge to Hicks Road bridge' },

  // ── CLARION ─────────────────────────────────────────────────────────────
  { county: 'Clarion', name: 'Beaver Creek',    regType: REG_TYPES.STOCKED, section: "T-384 bridge to Route 338 bridge, Blair's Corner" },
  { county: 'Clarion', name: 'Canoe Creek',     regType: REG_TYPES.STOCKED, section: 'I-80 bridge to mouth' },
  { county: 'Clarion', name: 'Cathers Run',     regType: REG_TYPES.STOCKED, section: '220 meters upstream Cathers Run Road to mouth' },
  { county: 'Clarion', name: 'Coon Creek',      regType: REG_TYPES.STOCKED, section: 'Zipp Run to Irish Run' },
  { county: 'Clarion', name: 'East Sandy Creek',regType: REG_TYPES.STOCKED, section: 'T-586 bridge to Clarion/Venango County Line' },
  { county: 'Clarion', name: 'Leatherwood Creek',regType: REG_TYPES.STOCKED,section: 'T-478 bridge to Pump Station, Saint Charles' },
  { county: 'Clarion', name: 'Mill Creek',      regType: REG_TYPES.STOCKED, section: 'T-342 bridge to Little Mill Creek' },
  { county: 'Clarion', name: 'Piney Creek',     regType: REG_TYPES.STOCKED, section: 'SR 2001 bridge to Little Piney Creek' },
  { county: 'Clarion', name: 'Piney Creek',     regType: REG_TYPES.DELAYED, section: '1.20 miles; SR 2016 bridge downstream to 0.20 mile upstream of SR 0066 bridge', miles: 1.20 },
  { county: 'Clarion', name: 'Redbank Creek',   regType: REG_TYPES.STOCKED, section: 'North Fork Redbank Creek to Little Sandy Creek' },
  { county: 'Clarion', name: 'Richey Run',      regType: REG_TYPES.STOCKED, section: 'Route 208 bridge upstream T-550 to Allegheny River Trail bridge near mouth' },
  { county: 'Clarion', name: 'Toms Run',        regType: REG_TYPES.STOCKED, section: 'T-627 bridge to childrens area near mouth' },
  { county: 'Clarion', name: 'Turkey Run',      regType: REG_TYPES.STOCKED, section: 'Salem Road bridge to SR 0058 bridge, Alum Rock' },

  // ── CRAWFORD ────────────────────────────────────────────────────────────
  { county: 'Crawford', name: 'Caldwell Creek',       regType: REG_TYPES.STOCKED, section: 'West Branch Caldwell Creek to mouth' },
  { county: 'Crawford', name: 'Conneaut Creek',       regType: REG_TYPES.STOCKED, section: 'Dicksonburg Road bridge, Dicksonburg, to Pennside Road' },
  { county: 'Crawford', name: 'East Branch Oil Creek',regType: REG_TYPES.STOCKED, section: 'Clear Lake Dam to mouth' },
  { county: 'Crawford', name: 'Fivemile Creek',       regType: REG_TYPES.STOCKED, section: 'T-922 bridge to mouth' },
  { county: 'Crawford', name: 'Little Sugar Creek',   regType: REG_TYPES.STOCKED, section: 'SR 2009 bridge to mouth' },
  { county: 'Crawford', name: 'McLaughlin Creek',     regType: REG_TYPES.STOCKED, section: 'T-890 bridge to mouth' },
  { county: 'Crawford', name: 'Muddy Creek',          regType: REG_TYPES.STOCKED, section: 'Dewey Road bridge to Teepleville Road bridge' },
  { county: 'Crawford', name: 'North Deer Creek',     regType: REG_TYPES.STOCKED, section: 'Headwaters to mouth' },
  { county: 'Crawford', name: 'Oil Creek',            regType: REG_TYPES.STOCKED, section: 'Mosey Run to SR 8 bridge at Rynd Farm' },
  { county: 'Crawford', name: 'Pine Creek',           regType: REG_TYPES.STOCKED, section: 'Seldom Seen Road bridge to mouth' },
  { county: 'Crawford', name: 'Sugar Creek',          regType: REG_TYPES.STOCKED, section: 'Center Road bridge to Wright Road bridge' },
  { county: 'Crawford', name: 'Thompson Creek',       regType: REG_TYPES.STOCKED, section: '100 meters upstream bridge SR 2031 to mouth' },
  { county: 'Crawford', name: 'Woodcock Creek',       regType: REG_TYPES.STOCKED, section: 'SR 2036 bridge to mouth' },

  // ── ERIE ────────────────────────────────────────────────────────────────
  { county: 'Erie', name: 'Cascade Creek',              regType: REG_TYPES.STOCKED,   section: '12th Street bridge to mouth' },
  { county: 'Erie', name: 'Conneauttee Creek',          regType: REG_TYPES.STOCKED,   section: 'Edinboro Lake to Route 99' },
  { county: 'Erie', name: 'Crooked Creek',              regType: REG_TYPES.STOCKED,   section: 'Gloskey Road bridge to Railroad bridge North SR 5' },
  { county: 'Erie', name: 'East Basin Pond',            regType: REG_TYPES.STOCKED,   section: 'Waterworks Ponds, Presque Isle State Park' },
  { county: 'Erie', name: 'Elk Creek',                  regType: REG_TYPES.STOCKED,   section: '200 meters upstream I-79 NB bridge to 500 meters downstream SR 98 bridge; and 500 meters upstream Halls Run to mouth' },
  { county: 'Erie', name: 'French Creek',               regType: REG_TYPES.STOCKED,   section: 'PA/NY line to West Branch French Creek' },
  { county: 'Erie', name: 'Lake Pleasant',              regType: REG_TYPES.STOCKED,   section: 'Entire lake' },
  { county: 'Erie', name: 'South Branch French Creek',  regType: REG_TYPES.STOCKED,   section: 'SR 2018 bridge, Corry Limits, to mouth' },
  { county: 'Erie', name: 'Twentymile Creek',           regType: REG_TYPES.STOCKED,   section: 'SR 20 bridge to Dohler Property Line' },
  { county: 'Erie', name: 'Upper Gravel Pit',           regType: REG_TYPES.STOCKED,   section: 'Waterworks Ponds, Presque Isle State Park' },
  { county: 'Erie', name: 'West Basin Pond',            regType: REG_TYPES.STOCKED,   section: 'Waterworks Ponds, Presque Isle State Park' },

  // ── FOREST ──────────────────────────────────────────────────────────────
  { county: 'Forest', name: 'Beaver Run',              regType: REG_TYPES.STOCKED, section: '50 meters upstream Lick Run to mouth' },
  { county: 'Forest', name: 'Bluejay Creek',           regType: REG_TYPES.STOCKED, section: 'First SR 1003 bridge downstream SR 0066 to mouth' },
  { county: 'Forest', name: 'Coon Creek',              regType: REG_TYPES.STOCKED, section: 'Zipp Run to Irish Run' },
  { county: 'Forest', name: 'East Hickory Creek',      regType: REG_TYPES.STOCKED, section: 'Allegheny National Forest Road 119 bridge to mouth' },
  { county: 'Forest', name: 'East Hickory Creek',      regType: REG_TYPES.DELAYED, section: '1.74 miles; from the Queen Creek bridge downstream to the Otter Creek bridge', miles: 1.74 },
  { county: 'Forest', name: 'Little Hickory Run',      regType: REG_TYPES.STOCKED, section: 'Furnace Run to mouth' },
  { county: 'Forest', name: 'Maple Creek',             regType: REG_TYPES.STOCKED, section: 'T-323 bridge to mouth' },
  { county: 'Forest', name: 'Queen Creek',             regType: REG_TYPES.STOCKED, section: 'Beers Hollow to mouth' },
  { county: 'Forest', name: 'Ross Run',                regType: REG_TYPES.STOCKED, section: 'Unnamed tributary 1 km upstream East Branch Ross Run to Ross Run Road bridge' },
  { county: 'Forest', name: 'Salmon Creek',            regType: REG_TYPES.STOCKED, section: 'Bluejay Road bridge to mouth' },
  { county: 'Forest', name: 'South Branch Tionesta Creek', regType: REG_TYPES.STOCKED, section: '800 meters upstream Fork Run to mouth' },
  { county: 'Forest', name: 'Spring Creek',            regType: REG_TYPES.STOCKED, section: 'East Branch Spring Creek to mouth' },
  { county: 'Forest', name: 'The Branch',              regType: REG_TYPES.STOCKED, section: 'Coal Bed Run to mouth' },
  { county: 'Forest', name: 'Tionesta Creek',          regType: REG_TYPES.STOCKED, section: 'South Branch Tionesta Creek to Kellettville bridge' },
  { county: 'Forest', name: 'Tionesta Creek',          regType: REG_TYPES.YEAR_ROUND, section: 'From Tionesta Dam outflow to mouth' },
  { county: 'Forest', name: 'Toms Run',                regType: REG_TYPES.STOCKED, section: 'T-627 bridge to childrens area near mouth' },
  { county: 'Forest', name: 'West Branch Millstone Creek', regType: REG_TYPES.STOCKED, section: 'Scott Run to SR 2005 bridge' },
  { county: 'Forest', name: 'West Hickory Creek',      regType: REG_TYPES.STOCKED, section: 'Youngsville Road bridge to mouth' },

  // ── LAWRENCE ────────────────────────────────────────────────────────────
  { county: 'Lawrence', name: 'Bessemer Lake',            regType: REG_TYPES.STOCKED,    section: 'Entire lake' },
  { county: 'Lawrence', name: 'Big Run',                  regType: REG_TYPES.STOCKED,    section: 'SR 388 bridge to mouth' },
  { county: 'Lawrence', name: 'Cascade Quarry',           regType: REG_TYPES.YEAR_ROUND, section: 'Entire impoundment' },
  { county: 'Lawrence', name: 'Deer Creek',               regType: REG_TYPES.STOCKED,    section: '1,500 feet upstream Route 208 bridge to mouth' },
  { county: 'Lawrence', name: 'Hickory Run',              regType: REG_TYPES.STOCKED,    section: 'T-312 bridge to mouth' },
  { county: 'Lawrence', name: 'Honey Creek',              regType: REG_TYPES.STOCKED,    section: '0.25 mile upstream Musser Road bridge to North Fork Little Beaver Creek' },
  { county: 'Lawrence', name: 'Little Neshannock Creek',  regType: REG_TYPES.STOCKED,    section: 'West Branch Little Neshannock Creek to mouth' },
  { county: 'Lawrence', name: 'Neshannock Creek',         regType: REG_TYPES.STOCKED,    section: 'Headwaters to I-80 bridge and Pine Run to mouth' },
  { county: 'Lawrence', name: 'Neshannock Creek',         regType: REG_TYPES.DELAYED,    section: '2.70 miles; from the base of the Mill Dam in Volant downstream to the covered bridge on T-476', miles: 2.70 },
  { county: 'Lawrence', name: 'North Fork Little Beaver Creek', regType: REG_TYPES.STOCKED, section: 'Mud Road bridge to County Line' },
  { county: 'Lawrence', name: 'Slippery Rock Creek',      regType: REG_TYPES.STOCKED,    section: '0.75 mile downstream Slippery Rock Road to Heinz Camp property' },
  { county: 'Lawrence', name: 'Slippery Rock Creek',      regType: REG_TYPES.CR_FLY,     section: '0.51 mile; from Heinz Camp property downstream to lower McConnells Mill State Park property line', miles: 0.51 },
  { county: 'Lawrence', name: 'Taylor Run',               regType: REG_TYPES.STOCKED,    section: '1.00 mile upstream SR 1018 bridge to Slippery Rock Creek' },

  // ── MERCER ──────────────────────────────────────────────────────────────
  { county: 'Mercer', name: 'Buhl Lake',                regType: REG_TYPES.STOCKED,    section: 'Entire lake' },
  { county: 'Mercer', name: 'Cool Spring Creek',        regType: REG_TYPES.STOCKED,    section: 'Lake Latonka to mouth' },
  { county: 'Mercer', name: 'Cool Spring Creek',        regType: REG_TYPES.DELAYED,    section: '1.20 miles; from SR 2014 bridge upstream to the abandoned railroad grade', miles: 1.20 },
  { county: 'Mercer', name: 'Little Neshannock Creek',  regType: REG_TYPES.STOCKED,    section: 'West Branch Little Neshannock Creek to mouth' },
  { county: 'Mercer', name: 'Little Shenango River',    regType: REG_TYPES.STOCKED,    section: 'Lake Wilhelm Road bridge to mouth' },
  { county: 'Mercer', name: 'Mill Creek',               regType: REG_TYPES.STOCKED,    section: 'Scrubgrass Road bridge to mouth' },
  { county: 'Mercer', name: 'Neshannock Creek',         regType: REG_TYPES.STOCKED,    section: 'Headwaters to I-80 bridge and Pine Run to mouth' },
  { county: 'Mercer', name: 'North Deer Creek',         regType: REG_TYPES.STOCKED,    section: 'Bortz/Lower Road bridge to mouth' },
  { county: 'Mercer', name: 'Pine Run',                 regType: REG_TYPES.STOCKED,    section: 'Crill Road bridge to Neshannock Creek' },
  { county: 'Mercer', name: 'Sandy Creek',              regType: REG_TYPES.STOCKED,    section: 'SR 173 bridge to SR 3013 bridge Pecan' },
  { county: 'Mercer', name: 'Shenango River',           regType: REG_TYPES.YEAR_ROUND, section: 'Hamburg Road bridge in New Hamburg to pipeline crossing upstream of Big Bend access area' },
  { county: 'Mercer', name: 'West Branch Little Neshannock Creek', regType: REG_TYPES.STOCKED, section: 'Bend Road to mouth' },
  { county: 'Mercer', name: 'Wolf Creek',               regType: REG_TYPES.STOCKED,    section: 'East Pine Street, Grove City, to 300 feet downstream Airport Road bridge' },

  // ── VENANGO ─────────────────────────────────────────────────────────────
  { county: 'Venango', name: 'East Branch Sugar Creek',   regType: REG_TYPES.STOCKED, section: 'SR 0428 to mouth' },
  { county: 'Venango', name: 'East Sandy Creek',          regType: REG_TYPES.STOCKED, section: 'Tarklin Run to mouth' },
  { county: 'Venango', name: 'Hemlock Creek',             regType: REG_TYPES.STOCKED, section: 'Porcupine Run to mouth' },
  { county: 'Venango', name: 'Horse Creek',               regType: REG_TYPES.STOCKED, section: '250 meters upstream Wolf Branch to mouth' },
  { county: 'Venango', name: 'Little Sandy Creek',        regType: REG_TYPES.STOCKED, section: '400 meters upstream Bombishi Road bridge to old bridge at Polk Center Pump House' },
  { county: 'Venango', name: 'Little Sandy Creek',        regType: REG_TYPES.CR_FLY,  section: '1.40 miles; from the old bridge at Polk Center Pump House downstream to the bridge on Savannah Road (SR 3024)', miles: 1.40 },
  { county: 'Venango', name: 'Little Scrubgrass Creek',   regType: REG_TYPES.STOCKED, section: 'South Fork Little Scrubgrass Creek to mouth' },
  { county: 'Venango', name: 'Little Sugar Creek',        regType: REG_TYPES.STOCKED, section: 'SR 0027 bridge, Diamond, to mouth' },
  { county: 'Venango', name: 'Lower Twomile Run',         regType: REG_TYPES.STOCKED, section: 'Isaac Walton Park to mouth' },
  { county: 'Venango', name: 'Mill Creek',                regType: REG_TYPES.STOCKED, section: 'SR 0038 bridge to T-522 bridge' },
  { county: 'Venango', name: 'Oil Creek',                 regType: REG_TYPES.STOCKED, section: 'Mosey Run to SR 0008 bridge at Rynd Farm' },
  { county: 'Venango', name: 'Oil Creek',                 regType: REG_TYPES.DELAYED, section: '1.62 miles; from bridge at Petroleum Center downstream to railroad bridge at Columbia Farm', miles: 1.62 },
  { county: 'Venango', name: 'Oil Creek',                 regType: REG_TYPES.DELAYED, section: '1.00 mile; from the two green posts near Drake Well Museum downstream to Oil Creek State Park hiking trail bridge', miles: 1.00 },
  { county: 'Venango', name: 'Pine Run',                  regType: REG_TYPES.STOCKED, section: 'SR 0038 bridge to Bear Run' },
  { county: 'Venango', name: 'Pithole Creek',             regType: REG_TYPES.STOCKED, section: 'SR 0036 to 300 meters downstream SR 1004 Stone Arch bridge' },
  { county: 'Venango', name: 'Prather Creek',             regType: REG_TYPES.STOCKED, section: 'T-508 bridge to mouth' },
  { county: 'Venango', name: 'Richey Run',                regType: REG_TYPES.STOCKED, section: 'Route 208 bridge upstream T-550 to Allegheny River Trail bridge near mouth' },
  { county: 'Venango', name: 'Sandy Creek',               regType: REG_TYPES.STOCKED, section: 'SR 0173 bridge to SR 3013 bridge in Pecan' },
  { county: 'Venango', name: 'Sugar Creek',               regType: REG_TYPES.STOCKED, section: 'Center Road bridge to Wright Road bridge; and 300 meters upstream Creek Road bridge to mouth' },
  { county: 'Venango', name: 'Twomile Run',               regType: REG_TYPES.STOCKED, section: 'Reed Run to mouth' },
  { county: 'Venango', name: 'Two Mile Run Reservoir (Justus Lake)', regType: REG_TYPES.YEAR_ROUND, section: 'Entire impoundment' },
  { county: 'Venango', name: 'West Pithole Creek',        regType: REG_TYPES.STOCKED, section: 'Coe Road bridge to mouth' },

  // ── WARREN ──────────────────────────────────────────────────────────────
  { county: 'Warren', name: 'Blue Eye Run',              regType: REG_TYPES.STOCKED, section: 'Eldred Hill Road bridge to State Game Lands boundary' },
  { county: 'Warren', name: 'Brokenstraw Creek',         regType: REG_TYPES.STOCKED, section: 'SR 3010 bridge to 2.60 km upstream SR 0027 bridge Garland; and Davey Hill Road bridge to Matthews Run' },
  { county: 'Warren', name: 'Browns Run',                regType: REG_TYPES.STOCKED, section: 'Hook Run to mouth' },
  { county: 'Warren', name: 'Caldwell Creek',            regType: REG_TYPES.STOCKED, section: 'West Branch Caldwell Creek to mouth' },
  { county: 'Warren', name: 'Caldwell Creek',            regType: REG_TYPES.CR_ARTIFICIAL, section: '1.49 miles; from Selkirk highway bridge downstream to approximately 0.50 mile upstream of the Dotyville bridge', miles: 1.49 },
  { county: 'Warren', name: 'Chapman Lake',              regType: REG_TYPES.STOCKED, section: 'Entire lake' },
  { county: 'Warren', name: 'East Branch Spring Creek',  regType: REG_TYPES.STOCKED, section: 'SR 3001 to mouth' },
  { county: 'Warren', name: 'East Branch Tionesta Creek',regType: REG_TYPES.STOCKED, section: 'T-300 bridge downstream Jojo to mouth' },
  { county: 'Warren', name: 'East Hickory Creek',        regType: REG_TYPES.STOCKED, section: 'Allegheny National Forest Road 119 bridge to mouth' },
  { county: 'Warren', name: 'Farnsworth Branch',         regType: REG_TYPES.STOCKED, section: 'Bridge at Farnsworth Coop Hatch to mouth' },
  { county: 'Warren', name: 'Fourmile Run',              regType: REG_TYPES.STOCKED, section: 'North Branch Fourmile Run to mouth' },
  { county: 'Warren', name: 'Hemlock Run',               regType: REG_TYPES.STOCKED, section: '100 meters upstream Logging Road to mouth' },
  { county: 'Warren', name: 'Jackson Run',               regType: REG_TYPES.STOCKED, section: 'SR 0027 bridge to mouth' },
  { county: 'Warren', name: 'Little Brokenstraw Creek',  regType: REG_TYPES.STOCKED, section: 'SR 0957 bridge, Lottsville, to T-441 bridge, Pittsfield' },
  { county: 'Warren', name: 'Perry Magee Run',           regType: REG_TYPES.STOCKED, section: 'Youngsville Road to mouth' },
  { county: 'Warren', name: 'Pine Creek',                regType: REG_TYPES.STOCKED, section: 'Seldom Seen Road bridge to mouth' },
  { county: 'Warren', name: 'Queen Creek',               regType: REG_TYPES.STOCKED, section: 'Beers Hollow to mouth' },
  { county: 'Warren', name: 'Sixmile Run',               regType: REG_TYPES.STOCKED, section: 'North Fork Sixmile Creek to mouth' },
  { county: 'Warren', name: 'South Branch Tionesta Creek', regType: REG_TYPES.STOCKED, section: '800 meters upstream Fork Run to mouth' },
  { county: 'Warren', name: 'Spring Creek',              regType: REG_TYPES.STOCKED, section: 'East Branch Spring Creek to SR 3001 bridge' },
  { county: 'Warren', name: 'Thompson Run',              regType: REG_TYPES.STOCKED, section: '800 meters upstream Double Run to mouth' },
  { county: 'Warren', name: 'Tidioute Creek',            regType: REG_TYPES.STOCKED, section: 'SR 3011 bridge to mouth' },
  { county: 'Warren', name: 'Tionesta Creek',            regType: REG_TYPES.STOCKED, section: 'South Branch Tionesta Creek to Kellettville bridge' },
  { county: 'Warren', name: 'Twomile Run',               regType: REG_TYPES.STOCKED, section: 'Headwaters to mouth' },
  { county: 'Warren', name: 'West Branch Caldwell Creek',regType: REG_TYPES.STOCKED, section: 'Unnamed tributary west of Sanford to Three Bridge Run' },
  { county: 'Warren', name: 'West Branch Caldwell Creek',regType: REG_TYPES.CR_ARTIFICIAL, section: '2.75 miles; West Branch bridge upstream to Three Bridge Run', miles: 2.75 },
  { county: 'Warren', name: 'West Branch Tionesta Creek',regType: REG_TYPES.STOCKED, section: 'Jones Run to Wildcat Run; and Chapman Dam to mouth' },
  { county: 'Warren', name: 'West Hickory Creek',        regType: REG_TYPES.STOCKED, section: 'Youngsville Road bridge to mouth' },
];

// Helper: get all waters for a specific county
export function getWatersByCounty(county) {
  return regulatedTroutWatersNW.filter(w => w.county === county);
}

// Helper: get all waters of a specific regulation type
export function getWatersByRegType(regType) {
  return regulatedTroutWatersNW.filter(w => w.regType === regType);
}

// Sorted list of all NW region counties in this dataset
export const NW_COUNTIES = [
  'Butler', 'Clarion', 'Crawford', 'Erie', 'Forest',
  'Lawrence', 'Mercer', 'Venango', 'Warren',
];

// ConditionsCard — crowd & conditions estimator based on date/time patterns
// No external API — uses local Date() only. Completely free.
// Logic is based on known Erie steelhead angling patterns.

// Free public webcams in the Erie PA area
const WEBCAMS = [
  {
    name: 'I-90 @ Elk Creek Rd (Exit 18)',
    desc: 'PennDOT traffic cam — shows road conditions near Elk Creek access',
    url: 'https://www.511pa.com/map#camera',
    note: 'Open 511PA → zoom to Exit 18 / Girard area',
    type: 'traffic',
  },
  {
    name: '511PA Erie County — All Cameras',
    desc: 'All PennDOT live traffic cameras in Erie County (I-90, I-79, Rt 20, Rt 6N). Useful for winter road checks before driving to the creek.',
    url: 'https://www.511pa.com/map#camera',
    note: 'Free, no login. Filter by "Cameras" on the map.',
    type: 'traffic',
  },
  {
    name: 'Presque Isle Bay Webcam — Erie PA',
    desc: 'Live webcam overlooking Presque Isle Bay / Lake Erie. Shows current lake/weather conditions.',
    url: 'https://www.presqueislewebcam.com',
    note: 'Check before heading out — shows lake state and weather.',
    type: 'lake',
  },
  {
    name: 'NOAA Great Lakes Buoy / Lake Erie Conditions',
    desc: 'Live lake surface temp, wave height, and wind for Lake Erie. Useful for gauging how quickly the lake is cooling (drives steelhead staging).',
    url: 'https://www.glerl.noaa.gov/res/glcfs/',
    note: 'Not a video cam — real-time lake data dashboard.',
    type: 'data',
  },
  {
    name: 'NWS Erie — Current Observations',
    desc: 'National Weather Service Erie PA: current temp, precip, and 7-day forecast. Check for recent rainfall totals that would have triggered a run.',
    url: 'https://forecast.weather.gov/MapClick.php?CityName=Erie&state=PA&site=CLE&textField1=42.1292&textField2=-80.0851',
    note: 'Look at "Recent Precipitation" for the past 24–48 hrs.',
    type: 'weather',
  },
];

const CAM_TYPE_META = {
  traffic: { color: '#1d4ed8', label: 'Traffic Cam'  },
  lake:    { color: '#0891b2', label: 'Lake Webcam'  },
  data:    { color: '#0f766e', label: 'Live Data'    },
  weather: { color: '#6d28d9', label: 'NWS Weather'  },
};

// ── Crowd logic ─────────────────────────────────────────────────────────────

// Steelhead activity by month (0=Jan … 11=Dec)
const MONTHLY_ACTIVITY = [65, 55, 75, 65, 0, 0, 0, 0, 5, 55, 100, 85];
const MONTHLY_LABELS   = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function crowdScore(now) {
  const month  = now.getMonth();        // 0–11
  const dow    = now.getDay();          // 0=Sun … 6=Sat
  const hour   = now.getHours();

  const activity = MONTHLY_ACTIVITY[month];
  if (activity === 0) return { score: 0, level: 'off', label: 'Off Season', color: '#9ca3af', tips: ['Steelhead are not in the tribs this time of year.', 'Check back in October.'] };

  // Day-of-week multiplier
  const dowFactor = [1.4, 0.7, 0.7, 0.7, 0.8, 1.1, 1.5][dow]; // Sun,Mon…Sat

  // Time-of-day multiplier (peak fishing hours attract the most anglers)
  let timeFactor = 0.6;
  if (hour >= 5  && hour < 9)  timeFactor = 1.5;   // dawn rush
  if (hour >= 9  && hour < 11) timeFactor = 1.2;   // mid-morning
  if (hour >= 11 && hour < 14) timeFactor = 0.8;   // midday drop-off
  if (hour >= 14 && hour < 17) timeFactor = 1.1;   // afternoon pick-up
  if (hour >= 17 && hour < 19) timeFactor = 1.3;   // evening push

  const raw = activity * dowFactor * timeFactor;

  let level, label, color;
  if (raw >= 120)     { level = 'packed';   label = 'Expect Crowds';     color = '#dc2626'; }
  else if (raw >= 80) { level = 'busy';     label = 'Likely Busy';       color = '#ea580c'; }
  else if (raw >= 50) { level = 'moderate'; label = 'Moderate Traffic';  color = '#d97706'; }
  else                { level = 'quiet';    label = 'Relatively Quiet';  color = '#16a34a'; }

  const tips = buildTips(month, dow, hour, level);
  return { score: Math.round(raw), level, label, color, tips };
}

function buildTips(month, dow, hour, level) {
  const tips = [];
  const isWeekend = dow === 0 || dow === 6;
  const isPeakMonth = month === 10 || month === 11; // Nov, Dec

  if (isWeekend && isPeakMonth)
    tips.push('Peak month + weekend — popular access points (Elk Creek mouth, Walnut PFBC) will fill up before dawn. Arrive by 6am or target mid-week.');
  else if (isWeekend)
    tips.push('Weekends draw more anglers. Mid-week (Tue–Thu) the same water gets significantly less pressure.');

  if (hour >= 5 && hour <= 8)
    tips.push('Dawn is the highest-pressure window — anglers arrive early to claim spots. If the lot is full, try a lesser-known trib (Twenty Mile, Twelve Mile) or walk further upstream.');
  else if (hour >= 11 && hour <= 13)
    tips.push('Midday sees a natural lull in both fish activity and angler numbers — good time to move to a new spot without competing for position.');
  else if (hour >= 17)
    tips.push('Evening push: a second wave of after-work anglers hits popular spots. Late afternoon can be productive but expect company at well-known holes.');

  if (month === 10)
    tips.push('November post-rain surges bring the biggest crowds of the season. The day after a ½"+ rain, Elk Creek mouth will be shoulder-to-shoulder.');

  if (month === 1 || month === 2)
    tips.push('January–February sees the fewest anglers of the run season. Cold-weather solitude is a real advantage for those willing to deal with icy guides.');

  if (tips.length === 0)
    tips.push('Conditions look manageable. Arriving at first light and walking away from parking areas will always reduce competition.');

  return tips;
}

// ── Component ────────────────────────────────────────────────────────────────

export default function ConditionsCard() {
  const now      = new Date();
  const month    = now.getMonth();
  const hour     = now.getHours();
  const dow      = now.getDay();
  const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const { level, label, color, tips } = crowdScore(now);

  const ampm    = hour >= 12 ? 'pm' : 'am';
  const h12     = hour % 12 || 12;
  const timeStr = `${dayNames[dow]}, ${MONTHLY_LABELS[month]} · ${h12}${ampm}`;

  return (
    <div className="space-y-4">

      {/* Crowd estimate card */}
      <div className="rounded-lg border-2 p-4" style={{ borderColor: color, background: `${color}11` }}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">{timeStr}</p>
            <p className="text-lg font-bold" style={{ color }}>
              {label}
            </p>
            <p className="text-xs text-gray-600 mt-0.5">
              Based on time of day, day of week, and month
            </p>
          </div>
          <div className="rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-2xl"
            style={{ background: `${color}22` }}>
            { level === 'packed'   ? '🚫'
            : level === 'busy'     ? '👥'
            : level === 'moderate' ? '🎣'
            : level === 'off'      ? '❄️'
            :                        '✅' }
          </div>
        </div>
        <ul className="space-y-1.5">
          {tips.map((t, i) => (
            <li key={i} className="flex gap-2 text-xs text-gray-700">
              <span className="mt-0.5 flex-shrink-0" style={{ color }}>›</span>
              {t}
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-400 mt-3 italic">
          Estimate only — no live data. A major rain event the day before will increase crowds significantly regardless of day/time.
        </p>
      </div>

      {/* Best times this week */}
      {level !== 'off' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-xs font-bold text-green-800 mb-1">Best times for less competition</p>
          <p className="text-xs text-green-700">
            <strong>Tue–Thu, first light</strong> in run months — especially on smaller tribs (Twenty Mile, Twelve Mile, Conneaut upper sections). The popular spots (Elk mouth, Walnut PFBC) are fished hard every day during the peak run.
          </p>
        </div>
      )}

      {/* Webcam / live links */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-2">📹 Live Cams &amp; Conditions Links</h3>
        <p className="text-xs text-gray-500 mb-2">
          No live webcams exist directly on the tribs — but these free public resources are the next best thing.
        </p>
        <div className="space-y-2">
          {WEBCAMS.map(w => {
            const meta = CAM_TYPE_META[w.type];
            return (
              <a
                key={w.url}
                href={w.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 p-3 transition-colors group no-underline"
              >
                <span className="mt-0.5 flex-shrink-0 text-base">
                  { w.type === 'traffic' ? '🚗'
                  : w.type === 'lake'    ? '🌊'
                  : w.type === 'data'    ? '📊'
                  :                        '🌧️' }
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-gray-900 group-hover:text-blue-700">
                      {w.name} ↗
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full"
                      style={{ background: `${meta.color}18`, color: meta.color }}>
                      {meta.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{w.desc}</p>
                  {w.note && <p className="text-xs text-gray-400 italic mt-0.5">{w.note}</p>}
                </div>
              </a>
            );
          })}
        </div>
      </div>

    </div>
  );
}

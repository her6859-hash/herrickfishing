import ConditionsCard from './ConditionsCard';

// Erie, PA Steelhead Run Guide
// Based on PFBC data and regional angler knowledge for Lake Erie tribs

const RUN_MONTHS = [
  { month: 'Jan',  label: 'January',   intensity: 65, phase: 'winter',  note: 'Fish holding in deep pools. Cold-weather grind — worth it for solitude.' },
  { month: 'Feb',  label: 'February',  intensity: 55, phase: 'winter',  note: 'Still productive mid-winter. Fish stack near cover.' },
  { month: 'Mar',  label: 'March',     intensity: 80, phase: 'spawn',   note: 'Pre-spawn staging. Egg patterns highly effective as fish prepare to spawn.' },
  { month: 'Apr',  label: 'April',     intensity: 70, phase: 'spawn',   note: 'Active spawning through mid-month. Last push of run fish by month\'s end.' },
  { month: 'May',  label: 'May',       intensity: 5,  phase: 'off',     note: 'Run largely over. Isolated post-spawn fish possible in cold years.' },
  { month: 'Jun',  label: 'June',      intensity: 0,  phase: 'off',     note: 'Off season.' },
  { month: 'Jul',  label: 'July',      intensity: 0,  phase: 'off',     note: 'Off season.' },
  { month: 'Aug',  label: 'August',    intensity: 0,  phase: 'off',     note: 'Off season.' },
  { month: 'Sep',  label: 'September', intensity: 5,  phase: 'off',     note: 'Early scouting. Fish may stage near trib mouths by late September.' },
  { month: 'Oct',  label: 'October',   intensity: 55, phase: 'fall',    note: 'Run begins after first significant fall rains. Fish Elk and Walnut after rises.' },
  { month: 'Nov',  label: 'November',  intensity: 100, phase: 'peak',   note: 'PEAK MONTH. Largest numbers in the tribs. Rain-driven surges can bring thousands of fish.' },
  { month: 'Dec',  label: 'December',  intensity: 85, phase: 'peak',   note: 'Excellent — fish well established in streams. Less pressure than November.' },
];

// Reorder to Jan–Dec display but highlight the run window
const DISPLAY_ORDER = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
const displayMonths = DISPLAY_ORDER.map(m => RUN_MONTHS.find(r => r.month === m));

const PHASE_COLORS = {
  off:    { bar: '#e5e7eb', text: '#9ca3af', bg: '#f9fafb' },
  fall:   { bar: '#f97316', text: '#ea580c', bg: '#fff7ed' },
  peak:   { bar: '#b91c1c', text: '#991b1b', bg: '#fef2f2' },
  winter: { bar: '#3b82f6', text: '#1d4ed8', bg: '#eff6ff' },
  spawn:  { bar: '#7c3aed', text: '#6d28d9', bg: '#faf5ff' },
};

const PHASE_LABELS = {
  fall:   'Fall Run',
  peak:   'Peak Run',
  winter: 'Winter Holding',
  spawn:  'Spring Spawn',
  off:    'Off Season',
};

// USGS real-time streamflow gauges for Erie tribs
// Site numbers from waterdata.usgs.gov
const GAUGES = [
  {
    name: 'Elk Creek at Girard',
    siteNo: '04213000',
    url: 'https://waterdata.usgs.gov/monitoring-location/04213000/#parameterCode=00060&period=P7D',
    stream: 'Elk Creek',
  },
  {
    name: 'Walnut Creek near Fairview',
    siteNo: '04212100',
    url: 'https://waterdata.usgs.gov/monitoring-location/04212100/#parameterCode=00060&period=P7D',
    stream: 'Walnut Creek',
  },
  {
    name: 'Conneaut Creek at Conneautville',
    siteNo: '04212500',
    url: 'https://waterdata.usgs.gov/monitoring-location/04212500/#parameterCode=00060&period=P7D',
    stream: 'Conneaut Creek',
  },
];

const STREAMS = [
  {
    name: 'Elk Creek',
    miles: '~5 mi of regulated water',
    permit: true,
    public: 'PFBC access at mouth — most bank above is private',
    note: 'One of the top steelhead streams in PA. High fish counts after rain. C&R fly-fishing section upstream.',
    peak: 'Nov–Jan',
    gaugeUrl: 'https://waterdata.usgs.gov/monitoring-location/04213000/#parameterCode=00060&period=P7D',
    gaugeName: 'USGS 04213000 — Elk Cr at Girard',
  },
  {
    name: 'Walnut Creek',
    miles: '~4.8 mi',
    permit: true,
    public: 'Extensive PFBC easements — good bank access',
    note: 'Excellent public access via easements. Premier steelhead fishery with good numbers of fish and less pressure than Elk.',
    peak: 'Nov–Jan',
    gaugeUrl: 'https://waterdata.usgs.gov/monitoring-location/04212100/#parameterCode=00060&period=P7D',
    gaugeName: 'USGS 04212100 — Walnut Cr near Fairview',
  },
  {
    name: 'Conneaut Creek',
    miles: 'Straddles PA/OH border',
    permit: true,
    public: 'Some PA PFBC access; check OH regulations near border',
    note: 'Larger volume creek — later peaks. Fewer anglers, bigger fish possible. Verify which state rules apply near border.',
    peak: 'Nov–Feb',
    gaugeUrl: 'https://waterdata.usgs.gov/monitoring-location/04212500/#parameterCode=00060&period=P7D',
    gaugeName: 'USGS 04212500 — Conneaut Cr at Conneautville',
  },
  {
    name: 'Twenty Mile Creek',
    miles: '~2.3 mi regulated',
    permit: true,
    public: 'North East Township access; marina parking',
    note: 'Near North East PA. Smaller trib but productive after rain. Less crowded alternative.',
    peak: 'Oct–Dec',
    gaugeUrl: null,
    gaugeName: null,
  },
  {
    name: 'Twelve Mile Creek',
    miles: 'Shorter trib',
    permit: true,
    public: 'Limited access — check before visiting',
    note: 'Smaller system. Fish fast after rain before water drops.',
    peak: 'Oct–Nov',
    gaugeUrl: null,
    gaugeName: null,
  },
];

const TRIGGERS = [
  {
    icon: '🌧️',
    label: 'Rainfall',
    color: '#1d4ed8',
    bg: '#eff6ff',
    desc: 'The single most important trigger. A 0.5–1"+ rain raising stream levels will push waves of fish from the lake into the tribs within 24–48 hours. Falling but still elevated flows are prime — check gauges below before driving out.',
  },
  {
    icon: '🌡️',
    label: 'Water Temperature',
    color: '#0f766e',
    bg: '#f0fdfa',
    desc: 'Fish begin staging near trib mouths when lake temps fall below ~55°F (October). They enter streams aggressively as temperatures fall into the 45–50°F range. Below 34°F fish slow dramatically and stack in deep holes.',
  },
  {
    icon: '🌤️',
    label: 'Time of Day',
    color: '#b45309',
    bg: '#fffbeb',
    desc: 'Early morning (first light to ~9 am) and late afternoon (3–6 pm) are consistently most productive for feeding activity. Midday can be slow in clear, bright conditions — fish the shadows.',
  },
  {
    icon: '🍂',
    label: 'Season Phase',
    color: '#9333ea',
    bg: '#faf5ff',
    desc: 'Fall fish are aggressive and chrome-bright from the lake. Winter fish are longer-term residents — slower but hittable on egg patterns and nymphs. Spawning fish in March–April respond to eggs and spawn sacks.',
  },
];

export default function SteelheadGuide() {
  return (
    <div className="space-y-5">

      {/* Permit callout */}
      <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 text-sm text-amber-900 flex gap-2">
        <span className="text-lg flex-shrink-0">⚠️</span>
        <div>
          <strong>Lake Erie Permit required</strong> on all Lake Erie tributaries in addition to a base
          PA Fishing License and Trout/Salmon Permit. Permit cost: $9.97 (resident).
          Rainbow/steelhead: 7" min, 5/day (regular season) · 3/day (extended).
        </div>
      </div>

      {/* USGS Live Gauge Links */}
      <div className="bg-blue-950 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-white">📡 USGS Real-Time Stream Gauges</h3>
          <a
            href="https://waterwatch.usgs.gov/?id=ww_current"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-300 hover:text-blue-100 underline"
          >
            WaterWatch map ↗
          </a>
        </div>
        <p className="text-xs text-blue-300 mb-3">
          Check flow before you go — rising or falling-but-elevated flows trigger the best runs.
          Opens 7-day hydrograph on USGS site.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {GAUGES.map(g => (
            <a
              key={g.siteNo}
              href={g.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-0.5 bg-blue-900 hover:bg-blue-800 rounded-lg px-3 py-2.5 transition-colors group"
            >
              <span className="text-xs font-bold text-white group-hover:text-blue-200">
                {g.stream} ↗
              </span>
              <span className="text-xs text-blue-400 font-mono">#{g.siteNo}</span>
              <span className="text-xs text-blue-300">{g.name}</span>
            </a>
          ))}
        </div>
        <a
          href="https://dashboard.waterdata.usgs.gov/app/nwd/?region=us&aoi=default"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-xs text-blue-400 hover:text-blue-200 underline"
        >
          USGS National Water Dashboard — all PA gauges ↗
        </a>
      </div>

      {/* Monthly Run Intensity chart */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-1">Run Intensity — October through April</h3>
        <p className="text-xs text-gray-500 mb-3">
          Relative fish numbers in Erie tribs by month. Rain and temperature are the key variables
          within each window.
        </p>
        <div className="grid grid-cols-7 gap-1">
          {displayMonths.map(m => {
            const colors = PHASE_COLORS[m.phase];
            return (
              <div key={m.month} className="flex flex-col items-center gap-1" title={`${m.label}: ${m.note}`}>
                {/* Bar */}
                <div className="w-full flex flex-col justify-end" style={{ height: 72 }}>
                  <div
                    className="w-full rounded-t transition-all"
                    style={{
                      height: `${Math.max(4, m.intensity * 0.72)}px`,
                      background: colors.bar,
                    }}
                  />
                </div>
                {/* Label */}
                <span className="text-xs font-semibold" style={{ color: colors.text }}>
                  {m.month}
                </span>
                {m.intensity >= 90 && (
                  <span className="text-xs font-bold text-red-700 leading-none">PEAK</span>
                )}
              </div>
            );
          })}
        </div>
        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-3">
          {Object.entries(PHASE_LABELS).filter(([k]) => k !== 'off').map(([phase, label]) => (
            <div key={phase} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ background: PHASE_COLORS[phase].bar }} />
              <span className="text-xs text-gray-600">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Key triggers */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-2">Key Run Triggers</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {TRIGGERS.map(t => (
            <div key={t.label}
              className="rounded-lg border p-3 flex gap-3"
              style={{ background: t.bg, borderColor: `${t.color}33` }}
            >
              <span className="text-xl flex-shrink-0 leading-snug">{t.icon}</span>
              <div>
                <p className="text-xs font-bold mb-1" style={{ color: t.color }}>{t.label}</p>
                <p className="text-xs text-gray-700 leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stream-by-stream breakdown */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-2">Erie Tributary Guide</h3>
        <div className="space-y-2">
          {STREAMS.map(s => (
            <div key={s.name} className="border border-gray-200 rounded-lg p-3 bg-white">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <h4 className="text-sm font-bold text-gray-900">{s.name}</h4>
                <div className="flex gap-2">
                  {s.permit && (
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                      Lake Erie Permit
                    </span>
                  )}
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                    Peak: {s.peak}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-1">
                <span className="font-semibold">Access:</span> {s.public}
              </p>
              <p className="text-xs text-gray-600 mb-2">{s.note}</p>
              {s.gaugeUrl && (
                <a
                  href={s.gaugeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  📡 {s.gaugeName} ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Conditions & crowd estimator */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-2">Conditions &amp; Crowd Estimator</h3>
        <ConditionsCard />
      </div>

      {/* Winter fishing note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-900">
        <strong>Winter Fishing (Dec–Feb):</strong> Fish remain in streams through winter and are
        catchable, though slower. Target deep holes and slow water. Egg flies, sucker spawn, and
        small nymphs (Hare's Ear, Pheasant Tail) on light tippet are consistent producers.
        Ice in rod guides is part of the experience — bring a thermos.
      </div>

    </div>
  );
}

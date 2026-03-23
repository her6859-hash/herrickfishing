import { useState } from 'react';
import { generalInfo } from '../../data/regulations2026';
import SpeciesTable from './SpeciesTable';
import SpecialWaters from './SpecialWaters';
import LicenseInfo from './LicenseInfo';
import RegulatedWatersNW from './RegulatedWatersNW';

function Section({ title, defaultOpen, badge, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left transition-colors"
      >
        <span className="font-semibold text-gray-900 flex items-center gap-2">
          {title}
          {badge && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-normal">
              {badge}
            </span>
          )}
        </span>
        <span className="text-gray-400 text-lg leading-none">{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
}

export default function RegulationsPanel() {
  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      {/* Header */}
      <div className="bg-blue-900 text-white rounded-lg p-4">
        <h2 className="text-xl font-bold mb-1">2026 PA Fishing Regulations</h2>
        <p className="text-blue-200 text-sm">
          Erie · Warren · Crawford Counties &nbsp;|&nbsp; PA Fish &amp; Boat Commission
        </p>
        <p className="text-blue-300 text-xs mt-1">
          Always verify current rules at the official PFBC website before fishing.
        </p>
        <a
          href={generalInfo.pfbcLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-xs bg-blue-700 hover:bg-blue-600 px-3 py-1.5 rounded-full transition-colors"
        >
          Official PFBC Regulations Page ↗
        </a>
      </div>

      {/* Key Dates */}
      <Section title="Key 2026 Dates" defaultOpen={true} badge="Season Opener Apr 4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(generalInfo.keyDates).map(([key, value]) => (
            <div key={key} className="flex gap-3 items-start">
              <span className="text-lg flex-shrink-0">📅</span>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
                </p>
                <p className="text-sm text-gray-800">{value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
          <strong>Trout Stocking 2026:</strong> {generalInfo.troutStocking}
        </div>
        <div className="mt-2 bg-amber-50 border border-amber-200 rounded p-3 text-sm text-amber-900">
          <strong>Bass No-Harvest Period:</strong> April 11 – June 12, 2026. Bass must be
          immediately released during this period on all waters statewide.
        </div>
      </Section>

      {/* License & Permits */}
      <Section title="License &amp; Permit Fees" defaultOpen={false} badge="2026">
        <LicenseInfo />
      </Section>

      {/* Species Limits */}
      <Section title="Species Size &amp; Creel Limits" defaultOpen={true}>
        <p className="text-xs text-gray-500 mb-3">
          General statewide limits. Special regulations apply on designated waters — verify with{' '}
          <a
            href={generalInfo.pfbcLink}
            target="_blank"
            rel="noopener"
            className="text-blue-600 hover:underline"
          >
            PFBC official regulations
          </a>
          .
        </p>
        <SpeciesTable />
      </Section>

      {/* Special Waterways */}
      <Section
        title="Special Waterways — Erie, Warren &amp; Crawford"
        defaultOpen={true}
        badge="13 waterways"
      >
        <p className="text-xs text-gray-500 mb-3">
          Key regulations for notable public waterways in the three counties.
          Waterways marked ⚠️ require an additional permit beyond the base fishing license.
        </p>
        <SpecialWaters />
      </Section>

      {/* NW Region Regulated Trout Waters */}
      <Section
        title="NW Region Regulated Trout Waters"
        defaultOpen={false}
        badge="9 counties · 130+ waters"
      >
        <p className="text-xs text-gray-500 mb-3">
          Official PFBC-designated stocked trout sections, special regulation waters, and year-round
          fishing zones for the Northwest Region (Butler, Clarion, Crawford, Erie, Forest, Lawrence,
          Mercer, Venango, Warren counties). Filter by county or regulation type.
        </p>
        <RegulatedWatersNW />
      </Section>

      {/* General Rules */}
      <Section title="General Rules &amp; Reminders" defaultOpen={false}>
        <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
          <li>A valid PA Fishing License must be in your possession while fishing.</li>
          <li>All fish must be measured from tip of mouth to tip of tail (total length).</li>
          <li>Daily creel limits reset at midnight each day.</li>
          <li>Catch-and-release fishing is allowed year-round on most waters.</li>
          <li>Artificial lures only on many Class A wild trout streams — check PFBC.</li>
          <li>
            Lake Erie and all its tributaries (Elk Creek, Walnut Creek, Conneaut Creek, etc.)
            require a Lake Erie Permit in addition to the base fishing license.
          </li>
          <li>Some waters require a Trout/Salmon Permit for trout fishing.</li>
          <li>
            Pymatuning Reservoir: shared PA/Ohio border water — PA regulations apply on PA side.
            Check which state&apos;s waters you are fishing.
          </li>
          <li>
            Kinzua Dam tailwater (Warren County) provides cold-water trout habitat year-round — check
            for special designation.
          </li>
          <li>
            Invasive species: Never transport water, plants, or bait fish between water bodies. Drain
            all equipment, livewells, and bilges before leaving any water access area.
          </li>
          <li>
            Big Bass Program and Panfish Enhancement Program waters have special size limits — check
            the PFBC Special Regulations listing.
          </li>
        </ul>
      </Section>

      <p className="text-xs text-gray-400 text-center pb-4">
        Regulations sourced from the PA Fish &amp; Boat Commission. Confirm current rules at{' '}
        <a href={generalInfo.pfbcLink} target="_blank" rel="noopener" className="underline">
          fishandboat.com
        </a>{' '}
        before every fishing trip.
      </p>
    </div>
  );
}

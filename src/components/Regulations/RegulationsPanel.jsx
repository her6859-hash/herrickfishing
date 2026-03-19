import { useState } from 'react';
import { generalInfo } from '../../data/regulations2026';
import SpeciesTable from './SpeciesTable';
import SpecialWaters from './SpecialWaters';

function Section({ title, defaultOpen, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left transition-colors"
      >
        <span className="font-semibold text-gray-900">{title}</span>
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
        <a
          href={generalInfo.pfbcLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-xs bg-blue-700 hover:bg-blue-600 px-3 py-1.5 rounded-full transition-colors"
        >
          Official PFBC Regulations Page ↗
        </a>
      </div>

      {/* Key Dates & License Info */}
      <Section title="License Requirements &amp; Key 2026 Dates" defaultOpen={true}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2 text-sm">License Requirements</h4>
            <p className="text-sm text-gray-600 mb-1">{generalInfo.licenseRequired}</p>
            <p className="text-sm text-gray-600">{generalInfo.licenseNote}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2 text-sm">Key 2026 Dates</h4>
            <div className="space-y-1.5">
              {Object.entries(generalInfo.keyDates).map(([key, value]) => (
                <div key={key} className="flex gap-2 text-sm">
                  <span className="text-blue-600 font-medium whitespace-nowrap">📅</span>
                  <div>
                    <span className="font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}:
                    </span>{' '}
                    <span className="text-gray-600">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3 bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
          <strong>Trout Stocking 2026:</strong> {generalInfo.troutStocking}
        </div>
      </Section>

      {/* Species Size & Creel Limits */}
      <Section title="2026 Size &amp; Creel Limits by Species" defaultOpen={true}>
        <p className="text-xs text-gray-500 mb-3">
          These are general statewide limits. Special regulations may apply on designated waters.
          Always verify with the{' '}
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

      {/* Special Named Waterways */}
      <Section title="Special Waterways — Erie, Warren &amp; Crawford Counties" defaultOpen={true}>
        <p className="text-xs text-gray-500 mb-3">
          Key regulations for notable public waterways in the three counties. Click any card for
          the full PFBC regulations page.
        </p>
        <SpecialWaters />
      </Section>

      {/* General Rules */}
      <Section title="General Rules &amp; Reminders" defaultOpen={false}>
        <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
          <li>A valid PA Fishing License must be in your possession while fishing.</li>
          <li>All fish must be measured from tip of mouth to tip of tail.</li>
          <li>Daily limits reset at midnight each day.</li>
          <li>Catch-and-release fishing is allowed year-round on most waters.</li>
          <li>Artificial lures only on some delayed-harvest and fly-fishing-only sections.</li>
          <li>Some waters require a special trout/salmon permit in addition to the base license.</li>
          <li>
            Lake Erie requires a Lake Erie Tributary Permit for fishing in tributary streams from
            Oct 1 – Mar 31.
          </li>
          <li>
            Pymatuning Reservoir: PA and Ohio have a compact — check which state&apos;s waters
            you are on.
          </li>
          <li>
            Invasive species: Never transport water, plants, or fish between water bodies. Drain all
            equipment before leaving.
          </li>
        </ul>
      </Section>

      <p className="text-xs text-gray-400 text-center pb-4">
        Regulations data sourced from the PA Fish &amp; Boat Commission. Always confirm current
        rules at{' '}
        <a href={generalInfo.pfbcLink} target="_blank" rel="noopener" className="underline">
          fishandboat.com
        </a>{' '}
        before fishing.
      </p>
    </div>
  );
}

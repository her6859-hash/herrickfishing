import { specialWaterways } from '../../data/regulations2026';

export default function WaterwayPopup({ properties }) {
  const name = properties?.name || properties?.Name || properties?.STREAM_NAM || 'Unnamed Waterway';
  const type =
    properties?.waterway ||
    properties?.water ||
    properties?.TYPE ||
    properties?.type ||
    'waterway';
  const county = properties?.county || properties?.COUNTY || '';

  // Find special waterway data (fuzzy match on name)
  const special = specialWaterways.find(
    (w) => name && w.name.toLowerCase().includes(name.toLowerCase().split(' ')[0])
  );

  const pfbcLink = special?.pfbcLink || 'https://www.pa.gov/agencies/fishandboat/fishing/regulations';

  return (
    <div className="text-sm min-w-[200px] max-w-[280px]">
      <h3 className="font-bold text-blue-900 text-base mb-1">{name}</h3>
      <div className="flex gap-2 flex-wrap mb-2">
        {type && (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full capitalize">
            {type}
          </span>
        )}
        {county && (
          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">
            {county} Co.
          </span>
        )}
      </div>

      {special && (
        <>
          <p className="font-semibold text-gray-700 text-xs mb-1">Key 2026 Regulations:</p>
          <ul className="space-y-0.5 mb-2">
            {Object.entries(special.rules).map(([species, rule]) => (
              <li key={species} className="text-xs text-gray-600">
                <span className="capitalize font-medium">{species}:</span> {rule}
              </li>
            ))}
          </ul>
          {special.notes && (
            <p className="text-xs text-gray-500 italic mb-2">{special.notes}</p>
          )}
        </>
      )}

      <a
        href={pfbcLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-xs text-blue-700 hover:underline font-medium"
      >
        View Full PFBC Regulations ↗
      </a>
    </div>
  );
}

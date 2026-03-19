import { specialWaterways } from '../../data/regulations2026';

const TYPE_COLORS = {
  lake: 'bg-blue-100 text-blue-800',
  bay: 'bg-cyan-100 text-cyan-800',
  stream: 'bg-green-100 text-green-800',
  river: 'bg-teal-100 text-teal-800',
};

export default function SpecialWaters() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {specialWaterways.map((w) => (
        <div key={w.name} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-gray-900 text-sm leading-tight">{w.name}</h3>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                  TYPE_COLORS[w.type] || 'bg-gray-100 text-gray-700'
                }`}
              >
                {w.type}
              </span>
              <span className="text-xs text-gray-400">{w.county}</span>
            </div>
          </div>

          <div className="space-y-1 mb-3">
            {Object.entries(w.rules).map(([species, rule]) => (
              <div key={species} className="flex justify-between text-xs gap-2">
                <span className="font-medium text-gray-700 capitalize">{species}</span>
                <span className="text-gray-600 text-right">{rule}</span>
              </div>
            ))}
          </div>

          {w.notes && (
            <p className="text-xs text-gray-500 italic mb-3 border-t border-gray-100 pt-2">
              {w.notes}
            </p>
          )}

          <a
            href={w.pfbcLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-700 hover:underline font-medium"
          >
            Full PFBC Regulations ↗
          </a>
        </div>
      ))}
    </div>
  );
}

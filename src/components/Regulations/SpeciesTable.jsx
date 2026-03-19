import { speciesRegulations } from '../../data/regulations2026';

export default function SpeciesTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="px-3 py-2 text-left font-semibold">Species</th>
            <th className="px-3 py-2 text-center font-semibold whitespace-nowrap">Min Size</th>
            <th className="px-3 py-2 text-center font-semibold whitespace-nowrap">Daily Limit</th>
            <th className="px-3 py-2 text-left font-semibold">Season</th>
            <th className="px-3 py-2 text-left font-semibold hidden md:table-cell">Notes</th>
          </tr>
        </thead>
        <tbody>
          {speciesRegulations.map((row, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
            >
              <td className="px-3 py-2 font-medium text-gray-900">
                {row.species}
                {row.includes && (
                  <span className="block text-xs text-gray-400 font-normal">{row.includes}</span>
                )}
              </td>
              <td className="px-3 py-2 text-center text-gray-700">
                {row.minSize ? `${row.minSize}"` : '—'}
              </td>
              <td className="px-3 py-2 text-center text-gray-700">
                {row.dailyLimit ?? 'No limit'}
              </td>
              <td className="px-3 py-2 text-gray-700 whitespace-nowrap">{row.season}</td>
              <td className="px-3 py-2 text-xs text-gray-500 hidden md:table-cell">{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

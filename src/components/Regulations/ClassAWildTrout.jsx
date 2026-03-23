import { useState, useMemo } from 'react';
import { classAWildTroutList, CLASS_A_FISHERY_COLORS, CLASS_A_COUNTIES } from '../../data/classAWildTrout';

const FISHERY_LABEL = {
  'Brook': 'Brook Trout',
  'Brown': 'Brown Trout',
  'Rainbow': 'Rainbow Trout',
  'Mixed Brook/Brown': 'Brook / Brown',
};

export default function ClassAWildTrout() {
  const [filterCounty, setFilterCounty] = useState('all');
  const [filterFishery, setFilterFishery] = useState('all');
  const [search, setSearch] = useState('');

  const fisheryTypes = useMemo(() => [...new Set(classAWildTroutList.map(w => w.fishery))], []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return classAWildTroutList.filter(w => {
      if (filterCounty !== 'all' && w.county !== filterCounty) return false;
      if (filterFishery !== 'all' && w.fishery !== filterFishery) return false;
      if (q && !w.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [filterCounty, filterFishery, search]);

  return (
    <div>
      {/* Key fact box */}
      <div className="bg-teal-50 border border-teal-200 rounded p-3 mb-3 text-sm text-teal-900">
        <strong>No stocking on Class A waters.</strong> These streams support naturally
        reproducing wild trout populations of sufficient abundance for rewarding sport fishing.
        Many are on private land — always obtain permission before fishing.
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-3">
        <input
          type="text"
          placeholder="Search stream name…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-[140px] text-xs border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <select
          value={filterCounty}
          onChange={e => setFilterCounty(e.target.value)}
          className="text-xs border border-gray-300 rounded px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="all">All Counties</option>
          {CLASS_A_COUNTIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          value={filterFishery}
          onChange={e => setFilterFishery(e.target.value)}
          className="text-xs border border-gray-300 rounded px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="all">All Species</option>
          {fisheryTypes.map(f => <option key={f} value={f}>{FISHERY_LABEL[f] || f}</option>)}
        </select>
      </div>

      <p className="text-xs text-gray-500 mb-2">{filtered.length} streams shown</p>

      <div className="overflow-x-auto rounded border border-gray-200">
        <table className="min-w-full text-xs">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-3 py-2 font-semibold text-gray-700">County</th>
              <th className="text-left px-3 py-2 font-semibold text-gray-700">Stream</th>
              <th className="text-left px-3 py-2 font-semibold text-gray-700 whitespace-nowrap">§</th>
              <th className="text-left px-3 py-2 font-semibold text-gray-700">Species</th>
              <th className="text-left px-3 py-2 font-semibold text-gray-700 whitespace-nowrap">Miles</th>
              <th className="text-left px-3 py-2 font-semibold text-gray-700 whitespace-nowrap">% Public</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((w, i) => {
              const color = CLASS_A_FISHERY_COLORS[w.fishery] || '#0d9488';
              const pubColor = w.pctPublic >= 50 ? 'text-green-700 font-semibold'
                : w.pctPublic > 0 ? 'text-amber-700'
                : 'text-red-600';
              return (
                <tr key={w.id || i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{w.county}</td>
                  <td className="px-3 py-2 font-medium text-gray-900">{w.name}</td>
                  <td className="px-3 py-2 text-gray-500">{w.section}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span style={{ color, fontWeight: 600 }}>{FISHERY_LABEL[w.fishery] || w.fishery}</span>
                  </td>
                  <td className="px-3 py-2 text-gray-600">{w.lengthMi}</td>
                  <td className={`px-3 py-2 ${pubColor}`}>{w.pctPublic}%</td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-4 text-center text-gray-400">No matching streams.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

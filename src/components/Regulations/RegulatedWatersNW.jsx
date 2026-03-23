import { useState, useMemo } from 'react';
import {
  regulatedTroutWatersNW,
  REG_TYPES,
  NW_COUNTIES,
} from '../../data/regulatedTroutWatersNW';

const REG_BADGE = {
  [REG_TYPES.STOCKED]:       { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Stocked' },
  [REG_TYPES.YEAR_ROUND]:    { bg: 'bg-blue-100',   text: 'text-blue-800',   label: 'Year-Round' },
  [REG_TYPES.CR_ARTIFICIAL]: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'C&R Art. Lures' },
  [REG_TYPES.CR_FLY]:        { bg: 'bg-indigo-100', text: 'text-indigo-800', label: 'C&R Fly Only' },
  [REG_TYPES.DELAYED]:       { bg: 'bg-teal-100',   text: 'text-teal-800',   label: 'Delayed Harvest' },
};

export default function RegulatedWatersNW() {
  const [filterCounty, setFilterCounty] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return regulatedTroutWatersNW.filter(w => {
      if (filterCounty !== 'all' && w.county !== filterCounty) return false;
      if (filterType !== 'all' && w.regType !== filterType) return false;
      if (q && !w.name.toLowerCase().includes(q) && !w.section.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [filterCounty, filterType, search]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-3">
        <input
          type="text"
          placeholder="Search stream name…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-[140px] text-xs border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filterCounty}
          onChange={e => setFilterCounty(e.target.value)}
          className="text-xs border border-gray-300 rounded px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Counties</option>
          {NW_COUNTIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          className="text-xs border border-gray-300 rounded px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Regulation Types</option>
          {Object.values(REG_TYPES).map(rt => (
            <option key={rt} value={rt}>{REG_BADGE[rt]?.label || rt}</option>
          ))}
        </select>
      </div>

      <p className="text-xs text-gray-500 mb-2">{filtered.length} waters shown</p>

      {/* Table */}
      <div className="overflow-x-auto rounded border border-gray-200">
        <table className="min-w-full text-xs">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-3 py-2 font-semibold text-gray-700 whitespace-nowrap">County</th>
              <th className="text-left px-3 py-2 font-semibold text-gray-700 whitespace-nowrap">Stream / Water</th>
              <th className="text-left px-3 py-2 font-semibold text-gray-700 whitespace-nowrap">Type</th>
              <th className="text-left px-3 py-2 font-semibold text-gray-700">Section / Limits</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((w, i) => {
              const badge = REG_BADGE[w.regType] || { bg: 'bg-gray-100', text: 'text-gray-700', label: w.regType };
              return (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{w.county}</td>
                  <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">{w.name}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded-full font-medium ${badge.bg} ${badge.text}`}>
                      {badge.label}
                    </span>
                    {w.miles && (
                      <span className="ml-1 text-gray-400">({w.miles} mi)</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-gray-600 leading-snug">{w.section}</td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3 py-4 text-center text-gray-400">No matching waters found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

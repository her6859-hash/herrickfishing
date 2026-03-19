const COUNTIES = [
  { id: 'all', label: 'All Counties' },
  { id: 'erie', label: 'Erie' },
  { id: 'warren', label: 'Warren' },
  { id: 'crawford', label: 'Crawford' },
];

export default function CountyFilter({ selected, onChange }) {
  return (
    <div className="flex gap-1 flex-wrap">
      {COUNTIES.map((c) => (
        <button
          key={c.id}
          onClick={() => onChange(c.id)}
          className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
            selected === c.id
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}

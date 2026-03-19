export default function TabNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'map', label: 'Map' },
    { id: 'regulations', label: '2026 Regulations' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 flex flex-shrink-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            activeTab === tab.id
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

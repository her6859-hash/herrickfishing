export default function LayerControls({ layers, onToggle }) {
  return (
    <div className="bg-white rounded shadow p-2 text-xs space-y-1.5">
      <p className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-2">Layers</p>
      {layers.map((layer) => (
        <label
          key={layer.id}
          className="flex items-center gap-2 cursor-pointer hover:text-gray-900 text-gray-600"
        >
          <input
            type="checkbox"
            checked={layer.visible}
            onChange={() => onToggle(layer.id)}
            className="rounded"
          />
          <span
            className="inline-block w-4 h-2 rounded-sm"
            style={{ backgroundColor: layer.color }}
          />
          {layer.label}
        </label>
      ))}
    </div>
  );
}

"use client";

const ROAST_LEVELS = [
  { id: 'light', name: '🌱 Light', description: 'Constructive feedback with a gentle touch of humor' },
  { id: 'medium', name: '🔥 Medium', description: 'Balanced mix of humor and constructive criticism' },
  { id: 'brutal', name: '💀 Brutal', description: 'No mercy, full roast with savage feedback' },
];

export default function RoastLevelSelector({ roastLevel, onChange }) {
  return (
    <div className="space-y-4">
      <label className="block text-lg font-medium text-center mb-4">Select Roast Intensity</label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {ROAST_LEVELS.map((level) => (
          <button
            key={level.id}
            onClick={() => onChange(level.id)}
            className={`
              p-4 rounded-lg text-left transition-all
              ${roastLevel === level.id
                ? 'bg-orange-500 text-white ring-2 ring-orange-400 ring-offset-2 ring-offset-gray-900'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }
            `}
          >
            <div className="font-semibold mb-1 text-lg">{level.name}</div>
            <div className="text-sm opacity-80">{level.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
} 
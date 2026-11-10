import React from 'react'

const DAY_MOODS = [
  { label: 'Enerjik', emoji: '⚡' },
  { label: 'Odaklı', emoji: '🎯' },
  { label: 'Huzurlu', emoji: '🌿' },
  { label: 'Neşeli', emoji: '☀️' },
  { label: 'Yorgun', emoji: '🥱' },
]

const NIGHT_MOODS = [
  { label: 'Huzurlu', emoji: '🌙' },
  { label: 'Minnettar', emoji: '✨' },
  { label: 'Durgun', emoji: '🍵' },
  { label: 'Rahatlamış', emoji: '🪷' },
  { label: 'Uykulu', emoji: '😴' },
]

export default function MoodTracker({ currentMood, onSelect, isNight = false }) {
  const moods = isNight ? NIGHT_MOODS : DAY_MOODS

  return (
    <div
      className={`p-3 rounded-2xl border transition-all ${
        isNight
          ? 'bg-slate-900/50 border-slate-800'
          : 'bg-white/70 border-amber-900/10 shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-semibold ${isNight ? 'text-slate-200' : 'text-stone-800'}`}>
          {isNight ? 'Gece Ruh Hali' : 'Günün Modu / Hissiyatı'}
        </span>
        <span className={`text-[11px] font-medium ${isNight ? 'text-indigo-300' : 'text-amber-800'}`}>
          Seçilen: {currentMood || 'Belirtilmedi'}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {moods.map((m) => {
          const isSelected = currentMood === m.label
          return (
            <button
              key={m.label}
              type="button"
              onClick={() => onSelect(m.label)}
              className={`px-2.5 py-1 text-xs rounded-xl flex items-center gap-1.5 font-medium transition-all duration-150 active:scale-95 ${
                isSelected
                  ? isNight
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/40 ring-2 ring-indigo-400/40'
                    : 'bg-amber-600 text-white shadow-sm shadow-amber-600/30 ring-2 ring-amber-400/40'
                  : isNight
                    ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80 border border-stone-200/60'
              }`}
            >
              <span className="text-sm">{m.emoji}</span>
              <span>{m.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

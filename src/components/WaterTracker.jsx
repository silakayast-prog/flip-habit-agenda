import React from 'react'
import { Droplet } from 'lucide-react'

export default function WaterTracker({ glasses = 0, onChange, isNight = false, maxGlasses = 8 }) {
  const targetLiter = (maxGlasses * 0.25).toFixed(1)
  const currentLiter = (glasses * 0.25).toFixed(1)

  const handleToggle = (index) => {
    // If clicking on the current count, decrement by 1, otherwise set to clicked index + 1
    if (index + 1 === glasses) {
      onChange(glasses - 1)
    } else {
      onChange(index + 1)
    }
  }

  return (
    <div
      className={`p-3 rounded-2xl border transition-all ${
        isNight
          ? 'bg-slate-900/50 border-slate-800'
          : 'bg-white/70 border-amber-900/10 shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Droplet
            className={`w-4 h-4 ${isNight ? 'text-cyan-400 fill-cyan-400/30' : 'text-blue-500 fill-blue-500/20'}`}
          />
          <span className={`text-xs font-semibold ${isNight ? 'text-slate-200' : 'text-stone-800'}`}>
            Günlük Su Takibi
          </span>
        </div>
        <span className={`text-[11px] font-medium ${isNight ? 'text-cyan-300' : 'text-blue-700'}`}>
          {currentLiter}L / {targetLiter}L ({glasses}/{maxGlasses} bardak)
        </span>
      </div>

      <div className="grid grid-cols-8 gap-1.5">
        {Array.from({ length: maxGlasses }).map((_, i) => {
          const isFilled = i < glasses
          return (
            <button
              key={i}
              type="button"
              onClick={() => handleToggle(i)}
              title={`${i + 1}. bardak`}
              className={`h-8 rounded-lg flex flex-col items-center justify-center transition-all duration-200 transform active:scale-90 ${
                isFilled
                  ? isNight
                    ? 'bg-gradient-to-t from-cyan-600 to-cyan-400 text-white shadow-sm shadow-cyan-500/30'
                    : 'bg-gradient-to-t from-blue-500 to-sky-400 text-white shadow-sm shadow-blue-400/30'
                  : isNight
                    ? 'bg-slate-800/80 border border-slate-700 hover:border-cyan-600/50 text-slate-500'
                    : 'bg-stone-100 border border-stone-200 hover:border-blue-300 text-stone-400'
              }`}
            >
              <Droplet
                className={`w-3.5 h-3.5 ${
                  isFilled ? 'fill-white stroke-white' : 'stroke-current fill-transparent'
                }`}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

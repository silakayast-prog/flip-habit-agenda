import React from 'react'
import { Check, Trash2 } from 'lucide-react'

export default function HabitItem({ habit, onToggle, onDelete, isNight = false }) {
  return (
    <div
      className={`group flex items-center justify-between p-2.5 rounded-xl border transition-all duration-200 ${
        isNight
          ? habit.completed
            ? 'bg-indigo-950/40 border-indigo-800/40 text-indigo-300/70'
            : 'bg-slate-900/60 border-slate-800 hover:border-indigo-600/50 text-slate-200'
          : habit.completed
            ? 'bg-amber-100/60 border-amber-200/80 text-amber-900/60'
            : 'bg-white/80 border-amber-900/10 hover:border-amber-500/40 text-stone-800 shadow-sm'
      }`}
    >
      <button
        type="button"
        onClick={() => onToggle(habit.id)}
        className="flex items-center gap-3 text-left flex-1 min-w-0"
      >
        <span
          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
            habit.completed
              ? isNight
                ? 'bg-indigo-500 text-white shadow-sm shadow-indigo-500/30'
                : 'bg-amber-600 text-white shadow-sm shadow-amber-600/30'
              : isNight
                ? 'border-2 border-slate-700 group-hover:border-indigo-400 bg-slate-800/50'
                : 'border-2 border-amber-900/25 group-hover:border-amber-600 bg-amber-50/50'
          }`}
        >
          {habit.completed && <Check className="w-4 h-4 stroke-[3]" />}
        </span>
        <span
          className={`text-sm font-medium tracking-tight truncate select-none ${
            habit.completed ? 'line-through opacity-70' : ''
          }`}
        >
          {habit.text}
        </span>
      </button>

      {habit.category && (
        <span
          className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full mr-1.5 flex-shrink-0 transition-opacity ${
            isNight
              ? 'bg-slate-800 text-indigo-300'
              : 'bg-amber-100 text-amber-800'
          } ${habit.completed ? 'opacity-40' : 'opacity-80'}`}
        >
          {habit.category}
        </span>
      )}

      <button
        type="button"
        title="Alışkanlığı sil"
        onClick={() => onDelete(habit.id)}
        className={`opacity-0 group-hover:opacity-100 p-1.5 rounded-lg transition-all duration-150 flex-shrink-0 ${
          isNight
            ? 'hover:bg-red-950/60 text-slate-400 hover:text-red-400'
            : 'hover:bg-red-50 text-stone-400 hover:text-red-600'
        }`}
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

import React, { useState } from 'react'
import HabitItem from './HabitItem'
import { Plus, CheckCircle2, Sparkles } from 'lucide-react'

export default function HabitList({
  habits,
  onToggle,
  onDelete,
  onAdd,
  isNight = false,
  title = "Alışkanlıklar",
  subtitle = "Günlük rutininizi tamamlayın"
}) {
  const [newText, setNewText] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const completedCount = habits.filter(h => h.completed).length
  const totalCount = habits.length
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const handleAddSubmit = (e) => {
    e.preventDefault()
    if (!newText.trim()) return
    onAdd({
      text: newText.trim(),
      category: newCategory.trim() || (isNight ? 'Gece' : 'Gündüz'),
    })
    setNewText('')
    setNewCategory('')
    setIsAdding(false)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header & Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <div>
            <h3 className={`text-base font-bold tracking-tight ${isNight ? 'text-white' : 'text-stone-900'}`}>
              {title}
            </h3>
            <p className={`text-xs ${isNight ? 'text-slate-400' : 'text-stone-500'}`}>
              {subtitle}
            </p>
          </div>
          <div className="text-right">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
              percent === 100
                ? isNight
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : isNight
                  ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-800/50'
                  : 'bg-amber-100/80 text-amber-900 border border-amber-300/60'
            }`}>
              {percent === 100 && <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400 animate-pulse" />}
              %{percent}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`w-full h-1.5 rounded-full overflow-hidden ${isNight ? 'bg-slate-800' : 'bg-stone-200'}`}>
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              percent === 100
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                : isNight
                  ? 'bg-gradient-to-r from-indigo-500 to-violet-500'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500'
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Habit Items */}
      <div className="space-y-2 flex-1 overflow-y-auto pr-1">
        {habits.map((habit) => (
          <HabitItem
            key={habit.id}
            habit={habit}
            onToggle={onToggle}
            onDelete={onDelete}
            isNight={isNight}
          />
        ))}

        {habits.length === 0 && (
          <div className={`text-center py-6 border border-dashed rounded-xl ${
            isNight ? 'border-slate-800 text-slate-500' : 'border-stone-300 text-stone-400'
          }`}>
            <p className="text-xs">Henüz alışkanlık eklenmedi.</p>
          </div>
        )}
      </div>

      {/* Add Habit Form / Button */}
      <div className="mt-3 pt-3 border-t border-dashed border-stone-200 dark:border-slate-800/80">
        {isAdding ? (
          <form onSubmit={handleAddSubmit} className="space-y-2">
            <input
              type="text"
              autoFocus
              placeholder="Yeni alışkanlık adı..."
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className={`w-full px-3 py-1.5 text-xs rounded-lg border outline-none transition ${
                isNight
                  ? 'bg-slate-900 border-indigo-700/50 text-white placeholder-slate-500 focus:border-indigo-400'
                  : 'bg-white border-amber-300 text-stone-900 placeholder-stone-400 focus:border-amber-600'
              }`}
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Kategori (örn: Sağlık)"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className={`w-1/2 px-2.5 py-1 text-[11px] rounded-lg border outline-none ${
                  isNight
                    ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                    : 'bg-white border-stone-300 text-stone-800 placeholder-stone-400'
                }`}
              />
              <div className="flex-1 flex gap-1 justify-end">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className={`px-2.5 py-1 text-xs rounded-lg ${
                    isNight ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-stone-200 text-stone-600'
                  }`}
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={!newText.trim()}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg text-white transition disabled:opacity-50 ${
                    isNight ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-amber-600 hover:bg-amber-700'
                  }`}
                >
                  Ekle
                </button>
              </div>
            </div>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className={`w-full py-2 px-3 rounded-xl border border-dashed flex items-center justify-center gap-1.5 text-xs font-medium transition-all ${
              isNight
                ? 'border-indigo-900/60 hover:border-indigo-500 hover:bg-indigo-950/30 text-indigo-300'
                : 'border-amber-900/20 hover:border-amber-600 hover:bg-amber-100/40 text-amber-800'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            Yeni Alışkanlık Ekle
          </button>
        )}
      </div>
    </div>
  )
}

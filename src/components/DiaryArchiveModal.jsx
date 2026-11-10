import React, { useState } from 'react'
import { BookOpen, Calendar, X, ChevronRight, FileText, CheckCircle2 } from 'lucide-react'
import { listSavedDiaryEntries, formatDateTitle, getTodayKey } from '../utils/storage'

export default function DiaryArchiveModal({ isOpen, onClose, onSelectDate, currentDateKey, isNight }) {
  const [customDate, setCustomDate] = useState('')
  if (!isOpen) return null

  const entries = listSavedDiaryEntries()
  const todayKey = getTodayKey()

  const handleCustomDateSubmit = (e) => {
    e.preventDefault()
    if (customDate) {
      onSelectDate(customDate)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full max-w-lg rounded-3xl p-6 shadow-2xl border ${
          isNight
            ? 'bg-slate-900 border-slate-800 text-white shadow-black/80'
            : 'bg-[#FCFBF7] border-amber-900/15 text-stone-900 shadow-stone-900/30'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                isNight ? 'bg-indigo-600 text-white' : 'bg-amber-600 text-white'
              }`}
            >
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">Günlük Sayfaları & Arşiv</h2>
              <p className={`text-xs ${isNight ? 'text-slate-400' : 'text-stone-500'}`}>
                Geçmiş ve gelecek ajanda yaprakları arasında gezinin
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`p-2 rounded-xl transition ${
              isNight ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-stone-200 text-stone-600'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Date Picker Form */}
        <form onSubmit={handleCustomDateSubmit} className="mb-4">
          <label className={`block text-xs font-semibold mb-1.5 ${isNight ? 'text-slate-300' : 'text-stone-700'}`}>
            Tarihe Göre Sayfa Aç:
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className={`flex-1 px-3 py-2 text-xs rounded-xl border outline-none ${
                isNight
                  ? 'bg-slate-950 border-slate-700 text-white'
                  : 'bg-white border-stone-300 text-stone-900'
              }`}
            />
            <button
              type="submit"
              disabled={!customDate}
              className={`px-4 py-2 text-xs font-bold rounded-xl text-white transition disabled:opacity-50 ${
                isNight ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-amber-600 hover:bg-amber-700'
              }`}
            >
              Sayfayı Aç
            </button>
          </div>
        </form>

        {/* List of Saved Diary Pages */}
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${isNight ? 'text-slate-500' : 'text-stone-400'}`}>
            Kayıtlı Günler ({entries.length})
          </p>

          {entries.map((entry) => {
            const isSelected = entry.dateKey === currentDateKey
            const isToday = entry.dateKey === todayKey

            return (
              <button
                key={entry.dateKey}
                type="button"
                onClick={() => {
                  onSelectDate(entry.dateKey)
                  onClose()
                }}
                className={`w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? isNight
                      ? 'bg-indigo-950/70 border-indigo-500 text-white ring-1 ring-indigo-500'
                      : 'bg-amber-50 border-amber-500 text-amber-950 ring-1 ring-amber-500'
                    : isNight
                      ? 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-200'
                      : 'bg-white border-stone-200 hover:border-amber-300 text-stone-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 opacity-60 flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold">{entry.title}</span>
                      {isToday && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-emerald-500">
                          Bugün
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-[11px] opacity-70">
                      {(entry.hasDayNote || entry.hasNightNote) && (
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3 text-amber-500" />
                          Günlük Notu Var
                        </span>
                      )}
                      <span>
                        {entry.completedHabits}/{entry.totalHabits} Alışkanlık
                      </span>
                    </div>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 opacity-40 flex-shrink-0" />
              </button>
            )
          })}

          {entries.length === 0 && (
            <div className="text-center py-8 text-xs opacity-50">
              Henüz kaydedilmiş başka bir gün sayfası bulunamadı.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

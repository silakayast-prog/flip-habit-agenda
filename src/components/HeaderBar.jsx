import React from 'react'
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  BookOpen,
  BookMarked,
} from 'lucide-react'
import { formatDateTitle, getAdjacentDate, getTodayKey } from '../utils/storage'

export default function HeaderBar({
  dateKey,
  onDateChange,
  mode, // 'day' | 'night'
  onModeToggle,
  soundEnabled,
  onSoundToggle,
  onOpenArchive,
}) {
  const isToday = dateKey === getTodayKey()
  const isNight = mode === 'night'

  const handlePrevDay = () => {
    onDateChange(getAdjacentDate(dateKey, -1))
  }

  const handleNextDay = () => {
    onDateChange(getAdjacentDate(dateKey, 1))
  }

  const handleGoToday = () => {
    onDateChange(getTodayKey())
  }

  return (
    <header className="w-full max-w-6xl mx-auto mb-3 px-2">
      <div
        className={`rounded-2xl p-3 border transition-colors duration-300 flex flex-wrap items-center justify-between gap-3 shadow-lg ${
          isNight
            ? 'bg-slate-900/90 border-slate-800 text-white backdrop-blur-md shadow-black/40'
            : 'bg-white/90 border-amber-900/10 text-stone-800 backdrop-blur-md shadow-amber-950/5'
        }`}
      >
        {/* Brand / Title */}
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              isNight
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                : 'bg-amber-600 text-white shadow-md shadow-amber-500/30'
            }`}
          >
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight leading-none">
              Alışkanlık & Yaşam Günlüğü
            </h1>
            <p className={`text-[11px] mt-0.5 ${isNight ? 'text-slate-400' : 'text-stone-500'}`}>
              Sayfaları Çevrilebilir Dijital Ajanda
            </p>
          </div>
        </div>

        {/* Date Selector & Diary Page Flip Controls */}
        <div className="flex items-center gap-1.5 order-3 sm:order-2">
          <button
            type="button"
            onClick={handlePrevDay}
            title="Önceki Güne Çevir (Dün)"
            className={`p-1.5 rounded-xl border transition ${
              isNight
                ? 'border-slate-800 hover:bg-slate-800 text-slate-300'
                : 'border-stone-200 hover:bg-stone-100 text-stone-700'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onOpenArchive}
            title="Günlük Arşivi ve Takvimden Tarih Seç"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
              isNight
                ? 'bg-slate-950/60 border-slate-800 hover:border-indigo-500 text-indigo-200'
                : 'bg-stone-50 border-stone-200 hover:border-amber-400 text-stone-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 opacity-70" />
            <span>{formatDateTitle(dateKey)}</span>
          </button>

          <button
            type="button"
            onClick={handleNextDay}
            title="Sonraki Güne Çevir (Yarın)"
            className={`p-1.5 rounded-xl border transition ${
              isNight
                ? 'border-slate-800 hover:bg-slate-800 text-slate-300'
                : 'border-stone-200 hover:bg-stone-100 text-stone-700'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {!isToday && (
            <button
              type="button"
              onClick={handleGoToday}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-xl transition ${
                isNight
                  ? 'bg-indigo-900/60 text-indigo-300 hover:bg-indigo-900 border border-indigo-700/50'
                  : 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
              }`}
            >
              Bugün
            </button>
          )}

          {/* Diary Archive Button */}
          <button
            type="button"
            onClick={onOpenArchive}
            title="Günlük Arşivi"
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-xl border transition ${
              isNight
                ? 'border-slate-800 hover:bg-slate-800 text-slate-300'
                : 'border-stone-200 hover:bg-stone-100 text-stone-700'
            }`}
          >
            <BookMarked className="w-3.5 h-3.5 text-emerald-500" />
            <span>Arşiv</span>
          </button>
        </div>

        {/* Right Actions: Mode Switcher, Sound */}
        <div className="flex items-center gap-2.5 order-2 sm:order-3">
          {/* Day / Night Agenda Mode Switcher Toggle */}
          <div
            className={`p-1 rounded-2xl flex items-center border transition-all ${
              isNight ? 'bg-slate-950 border-slate-800' : 'bg-stone-100 border-stone-200'
            }`}
          >
            <button
              type="button"
              onClick={() => onModeToggle('day')}
              className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all duration-200 ${
                mode === 'day'
                  ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
                  : isNight
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Gündüz</span>
            </button>
            <button
              type="button"
              onClick={() => onModeToggle('night')}
              className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all duration-200 ${
                mode === 'night'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/40'
                  : isNight
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Gece</span>
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={onSoundToggle}
            title={soundEnabled ? 'Sayfa çevirme sesini kapat' : 'Sayfa sesini aç'}
            className={`p-2 rounded-xl border transition ${
              isNight
                ? 'border-slate-800 hover:bg-slate-800 text-slate-300'
                : 'border-stone-200 hover:bg-stone-100 text-stone-700'
            }`}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-500" />
            ) : (
              <VolumeX className="w-4 h-4 text-stone-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

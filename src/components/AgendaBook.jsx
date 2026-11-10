import React, { useState } from 'react'
import DayPage from './DayPage'
import NightPage from './NightPage'
import {
  Sun,
  Moon,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Calendar,
  BookMarked,
  Sparkles,
} from 'lucide-react'
import {
  formatDateTitle,
  getAdjacentDate,
  getDayOfYear,
  formatShortDate,
} from '../utils/storage'

export default function AgendaBook({
  dateKey,
  onDateChange,
  mode, // 'day' | 'night'
  onModeChange,
  data,
  onDayHabitsChange,
  onNightHabitsChange,
  onDayNoteChange,
  onNightNoteChange,
  onWaterChange,
  onDayMoodChange,
  onNightMoodChange,
  onFlipTrigger,
  onOpenArchive,
}) {
  // 'idle' | 'turning-forward-out' | 'turning-forward-in' | 'turning-backward-out' | 'turning-backward-in'
  const [flipState, setFlipState] = useState('idle')
  const isNight = mode === 'night'

  const dayOfYear = getDayOfYear(dateKey)
  const prevDateKey = getAdjacentDate(dateKey, -1)
  const nextDateKey = getAdjacentDate(dateKey, 1)

  // Turn page to previous or next day like a physical diary
  const handleTurnDay = (direction) => {
    if (flipState !== 'idle') return

    if (onFlipTrigger) onFlipTrigger()

    if (direction === 'forward') {
      setFlipState('turning-forward-out')
      setTimeout(() => {
        onDateChange(nextDateKey)
        setFlipState('turning-forward-in')
      }, 260)
      setTimeout(() => {
        setFlipState('idle')
      }, 540)
    } else {
      setFlipState('turning-backward-out')
      setTimeout(() => {
        onDateChange(prevDateKey)
        setFlipState('turning-backward-in')
      }, 260)
      setTimeout(() => {
        setFlipState('idle')
      }, 540)
    }
  }

  // Turn page between Day and Night
  const handleTurnMode = (targetMode) => {
    if (targetMode === mode || flipState !== 'idle') return

    if (onFlipTrigger) onFlipTrigger()

    // Flip forward if switching day -> night, flip backward if night -> day
    const isForward = targetMode === 'night'
    setFlipState(isForward ? 'turning-forward-out' : 'turning-backward-out')

    setTimeout(() => {
      onModeChange(targetMode)
      setFlipState(isForward ? 'turning-forward-in' : 'turning-backward-in')
    }, 260)

    setTimeout(() => {
      setFlipState('idle')
    }, 540)
  }

  // Determine active CSS animation class
  let animationClass = ''
  if (flipState === 'turning-forward-out') animationClass = 'page-turn-forward-out'
  else if (flipState === 'turning-forward-in') animationClass = 'page-turn-forward-in'
  else if (flipState === 'turning-backward-out') animationClass = 'page-turn-backward-out'
  else if (flipState === 'turning-backward-in') animationClass = 'page-turn-backward-in'

  return (
    <div className="relative w-full max-w-6xl mx-auto perspective-1000 my-2 px-1 sm:px-4">
      {/* Side Bookmark Tabs (Index Tabs on the right edge) */}
      <div className="absolute -right-2 sm:-right-4 top-20 z-30 flex flex-col gap-2">
        {/* Day Tab */}
        <button
          type="button"
          disabled={flipState !== 'idle'}
          onClick={() => handleTurnMode('day')}
          title="Gündüz Sayfasına Çevir"
          className={`group flex items-center gap-1.5 px-3 py-2.5 rounded-r-2xl font-bold text-xs shadow-lg transition-all duration-300 transform ${
            mode === 'day'
              ? 'bg-amber-500 text-white translate-x-1 ring-2 ring-amber-300/60 shadow-amber-500/40'
              : 'bg-stone-300 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:translate-x-1 hover:bg-amber-400 hover:text-white opacity-90'
          } ${flipState !== 'idle' ? 'pointer-events-none' : ''}`}
        >
          <Sun className="w-4 h-4 transition-transform group-hover:rotate-45" />
          <span className="hidden md:inline font-mono tracking-wider">GÜNDÜZ</span>
        </button>

        {/* Night Tab */}
        <button
          type="button"
          disabled={flipState !== 'idle'}
          onClick={() => handleTurnMode('night')}
          title="Gece Sayfasına Çevir"
          className={`group flex items-center gap-1.5 px-3 py-2.5 rounded-r-2xl font-bold text-xs shadow-lg transition-all duration-300 transform ${
            mode === 'night'
              ? 'bg-indigo-600 text-white translate-x-1 ring-2 ring-indigo-400/60 shadow-indigo-600/40'
              : 'bg-stone-300 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:translate-x-1 hover:bg-indigo-500 hover:text-white opacity-90'
          } ${flipState !== 'idle' ? 'pointer-events-none' : ''}`}
        >
          <Moon className="w-4 h-4 transition-transform group-hover:-rotate-12" />
          <span className="hidden md:inline font-mono tracking-wider">GECE</span>
        </button>

        {/* Diary Archive Quick Tab */}
        <button
          type="button"
          onClick={onOpenArchive}
          title="Tüm Günlük Sayfaları / Arşiv"
          className="group flex items-center gap-1.5 px-3 py-2.5 rounded-r-2xl font-bold text-xs shadow-lg transition-all duration-300 transform bg-emerald-600 hover:bg-emerald-500 text-white hover:translate-x-1 opacity-90"
        >
          <BookMarked className="w-4 h-4" />
          <span className="hidden md:inline font-mono tracking-wider">ARŞİV</span>
        </button>
      </div>

      {/* Main Agenda Outer Cover / Binder */}
      <div
        className={`relative rounded-3xl p-3 sm:p-6 transition-all duration-500 shadow-2xl border-4 ${
          isNight
            ? 'bg-[#0B101E] border-[#1C2640] shadow-black/80'
            : 'bg-[#2C221E] border-[#44352E] shadow-stone-900/60'
        }`}
        style={{
          boxShadow: isNight
            ? '0 25px 60px -15px rgba(0, 0, 0, 0.9), inset 0 2px 4px rgba(255, 255, 255, 0.05)'
            : '0 25px 60px -15px rgba(20, 15, 10, 0.7), inset 0 2px 4px rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Agenda Spine / Ring Binder Simulation */}
        <div className="absolute left-6 right-6 top-2 h-1.5 rounded-full bg-white/5 opacity-50 pointer-events-none" />

        {/* The Page Container with Realistic Turning Animation */}
        <div
          className={`relative rounded-2xl min-h-[620px] p-4 sm:p-7 transition-colors duration-300 flex flex-col justify-between ${
            isNight
              ? 'bg-[#0F1523] text-slate-100 border border-indigo-900/40 shadow-inner'
              : 'bg-[#FCFBF7] text-stone-900 border border-stone-200/80 shadow-md'
          } ${animationClass}`}
        >
          {/* Subtle Page Bookmark Ribbon in top corner */}
          <div
            className={`absolute top-0 right-14 w-6 h-10 rounded-b-md shadow-md pointer-events-none z-20 ${
              isNight ? 'bg-indigo-500/80' : 'bg-red-500/80'
            }`}
          />

          {/* Authentic Diary Header: Date, Page Number, and Day Navigator */}
          <div className="flex flex-wrap items-center justify-between pb-3 mb-3 border-b border-dashed border-stone-300 dark:border-slate-800 text-xs">
            {/* Left: Full Date & Day Number */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 opacity-70" />
              <span className="font-bold tracking-tight text-sm">
                {formatDateTitle(dateKey)}
              </span>
              <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] ${
                isNight ? 'bg-slate-800 text-indigo-300' : 'bg-stone-200 text-stone-700'
              }`}>
                Yılın {dayOfYear}. Günü
              </span>
            </div>

            {/* Center: Flip to Yesterday / Tomorrow quick buttons */}
            <div className="flex items-center gap-1.5 my-1 sm:my-0">
              <button
                type="button"
                disabled={flipState !== 'idle'}
                onClick={() => handleTurnDay('backward')}
                title={`Önceki Güne Çevir (${formatShortDate(prevDateKey)})`}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
                  isNight
                    ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                    : 'border-stone-200 hover:bg-stone-100 text-stone-700'
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>{formatShortDate(prevDateKey)}</span>
              </button>

              <button
                type="button"
                onClick={onOpenArchive}
                title="Tüm günleri gör"
                className={`px-2 py-1 rounded-lg text-xs font-bold border transition ${
                  isNight
                    ? 'border-indigo-800 bg-indigo-950/40 text-indigo-300 hover:bg-indigo-900/60'
                    : 'border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100'
                }`}
              >
                Günlük Sayfaları
              </button>

              <button
                type="button"
                disabled={flipState !== 'idle'}
                onClick={() => handleTurnDay('forward')}
                title={`Sonraki Güne Çevir (${formatShortDate(nextDateKey)})`}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
                  isNight
                    ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                    : 'border-stone-200 hover:bg-stone-100 text-stone-700'
                }`}
              >
                <span>{formatShortDate(nextDateKey)}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right: Page Number */}
            <div className="font-mono text-xs opacity-60">
              Sayfa #{dayOfYear}
            </div>
          </div>

          {/* Active Page View (Day / Night) */}
          <div className="flex-1 min-h-0">
            {mode === 'day' ? (
              <DayPage
                data={data}
                onHabitsChange={onDayHabitsChange}
                onNoteChange={onDayNoteChange}
                onWaterChange={onWaterChange}
                onMoodChange={onDayMoodChange}
              />
            ) : (
              <NightPage
                data={data}
                onHabitsChange={onNightHabitsChange}
                onNoteChange={onNightNoteChange}
                onMoodChange={onNightMoodChange}
              />
            )}
          </div>

          {/* Diary Page Footers with Interactive Corner Turns */}
          <div className="mt-4 pt-3 border-t border-dashed border-stone-200 dark:border-slate-800 flex items-center justify-between text-xs select-none">
            {/* Bottom Left Corner: Turn to Yesterday */}
            <button
              type="button"
              disabled={flipState !== 'idle'}
              onClick={() => handleTurnDay('backward')}
              title="Önceki Güne Çevir"
              className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all transform active:scale-95 ${
                isNight
                  ? 'border-slate-800 hover:border-indigo-500 hover:bg-indigo-950/40 text-slate-300'
                  : 'border-stone-200 hover:border-amber-500 hover:bg-amber-50 text-stone-700'
              } ${flipState !== 'idle' ? 'opacity-40 pointer-events-none' : ''}`}
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium text-[11px]">
                Önceki Gün ({formatShortDate(prevDateKey)})
              </span>
            </button>

            {/* Middle: Mode Switch shortcut button */}
            <button
              type="button"
              disabled={flipState !== 'idle'}
              onClick={() => handleTurnMode(isNight ? 'day' : 'night')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-bold border transition ${
                isNight
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
                  : 'bg-indigo-50 border-indigo-200 text-indigo-900 hover:bg-indigo-100'
              }`}
            >
              {isNight ? (
                <>
                  <Sun className="w-3 h-3 text-amber-400" />
                  <span>Gündüz Rutinine Çevir</span>
                </>
              ) : (
                <>
                  <Moon className="w-3 h-3 text-indigo-500" />
                  <span>Gece Rutinine Çevir</span>
                </>
              )}
            </button>

            {/* Bottom Right Corner: Turn to Tomorrow (with dog-ear / corner curl styling) */}
            <button
              type="button"
              disabled={flipState !== 'idle'}
              onClick={() => handleTurnDay('forward')}
              title="Sonraki Günün Sayfasını Çevir"
              className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all transform active:scale-95 ${
                isNight
                  ? 'border-slate-800 hover:border-indigo-500 hover:bg-indigo-950/40 text-slate-300'
                  : 'border-stone-200 hover:border-amber-500 hover:bg-amber-50 text-stone-700'
              } ${flipState !== 'idle' ? 'opacity-40 pointer-events-none' : ''}`}
            >
              <span className="font-medium text-[11px]">
                Sonraki Gün ({formatShortDate(nextDateKey)})
              </span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

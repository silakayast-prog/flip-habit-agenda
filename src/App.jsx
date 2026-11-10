import React, { useState, useEffect, useCallback } from 'react'
import confetti from 'canvas-confetti'
import HeaderBar from './components/HeaderBar'
import AgendaBook from './components/AgendaBook'
import DiaryArchiveModal from './components/DiaryArchiveModal'
import { loadDayData, saveDayData, getTodayKey, getAdjacentDate } from './utils/storage'
import { playPageFlipSound, playCheckSound } from './utils/sound'

export default function App() {
  const [dateKey, setDateKey] = useState(() => getTodayKey())
  const [isArchiveOpen, setIsArchiveOpen] = useState(false)
  
  // Auto-detect mode based on current time or default to 'day'
  const [mode, setMode] = useState(() => {
    const currentHour = new Date().getHours()
    return currentHour >= 20 || currentHour < 6 ? 'night' : 'day'
  })

  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('habit_agenda_sound')
    return saved !== null ? saved === 'true' : true
  })

  const [dayData, setDayData] = useState(() => loadDayData(getTodayKey()))

  // When date changes, load that date's data
  useEffect(() => {
    const loaded = loadDayData(dateKey)
    setDayData(loaded)
  }, [dateKey])

  // Save changes to localStorage
  const updateData = useCallback(
    (updater) => {
      setDayData((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }
        saveDayData(dateKey, next)
        return next
      })
    },
    [dateKey]
  )

  const handleSoundToggle = () => {
    setSoundEnabled((prev) => {
      const next = !prev
      localStorage.setItem('habit_agenda_sound', String(next))
      return next
    })
  }

  const handleFlipSound = useCallback(() => {
    playPageFlipSound(soundEnabled)
  }, [soundEnabled])

  const handleModeChange = (newMode) => {
    if (newMode !== mode) {
      handleFlipSound()
      setMode(newMode)
    }
  }

  const handleDateChange = (newDate) => {
    if (newDate !== dateKey) {
      handleFlipSound()
      setDateKey(newDate)
    }
  }

  // Habits updates
  const handleDayHabitsChange = (newHabits, toggledId) => {
    if (toggledId) {
      const toggled = newHabits.find((h) => h.id === toggledId)
      if (toggled?.completed) {
        playCheckSound(soundEnabled)
        const allCompleted = newHabits.every((h) => h.completed)
        if (allCompleted) {
          triggerCelebration()
        }
      }
    }
    updateData({ dayHabits: newHabits })
  }

  const handleNightHabitsChange = (newHabits, toggledId) => {
    if (toggledId) {
      const toggled = newHabits.find((h) => h.id === toggledId)
      if (toggled?.completed) {
        playCheckSound(soundEnabled)
        const allCompleted = newHabits.every((h) => h.completed)
        if (allCompleted) {
          triggerCelebration()
        }
      }
    }
    updateData({ nightHabits: newHabits })
  }

  // Celebration confetti
  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
        colors: mode === 'day' ? ['#f59e0b', '#d97706', '#fbbf24', '#10b981'] : ['#6366f1', '#818cf8', '#a855f7', '#38bdf8'],
      })
    } catch (e) {
      console.warn('Confetti error', e)
    }
  }

  // Global keyboard shortcuts (when not focused in textarea/input)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['TEXTAREA', 'INPUT'].includes(document.activeElement?.tagName)) {
        return
      }
      if (e.key === 'ArrowRight') {
        // Turn to next day
        handleDateChange(getAdjacentDate(dateKey, 1))
      } else if (e.key === 'ArrowLeft') {
        // Turn to previous day
        handleDateChange(getAdjacentDate(dateKey, -1))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dateKey, handleFlipSound])

  const isNight = mode === 'night'

  return (
    <div
      className={`min-h-screen py-4 px-2 sm:px-6 transition-colors duration-700 flex flex-col justify-between ${
        isNight
          ? 'bg-gradient-to-b from-[#070A12] via-[#0C1222] to-[#080B14] text-slate-100'
          : 'bg-gradient-to-b from-[#EFEAE1] via-[#F5F2EB] to-[#EAE4D8] text-stone-900'
      }`}
    >
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {isNight ? (
          <>
            <div className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
          </>
        ) : (
          <>
            <div className="absolute top-10 right-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-orange-300/10 rounded-full blur-3xl" />
          </>
        )}
      </div>

      <div className="relative z-10 flex flex-col items-center flex-1">
        {/* Top Header Bar */}
        <HeaderBar
          dateKey={dateKey}
          onDateChange={handleDateChange}
          mode={mode}
          onModeToggle={handleModeChange}
          soundEnabled={soundEnabled}
          onSoundToggle={handleSoundToggle}
          onOpenArchive={() => setIsArchiveOpen(true)}
        />

        {/* 3D Flippable Agenda / Diary Book */}
        <AgendaBook
          dateKey={dateKey}
          onDateChange={setDateKey}
          mode={mode}
          onModeChange={setMode}
          data={dayData}
          onDayHabitsChange={handleDayHabitsChange}
          onNightHabitsChange={handleNightHabitsChange}
          onDayNoteChange={(text) => updateData({ dayNote: text })}
          onNightNoteChange={(text) => updateData({ nightNote: text })}
          onWaterChange={(glasses) => updateData({ waterGlasses: glasses })}
          onDayMoodChange={(mood) => updateData({ dayMood: mood })}
          onNightMoodChange={(mood) => updateData({ nightMood: mood })}
          onFlipTrigger={handleFlipSound}
          onOpenArchive={() => setIsArchiveOpen(true)}
        />
      </div>

      {/* Diary Archive & Calendar Modal */}
      <DiaryArchiveModal
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        onSelectDate={handleDateChange}
        currentDateKey={dateKey}
        isNight={isNight}
      />

      {/* Footer credits and keyboard guide */}
      <footer className="relative z-10 text-center py-2.5 text-[11px] opacity-60 flex flex-wrap items-center justify-center gap-3">
        <span>📖 Günlük Ajandası: Sol (←) ve Sağ (→) ok tuşları ile gün sayfalarını çevirebilirsiniz.</span>
        <span>•</span>
        <span>Her günün ayrı gündüz/gece notları ve alışkanlıkları bulunur.</span>
      </footer>
    </div>
  )
}

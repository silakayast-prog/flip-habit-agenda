import React from 'react'
import HabitList from './HabitList'
import MoodTracker from './MoodTracker'
import AgendaTextarea from './AgendaTextarea'
import { Moon, Stars, BedDouble } from 'lucide-react'

export default function NightPage({
  data,
  onHabitsChange,
  onNoteChange,
  onMoodChange,
}) {
  const handleToggleHabit = (id) => {
    const updated = data.nightHabits.map((h) =>
      h.id === id ? { ...h, completed: !h.completed } : h
    )
    onHabitsChange(updated, id)
  }

  const handleDeleteHabit = (id) => {
    const updated = data.nightHabits.filter((h) => h.id !== id)
    onHabitsChange(updated)
  }

  const handleAddHabit = ({ text, category }) => {
    const newHabit = {
      id: `n_${Date.now()}`,
      text,
      category,
      completed: false,
    }
    onHabitsChange([...data.nightHabits, newHabit])
  }

  return (
    <div className="h-full flex flex-col justify-between">
      {/* Page Header / Ribbon Banner */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-indigo-900/40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <Moon className="w-4 h-4 fill-white/20" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              Gece Ajandası
              <span className="text-xs font-normal text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-800">
                Gece Modu
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Günü huzurla kapat, zihnini sakinleştir ve şükranla dinlenmeye geç.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-indigo-300/80 italic font-serif">
          <Stars className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          "Huzurlu bir gece, verimli bir yarının anahtarıdır."
        </div>
      </div>

      {/* Grid: Left Column (Habits & Wind-down) + Right Column (Night Journal Writing) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-0">
        {/* Left Section: 5 cols */}
        <div className="lg:col-span-5 flex flex-col gap-4 overflow-y-auto pr-1">
          {/* Night Habits Card */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-inner flex-1">
            <HabitList
              habits={data.nightHabits}
              onToggle={handleToggleHabit}
              onDelete={handleDeleteHabit}
              onAdd={handleAddHabit}
              isNight={true}
              title="Gece & Uyku Rutinleri"
              subtitle="Günü kapatmadan önce tamamlanacaklar"
            />
          </div>

          {/* Night Mood Tracker */}
          <MoodTracker
            currentMood={data.nightMood}
            onSelect={onMoodChange}
            isNight={true}
          />

          {/* Wind-Down Suggestion Box */}
          <div className="p-3 rounded-2xl bg-indigo-950/40 border border-indigo-900/40 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-900/50 flex items-center justify-center text-indigo-300 flex-shrink-0">
              <BedDouble className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-indigo-200">
                Uykuya 45 Dakika Kala
              </p>
              <p className="text-[11px] text-slate-400 leading-tight">
                Mavi ışık filtresini açın, odayı havalandırın ve sıcak bir içecek eşliğinde son notlarınızı yazın.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: 7 cols (Night Agenda Writing) */}
        <div className="lg:col-span-7 flex flex-col min-h-[360px]">
          <AgendaTextarea
            value={data.nightNote}
            onChange={onNoteChange}
            isNight={true}
            title="Gece Yansımaları, Şükran Günlüğü & Günün Muhasebesi"
            placeholder="Bugün ne öğrendiniz? Hangi anlar sizi mutlu etti? Yarına taşımak istemediğiniz yükleri buraya bırakabilirsiniz..."
          />
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import HabitList from './HabitList'
import WaterTracker from './WaterTracker'
import MoodTracker from './MoodTracker'
import AgendaTextarea from './AgendaTextarea'
import { Sun, Sparkles } from 'lucide-react'

export default function DayPage({
  data,
  onHabitsChange,
  onNoteChange,
  onWaterChange,
  onMoodChange,
}) {
  const handleToggleHabit = (id) => {
    const updated = data.dayHabits.map((h) =>
      h.id === id ? { ...h, completed: !h.completed } : h
    )
    onHabitsChange(updated, id)
  }

  const handleDeleteHabit = (id) => {
    const updated = data.dayHabits.filter((h) => h.id !== id)
    onHabitsChange(updated)
  }

  const handleAddHabit = ({ text, category }) => {
    const newHabit = {
      id: `d_${Date.now()}`,
      text,
      category,
      completed: false,
    }
    onHabitsChange([...data.dayHabits, newHabit])
  }

  return (
    <div className="h-full flex flex-col justify-between">
      {/* Page Header / Ribbon Banner */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-900/15">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
            <Sun className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-900 tracking-tight flex items-center gap-2">
              Gündüz Ajandası
              <span className="text-xs font-normal text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-200">
                Gündüz Modu
              </span>
            </h2>
            <p className="text-xs text-stone-600">
              Enerjini yükselt, alışkanlıklarını tamamla ve hedeflerine odaklan.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-amber-900/70 italic font-serif">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          "Bugün, dünden daha iyi bir gün olacak."
        </div>
      </div>

      {/* Grid: Left Column (Habits & Health) + Right Column (Agenda Writing) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-0">
        {/* Left Section: 5 cols */}
        <div className="lg:col-span-5 flex flex-col gap-4 overflow-y-auto pr-1">
          {/* Habits Card */}
          <div className="p-4 rounded-2xl bg-white/70 border border-amber-900/10 shadow-sm flex-1">
            <HabitList
              habits={data.dayHabits}
              onToggle={handleToggleHabit}
              onDelete={handleDeleteHabit}
              onAdd={handleAddHabit}
              isNight={false}
              title="Gündüz Alışkanlıkları"
              subtitle="Bugün tamamlanacak rutinler"
            />
          </div>

          {/* Water Tracker */}
          <WaterTracker
            glasses={data.waterGlasses}
            onChange={onWaterChange}
            isNight={false}
          />

          {/* Mood Tracker */}
          <MoodTracker
            currentMood={data.dayMood}
            onSelect={onMoodChange}
            isNight={false}
          />
        </div>

        {/* Right Section: 7 cols (Agenda Writing) */}
        <div className="lg:col-span-7 flex flex-col min-h-[360px]">
          <AgendaTextarea
            value={data.dayNote}
            onChange={onNoteChange}
            isNight={false}
            title="Günün Öncelikleri, Görevler & Notlar"
            placeholder="Bugünkü hedefleriniz, yapılacaklar listesi veya aklınıza gelen parlak fikirleri buraya yazabilirsiniz..."
          />
        </div>
      </div>
    </div>
  )
}

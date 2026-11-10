// Storage utility to manage daily habits, texts, and user preferences

const STORAGE_KEY_PREFIX = 'habit_agenda_'

export const DEFAULT_DAY_HABITS = [
  { id: 'd1', text: 'Güne 1 bardak ılık su ile başla', category: 'Sağlık', completed: false },
  { id: 'd2', text: '10 dk hafif esneme veya sabah yürüyüşü', category: 'Hareket', completed: false },
  { id: 'd3', text: 'Günün 3 öncelikli görevini netleştir', category: 'Odak', completed: false },
  { id: 'd4', text: '25 dk kesintisiz odaklı çalışma', category: 'Üretkenlik', completed: false },
  { id: 'd5', text: 'En az 20 sayfa kitap oku', category: 'Gelişim', completed: false },
]

export const DEFAULT_NIGHT_HABITS = [
  { id: 'n1', text: '22:00 Ekran detoksu & mavi ışığı kapat', category: 'Dinlenme', completed: false },
  { id: 'n2', text: 'Günün 3 şükran anını not et', category: 'Farkındalık', completed: false },
  { id: 'n3', text: 'Yarının kıyafetini ve masasını hazırla', category: 'Düzen', completed: false },
  { id: 'n4', text: 'Bitki çayı / sakinleştirici içecek', category: 'Huzur', completed: false },
  { id: 'n5', text: '23:00 Yatakta derin nefes & uykuya hazırlık', category: 'Uyku', completed: false },
]

export function getTodayKey() {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function formatDateTitle(dateString) {
  try {
    const [year, month, day] = dateString.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    return date.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateString
  }
}

export function formatShortDate(dateString) {
  try {
    const [year, month, day] = dateString.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
    })
  } catch {
    return dateString
  }
}

export function getDayOfYear(dateString) {
  try {
    const [year, month, day] = dateString.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    const start = new Date(date.getFullYear(), 0, 0)
    const diff = date - start
    const oneDay = 1000 * 60 * 60 * 24
    return Math.floor(diff / oneDay)
  } catch {
    return 1
  }
}

export function getAdjacentDate(dateString, offsetDays) {
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  date.setDate(date.getDate() + offsetDays)
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function loadDayData(dateKey) {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${dateKey}`)
    if (raw) {
      return JSON.parse(raw)
    }
  } catch (e) {
    console.error('LocalStorage read error:', e)
  }

  // Initial template
  return {
    date: dateKey,
    dayHabits: DEFAULT_DAY_HABITS.map(h => ({ ...h })),
    nightHabits: DEFAULT_NIGHT_HABITS.map(h => ({ ...h })),
    dayNote: '☀️ Günün Öncelikli Hedefleri:\n1. \n2. \n3. \n\n💡 Gün İçi Notlar & Fikirler:\n',
    nightNote: '🌙 Bugün Bana İyi Gelen 3 Şey (Şükran):\n• \n• \n• \n\n✨ Gece Yansımaları & Yarına Notlar:\n',
    waterGlasses: 2,
    dayMood: 'Enerjik',
    nightMood: 'Huzurlu',
  }
}

export function saveDayData(dateKey, data) {
  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${dateKey}`, JSON.stringify(data))
  } catch (e) {
    console.error('LocalStorage save error:', e)
  }
}

export function listSavedDiaryEntries() {
  const entries = []
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(STORAGE_KEY_PREFIX)) {
        const dateKey = key.replace(STORAGE_KEY_PREFIX, '')
        try {
          const data = JSON.parse(localStorage.getItem(key))
          const totalHabits = (data.dayHabits?.length || 0) + (data.nightHabits?.length || 0)
          const completedHabits =
            (data.dayHabits?.filter((h) => h.completed)?.length || 0) +
            (data.nightHabits?.filter((h) => h.completed)?.length || 0)

          entries.push({
            dateKey,
            title: formatDateTitle(dateKey),
            hasDayNote: Boolean(data.dayNote?.trim() && data.dayNote !== '☀️ Günün Öncelikli Hedefleri:\n1. \n2. \n3. \n\n💡 Gün İçi Notlar & Fikirler:\n'),
            hasNightNote: Boolean(data.nightNote?.trim() && data.nightNote !== '🌙 Bugün Bana İyi Gelen 3 Şey (Şükran):\n• \n• \n• \n\n✨ Gece Yansımaları & Yarına Notlar:\n'),
            completedHabits,
            totalHabits,
          })
        } catch {
          // ignore corrupted entry
        }
      }
    }
  } catch (e) {
    console.error('Failed to list diary entries', e)
  }

  // Sort dates descending (newest first)
  return entries.sort((a, b) => b.dateKey.localeCompare(a.dateKey))
}

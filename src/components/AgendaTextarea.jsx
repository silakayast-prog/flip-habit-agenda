import React, { useState } from 'react'
import { Copy, Check, RotateCcw, PenTool, Type } from 'lucide-react'

export default function AgendaTextarea({
  value,
  onChange,
  isNight = false,
  title = "Ajanda Notları",
  placeholder = "Buraya günün notlarını, hedeflerini veya düşüncelerini yazabilirsin..."
}) {
  const [copied, setCopied] = useState(false)
  const [handwritten, setHandwritten] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.error('Copy failed', e)
    }
  }

  const handleClear = () => {
    if (window.confirm('Bu sayfadaki metni temizlemek istediğinize emin misiniz?')) {
      onChange('')
    }
  }

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0
  const charCount = value.length

  return (
    <div className="flex flex-col h-full">
      {/* Top Bar for Text Area */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h3 className={`text-sm font-bold tracking-tight ${isNight ? 'text-indigo-200' : 'text-stone-900'}`}>
            {title}
          </h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-500/20">
            Otomatik Kayıtlı
          </span>
        </div>

        {/* Text Actions */}
        <div className="flex items-center gap-1">
          {/* Handwritten Font Toggle */}
          <button
            type="button"
            onClick={() => setHandwritten(!handwritten)}
            title={handwritten ? "Normal yazı tipine geç" : "El yazısı stiline geç"}
            className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition ${
              handwritten
                ? isNight
                  ? 'bg-indigo-600 text-white'
                  : 'bg-amber-600 text-white'
                : isNight
                  ? 'hover:bg-slate-800 text-slate-400'
                  : 'hover:bg-stone-200 text-stone-600'
            }`}
          >
            {handwritten ? <Type className="w-3.5 h-3.5" /> : <PenTool className="w-3.5 h-3.5" />}
            <span className="text-[11px] hidden sm:inline">{handwritten ? 'Modern' : 'El Yazısı'}</span>
          </button>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            title="Metni kopyala"
            className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition ${
              isNight ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-stone-200 text-stone-600'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="text-[11px] hidden sm:inline">{copied ? 'Kopyalandı' : 'Kopyala'}</span>
          </button>

          {/* Clear Button */}
          {value && (
            <button
              type="button"
              onClick={handleClear}
              title="Metni temizle"
              className={`p-1.5 rounded-lg text-xs transition ${
                isNight ? 'hover:bg-slate-800 text-slate-400 hover:text-red-400' : 'hover:bg-stone-200 text-stone-600 hover:text-red-600'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Lined Notebook Paper Container */}
      <div
        className={`relative flex-1 rounded-2xl border transition-all overflow-hidden flex flex-col shadow-inner ${
          isNight
            ? 'lined-paper-night border-slate-800/90 text-slate-100 shadow-black/40'
            : 'lined-paper-day border-amber-900/15 text-stone-900 shadow-stone-400/20'
        }`}
      >
        {/* Left red/margin line of classic agenda */}
        <div
          className={`absolute top-0 bottom-0 left-8 w-[1.5px] pointer-events-none z-10 ${
            isNight ? 'bg-red-400/20' : 'bg-red-500/20'
          }`}
        />

        {/* Text Area */}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          spellCheck="false"
          className={`w-full flex-1 bg-transparent resize-none pl-11 pr-4 py-2 border-none outline-none leading-8 text-[15px] ${
            handwritten ? 'font-["Caveat"] text-xl tracking-wide' : 'font-sans'
          } ${
            isNight
              ? 'text-slate-100 placeholder-slate-600'
              : 'text-stone-800 placeholder-stone-400'
          }`}
          style={{
            lineHeight: '32px',
            minHeight: '260px',
          }}
        />

        {/* Bottom Counter Footer */}
        <div
          className={`px-4 py-1.5 text-[10px] flex justify-between items-center border-t select-none ${
            isNight
              ? 'border-slate-800/60 bg-slate-900/40 text-slate-500'
              : 'border-amber-900/10 bg-amber-50/40 text-stone-500'
          }`}
        >
          <span>Defter sayfası: Çizgili Ajanda</span>
          <span>
            {wordCount} kelime · {charCount} karakter
          </span>
        </div>
      </div>
    </div>
  )
}

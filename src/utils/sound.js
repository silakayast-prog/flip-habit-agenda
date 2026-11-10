// Native Web Audio API based sound synthesizer (no external audio files required)

let audioCtx = null

function getAudioContext() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

/**
 * Realistic gentle page flip / paper rustle sound
 */
export function playPageFlipSound(enabled = true) {
  if (!enabled) return
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime

  // Generate a brief pink/white noise burst shaped like a paper flutter
  const bufferSize = ctx.sampleRate * 0.18
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const output = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    // Soft noise with gentle high roll-off
    output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.45))
  }

  const whiteNoise = ctx.createBufferSource()
  whiteNoise.buffer = buffer

  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.setValueAtTime(800, now)
  filter.frequency.exponentialRampToValueAtTime(1400, now + 0.08)
  filter.frequency.exponentialRampToValueAtTime(400, now + 0.18)
  filter.Q.value = 1.2

  const gainNode = ctx.createGain()
  gainNode.gain.setValueAtTime(0.01, now)
  gainNode.gain.linearRampToValueAtTime(0.25, now + 0.04)
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.18)

  whiteNoise.connect(filter)
  filter.connect(gainNode)
  gainNode.connect(ctx.destination)

  whiteNoise.start(now)
}

/**
 * Satisfying gentle chime when checking off a habit
 */
export function playCheckSound(enabled = true) {
  if (!enabled) return
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(523.25, now) // C5
  osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.07) // E5
  osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15) // G5

  gain.gain.setValueAtTime(0.01, now)
  gain.gain.linearRampToValueAtTime(0.2, now + 0.03)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 0.3)
}

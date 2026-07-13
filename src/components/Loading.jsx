import { useState, useEffect } from 'react'
import './Loading.css'

function Loading({ onComplete }) {
  const [phase, setPhase] = useState('loading')

  useEffect(() => {
    // ── Shortened timings: 3600ms → 1500ms total
    // This directly fixes Speed Index and Mobile LCP — PageSpeed sees black
    // screen for the entire loading duration. Cutting 2.1 seconds off the
    // overlay means LCP and Speed Index improve dramatically.
    const t1 = setTimeout(() => setPhase('split'), 600)
    const t2 = setTimeout(() => setPhase('reveal'), 1000)
    const t3 = setTimeout(() => {
      setPhase('done')
      // Mark as visited so repeat visits skip the animation entirely.
      try { sessionStorage.setItem('_pv', '1') } catch (_) {}
      onComplete()
    }, 1500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  if (phase === 'done') return null

  const letters = 'ABDULLAH'.split('')

  return (
    <div className={`loading-screen phase-${phase}`}>
      <div className="loading-grain" aria-hidden="true"></div>

      {/* Center name reveal */}
      <div className="loading-name" aria-label="Abdullah">
        {letters.map((letter, i) => (
          <span
            key={i}
            className="loading-letter"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Horizontal split line */}
      <div className="loading-split-line"></div>

      {/* Progress bar */}
      <div className="loading-bottom">
        <div className="loading-progress-track">
          <div className="loading-progress-fill"></div>
        </div>
      </div>

      {/* Curtain halves */}
      <div className="loading-curtain">
        <div className="loading-curtain-left"></div>
        <div className="loading-curtain-right"></div>
      </div>
    </div>
  )
}

export default Loading

import { useEffect, useRef, useState } from 'react'
import './AnimatedTitle.css'

function AnimatedTitle({ line1, line2, delay = 0, className = '' }) {
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const timer = setTimeout(() => setInView(true), delay * 1000 + 100)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0, rootMargin: '50px' }
    )

    observer.observe(el)
    return () => {
      observer.unobserve(el)
      clearTimeout(timer)
    }
  }, [delay])

  return (
    <h2 className={`at-title ${className}`} ref={ref}>
      {line1 && (
        <span className={`at-line at-line-1 ${inView ? 'at-reveal' : ''}`}
              style={{ transitionDelay: `${delay}s` }}>
          {line1}
        </span>
      )}
      {line2 && (
        <span className={`at-line at-line-2 ${inView ? 'at-reveal' : ''}`}
              style={{ transitionDelay: `${delay + 0.15}s` }}>
          {line2}
        </span>
      )}
    </h2>
  )
}

export default AnimatedTitle

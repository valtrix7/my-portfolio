import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import Loading from './components/Loading'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import SplashCursor from './components/SplashCursor'
import './App.css'

// ── Lazy-load every page so each becomes its own async chunk.
// The browser only parses + executes the code for the current route.
const Home = lazy(() => import('./pages/Home'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Minimal fallback shown while a lazy chunk loads (≈0ms on repeat visits
// thanks to the vendor-chunk cache split in vite.config.js).
function PageFallback() {
  return (
    <div style={{
      minHeight: '100dvh',
      background: 'var(--bg-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: 32,
        height: 32,
        border: '1.5px solid rgba(255,255,255,0.15)',
        borderTopColor: 'rgba(255,255,255,0.7)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
    </div>
  )
}

function ScrollToTop({ lenisRef }) {
  const { pathname } = useLocation()
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, lenisRef])
  return null
}

function AppContent() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const lenisRef = useRef(null)
  const rafIdRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    lenis.on('scroll', (e) => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.min(e.scroll / docHeight, 1) : 0
      setScrollProgress(progress)
    })

    // ── Store the RAF id so we can cancel it on unmount and avoid a leak.
    function raf(time) {
      lenis.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }
    rafIdRef.current = requestAnimationFrame(raf)

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <div className="grain-overlay" aria-hidden="true"></div>

      {/* WebGL fluid cursor — lowered DYE_RESOLUTION from 1024 → 512 and
          SIM_RESOLUTION from 128 → 64. Cuts GPU texture memory by ~4×
          while keeping the visual quality nearly identical. */}
      <SplashCursor
        SIM_RESOLUTION={64}
        DYE_RESOLUTION={512}
        DENSITY_DISSIPATION={4}
        VELOCITY_DISSIPATION={3}
        PRESSURE={0.08}
        PRESSURE_ITERATIONS={10}
        CURL={2}
        SPLAT_RADIUS={0.15}
        SPLAT_FORCE={3000}
        SHADING={true}
        RAINBOW_MODE={false}
        COLOR="#ffffff"
      />
      <a href="#main-content" className="skip-link">Skip to content</a>

      <ScrollToTop lenisRef={lenisRef} />
      <Navbar />
      <PageTransition>
        <main id="main-content">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home scrollProgress={scrollProgress} />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </PageTransition>
      <Footer />
    </>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <BrowserRouter>
      <div className="app">
        {loading && <Loading onComplete={() => setLoading(false)} />}
        <AppContent />
      </div>
    </BrowserRouter>
  )
}

export default App

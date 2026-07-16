import { useEffect, useState } from 'react'
import { MonitorPlay, Rocket, Palette, Mail, MapPin } from 'lucide-react'
import SEO from '../components/SEO'
import './ResumePage.css'

function ResumePage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    window.scrollTo(0, 0)
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className="resume-page">
      <SEO 
        title="Resume | Abdullah Portfolio" 
        description="Full Stack Developer resume and curriculum vitae."
        url="https://imabdullah.xyz/resume"
      />
      <div className="resume-container">
        
        {/* Download PDF Button */}
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={`resume-download-btn anim-fade-up ${mounted ? 'visible' : ''}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download PDF
        </a>

        {/* Top Row: Pic, Bio, Interests */}
        <div className="resume-top-row">
          <div className={`bento-card bento-profile-pic anim-fade-up ${mounted ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
            {/* The user will place their picture here later */}
            <div className="profile-placeholder">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem', opacity: 0.5 }}>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <br/>
              Add profile.jpg<br/>in public folder
            </div>
            {/* <img src="/profile.jpg" alt="Abdullah" /> */}
          </div>
          
          <div className="resume-bio-stack">
            <div className={`bento-card bento-bio anim-fade-up ${mounted ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
              <h1>
                My name is <span>Abdullah</span>, a self-taught <span>Full Stack Developer</span> with expertise in creating modern, scalable, and high-performance web applications that make a lasting impression.
              </h1>
            </div>
            <div className={`bento-card bento-interests anim-fade-up ${mounted ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
              <div className="bento-label">Interests</div>
              <div className="pill-group">
                <span className="bento-pill"><MonitorPlay size={16} className="pill-icon" /> WebGL</span>
                <span className="bento-pill"><Rocket size={16} className="pill-icon" /> Open Source</span>
                <span className="bento-pill"><Palette size={16} className="pill-icon" /> UI/UX Design</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Grid: Experience & Education */}
        <div className="resume-mid-grid">
          {/* Left Col: Experience */}
          <div className="resume-exp-stack">
            <div className={`bento-card anim-fade-up ${mounted ? 'visible' : ''}`} style={{ transitionDelay: '0.4s', marginBottom: '1.5rem' }}>
              <div className="exp-header">
                <div className="exp-header-left">
                  <h2>Freelancer</h2>
                  <p>Full Stack Developer</p>
                </div>
                <div className="exp-date">2023 - now</div>
              </div>
              <ul className="bento-list">
                <li>Architected and deployed custom, high-performance web apps and premium landing pages.</li>
                <li>Engineered highly interactive interfaces utilizing React, Vite, and GSAP.</li>
                <li>Built secure RESTful APIs using Node.js and Express.</li>
                <li>Optimized web applications for extreme performance (95+ Lighthouse).</li>
              </ul>
            </div>

            <div className={`bento-card anim-fade-up ${mounted ? 'visible' : ''}`} style={{ transitionDelay: '0.5s' }}>
              <div className="exp-header">
                <div className="exp-header-left">
                  <h2>Open Source</h2>
                  <p>GitHub Community</p>
                </div>
                <div className="exp-date">2022 - now</div>
              </div>
              <ul className="bento-list">
                <li>Developed decentralized tools, scripts, and automation architectures.</li>
                <li>Created comprehensive web portfolio templates (React 18, GSAP).</li>
                <li>Maintained rigorous version control practices and documentation.</li>
              </ul>
            </div>
          </div>

          {/* Right Col: Education / Details */}
          <div className={`bento-card anim-fade-up ${mounted ? 'visible' : ''}`} style={{ transitionDelay: '0.6s' }}>
            <div className="edu-item">
              <div>
                <h3>Self-Taught</h3>
                <p>Full Stack Engineering<br/>System Design & Architecture</p>
              </div>
              <div className="exp-date">Present</div>
            </div>
            
            <div className="edu-item">
              <div>
                <h3>High School</h3>
                <p>Computer Science<br/>Pakistan</p>
              </div>
              <div className="exp-date">Graduated</div>
            </div>
          </div>
        </div>

        {/* Bottom Rows: Skills, Portfolio, Details */}
        <div className={`bento-card bento-row anim-fade-up ${mounted ? 'visible' : ''}`} style={{ transitionDelay: '0.7s' }}>
          <div className="bento-label">Frontend</div>
          <div className="skills-group">
            <img src="https://skillicons.dev/icons?i=react" alt="React" />
            <img src="https://skillicons.dev/icons?i=nextjs" alt="Next" />
            <img src="https://skillicons.dev/icons?i=ts" alt="TypeScript" />
            <img src="https://skillicons.dev/icons?i=tailwind" alt="Tailwind" />
            <img src="https://skillicons.dev/icons?i=vite" alt="Vite" />
          </div>
        </div>

        <div className={`bento-card bento-row anim-fade-up ${mounted ? 'visible' : ''}`} style={{ transitionDelay: '0.8s' }}>
          <div className="bento-label">Backend</div>
          <div className="skills-group">
            <img src="https://skillicons.dev/icons?i=nodejs" alt="Node" />
            <img src="https://skillicons.dev/icons?i=express" alt="Express" />
            <img src="https://skillicons.dev/icons?i=mongodb" alt="MongoDB" />
            <img src="https://skillicons.dev/icons?i=postgres" alt="Postgres" />
          </div>
        </div>

        <div className={`bento-card bento-row anim-fade-up ${mounted ? 'visible' : ''}`} style={{ transitionDelay: '0.9s' }}>
          <div className="bento-label">Portfolio</div>
          <div className="portfolio-links">
            <a href="https://github.com/abdullah_codes7" target="_blank" rel="noopener noreferrer" className="port-link">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
            <a href="https://twitter.com/abdullah_codes7" target="_blank" rel="noopener noreferrer" className="port-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              Twitter
            </a>
            <a href="https://imabdullah.xyz" className="port-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              Website
            </a>
          </div>
        </div>

        <div className={`bento-card bento-row anim-fade-up ${mounted ? 'visible' : ''}`} style={{ transitionDelay: '1.0s' }}>
          <div className="bento-label">Details</div>
          <div className="details-group">
            <div className="detail-pill"><Mail size={16} className="pill-icon" /> contact@imabdullah.xyz</div>
            <div className="detail-pill"><MapPin size={16} className="pill-icon" /> Pakistan</div>
          </div>
        </div>

      </div>
    </main>
  )
}

export default ResumePage

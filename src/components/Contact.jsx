import { useState } from 'react'
import { useScrollAnimation, useMagnetic } from '../hooks/useScrollAnimation'
import './Contact.css'

function Contact() {
  const [titleRef, titleVisible] = useScrollAnimation(0.2)
  const [formRef, formVisible] = useScrollAnimation(0.1)
  const submitRef = useMagnetic(0.3)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <div
          ref={titleRef}
          className={`contact-header anim-slide-right ${titleVisible ? 'visible' : ''}`}
        >
          <div className="eyebrow">
            <span className="eyebrow-dot"></span>
            04 — Contact
          </div>
          <h2 className="section-title">
            <span className="section-title-line">Get In</span>
            <span className="section-title-future">TOUCH</span>
          </h2>
          <p className="section-subtitle">Let's build something together</p>
        </div>

        <div className="contact-grid">
          <div
            ref={formRef}
            className={`contact-form-container anim-fade-up ${formVisible ? 'visible' : ''}`}
          >
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className={`form-shell ${errors.name ? 'error' : ''}`}>
                <div className="form-core">
                  <label className="form-label" htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>
              </div>

              <div className={`form-shell ${errors.email ? 'error' : ''}`}>
                <div className="form-core">
                  <label className="form-label" htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>
              </div>

              <div className={`form-shell ${errors.message ? 'error' : ''}`}>
                <div className="form-core">
                  <label className="form-label" htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="form-input form-textarea"
                    rows="5"
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>
              </div>

              <button ref={submitRef} type="submit" className="submit-btn">
                <span>Send Message</span>
                <span className="submit-btn-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                  </svg>
                </span>
              </button>
            </form>
          </div>

          <div className={`contact-info anim-slide-left ${formVisible ? 'visible' : ''}`}>
            <div className="info-block">
              <h4>Email</h4>
              <a href="mailto:hello@valtrix.dev">hello@valtrix.dev</a>
            </div>
            <div className="info-block">
              <h4>Location</h4>
              <p>Available Worldwide</p>
            </div>
            <div className="info-block">
              <h4>Social</h4>
              <div className="social-links">
                <a href="https://github.com/valtrix7" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
                <a href="#" className="social-link">LinkedIn</a>
                <a href="#" className="social-link">Twitter</a>
              </div>
            </div>
            <a
              href="https://github.com/valtrix7"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-github-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>View GitHub Profile</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

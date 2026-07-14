import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SideNav.css';

const sections = [
  { id: 'hero', label: '00', title: 'Top' },
  { id: 'about', label: '01', title: 'About' },
  { id: 'projects', label: '02', title: 'Work' },
  { id: 'process', label: '03', title: 'Process' },
  { id: 'stack', label: '04', title: 'Stack' },
  { id: 'contact', label: '05', title: 'Contact' },
];

export default function SideNav() {
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') return;

    let observer;
    let timeoutId;

    const initObserver = () => {
      const elements = sections.map(s => document.getElementById(s.id)).filter(Boolean);
      
      // Wait until all sections are in the DOM (Suspense lazy loading)
      if (elements.length < sections.length) {
        timeoutId = setTimeout(initObserver, 100);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { threshold: 0.1, rootMargin: '-25% 0px -25% 0px' }
      );

      elements.forEach((el) => observer.observe(el));
    };

    initObserver();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (observer) observer.disconnect();
    };
  }, [location.pathname]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (location.pathname !== '/') return null;

  return (
    <nav className="future-side-nav">
      <div className="side-nav-track">
        <div className="side-nav-line"></div>
        {sections.map((section) => (
          <div
            key={section.id}
            className={`side-nav-item ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => scrollTo(section.id)}
            title={section.title}
          >
            <span className="side-nav-label">{section.label}</span>
            <div className="side-nav-dot"></div>
          </div>
        ))}
      </div>
    </nav>
  );
}

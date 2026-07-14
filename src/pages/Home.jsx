import { useEffect } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Process from '../components/Process'
import Stack from '../components/Stack'
import Contact from '../components/Contact'
import SEO from '../components/SEO'

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://valtrix.dev/#website",
      "url": "https://valtrix.dev",
      "name": "Abdullah Portfolio",
      "description": "Building scalable web applications and decentralized systems.",
      "publisher": {
        "@id": "https://valtrix.dev/#person"
      }
    },
    {
      "@type": "Person",
      "@id": "https://valtrix.dev/#person",
      "name": "Abdullah",
      "url": "https://valtrix.dev",
      "jobTitle": "Full Stack Developer",
      "image": "https://valtrix.dev/og.png",
      "sameAs": []
    }
  ]
};
function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main>
      <SEO schema={homeSchema} />
      <Hero />
      <About />
      <Projects />
      <Process />
      <Stack />
      <Contact />
    </main>
  )
}

export default Home

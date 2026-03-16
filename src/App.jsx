import { useEffect, useState } from 'react'
import './App.css'
import SaltCategory from './pages/SaltCategory.jsx'
import ElectronicsCategory from './pages/ElectronicsCategory.jsx'
import FlightsCategory from './pages/FlightsCategory.jsx'
import FragranceCategory from './pages/FragranceCategory.jsx'

const slides = [
  {
    id: 'slide-1',
    category: 'Salt',
    heading: 'Salt',
    subtitle: 'Pure taste, timeless value',
    image: '/slide-1-salt.png',
    // Use `contain` + disable parallax transform so the full image is visible.
    bgSize: 'contain',
    bgPosition: 'center',
    bgTransform: 'none',
  },
  {
    id: 'slide-2',
    category: 'Travel & Tours',
    heading: 'Travel & Tours',
    subtitle: 'Explore destinations with confidence',
    image: '/slide-2-travel.png',
    // Use `contain` + disable parallax transform so the full image is visible.
    bgSize: 'contain',
    bgPosition: 'center',
    bgTransform: 'none',
  },
  {
    id: 'slide-3',
    category: 'Electronics',
    heading: 'Electronics',
    subtitle: 'Modern tech for everyday life',
    image: '/whatsnew-3.jpg',
    // Use `contain` + disable parallax transform so the full image is visible.
    bgSize: 'contain',
    bgPosition: 'center',
    bgTransform: 'none',
  },
  {
    id: 'slide-4',
    category: 'Fragrance',
    heading: 'Fragrance',
    subtitle: 'Signature scents for every moment',
    // User-provided image (uploaded in public/_incoming)
    image: '/_incoming/561f2f1f-78c6-4bc3-979c-b54d7ccb71a0.jpg',
    // Portrait image: show the full product.
    // Portrait image: show the full product.
    bgSize: 'contain',
    bgPosition: 'center',
    bgTransform: 'none',
  },
]

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [page, setPage] = useState('home')
  const [lastSlideId, setLastSlideId] = useState(null)
  const [pendingScrollSlideId, setPendingScrollSlideId] = useState(null)

  const toggleSidebar = () => {
    setIsSidebarOpen((current) => !current)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const scrollToSlide = (slideId) => {
    if (!slideId) return

    const el = document.getElementById(slideId)
    if (!el) return

    // Scroll within the nearest scrollable ancestor (the `.parallax` container).
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    if (page !== 'home') return
    if (!pendingScrollSlideId) return

    // Wait until the parallax DOM is mounted before scrolling.
    window.requestAnimationFrame(() => {
      scrollToSlide(pendingScrollSlideId)
      setPendingScrollSlideId(null)
    })
  }, [page, pendingScrollSlideId])

  const backToLastSlide = () => {
    setPage('home')
    setPendingScrollSlideId(lastSlideId)
  }

  const openSaltCategory = () => {
    closeSidebar()
    setLastSlideId('slide-1')
    setPage('salt')
  }

  const openElectronicsCategory = () => {
    closeSidebar()
    setLastSlideId('slide-3')
    setPage('electronics')
  }

  const openFlightsCategory = () => {
    closeSidebar()
    setLastSlideId('slide-2')
    setPage('flights')
  }

  const openFragranceCategory = () => {
    closeSidebar()
    setLastSlideId('slide-4')
    setPage('fragrance')
  }

  if (page === 'salt') {
    return <SaltCategory onBack={backToLastSlide} />
  }

  if (page === 'electronics') {
    return <ElectronicsCategory onBack={backToLastSlide} />
  }

  if (page === 'flights') {
    return <FlightsCategory onBack={backToLastSlide} />
  }

  if (page === 'fragrance') {
    return <FragranceCategory onBack={backToLastSlide} />
  }

  return (
    <div className="parallax-page">
      <button
        className={`sidebar-toggle${isSidebarOpen ? ' is-open' : ''}`}
        type="button"
        aria-label={isSidebarOpen ? 'Close categories menu' : 'Open categories menu'}
        aria-expanded={isSidebarOpen}
        aria-controls="categories-sidebar"
        onClick={toggleSidebar}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <aside id="categories-sidebar" className={`sidebar${isSidebarOpen ? ' is-open' : ''}`}>
        <h2>Categories</h2>
        <nav aria-label="Category navigation">
          <ul>
            {slides.map((slide) => (
              <li key={slide.id}>
                <a
                  href={`#${slide.id}`}
                  onClick={(e) => {
                    if (slide.category === 'Salt') {
                      e.preventDefault()
                      openSaltCategory()
                      return
                    }
                    if (slide.category === 'Electronics') {
                      e.preventDefault()
                      openElectronicsCategory()
                      return
                    }
                    if (slide.category === 'Travel & Tours') {
                      e.preventDefault()
                      openFlightsCategory()
                      return
                    }
                    if (slide.category === 'Fragrance') {
                      e.preventDefault()
                      openFragranceCategory()
                      return
                    }
                    closeSidebar()
                  }}
                >
                  {slide.category}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <button
        type="button"
        className={`sidebar-overlay${isSidebarOpen ? ' is-visible' : ''}`}
        aria-label="Close categories menu"
        onClick={closeSidebar}
      ></button>

      <main className="parallax" aria-label="Parallax category showcase">
        {slides.map((slide) => (
          <section
            key={slide.id}
            id={slide.id}
            className="parallax__group"
            data-slide={slide.id}
            style={{
              '--slide-bg': `url("${slide.image}")`,
              '--slide-bg-size': slide.bgSize,
              '--slide-bg-position': slide.bgPosition,
              ...(slide.bgTransform ? { '--slide-bg-transform': slide.bgTransform } : null),
            }}
          >
            <article
              className="slide-content"
              role="button"
              tabIndex={0}
              onClick={
                slide.category === 'Salt'
                  ? openSaltCategory
                  : slide.category === 'Electronics'
                    ? openElectronicsCategory
                    : slide.category === 'Travel & Tours'
                      ? openFlightsCategory
                      : slide.category === 'Fragrance'
                        ? openFragranceCategory
                        : undefined
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  if (slide.category === 'Salt') openSaltCategory()
                  if (slide.category === 'Electronics') openElectronicsCategory()
                  if (slide.category === 'Travel & Tours') openFlightsCategory()
                  if (slide.category === 'Fragrance') openFragranceCategory()
                }
              }}
            >
              <h1>{slide.heading}</h1>
              <p>{slide.subtitle}</p>
              {slide.category === 'Salt' ? <p className="slide-content__hint">Tap to view salt options</p> : null}
              {slide.category === 'Electronics' ? (
                <p className="slide-content__hint">Tap to view electronics options</p>
              ) : null}
              {slide.category === 'Travel & Tours' ? (
                <p className="slide-content__hint">Tap to view travel options</p>
              ) : null}
              {slide.category === 'Fragrance' ? (
                <p className="slide-content__hint">Tap to view fragrance options</p>
              ) : null}
            </article>
          </section>
        ))}
      </main>
    </div>
  )
}

export default App

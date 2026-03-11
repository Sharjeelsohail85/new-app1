import { useState } from 'react'
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
    image: '/slide-1-salt.jpg',
  },
  {
    id: 'slide-2',
    category: 'Travel & Tours',
    heading: 'Travel & Tours',
    subtitle: 'Explore destinations with confidence',
    image: '/slide-2-travel.jpg',
  },
  {
    id: 'slide-3',
    category: 'Electronics',
    heading: 'Electronics',
    subtitle: 'Modern tech for everyday life',
    image: '/whatsnew-3.jpg',
  },
  {
    id: 'slide-4',
    category: 'Fragrance',
    heading: 'Fragrance',
    subtitle: 'Signature scents for every moment',
    // User-provided image (uploaded in public/_incoming)
    image: '/_incoming/9b9141b4-ac57-41a8-9432-0e2eb9b3b060.jpg',
  },
]

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [page, setPage] = useState('home')

  const toggleSidebar = () => {
    setIsSidebarOpen((current) => !current)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const openSaltCategory = () => {
    closeSidebar()
    setPage('salt')
  }

  const openElectronicsCategory = () => {
    closeSidebar()
    setPage('electronics')
  }

  const openFlightsCategory = () => {
    closeSidebar()
    setPage('flights')
  }

  const openFragranceCategory = () => {
    closeSidebar()
    setPage('fragrance')
  }

  if (page === 'salt') {
    return <SaltCategory onBack={() => setPage('home')} />
  }

  if (page === 'electronics') {
    return <ElectronicsCategory onBack={() => setPage('home')} />
  }

  if (page === 'flights') {
    return <FlightsCategory onBack={() => setPage('home')} />
  }

  if (page === 'fragrance') {
    return <FragranceCategory onBack={() => setPage('home')} />
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
          <section key={slide.id} id={slide.id} className="parallax__group" data-slide={slide.id}>
            <div className="parallax__layer parallax__layer--back">
              <img
                className={`parallax__image${slide.id === 'slide-4' ? ' parallax__image--fragrance' : ''}`}
                src={slide.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="parallax__layer parallax__layer--base">
                <article
                  className="slide-content"
                  role={
                    slide.category === 'Salt' ||
                    slide.category === 'Electronics' ||
                    slide.category === 'Travel & Tours' ||
                    slide.category === 'Fragrance'
                      ? 'button'
                      : undefined
                  }
                  tabIndex={
                    slide.category === 'Salt' ||
                    slide.category === 'Electronics' ||
                    slide.category === 'Travel & Tours' ||
                    slide.category === 'Fragrance'
                      ? 0
                      : undefined
                  }
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
                  onKeyDown={
                    slide.category === 'Salt' ||
                    slide.category === 'Electronics' ||
                    slide.category === 'Travel & Tours' ||
                    slide.category === 'Fragrance'
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            if (slide.category === 'Salt') openSaltCategory()
                            if (slide.category === 'Electronics') openElectronicsCategory()
                            if (slide.category === 'Travel & Tours') openFlightsCategory()
                            if (slide.category === 'Fragrance') openFragranceCategory()
                          }
                        }
                      : undefined
                  }
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
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}

export default App

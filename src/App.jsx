import { useState } from 'react'
import './App.css'

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
    category: 'Electroinics',
    heading: 'Electroinics',
    subtitle: 'Modern tech for everyday life',
    image: '/whatsnew-3.jpg',
  },
]

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen((current) => !current)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
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
                <a href={`#${slide.id}`} onClick={closeSidebar}>
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
          <section key={slide.id} id={slide.id} className="parallax__group">
            <div className="parallax__layer parallax__layer--back" style={{ backgroundImage: `url(${slide.image})` }}></div>
            <div className="parallax__layer parallax__layer--base">
              <article className="slide-content">
                <h1>{slide.heading}</h1>
                <p>{slide.subtitle}</p>
              </article>
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}

export default App

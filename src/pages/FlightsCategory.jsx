import { useCallback, useMemo, useRef } from 'react'
import './FlightsCategory.css'

function DepthCard({ title, subtitle, imageSrc, onClick }) {
  const cardRef = useRef(null)

  const handlePointerMove = useCallback((e) => {
    const el = cardRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    const dx = Math.max(-1, Math.min(1, (x - 0.5) * 2))
    const dy = Math.max(-1, Math.min(1, (y - 0.5) * 2))

    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
    el.style.setProperty('--rx', `${(-dy * 10).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(dx * 14).toFixed(2)}deg`)
  }, [])

  const handlePointerLeave = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    el.style.removeProperty('--mx')
    el.style.removeProperty('--my')
    el.style.removeProperty('--rx')
    el.style.removeProperty('--ry')
  }, [])

  const handleImgError = useCallback((e) => {
    e.currentTarget.style.display = 'none'
  }, [])

  return (
    <button
      ref={cardRef}
      type="button"
      className="depth-card"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
    >
      <span className="depth-card__media" aria-hidden="true">
        <img src={imageSrc} alt="" loading="lazy" decoding="async" onError={handleImgError} />
      </span>

      <span className="depth-card__glare" aria-hidden="true" />
      <span className="depth-card__noise" aria-hidden="true" />

      <span className="depth-card__content">
        <span className="depth-card__title">{title}</span>
        <span className="depth-card__subtitle">{subtitle}</span>
        <span className="depth-card__cta">
          Explore
          <span className="depth-card__arrow" aria-hidden="true">
            →
          </span>
        </span>
      </span>
    </button>
  )
}

export default function FlightsCategory({ onBack }) {
  const items = useMemo(
    () => [
      {
        key: 'flights',
        title: 'Flights',
        subtitle: 'Compare routes and fares to book faster.',
        imageSrc: '/slide-2-travel.png',
      },
      {
        key: 'hotels',
        title: 'Hotels',
        subtitle: 'Find comfortable stays near your destination.',
        imageSrc: '/candidate-download5.jpeg',
      },
      {
        key: 'transport',
        title: 'Transport',
        subtitle: 'Airport pickup, rentals, and city transfers.',
        imageSrc: '/candidate-capture.jpg',
      },
      {
        key: 'consultation',
        title: 'Consultation',
        subtitle: 'Plan your itinerary with expert guidance.',
        imageSrc: '/candidate-capture2.jpg',
      },
    ],
    [],
  )

  return (
    <div className="flights-page">
      <header className="flights-page__header">
        <button className="flights-page__back" type="button" onClick={onBack}>
          ← Back
        </button>
        <div className="flights-page__titles">
          <h1>Travel & Tours</h1>
          <p>Select a service</p>
        </div>
      </header>

      <main className="flights-page__content" aria-label="Travel services">
        <div className="flights-cards">
          {items.map((item) => (
            <DepthCard
              key={item.key}
              title={item.title}
              subtitle={item.subtitle}
              imageSrc={item.imageSrc}
              onClick={() => console.log('Selected:', item.key)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}


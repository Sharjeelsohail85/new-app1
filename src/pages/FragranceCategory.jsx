import { useCallback, useEffect, useMemo, useRef } from 'react'
import './FragranceCategory.css'

function TiltCard({ title, description, imageSrc, onClick }) {
  const wrapRef = useRef(null)
  const leaveTimeoutRef = useRef(null)

  const clearLeaveTimeout = useCallback(() => {
    if (leaveTimeoutRef.current) {
      window.clearTimeout(leaveTimeoutRef.current)
      leaveTimeoutRef.current = null
    }
  }, [])

  const setVars = useCallback((vars) => {
    const el = wrapRef.current
    if (!el) return

    for (const [k, v] of Object.entries(vars)) {
      el.style.setProperty(k, v)
    }
  }, [])

  const reset = useCallback(() => {
    setVars({
      '--pdc-rx': '0deg',
      '--pdc-ry': '0deg',
      '--pdc-tx': '0px',
      '--pdc-ty': '0px',
    })
  }, [setVars])

  useEffect(() => {
    reset()
    return () => clearLeaveTimeout()
  }, [reset, clearLeaveTimeout])

  const handlePointerMove = useCallback(
    (e) => {
      const el = wrapRef.current
      if (!el) return

      clearLeaveTimeout()

      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      const mousePX = x / rect.width
      const mousePY = y / rect.height

      // Match the CodePen maths.
      const rX = mousePX * 30
      const rY = mousePY * -30
      const tX = mousePX * -40
      const tY = mousePY * -40

      setVars({
        '--pdc-rx': `${rX}deg`,
        '--pdc-ry': `${rY}deg`,
        '--pdc-tx': `${tX}px`,
        '--pdc-ty': `${tY}px`,
      })
    },
    [clearLeaveTimeout, setVars],
  )

  const handlePointerEnter = useCallback(() => {
    clearLeaveTimeout()
  }, [clearLeaveTimeout])

  const handlePointerLeave = useCallback(() => {
    clearLeaveTimeout()
    leaveTimeoutRef.current = window.setTimeout(() => {
      reset()
    }, 1000)
  }, [clearLeaveTimeout, reset])

  return (
    <button
      ref={wrapRef}
      type="button"
      className="pdc-card-wrap"
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
    >
      <div className="pdc-card" aria-hidden="true">
        <div className="pdc-card-bg" style={{ backgroundImage: `url(${imageSrc})` }} />
        <div className="pdc-card-info">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <span className="pdc-sr-only">Open {title}</span>
    </button>
  )
}

export default function FragranceCategory({ onBack }) {
  const items = useMemo(
    () => [
      {
        key: 'journey-black',
        title: 'Journey Noir',
        description: 'Bold, smoky, and modern with a deep finish.',
        imageSrc: '/fragrance-option-1.jpg',
      },
      {
        key: 'journey-gold',
        title: 'Journey Gold',
        description: 'Warm pineapple notes with golden amber sweetness.',
        imageSrc: '/fragrance-option-2.jpg',
      },
      {
        key: 'journey-classic',
        title: 'Journey Classic',
        description: 'A signature scent for everyday confidence.',
        imageSrc: '/fragrance-option-3.jpg',
      },
      {
        key: 'frosted',
        title: 'Frosted',
        description: 'Cool minty freshness with a clean, icy edge.',
        imageSrc: '/fragrance-option-4.jpg',
      },
    ],
    [],
  )

  return (
    <div className="fragrance-page">
      <header className="fragrance-page__header">
        <button className="fragrance-page__back" type="button" onClick={onBack}>
          ← Back
        </button>
        <div className="fragrance-page__titles">
          <h1 className="pdc-title">Fragrance</h1>
          <p className="fragrance-page__subtitle">Hover over the cards</p>
        </div>
      </header>

      <main className="fragrance-page__content" aria-label="Fragrance category options">
        <div className="pdc-container">
          {items.map((item) => (
            <TiltCard
              key={item.key}
              title={item.title}
              description={item.description}
              imageSrc={item.imageSrc}
              onClick={() => {
                // Future: navigate into the selected fragrance.
                console.log('Selected:', item.key)
              }}
            />
          ))}
        </div>
      </main>
    </div>
  )
}


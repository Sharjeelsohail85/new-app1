import { useCallback, useEffect, useMemo, useRef } from 'react'
import './ElectronicsCategory.css'

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

export default function ElectronicsCategory({ onBack }) {
  const items = useMemo(
    () => [
      {
        key: 'computer-hardware',
        title: 'Computer Hardware',
        description: 'PC parts, networking, storage, and accessories.',
        imageSrc:
          'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=',
      },
      {
        key: 'hikvision-cameras',
        title: 'Hikvision Cameras',
        description: 'DVR/NVR, IP cameras, and surveillance solutions.',
        imageSrc:
          'https://images.unsplash.com/photo-1479659929431-4342107adfc1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=',
      },
      {
        key: 'networking',
        title: 'Networking',
        description: 'Routers, switches, access points, and cables.',
        imageSrc:
          'https://images.unsplash.com/photo-1479644025832-60dabb8be2a1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=',
      },
      {
        key: 'accessories',
        title: 'Accessories',
        description: 'Keyboards, mice, headsets, and peripherals.',
        imageSrc:
          'https://images.unsplash.com/photo-1479621051492-5a6f9bd9e51a?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=',
      },
    ],
    [],
  )

  return (
    <div className="electronics-page">
      <header className="electronics-page__header">
        <button className="electronics-page__back" type="button" onClick={onBack}>
          ← Back
        </button>
        <div className="electronics-page__titles">
          <h1 className="pdc-title">Electronics</h1>
          <p className="electronics-page__subtitle">Hover over the cards</p>
        </div>
      </header>

      <main className="electronics-page__content" aria-label="Electronics category options">
        <div className="pdc-container">
          {items.map((item) => (
            <TiltCard
              key={item.key}
              title={item.title}
              description={item.description}
              imageSrc={item.imageSrc}
              onClick={() => {
                // Future: navigate into the selected electronics subcategory.
                console.log('Selected:', item.key)
              }}
            />
          ))}
        </div>
      </main>
    </div>
  )
}


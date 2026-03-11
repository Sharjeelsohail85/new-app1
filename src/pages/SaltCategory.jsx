import { useEffect, useMemo, useRef } from 'react'
import './SaltCategory.css'

function ParallaxCard({ title, description, primaryImage, fallbackImage, onClick }) {
  const wrapRef = useRef(null)
  const cardRef = useRef(null)
  const bgRef = useRef(null)
  const sizeRef = useRef({ width: 0, height: 0 })
  const leaveTimerRef = useRef(null)

  const updateSize = () => {
    const wrap = wrapRef.current
    if (!wrap) return
    sizeRef.current.width = wrap.offsetWidth
    sizeRef.current.height = wrap.offsetHeight
  }

  useEffect(() => {
    updateSize()
    const onResize = () => updateSize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleMouseMove = (e) => {
    const wrap = wrapRef.current
    const card = cardRef.current
    const bg = bgRef.current
    if (!wrap || !card || !bg) return

    const { width, height } = sizeRef.current
    if (!width || !height) return

    // Match the original CodePen math.
    const mouseX = e.pageX - wrap.offsetLeft - width / 2
    const mouseY = e.pageY - wrap.offsetTop - height / 2
    const mousePX = mouseX / width
    const mousePY = mouseY / height
    const rX = mousePX * 30
    const rY = mousePY * -30
    const tX = mousePX * -40
    const tY = mousePY * -40

    card.style.transform = `rotateY(${rX}deg) rotateX(${rY}deg)`
    bg.style.transform = `translateX(${tX}px) translateY(${tY}px)`
  }

  const handleMouseEnter = () => {
    if (leaveTimerRef.current) {
      window.clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }
    updateSize()
  }

  const handleMouseLeave = () => {
    if (leaveTimerRef.current) window.clearTimeout(leaveTimerRef.current)

    leaveTimerRef.current = window.setTimeout(() => {
      const card = cardRef.current
      const bg = bgRef.current
      if (!card || !bg) return
      card.style.transform = `rotateY(0deg) rotateX(0deg)`
      bg.style.transform = `translateX(0px) translateY(0px)`
    }, 1000)
  }

  const bgImage = `url(${primaryImage}), url(${fallbackImage})`

  return (
    <div
      ref={wrapRef}
      className="card-wrap"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.()
      }}
    >
      <div ref={cardRef} className="card">
        <div ref={bgRef} className="card-bg" style={{ backgroundImage: bgImage }} />
        <div className="card-info">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default function SaltCategory({ onBack }) {
  const items = useMemo(
    () => [
      {
        key: 'salt-therapy',
        title: 'Asthma – Salt Therapy',
        description: 'A gentle, calming salt-room inspired experience.',
        primaryImage: '/salt-option-1.jpg',
        fallbackImage: '/slide-1-salt.jpg',
      },
      {
        key: 'edible-salt',
        title: 'Edible Salt',
        description: 'Everyday essentials for taste and wellness.',
        primaryImage: '/salt-option-2.jpg',
        fallbackImage: '/slide-1-salt.jpg',
      },
      {
        key: 'salt-decor',
        title: 'Salt Decor',
        description: 'Warm ambience and natural Himalayan glow.',
        primaryImage: '/salt-option-3.jpg',
        fallbackImage: '/slide-1-salt.jpg',
      },
    ],
    [],
  )

  return (
    <div className="salt-page" aria-label="Salt category options">
      <div className="salt-page__bar">
        <button className="salt-back" type="button" onClick={onBack}>
          ← Back
        </button>
      </div>

      <h1 className="title">Hover over the cards</h1>

      <div className="container">
        {items.map((item) => (
          <ParallaxCard
            key={item.key}
            title={item.title}
            description={item.description}
            primaryImage={item.primaryImage}
            fallbackImage={item.fallbackImage}
            onClick={() => {
              // Future: navigate into the selected salt subcategory.
              console.log('Selected:', item.key)
            }}
          />
        ))}
      </div>
    </div>
  )
}


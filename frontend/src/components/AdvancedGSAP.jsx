import { useEffect } from 'react'
import { gsap } from 'gsap'

export const CursorHoverSetup = () => {
  useEffect(() => {
    const cursor = document.querySelector('.custom-cursor')
    if (!cursor) return

    let mouseX = 0, mouseY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener('mousemove', onMouseMove)

    const tickerFn = () => {
      cursor.style.left = mouseX + 'px'
      cursor.style.top = mouseY + 'px'
    }
    gsap.ticker.add(tickerFn)

    const setupHovers = () => {
      document.querySelectorAll('button, a, [role="button"], input, textarea, select').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'))
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'))
      })
    }
    setupHovers()
    setTimeout(setupHovers, 1000)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      gsap.ticker.remove(tickerFn)
    }
  }, [])

  return null
}

export const CustomCursor = () => (
  <div 
    className="custom-cursor fixed w-4 h-4 rounded-full pointer-events-none z-[100] hidden md:block"
    style={{ top: 0, left: 0, transform: 'translate(-50%, -50%)' }} 
  />
)

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Scroll progress bar — accent colored
export const ScrollProgress = () => {
  const progressRef = useRef()

  useEffect(() => {
    const element = progressRef.current
    if (!element) return

    const animation = gsap.to(element, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    })

    return () => {
      animation.kill()
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === document.body) trigger.kill()
      })
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] bg-transparent z-[60]">
      <div ref={progressRef} className="h-full scroll-progress origin-left scale-x-0" />
    </div>
  )
}

// Animated horizontal line — draws on scroll
export const AnimatedLine = ({ className = '' }) => {
  const lineRef = useRef()

  useEffect(() => {
    const element = lineRef.current
    if (!element) return

    const animation = gsap.to(element, {
      scaleX: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    })

    return () => animation.kill()
  }, [])

  return <div ref={lineRef} className={`section-line ${className}`} />
}

// Magnetic button
export const MagneticButton = ({ children, className = '', ...props }) => {
  const buttonRef = useRef()

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      button.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`
    }

    const handleMouseLeave = () => {
      button.style.transform = 'translate(0, 0)'
      button.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      setTimeout(() => { button.style.transition = '' }, 400)
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return <button ref={buttonRef} className={className} {...props}>{children}</button>
}

// Counter animation
export const AnimatedCounter = ({ target, className = '' }) => {
  const counterRef = useRef()

  useEffect(() => {
    const counter = counterRef.current
    if (!counter) return

    counter.textContent = '0'

    const trigger = ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(counter, {
          textContent: target,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 }
        })
      }
    })

    return () => trigger.kill()
  }, [target])

  return <span ref={counterRef} className={className} data-target={target}>0</span>
}

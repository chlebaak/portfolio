import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registrujeme GSAP pluginy
gsap.registerPlugin(ScrollTrigger)

// Scroll Progress komponenta
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
        scrub: 1
      }
    })

    return () => {
      animation.kill()
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === document.body) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
      <div 
        ref={progressRef}
        className="h-full bg-gradient-to-r from-white via-gray-300 to-white origin-left scale-x-0"
      />
    </div>
  )
}

// Reveal text komponenta
export const RevealText = ({ children, className = '' }) => {
  const textRef = useRef()

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    // Nastavíme počáteční stav
    gsap.set(element, {
      clipPath: 'inset(0 100% 0 0)',
      opacity: 0
    })

    // Vytvoříme animaci
    gsap.to(element, {
      clipPath: 'inset(0 0% 0 0)',
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <span ref={textRef} className={className}>
      {children}
    </span>
  )
}

// Staggered animace pro lists
export const StaggeredList = ({ children, className = '' }) => {
  const listRef = useRef()

  useEffect(() => {
    const container = listRef.current
    if (!container) return

    const items = container.children
    if (items.length === 0) return

    // Nastavíme počáteční stav
    gsap.set(items, {
      opacity: 0,
      x: -30,
      rotation: -5
    })

    // Vytvoříme animaci
    gsap.to(items, {
      opacity: 1,
      x: 0,
      rotation: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: container,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === container) {
          trigger.kill()
        }
      })
    }
  }, [children])

  return (
    <div ref={listRef} className={className}>
      {children}
    </div>
  )
}

// Parallax komponenta
export const ParallaxElement = ({ children, speed = 1, className = '' }) => {
  const elementRef = useRef()

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const animation = gsap.to(element, {
      y: -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        scrub: 1,
        start: 'top bottom',
        end: 'bottom top'
      }
    })

    return () => {
      animation.kill()
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [speed])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Scale on scroll komponenta
export const ScaleOnScroll = ({ children, className = '' }) => {
  const elementRef = useRef()

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Nastavíme počáteční stav
    gsap.set(element, {
      scale: 0.8,
      opacity: 0
    })

    // Vytvoříme animaci
    gsap.to(element, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Magnetic button komponenta
export const MagneticButton = ({ children, className = '', ...props }) => {
  const buttonRef = useRef()

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      })
    }

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(button, {
        x: x * 0.1,
        y: y * 0.1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    button.addEventListener('mouseenter', handleMouseEnter)
    button.addEventListener('mouseleave', handleMouseLeave)
    button.addEventListener('mousemove', handleMouseMove)

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter)
      button.removeEventListener('mouseleave', handleMouseLeave)
      button.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <button ref={buttonRef} className={`magnetic-button ${className}`} {...props}>
      {children}
    </button>
  )
}

// Counter animace komponenta
export const AnimatedCounter = ({ target, className = '' }) => {
  const counterRef = useRef()

  useEffect(() => {
    const counter = counterRef.current
    if (!counter) return

    counter.textContent = '0'

    const trigger = ScrollTrigger.create({
      trigger: counter,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(counter, {
          textContent: target,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 }
        })
      }
    })

    return () => {
      trigger.kill()
    }
  }, [target])

  return (
    <span ref={counterRef} className={`counter ${className}`} data-target={target}>
      0
    </span>
  )
}

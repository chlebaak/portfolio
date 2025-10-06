import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

// Registrujeme GSAP pluginy
gsap.registerPlugin(ScrollTrigger, TextPlugin)

// Main GSAP Animation Provider Component
export const GSAPAnimationProvider = ({ children }) => {
  useEffect(() => {
    // Fade in animace pro sekce
    gsap.fromTo('.section-fade', 
      {
        opacity: 0,
        y: 100
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.section-fade',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Parallax efekt pro floating objekty
    gsap.to('.parallax-slow', {
      y: -100,
      scrollTrigger: {
        trigger: '.parallax-slow',
        scrub: 1,
        start: 'top bottom',
        end: 'bottom top'
      }
    })

    // Scale animace pro project cards
    gsap.fromTo('.project-card-gsap',
      {
        scale: 0.8,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.project-card-gsap',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Rotate animace pro skills
    gsap.fromTo('.skill-item',
      {
        rotation: -10,
        opacity: 0,
        x: -50
      },
      {
        rotation: 0,
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.skill-item',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Text reveal animace
    gsap.fromTo('.text-reveal',
      {
        clipPath: 'inset(0 100% 0 0)'
      },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.text-reveal',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Magnetic efekt pro tlačítka
    const buttons = document.querySelectorAll('.magnetic-button')
    buttons.forEach(button => {
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
    })

    // Scroll-triggered counter animace
    const counters = document.querySelectorAll('.counter')
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'))
      
      ScrollTrigger.create({
        trigger: counter,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(counter, {
            textContent: target,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            stagger: 0.2
          })
        }
      })
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return <>{children}</>
}
}

// Komponenta pro GSAP timeline animace
export const GSAPTimeline = ({ children, className = '' }) => {
  const elementRef = useRef()

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    const childElements = elementRef.current?.children
    if (childElements) {
      tl.fromTo(childElements,
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out'
        }
      )
    }

    return () => tl.kill()
  }, [children])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Scroll progress indikátor
export const ScrollProgress = () => {
  const progressRef = useRef()

  useEffect(() => {
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
      }
    })
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
    gsap.fromTo(textRef.current,
      {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0
      },
      {
        clipPath: 'inset(0 0% 0 0)',
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    )
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
    const items = listRef.current?.children
    if (items) {
      gsap.fromTo(items,
        {
          opacity: 0,
          x: -30,
          rotation: -5
        },
        {
          opacity: 1,
          x: 0,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }
  }, [children])

  return (
    <div ref={listRef} className={className}>
      {children}
    </div>
  )
}

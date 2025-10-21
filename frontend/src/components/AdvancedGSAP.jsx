import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

// Hlavní komponenta pro pokročilé GSAP scroll animace
export const AdvancedGSAPAnimations = () => {
  useEffect(() => {
    // Smooth scrolling s momentum
    gsap.registerEffect({
      name: "smoothScroll",
      effect: (targets) => {
        const tl = gsap.timeline()
        
        ScrollTrigger.create({
          trigger: targets[0],
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: self => {
            gsap.to(targets, {
              y: self.progress * -100,
              duration: 0.3,
              ease: "power2.out"
            })
          }
        })
        
        return tl
      },
      defaults: { duration: 2 },
      extendTimeline: true
    })

    // Text typing efekt
    gsap.registerEffect({
      name: "typeText",
      effect: (targets, config) => {
        const tl = gsap.timeline()
        
        targets.forEach(target => {
          const text = target.textContent
          target.textContent = ""
          
          tl.to(target, {
            duration: config.duration,
            text: text,
            ease: "none",
            delay: config.delay || 0
          })
        })
        
        return tl
      },
      defaults: { duration: 2, delay: 0 }
    })

    // Floating particles efekt
    const createFloatingParticles = () => {
      const particles = document.querySelectorAll('.floating-particle')
      
      if (particles.length === 0) return

      particles.forEach((particle, index) => {
        gsap.set(particle, {
          scale: Math.random() * 0.8 + 0.5,
          opacity: Math.random() * 0.6 + 0.4
        })

        // Hlavní floating animace
        gsap.to(particle, {
          y: "-=200",
          duration: Math.random() * 15 + 20,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 3
        })

        // Horizontální pohyb
        gsap.to(particle, {
          x: "+=100",
          duration: Math.random() * 20 + 25,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 2
        })

        // Pulsing efekt
        gsap.to(particle, {
          scale: `+=${Math.random() * 0.3 + 0.1}`,
          duration: Math.random() * 3 + 2,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.1
        })

        // Opacity breathing
        gsap.to(particle, {
          opacity: `+=${Math.random() * 0.3 + 0.2}`,
          duration: Math.random() * 4 + 3,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 1
        })
      })
    }

    // Morphing shapes animace
    const morphingShapes = document.querySelectorAll('.morphing-shape')
    if (morphingShapes.length > 0) {
      morphingShapes.forEach(shape => {
        const tl = gsap.timeline({ repeat: -1, yoyo: true })
        
        tl.to(shape, {
          duration: 3,
          rotation: 360,
          scale: 1.2,
          ease: "power2.inOut"
        })
        .to(shape, {
          duration: 2,
          borderRadius: "50%",
          ease: "back.inOut(1.7)"
        }, 0)
        .to(shape, {
          duration: 4,
          skewX: 15,
          skewY: 5,
          ease: "elastic.inOut(1, 0.3)"
        }, 1)
      })
    }

    // Scroll-triggered reveal animations
    const revealElements = gsap.utils.toArray('.reveal-up')
    revealElements.forEach(element => {
      // Nastavíme počáteční stav
      gsap.set(element, {
        y: 100,
        opacity: 0,
        scale: 0.8,
        rotationX: 45
      })

      gsap.to(element, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      })
    })

    // Text splitting a reveal
    const textElements = gsap.utils.toArray('.split-text')
    textElements.forEach(element => {
      const text = element.textContent
      if (!text) return

      const chars = text.split('')
      element.innerHTML = chars.map(char => 
        char === ' ' ? ' ' : `<span class="char">${char}</span>`
      ).join('')

      const charElements = element.querySelectorAll('.char')
      if (charElements.length === 0) return

      // Nastavíme počáteční stav
      gsap.set(charElements, {
        y: 50,
        opacity: 0,
        rotation: 15
      })

      gsap.to(charElements, {
        y: 0,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.02,
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      })
    })

    // Enhanced cursor efekt
    const cursor = document.querySelector('.custom-cursor')
    if (cursor) {
      gsap.set(cursor, { xPercent: -50, yPercent: -50 })

      const handleMouseMove = (e) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.05,
          ease: "power2.out"
        })
      }

      window.addEventListener('mousemove', handleMouseMove)

      // Funkce pro aktualizaci interaktivních elementů
      const updateInteractiveElements = () => {
        const interactiveElements = document.querySelectorAll('button, a, [role="button"], .magnetic, .magnetic-button, input, textarea, select, [onclick], [href]')
        
        interactiveElements.forEach(element => {
          const handleMouseEnter = () => {
            gsap.to(cursor, {
              scale: 1.8,
              duration: 0.3,
              ease: "back.out(1.7)"
            })
            // Přidáme třídu pro styling
            cursor.classList.add('cursor-hover')
          }

          const handleMouseLeave = () => {
            gsap.to(cursor, {
              scale: 1,
              duration: 0.3,
              ease: "back.out(1.7)"
            })
            // Odebereme třídu
            cursor.classList.remove('cursor-hover')
          }

          element.addEventListener('mouseenter', handleMouseEnter)
          element.addEventListener('mouseleave', handleMouseLeave)
        })
      }

      // Spustíme při načtení
      updateInteractiveElements()

      // Speciální efekt pro magnetic elementy
      const magneticElements = document.querySelectorAll('.magnetic, .magnetic-button')
      magneticElements.forEach(element => {
        const handleMouseEnter = () => {
          gsap.to(cursor, {
            scale: 2.2,
            duration: 0.3,
            ease: "back.out(1.7)"
          })
          cursor.classList.add('cursor-magnetic')
        }

        const handleMouseLeave = () => {
          gsap.to(cursor, {
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.7)"
          })
          cursor.classList.remove('cursor-magnetic')
        }

        element.addEventListener('mouseenter', handleMouseEnter)
        element.addEventListener('mouseleave', handleMouseLeave)
      })
    }

    // Section transitions - zkušební version bez clip-path
    const sections = gsap.utils.toArray('section')
    sections.forEach((section, i) => {
      if (i === 0) return // Skip hero section
      
      // Nastavíme počáteční stav
      gsap.set(section, {
        opacity: 0,
        y: 50
      })

      gsap.to(section, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      })
    })

    // Delay particles initialization to ensure DOM is ready
    const timer = setTimeout(() => {
      createFloatingParticles()
    }, 100)

    // Cleanup
    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return null // This is a utility component
}

// Komponenta pro custom cursor
export const CustomCursor = () => {
  return (
    <div className="custom-cursor fixed w-6 h-6 bg-white rounded-full pointer-events-none z-100 mix-blend-difference border-2 border-white/20" 
         style={{
           transform: 'translate(-50%, -50%)',
         }} />
  )
}

// Komponenta pro floating particles
export const FloatingParticles = ({ count = 15 }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="floating-particle absolute w-2 h-2 bg-white/40 rounded-full shadow-lg"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 10px rgba(255,255,255,0.3)',
          }}
        />
      ))}
    </div>
  )
}

// Wrapper pro morphing shapes
export const MorphingShape = ({ children, className = '' }) => {
  return (
    <div className={`morphing-shape ${className}`}>
      {children}
    </div>
  )
}

// Wrapper pro reveal animace
export const RevealUp = ({ children, className = '' }) => {
  return (
    <div className={`reveal-up ${className}`}>
      {children}
    </div>
  )
}

// Wrapper pro split text animace
export const SplitText = ({ children, className = '' }) => {
  return (
    <div className={`split-text ${className}`}>
      {children}
    </div>
  )
}

// GSAP Loading Screen komponenta - jednoduchá a moderní
export const GSAPLoadingScreen = () => {
  useEffect(() => {
    // Logo pulse animation
    gsap.fromTo('.loading-logo',
      { scale: 0.8, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 1.2, 
        ease: "back.out(1.7)",
        onComplete: () => {
          // Continuous pulse
          gsap.to('.loading-logo', {
            scale: 1.05,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          })
        }
      }
    )

    // Rotating circle
    gsap.to('.loading-circle', {
      rotation: 360,
      duration: 2,
      repeat: -1,
      ease: "none"
    })

    // Dots animation
    gsap.fromTo('.loading-dot',
      { opacity: 0.3, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1,
        duration: 0.6,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      }
    )

    return () => {
      gsap.killTweensOf('.loading-logo, .loading-circle, .loading-dot')
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center overflow-hidden z-50">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-pulse"></div>
      
      {/* Main content */}
      <div className="relative flex flex-col items-center gap-12">
        
        {/* Logo with rotating circle */}
        <div className="relative">
          {/* Rotating circle */}
          <div className="loading-circle absolute -inset-8 border-2 border-transparent border-t-white/40 border-r-white/20 rounded-full"></div>
          
          {/* Logo */}
          <div className="loading-logo relative w-32 h-32 rounded-2xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl">
            <img 
              src="/src/assets/logo_vector.png" 
              alt="Logo" 
              className="w-24 h-24 object-contain"
            />
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex items-center gap-2">
          <div className="loading-dot w-2 h-2 bg-white rounded-full"></div>
          <div className="loading-dot w-2 h-2 bg-white rounded-full"></div>
          <div className="loading-dot w-2 h-2 bg-white rounded-full"></div>
        </div>

      </div>
    </div>
  )
}

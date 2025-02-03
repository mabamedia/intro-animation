import gsap from 'gsap'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const IntroAnimation = ({ logoSrc, onComplete }) => {
  const containerRef = useRef(null)
  const logoRef = useRef(null)
  const overlayRef = useRef(null)
  const trailRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete()
      },
    })

    gsap.set(logoRef.current, { yPercent: -100, opacity: 0 })
    gsap.set([overlayRef.current, trailRef.current], { yPercent: 0 })

    tl.fromTo(
      logoRef.current,
      {},
      {
        yPercent: 10,
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out',
      },
    )
      .to({}, { duration: 0.2 })
      .to(logoRef.current, {
        yPercent: 10,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
      })
      .to(
        overlayRef.current,
        {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut',
        },
        '-=0.2',
      )
      .to(
        trailRef.current,
        {
          yPercent: -100,
          duration: 1.2,
          ease: 'power4.inOut',
        },
        '-=0.9',
      )

    return () => tl.kill()
  }, [onComplete])

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 overflow-hidden">
      <div ref={overlayRef} className="absolute inset-0 bg-black" />
      <div ref={trailRef} className="absolute inset-0 -z-1 bg-indigo-600" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-24 w-24 overflow-hidden">
          <Image
            ref={logoRef}
            src={logoSrc}
            alt="Logo"
            fill
            priority
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
    </div>
  )
}

export default IntroAnimation

import React, { useRef, useEffect } from 'react'
import PreviewCompatibleImage from './PreviewCompatibleImage'

import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'gatsby'
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const Tinnewerck = ({ heading, content, image }) => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef(null)
  useEffect(() => {
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        scrub: 1,
        start: 'top bottom',
      },
      xPercent: -40,
    })

    gsap.from(cardsRef.current, {
      y: 100,
      ease: 'power4',
      opacity: 0,
      duration: 2,
      delay: 0.5,
      scrollTrigger: {
        start: 'top bottom',
        trigger: sectionRef.current,
      },
    })
  }, [])

  return (
    <div ref={sectionRef} style={{ padding: '25px 50px', overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignItems: 'baseline',
        }}
      >
        <h2
          ref={titleRef}
          style={{
            fontSize: 'calc(16px + 8vw)',
            textAlign: 'center',
            margin: '25px 25px 25px 20vw',
            color: 'var(--theme--color)',
          }}
        >
          TINnewerck
        </h2>
        <Link
          to='/archief'
          style={{
            color: 'var(--theme--color)',
            marginRight: '3vw',
            fontSize: 18,
          }}
        >
          <span>-------- </span>
          Archief
        </Link>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
          margin: '55px auto',
          maxWidth: 1250,
          flexWrap: 'wrap',
        }}
        ref={cardsRef}
      >
        <div
          style={{
            width: 300,
            height: 440,

            boxShadow:
              '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)',
          }}
        >
          <div style={{ objectFit: 'cover', height: '100%' }}>
            <PreviewCompatibleImage imageInfo={image} />
          </div>
        </div>
        <div
          style={{
            width: 300,
            height: 440,
            boxShadow:
              '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)',
          }}
        >
          <div style={{ objectFit: 'cover', height: '100%' }}>
            <PreviewCompatibleImage imageInfo={image} />
          </div>
        </div>
        <div
          style={{
            width: 300,
            height: 440,
            boxShadow:
              '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)',
          }}
        >
          <div style={{ objectFit: 'cover', height: '100%' }}>
            <PreviewCompatibleImage imageInfo={image} />
          </div>
        </div>
      </div>

      <p style={{ textAlign: 'center', margin: '60px 0 15vh' }}>{content}</p>
    </div>
  )
}

export default Tinnewerck

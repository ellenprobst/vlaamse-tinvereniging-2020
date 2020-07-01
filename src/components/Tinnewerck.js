import React, { useRef, useEffect } from 'react'
import PreviewCompatibleImage from './PreviewCompatibleImage'

import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const Tinnewerck = ({ heading, content, image }) => {
  const triggerRef = useRef(null)
  const titleRef = useRef(null)
  useEffect(() => {
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: triggerRef.current,
        scrub: 1,
        start: 'top bottom',
        end: 'top top',
      },

      xPercent: -20,
    })
  }, [])

  return (
    <div ref={triggerRef} style={{ minHeight: '100vh', padding: '25px 50px' }}>
      <h2
        ref={titleRef}
        style={{
          fontSize: '8vw',
          textAlign: 'center',
          margin: 25,
          color: '#8e986e',
        }}
      >
        TINnewerck
      </h2>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
          margin: '55px auto',
          maxWidth: 1250,
        }}
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
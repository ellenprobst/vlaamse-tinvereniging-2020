import React, { useRef, useEffect } from 'react'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import Fade from 'react-reveal/Fade'

import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const Tinnewerck = ({ heading, content, image }) => {
  const trigger3Ref = useRef(null)
  const title3Ref = useRef(null)
  useEffect(() => {
    gsap.from(title3Ref.current, {
      xPercent: -50,
      scrollTrigger: {
        trigger: trigger3Ref.current,
        scrub: 0.1,
        start: 'top bottom',
        end: 'top top',
      },
    })
  }, [])

  return (
    <div ref={trigger3Ref} style={{ minHeight: '100vh', padding: '25px 50px' }}>
      <h2
        ref={title3Ref}
        style={{
          fontSize: '8vw',
          textAlign: 'center',
          margin: 25,
          color: '#8e986e',
        }}
      >
        TINnewerck
      </h2>
      <Fade bottom>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            margin: '55px 0',
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
      </Fade>
      <p style={{ textAlign: 'center', margin: '60px 0 15vh' }}>{content}</p>
    </div>
  )
}

export default Tinnewerck

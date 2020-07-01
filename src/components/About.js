import React, { useRef, useEffect } from 'react'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const About = ({ heading, content, image }) => {
  const triggerRef = useRef(null)
  const imageRef = useRef(null)
  const titleRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.from(titleRef.current, {
      y: 400,
      ease: 'power4',
      opacity: 0,
      duration: 2,
      scrollTrigger: {
        start: 'top bottom',
        trigger: sectionRef.current,
      },
    })

    gsap.from(imageRef.current, {
      yPercent: -45,
      opacity: 0.8,
      scrollTrigger: {
        trigger: triggerRef.current,
        scrub: true,
      },
    })
  }, [])

  return (
    <div
      ref={sectionRef}
      style={{
        maxWidth: 1450,
        margin: '0 auto',
        padding: '10vw 0',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'stretch',
      }}
    >
      <div style={{ width: '65%', padding: 20 }}>
        <div style={{ margin: '0 auto', maxWidth: 655 }} ref={triggerRef}>
          <div style={{ overflow: 'hidden' }}>
            <h2
              ref={titleRef}
              style={{
                fontSize: '8vw',
                marginBottom: '4rem',
                lineHeight: '0.7em',
                color: '#8e986e',
              }}
            >
              {heading}
            </h2>
          </div>
          <div style={{ maxWidth: 500 }}>
            <p style={{ fontWeight: 'bold', margin: '15px 0 25px' }}>
              {content}
            </p>
            <p>{content}</p>
          </div>
        </div>
      </div>
      <div
        style={{
          width: '35%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <div
          ref={imageRef}
          style={{
            width: '100%',

            boxShadow:
              '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)',
          }}
        >
          <PreviewCompatibleImage imageInfo={image} />
        </div>
      </div>
    </div>
  )
}

export default About

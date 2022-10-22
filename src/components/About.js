import React, { useRef, useEffect } from 'react'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import styled from 'styled-components'
import { media, wrapper } from '../themes'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const Wrapper = styled.div`
  max-width: ${wrapper};
  margin: 0 auto;
  padding: 0 20px 35px;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;

  @media ${media.tablet} {
    padding: 10vw 0;
  }
`
const LeftContainer = styled.div`
  padding: 20px;
  width: 40%;

  @media ${media.tablet} {
    width: 50%;
  }

  @media ${media.mobile} {
    width: 100%;
  }
`
const RightContainer = styled.div`
  width: calc(45% - 4vw);
  max-width: 800px;
  margin-left: 4vw;
  align-self: center;
  @media ${media.tablet} {
    width: calc(50% - 4vw);
  }

  @media ${media.mobile} {
    width: 100%;
    margin: 15px;
  }
`
const OverflowContainer = styled.div`
  overflow: hidden;
  margin-bottom: 4rem;
`
const Title = styled.h2`
  font-size: clamp(16px, 12vw, 80px);
  line-height: 0.9em;
  color: var(--theme--color);
  text-align: right;

  @media ${media.mobile} {
    text-align: left;
  }
`

const ImageContainer = styled.div`
  max-width: 500px;
  margin-top: 10vh;

  @media ${media.tablet} {
    margin-top: 1vh;
  }
`

const About = ({ titel, text, image }) => {
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
        start: 'top center',
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
    <Wrapper ref={sectionRef}>
      <LeftContainer ref={triggerRef}>
        <OverflowContainer>
          <Title ref={titleRef} id='overons'>
            {titel}
          </Title>
        </OverflowContainer>
        <ImageContainer>
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
        </ImageContainer>
      </LeftContainer>
      <RightContainer>
        <p style={{ whiteSpace: 'pre-wrap' }}>{text}</p>
      </RightContainer>
    </Wrapper>
  )
}

export default About

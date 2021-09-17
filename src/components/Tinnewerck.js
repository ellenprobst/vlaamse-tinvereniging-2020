import React, { useRef, useEffect } from 'react'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import styled from 'styled-components'
import { media, boxShadow, wrapper } from '../themes'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'gatsby'
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const SectionContainer = styled.div``
const Wrapper = styled.div`
  padding: 35px 10px;
  overflow: hidden;
  max-width: ${wrapper};
  margin: 0 auto;
  position: relative;
  @media ${media.mobile} {
    padding: 25px;
  }
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: baseline;
`

const Title = styled.h2`
  font-size: calc(16px + 8vw);
  text-align: center;
  margin: 25px 25px 25px 20vw;
  font-size: clamp(16px, 12vw, 80px);
  line-height: 0.9em;
  color: var(--theme--color);
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 55px auto;
  flex-wrap: wrap;
  @media ${media.tablet} {
    justify-content: center;
  }
`

const Description = styled.p`
  text-align: center;
  margin: 60px 0 35px;
`

const Card = styled.div`
  width: 300px;
  box-shadow: ${boxShadow};
  margin: 10px;
  @media ${media.tablet} {
    margin: 10px 0;
  }
`
const ImageContainer = styled.div`
  object-fit: cover;
  height: 100%;
`
const Arrow = styled.div`
  width: 30px;

  margin-left: 10px;

  svg {
    transform: rotate(90deg);
  }
`

const Tinnewerck = ({ titel, text, edities }) => {
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
      scrollTrigger: {
        start: 'center bottom',
        trigger: sectionRef.current,
      },
    })
  }, [])

  return (
    <SectionContainer>
      <Wrapper>
        <TitleContainer>
          <Title id='tinnewerck'>{titel}</Title>
          <Link
            to='/archief'
            style={{
              color: 'var(--theme--color)',
              marginRight: '3vw',
              fontSize: 20,
              borderBottom: '1px solid var(--theme--color)',
              display: 'flex',
              padding: '0 3px 0 0',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            Naar het archief{' '}
            <Arrow>
              <svg width='100%' viewBox='0 0 20 20' fill='currentColor'>
                <path d='M11 2.206l-6.235 7.528-.765-.645 7.521-9 7.479 9-.764.646-6.236-7.53v21.884h-1v-21.883z' />
              </svg>
            </Arrow>
          </Link>
        </TitleContainer>
        <FlexContainer ref={cardsRef}>
          {edities
            .sort((a, b) => b.nummer - a.nummer)
            .slice(-3)
            .map((editie) => {
              return (
                <Card key={editie.nummer}>
                  <ImageContainer>
                    <PreviewCompatibleImage
                      imageInfo={{ image: editie.image, alt: '' }}
                    />
                  </ImageContainer>
                </Card>
              )
            })}
        </FlexContainer>

        <Description>{text}</Description>
      </Wrapper>
    </SectionContainer>
  )
}

export default Tinnewerck

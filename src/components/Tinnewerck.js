import React, { useRef, useEffect } from 'react'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import styled from 'styled-components'
import { media, boxShadow } from '../themes'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'gatsby'
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const Wrapper = styled.div`
  padding: 25px 50px;
  overflow: hidden;

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
  color: var(--theme--color);
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 55px auto;
  max-width: 1250;
  flex-wrap: wrap;
`

const Description = styled.p`
  text-align: center;
  margin: 60px 0 15vh;
`

const Card = styled.div`
  width: 300px;
  box-shadow: ${boxShadow};

  @media ${media.tablet} {
    margin: 10px 0;
  }
`
const ImageContainer = styled.div`
  object-fit: cover;
  height: 100%;
`

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
    <Wrapper ref={sectionRef}>
      <TitleContainer>
        <Title ref={titleRef}>TINnewerck</Title>
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
      </TitleContainer>
      <FlexContainer ref={cardsRef}>
        <Card>
          <ImageContainer>
            <PreviewCompatibleImage imageInfo={image} />
          </ImageContainer>
        </Card>
        <Card>
          <ImageContainer>
            <PreviewCompatibleImage imageInfo={image} />
          </ImageContainer>
        </Card>
        <Card>
          <ImageContainer>
            <PreviewCompatibleImage imageInfo={image} />
          </ImageContainer>
        </Card>
      </FlexContainer>

      <Description>{content}</Description>
    </Wrapper>
  )
}

export default Tinnewerck

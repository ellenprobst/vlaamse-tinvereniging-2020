import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styled from 'styled-components'
import { media, boxShadow } from '../themes'
import { Link } from 'gatsby'

const Container = styled.header`
  opacity: 0;
  position: relative;
  display: flex;
  align-items: center;

  @media ${media.tablet} {
    margin-top: 65px;
  }
  @media ${media.mobile} {
    margin-top: 50px;
  }
`
const ContentContainer = styled.div`
  padding: 5vw;
  position: absolute;
  left: 0;
  z-index: 1;
`
const HeroContainer = styled.div`
  width: 60vw;
  height: calc(100vh);
  min-height: 600px;
  margin-left: auto;

  @media ${media.tablet} {
    height: calc(100vh - 65px);
  }

  @media ${media.mobile} {
    width: 100vw;
    height: calc(100vh - 40px);
  }
`

const StyledLink = styled(Link)`
  border: 2px solid var(--theme--color);
  border-radius: 3px;
  background: var(--theme--color);
  padding: 10px 20px;
  color: var(--white);
  width: 180px;
  border-radius: 25px;
  display: block;
  text-align: center;
  transition: all 300ms ease;

  :hover {
    opacity: 1;
    transform: scale(1.1) !important;
    box-shadow: ${boxShadow};
    color: var(--white);
  }
`

const OverflowContainer = styled.div`
  overflow-y: hidden;
`

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`

const SubTitle = styled.h2`
  font-size: calc(14px + 3vw);
  color: var(--theme--color);
`

const SubLineContainer = styled.div`
  overflow: hidden;
  flex-grow: 1;
  max-width: 800px;
  margin: 0 5vw 0 15px;
`

const Subline = styled.div`
  margin-left: 15px;
  background-color: var(--theme--color);
  opacity: 0.4;
  height: 1px;
`

const MainTitle = styled.h1`
  font-size: calc(16px + 6.6vw);
  color: var(--theme--color);
  margin-top: -2vw;
  z-index: 1;
`

const Intro = styled.p`
  margin: 55px 0;
  overflow-y: hidden;
  max-width: 25vw;

  @media ${media.mobile} {
    max-width: 300px;
    color: var(--white);
    font-size: 14px;
    margin-bottom: 23px;
  }
`

const Image = styled.img`
  object-fit: cover;
  height: 100%;

  @media ${media.mobile} {
    opacity: 0.8;
    filter: brightness(0.5);
  }
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--white);
`

const Header = ({ titel, image }) => {
  const overlayRef = useRef(null)
  const introRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonRef = useRef(null)
  const lineRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    let tl = gsap.timeline()
    tl.set(sectionRef.current, { opacity: 1 })
      .from(subtitleRef.current, {
        y: 400,
        ease: 'power4',
        duration: 3,
        opacity: 0,
      })
      .from(
        titleRef.current,
        {
          y: 400,
          ease: 'power4',
          duration: 3,
          opacity: 0,
        },
        0.4
      )
      .from(
        introRef.current,
        {
          x: -100,
          opacity: 0,
          ease: 'power4',
          duration: 3,
        },
        0.7
      )
      .from(
        buttonRef.current,
        {
          y: 100,
          opacity: 0,
          transition: 'none',
          ease: 'power4',
          duration: 3,
        },
        0.9
      )
      .from(
        lineRef.current,
        {
          x: '-150%',
          ease: 'power4',
          duration: 3,
          opacity: 0,
        },
        1
      )
      .to(
        overlayRef.current,
        {
          top: '100vh',
          ease: 'power4',
          duration: 2,
        },
        1
      )
  }, [])

  return (
    <Container ref={sectionRef}>
      <ContentContainer>
        <OverflowContainer>
          <FlexContainer ref={subtitleRef}>
            <SubTitle>Vlaamse</SubTitle>
            <SubLineContainer>
              <Subline ref={lineRef} />
            </SubLineContainer>
          </FlexContainer>
        </OverflowContainer>
        <OverflowContainer>
          <MainTitle ref={titleRef}>Tinvereniging</MainTitle>
        </OverflowContainer>
        <Intro ref={introRef}>{titel} </Intro>
        <StyledLink to='/#activiteiten' ref={buttonRef}>
          Activiteiten
        </StyledLink>
      </ContentContainer>
      <HeroContainer>
        <Overlay ref={overlayRef} />
        <Image
          style={{ width: '100%' }}
          aria-hidden='true'
          src={
            !!image.childImageSharp ? image.childImageSharp.fluid.src : image
          }
        />
      </HeroContainer>
    </Container>
  )
}
export default Header

import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { media, boxShadow, wrapper } from '../themes'
import calendarIcon from '../img/icons-calendar.svg'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const SectionContainer = styled.div`
  max-width: ${wrapper};
  margin: 0 auto;
  padding: 10vh 20px;
  position: relative;

  @media ${media.tablet} {
    padding: 0 20px 35px;
  }
`

const SideContainer = styled.div`
  max-width: 400px;
  margin-right: 55px;
  position: relative;
  white-space: pre-wrap;
`
const TitleContainer = styled.div`
  overflow: hidden;
`
const Title = styled.h2`
  font-size: calc(14px + 8vw);
  font-size: clamp(16px, 12vw, 80px);
  line-height: 0.9em;
  margin: 35px 0;
  color: var(--theme--color);
`

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 35px;
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${media.tablet} {
    flex-wrap: wrap;
  }
`

const Card = styled.div`
  height: min-content;
  border-radius: 5px;
  margin: 10px;
  max-width: 420px;
  box-shadow: ${boxShadow};
  flex-basis: 280px;
  flex-grow: 1;
  @media ${media.tablet} {
    max-width: 314px;
  }

  @media ${media.mobile} {
    margin: 10px 0;
  }
`

// const CardImage = styled.div`
//   height: 200px;
//   background-size: cover;
//   background-position: center;
//   border-radius: 5px 5px 0 0;
// `

const CardContent = styled.div`
  border-radius: 0 0 5px 5px;
  padding: 25px 25px 45px 25px;
  font-size: 0.8rem;
  background: var(--white);
`

const CardTitle = styled.h3`
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
`

const CardDate = styled.p`
  display: flex;
  align-items: center;
  opacity: 0.6;
  margin-bottom: 15px;
`
const Icon = styled.img`
  width: 1em;
  height: 1em;
  margin-top: 3px;
  margin-right: 8px;
  opacity: 0.8;
`

const Activities = ({ titel, text, items }) => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef(null)
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

    gsap.from(cardsRef.current, {
      y: 200,
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
    <SectionContainer ref={sectionRef}>
      <TitleContainer>
        <Title ref={titleRef} id='activiteiten'>
          {titel}
        </Title>
      </TitleContainer>
      <FlexContainer>
        <SideContainer>{text}</SideContainer>
        <CardsContainer ref={cardsRef}>
          {items.map((item) => {
            return (
              <Card>
                <div
                  style={{
                    height: 200,
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '3px 3px 0 0 ',
                  }}
                ></div>
                <CardContent>
                  <CardTitle>{item.titel}</CardTitle>
                  <CardDate>
                    <Icon src={calendarIcon} alt='calendar' />
                    {item.datum}
                  </CardDate>
                  <p>{item.text}</p>
                </CardContent>
              </Card>
            )
          })}
        </CardsContainer>
      </FlexContainer>
    </SectionContainer>
  )
}

export default Activities

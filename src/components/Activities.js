import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { media, boxShadow } from '../themes'
import museumbezoek from '../img/museumbezoek.jpg'
import ledenvergadering from '../img/ledenvergadering.jpg'
import calendarIcon from '../img/icons-calendar.svg'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const SectionContainer = styled.div`
  max-width: 1550px;
  margin: 0 auto;
  padding: 0 35px 5vh;
  position: relative;

  @media ${media.tablet} {
    padding: 0 25px 35px;
  }
`

const SideContainer = styled.div`
  max-width: 500px;
  margin-right: 35px;
  position: relative;
`
const TitleContainer = styled.div`
  overflow: hidden;
`
const Title = styled.h2`
  font-size: calc(14px + 8vw);
  margin-bottom: 25px;
  color: var(--theme--color);
`

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 0 auto;
  margin-top: 35px;
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Card = styled.div`
  height: min-content;
  border-radius: 5px;
  margin: 20px;
  max-width: 350px;
  box-shadow: ${boxShadow};
  @media ${media.tablet} {
    margin: 10px;
    max-width: 314px;
  }

  @media ${media.mobile} {
    margin: 10px 0;
  }
`

const CardImage = styled.div`
  height: 200px;
  background-image: linear-gradient(
      to bottom,
      rgba(48, 49, 51, 0),
      rgba(48, 49, 51, 0.8)
    ),
    url(${museumbezoek});
  background-size: cover;
  background-position: center;
  border-radius: 5px 5px 0 0;
`

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

const Activities = ({ heading, content, image }) => {
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
          Activiteiten
        </Title>
      </TitleContainer>
      <FlexContainer>
        <SideContainer>
          <p>
            Jaarlijks worden twee ledenbijeenkomsten georganiseerd alsook een
            museumbezoek gericht op antiek en op oude tinnen voorwerpen.
          </p>
          <br />
          <p>
            Op de ledenbijeenkomsten worden door specialisten voordrachten
            gegeven over oud tin, de tinnegieters en hun merken. Er wordt tevens
            de mogelijkheid geboden aan de aanwezigen om hun stukken te laten
            keuren of identificeren.
          </p>
        </SideContainer>
        <CardsContainer ref={cardsRef}>
          <Card>
            <div
              style={{
                height: 200,
                backgroundImage: `linear-gradient(to bottom,rgba(48, 49, 51, 0),rgba(48, 49, 51, 0.8)),url(${ledenvergadering})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '3px 3px 0 0 ',
              }}
            ></div>
            <CardContent>
              <CardTitle>Ledenvergadering</CardTitle>
              <CardDate>
                <Icon src={calendarIcon} alt='calendar' />
                25 maart 2020
              </CardDate>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardImage />
            <CardContent>
              <CardTitle>Museumbezoek</CardTitle>
              <CardDate>
                <Icon src={calendarIcon} alt='calendar' />
                10 oktober 2020
              </CardDate>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </CardContent>
          </Card>
        </CardsContainer>
      </FlexContainer>
    </SectionContainer>
  )
}

export default Activities

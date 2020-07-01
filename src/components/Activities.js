import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import museumbezoek from '../img/museumbezoek.jpg'
import ledenvergadering from '../img/ledenvergadering.jpg'
import calendarIcon from '../img/icons-calendar.svg'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const SectionContainer = styled.div`
  max-width: 1550px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr 3vh 1fr 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin: 0 auto;
`
const SideContainer = styled.div`
  max-width: 500px;
  grid-area: 2 / 1 / 6 / 3;
`
const TitleContainer = styled.div`
  overflow: hidden;
  grid-area: 1 / 1 / 2 / 4;
`
const Title = styled.h2`
  font-size: 8vw;
  margin: 25px 0;
  color: #8e986e;
`

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-around;

  grid-area: 3 / 3 / 6 / 6;
`

const Card = styled.div`
  height: min-content;
  border-radius: 3px;
  margin: 10px;
  width: 350px;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
`

const CardImage = styled.div`
  height: 200px;
  background-image: linear-gradient(to bottom, rgba(48, 49, 51, 0), #1b1b1b),
    url(${museumbezoek});
  background-size: cover;
  background-position: center;
  border-radius: 3px 3px 0 0;
`

const CardContent = styled.div`
  border-radius: 3px;
  padding: 25px 25px 45px 25px;
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
  }, [])

  return (
    <SectionContainer ref={sectionRef}>
      <TitleContainer>
        <Title ref={titleRef}>Activiteiten</Title>
      </TitleContainer>
      <SideContainer>
        <p>
          Jaarlijks worden twee ledenbijeenkomsten georganiseerd alsook een
          museumbezoek gericht op antiek en op oude tinnen voorwerpen.
        </p>
        <br />
        <p>
          Op de ledenbijeenkomsten worden door specialisten voordrachten gegeven
          over oud tin, de tinnegieters en hun merken. Er wordt tevens de
          mogelijkheid geboden aan de aanwezigen om hun stukken te laten keuren
          of identificeren.
        </p>
      </SideContainer>
      <CardsContainer>
        <Card>
          <div
            style={{
              height: 200,
              backgroundImage: `linear-gradient(to bottom,rgba(48, 49, 51, 0),#1b1b1b),url(${ledenvergadering})`,
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
    </SectionContainer>
  )
}

export default Activities

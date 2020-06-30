import React, { useRef, useEffect } from 'react'
import museumbezoek from '../img/museumbezoek.jpg'
import ledenvergadering from '../img/ledenvergadering.jpg'
import calendarIcon from '../img/icons-calendar.svg'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

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
    <div
      ref={sectionRef}
      style={{ height: '100vh', display: 'flex', margin: '10vw 0' }}
    >
      <div
        style={{
          background: '#f5f5f5',
          width: '45vw',
          padding: 50,
          minWidth: 400,
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <h2
            ref={titleRef}
            style={{
              fontSize: '5vw',
              margin: '25px 0',
              color: '#8e986e',
            }}
          >
            Activiteiten
          </h2>
        </div>
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
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            height: 'min-content',
            borderRadius: 3,
            margin: 10,
            width: 350,
            boxShadow:
              '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)',
          }}
        >
          <div
            style={{
              height: 200,
              backgroundImage: `url(${ledenvergadering})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '3px 3px 0 0 ',
            }}
          ></div>
          <div style={{ borderRadius: 3, padding: ' 25px 25px 45px 25px' }}>
            <h3 style={{ fontWeight: 'bold' }}>Ledenvergadering</h3>
            <p
              style={{
                display: 'flex',
                alingItems: 'center',
                opacity: 0.8,
                marginBottom: 15,
              }}
            >
              <img
                src={calendarIcon}
                alt='calendar'
                style={{
                  width: '1em',
                  height: '1em',
                  marginTop: 5,
                  marginRight: 8,
                  opacity: 0.8,
                }}
              />
              25 maart 2020
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
        <div
          style={{
            height: 'min-content',
            borderRadius: 3,
            maring: 10,
            width: 350,
            boxShadow:
              '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)',
          }}
        >
          <div
            style={{
              height: 200,
              backgroundImage: `url(${museumbezoek})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '3px 3px 0 0 ',
            }}
          ></div>
          <div style={{ borderRadius: 3, padding: ' 25px 25px 45px 25px' }}>
            <h3 style={{ fontWeight: 'bold' }}>Museumbezoek</h3>
            <p
              style={{
                display: 'flex',
                alingItems: 'center',
                opacity: 0.8,
                marginBottom: 15,
              }}
            >
              <img
                src={calendarIcon}
                alt='calendar'
                style={{
                  width: '1em',
                  height: '1em',
                  marginTop: 5,
                  marginRight: 8,
                  opacity: 0.8,
                }}
              />
              10 oktober 2020
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activities

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styled from 'styled-components'

const Button = styled.button`
  border: 2px solid rgb(207, 209, 184);
  border-radius: 3px;
  background: rgb(207, 209, 184);
  padding: 10px 20px;
  color: #fff;
  width: 180px;
  border-radius: 25px;
  opacity: 0.8;
  transition: all 300ms ease;

  :hover {
    opacity: 1;
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
      0 5px 15px 0 rgba(0, 0, 0, 0.08);
  }
`

const Header = ({ title, image }) => {
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
          opacity: 0,
        },
        0.7
      )
      .from(
        buttonRef.current,
        {
          y: 100,
          opacity: 0,
          ease: 'power4',
          duration: 3,
          opacity: 0,
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
        2
      )
  }, [])

  return (
    <header
      ref={sectionRef}
      style={{
        opacity: 0,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '55vw',
          padding: '5vw',
          position: 'absolute',
          left: 0,
          zIndex: 1,
        }}
      >
        <div
          style={{
            overflowY: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
            ref={subtitleRef}
          >
            <h2 style={{ fontSize: '3vw', color: '#8e986e' }}>Vlaamse</h2>
            <div
              style={{
                overflow: 'hidden',
                flexGrow: 1,
                maxWidth: 800,
                margin: ' 0 5vw 0 15px',
              }}
            >
              <div
                ref={lineRef}
                style={{
                  marginLeft: 15,
                  backgroundColor: '#8e986e',
                  opacity: 0.4,
                  height: 1,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div style={{ overflowY: 'hidden' }}>
          <h1
            ref={titleRef}
            style={{
              fontSize: '6.6vw',
              color: '#8e986e',
              marginTop: '-2vw',
              zIndex: 1,
            }}
          >
            {title}
          </h1>
        </div>
        <p
          ref={introRef}
          style={{ margin: '55px 0', overflowY: 'hidden', maxWidth: '25vw' }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{' '}
        </p>
        <Button ref={buttonRef}>Activiteiten</Button>
      </div>
      <div
        style={{
          width: '60vw',
          height: 'calc(100vh)',
          marginLeft: 'auto',
        }}
      >
        <div
          ref={overlayRef}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: '#fff',
          }}
        ></div>
        <img
          aria-hidden='true'
          src={
            !!image.childImageSharp ? image.childImageSharp.fluid.src : image
          }
          style={{ objectFit: 'cover', height: '100%' }}
        />
      </div>
    </header>
  )
}
export default Header

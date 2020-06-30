import React, { useEffect, useRef } from 'react'
import { Link } from 'gatsby'

import logo from '../img/logo.png'
//import Fade from 'react-reveal/Fade'
import { gsap } from 'gsap'
const Navbar = () => {
  const navRef = useRef(null)
  const logoRef = useRef(null)

  useEffect(() => {
    let tl = gsap.timeline({ delay: 0.5 })

    tl.from(logoRef.current, {
      y: -40,
      opacity: 0,
      duration: 2,
      ease: 'power4',
    }).from(
      navRef.current,
      {
        y: -40,
        opacity: 0,
        duration: 2,
        ease: 'power4',
        stagger: 0.1,
      },
      '-=0.6'
    )
  }, [])

  return (
    // <Fade top>
    <nav
      role='navigation'
      aria-label='main-navigation'
      style={{
        fontFamily: 'sans-serif',
        fontSize: '14px',
        textTransform: 'uppercase',
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 1,
        top: 35,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '0 5vw',
        }}
      >
        <div>
          <img
            ref={logoRef}
            src={logo}
            alt='Vlaamse Tinvereniging'
            style={{
              width: '50px',
              display: 'block',
              position: 'absolute',
              left: '5vw',
              top: 0,
              zIndex: 1,
            }}
          />

          {/* Hamburger menu
            <div data-target='navMenu' onClick={() => this.toggleHamburger()}>
              <span />
              <span />
              <span />
            </div> */}
        </div>
        <div ref={navRef}>
          <div>
            <Link style={{ color: '#fff', fontWeight: 'bold' }}>Over Ons</Link>
            <Link style={{ marginLeft: 30, color: '#fff', fontWeight: 'bold' }}>
              Activiteiten
            </Link>
            <Link style={{ marginLeft: 30, color: '#fff', fontWeight: 'bold' }}>
              Tinnewerck
            </Link>
            <Link style={{ marginLeft: 30, color: '#fff', fontWeight: 'bold' }}>
              Vragen
            </Link>
            <Link style={{ marginLeft: 30, color: '#fff', fontWeight: 'bold' }}>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
    // </Fade>
  )
}

export default Navbar

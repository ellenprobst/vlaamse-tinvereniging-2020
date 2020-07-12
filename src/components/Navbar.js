import React, { useEffect, useRef } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import logo from '../img/logo.png'
import { gsap } from 'gsap'

const StyledLink = styled(Link)`
  margin-left: 30px;
  color: var(--white);
  font-weight: bold;
  position: relative;
  padding-bottom: 5px;
  :after {
    content: '';
    position: absolute;
    height: 1px;
    background-color: var(--theme--color);
    width: 0;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1) all;
  }

  :hover:after {
    width: 100%;
  }

  @media only screen and (max-width: 795px) {
    color: var(--text-color);
  }
`

const Nav = styled.nav`
  font-size: 14px;
  text-transform: uppercase;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;
  top: 0;
  padding-top: 15px;
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5vw;
`

const Image = styled.img`
  width: 50px;
  display: block;
`

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
    <Nav role='navigation' aria-label='main-navigation'>
      <FlexContainer>
        <div>
          <Image ref={logoRef} src={logo} alt='Vlaamse Tinvereniging' />

          {/* Hamburger menu
            <div data-target='navMenu' onClick={() => this.toggleHamburger()}>
              <span />
              <span />
              <span />
            </div> */}
        </div>
        <div ref={navRef}>
          <div>
            <StyledLink>Activiteiten</StyledLink>
            <StyledLink>Tinnewerck</StyledLink>
            <StyledLink>Vragen</StyledLink>
            <StyledLink>Contact</StyledLink>
          </div>
        </div>
      </FlexContainer>
    </Nav>
  )
}

export default Navbar

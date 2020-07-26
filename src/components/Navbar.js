import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import logo from '../img/logo.png'
import { gsap } from 'gsap'
import { media } from '../themes'
import Hamburger from './Hamburger'

const Nav = styled.nav`
  font-size: 14px;
  text-transform: uppercase;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  padding: 10px 0;
  z-index: 1;
  height: 65px;

  @media ${media.mobile} {
    height: 40px;
    position: ${({ active }) => (active ? 'fixed' : 'absolute')};
    background: var(--white);
    z-index: 2;
  }
`

const Menu = styled.div`
  @media ${media.mobile} {
    transform: ${({ active }) =>
      active ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease-in-out;
    position: fixed;
    top: 40px;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: var(--white);
    z-index: 10;

    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 25px 0;
  }
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5vw;

  @media ${media.mobile} {
    padding: 0 10px;
  }
`

const Logo = styled.img`
  width: 50px;
  display: block;
  @media ${media.mobile} {
    width: 25px;
  }
`

const LogoContainer = styled.div``

const HamburgerContainer = styled.div`
  display: none;

  @media ${media.mobile} {
    display: block;
    margin-left: auto;
  }
`

const MenuContainer = styled.div``

const StyledLink = styled(Link)`
  margin-left: 15px;
  color: var(--white);
  /* font-weight: bold; */
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

  @media ${media.tablet} {
    color: var(--text-color);
  }

  @media ${media.mobile} {
    margin: 15px 0;
    text-align: center;
    font-size: 18px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`

const Navbar = () => {
  const navRef = useRef(null)
  const logoRef = useRef(null)
  const [isMenuActive, setState] = useState(false)

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
    <Nav active={isMenuActive} role='navigation' aria-label='main-navigation'>
      <FlexContainer>
        <LogoContainer>
          <Logo ref={logoRef} src={logo} alt='Vlaamse Tinvereniging' />
        </LogoContainer>
        <HamburgerContainer onClick={() => setState(!isMenuActive)}>
          <Hamburger active={isMenuActive} />
        </HamburgerContainer>
        <MenuContainer ref={isMenuActive ? navRef : null}>
          <Menu active={isMenuActive} onClick={() => setState(!isMenuActive)}>
            <StyledLink>Over Ons</StyledLink>
            <StyledLink>Activiteiten</StyledLink>
            <StyledLink>Tinnewerck</StyledLink>
            <StyledLink>Vragen</StyledLink>
            <StyledLink>Contact</StyledLink>
          </Menu>
        </MenuContainer>
      </FlexContainer>
    </Nav>
  )
}

export default Navbar

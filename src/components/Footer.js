import React from 'react'
import styled from 'styled-components'
import contactImage from '../img/bord.jpg'
import { media } from '../themes'

const Wrapper = styled.footer`
  position: fixed;
  height: 500px;
  z-index: -1;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--black);
  display: flex;

  @media ${media.tablet} {
    margin: 16px;
  }
  @media ${media.mobile} {
    margin: 0;
  }
`

const ContentContainer = styled.div`
  color: var(--white);
  margin: 0 auto;
  padding: 0px 8vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyledLink = styled.a`
  text-decoration: underline;
`

const Title = styled.h2`
  font-size: 30px;
  margin-bottom: 15px;
`
const SubTitle = styled.h4`
  font-weight: bold;
  margin: 30px 0 10px;
  /* color: #8d976e; */
`

const Copyright = styled.p`
  position: absolute;
  bottom: 10px;
  opacity: 0.5;
  text-align: center;
  width: 100%;
  color: var(--white);
  font-size: 12px;
`

const Footer = () => (
  <Wrapper>
    <div style={{ width: '65%' }}>
      <h2
        style={{
          fontSize: '8vw',
          marginBottom: 35,
          color: 'var(--theme--color)',
          lineHeight: 1,
          padding: '35px 35px 35px 70px',
        }}
      >
        Contact
      </h2>
      <ContentContainer>
        {/* <Title>Vlaamse Tinvereniging</Title> */}
        {/* <SubTitle>Contact:</SubTitle> */}
        <p>0032 (0) 475 52 80 72</p>
        <StyledLink href='mailto:secretariaat@vlaamsetinvereniging.be'>
          secretariaat@vlaamsetinvereniging.be
        </StyledLink>
        <SubTitle>Links:</SubTitle>
        <ul>
          <li>
            <a href='#'>Nederlandse Tinvereniging</a>
          </li>
          <li>
            <a href='#'>Pewter Society</a>
          </li>
          <li>
            <a href='#'>Pewters Collectors' Club of America</a>
          </li>
        </ul>
      </ContentContainer>
    </div>

    <div
      style={{
        width: '45%',
        backgroundImage: `url(${contactImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'left center',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundImage:
            'linear-gradient( to left, rgba(48,49,51,0), var(--black) )',
        }}
      ></div>
    </div>

    <Copyright>© {new Date().getFullYear()} - Vlaamse Tinvereniging </Copyright>
  </Wrapper>
)

export default Footer

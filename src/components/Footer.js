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
    height: 400px;
  }
`

const TextContainer = styled.div`
  color: var(--white);
  margin: 0 auto;
  padding: 0 0 0 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    padding: 0 0 0 25px;
  }
`

const StyledLink = styled.a`
  text-decoration: underline;
  width: fit-content;
`

const Title = styled.h2`
  font-size: 8vw;
  margin-bottom: 35px;
  color: var(--theme--color);
  line-height: 1;
  padding: 35px;
  @media ${media.tablet} {
    margin: 0;
    padding: 25px;
  }
`
const SubTitle = styled.h4`
  font-weight: bold;
`

const ContentContainer = styled.div`
  margin-top: 35px;
  width: 75%;
  @media ${media.mobile} {
    width: 100%;
  }
`
const ImageContainer = styled.div`
  width: 35%;
  background-image: url(${contactImage});
  background-size: cover;
  background-position: left center;
  position: relative;

  @media ${media.mobile} {
    display: none;
  }
`
const Image = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: linear-gradient(to left, rgba(48, 49, 51, 0), var(--black));
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

const LinkList = styled.div`
  opacity: 0.7;
  color: var(--white);
  margin-left: 45px;
  @media ${media.mobile} {
    margin-left: 0;
    margin-top: 45px;
  }
`
const ContactDetails = styled.div`
  font-size: 22px;

  @media ${media.tablet} {
    font-size: 16px;
  }
`

const Footer = () => (
  <Wrapper>
    <ContentContainer>
      <Title>Contact</Title>
      <TextContainer>
        <ContactDetails>
          <p>0032 (0) 475 52 80 72</p>
          <StyledLink href='mailto:info@vlaamsetinvereniging.be'>
            info@vlaamsetinvereniging.be
          </StyledLink>
        </ContactDetails>
        <LinkList>
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
        </LinkList>
      </TextContainer>
    </ContentContainer>
    <ImageContainer>
      <Image />
    </ImageContainer>

    <Copyright>© {new Date().getFullYear()} - Vlaamse Tinvereniging </Copyright>
  </Wrapper>
)

export default Footer

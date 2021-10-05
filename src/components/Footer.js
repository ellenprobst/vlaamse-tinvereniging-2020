import React from 'react'
import styled from 'styled-components'
import contactImage from '../img/bord.jpg'
import { media } from '../themes'
import ContactForm from './ContactForm'

const Wrapper = styled.footer`
  position: relative;
  background: var(--black);

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
  padding: 35px;
  max-width: 900px;
  flex-grow: 2;
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
  font-size: 35px;
  color: var(--theme--color);
  line-height: 1;
  padding: 0 0 35px 0;

  line-height: 0.9em;
  @media ${media.tablet} {
    margin: 0;
    padding: 25px;
  }
`
const SubTitle = styled.h4`
  font-weight: bold;
`

const ContentContainer = styled.div`
  display: flex;
  margin-top: 35px;
`
const ImageContainer = styled.div`
  width: 35%;
  flex-grow: 1;
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
  width: 100%;
  color: var(--white);
  text-align: center;
  opacity: 0.5;
  font-size: 12px;
`

const LinkList = styled.div`
  font-size: 14px;
  opacity: 0.7;
  color: var(--white);
  margin-top: 35px;
  @media ${media.mobile} {
    margin-left: 0;
  }
`
const ContactDetails = styled.div`
  font-size: 22px;
  p {
    color: var(--white);
  }
  @media ${media.tablet} {
    font-size: 16px;
  }
  @media ${media.mobile} {
    margin: 45px 0;
  }
`

const Footer = ({ contact }) => (
  <ContactForm></ContactForm>
  /* <Wrapper>
    <ContentContainer>
      <TextContainer>
        <Title>Contact</Title>
        <ContactDetails>
          <p>{contact.tel}</p>
          <StyledLink href={`mailto:${contact.email}`}>
            {contact.email}
          </StyledLink>
        </ContactDetails>
        <LinkList>
          <SubTitle>Links:</SubTitle>
          <ul>
            {contact.links.map((link) => {
              return (
                <li key={link.url}>
                  <a href={link.url}>{link.text}</a>
                </li>
              )
            })}
          </ul>
        </LinkList>
      </TextContainer>
      <ImageContainer>
        <Image />
      </ImageContainer>
    </ContentContainer>

    <Copyright>© {new Date().getFullYear()} - Vlaamse Tinvereniging </Copyright>
  </Wrapper> */
)

export default Footer

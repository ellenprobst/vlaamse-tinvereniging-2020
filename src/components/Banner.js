import React from 'react'
import kannetje from '../img/kannetje.jpg'
import styled from 'styled-components'
import { media, boxShadow, wrapper } from '../themes'
import { Link } from 'gatsby'

const Wrapper = styled.div`
  margin: 3vw 0;
  background: var(--grey-bg-color);
`
const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  height: 225px;
  padding: 35px;
  max-width: ${wrapper};

  @media ${media.tablet} {
    height: 180px;
    padding: 15px 15px 35px;
  }

  @media ${media.mobile} {
    height: auto;
    padding: 35px 15px;
  }
`
const ContentContainer = styled.div`
  max-width: 800px;
  margin-left: 15px;
  @media ${media.tablet} {
    max-width: 75%;
  }

  @media ${media.mobile} {
    max-width: 90%;
  }
`
const Title = styled.h3`
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;

  @media ${media.mobile} {
    font-size: 14px;
  }
`
const StyledLink = styled(Link)`
  display: block;
  text-align: center;
  border: 2px solid var(--theme--color);
  border-radius: 3px;
  background: var(--theme--color);
  padding: 10px 20px;
  color: var(--white);
  width: 220px;
  margin-top: 25px;
  border-radius: 25px;
  opacity: 0.8;
  transition: all 300ms ease;
  box-shadow: ${boxShadow};
  :hover {
    transform: scale(1.1);
    opacity: 1;
    color: var(--white);
  }

  @media ${media.tablet} {
    width: 150px;
    font-size: 14px;
    padding: 10px;
  }
`
const Image = styled.img`
  display: block;
  object-fit: cover;
  height: 30vw;
  width: 30vw;
  max-width: 275px;
  max-height: 275px;
  border-radius: 50%;

  border: 8px solid var(--grey-bg-color);
  @media ${media.tablet} {
    height: 230px;
    width: 230px;
  }

  @media ${media.mobile} {
    height: 100px;
    width: 100px;
    border: none;
    margin-left: 10px;
  }
`
const Banner = ({ text }) => {
  return (
    <Wrapper>
      <FlexContainer>
        <Image src={kannetje} />
        <ContentContainer>
          <Title>{text}</Title>
          <StyledLink to={'/vragen'}>Stel hier je vraag</StyledLink>
        </ContentContainer>
      </FlexContainer>
    </Wrapper>
  )
}

export default Banner

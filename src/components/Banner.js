import React from 'react'
import kannetje from '../img/kannetje.jpg'
import styled from 'styled-components'
import { media } from '../themes'

const Wrapper = styled.div`
  margin: 3vw 0;
`
const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--grey-bg-color);
  height: 200px;
  padding: 30px;

  @media ${media.tablet} {
    height: 150px;
  }

  @media ${media.tablet} {
    height: auto;
  }
`
const ContentContainer = styled.div`
  max-width: 35%;

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
    font-size: 12px;
  }
`
const Button = styled.button`
  border: 2px solid var(--theme--color);
  border-radius: 3px;
  background: var(--theme--color);
  padding: 10px 20px;
  color: var(--white);
  width: 180px;
  margin-top: 25px;
  border-radius: 25px;
  opacity: 0.8;
  transition: all 300ms ease;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  :hover {
    transform: scale(1.1);
    opacity: 1;
  }

  @media ${media.mobile} {
    width: 150px;
    font-size: 12px;
    padding: 10px;
  }
`
const Image = styled.img`
  display: block;
  object-fit: cover;
  height: 30vw;
  width: 30vw;
  max-width: 300px;
  max-height: 300px;
  border-radius: 50%;
  margin-left: 10vw;
  border: 12px solid var(--white);
  @media ${media.tablet} {
    height: 200px;
    width: 200px;
  }

  @media ${media.mobile} {
    height: 100px;
    width: 100px;
    border: none;
    margin-left: 10px;
  }
`
const Banner = () => {
  return (
    <Wrapper>
      <FlexContainer>
        <ContentContainer>
          <Title>
            Heb je zelf tin en ben je benieuwd naar de afkomst van het werk,
            stel je vraag aan onze experten.
          </Title>
          <Button>Stel hier je vraag</Button>
        </ContentContainer>
        <Image src={kannetje} />
      </FlexContainer>
    </Wrapper>
  )
}

export default Banner

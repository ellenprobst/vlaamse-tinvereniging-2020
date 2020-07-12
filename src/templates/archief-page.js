import React from 'react'
import kannetje from '../img/kannetje.jpg'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 3vw 0;
`
const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--grey-bg-color);
  height: 280px;
`
const ContentContainer = styled.div`
  max-width: 700px;
`
const Title = styled.h3`
  font-size: 1vw;
  font-family: 'Montserrat', sans-serif;
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
`
const Image = styled.img`
  display: block;
  object-fit: cover;
  height: 350px;
  width: 350px;
  border-radius: 50%;
  margin-left: 10vw;
  border: 12px solid var(--white);
`
const ArchiefPage = () => {
  return <Wrapper>Archief</Wrapper>
}

export default ArchiefPage

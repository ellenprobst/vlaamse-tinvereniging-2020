import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  display: flex;
  cursor: pointer;
  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  font: inherit;
  color: inherit;
  text-transform: none;
  background-color: transparent;
  border: 0;
  margin: 0;
  overflow: visible;

  :hover {
    opacity: 0.7;
  }
`
const Box = styled.span`
  width: 20px;
  height: 24px;
  display: inline-block;
  position: relative;
`
const Inner = styled.span`
  display: block;
  margin-top: -2px;
  width: 20px;
  height: 1px;
  background-color: var(--text-color);
  border-radius: 4px;
  position: absolute;
  transition-property: transform;
  top: 16px;
  bottom: 0;
  transition-duration: 0.13s;
  transition-delay: 0.13s;
  transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);

  &,
  :before,
  :after {
    width: 20px;
    height: 1px;
    background-color: var(--text-color);
    border-radius: 4px;
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }

  :before,
  :after {
    content: '';
    display: block;
  }

  :before {
    top: -5px;
    transition: top 0.12s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),
      transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  :after {
    top: -10px;
    transition: top 0.2s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),
      opacity 0.1s linear;
  }

  ${({ active }) =>
    active &&
    `
    transform: translate3d(0, -5px, 0) rotate(-45deg);
  transition-delay: 0.22s;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); 

  :before {
    top: 0;
    transform: rotate(-90deg);
    transition: top 0.1s 0.16s cubic-bezier(0.33333, 0, 0.66667, 0.33333), transform 0.13s 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  :after{
    top: 0;
    opacity: 0;
    transition: top 0.2s cubic-bezier(0.33333, 0, 0.66667, 0.33333), opacity 0.1s 0.22s linear;
  }
  `}
`

const Label = styled.p`
  margin-left: 10px;
  font-size: 14px;
  color: var(--text-color);
`

const Hamburger = ({ active }) => {
  return (
    <Button type='button'>
      <Box>
        <Inner active={active} />
      </Box>
      <Label>Menu</Label>
    </Button>
  )
}

export default Hamburger

import React from 'react'
import styled from 'styled-components'
import { media } from '../themes'

import PreviewCompatibleImage from './PreviewCompatibleImage'

const ListItem = styled.li`
  margin: 20px 0;

  background: var(--white);
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  font-size: 14px;
`
const FlexContainer = styled.div`
  display: flex;

  @media ${media.mobile} {
    flex-wrap: wrap;
  }
`
const ItemContent = styled.div`
  padding: 15px;
`

const ItemTitle = styled.h4`
  font-weight: bold;
  color: var(--text-color);
`
const ItemMain = styled.p`
  opacity: 0.6;
  margin: 10px 0 20px;
`

const ItemText = styled.p`
  margin: 15px 0;
`
const ItemDate = styled.p`
  opacity: 0.6;
  margin-top: 15px;
`
const ImageContainer = styled.div`
  display: flex;
  max-width: 50%;
  position: relative;
  cursor: pointer;
  display: flex;
  margin: 15px;
`
const Image = styled.div`
  display: block;
  object-fit: cover;
  width: 180px;
  height: 180px;
  background: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
`

const IconContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 5px;
  color: #f4f4f4;
  background: var(--black);
  border-radius: 3px;
  line-height: 5px;
  opacity: 0.8;
`

const Item = ({ data, index, openModal }) => {
  return (
    <ListItem>
      <FlexContainer>
        <ImageContainer onClick={() => data.images && openModal(index)}>
          <Image>
            {data.images && data.images[0] ? (
              <PreviewCompatibleImage imageInfo={data.images[0]} borderRadius />
            ) : (
              <svg
                width='45px'
                height='45px'
                viewBox='0 0 16 16'
                fill='currentColor'
                opacity='0.5'
              >
                <path
                  fillRule='evenodd'
                  d='M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z'
                />
                <path d='M10.648 7.646a.5.5 0 0 1 .577-.093L15.002 9.5V13h-14v-1l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71z' />
                <path
                  fillRule='evenodd'
                  d='M4.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'
                />
              </svg>
            )}
          </Image>
          {data.images && data.images.length > 1 && (
            <IconContainer>
              <svg
                width='1em'
                height='1em'
                viewBox='0 0 16 16'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M12.002 4h-10a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm-10-1a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-10z'
                />
                <path d='M10.648 8.646a.5.5 0 0 1 .577-.093l1.777 1.947V14h-12v-1l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71z' />
                <path
                  fillRule='evenodd'
                  d='M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM4 2h10a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1v1a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2h1a1 1 0 0 1 1-1z'
                />
              </svg>
            </IconContainer>
          )}

          {data.images && data.images.length === 1 && (
            <IconContainer>
              <svg
                width='1em'
                height='1em'
                viewBox='0 0 16 16'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z'
                />
                <path
                  fillRule='evenodd'
                  d='M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z'
                />
              </svg>
            </IconContainer>
          )}
        </ImageContainer>
        <ItemContent>
          <ItemTitle>{data.titel}</ItemTitle>
          <ItemMain>{data.vraag}</ItemMain>
          <ItemText>{data.antwoord}</ItemText>
          <ItemDate>{data.datum}</ItemDate>
        </ItemContent>
      </FlexContainer>
    </ListItem>
  )
}

export default Item

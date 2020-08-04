import React from 'react'
import styled from 'styled-components'
import { media, boxShadow } from '../themes'

import PreviewCompatibleImage from './PreviewCompatibleImage'

const ListItem = styled.li`
  margin: 20px 0;

  background: var(--white);
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  font-size: 14px;
  @media ${media.mobile} {
    padding: 35px 0;
  }
`
const FlexContainer = styled.div`
  display: flex;


  /* @media ${media.mobile} {
    flex-wrap: wrap;
  } */
`
const ItemContent = styled.div`
  padding: 25px;
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
  @media ${media.mobile} {
    flex-wrap: wrap;
  }
`
const Image = styled.div`
  display: block;
  object-fit: cover;
  width: 180px;
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

const Item = ({ data }) => {
  const images = [data.image1, data.image2].filter(Boolean)

  return (
    <ListItem>
      <FlexContainer>
        <ImageContainer>
          {images[0] && (
            <>
              <Image>
                <PreviewCompatibleImage imageInfo={data.image1} borderRadius />
              </Image>
              <IconContainer>
                <svg
                  width='1em'
                  height='1em'
                  viewBox='0 0 16 16'
                  fill='currentColor'
                >
                  <path
                    fill-rule='evenodd'
                    d='M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z'
                  />
                  <path
                    fill-rule='evenodd'
                    d='M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z'
                  />
                </svg>
              </IconContainer>
            </>
          )}
          {/* {data.image2 && (
                <Image>
                  <PreviewCompatibleImage
                    imageInfo={data.image2}
                    borderRadius
                  />
                </Image>
              )} */}
          {images.length > 1 && (
            <IconContainer>
              <svg
                width='1em'
                height='1em'
                viewBox='0 0 16 16'
                fill='currentColor'
              >
                <path
                  fill-rule='evenodd'
                  d='M3 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3z'
                />
                <path d='M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2z' />
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

import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import Form from '../components/Form'
import Item from '../components/Item'
import styled from 'styled-components'
import { media, wrapper } from '../themes'

import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

const PageContainer = styled.div`
  @media ${media.mobile} {
    margin-top: 50px;
  }
`
const Fold = styled.div`
  background: var(--black);
`

const Main = styled.main`
  background: var(--grey-bg-color);
`
const Wrapper = styled.div`
  margin-top: 65px;
  max-width: ${wrapper};
  margin: 0 auto;
  padding: 35px 35px 10px;
  @media ${media.mobile} {
    margin-top: 50px;
  }
`

const FlexWrapper = styled(Wrapper)`
  padding-top: 90px;
  display: flex;
`

const Header = styled.div`
  margin: 35px 35px 35px 0;
  max-width: 500px;
  border-radius: 5px;
  font-size: 14px;
`

const Title = styled.h2`
  font-size: calc(16px + 2vw);
  font-size: clamp(16px, 12vw, 80px);
  color: var(--theme--color);
`
const List = styled.ul``
const Description = styled.p`
  color: var(--white);
`

const VragenPageTemplate = ({ data, title, beschrijving }) => {
  const [isOpen, setOpen] = useState(false)
  const [itemIndex, setItemIndex] = useState(0)
  const [imgIndex, setImgIndex] = useState(0)

  const openModal = (id) => {
    setOpen(true)
    setItemIndex(id)
  }

  const closeModal = () => {
    setOpen(false)
    setImgIndex(0)
  }

  return (
    <PageContainer>
      <Fold>
        <FlexWrapper>
          <Header>
            <Title>{title}</Title>
            <Description>{beschrijving}</Description>
          </Header>
          <Form />
        </FlexWrapper>
      </Fold>
      <Main>
        <Wrapper>
          <Title>Antwoorden</Title>
          <List>
            {data.map((item, index) => (
              <Item
                data={item}
                key={index}
                openModal={openModal}
                index={index}
              />
            ))}
          </List>
        </Wrapper>
      </Main>

      {isOpen && (
        <Lightbox
          mainSrc={
            data[itemIndex].images[imgIndex].image.childImageSharp.fluid.src
          }
          nextSrc={
            data[itemIndex].images[
              (imgIndex + 1) % data[itemIndex].images.length
            ].image.childImageSharp.fluid.src
          }
          prevSrc={
            data[itemIndex].images[
              (imgIndex + data[itemIndex].images.length - 1) %
                data[itemIndex].images.length
            ].image.childImageSharp.fluid.src
          }
          onCloseRequest={closeModal}
          onMovePrevRequest={() => {
            setImgIndex(
              (imgIndex + data[itemIndex].images.length - 1) %
                data[itemIndex].images.length
            )
          }}
          onMoveNextRequest={() => {
            setImgIndex((imgIndex + 1) % data[itemIndex].images.length)
          }}
          imagePadding={50}
        />
      )}
    </PageContainer>
  )
}

const VragenPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <Navbar />
      <VragenPageTemplate
        data={frontmatter.vragen}
        title={frontmatter.title}
        beschrijving={frontmatter.beschrijving}
      />
    </Layout>
  )
}

export default VragenPage

export const pageQuery = graphql`
  query VragenPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "vragen-page" } }) {
      frontmatter {
        title
        beschrijving
        vragen {
          titel
          vraag
          antwoord
          datum
          images {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 1500, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

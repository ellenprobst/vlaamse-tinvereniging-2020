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

const Modal = styled.div`
  width: 90vw;
  height: 90vh;
  background: #ffff;
  overflow: hidden;
  padding: 35px;
`

const VragenPageTemplate = ({ data, title, beschrijving }) => {
  const [isOpen, setOpen] = useState(false)
  const [selectedItem, setSelected] = useState(0)
  const [selectedImg, setSelectedImg] = useState(0)

  const openModal = (id) => {
    setOpen(true)
    setSelected(id)
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
          {JSON.stringify(data, null, 4)}
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
            data[selectedItem].images[selectedImg].image.childImageSharp.fluid
              .src
          }
          nextSrc={
            data[selectedItem].images[
              (selectedImg + 1) % data[selectedItem].images.length
            ]
          }
          prevSrc={
            data[selectedItem].images[
              (selectedImg + data[selectedItem].images.length - 1) %
                data[selectedItem].images.length
            ].image.childImageSharp.fluid.src
          }
          onCloseRequest={() => setOpen(false)}
          onMovePrevRequest={() => {
            setSelectedImg(
              (selectedImg + data[selectedItem].images.length - 1) %
                data[selectedItem].images.length
            )
          }}
          onMoveNextRequest={() => {
            setSelectedImg((selectedImg + 1) % data[selectedItem].images.length)
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

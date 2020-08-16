import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import Form from '../components/Form'
import Item from '../components/Item'
import styled from 'styled-components'
import { media, wrapper } from '../themes'

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
              <Item data={item} key={index} />
            ))}
          </List>
        </Wrapper>
      </Main>
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
          image1 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image2 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
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

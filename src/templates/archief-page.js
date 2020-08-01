import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import styled from 'styled-components'
import { media, boxShadow } from '../themes'

const Wrapper = styled.div`
  min-height: 100vh;
  background: var(--white);
  margin-top: 65px;
  padding: 35px;

  @media ${media.mobile} {
    margin-top: 50px;
    padding: 25px;
  }
`

const Title = styled.h1`
  font-size: calc(16px + 8vw);
  text-align: center;
  margin-bottom: 35px;
  color: var(--theme--color);
`
const BackButton = styled.button`
  width: 250px;
  padding: 10px;
  border: none;
  background: #f4f4f4;
  display: flex;
  align-items: center;
  font-size: 22px;
`
const Arrow = styled.div`
  width: 50px;
  svg {
    transform: rotate(-90deg);
  }
`
const Grid = styled.div`
  margin: 0 auto;
  max-width: 1550px;
  display: grid;
  grid-gap: 5vw;
  grid-template-columns: repeat(auto-fit, minmax(200px, 300px));
  justify-content: center;
`
const GridItem = styled.div`
  @media ${media.mobile} {
    margin-top: 10px;
  }
`
const GridImage = styled.img`
  display: block;
  object-fit: cover;
  width: 100%;
  box-shadow: ${boxShadow};
`
const GridLabel = styled.div`
  max-width: 180px;
  text-align: center;
  margin: 0 auto;
  background: var(--white);
  padding: 7px;
  margin-top: -35px;
  position: relative;
  z-index: 1;
  color: var(--text-color);
  border: 1px solid var(--theme--color);
  h4 {
    font-weight: bold;
    color: var(--theme--color);
    margin-bottom: 5px;
    font-size: 16px;
  }

  p {
    font-size: 12px;
    color: currentColor;
  }
`

const ArchiefPageTemplate = ({ data, title }) => {
  console.log(data)
  return (
    <Wrapper>
      <BackButton>
        <Arrow>
          <svg width='100%' viewBox='0 0 20 20' fill='var(--text-color)'>
            <path d='M11 2.206l-6.235 7.528-.765-.645 7.521-9 7.479 9-.764.646-6.236-7.53v21.884h-1v-21.883z' />
          </svg>
        </Arrow>
        <p> Terug</p>
      </BackButton>
      <Title>{title}</Title>

      <Grid>
        {data.map((item) => (
          <GridItem>
            <GridImage
              aria-hidden='true'
              src={
                !!item.image.childImageSharp
                  ? item.image.childImageSharp.fluid.src
                  : item.image
              }
            />

            <GridLabel>
              <h4>{item.title}</h4>
              <p>{item.date}</p>
            </GridLabel>
          </GridItem>
        ))}

        {/* <GridItem>
          <GridImage></GridImage>
          <GridLabel>
            <h4>Tinnewerck 1</h4>
            <p>20 juli, 2020</p>
          </GridLabel>
        </GridItem>
        <GridItem>
          <GridImage></GridImage>
          <GridLabel>
            <h4>Tinnewerck 1</h4>
            <p>20 juli, 2020</p>
          </GridLabel>
        </GridItem>
        <GridItem>
          <GridImage></GridImage>
          <GridLabel>
            <h4>Tinnewerck 1</h4>
            <p>20 juli, 2020</p>
          </GridLabel>
        </GridItem>
        <GridItem>
          <GridImage></GridImage>
          <GridLabel>
            <h4>Tinnewerck 1</h4>
            <p>20 juli, 2020</p>
          </GridLabel>
        </GridItem> */}
      </Grid>
    </Wrapper>
  )
}

const ArchiefPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <ArchiefPageTemplate
        data={frontmatter.testing}
        title={frontmatter.title}
      />
    </Layout>
  )
}

export default ArchiefPage

export const pageQuery = graphql`
  query ArchiefPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "archief-page" } }) {
      frontmatter {
        title
        testing {
          title
          date
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
`

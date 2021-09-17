import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import styled from 'styled-components'
import { media } from '../themes'

const Wrapper = styled.div`
  min-height: 100vh;
  background: var(--grey-bg-color);
  border: 25px solid var(--white);
  padding: 15px;
  @media ${media.mobile} {
    padding: 25px;
    border: 15px solid var(--white);
  }
`

const Title = styled.h1`
  font-size: calc(16px + 8vw);
  text-align: center;
  margin-bottom: 50px;
  color: var(--theme--color);
  line-height: 1;
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const BackButton = styled(Link)`
  border: none;
  background: transparent;
  color: var(--text-color);
  margin-left: auto;
  margin-right: 0;
  svg {
    width: 120px;
    height: 120px;
    padding: 10px;

    @media ${media.mobile} {
      width: 50px;
      height: 50px;
    }
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

const ArchiefPageTemplate = ({ data, titel }) => {
  return (
    <Wrapper>
      <FlexContainer>
        <BackButton to='/#tinnewerck'>
          <svg
            viewBox='0 0 16 16'
            class='bi bi-x'
            fill='var(--theme--color)'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z'
            />
            <path
              fillRule='evenodd'
              d='M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z'
            />
          </svg>
        </BackButton>
      </FlexContainer>
      <Title>{titel}</Title>

      <Grid>
        {data
          .sort((a, b) => b.nummer - a.nummer)
          .map((item) => (
            <GridItem key={item.nummer}>
              <GridImage
                aria-hidden='true'
                src={
                  !!item.image.childImageSharp
                    ? item.image.childImageSharp.fluid.src
                    : item.image
                }
              />

              <GridLabel>
                <h4>{item.titel}</h4>
                <p>{item.text}</p>
              </GridLabel>
            </GridItem>
          ))}
      </Grid>
    </Wrapper>
  )
}

const ArchiefPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout hideNav>
      <ArchiefPageTemplate
        data={frontmatter.edities}
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
        titel
        edities {
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          titel
          text
          nummer
        }
      }
    }
  }
`

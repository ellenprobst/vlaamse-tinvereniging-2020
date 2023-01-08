import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import styled from 'styled-components'
import { media } from '../themes'
import Navbar from '../components/Navbar'
import { Select } from 'antd'

const { Option } = Select

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1550px;
  min-height: 100vh;
  background: var(--grey-bg-color);
  border: 25px solid var(--white);
  padding: 25px 50px;
  @media ${media.mobile} {
    padding: 25px;
    border: 15px solid var(--white);
  }
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
    width: 100px;
    height: 100px;
    padding: 10px;

    @media ${media.mobile} {
      width: 50px;
      height: 50px;
    }
  }
`

const Grid = styled.div`
  display: grid;
  grid-gap: 5vw;
  grid-template-columns: repeat(auto-fit, minmax(200px, 250px));
`
const GridItem = styled.div`
  filter: drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.1));
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
  margin-top: -45px;
  position: relative;
  z-index: 1;
  color: var(--text-color);

  h4 {
    font-weight: bold;
    color: #565a4a;
    margin-bottom: 5px;
    font-size: 16px;
  }

  p {
    font-size: 12px;
    color: currentColor;
  }
`

const Download = styled.a`
  font-size: 12px;
  text-decoration: underline;
  color: #565a4a;
  font-weight: bold;
`
const FilterContainer = styled.div`
  margin-bottom: 35px;
`

const ArchiefPageTemplate = ({ data }) => {
  /* allow download for items + 3 years old */
  const allowDownload = (jaar) => jaar <= new Date().getFullYear() - 3

  const options = [...new Set(data.map(({ jaar }) => jaar))].sort().reverse()

  const [filteredItems, setFilteredItems] = useState(data)
  const handleChange = (value) => {
    if (value === 'all') {
      setFilteredItems(data)
    } else {
      setFilteredItems(data.filter((items) => items.jaar === value))
    }
  }
  return (
    <Wrapper>
      <FlexContainer>
        <BackButton to='/#tinnewerck'>
          <svg
            viewBox='0 0 16 16'
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

      <FilterContainer>
        <Select
          defaultValue='all'
          style={{ width: 200 }}
          onChange={handleChange}
        >
          <Option value='all'>Alle jaargangen</Option>
          {options.map((option) => (
            <Option value={option} key={option}>
              {option}
            </Option>
          ))}
        </Select>
      </FilterContainer>
      <Grid>
        {filteredItems
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
                {allowDownload(item.jaar) && item.link && (
                  <Download href={item.link} target='_blank'>
                    Lezen
                  </Download>
                )}
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
    <Layout>
      <Navbar light />
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
              fluid(maxWidth: 500, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          titel
          text
          nummer
          link
          jaar
        }
      }
    }
  }
`

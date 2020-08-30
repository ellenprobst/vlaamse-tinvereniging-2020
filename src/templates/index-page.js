import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { media } from '../themes'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Layout from '../components/Layout'
import Banner from '../components/Banner'
import About from '../components/About'
import Header from '../components/Header'
import Activities from '../components/Activities'
import Tinnewerck from '../components/Tinnewerck'
import pot from '../img/teaser.jpg'

import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const Wrapper = styled.div`
  color: var(--text-color);
  margin-bottom: 500px;
  position: relative;
  background-color: var(--white);
  @media ${media.tablet} {
    margin: 15px 15px 500px;
  }

  @media ${media.mobile} {
    margin: 0 0 400px;
  }
`
const TeaserContainer = styled.div`
  height: 65vh;
  display: flex;
  @media ${media.tablet} {
    height: 35vh;
  }
`
const Teaser = styled.div`
  position: relative;
  background-image: url(${pot});
  background-size: cover;
  background-position: 50% 50%;
  height: 100%;
  width: 100%;
`
const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const StyledLink = styled(Link)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  bottom: -25px;
  margin: auto;
  left: 0;
  right: 0;
  background: var(--theme--color);
  border: 2px solid var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const IndexPageTemplate = ({ image, title, about, tinnewerck }) => {
  const triggerRef = useRef(null)
  const imageRef = useRef(null)
  const imageRef2 = useRef(null)
  useEffect(() => {
    gsap.from(imageRef.current, {
      scaleX: 0.9,
      backgroundPosition: '50% 0%',
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top bottom',
        end: 'bottom center',
        scrub: 0.1,
      },
    })
    gsap.from(imageRef2.current, {
      // scaleX: 0.9,
      backgroundPosition: '50% 0%',
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top bottom',
        end: 'bottom center',
        scrub: 0.1,
      },
    })
  }, [])

  return (
    <>
      <Navbar />
      <Wrapper>
        <Header title={title} image={image} />

        <About
          heading={about.heading}
          content={about.content}
          image={about.image}
        />
        <TeaserContainer ref={triggerRef}>
          <Teaser ref={imageRef}>
            <Overlay />
          </Teaser>
        </TeaserContainer>

        <Activities />

        <Tinnewerck
          heading={tinnewerck.heading}
          content={tinnewerck.content}
          image={tinnewerck.image}
        />
        <Banner />
        <StyledLink aria-label='top' to='/'>
          <svg width='24' height='24' fill='var(--white)'>
            <path d='M11 2.206l-6.235 7.528-.765-.645 7.521-9 7.479 9-.764.646-6.236-7.53v21.884h-1v-21.883z' />
          </svg>
        </StyledLink>
        <div id='contact'></div>
      </Wrapper>
    </>
  )
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        about={frontmatter.about}
        tinnewerck={frontmatter.tinnewerck}
      />
      <Footer />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        mainpitch {
          title
          description
        }
        description
        about {
          heading
          content
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        tinnewerck {
          heading
          content
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

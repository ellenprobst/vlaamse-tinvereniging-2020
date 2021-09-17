import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { media } from '../themes'
import 'antd/dist/antd.css'
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

  position: relative;
  background-color: var(--white);
`
const TeaserContainer = styled.div`
  height: 85vh;
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
  bottom: -55px;
  margin: auto;
  left: 0;
  right: 0;
  background: var(--theme--color);
  border: 2px solid var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`

export const IndexPageTemplate = ({
  image,
  titel,
  overOns,
  tinnewerck,
  activiteiten,
  banner,
  edities,
}) => {
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
      <Navbar absolute />
      <Wrapper>
        <Header titel={titel} image={image} />

        <About
          titel={overOns.titel}
          text={overOns.text}
          image={overOns.image}
        />
        <TeaserContainer ref={triggerRef}>
          <Teaser ref={imageRef}>
            <Overlay />
          </Teaser>
        </TeaserContainer>

        <Activities titel={activiteiten.titel} text={activiteiten.text} />
        <Banner text={banner.text} />
        <Tinnewerck
          titel={tinnewerck.titel}
          text={tinnewerck.text}
          edities={edities}
        />

        <div></div>
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
  const { frontmatter } = data.main
  console.log(process.env)
  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        titel={frontmatter.titel}
        overOns={frontmatter.overOns}
        activiteiten={frontmatter.activiteiten}
        tinnewerck={frontmatter.tinnewerck}
        banner={frontmatter.banner}
        edities={data.archief.frontmatter.edities}
      />
      <Footer contact={frontmatter.contact} />
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
    main: markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        titel
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        overOns {
          titel
          text
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        tinnewerck {
          titel
          text
        }
        activiteiten {
          titel
          text
          blurbs {
            text
            titel
          }
        }
        contact {
          tel
          email
          links {
            url
            text
          }
        }
        banner {
          text
        }
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

    archief: markdownRemark(
      frontmatter: { templateKey: { eq: "archief-page" } }
    ) {
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

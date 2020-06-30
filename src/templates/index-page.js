import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Fade from 'react-reveal/Fade'
import Layout from '../components/Layout'
import About from '../components/About'
import Header from '../components/Header'
import Activities from '../components/Activities'
import Tinnewerck from '../components/Tinnewerck'
import pot from '../img/teaser.jpg'
import kannetje from '../img/kannetje.jpg'
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

export const IndexPageTemplate = ({ image, title, about, tinnewerck }) => {
  const triggerRef = useRef(null)
  const imageRef = useRef(null)
  useEffect(() => {
    gsap.from(imageRef.current, {
      scaleX: 0.8,
      opacity: 0.3,
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top bottom',
        end: 'top top',
        scrub: 0.5,
      },
    })
  }, [])

  return (
    <div
      style={{
        color: '#40544E',
        fontFamily: 'Playfair Display',
        marginBottom: 500,
        background: '#fff',
        position: 'relative',
      }}
    >
      <Header title={title} image={image} />

      <About
        heading={about.heading}
        content={about.content}
        image={about.image}
      />
      <div ref={triggerRef} style={{ margin: '55px 0', height: '100vh' }}>
        <div style={{ position: 'relative' }} ref={imageRef}>
          <img
            src={pot}
            style={{
              display: 'block',
              objectFit: 'cover',
              height: '100vh',
              width: '100%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundImage:
                'linear-gradient(to bottom, rgba(48, 49, 51, 0), rgb(12, 13, 13))',
            }}
          ></div>
        </div>
      </div>
      <Activities />
      {/* banner */}
      <div style={{ margin: '10vw 0' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#f5f5f5',
            height: 280,
          }}
        >
          <div style={{ maxWidth: 700 }}>
            <h3 style={{ fontSize: '1.3vw' }}>
              Heb je zelf tin en ben je benieuwd naar de afkomst van het werk,
              dan kan je de hulp inroepen van onze experten.
            </h3>
            <button
              style={{
                border: '2px solid #6f6d6e',
                borderRadius: 3,
                background: '#6f6d6e',
                padding: '10px 20px',
                color: '#fff',
                width: 180,
                marginTop: 25,
                borderRadius: 25,
              }}
            >
              Stel hier je vraag
            </button>
          </div>
          <img
            src={kannetje}
            style={{
              display: 'block',
              objectFit: 'cover',
              height: '350px',
              width: '350px',
              borderRadius: '50%',
              marginLeft: '10vw',
              border: '12px solid #fff',
            }}
          />
        </div>
      </div>
      <Tinnewerck
        heading={tinnewerck.heading}
        content={tinnewerck.content}
        image={tinnewerck.image}
      />
      <button
        aria-label='top'
        style={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          position: 'absolute',
          bottom: '-25px',
          margin: 'auto',
          left: 0,
          right: 0,
          background: '#8d986e',
          border: '2px solid #fff',
        }}
      >
        <svg width='24' height='24' fill='#fff'>
          <path
            d='M11 2.206l-6.235 7.528-.765-.645 7.521-9 7.479 9-.764.646-6.236-7.53v21.884h-1v-21.883z'
            // strokeWidth='1'
            // stroke='#fff'
          />
        </svg>
      </button>
    </div>
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
        intro={frontmatter.intro}
        about={frontmatter.about}
        tinnewerck={frontmatter.tinnewerck}
      />
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
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          description
        }
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

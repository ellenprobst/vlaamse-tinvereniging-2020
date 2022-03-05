import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import styled from 'styled-components'
import { media, wrapper } from '../themes'
import Navbar from '../components/Navbar'
import ContactForm from '../components/ContactForm'

const Title = styled.h1`
  font-size: 35px;
  margin-bottom: 35px;
  color: var(--black);
`
const SubTitle = styled.h2`
  font-weight: bold;
  margin: 75px 0 20px;
  font-family: 'Montserrat', sans-serif;
`

const LinkList = styled.div`
  font-size: 14px;
  opacity: 0.7;
  color: var(--text-color);
  margin-top: 35px;
  @media ${media.mobile} {
    margin-left: 0;
  }
`

const StyledLink = styled.a`
  text-decoration: underline;
`

const ContactDetails = styled.div`
  flex: 0 0 50%;
  font-size: 16px;
  padding: 15px 25px;
  border-right: 1px solid #efefef;
  @media ${media.mobile} {
    margin: 45px 0;
  }
`

const FormContainer = styled.div`
  border-radius: 5px;
  width: 100%;
  margin-bottom: -100px;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  background: white;
  padding: 25px;
  @media ${media.mobile} {
    flex-direction: column;
  }
`

const PageContainer = styled.div`
  @media ${media.mobile} {
    margin-top: 50px;
  }
`
const Fold = styled.div`
  background: var(--black);
`

const Wrapper = styled.div`
  max-width: ${wrapper};
  margin: 0 auto;
  padding: 55px 35px;
  @media ${media.mobile} {
    margin-top: 0px;
    padding: 55px 15px 10px;
  }
`

const FlexWrapper = styled(Wrapper)`
  padding-top: 90px;
  display: flex;
`
const Text = styled.div`
  font-size: 14px;
  white-space: pre-wrap;
`

const ContactPageTemplate = ({ data, titel }) => {
  return (
    <>
      <PageContainer>
        <Fold>
          <FlexWrapper>
            <FormContainer>
              <ContactDetails>
                <Title>{titel}</Title>
                <p>{data.tel}</p>
                <StyledLink href={`mailto:${data.email}`}>
                  {data.email}
                </StyledLink>

                <SubTitle>{data.subTitel}</SubTitle>
                <Text>{data.subText}</Text>
              </ContactDetails>

              <ContactForm />
            </FormContainer>
          </FlexWrapper>
        </Fold>
      </PageContainer>

      <Wrapper>
        <LinkList>
          <SubTitle>Links:</SubTitle>
          <ul>
            {data.links.map((link) => {
              return (
                <li key={link.url}>
                  <StyledLink href={link.url}>{link.text}</StyledLink>
                </li>
              )
            })}
          </ul>
        </LinkList>
      </Wrapper>
    </>
  )
}

const ContactPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <Navbar absolute />
      <ContactPageTemplate data={frontmatter} titel={frontmatter.titel} />
    </Layout>
  )
}

export default ContactPage

export const pageQuery = graphql`
  query ContactPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "contact-page" } }) {
      frontmatter {
        titel
        tel
        email
        subTitel
        subText
        links {
          url
          text
        }
      }
    }
  }
`

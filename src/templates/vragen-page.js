import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import { media, boxShadow } from '../themes'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

const Wrapper = styled.div`
  min-height: 100vh;
  background: var(--grey-bg-color);
  border-radius: 5px;
  margin-top: 65px;
  padding: 10px 35px;

  @media ${media.mobile} {
    margin-top: 50px;
  }
`

const Header = styled.div`
  margin: 35px 0;
  max-width: 850px;
  /* background: var(--theme--color); */
  border-radius: 5px;
  padding: 25px;
  min-height: 180px;
`

const Title = styled.h2`
  font-size: calc(16px + 3vw);
  margin-bottom: 35px;
  color: var(--theme--color);
`

const List = styled.ul`
  margin: 0 auto;
  max-width: 1200px;
  padding: 10px;
  background: var(--white);
  border-radius: 3px;
`
const ListItem = styled.li`
  margin: 20px;
  padding: 35px;
  border-bottom: 1px solid #e4e4e9;
  @media ${media.mobile} {
    padding: 35px 0;
  }
`
const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media ${media.mobile} {
    flex-wrap: wrap;
  }
`

const ItemTitle = styled.h4`
  font-weight: bold;
  color: var(--text-color);
`
const ItemContent = styled.div``
const ItemMain = styled.p`
  opacity: 0.6;
  margin: 10px 0 30px;
`

const ItemText = styled.p`
  margin: 15px 0;
`
const ItemDate = styled.p`
  opacity: 0.7;
  margin-top: 15px;
`
const ImageContainer = styled.div`
  display: flex;
  max-width: 50%;
  @media ${media.mobile} {
    flex-wrap: wrap;
  }
`
const Image = styled.div`
  display: block;
  object-fit: cover;
  width: 180px;
  margin-left: 15px;
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

const Form = styled.form`
  margin: 0 auto 35px;
  max-width: 1200px;
  background: var(--white);
  border-radius: 3px;
  padding: 35px;
`
const Field = styled.div`
  margin: 15px 0;
`
const Input = styled.input`
  padding: 5px;
  border-radius: 3px;
  width: 350px;
  border: 2px solid var(--theme--color);
`

const Submit = styled.button`
  padding: 12px;
  border-radius: 3px;
  width: 200px;
  color: var(--white);
  font-size: 16px;
  margin: 25px 0 0;
  background: var(--theme--color);
  border: 2px solid var(--theme--color);
  box-shadow: ${boxShadow};
`

const VragenPageTemplate = ({ data, title }) => {
  return (
    <Wrapper>
      <Header>
        <Title>{title}</Title>
        <p>
          Heb je een vraag over tin dan kan je ons deze via het vragenformulier
          stellen. Voor identificatie-vragen stuur je best twee foto's van het
          stuk en de hierop aangebrachte merken.
        </p>

        <p>De Vlaamse Tinvereniging geeft geen waardebepalingen.</p>
      </Header>
      <Form
        name='file-upload'
        method='post'
        action='/contact/thanks/'
        data-netlify='true'
        data-netlify-honeypot='bot-field'
        // onSubmit={this.handleSubmit}
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <Input type='hidden' name='form-name' value='file-upload' />
        <div hidden>
          <label>
            Don’t fill this out: <Input name='bot-field' />
          </label>
        </div>
        <Field>
          <label htmlFor={'name'}>Naam</label>
          <div>
            <Input type={'text'} name={'name'} id={'name'} required={true} />
          </div>
        </Field>
        <Field>
          <label htmlFor={'email'}>Email</label>
          <div>
            <Input type={'text'} name={'email'} id={'email'} required={true} />
          </div>
        </Field>
        <Field>
          <label htmlFor={'text'}>
            <textarea input name='text' />
          </label>
        </Field>
        <div>
          <Field>
            <label label>
              <input input type='file' name='attachment' />
              <span>
                <span label>Choose a file…</span>
              </span>
            </label>
          </Field>
        </div>
        <div>
          <Submit is-link type='submit'>
            Send
          </Submit>
        </div>
      </Form>
      <List>
        {data.map((item) => (
          <ListItem>
            <FlexContainer>
              <ItemContent>
                <ItemTitle>{item.titel}</ItemTitle>
                <ItemMain>{item.vraag}</ItemMain>
                <ItemText>{item.antwoord}</ItemText>
              </ItemContent>
              <ImageContainer>
                {item.image1 && (
                  <Image>
                    <PreviewCompatibleImage
                      imageInfo={item.image1}
                      borderRadius
                    />
                  </Image>
                )}
                {item.image2 && (
                  <Image>
                    <PreviewCompatibleImage
                      imageInfo={item.image2}
                      borderRadius
                    />
                  </Image>
                )}
              </ImageContainer>
            </FlexContainer>
            <ItemDate>{item.date}</ItemDate>
          </ListItem>
        ))}
      </List>
    </Wrapper>
  )
}

const VragenPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <Navbar light />
      <VragenPageTemplate
        data={frontmatter.content}
        title={frontmatter.title}
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
        content {
          titel
          vraag
          antwoord
          date
          image1 {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          image2 {
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

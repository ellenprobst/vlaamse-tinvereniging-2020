import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import VragenForm from '../components/VragenForm'
import Item from '../components/Item'
import styled from 'styled-components'
import { media, wrapper } from '../themes'
import { Skeleton, Button } from 'antd'
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
  min-height: 100vh;
`
const Wrapper = styled.div`
  margin-top: 65px;
  max-width: ${wrapper};
  margin: 0 auto;
  padding: 55px 35px 10px;
  @media ${media.mobile} {
    margin-top: 0px;
    padding: 55px 0px 10px;
  }
`

const FlexWrapper = styled(Wrapper)`
  padding-top: 90px;
  display: flex;
`

const Header = styled.div`
  padding: 25px;
  max-width: 500px;
  min-width: 250px;
  width: 30%;
  font-size: 14px;
  border-right: 1px solid #efefef;
  margin: 15px;
  @media ${media.mobile} {
    border-right: none;
    width: 100%;
    padding: 15px;
    margin: 0;
  }
`

const Title = styled.h2`
  font-size: clamp(16px, 12vw, 35px);
  color: var(--black);
  margin-bottom: 15px;
  @media ${media.mobile} {
    margin-left: 15px;
  }
`
const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
`
const Description = styled.p`
  white-space: pre-wrap;
`

const FormContainer = styled.div`
  border-radius: 5px;
  width: 100%;
  margin-bottom: -35px;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  background: white;
  @media ${media.mobile} {
    flex-direction: column;
  }
`

const PaginationButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 35px;
`

const VragenPageTemplate = ({ title, description }) => {
  const [isOpen, setOpen] = useState(false)
  const [itemIndex, setItemIndex] = useState(0)
  const [imgIndex, setImgIndex] = useState(0)
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [queryString, setQueryString] = useState('')
  const [pageIndex, setPageIndex] = useState({})
  const size = 20

  useEffect(() => {
    let canceled = false

    setLoading(true)
    fetch(`/api/get-all-published-items/?size=${size}&${queryString}`)
      .then((response) => {
        if (canceled === true) return
        if (response.status !== 200) return
        return response.json()
      })
      .then((result) => {
        setPageIndex({ before: result.beforeIndex, after: result.afterIndex })
        setData(result.vragen)
        setLoading(false)
        window.scrollTo(0, 0)
      })
      .catch((err) => {
        setError('Foutmelding')
      })

    return () => {
      canceled = true
    }
  }, [queryString])

  const openModal = (id) => {
    setOpen(true)
    setItemIndex(id)
  }

  const closeModal = () => {
    setOpen(false)
    setImgIndex(0)
  }

  const getNextPage = () => {
    setQueryString(`cursor=${pageIndex.after}`)
  }

  const getPreviousPage = () => {
    setQueryString(`cursor=${pageIndex.before}`)
  }

  return (
    <PageContainer>
      <Fold>
        <FlexWrapper>
          <FormContainer>
            <Header>
              <Title>{title}</Title>
              <Description>{description}</Description>
            </Header>
            <VragenForm />
          </FormContainer>
        </FlexWrapper>
      </Fold>
      <Main>
        <Wrapper>
          <Title>Antwoorden</Title>
          <div style={{ margin: '20px 0' }}>
            <Skeleton loading={isLoading} active></Skeleton>
          </div>
          <div style={{ margin: '20px 0' }}>
            <Skeleton loading={isLoading} active></Skeleton>
          </div>
          <div style={{ margin: '20px 0' }}>
            <Skeleton loading={isLoading} active></Skeleton>
          </div>
          <div style={{ margin: '20px 0' }}>
            <Skeleton loading={isLoading} active></Skeleton>
          </div>
          <List>
            {data
              .sort((a, b) => new Date(b.datum) - new Date(a.datum))
              .map((item, index) => (
                <Item
                  data={item}
                  key={index}
                  openModal={openModal}
                  index={index}
                />
              ))}
          </List>
          <PaginationButtons>
            <Button onClick={getPreviousPage} disabled={!pageIndex.before}>
              ⟨ Vorige
            </Button>
            <Button onClick={getNextPage} disabled={!pageIndex.after}>
              Volgende ⟩
            </Button>
          </PaginationButtons>
        </Wrapper>
      </Main>

      {isOpen && data && (
        <Lightbox
          // discourageDownloads
          mainSrc={data[itemIndex].images[imgIndex].url}
          nextSrc={
            data[itemIndex].images[
              (imgIndex + 1) % data[itemIndex].images.length
            ].url
          }
          prevSrc={
            data[itemIndex].images[
              (imgIndex + data[itemIndex].images.length - 1) %
                data[itemIndex].images.length
            ].url
          }
          onCloseRequest={closeModal}
          onMovePrevRequest={() => {
            setImgIndex(
              (imgIndex + data[itemIndex].images.length - 1) %
                data[itemIndex].images.length
            )
          }}
          onMoveNextRequest={() => {
            setImgIndex((imgIndex + 1) % data[itemIndex].images.length)
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
      <Navbar absolute />
      <VragenPageTemplate
        data={frontmatter.vragen}
        title={frontmatter.title}
        description={frontmatter.description}
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
        description
      }
    }
  }
`

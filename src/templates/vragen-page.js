import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import VragenForm from '../components/VragenForm'
import Item from '../components/Item'
import styled from 'styled-components'
import { media, wrapper } from '../themes'
import { Skeleton, Pagination, Input } from 'antd'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import { firestore } from '../firebase'
import useFirestoreQuery from '../hooks/useFirestoreQuery'

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
  padding: 55px 35px 25px;
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
  margin-bottom: 15px;
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

// const PaginationButtons = styled.div`
//   display: flex;
//   gap: 15px;
//   margin: 15px 0 35px;
// `

const VragenPageTemplate = ({ title, description }) => {
  const [isOpen, setOpen] = useState(false)
  const [itemIndex, setItemIndex] = useState(0)
  const [imgIndex, setImgIndex] = useState(0)
  const [search, setSearch] = useState('')
  const [pageIndex, setPageIndex] = useState(1)
  const size = 20

  const onSearch = (search) => {
    setSearch(search)
    setPageIndex(1)
  }

  const [vragen, isLoading] = useFirestoreQuery(
    firestore
      .collection('vragen')
      .where('status', '==', 'done')
      .orderBy('datum', 'desc')
  )

  const currentPageItems =
    vragen?.slice(size * pageIndex - size, size * pageIndex) || []

  const filteredItems = currentPageItems.filter((item) => {
    return (
      item.vraag?.toLowerCase().includes(search?.toLowerCase()) ||
      item.antwoord?.toLowerCase().includes(search?.toLowerCase()) ||
      item.titel?.toLowerCase().includes(search?.toLowerCase())
    )
  })

  const openModal = (id) => {
    setOpen(true)
    setItemIndex(id)
  }

  const closeModal = () => {
    setOpen(false)
    setImgIndex(0)
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
          <div>
            <Input.Search
              placeholder='zoeken'
              onSearch={onSearch}
              style={{ maxWidth: 450, marginBottom: 15, marginRight: 15 }}
              allowClear
            />
          </div>

          <List>
            {filteredItems.map((item, index) => (
              <Item
                data={item}
                key={index}
                openModal={openModal}
                index={index}
              />
            ))}
          </List>

          {vragen?.length > 0 && (
            <Pagination
              defaultCurrent={1}
              total={search ? filteredItems.length : vragen.length}
              defaultPageSize={size}
              showQuickJumper={false}
              showSizeChanger={false}
              onChange={setPageIndex}
            />
          )}
        </Wrapper>
      </Main>

      {isOpen && vragen?.length > 0 && (
        <Lightbox
          // discourageDownloads
          mainSrc={vragen[itemIndex].images[imgIndex].url}
          nextSrc={
            vragen[itemIndex].images[
              (imgIndex + 1) % vragen[itemIndex].images.length
            ].url
          }
          prevSrc={
            vragen[itemIndex].images[
              (imgIndex + vragen[itemIndex].images.length - 1) %
                vragen[itemIndex].images.length
            ].url
          }
          onCloseRequest={closeModal}
          onMovePrevRequest={() => {
            setImgIndex(
              (imgIndex + vragen[itemIndex].images.length - 1) %
                vragen[itemIndex].images.length
            )
          }}
          onMoveNextRequest={() => {
            setImgIndex((imgIndex + 1) % vragen[itemIndex].images.length)
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

import React from 'react'
import styled from 'styled-components'
import { media, wrapper } from '../../themes'
import { useIdentityContext } from 'react-netlify-identity'
import { Link } from 'gatsby'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`
const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`

const Icon = styled.span`
  margin-right: 5px;
  vertical-align: middle;
  svg {
    margin-top: 3px;
  }
`

const Button = styled.button`
  border: 2px solid var(--theme--color);
  border-radius: 3px;
  background: var(--white);
  padding: 5px 10px;
  border-radius: 25px;
  text-align: center;
  color: var(--text-color);
  display: block;
  margin-left: 20px;
`

const StyledLink = styled(Link)`
  background: transparent;
  padding: 5px 20px;
  border-radius: 3px;
  text-align: center;
  color: var(--text-color);
  margin-right: 10px;
  transition: background 300ms ease;
  &:hover {
    background: var(--white);
  }
`

const Profile = ({ toggleModal }) => {
  const identity = useIdentityContext()
  const isLoggedIn = identity && identity.isLoggedIn
  const name =
    identity &&
    identity.user &&
    identity.user.user_metadata &&
    identity.user.user_metadata.full_name

  return (
    isLoggedIn && (
      <Container>
        <div>
          <StyledLink
            to='/dashboard/leden'
            activeStyle={{ background: 'var(--white)' }}
          >
            Leden
          </StyledLink>
          <StyledLink
            to='/dashboard/admin'
            activeStyle={{ background: 'var(--white)' }}
          >
            Admin
          </StyledLink>
        </div>
        <FlexContainer>
          <p>
            <Icon>
              <svg
                width='16px'
                height='16px'
                viewBox='0 0 16 16'
                class='bi bi-person-circle'
                fill='currentColor'
              >
                <path d='M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z' />
                <path
                  fill-rule='evenodd'
                  d='M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
                />
                <path
                  fill-rule='evenodd'
                  d='M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z'
                />
              </svg>
            </Icon>
            <span>{name}</span>
          </p>
          <Button onClick={toggleModal}>Logout</Button>
        </FlexContainer>
      </Container>
    )
  )
}

export default Profile

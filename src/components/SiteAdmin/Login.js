import { navigate } from 'gatsby'
import React from 'react'
import { useIdentityContext } from 'react-netlify-identity'
import styled from 'styled-components'

const Button = styled.button`
  border: 2px solid var(--theme--color);
  border-radius: 3px;
  background: var(--white);
  padding: 5px 10px;
  border-radius: 25px;
  text-align: center;
  color: var(--text-color);
  display: block;
  margin-top: 20px;
  width: 120px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 100px);
`

const Login = ({ toggleModal }) => {
  const identity = useIdentityContext()

  if (identity && identity.isLoggedIn) {
    navigate('/dashboard/leden', { replace: true })
  }
  return (
    <Container>
      <div style={{ maxWidth: 800 }}>
        <p>Dit deel van de website is enkel toegankelijk voor leden. </p>
        <p>
          Voor meer informatie kan je terecht via
          <a
            style={{
              color: 'var(--theme--color)',
              textDecoration: 'underline',
            }}
            href='mailto:info@vlaamsetinvereniging.be'
          >
            {' '}
            info@vlaamsetinverening.be
          </a>
        </p>
        <Button onClick={toggleModal}>Login</Button>
      </div>
    </Container>
  )
}

export default Login

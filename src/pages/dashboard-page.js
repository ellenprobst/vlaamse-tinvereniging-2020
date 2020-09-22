import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { Router } from '@reach/router'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Layout from '../components/Layout'
import Admin from '../components/SiteAdmin/Admin'
import Leden from '../components/SiteAdmin/Leden'
import Login from '../components/SiteAdmin/Login'
import Profile from '../components/SiteAdmin/Profile'
import { media, wrapper } from '../themes'
import IdentityModal from 'react-netlify-identity-widget'
import PrivateRoute from '../components/PrivateRoute'
import 'react-netlify-identity-widget/styles.css'

const Container = styled.div`
  padding: 20px;
  max-width: calc(${wrapper} + 100px);
  margin: 30px auto 0;
  background: #f4f4f4;
  min-height: 100vh;
`
export const DashboardPage = ({ location }) => {
  const [isVisible, setVisibility] = useState(false)
  useEffect(() => {
    if (location.pathname.match(/^\/dashboard\/?$/)) {
      navigate('dashboard/login', { replace: true })
    }
  }, [location])

  const toggleModal = () => {
    return setVisibility(!isVisible)
  }
  return (
    <Layout>
      <Navbar light />
      <Container>
        <Profile toggleModal={toggleModal} />
        <Router>
          <PrivateRoute path='/dashboard/admin' component={Admin} />
          <PrivateRoute path='/dashboard/leden' component={Leden} />
          <Login path='/dashboard/login' toggleModal={toggleModal} />
        </Router>
      </Container>

      <IdentityModal showDialog={isVisible} onCloseDialog={toggleModal} />
    </Layout>
  )
}

export default DashboardPage

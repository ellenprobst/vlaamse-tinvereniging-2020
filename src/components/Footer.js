import React from 'react'
import { Link } from 'gatsby'

import logo from '../img/logo.svg'
import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
import vimeo from '../img/social/vimeo.svg'
import contactImage from '../img/contact.jpg'

const Footer = class extends React.Component {
  render() {
    return (
      <footer
        style={{
          position: 'fixed',
          height: 500,
          zIndex: -1,
          bottom: 0,
          left: 0,
          right: 0,
          background: '#333436',
          display: 'flex',
        }}
      >
        <div
          style={{
            width: '65%',
            color: '#fff',
            margin: '0 auto',
            padding: '50px 10vw',
          }}
        >
          <p>Vlaamse Tinvereniging</p>
          <p> secretariaat@vlaamsetinvereniging.be</p>
        </div>
        <div
          style={{
            width: '45%',
            //backgroundImage: `url(${contactImage})`,
            backgroundSize: 'cover',
          }}
        >
          <div></div>
        </div>
      </footer>
    )
  }
}

export default Footer

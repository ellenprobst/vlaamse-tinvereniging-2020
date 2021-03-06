import React from 'react'
import { Helmet } from 'react-helmet'
import GlobalStyle from '../components/GlobalStyle'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'
import { IdentityContextProvider } from 'react-netlify-identity-widget'
const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata()

  return (
    <IdentityContextProvider url='https://hopeful-goldstine-0f469e.netlify.app'>
      <Helmet>
        <html lang='en' />
        <title>{title}</title>
        <meta name='description' content={description} />

        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href={`${withPrefix('/')}img/apple-touch-icon.png`}
        />
        <link
          rel='icon'
          type='image/png'
          href={`${withPrefix('/')}img/favicon-32x32.png`}
          sizes='32x32'
        />
        <link
          rel='icon'
          type='image/png'
          href={`${withPrefix('/')}img/favicon-16x16.png`}
          sizes='16x16'
        />

        <link
          rel='mask-icon'
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
          color='#ff4400'
        />
        <meta name='theme-color' content='#B6BE9D' />

        <meta property='og:type' content='business.business' />
        <meta property='og:title' content={title} />
        <meta property='og:url' content='/' />
        <meta
          property='og:image'
          content={`${withPrefix('/')}img/og-image.jpg`}
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap'
          rel='stylesheet'
        ></link>
        <link
          href='https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap'
          rel='stylesheet'
        ></link>
      </Helmet>
      <GlobalStyle />

      <div>{children}</div>
    </IdentityContextProvider>
  )
}

export default TemplateWrapper

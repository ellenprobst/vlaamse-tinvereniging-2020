import React from 'react'
import PropTypes from 'prop-types'
import { IndexPageTemplate } from '../../templates/index-page'
import Layout from '../../components/Layout'

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <Layout>
        <IndexPageTemplate
          image={getAsset(data.image)}
          titel={data.titel}
          overOns={data.overOns}
          tinnewerck={data.tinnewerck}
          activiteiten={data.activiteiten}
          banner={data.banner}
        />
      </Layout>
    )
  } else {
    return <div>Loading...</div>
  }
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default IndexPagePreview

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import Map from '../Map'

const Wrapper = styled.section`
  position: relative;
  .header-main-infos {
    position: absolute;
    bottom: 0;
    z-index: 999;
    padding: 0 15px 5px;
    background-color: #fff;
    h1 {
      font-size: 1.5em;
      color: #333;
    }
    h2 {
      font-size: 14px;
    }
    .address {
      margin-top: 5px;
    }
  }
`

function Header ({ store }) {
  return (
    <Wrapper>
      <Helmet>
        <link
          crossOrigin=''
          href='https://unpkg.com/leaflet@1.3.4/dist/leaflet.css'
          integrity='sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=='
          rel='stylesheet'
        />
      </Helmet>
      <Map coordinates={store.coordinates} noLocate readOnly zoom={17} />
      <div className='header-main-infos'>
        <h1 className='title no-margin'>{store.name}</h1>
        <h2 className='activity'>{'Hôtels, Restaurants'}</h2>
        <div className='address'>{store.address}</div>
      </div>
    </Wrapper>
  )
}

Header.propTypes = {
  store: PropTypes.object.isRequired
}

export default Header

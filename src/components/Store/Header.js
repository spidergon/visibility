import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import Map from '../Map'
import Photos from './Photos'

const Wrapper = styled.section`
  position: relative;
  border-bottom: ${props => props.theme.headerBottom};
  .header-main-infos {
    position: absolute;
    grid-template-columns: auto auto;
    bottom: 0;
    z-index: 999;
    background-color: #fff;
    border: ${props => props.theme.headerBottom};
    border-bottom: none !important;
    .infos {
      width: 400px;
      padding: 0 10px;
    }
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

const Header = ({ store }) => (
  <Wrapper>
    <Helmet>
      <link
        crossOrigin=''
        href='https://unpkg.com/leaflet@1.3.4/dist/leaflet.css'
        integrity='sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=='
        rel='stylesheet'
      />
    </Helmet>
    <Map
      controlsToRight
      coordinates={store.coordinates}
      noLocate
      readOnly
      styleSize='250px'
      zoom={17}
    />
    <div className='header-main-infos grid'>
      <div className='infos'>
        <h1 className='name no-margin'>{store.name}</h1>
        <h2 className='activity'>{store.activity}</h2>
        <div className='address'>{store.address}</div>
      </div>
      <Photos photos={store.photos} />
    </div>
  </Wrapper>
)

Header.propTypes = {
  store: PropTypes.object.isRequired
}

export default Header

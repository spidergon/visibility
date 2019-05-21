import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import ShareIcon from '@material-ui/icons/Share'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Map from '../Map'
import Photos from './Photos'
import { addRemoveStoreFav } from '../../lib/base'
import { showSnack } from '../../lib/state'

const Wrapper = styled.section`
  position: relative;
  border-bottom: ${props => props.theme.headerBottom};
  .header-main-infos {
    position: absolute;
    grid-template-columns: auto auto;
    bottom: 0;
    z-index: 999;
    background-color: #fff;
    /* border: none ${props => props.theme.headerBottom}; */
    /* border-bottom: none !important; */
    margin: 0 0 10px 10px;
    .infos {
      display: grid;
      width: 400px;
      padding:  0 10px;
      .actions {
        align-self: end;
        padding-bottom: 5px;
        .loved {
          color: ${props => props.theme.loved};
        }
      }
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

function Header ({ store, user }) {
  const [inFav, setInFav] = useState(
    store.fans.includes(user ? user.uid : null)
  )

  const setInFavCallback = () => {
    if (inFav) {
      setInFav(false)
      showSnack("Vous n'aimez plus cette vitrine ?", 'success')
    } else {
      setInFav(true)
      showSnack('La vitrine a été ajoutée à vos favoris.', 'success')
    }
  }

  const addRemoveToFav = () => {
    addRemoveStoreFav(store.id, user.uid, setInFavCallback, inFav)
  }

  const share = () => {
    console.log('SHARE')
  }

  return (
    <Wrapper>
      <Map
        coordinates={store.coordinates}
        noLocate
        readOnly
        styleSize='250px'
        zoom={17}
      />
      <div className='header-main-infos grid'>
        <div className='infos'>
          <div className='general'>
            <h1 className='name no-margin'>{store.name}</h1>
            <h2 className='activity'>{store.activity}</h2>
            <div className='address'>{store.address}</div>
          </div>
          <div className='actions'>
            <IconButton
              aria-label={
                inFav ? 'Vitrine dans vos favoris' : 'Ajouter aux favoris'
              }
              onClick={addRemoveToFav}
              title={inFav ? 'Vitrine dans vos favoris' : 'Ajouter aux favoris'}
            >
              <FavoriteIcon className={inFav ? 'loved' : ''} />
            </IconButton>
            <IconButton
              aria-label='Partager la vitrine sur les réseaux sociaux'
              onClick={share}
              title='Partager la vitrine sur les réseaux sociaux'
            >
              <ShareIcon />
            </IconButton>
          </div>
        </div>
        <Photos photos={store.photos} />
      </div>
    </Wrapper>
  )
}

Header.propTypes = {
  store: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Header

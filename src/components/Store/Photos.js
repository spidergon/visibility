import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { $$ } from '../../lib/bling'

const Wrapper = styled.div`
  .photo_block {
    position: relative;
    width: 190px;
    height: 190px;
    overflow: hidden;
    img {
      position: absolute;
      height: 100%;
      object-fit: cover;
      transition: transform 0.2s ease, opacity 1.5s ease;
      opacity: 0;
      z-index: 1;
      cursor: pointer;
      &:hover {
        transform: scale(1.2);
      }
      &.front {
        opacity: 1;
        z-index: 2;
      }
    }
  }
`

function Photos ({ photos }) {
  useEffect(() => {
    const images = $$('.photo_block img')
    if (images) {
      const len = images.length
      if (len) {
        let index = 1
        images[0].classList.add('front')
        setInterval(() => {
          for (const img of images) {
            img.classList.remove('front')
          }
          if (index === len) index = 0
          images[index++].classList.add('front')
        }, 5000)
      }
    }
  }, [])

  return (
    <Wrapper>
      <div
        className='photo_block'
        title={
          photos.length > 1
            ? `Voir les ${photos.length} photos`
            : 'Voir la photo'
        }
      >
        {photos.map((photo, id) => (
          <img alt='Vitrine Showcase' key={id} src={photo.src} />
        ))}
        {photos.length === 0 && <div>{'Pas de photos'}</div>}
      </div>
    </Wrapper>
  )
}

Photos.propTypes = {
  photos: PropTypes.array.isRequired
}

export default Photos

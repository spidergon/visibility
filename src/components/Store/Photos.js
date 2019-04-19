import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'

const Wrapper = styled.div`
  /* overflow-x: auto; */
  .photo_block {
    /* width: max-content; */
    .photo_block__item {
      /* padding-right: 1px; */
      display: none;
      height: 190px;
      overflow: hidden;
      &:first-of-type {
        display: block;
      }
      img {
        width: 190px;
        /* height: 190px; */
        height: 100%;
        object-fit: cover;
        transition: all 0.2s ease;
        cursor: pointer;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }
`

function Photos ({ photos }) {
  return (
    <Wrapper>
      <Grid
        className='photo_block'
        container
        title={
          photos.length > 1
            ? `Voir les ${photos.length} photos`
            : 'Voir la photo'
        }
      >
        {photos.map((photo, id) => (
          <Grid className='photo_block__item' item key={id + photo.name}>
            <img alt={photo.name} src={photo.src} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  )
}

Photos.propTypes = {
  photos: PropTypes.array.isRequired
}

export default Photos

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'

const Wrapper = styled.section`
  overflow-x: auto;
  .photo_block {
    width: max-content;
    .photo_block__item {
      padding-right: 1px;
      img {
        width: 190px;
        height: 190px;
        object-fit: cover;
        cursor: pointer;
      }
    }
    .photo_block__add {
      background-color: pink;
    }
  }
`

function Photos ({ photos }) {
  return (
    <Wrapper>
      <Grid className='photo_block' container>
        {photos.map((photo, id) => (
          <Grid className='photo_block__item' item key={id + photo.name}>
            <img alt={photo.name} src={photo.src} />
          </Grid>
        ))}
        <Grid item>
          <div className='photo_block__add'>{'action'}</div>
        </Grid>
      </Grid>
    </Wrapper>
  )
}

Photos.propTypes = {
  photos: PropTypes.array.isRequired
}

export default Photos

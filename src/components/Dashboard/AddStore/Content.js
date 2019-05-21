import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import InfoForm from './InfoForm'
import DescriptionForm from './DescriptionForm'
import PhotosForm from './PhotosForm'
import GeolocForm from './GeolocForm'

const Actions = styled.div`
  margin-top: calc(${props => props.theme.spacingUnit} * 2);
  text-align: center;
  .button {
    margin-top: ${props => props.theme.spacingUnit};
    margin-right: ${props => props.theme.spacingUnit};
  }
`

function Content ({
  step,
  dispatch,
  data: { info, description, photos, geoloc }
}) {
  const [error, setError] = useState(false)
  let content
  switch (step) {
    case 0:
      content = <InfoForm {...info} setFormError={setError} />
      break
    case 1:
      content = <DescriptionForm {...description} setFormError={setError} />
      break
    case 2:
      content = <PhotosForm {...photos} />
      break
    case 3:
      content = <GeolocForm {...geoloc} setFormError={setError} />
      break
    default:
      throw new Error(`Unknown step: ${step}`)
  }
  return (
    <form
      autoComplete='off'
      onSubmit={e => {
        e.preventDefault()
        if (!error) dispatch('next')
      }}
    >
      {content}
      <Actions>
        <Button
          className='button'
          disabled={step === 0}
          onClick={e => dispatch('prev')}
        >
          {'Retour'}
        </Button>
        <Button
          className='button'
          color='primary'
          disabled={error}
          type='submit'
          variant='contained'
        >
          {'Suivant'}
        </Button>
      </Actions>
    </form>
  )
}

Content.propTypes = {
  step: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.shape({
    info: PropTypes.object.isRequired,
    description: PropTypes.object.isRequired,
    photos: PropTypes.object.isRequired,
    geoloc: PropTypes.object.isRequired
  })
}

export default Content

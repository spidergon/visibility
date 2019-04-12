import React, { useEffect } from 'react'
import 'whatwg-fetch'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Map from '../../Map'

const Wrapper = styled.div`
  text-align: center;
`

async function getAddress (lat, lng) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
  )
  const data = await res.json()
  if (data && data.display_name) {
    return data.display_name
  }
  return null
}

function GeolocForm ({
  setFormError,
  address,
  setAddress,
  coordinates,
  setCoordinates
}) {
  useEffect(() => {
    setFormError(!address)
  }, [address, setFormError])

  useEffect(() => {
    const [lat, lng] = coordinates
    if (lat !== 0 && lng !== 0) {
      getAddress(lat, lng).then(addr => setAddress(addr))
    }
  }, [coordinates, setAddress])

  return (
    <Wrapper>
      <p>
        {
          'Cliquez sur la carte ou déplacez le curseur pour modifier votre adresse'
        }
        &nbsp;{':'}
      </p>
      <Map coordinates={coordinates} setCoordinates={setCoordinates} />
      <TextField
        fullWidth
        InputProps={{ readOnly: true }}
        margin='normal'
        onChange={e => setAddress(e.target.value)}
        placeholder='Veuillez cliquer sur la carte pour modifier votre adresse...'
        required
        value={address}
      />
    </Wrapper>
  )
}

GeolocForm.propTypes = {
  setFormError: PropTypes.func.isRequired,
  address: PropTypes.string,
  setAddress: PropTypes.func.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  setCoordinates: PropTypes.func.isRequired
}

export default GeolocForm

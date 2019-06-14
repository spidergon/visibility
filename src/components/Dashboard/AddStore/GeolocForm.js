import React, { useState, useEffect, useRef, useCallback } from 'react'
import { get } from 'axios'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import Map from '../../Map'

const Wrapper = styled.div`
  text-align: center;
  .text-zone {
    position: relative;
    .loading {
      position: absolute;
      top: 0.25rem;
      left: 50%;
    }
  }
`

let gettingAddress = false

function GeolocForm ({
  setFormError,
  address,
  setAddress,
  coordinates,
  setCoordinates
}) {
  const [loading, setLoading] = useState(true)

  const didCancel = useRef(false)

  const setAddr = useCallback(
    addr => {
      if (didCancel.current) return
      setAddress(addr)
    },
    [setAddress]
  )

  const getAddress = useCallback(
    async (lat, lng) => {
      gettingAddress = true
      setLoading(true)
      get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      )
        .then(({ data }) => {
          if (data.display_name) {
            setAddr(data.display_name)
          }
        })
        .catch(err => {
          console.error(err)
          setAddr('')
        })
        .then(() => {
          gettingAddress = false
          setLoading(false)
        })
    },
    [setAddr]
  )

  useEffect(() => {
    if (gettingAddress) return
    const [lat, lng] = coordinates
    if (lat !== 0 && lng !== 0) getAddress(lat, lng)
  }, [coordinates, getAddress])

  useEffect(() => {
    setFormError(!address)
  }, [address, setFormError])

  useEffect(() => () => (didCancel.current = true), [])

  return (
    <Wrapper>
      <p>
        {
          'Cliquez sur la carte ou déplacez le curseur pour modifier votre adresse'
        }
        &nbsp;{':'}
      </p>
      <Map coordinates={coordinates} setCoordinates={setCoordinates} />
      <div className='text-zone'>
        {loading && (
          <div className='loading'>
            <CircularProgress />
          </div>
        )}
        <TextField
          fullWidth
          InputProps={{ readOnly: true }}
          margin='normal'
          onChange={e => setAddress(e.target.value)}
          placeholder='Veuillez cliquer sur la carte pour modifier votre adresse...'
          required
          value={address}
        />
      </div>
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

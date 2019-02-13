import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Seo from '../Seo'

const Wrapper = styled.div``

function Account () {
  return (
    <Wrapper>
      <Seo title="Mon Compte" />
      <p>{'Mon Compte'}</p>
    </Wrapper>
  )
}

export default Account

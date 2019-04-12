import React from 'react'
import styled from 'styled-components'
import Seo from '../Seo'

const Wrapper = styled.div``

function Account () {
  return (
    <Wrapper>
      <Seo title='Mon Compte' />
      <center>
        <h2>{'Mon Compte'}</h2>
      </center>
    </Wrapper>
  )
}

export default Account

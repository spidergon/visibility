import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.article``

const Showcase = ({ store }) => <Wrapper>{'Mise en avant'}</Wrapper>

Showcase.propTypes = {
  store: PropTypes.object.isRequired
}

export default Showcase

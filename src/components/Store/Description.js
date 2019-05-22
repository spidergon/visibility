import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import draftToHtml from 'draftjs-to-html'
import ReactHtmlParser from 'react-html-parser'

const Wrapper = styled.article``

const toReactHtml = store => {
  try {
    return store && store.description
      ? ReactHtmlParser(draftToHtml(JSON.parse(store.description))) // eslint-disable-line babel/new-cap
      : ''
  } catch {
    /* */
  }
}

const Description = ({ store }) => <Wrapper>{toReactHtml(store)}</Wrapper>

Description.propTypes = {
  store: PropTypes.object.isRequired
}

export default Description

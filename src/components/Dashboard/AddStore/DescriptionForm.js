import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const Wrapper = styled.div`
  .desc-editor-toolbar:hover,
  .desc-editor-field:hover {
    border-color: ${props => props.theme.black};
  }
  .desc-editor-field {
    border: 1px solid #f1f1f1;
    border-radius: 2px;
    padding: 0 10px;
  }
`

function DescriptionForm ({ setFormError, description, setDescription }) {
  const [contentState, setContentState] = useState(
    description ? JSON.parse(description) : ''
  )

  useEffect(() => {
    setFormError(true)
    if (contentState) {
      const hasText = contentState.blocks.some(({ text }) => !!text)
      if (hasText) {
        setFormError(false)
        setDescription(JSON.stringify(contentState))
      }
    }
  }, [contentState, setDescription, setFormError])

  return (
    <Wrapper>
      <Editor
        editorClassName='desc-editor-field'
        initialContentState={description ? JSON.parse(description) : ''}
        onContentStateChange={state => setContentState(state)}
        placeholder='Décrivez votre vitrine et donnez envie ! 😉'
        toolbarClassName='desc-editor-toolbar'
      />
    </Wrapper>
  )
}

DescriptionForm.propTypes = {
  setFormError: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired
}

export default DescriptionForm

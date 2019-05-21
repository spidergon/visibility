import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const Wrapper = styled.div`
  .rdw-editor-toolbar,
  .rdw-editor-main {
    &:hover,
    &focus {
      border-color: ${props => props.theme.black};
    }
  }
  .rdw-editor-main {
    border: 1px solid #f1f1f1;
    border-radius: 2px;
    padding: 0 10px;
  }
`

function DescriptionForm ({ setFormError, description, setDescription }) {
  const [descriptionError, setDescriptionError] = useState('')
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  useEffect(() => {
    setFormError(!!descriptionError)
  }, [descriptionError, setFormError])

  useEffect(() => {
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    setDescription(content)
  }, [editorState, setDescription])

  return (
    <Wrapper>
      <Editor
        editorClassName='demo-editor'
        editorState={editorState}
        onEditorStateChange={state => setEditorState(state)}
        wrapperClassName='demo-wrapper'
      />
      <textarea
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
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

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import CloseIcon from '@material-ui/icons/Cancel'
import Grid from '@material-ui/core/Grid'
import Dropzone from 'react-dropzone'
import { asyncLoop, readFile } from '../../../lib/utils'
import { uploadFile, deleteFile } from '../../../lib/base'

const Wrapper = styled.div`
  text-align: center;
  .error,
  .info {
    font-weight: bold;
    font-size: 10pt;
    margin: 0;
  }
  .error {
    color: red;
  }
  .info {
    color: green;
  }
  .preview {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }
  .delete {
    position: relative;
    left: -24px;
    top: -76px;
    background: #fff;
    cursor: pointer;
  }
`

const StyledDropArea = styled.div`
  width: 320px;
  height: 200px;
  border-radius: 5px;
  border: 3px dashed;
  outline: none;
  margin: 2rem auto;
  cursor: pointer;
  vertical-align: middle;
  &.accepted {
    background: #00800030;
  }
  &.rejected {
    background: #ff000030;
    border-color: red;
    .label {
      color: red;
    }
  }
  .label {
    position: relative;
    top: 50%;
    margin: -15px 0 0;
    white-space: nowrap;
  }
  @media screen and (max-width: ${props => props.theme.xs}) {
    width: 100%;
  }
`

const limitSize = 5 // MB
const maxSize = limitSize * 1048576 // maxSize * 1024 * 1024 (MB)
const maxFiles = 3

function PhotosForm ({ setFormError, photos, setPhotos }) {
  const [loading, setLoading] = useState(false)
  const [dropError, setDropError] = useState('')

  const handlePreviewDrop = async (acceptedFiles, rejectedFiles) => {
    setDropError('')

    if (rejectedFiles.length > 0) {
      return setDropError(
        `Veuillez insérer une image valide (png, jpeg, etc.) de taille < ${limitSize}Mo.`
      )
    }
    if (photos.length + acceptedFiles.length > maxFiles) {
      return setDropError(
        `Vous ne pouvez envoyer qu${
          maxFiles === 1 ? "'" : 'e '
        }${maxFiles} image${
          maxFiles > 1 ? 's' : ''
        } ! Veuillez modifier votre souscription pour ajouter jusqu'à 10 images.`
      )
    }

    setLoading(true)
    const totalPhotos = [...photos]

    await asyncLoop(acceptedFiles, async f => {
      const res = await readFile(f, setDropError)
      if (res) {
        const uploadRes = await uploadFile(f.name, res)
        totalPhotos.push(uploadRes)
      }
    })

    setPhotos(totalPhotos)
    setLoading(false)
  }

  const showDropInfo = () => {
    if (dropError) return <p className="error">{dropError}</p>
  }

  return (
    <Wrapper className="grid">
      <p>
        {'Déposez vos photos dans la zone ci-dessous'}&nbsp;{':'}
      </p>
      <Dropzone
        accept={'image/*'}
        disabled={loading}
        maxSize={maxSize}
        onDrop={handlePreviewDrop}
      >
        {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragAccept,
          isDragReject
        }) => (
          <StyledDropArea
            {...getRootProps()}
            className={
              isDragAccept ? 'accepted' : isDragReject ? 'rejected' : ''
            }
          >
            <input {...getInputProps()} />
            {loading ? (
              <div className="label">
                <CircularProgress />
              </div>
            ) : (
              <p className="label">
                {isDragAccept && '➡ Déposez... ⬅'}
                {isDragReject && '⚠️ Photo(s) invalide(s) !'}
                {!isDragActive && '➡ Insérez vos photos ici ⬅'}
              </p>
            )}
          </StyledDropArea>
        )}
      </Dropzone>
      {showDropInfo()}
      <Grid container spacing={8}>
        {photos.map((photo, index) => {
          return (
            <Grid item key={index}>
              <img alt="Preview" className="preview" src={photo.src} />
              <CloseIcon
                className="delete"
                onClick={() => {
                  deleteFile(photo.path)
                  setPhotos(photos.filter(p => p.name !== photo.name))
                }}
              />
            </Grid>
          )
        })}
      </Grid>
    </Wrapper>
  )
}

PhotosForm.propTypes = {
  setFormError: PropTypes.func.isRequired,
  photos: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  setPhotos: PropTypes.func.isRequired
}

export default PhotosForm

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import Grid from '@material-ui/core/Grid'
import { slugify } from '../../../lib/utils'
import { storeExists } from '../../../lib/base'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  .tagsList {
    padding: 0.5rem;
  }
  @media (max-width: ${props => props.theme.sm}) {
    grid-template-columns: 1fr;
  }
`

let unmounted = false // block async state update when component has been unmouted

function InfoForm ({
  setFormError,
  name,
  setName,
  description,
  setDescription,
  tags,
  setTags,
  company,
  setCompany,
  siret,
  setSiret
}) {
  const [tag, setTag] = useState('')
  const [nameError, setNameError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [tagError, setTagError] = useState('')
  const [siretError, setSiretError] = useState('')

  useEffect(() => {
    verifyName()
    unmounted = false
    return () => {
      unmounted = true
    }
  }, [])

  useEffect(() => {
    if (nameError) setNameError('')
  }, [name])

  useEffect(() => {
    if (descriptionError) setDescriptionError('')
  }, [description])

  useEffect(() => {
    if (tagError) setTagError('')
  }, [tag])

  useEffect(() => {
    if (siretError) setSiretError('')
  }, [siret])

  useEffect(() => {
    setFormError(!!(nameError || descriptionError || tagError || siretError))
  }, [nameError, descriptionError, tagError, siretError])

  const handleAddTag = () => {
    if (!tag) return
    if (tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())) {
      return setTagError('Votre tag est déjà inclu dans la liste.')
    }
    if (tag.length < 3) {
      return setTagError('Votre tag doit comporter au minimum 3 caractères.')
    }
    if (tag.length > 20) {
      return setTagError('Votre tag doit ne doit pas dépasser 20 caractères.')
    }
    setTags([...tags, tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()])
    setTag('')
  }

  const verifyName = async () => {
    if (!name) return setNameError('Veuillez saisir un nom.')
    const newName = name.trim()
    if (await storeExists(slugify(newName))) {
      if (unmounted) return
      setName(newName)
      setNameError("Ce nom n'est pas disponible.")
    }
  }

  const verifyDescription = () => {
    if (!description) {
      return setDescriptionError('Veuillez saisir une description.')
    }
  }

  const verifySiret = () => {
    if (!siret) return
    const value = siret.replace(/ /g, '')
    const size = value.length
    if (isNaN(value) || (size !== 9 && size !== 14)) {
      return setSiretError(
        "Le numéro d'identification (SIRET/SIREN) doit comporter 9 ou 14 chiffres."
      )
    }
    let bal = 0
    let total = 0
    for (let i = size - 1; i >= 0; i--) {
      const step = (value.charCodeAt(i) - 48) * (bal + 1)
      total += step > 9 ? step - 9 : step
      bal = 1 - bal
    }
    if (total % 10 !== 0) {
      setSiretError("Le numéro d'identification (SIRET/SIREN) est invalide.")
    }
  }

  return (
    <Wrapper>
      {/* Store Info (left) */}
      <div>
        <FormControl error={!!nameError} margin="normal">
          <InputLabel htmlFor="name">{'Nom *'}</InputLabel>
          <Input
            id="name"
            multiline
            onBlur={verifyName}
            onChange={e => setName(e.target.value)}
            required
            value={name}
          />
          <FormHelperText id="name-error">{nameError}</FormHelperText>
        </FormControl>
        <br />
        <FormControl error={!!descriptionError} margin="normal">
          <TextField
            error={!!descriptionError}
            label="Description"
            margin="normal"
            multiline
            onBlur={verifyDescription}
            onChange={e => setDescription(e.target.value)}
            placeholder="Description de votre vitrine"
            required
            value={description}
          />
          <FormHelperText id="name-error">{descriptionError}</FormHelperText>
        </FormControl>
        <div>
          <FormControl error={!!tagError} margin="normal">
            <InputLabel htmlFor="tags">{'Ajouter un tag'}</InputLabel>
            <Input
              endAdornment={
                <InputAdornment position="end" variant="filled">
                  <IconButton
                    aria-label="Ajouter un tag"
                    onClick={handleAddTag}
                  >
                    <AddIcon color="primary" />
                  </IconButton>
                </InputAdornment>
              }
              id="tags"
              onChange={e => setTag(e.target.value)}
              value={tag}
            />
            <FormHelperText id="name-error">{tagError}</FormHelperText>
          </FormControl>
          {tags.length > 0 && (
            <Paper className="tagsList">
              <Grid container spacing={8}>
                {tags.map((tag, index) => {
                  return (
                    <Grid item key={index}>
                      <Chip
                        className="chip"
                        key={index}
                        label={tag}
                        onDelete={() => setTags(tags.filter(t => t !== tag))}
                      />
                    </Grid>
                  )
                })}
              </Grid>
            </Paper>
          )}
        </div>
      </div>
      {/* Company Info (right) */}
      <div>
        <TextField
          label="Entreprise"
          margin="normal"
          onChange={e => setCompany(e.target.value)}
          placeholder="Nom de votre entreprise"
          value={company}
        />
        <br />
        <FormControl error={!!siretError} margin="normal">
          <InputLabel htmlFor="siret">{'SIRET / SIREN'}</InputLabel>
          <Input
            id="siret"
            onBlur={verifySiret}
            onChange={e => setSiret(e.target.value)}
            placeholder="Numéro SIRET ou SIREN"
            value={siret}
          />
          <FormHelperText id="name-error">{siretError}</FormHelperText>
        </FormControl>
      </div>
    </Wrapper>
  )
}

InfoForm.propTypes = {
  setFormError: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  setTags: PropTypes.func.isRequired,
  company: PropTypes.string.isRequired,
  setCompany: PropTypes.func.isRequired,
  siret: PropTypes.string.isRequired,
  setSiret: PropTypes.func.isRequired
}

export default InfoForm

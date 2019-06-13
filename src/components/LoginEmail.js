import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import { infoLabel } from './Login'
import { EMAIL_REGEX } from './Firebase'

const LoginEmailForm = styled.form`
  display: grid;
  grid-gap: 20px;
  justify-items: center;
  max-width: 500px;
  margin: 20px auto 0;
  #back {
    cursor: pointer;
  }
  ${infoLabel}
  .form-content {
    margin: 0;
  }
`

function LoginEmail ({ firebase, setIsLoginEmail }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const authenticateEmail = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setEmailError('')

    if (!email || !email.match(EMAIL_REGEX)) {
      setLoading(false)
      return setEmailError('E-mail incorrect.')
    }

    await firebase.sendSignInEmailLink(email, error => {
      setLoading(false)
      if (error) return setError(error)
      setInfo('Votre lien a été envoyé !')
    })
  }

  const showError = () => {
    const code = error && error.code
    if (code) {
      return <span className='error'>{'La connexion a échoué !'}</span>
    }
  }

  const showInfo = () => {
    if (info) return <span className='info'>{info}</span>
  }

  return (
    <LoginEmailForm onSubmit={authenticateEmail}>
      <span id='back' onClick={() => setIsLoginEmail(false)}>
        {'⬅️ Retour'}
      </span>
      <h4>
        {
          'Saisissez votre adresse e-mail, un lien permettant votre connexion vous sera envoyé.'
        }
      </h4>
      <FormControl
        className='form-content'
        error={!!emailError}
        margin='normal'
      >
        <InputLabel htmlFor='tags'>{'E-mail'}</InputLabel>
        <Input
          onChange={e => setEmail(e.target.value)}
          required
          value={email}
        />
        <FormHelperText id='name-error'>{emailError}</FormHelperText>
      </FormControl>
      {showError()}
      {showInfo()}
      <Button
        className='button'
        color='primary'
        type='submit'
        variant='contained'
      >
        {loading ? 'Chargement...' : 'Envoyer le lien magique'}
      </Button>
    </LoginEmailForm>
  )
}

LoginEmail.propTypes = {
  firebase: PropTypes.object.isRequired,
  setIsLoginEmail: PropTypes.func.isRequired
}

export default LoginEmail

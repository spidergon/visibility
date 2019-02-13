import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import { LoginEmailForm } from './styles/LoginStyle'
import { EMAIL_REGEX, sendSignInEmailLink } from '../lib/user'

function LoginEmail ({ setIsLoginEmail }) {
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

    await sendSignInEmailLink(email, error => {
      setLoading(false)
      if (error) return setError(error)
      setInfo('Votre lien a été envoyé !')
    })
  }

  const showError = () => {
    const code = error && error.code
    if (code) {
      return <span className="error">{'La connexion a échoué !'}</span>
    }
  }

  const showInfo = () => {
    if (info) return <span className="info">{info}</span>
  }

  return (
    <LoginEmailForm onSubmit={authenticateEmail}>
      <span id="back" onClick={() => setIsLoginEmail(false)}>
        {'⬅️ Retour'}
      </span>
      <h4>
        {
          'Saisissez votre adresse e-mail, un lien permettant votre connexion vous sera envoyé.'
        }
      </h4>
      <FormControl
        className="form-content"
        error={!!emailError}
        margin="normal"
      >
        <InputLabel htmlFor="tags">{'E-mail'}</InputLabel>
        <Input
          onChange={e => setEmail(e.target.value)}
          required
          value={email}
        />
        <FormHelperText id="name-error">{emailError}</FormHelperText>
      </FormControl>
      {showError()}
      {showInfo()}
      <Button
        className="button"
        color="primary"
        type="submit"
        variant="contained"
      >
        {loading ? 'Chargement...' : 'Envoyer le lien magique'}
      </Button>
    </LoginEmailForm>
  )
}

LoginEmail.propTypes = {
  setIsLoginEmail: PropTypes.func.isRequired
}

export default LoginEmail

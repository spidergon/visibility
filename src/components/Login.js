import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Wrapper } from './styles/LoginStyle'
import Button from './Button'
import LoginEmail from './LoginEmail'
import useUser, {
  AUTH_CREDENTIAL_IN_USE,
  signIn,
  signInEmailLink
} from '../lib/user'

function authHandler () {
  navigate('/dashboard') // Redirection
}

function Login () {
  const [isLoginEmail, setIsLoginEmail] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { userLoading, user } = useUser()

  useEffect(() => {
    // Sign in and Redirect in case the user signed in with email link
    signInEmailLink(error => {
      if (error) return setError(error)
      authHandler()
    })
  }, [])

  const authenticate = provider => {
    setLoading(true)
    signIn(provider, authHandler, setLoading, setError)
  }

  const showError = () => {
    const code = error && error.code
    if (code === AUTH_CREDENTIAL_IN_USE) {
      return (
        <span className="error">
          {'Un compte possède déjà ces informations de connexion !'}
        </span>
      )
    } else if (code) {
      return <span className="error">{'La connexion a échoué !'}</span>
    }
  }

  return (
    <Wrapper>
      <div className="content">
        {!loading ? <h2>{'Connexion'}</h2> : <CircularProgress />}
        <h4>{'Connectez-vous pour gérer votre compte !'}</h4>
        {userLoading && <p>{'Chargement...'}</p>}
        {!userLoading && user && (
          <>
            <p className="info">{'Vous êtes déjà connecté(e) !'}</p>
            <Button
              handleClick={() => {
                user.signOut()
                navigate('/')
              }}
            >
              {'Se déconnecter'}
            </Button>
          </>
        )}
        {!userLoading && !user && (
          <>
            {showError()}
            {!isLoginEmail ? (
              <div className="buttons">
                <Button
                  classes="facebook"
                  disabled={loading}
                  handleClick={() => authenticate('Facebook')}
                >
                  <i className="fab fa-facebook" />
                  {'Se connecter avec Facebook'}
                </Button>
                <Button
                  classes="twitter"
                  disabled={loading}
                  handleClick={() => authenticate('Twitter')}
                >
                  <i className="fab fa-twitter" />
                  {'Se connecter avec Twitter'}
                </Button>
                <Button
                  classes="email"
                  disabled={loading}
                  handleClick={() => setIsLoginEmail(true)}
                >
                  <i className="fas fa-envelope" />
                  {'Se connecter par e-mail'}
                </Button>
              </div>
            ) : (
              <LoginEmail setIsLoginEmail={setIsLoginEmail} />
            )}
          </>
        )}
      </div>
    </Wrapper>
  )
}

export default Login

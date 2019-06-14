import React, { useState } from 'react'
import { navigate } from 'gatsby'
import styled, { css } from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Button from './Button'
import LoginEmail from './LoginEmail'
import { dashPath } from '../lib/utils'
import { useFirebase, useAuth, AUTH_CREDENTIAL_IN_USE } from './Firebase'

const infoLabel = css`
  .error,
  .info {
    font-weight: bold;
    font-size: 10pt;
  }
  .error {
    color: red;
  }
  .info {
    color: green;
  }
`

const Wrapper = styled.div`
  padding-top: calc(${props => props.theme.headerHeight} + 2rem);
  .content {
    position: relative;
    width: 600px;
    margin: 0 auto;
    padding: 3em 2.5em;
    border: 1px solid ${props => props.theme.gray};
    border-radius: 8px;
    text-align: center;
    ${infoLabel}
    .closeIcon {
      position: absolute;
      top: 5px;
      left: 5px;
    }
    .buttons {
      margin-top: 40px;
    }
    .button {
      font-weight: bold;
      text-transform: unset;
      &.facebook,
      &.twitter,
      &.email {
        padding: 0;
        border: 0;
        display: block;
        margin-bottom: 2rem;
        color: white;
        max-width: 45rem;
        transition: ${props => props.theme.bcTransition},
          opacity 0.2s ease-in-out;
        &:hover {
          opacity: 0.9;
        }
      }
      &.facebook {
        background: #3864a3;
      }
      &.twitter {
        background: #5ea9dd;
      }
      &.email {
        background: transparent;
        color: ${props => props.theme.black};
        box-shadow: inset 0 0 0 1px #dee1e3;
        &:hover {
          background-color: rgba(144, 144, 144, 0.075);
        }
      }
    }
  }
  @media screen and (max-width: ${props => props.theme.sm}) {
    padding-top: calc(${props => props.theme.headerHeight} + 1rem);
    .content {
      max-width: 90%;
      .button {
        &.facebook,
        &.twitter,
        &.email {
          margin-bottom: 1rem;
        }
      }
    }
  }
  @media screen and (max-width: ${props => props.theme.xs}) {
    .content {
      padding: 1em;
    }
  }
`

function Login () {
  const [isLoginEmail, setIsLoginEmail] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { initializing, user } = useAuth()

  const firebase = useFirebase()

  const authHandler = () => navigate(dashPath) // Redirection

  // useEffect(() => {
  //   if (firebase) {
  //     // Sign in and Redirect in case the user signed in with email link
  //     firebase.signInEmailLink(error => {
  //       if (error) return setError(error)
  //       authHandler()
  //     })
  //   }
  // }, [firebase])

  const fallback = err => {
    setLoading(false)
    setError(err)
  }

  const authenticate = provider => {
    setLoading(true)
    firebase.signIn(provider, authHandler, fallback)
  }

  const showError = () => {
    const code = error && error.code
    if (code === AUTH_CREDENTIAL_IN_USE) {
      return (
        <span className='error'>
          {'Un compte possède déjà ces informations de connexion !'}
        </span>
      )
    } else if (code) {
      return <span className='error'>{'La connexion a échoué !'}</span>
    }
  }

  return (
    <Wrapper>
      <div className='content'>
        <IconButton
          aria-label='Close'
          className='closeIcon'
          onClick={() => navigate('/')}
        >
          <CloseIcon />
        </IconButton>
        {!loading ? <h2>{'Connexion'}</h2> : <CircularProgress />}
        <h4>{'Connectez-vous pour gérer votre compte !'}</h4>
        {initializing && <p>{'Chargement...'}</p>}
        {!initializing && user && (
          <>
            <p className='info'>{'Vous êtes déjà connecté(e) !'}</p>
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
        {!initializing && !user && (
          <>
            {showError()}
            {!isLoginEmail ? (
              <div className='buttons'>
                <Button
                  classes='facebook'
                  disabled={loading}
                  handleClick={() => authenticate('Facebook')}
                >
                  <i className='fab fa-facebook' />
                  {'Connexion avec Facebook'}
                </Button>
                <Button
                  classes='twitter'
                  disabled={loading}
                  handleClick={() => authenticate('Twitter')}
                >
                  <i className='fab fa-twitter' />
                  {'Connexion avec Twitter'}
                </Button>
                <Button
                  classes='email'
                  disabled={loading}
                  handleClick={() => setIsLoginEmail(true)}
                >
                  <i className='fas fa-envelope' />
                  {'Connexion par e-mail'}
                </Button>
              </div>
            ) : (
              <LoginEmail
                firebase={firebase}
                setIsLoginEmail={setIsLoginEmail}
              />
            )}
          </>
        )}
      </div>
    </Wrapper>
  )
}

export default Login
export { infoLabel }

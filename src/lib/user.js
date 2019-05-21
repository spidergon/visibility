import { useContext } from 'react'
import firebase, { auth } from './base'
import { UserContext } from '../components/UserProvider'

/**
 * Hook that gives the authentivated user
 * @returns {Object} { initializing, user }.
 */
export function useSession () {
  return useContext(UserContext)
}

/**
 * Sign In by a provider.
 * @param {string} provider - the provider.
 * @param {function} authHandler - the auth callback.
 * @param {function} setLoading - the loading callback.
 * @param {function} setError - the error callback.
 */
export function signIn (provider, authHandler, setLoading, setError) {
  auth
    .signInWithPopup(new firebase.auth[`${provider}AuthProvider`]())
    .then(authHandler)
    .catch(error => {
      setError({ code: error.code, message: error.message })
      setLoading(false)
    })
}

/** Sign In Anonymously. */
export function signInAnonymously () {
  return auth.signInAnonymously()
}

/**
 * Send e-mail containing a link to automatically sign in by e-mail.
 * @param {string} email - the email to send the link to.
 * @param {function} callback - the callback to trigger after email sent.
 */
export function sendSignInEmailLink (email, callback) {
  // TODO: change url (domain name)
  auth
    .sendSignInLinkToEmail(email, {
      url: 'http://localhost:8000/connexion?finishEmailSignIn',
      handleCodeInApp: true
    })
    .then(() => {
      window.localStorage.setItem('emailForSignIn', email)
      callback()
    })
    .catch(error => callback(error))
}

/**
 * Sign In by the link provided by e-mail.
 * @param {function} callback - the callback to trigger after signed in.
 */
export function signInEmailLink (callback) {
  if (auth.isSignInWithEmailLink(window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn')
    if (!email) {
      email = window.prompt('Veuillez confirmer votre adresse e-mail :') || ''
    }
    auth
      .signInWithEmailLink(email, window.location.href)
      .then(() => {
        window.localStorage.removeItem('emailForSignIn')
        callback()
      })
      .catch(error => callback(error))
  }
}

/** 'auth/account-exists-with-different-credential' error code. */
export const AUTH_CREDENTIAL_IN_USE =
  'auth/account-exists-with-different-credential'

/** Regex for validate email. */
export const EMAIL_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i

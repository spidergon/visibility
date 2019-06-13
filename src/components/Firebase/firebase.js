const config = {
  apiKey: process.env.BASE_API_KEY,
  authDomain: process.env.BASE_AUTH_DOMAIN,
  databaseURL: process.env.BASE_DATABASE_URL,
  projectId: process.env.BASE_PROJECT_ID,
  storageBucket: process.env.BASE_STORAGE_BUCKET,
  messagingSenderId: process.env.BASE_APP_MESSAGING_SENDER_ID,
  appId: process.env.BASE_APP_ID
}

class Firebase {
  constructor (app) {
    app.initializeApp(config)

    /* Firebase APIs */
    this.app = app
    this.auth = app.auth()
    this.db = app.firestore()
    this.storage = app.storage()

    this.enablePersistence()

    this.getOptions = {
      source: 'cache'
    }
  }

  /** Configure db offline persistence */
  enablePersistence = () => {
    this.db.enablePersistence({ synchronizeTabs: true }).catch(err => {
      if (err.code === 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence.
        console.log("Data can't be persisted on your browser")
      }
    })
  }

  /*  ----------------
      --- Auth API ---
      ----------------  */

  /**
   * Sign In by a provider.
   * @param {string} provider - the provider.
   * @param {function} next - the auth callback.
   * @param {function} fallback - the error callback.
   */
  signIn = (provider, next, fallback) => {
    this.auth
      .signInWithPopup(new this.app.auth[`${provider}AuthProvider`]())
      .then(next)
      .catch(err => {
        if (typeof fallback === `function`) fallback(err)
      })
  }

  /** Sign In Anonymously. */
  signInAnonymously = () => this.auth.signInAnonymously()

  /**
   * Send e-mail containing a link to automatically sign in by e-mail.
   * @param {string} email - the email to send the link to.
   * @param {function} next - the callback to trigger after email sent.
   */
  sendSignInEmailLink = (email, next) => {
    // TODO: change url (domain name)
    this.auth
      .sendSignInLinkToEmail(email, {
        url: 'http://localhost:8000/connexion?finishEmailSignIn',
        handleCodeInApp: true
      })
      .then(() => {
        window.localStorage.setItem('emailForSignIn', email)
        if (typeof next === `function`) next()
      })
      .catch(err => {
        if (typeof next === `function`) next(err)
      })
  }

  /**
   * Sign In by the link provided by e-mail.
   * @param {function} next - the callback to trigger after signed in.
   */
  signInEmailLink = next => {
    if (this.auth.isSignInWithEmailLink(window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn')
      if (!email) {
        email = window.prompt('Veuillez confirmer votre adresse e-mail :') || ''
      }
      this.auth
        .signInWithEmailLink(email, window.location.href)
        .then(() => {
          window.localStorage.removeItem('emailForSignIn')
          if (typeof next === `function`) next()
        })
        .catch(err => {
          if (typeof next === `function`) next(err)
        })
    }
  }

  signOut = () => this.auth.signOut()

  /**
   * Listen to auth state changes.
   * @param {function} next - the callback to trigger in case of auth user.
  onAuthUserListener = (next, fallback) =>
   * @param {function} next - the callback to trigger in case of non auth user.
   */
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.user(user.uid, data => {
          // default empty roles
          if (!data.role) data.role = {}

          // merge auth and db user
          const newAuthUser = {
            uid: user.uid,
            isAnonymous: user.isAnonymous,
            email: user.email,
            emailVerified: user.emailVerified,
            displayName: user.displayName,
            photoURL: user.photoURL,
            providerData: user.providerData,
            signOut: this.signOut,
            ...data
          }

          if (typeof next === `function`) next(newAuthUser)
        })
      } else {
        if (typeof fallback === `function`) fallback()
      }
    })

  /*  ----------------
      --- User API ---
      ----------------  */

  // user = uid => this.db.ref(`users/${uid}`)
  user = (uid, next) =>
    this.db
      .collection('users')
      .doc(uid)
      .get(this.getOptions)
      .then(doc => {
        if (doc.exists && typeof next === `function`) next(doc.data())
      })
      .catch(err => {
        console.log('user error: ', err)
      })

  users = () => this.db.ref(`users`)
}

let firebase

function getFirebase (app) {
  if (!firebase) firebase = new Firebase(app)
  return firebase
}

export default getFirebase

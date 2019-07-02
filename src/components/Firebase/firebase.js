import { gravatar } from '../../lib/utils'

const config = {
  apiKey: process.env.BASE_API_KEY,
  authDomain: process.env.BASE_AUTH_DOMAIN,
  databaseURL: process.env.BASE_DATABASE_URL,
  projectId: process.env.BASE_PROJECT_ID,
  storageBucket: process.env.BASE_STORAGE_BUCKET,
  messagingSenderId: process.env.BASE_APP_MESSAGING_SENDER_ID,
  appId: process.env.BASE_APP_ID
}

export const storeCollectionName = 'stores'
export const userCollectionName = 'users'

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
      console.log('persistence error: ', err) // TODO: remove this (debug)
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

  /** Sign Out */
  signOut = () => this.auth.signOut()

  /**
   * Listen to auth state changes.
   * @param {function} next - the callback to trigger in case of auth user.
   * @param {function} fallback - the callback to trigger in case of non auth user.
   */
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(user => {
      if (user) {
        const newAuthUser = {
          uid: user.uid,
          isAnonymous: user.isAnonymous,
          email: user.email,
          emailVerified: user.emailVerified,
          displayName: user.displayName,
          photoURL: user.photoURL ? user.photoURL : gravatar(user.email),
          providerData: user.providerData,
          admin: false,
          signOut: this.signOut
        }
        // Looking for existing user or create a new one
        this.user(
          user.uid,
          data => {
            newAuthUser.admin = data.admin
            if (typeof next === `function`) next(newAuthUser)
          },
          () => {
            // User doesn't exist, add him into the database
            this.addUser({
              uid: user.uid,
              created: new Date(),
              admin: false
            })
            if (typeof next === `function`) next(newAuthUser)
          }
        )
      } else {
        if (typeof fallback === `function`) fallback()
      }
    })

  /*  --------------
      --- DB API ---
      --------------  */

  /**
   * Get the user by id.
   * @param {string} uid - the id.
   * @param {function} next - the callback to trigger in case of success.
   */
  user = (uid, next, fallback) =>
    this.db
      .collection(userCollectionName)
      .doc(uid)
      .get(this.getOptions)
      .then(doc => {
        if (doc.exists && typeof next === `function`) next(doc.data())
        else if (typeof fallback === `function`) fallback()
      })
      .catch(err => {
        if (typeof fallback === `function`) fallback(err)
      })

  /**
   * Check if a user exists.
   * @param {string} id the id of the user.
   */
  userExists = async id => {
    const doc = await this.db
      .collection(userCollectionName)
      .doc(id)
      .get(this.getOptions)
      .catch(() => {
        /* Silent is golden */
      })
    return doc && doc.exists
  }

  /**
   * Create a new user in the database.
   * @param {Object} data - the data of the new user.
   */
  addUser = data => {
    if (data && data.uid) {
      // if (!(await this.userExists(data.uid))) {
      const uid = data.uid
      delete data.uid
      return this.db
        .collection(userCollectionName)
        .doc(uid)
        .set(data)
      // }
    }
  }

  /**
   * Check if a store exists.
   * @param {string} id the id of the store.
   */
  storeExists = async id => {
    const doc = await this.db
      .collection(storeCollectionName)
      .doc(id)
      .get(this.getOptions)
      .catch(() => {
        /* Silent is golden */
      })
    return doc && doc.exists
  }

  /**
   * Create a new store in the database.
   * @param {Object} data - the data of the new store.
   */
  addStore = data => {
    if (this.auth.currentUser && data && data.slug) {
      const slug = data.slug
      data.author = this.auth.currentUser.uid
      data.created = new Date()
      data.archived = false
      data.status = 'offline'
      data.fans = []
      data.errorMsg = ''
      delete data.slug
      return this.db
        .collection(storeCollectionName)
        .doc(slug)
        .set(data)
    }
  }

  /**
   * Update a store.
   * @param {string} id - the id of the store to be updated.
   * @param {Object} set - the object query to be set.
   * @param {function} next  - callback in case of success.
   * @param {function} fallback - callback in case of failure.
   */
  updateStore = (id, set, next, fallback) => {
    if (id) {
      return this.db
        .collection(storeCollectionName)
        .doc(id)
        .set(set, { merge: true })
        .then(() => {
          // showSnack(successMsg, 'success')
          if (typeof next === 'function') next()
        })
        .catch(err => {
          // showSnack(failMsg, 'error')
          if (typeof fallback === 'function') fallback(err)
        })
    }
  }

  /**
   * Delete a store (will be archived in the database).
   * @param {string} id - the id of the store to be archived.
   * @param {function} next - callback in case of success.
   * @param {function} fallback - callback in case of failure.
   */
  deleteStore = (id, next, fallback) => {
    this.updateStore(
      id,
      { archived: true, status: 'offline' },
      () => next('Votre vitrine a été supprimée avec succès.'),
      err => fallback('Suppression imposible.', err)
    )
  }

  /**
   * Publish a store.
   * @param {string} id - the id of the store to be published.
   * @param {function} next - callback in case of success.
   * @param {function} fallback - callback in case of failure.
   */
  publishStore = (id, next, fallback) => {
    this.updateStore(
      id,
      { status: 'waiting' },
      () => next('Votre vitrine est en attente de publication.'),
      err => fallback(err, 'Mise en ligne imposible.')
    )
  }

  /**
   * Add a fan to the store or remove it.
   * @param {*} storeId - the id of the store to be updated.
   * @param {*} userId - the user id to add or remove.
   * @param {function} next - function to execute in case of success.
   * @param {function} fallback - function to execute in case of failure.
   * @param {boolean} isFan - whether the user is fan or not
   */
  addRemoveStoreFav = (storeId, userId, next, fallback, isFan = false) => {
    if (storeId && userId) {
      let fans = this.app.firestore.FieldValue.arrayUnion(userId)
      if (isFan) fans = this.app.firestore.FieldValue.arrayRemove(userId)
      return this.db
        .collection(storeCollectionName)
        .doc(storeId)
        .update({ fans })
        .then(() => {
          if (typeof next === 'function') next()
        })
        .catch(err => {
          if (typeof fallback === 'function') fallback(err)
        })
    }
  }

  /*  -------------------
      --- Storage API ---
      -------------------  */

  /**
   * Upload a file to the storage.
   * @param {string} name - the name of the file.
   * @param {string} data - the data of the file.
   */
  uploadFile = async f => {
    const uploadRes = await this.storage
      .ref()
      .child(`${this.auth.currentUser.uid}/${Date.now()}_${f.name}`)
      .put(f)
    return {
      name,
      src: await uploadRes.ref.getDownloadURL(),
      path: uploadRes.ref.location.path
    }
  }

  /**
   * Delete a file from the storage.
   * @param {string} path - the path of the file to delete.
   */
  deleteFile = (path, next, fallback) => {
    return this.storage
      .ref()
      .child(path)
      .delete()
      .then(next)
      .catch(err => fallback(err))
  }
} // End of class

let firebase

function getFirebase (app) {
  if (!firebase) firebase = new Firebase(app)
  return firebase
}

export default getFirebase

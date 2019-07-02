export * from './hooks'

export { FirebaseProvider } from './context'

/** 'auth/account-exists-with-different-credential' error code. */
export const AUTH_CREDENTIAL_IN_USE = `auth/account-exists-with-different-credential`

/** 'auth/web-storage-unsupported' error code. */
export const AUTH_WEB_STORAGE_UNSUPPORTED = `auth/web-storage-unsupported`

/** Regex for validate email. */
export const EMAIL_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i

import md5 from 'md5'

/**
 * Loop over an array asynchronously.
 * @param {array} array - the array to loop over.
 * @param {function} callback - the callback to trigger for each item.
 */
export async function asyncLoop (array, callback) {
  for (let index = 0, len = array.length; index < len; index++) {
    await callback(array[index], index)
  }
}

// /**
//  * Read a file.
//  * @param {Object} file - the file object to read.
//  * @param {function} setError - the error callback.
//  * @returns {Promise} A promise containing the data.
//  */
// export function readFile (file, setError) {
//   const reader = new FileReader()
//   return new Promise((resolve, reject) => {
//     reader.onload = () => resolve(reader.result)
//     reader.onerror = () => {
//       reader.abort()
//       setError('Le chargement du fichier a échoué !')
//       reject(new DOMException('Problem parsing input file.'))
//     }
//     reader.readAsDataURL(file)
//   })
// }

/**
 * Returns the gravatar url for the given email
 * @param {string} email - The email to get the avatar from.
 */
export const gravatar = email =>
  `https://www.gravatar.com/avatar/${md5(email)}?d=mp`

/**
 * Slugify a name.
 * @param {string} name - the name to slugify.
 * @returns {string} the slugified name.
 */
export function slugify (name) {
  return require('slugify')(name, { remove: /[*+~.()'"!:@]/g, lower: true })
}

export const dashPath = '/app/dashboard'

// function geoloc (success) {
//   if ('geolocation' in navigator) {
//     navigator.geolocation.getCurrentPosition(
//       position => success(position),
//       error => {
//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             console.log('User denied the request for Geolocation.')
//             break
//           case error.POSITION_UNAVAILABLE:
//             console.log('Location information is unavailable.')
//             break
//           case error.TIMEOUT:
//             console.log('The request to get user location timed out.')
//             break
//           default:
//             console.log('Geolocation: an unknown error occurred.')
//         }
//       }
//     )
//   } else console.log('Geolocation is not supported by this browser.')
// }

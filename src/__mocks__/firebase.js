// const firebase = jest.requireActual('firebase')
// const app = jest.requireActual('firebase/app')
// const auth = jest.requireActual('firebase/auth')
// const db = jest.requireActual('firebase/firestore')
const firebase = jest.requireActual('../components/Firebase')

module.exports = {
  ...firebase,
  useFirebase: jest.fn(),
  useAuth: jest.fn().mockImplementation(() => ({
    initializing: false,
    user: null
  }))
}
// const firebase = jest.requireActual('firebase/app')

// module.exports = {
//   // ...firebase,
//   initializeApp: jest.fn(() => {
//     return {
//       auth: jest.fn(() => {
//         return {
//           // createUserWithEmailAndPassword: jest.fn((para1, para2) => {
//           //   return new Promise(function (resolve, reject) {
//           //     resolve({
//           //       email: 'test@test.com',
//           //       uid: '12345678abcdefg'
//           //     })

//           //     reject({ message: 'error!' })
//           //   })
//           // }),
//           // signOut: jest.fn(() => {
//           //   return new Promise(function (resolve, reject) {
//           //     resolve('Success')
//           //     reject({ message: 'error!' })
//           //   })
//           // }),
//           onAuthStateChanged: jest.fn(() => {
//             return {
//               email: 'test@test.com',
//               uid: '12345678abcdefg'
//             }
//           })
//           // signInWithEmailAndPassword: jest.fn((para1, para) => {
//           //   return new Promise(function (resolve, reject) {
//           //     reject({ message: 'error!' })
//           //   })
//           // })
//         }
//       })
//     }
//   })
// }

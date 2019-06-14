import React from 'react'
import PropTypes from 'prop-types'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme, Style } from '../components/Style'

const AllTheProviders = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <Style />
      {children}
    </>
  </ThemeProvider>
)

AllTheProviders.propTypes = {
  children: PropTypes.node.isRequired
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }

// import casual from 'casual'
// import md5 from 'md5'

// casual.seed(777) // seed it so we get consistent results

// export const fakeUser = (isAnonymous = false, emailVerified = false) => ({
//   __typename: 'User',
//   uid: 'CUbE9RoUIYVOzGp04UPVzQO68Xr1',
//   isAnonymous,
//   emailVerified,
//   displayName: casual.name,
//   email: casual.email,
//   photoURL: `https://gravatar.com/avatar/${md5(casual.email)}?s=50`,
//   signOut () {}
// })

// export const fakeStore = (archived = false, status = 'online') => ({
//   __typename: 'Store',
//   id: 'ma-superbe-vitrine',
//   activity: 'Restaurant',
//   address: casual.address,
//   archived,
//   author: 'CUbE9RoUIYVOzGp04UPVzQO68Xr1',
//   company: casual.company_name,
//   coordinates: [casual.longitude, casual.latitude],
//   created: casual.date,
//   description: `{"blocks":[{"key":"6rjnn","text":"Ma Superbe Vitrine","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7ve8t","text":"Une vitrine à visiter !","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2fpj7","text":"By Chris 😉","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
//   errorMsg: '',
//   fans: ['CUbE9RoUIYVOzGp04UPVzQO68Xr1'],
//   name: 'Ma Superbe Vitrine',
//   phone: casual.phone,
//   photos: {
//     name: 'worpress.png',
//     path: 'stores/CUbE9RoUIYVOzGp04UPVzQO68Xr1/1558490933970_wordpress.png',
//     src:
//       'https://firebasestorage.googleapis.com/v0/b/project-zero-csprod.appspot.com/o/stores%2FCUbE9RoUIYVOzGp04UPVzQO68Xr1%2F1558490933970_wordpress.png?alt=media&token=02057971-89b9-4224-8f85-cb46428c7ff1'
//   },
//   siret: '522 948 256',
//   status,
//   tags: ['Restaurant', 'Wifi', 'Famille']
// })

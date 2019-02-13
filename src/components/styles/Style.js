import { createGlobalStyle } from 'styled-components'
import './style.css'

const theme = {
  // black: '#17394d',
  black: '#212121',
  gray: '#dadce0',
  blue: '#039be5',
  orange: '#f6755e',
  orange2: '#f78a76',
  headerHeight: '3rem',
  spacingUnit: '1rem',
  bcTransition: 'background-color 0.2s ease-in-out, color 0.2sease-in-out',
  xl: '1680px',
  lg: '1280px',
  md: '980px',
  sm: '736px',
  xs: '480px'
}

const Style = createGlobalStyle`
  body {
    color: ${props => props.theme.black}
    -webkit-font-smoothing: antialiased;
    font-family: 'Roboto', sans-serif;
  }
  a {
    color: ${props => props.theme.blue};
  }
  /* input[type="text"]:focus,
  input[type="password"]:focus,
  input[type="email"]:focus,
  input[type="number"]:focus,
  select:focus,
  textarea:focus {
    border-color: ${props => props.theme.blue};
    box-shadow: 0 0 0 1px #25a2c3;
  } */
  /* @media screen and (max-width: ${props => props.theme.xs}) {
    input {
      height: 3em;
      line-height: 3em;
      font-size: small;
      &[type='submit'] {
        padding: 0 2.5em;
      }
    }
  } */
`

export { theme, Style }

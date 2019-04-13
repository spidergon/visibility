import { createGlobalStyle } from 'styled-components'
import './style.css'

const theme = {
  primary: '#3f51b5',
  // black: '#17394d',
  black: '#212121',
  gray: '#dadce0',
  blue: '#039be5',
  orange: '#f6755e',
  orange2: '#f78a76',
  headerHeight: '5rem',
  dashHeaderHeight: '3rem',
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
`

export { theme, Style }

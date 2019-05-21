import { createGlobalStyle } from 'styled-components'
import '../assets/css/style.css'

export const theme = {
  primary: '#3f51b5',
  black: 'rgb(72, 72, 72)',
  gray: '#dadce0',
  blue: '#039be5',
  orange: '#f6755e',
  orange2: '#f78a76',
  loved: 'red',
  headerHeight: '5rem',
  dashHeaderHeight: '3rem',
  headerBottom: '1px solid rgba(151, 151, 151, 0.2) !important;',
  spacingUnit: '1rem',
  bcTransition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
  xl: '1680px',
  lg: '1280px',
  md: '980px',
  sm: '736px',
  xs: '480px'
}

export const GlobalStyle = createGlobalStyle`
  body {
    -webkit-font-smoothing: antialiased;
    color: ${props => props.theme.black};
    font-family: 'Roboto', sans-serif;
  }
  a {
    color: ${props => props.theme.blue};
  }
`

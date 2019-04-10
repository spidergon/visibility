import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from './Link'

const Wrapper = styled.div`
  text-align: -webkit-center;
  .button {
    appearance: none;
    transition: ${props => props.theme.bcTransition};
    background-color: transparent;
    border-radius: 4px;
    border: 0;
    color: #727a82;
    cursor: pointer;
    display: inline-block;
    font-family: 'Montserrat', sans-serif;
    height: 3.5em;
    line-height: 3.5em;
    padding: 0 3.5em;
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
    text-transform: uppercase;
    box-shadow: inset 0 0 0 1px #dee1e3;
    &:hover {
      background-color: rgba(144, 144, 144, 0.075);
    }
    &.nav {
      padding: 0 2em;
      height: 3.25em;
      line-height: 3.25em;
    }
    &.alt {
      background-color: ${props => props.theme.orange};
      color: #fff;
      box-shadow: unset;
      &:hover {
        background-color: ${props => props.theme.orange2};
      }
    }
    &.fit {
      display: block;
      margin: 0 0 1em 0;
      width: 100%;
    }
    &.menu {
      padding: 0;
    }
    &[disabled] {
      pointer-events: none;
      opacity: 0.8;
    }
    i:before {
      padding-right: 0.5em;
    }
    @media screen and (max-width: ${props => props.theme.xs}) {
      height: 3em;
      line-height: 3em;
      font-size: small;
    }
  }
`

const Button = ({ children, to, classes, handleClick, disabled }) => {
  if (!to && !handleClick) {
    throw new Error(
      'You must pass "to" prop or "handleClick" prop to the button component!'
    )
  }
  let link
  if (to) {
    link = (
      <Link
        className={classes ? `button ${classes}` : 'button'}
        disabled={disabled}
        to={to}
      >
        {children}
      </Link>
    )
  } else if (handleClick) {
    link = (
      <div
        className={classes ? `button ${classes}` : 'button'}
        disabled={disabled}
        onClick={handleClick}
      >
        {children}
      </div>
    )
  }
  return <Wrapper>{link}</Wrapper>
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  classes: PropTypes.string,
  handleClick: PropTypes.func,
  disabled: PropTypes.bool
}

export default Button

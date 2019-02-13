import styled, { css } from 'styled-components'

const infoLabel = css`
  .error,
  .info {
    font-weight: bold;
    font-size: 10pt;
  }
  .error {
    color: red;
  }
  .info {
    color: green;
  }
`

const Wrapper = styled.div`
  padding-top: 6em;
  .content {
    width: 600px;
    margin: 0 auto;
    padding: 3em 2.5em;
    border: 1px solid ${props => props.theme.gray};
    border-radius: 8px;
    text-align: center;
    ${infoLabel}
    .buttons {
      margin-top: 40px;
    }
    .button {
      &.facebook,
      &.twitter,
      &.email {
        padding: 0;
        border: 0;
        display: block;
        margin-bottom: 2rem;
        color: white;
        max-width: 45rem;
        transition: ${props => props.theme.bcTransition},
          opacity 0.2s ease-in-out;
        &:hover {
          opacity: 0.9;
        }
      }
      &.facebook {
        background: #3864a3;
      }
      &.twitter {
        background: #5ea9dd;
      }
      &.email {
        background: transparent;
        color: ${props => props.theme.black};
        box-shadow: inset 0 0 0 1px #dee1e3;
        &:hover {
          background-color: rgba(144, 144, 144, 0.075);
        }
      }
    }
  }
  @media screen and (max-width: ${props => props.theme.sm}) {
    padding-top: 2em;
    .content {
      max-width: 90%;
      .button {
        &.facebook,
        &.twitter,
        &.email {
          margin-bottom: 1rem;
        }
      }
    }
  }
  @media screen and (max-width: ${props => props.theme.xs}) {
    .content {
      padding: 1em;
    }
  }
`

const LoginEmailForm = styled.form`
  display: grid;
  grid-gap: 20px;
  justify-items: center;
  max-width: 500px;
  margin: 20px auto 0;
  #back {
    cursor: pointer;
  }
  ${infoLabel}
  .form-content {
    margin: 0;
  }
`

export { Wrapper, LoginEmailForm }

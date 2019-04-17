import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

const BackgroundSection = ({ className }) => (
  <StaticQuery
    query={graphql`
      query {
        desktop: file(relativePath: { eq: "forest.jpg" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 4160) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => (
      <BackgroundImage
        className={className}
        fluid={data.desktop.childImageSharp.fluid}
        Tag='section'
      >
        <div className='hero__inner'>
          <div className='hero__content'>{'HERO'}</div>
        </div>
      </BackgroundImage>
    )}
  />
)

const StyledBackgroundSection = styled(BackgroundSection)`
  height: 475px;
  background-position: top center;
  background-repeat: repeat-y;
  background-size: cover;
  margin-bottom: 25px;
  .hero__inner {
    padding: 150px 0;
    color: #fff;
    height: 100%;
    .hero__content {
      padding-left: 55px;
      padding-right: 55px;
      max-width: 1200px;
      margin: 0 auto;
    }
  }
`

BackgroundSection.propTypes = {
  className: PropTypes.string.isRequired
}

export default () => <StyledBackgroundSection />

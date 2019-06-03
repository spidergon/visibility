import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

const detailsQuery = graphql`
  query DefaultSeoQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`

function Seo ({ description, lang, meta, title }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={({ site }) => {
        const metaDescription = description || site.siteMetadata.description
        return (
          <Helmet
            htmlAttributes={{
              lang
            }}
            meta={[
              {
                name: 'description',
                content: metaDescription
              },
              {
                property: 'og:title',
                content: title
              },
              {
                property: 'og:description',
                content: metaDescription
              },
              {
                property: 'og:type',
                content: 'website'
              },
              {
                name: 'twitter:card',
                content: 'summary'
              },
              {
                name: 'twitter:creator',
                content: site.siteMetadata.author
              },
              {
                name: 'twitter:title',
                content: title
              },
              {
                name: 'twitter:description',
                content: metaDescription
              }
            ]
              // .concat(
              //   keywords.length > 0
              //     ? {
              //       name: 'keywords',
              //       content: keywords.join(', ')
              //     }
              //     : []
              // )
              .concat(meta)}
            title={title}
            titleTemplate={`%s – ${site.siteMetadata.title}`}
          />
        )
      }}
    />
  )
}

Seo.defaultProps = {
  lang: `fr`,
  meta: [],
  description: ``
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired
}

export default Seo

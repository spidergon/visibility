module.exports = {
  siteMetadata: {
    title: `Visibility`,
    description: `Visibilité des entreprises en Guyane et dans les Caraïbes`,
    author: `@chrisservius`,
    keywords: ['guyane']
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`, `/store/*`] }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `visibility`,
        short_name: `visibility`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/images/gatsby-icon.png` // This path is relative to the root of the site.
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    'gatsby-plugin-offline'
  ]
}

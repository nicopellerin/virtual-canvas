module.exports = {
  siteMetadata: {
    title: `virtualcanvas`,
    description: `Turn your art into a virtual 3D canvas`,
    author: `@nicopellerin_io`,
    url: "https://virtualcanvas.app", // No trailing slash allowed!
    image: "/og3.png", // Path to your image you placed in the 'static' folder
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `virtualcanvas`,
        short_name: `virtualcanvas`,
        start_url: `/`,
        background_color: `#ff1654`,
        theme_color: `#ff1654`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-149856310-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Any additional optional fields
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "virtualcanvas.app",
      },
    },
    `gatsby-plugin-typescript`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}

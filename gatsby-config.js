module.exports = {
  siteMetadata: {
    title: `Virtual Canvas`,
    description: `Turn your art into a virtual 3D canvas`,
    author: `@nicopellerin_io`,
    url: "https://virtualcanvas.app", // No trailing slash allowed!
    image: "/og4.png", // Path to your image you placed in the 'static' folder
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-149856310-1",
      },
    },
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
    `gatsby-plugin-portal`,
    `gatsby-plugin-netlify`,
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `virtualcanvas`,
    //     short_name: `virtualcanvas`,
    //     start_url: `/`,
    //     background_color: `#623caa`,
    //     theme_color: `#623caa`,
    //     display: `minimal-ui`,
    //     icon: `src/images/favicon.png`, // This path is relative to the root of the site.
    //   },
    // },
    `gatsby-plugin-typescript`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        // Exclude specific pages or groups of pages using glob parameters
        // See: https://github.com/isaacs/minimatch
        // The example below will exclude the single `path/to/page` and all routes beginning with `category`
        // exclude: ["/category/*", `/path/to/page`],
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }

          allSitePage {
            edges {
              node {
                path
              }
            }
          }
      }`,
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map(edge => {
            return {
              url:
                site.siteMetadata.siteUrl +
                (edge.node.path && edge.node.path === "/"
                  ? edge.node.path.substr(0, edge.node.path.length - 1)
                  : edge.node.path),
              changefreq: `monthly`,
              priority: 0.7
            };
          })
      }
    },

    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        // host defaults to ${siteMetadata.siteUrl}
        policy: [
          {
            userAgent: "*",
            allow: "/",
            disallow: []
          }
        ]
      }
    }
  ]
};

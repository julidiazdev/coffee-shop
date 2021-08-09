module.exports = {
  siteMetadata: {
    title: 'The Coffee Shop Project'
  },
  plugins: [
    'gatsby-plugin-netlify-cms',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: 'src/blog'
      }
    }, 
    'gatsby-transformer-remark'
  ]
};

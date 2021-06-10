module.exports = {
  siteMetadata: {
    title: "ABWorld Blog",
  },
  plugins: [
  {
	  resolve: `gatsby-theme-blog`,
	  options: {
		basePath: `/blog`  
	  }
  }],
};

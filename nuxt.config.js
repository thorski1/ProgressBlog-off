const axios = require('axios');

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Progress Bog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A blog documenting my daily progress learning full stack development.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      { rel: 'stylesheet', href:'https://fonts.googleapis.com/css?family=Quicksand:400,700&display=swap'}
    ]
  },
  

 

    loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],

  
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    [
      'storyblok-nuxt',
      {accessToken: process.env.NODE_ENV == 'production' 
      ? 'YTH3n0Q3NXNKfqrXQPApyAtt'
      : '4rCRV2ej5pKhiS2anZDZuwtt',
         cacheProvider: 'memory'}
    ]
  ],

  generate: {
    routes: function() {
      return axios.get('https://api.storyblok.com/v1/cdn/stories?version=published&token=YTH3n0Q3NXNKfqrXQPApyAtt&starts_with=blog&cv=' + Math.floor(Date.now() / 1e3)
      )
      .then(res => {
        const blogPosts = res.data.stories.map(bp => bp.full_slug);
        return [
          '/',
          '/blog',
          '/about',
          ...blogPosts
        ]
      });
    }
  },

  router: {
    base: '/ProgressBlog/'
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}

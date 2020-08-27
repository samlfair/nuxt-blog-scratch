export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",

  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",

  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: "Sam",
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Source+Sans+Pro:wght@400;600"
      }
    ],
    script: [
      {
        src:
          "https://cdn.polyfill.io/v2/polyfill.min.js?features=Element.prototype.classList"
      },
      {
        src:
          "https://cdn.jsdelivr.net/npm/focus-visible@5.0.2/dist/focus-visible.min.js"
      }
    ]
  },

  /*
   ** Global CSS
   */
  css: ["@/assets/global.scss", "@/assets/resetr.css"],

  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    "~/plugins/html-serializer.js",
    "~/plugins/link-resolver.js",
    "~/plugins/seo-handler.js",
    "~/plugins/disqus"
  ],

  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // modules for full static before `nuxt export` (coming in v2.12)
    "@nuxtjs/prismic",
    [
      "@nuxtjs/prismic",
      {
        endpoint: "",
        apiOptions: {
          routes: [
            {
              type: "page",
              path: "/:uid"
            }
          ]
        }
      }
    ],
    ["nuxt-sm"]
  ],
  prismic: {
    endpoint: "https://sam-onboarding-nuxt-blog.cdn.prismic.io/api/v2",
    linkResolver: "@/plugins/link-resolver",
    htmlSerializer: "@/plugins/html-serializer"
  },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extend(config, ctx) {
      config.resolve.alias["vue"] = "vue/dist/vue.common";
    },

    transpile: ["vue-slicezone", "nuxt-sm"]
  },
  generate: {
    fallback: "404.html" // Netlify reads a 404.html, Nuxt will load as an SPA
  },
  env: {
    baseUrl: "https://samlfair.github.io"
  }
};

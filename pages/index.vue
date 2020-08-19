<template>
  <div class="container">
    <div class="postlist">
      <div v-for="post in blogPosts" v-bind:key="post.id">
        <Thumbnail :post="post"></Thumbnail>
      </div>
    </div>
  </div>
</template>

<script>
import LinkResolver from "~/plugins/link-resolver.js";
import Thumbnail from "~/components/Thumbnail";

export default {
  name: "Home",
  head() {
    return {
      title: "Sam Littlefair",
      meta: [
        {
          property: "description",
          content: "Personal website of Sam Littlefair."
        },
        {
          property: "og:description",
          content: "Personal website of Sam Littlefair."
        },
        {
          property: "og:image",
          content:
            "https://images.prismic.io/sam-onboarding-nuxt-blog/fb3df6eb-f038-4d3a-a3fc-322bbee0dbaa_michael-dziedzic-W6l35A_rxxU-unsplash.jpg?auto=compress,format"
        },
        {
          property: "og:image:alt",
          content: "A purple and red prism"
        },
        {
          property: "og:url",
          content: process.env.baseUrl + this.$route.path
        },
        {
          property: "og:site_name",
          content: "Sam Littlefair"
        },
        {
          name: "twitter:creator",
          content: "@samlfair"
        },
        {
          name: "twitter:url",
          content: process.env.baseUrl + this.$route.path
        },
        {
          name: "twitter:title",
          content: "Sam Littlefair"
        },
        {
          name: "twitter:image",
          content:
            "https://images.prismic.io/sam-onboarding-nuxt-blog/fb3df6eb-f038-4d3a-a3fc-322bbee0dbaa_michael-dziedzic-W6l35A_rxxU-unsplash.jpg?auto=compress,format"
        },
        {
          name: "twitter:image:alt",
          content: "A purple and red prism"
        },
        {
          name: "twitter:dnt",
          content: "off"
        },
        {
          itemprop: "name",
          content: "Sam Littlefair"
        },
        {
          itemprop: "description",
          content: "Personal website of Sam Littlefair"
        },
        {
          itemprop: "image",
          content:
            "https://images.prismic.io/sam-onboarding-nuxt-blog/fb3df6eb-f038-4d3a-a3fc-322bbee0dbaa_michael-dziedzic-W6l35A_rxxU-unsplash.jpg?auto=compress,format"
        }
      ]
    };
  },
  components: {
    Thumbnail
  },
  async asyncData({ $prismic, error }) {
    try {
      const blogPosts = (
        await $prismic.api.query(
          $prismic.predicates.at("document.type", "post"),
          { orderings: "[my.post.date desc]" }
        )
      ).results;
      blogPosts.forEach(post => (post.link = LinkResolver(post)));
      return { blogPosts };
    } catch (e) {
      error({ statsCode: 404, message: "Page not found" });
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 600;
}

h2 {
  font-family: "Lora", serif;
  font-weight: 400;
}

p.subtitle {
  font-size: 1.2em;
  margin-top: 10px;
}

.postlist {
  border-top: 1px solid #eee;
}
</style>

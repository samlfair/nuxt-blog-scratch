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
    const meta = [
      {
        property: "og:url",
        content: process.env.baseUrl + this.$route.path
      },
      {
        itemprop: "name",
        content:
          (this.homeContent.meta_title[0].text ||
            this.homeContent.title[0].text) + " - Sam Littlefair"
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
        content:
          this.homeContent.meta_title[0].text || this.homeContent.title[0].text
      },
      {
        property: "og:title",
        content:
          this.homeContent.meta_title[0].text || this.homeContent.title[0].text
      },
      {
        name: "twitter:dnt",
        content: "off"
      }
    ];
    if (this.homeContent.meta_description[0].text) {
      meta.push(
        {
          property: "description",
          content: this.homeContent.meta_description[0].text
        },
        {
          property: "og:description",
          content: this.homeContent.meta_description[0].text
        },
        {
          itemprop: "description",
          content: this.homeContent.meta_description[0].text
        }
      );
    }
    if (this.homeContent.meta_image.url) {
      meta.push(
        {
          property: "og:image",
          content: this.homeContent.meta_image.url
        },
        {
          name: "twitter:image",
          content: this.homeContent.meta_image.url
        },
        {
          name: "twitter:image:alt",
          content: this.homeContent.meta_image.url
        },
        {
          property: "og:image:alt",
          content: this.homeContent.meta_image.alt
        },
        {
          itemprop: "image",
          content: this.homeContent.meta_image.url
        }
      );
    }
    return {
      title: this.$prismic.asText(this.homeContent.title) + " - Sam Littlefair",
      meta
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
      const homeContent = (await $prismic.api.getByUID("page", "home")).data;
      return { blogPosts, homeContent };
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

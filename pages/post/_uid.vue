<template>
  <div class="post">
    <h2>
      {{ $prismic.asText(postContent.title) }}
    </h2>
    <div class="post__content">
      <SliceZone :SliceZone="postContent.body" />
    </div>
  </div>
</template>

<script>
import Nav from "~/components/Nav";
import SliceZone from "~/components/SliceZone";

export default {
  name: "post",
  components: {
    Nav,
    SliceZone
  },
  async asyncData({ $prismic, params, error }) {
    try {
      const postContent = (await $prismic.api.getByUID("post", params.uid))
        .data;
      return { postContent };
    } catch (e) {
      error({ statsCode: 404, message: e });
    }
  },
  head() {
    return {
      title: this.$prismic.asText(this.postContent.title) + " - Sam Littlefair",
      meta: [
        {
          property: "description",
          content: this.postContent.meta_description[0].text
        },
        {
          property: "og:description",
          content: this.postContent.meta_description[0].text
        },
        {
          property: "og:image",
          content: this.postContent.meta_image.url
        },
        {
          property: "og:image:alt",
          content: this.postContent.meta_image.alt
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
          content: this.postContent.meta_title[0].text
        },
        {
          name: "twitter:image",
          content: this.postContent.meta_image.url
        },
        {
          name: "twitter:image:alt",
          content: this.postContent.meta_image.url
        },
        {
          name: "twitter:dnt",
          content: "off"
        },
        {
          itemprop: "name",
          content: this.postContent.meta_title[0].text
        },
        {
          itemprop: "description",
          content: this.postContent.meta_description[0].text
        },
        {
          itemprop: "image",
          content: this.postContent.meta_image.url
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.post {
  h2 {
    font-size: 2.2em;
    line-height: 2em;
    font-weight: bold;
  }
  margin: 20px 0 100px 0;
}
</style>

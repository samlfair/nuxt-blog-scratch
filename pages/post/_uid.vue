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
    const meta = [
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
        content:
          (this.postContent.meta_title[0].text ||
            this.$prismic.asText(this.postContent.title)) + " - Sam Littlefair"
      },
      {
        name: "twitter:dnt",
        content: "off"
      },
      {
        itemprop: "name",
        content: this.postContent.meta_title[0].text
      }
    ];

    if (this.postContent.meta_description[0].text) {
      meta.push(
        {
          property: "description",
          content: this.postContent.meta_description[0].text
        },
        {
          property: "og:description",
          content: this.postContent.meta_description[0].text
        },
        {
          itemprop: "description",
          content: this.postContent.meta_description[0].text
        }
      );
    }
    if (this.postContent.meta_image.url) {
      meta.push(
        {
          property: "og:image",
          content: this.postContent.meta_image.url
        },
        {
          property: "og:image:alt",
          content: this.postContent.meta_image.alt
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
          itemprop: "image",
          content: this.postContent.meta_image.url
        }
      );
    }
    return {
      title:
        (this.postContent.meta_title[0].text ||
          this.$prismic.asText(this.postContent.title)) + " - Sam Littlefair",
      meta
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

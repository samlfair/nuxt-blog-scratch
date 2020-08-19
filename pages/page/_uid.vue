<template>
  <div class="page">
    <h2>
      {{ $prismic.asText(pageContent.title) }}
    </h2>
    <div class="post__content">
      <!-- <prismic-rich-text :field="pageContent.text" /> -->
      <SliceZone :SliceZone="pageContent.body" />
    </div>
  </div>
</template>

<script>
import Nav from "~/components/Nav";
import SliceZone from "~/components/SliceZone";

export default {
  name: "page",
  components: {
    Nav,
    SliceZone
  },
  async asyncData({ $prismic, params, error }) {
    try {
      const pageContent = (await $prismic.api.getByUID("page", params.uid))
        .data;
      return { pageContent };
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
        itemprop: "name",
        content:
          (this.pageContent.meta_title[0].text ||
            this.pageContent.title[0].text) + " - Sam Littlefair"
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
          this.pageContent.meta_title[0].text || this.pageContent.title[0].text
      },
      {
        property: "og:title",
        content:
          this.pageContent.meta_title[0].text || this.pageContent.title[0].text
      },
      {
        name: "twitter:dnt",
        content: "off"
      }
    ];
    if (this.pageContent.meta_description[0].text) {
      meta.push(
        {
          property: "description",
          content: this.pageContent.meta_description[0].text
        },
        {
          property: "og:description",
          content: this.pageContent.meta_description[0].text
        },
        {
          itemprop: "description",
          content: this.pageContent.meta_description[0].text
        }
      );
    }
    if (this.pageContent.meta_image.url) {
      meta.push(
        {
          property: "og:image",
          content: this.pageContent.meta_image.url
        },
        {
          name: "twitter:image",
          content: this.pageContent.meta_image.url
        },
        {
          name: "twitter:image:alt",
          content: this.pageContent.meta_image.url
        },
        {
          property: "og:image:alt",
          content: this.pageContent.meta_image.alt
        },
        {
          itemprop: "image",
          content: this.pageContent.meta_image.url
        }
      );
    }
    return {
      title: this.$prismic.asText(this.pageContent.title) + " - Sam Littlefair",
      meta
    };
  }
};
</script>

<style scoped lang="scss">
.page {
  h2 {
    font-size: 2.2em;
    line-height: 2em;
    font-weight: bold;
  }
  margin: 20px 0 100px 0;
}
</style>

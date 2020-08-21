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
    return this.$seo(this.pageContent, this.$route.path);
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

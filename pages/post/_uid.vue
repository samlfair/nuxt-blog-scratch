<template>
  <div class="post">
    <h2>
      {{ $prismic.asText(postContent.title) }}
    </h2>
    <div class="post__content">
      <!-- <SliceZone :SliceZone="postContent.body" /> -->
      <slice-zone type="post" :uid="$route.params.uid" />
    </div>
  </div>
</template>

<script>
import Nav from "~/components/Nav";
// import SliceZone from "~/components/SliceZone";
import SliceZone from "vue-slicezone";

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
    return this.$seo(this.postContent, this.$route.path);
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

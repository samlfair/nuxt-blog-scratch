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
  }
};
</script>

<style scoped lang="scss">
.post {
  margin-bottom: 60px;
}
</style>

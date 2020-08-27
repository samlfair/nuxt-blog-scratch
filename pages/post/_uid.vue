<template>
  <div class="post">
    <h2>
      {{ $prismic.asText(postContent.title) }}
    </h2>
    <div class="author">
      By
      <nuxt-link :to="authorLink">
        {{ $prismic.asText(postContent.author.data.name) }}
      </nuxt-link>
    </div>
    <div class="post__content">
      <slice-zone type="post" :uid="$route.params.uid" />
    </div>
  </div>
</template>

<script>
import SliceZone from "vue-slicezone";

export default {
  name: "post",
  components: {
    SliceZone
  },
  async asyncData({ $prismic, params, error }) {
    try {
      const postContent = (
        await $prismic.api.getByUID("post", params.uid, {
          fetchLinks: "author.name"
        })
      ).data;
      return { postContent };
    } catch (e) {
      error({ statsCode: 404, message: e });
    }
  },
  head() {
    return this.$seo(this.postContent, this.$route.path);
  },
  computed: {
    authorLink: function() {
      return this.$prismic.linkResolver(this.postContent.author);
    }
  }
};
</script>

<style scoped lang="scss">
.post {
  h2 {
    font-size: 2.2em;
    line-height: 1.8em;
    font-weight: bold;
  }
  margin: 20px 0 100px 0;
}

.author {
  text-transform: uppercase;
  font-size: 0.9em;
  color: grey;
}
</style>

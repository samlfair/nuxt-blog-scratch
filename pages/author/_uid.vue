<template>
  <div class="author">
    <div class="header">
      <img :src="authorContent.photo.url" :alt="authorContent.photo.alt" />
      <h2>
        {{ $prismic.asText(authorContent.name) }}
      </h2>
      <prismic-rich-text :field="authorContent.bio" />
      <div class="post-list">
        <div v-for="post in authorPosts" v-bind:key="post.id">
          <Thumbnail :post="post"></Thumbnail>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SliceZone from "vue-slicezone";
import Thumbnail from "~/components/Thumbnail";
import LinkResolver from "~/plugins/link-resolver.js";

export default {
  name: "author",
  components: [Thumbnail],
  async asyncData({ $prismic, params, error }) {
    try {
      let authorContent = await $prismic.api.getByUID("author", params.uid);
      const authorPosts = (
        await $prismic.api.query([
          $prismic.predicates.at("document.type", "post"),
          $prismic.predicates.at("my.post.author", authorContent.id)
        ])
      ).results;
      authorPosts.forEach(post => (post.link = LinkResolver(post)));
      authorContent = authorContent.data;
      return { authorContent, authorPosts };
    } catch (e) {
      error({ statsCode: 404, message: e });
    }
  }
  // head() {
  //   return this.$seo(this.authorContent, this.$route.path);
  // }
};
</script>

// X0O1OBAAACUADyNU //

<style scoped lang="scss">
.author {
  h2 {
    font-size: 2.2em;
    line-height: 2em;
    font-weight: bold;
  }
  margin: 20px 0 100px 0;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    max-width: 200px;
    height: auto;
    border-radius: 50%;
    border: 5px solid white;
    box-shadow: 2px -2px 2px 0px rgb(233, 233, 233),
      -2px -2px 2px 0px rgb(233, 233, 233), 2px 3px 2px 0px rgb(233, 233, 233),
      -2px 3px 2px 0px rgb(233, 233, 233);
  }
}

.post-list {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-top: 40px;
}
</style>

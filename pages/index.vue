<template>
  <div class="container">
    <slice-zone class="slice-zone" type="page" uid="home" />
    <div class="postlist">
      <div class="standard-feed">
        <div v-for="post in blogPosts" v-bind:key="post.id">
          <Thumbnail :post="post"></Thumbnail>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Thumbnail from "~/components/Thumbnail";
import SliceZone from "vue-slicezone";

export default {
  name: "Home",
  head() {
    return this.$seo(this.homeContent, this.$route.path);
  },
  components: {
    Thumbnail,
    SliceZone
  },
  data: function() {
    return {
      searchResults: [],
      searchQuery: ""
    };
  },
  async asyncData({ $prismic, error }) {
    try {
      const blogPosts = (
        await $prismic.api.query(
          $prismic.predicates.at("document.type", "post"),
          { orderings: "[my.post.date desc]" }
        )
      ).results;
      for (let i = 0; i < blogPosts.length; i++) {
        if (blogPosts[i].data.featured) {
          blogPosts.unshift(blogPosts.splice(i, 1)[0]);
          i = blogPosts.length;
        }
      }
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

.standard-feed {
  border-bottom: 1px solid #eee;
}
</style>

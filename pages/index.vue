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

.slice-zone {
  background: $lightgrey;
  padding: 16px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  color: $grey;
  /deep/ .rich-text {
    margin: 0;
    a {
      color: #6b6b6b;
      text-shadow: none;
      box-shadow: -2px -1px 0px 0px inset $lightgrey,
        0px -8px 0px 0px inset $dimgrey;
      padding-left: 2px;
      margin-left: -2px;
      &:hover {
        box-shadow: -2px -1px 0px 0px inset $lightgrey,
          0px -8px 0px 0px inset #dddddd;
        padding-left: 2px;
        margin-left: -2px;
      }
    }
  }
  &::before {
    content: "ℹ︎";
    margin-top: 2px;
    margin-right: 15px;
    margin-left: 2px;
    border-radius: 50%;
    align-self: flex-start;
    padding: 3px 7px 6px 7px;
    border: 2px solid $grey;
  }
}
</style>

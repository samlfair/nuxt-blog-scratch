<template>
  <div class="container">
    <input
      class="search"
      type="text"
      v-model="searchQuery"
      placeholder="Search..."
      @keyup="handleSearch"
    />
    <div class="postlist">
      <div v-if="!searchQuery" class="standard-feed">
        <div v-for="post in blogPosts" v-bind:key="post.id">
          <Thumbnail :post="post"></Thumbnail>
        </div>
      </div>
      <div v-if="searchQuery && searchResults.length" class="search-feed">
        <div v-for="post in searchResults" v-bind:key="post.id">
          <Thumbnail :post="post"></Thumbnail>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Thumbnail from "~/components/Thumbnail";

export default {
  name: "Home",
  head() {
    return this.$seo(this.homeContent, this.$route.path);
  },
  components: {
    Thumbnail
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
      const fetchr = await $prismic.api.query(
        $prismic.predicates.at("document.type", "post"),
        {
          fetchLinks: ["author.name"]
        }
      );
      console.log(fetchr.results[0].data);
      const homeContent = (await $prismic.api.getByUID("page", "home")).data;
      return { blogPosts, homeContent };
    } catch (e) {
      error({ statsCode: 404, message: "Page not found" });
    }
  },
  methods: {
    async handleSearch(e) {
      const res = await this.$prismic.api.query([
        this.$prismic.predicates.at("document.type", "post"),
        this.$prismic.predicates.fulltext("document", e.target.value)
      ]);
      this.searchResults = res.results;
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 600;
}

h2 {
  font-family: "Lora", serif;
  font-weight: 400;
}

p.subtitle {
  font-size: 1.2em;
  margin-top: 10px;
}

.standard-feed,
.search-feed {
  border-bottom: 1px solid #eee;
}

.search {
  margin-bottom: 30px;
  width: 100%;
  &:focus {
    outline: none;
  }
}
</style>

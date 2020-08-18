<template>
  <div class="container">
    <Nav :content="navContent" />
    <div v-for="post in blogPosts" v-bind:key="post.id">
      <hr />
      <Thumbnail :post="post"></Thumbnail>
    </div>
  </div>
</template>

<script>
import LinkResolver from "~/plugins/link-resolver.js";
import Nav from "../components/Nav";
import Thumbnail from "../components/Thumbnail";

export default {
  name: "Home",
  head() {
    return {
      title: "Homepage"
    };
  },
  components: {
    Nav,
    Thumbnail
  },
  async asyncData({ $prismic, error }) {
    try {
      const navContent = (await $prismic.api.getSingle("nav")).data;
      const blogPosts = (
        await $prismic.api.query(
          $prismic.predicates.at("document.type", "post"),
          { orderings: "[my.post.date desc]" }
        )
      ).results;
      blogPosts.forEach(post => (post.link = LinkResolver(post)));
      return { blogPosts, navContent };
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

h2 {
  font-family: "Lora", serif;
  font-weight: 400;
}

p.subtitle {
  font-size: 1.2em;
  margin-top: 10px;
}

hr {
  border-top: 1px solid #eeeeee;
}
</style>

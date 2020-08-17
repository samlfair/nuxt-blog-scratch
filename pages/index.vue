<template>
  <div class="container">
    <h1>{{ $prismic.asText(homepageContent.headline) }}</h1>
    <p class="subtitle">{{ $prismic.asText(homepageContent.description) }}</p>
    <hr />
    <div v-for="post in blogPosts" v-bind:key="post.id">
      {{ $prismic.asText(post.data.title) }}
      <hr />
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  head() {
    return {
      title: "Homepage"
    };
  },
  async asyncData({ $prismic, error }) {
    try {
      const homepageContent = (await $prismic.api.getSingle("blog_home")).data;
      const blogPosts = (
        await $prismic.api.query(
          $prismic.predicates.at("document.type", "post"),
          { orderings: "[my.post.date desc]" }
        )
      ).results;
      console.log(blogPosts);
      return { homepageContent, blogPosts };
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
</style>

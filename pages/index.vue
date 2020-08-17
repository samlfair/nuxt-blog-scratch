<template>
  <div class="container">
    <h1>Sam's Cool Blog</h1>
    <p class="subtitle">A description of Sam's cool blog.</p>
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
      console.log(homepageContent);
    } catch (e) {
      error({ statsCode: 404, message: "Page note found" });
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

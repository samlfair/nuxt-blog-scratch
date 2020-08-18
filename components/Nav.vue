<template>
  <nav class="nav">
    <h1>
      {{ $prismic.asText(content.site_title) }}
    </h1>
  </nav>
</template>

<script>
import LinkResolver from "~/plugins/link-resolver.js";

export default {
  name: "Nav",
  props: {
    content: Object
  }
};
</script>

<style lang="scss" scoped>
nav {
  padding: 50px 0 30px 0;
}

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

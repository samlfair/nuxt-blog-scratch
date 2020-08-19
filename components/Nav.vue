<template>
  <nav class="nav">
    <nuxt-link to="/">
      <h1>
        {{ $prismic.asText(nav.site_title) }}
      </h1>
    </nuxt-link>
    <ul class="menu">
      <li v-for="link in nav.links" v-bind:key="link.label">
        <nuxt-link :to="link.href">{{ $prismic.asText(link.label) }}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import LinkResolver from "~/plugins/link-resolver.js";

export default {
  name: "Nav",
  data: function() {
    return {
      nav: null
    };
  },
  async fetch() {
    const navContent = (await this.$prismic.api.getSingle("nav")).data;
    navContent.links.forEach(item => (item.href = LinkResolver(item.link)));
    this.nav = navContent;
  }
};
</script>

<style lang="scss" scoped>
nav {
  padding: 50px 0 30px 0;
}

ul.menu {
  list-style: none;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  color: lightgrey;
  li {
    margin-right: 20px;
  }
  a:not(.nuxt-link-exact-active) {
    &:hover {
      color: grey;
    }
  }
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

ul .nuxt-link-exact-active {
  color: grey;
  border: 2px solid grey;
  border-radius: 4px;
  cursor: default;
  margin: -2px -5px -3px -5px;
  padding: 0px 3px 1px 3px;
}
</style>

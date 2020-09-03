<template>
  <nav class="nav">
    <nuxt-link to="/">
      <h1>
        {{ $prismic.asText(nav_title) }}
      </h1>
    </nuxt-link>
    <ul class="menu">
      <li v-for="link in nav_links" v-bind:key="link.label">
        <prismic-link :field="link.link">
          {{ $prismic.asText(link.label) }}
        </prismic-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Nav",
  props: {
    nav_links: Array,
    nav_title: Array
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

ul.menu {
  list-style: none;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  color: #d3d3d3;
  li {
    animation: 3s 1s both fadein;
    margin-right: 20px;
    a {
      animation: 5s 1s bordercolor;
      &:not(.nuxt-link-exact-active):hover {
        color: #a0a0a0;
      }
      &.nuxt-link-exact-active {
        color: #a0a0a0;
        border: 2px solid #a0a0a0;
        border-radius: 4px;
        cursor: default;
        margin: -2px -5px -3px -5px;
        padding: 0px 3px 1px 3px;
      }
    }
  }
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes bordercolor {
  0% {
    border-color: white;
  }
  40% {
    border-color: white;
  }
  100% {
    border-color: #a0a0a0;
  }
}
</style>

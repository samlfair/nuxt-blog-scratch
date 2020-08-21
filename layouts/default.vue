<template>
  <div class="layout">
    <div class="col-left"></div>
    <div class="col-middle">
      <Nav :nav_title="config.nav_title" :nav_links="config.nav_links" />
      <Nuxt />
      <div class="footer">
        <prismic-rich-text :field="config.footer" />
      </div>
    </div>
    <div class="col-right"></div>
  </div>
</template>

<script>
import Nav from "~/components/Nav";
import LinkResolver from "~/plugins/link-resolver.js";

export default {
  name: "default",
  data: function() {
    return {
      config: {}
    };
  },
  components: {
    Nav
  },
  async fetch() {
    const config = (await this.$prismic.api.getSingle("config")).data;
    config.nav_links.forEach(link => {
      link.href = LinkResolver(link.link);
    });
    this.config = config;
  },
  head() {
    return {
      titleTemplate: `%s - ${this.config.site_title[0].text}`,
      meta: [
        {
          property: "og:site_name",
          content: this.config.site_title[0].text,
          hid: "og:site_name"
        },
        {
          name: "twitter:creator",
          content: this.config.twitter_handle[0].text,
          hid: "twitter:creator"
        },
        {
          name: "twitter:dnt",
          content: "off",
          hid: "twitter:dnt"
        },
        {
          property: "og:title",
          template: `%s - ${this.config.site_title[0].text}`,
          hid: "og:title"
        },
        {
          itemprop: "name",
          hid: "name",
          content: `%s - ${this.config.site_title[0].text}`
        },
        {
          name: "twitter:title",
          hid: "twitter:title",
          content: `%s - ${this.config.site_title[0].text}`
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.layout {
  width: 100vw;
  height: calc(100vh - 2em);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  .col-left {
    flex: 3 1 20px;
    max-width: 200px;
  }
  .col-middle {
    flex: 2 1 400px;
    max-width: 700px;
    .footer {
      margin-top: 20vh;
      margin-bottom: 10vh;
      font-family: "Source Sans Pro";
      color: lightgrey;
      text-align: center;
    }
  }
  .col-right {
    flex: 5 1 20px;
  }
}
</style>

<template>
  <article class="thumbnail">
    <div class="thumbnail__data">
      <nuxt-link :to="post.link">
        <h2>
          {{ $prismic.asText(post.data.title) }}
        </h2>
      </nuxt-link>
      {{ $prismic.asText(description) }}
      <!-- <prismic-rich-text class="description" :field="description" /> -->
    </div>
  </article>
</template>

<script>
import LinkResolver from "~/plugins/link-resolver.js";

export default {
  name: "Thumbnail",
  props: {
    post: Object
  },
  computed: {
    description: function() {
      let desc;
      this.post.data.body.forEach(slice => {
        if (slice.slice_type === "text") desc = slice.primary.text;
      });
      if (desc[0].text.length > 200) {
        const regex = /^(\S+\s){20}\S+/;
        desc[0].text = desc[0].text.match(regex)[0] + "...";
      }
      return desc;
    }
  }
};
</script>

<style lang="scss" scoped>
.thumbnail {
  &:first-child {
    border-top: 1px solid #eee;
  }
  &__data {
    padding: 20px 0;
    h2 {
      font-size: 1.2em;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .description {
      font-size: 1.1em;
      line-height: 1.4em;
    }
  }
  border-bottom: 1px solid #eee;
}
</style>

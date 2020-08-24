<template>
  <article :class="{ featured: isFeatured }" class="thumbnail">
    <div class="thumbnail__data">
      <nuxt-link :to="post.link">
        <div class="title">
          <h2>
            {{ $prismic.asText(post.data.title) }}
          </h2>
          <span class="star">
            {{ post.data.featured ? " ⭐️" : "" }}
          </span>
        </div>
      </nuxt-link>
      {{ description }}
    </div>
  </article>
</template>

<script>
import LinkResolver from "~/plugins/link-resolver.js";

export default {
  name: "Thumbnail",
  props: {
    post: Array
  },
  computed: {
    description: function() {
      let desc;
      let excerpt;
      this.post.data.body.forEach(slice => {
        if (slice.slice_type === "text") desc = slice.primary.text;
      });
      if (desc) {
        const regex = /^(\S+\s){20}\S+/;
        excerpt = desc[0].text.match(regex)[0] + "...";
      } else {
        excerpt = "No excerpt.";
      }
      return excerpt;
    },
    isFeatured: function() {
      return this.post.data.featured;
    }
  }
};
</script>

<style lang="scss" scoped>
.thumbnail {
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
  &:not(.featured) {
    border-top: 1px solid #eee;
  }
}

.title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>

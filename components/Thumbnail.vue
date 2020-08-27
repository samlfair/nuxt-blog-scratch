<template>
  <article :class="{ featured: isFeatured }" class="thumbnail">
    <div class="thumbnail__data">
      <nuxt-link :to="link">
        <div class="title">
          <h2>
            {{ $prismic.asText(post.data.title) }}
          </h2>
          <span class="star">
            {{ post.data.featured ? "✱" : "" }}
          </span>
        </div>
      </nuxt-link>
      {{ description }}
    </div>
  </article>
</template>

<script>
import linkResolver from "~/plugins/link-resolver.js";

export default {
  name: "Thumbnail",
  props: {
    post: Object
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
    },
    link: function() {
      return linkResolver(this.post);
    }
  }
};
</script>

<style lang="scss" scoped>
.thumbnail {
  overflow: hidden;
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
  .star {
    display: flex;
    flex-direction: row;
    align-items: top;
    color: grey;
    &:after {
      content: "featured";
      margin-top: 1.5px;
      margin-left: 3px;
      display: inline-block;
      width: 0px;
      opacity: 0;
      transition: opacity 0.4s, width 0.4s;
      text-transform: uppercase;
      font-size: 0.8em;
    }
  }
}

.featured:hover .star:after {
  opacity: 1;
  width: 9ch;
}
</style>

<template>
  <article :class="{ featured: isFeatured }" class="thumbnail">
    <nuxt-link :to="link">
      <div class="title">
        <h2>
          {{ $prismic.asText(post.data.title) }}
        </h2>
        <span v-if="post.data.featured" class="star">✱</span>
      </div>
    </nuxt-link>
    <p>
      {{ description }}
    </p>
  </article>
</template>

<script>
export default {
  name: "Thumbnail",
  props: {
    post: Object
  },
  data() {
    return {
      numberOfWords: 25
    };
  },
  computed: {
    description: function() {
      let desc, excerpt;
      this.post.data.body.forEach(slice => {
        if (slice.slice_type === "rich_text") desc = slice.primary.text;
      });
      if (desc) {
        const regexConstructor =
          "^(\\S+\\s){" + this.numberOfWords + "}\\S*[^,\\.:;\\s]";
        const regex = new RegExp(regexConstructor);
        excerpt = desc[0].text.match(regex)[0] + " ...";
      } else {
        excerpt = "No excerpt.";
      }
      return excerpt;
    },
    isFeatured: function() {
      return this.post.data.featured;
    },
    link: function() {
      return this.$prismic.linkResolver(this.post);
    }
  }
};
</script>

<style lang="scss" scoped>
.thumbnail {
  overflow: hidden;
  border-top: 1px solid $lightgrey;
  padding: 20px 0;
  h2 {
    // font-size: 1.2em;
    // font-weight: bold;
    margin-bottom: 10px;
  }
  p {
    line-height: $p-height;
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
    color: $grey;
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

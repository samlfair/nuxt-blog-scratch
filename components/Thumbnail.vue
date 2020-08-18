<template>
  <article class="thumbnail">
    <div class="thumbnail__data">
      <nuxt-link :to="post.link">
        <h2>
          {{ $prismic.asText(post.data.title) }}
        </h2>
      </nuxt-link>
      <prismic-rich-text :field="description" />
      <!-- {{ $prismic.richText(description) }} -->
      <!-- {{ description }} -->
    </div>
    <hr />
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
        console.log("Slice!");
        if (slice.slice_type === "text") desc = slice.primary.text;
      });
      if (desc[0].text.length > 300) {
        desc[0].text = desc[0].text.slice(0, 300) + "...";
      }
      return desc;
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
  }
}

hr {
  border-color: #eee;
  border-top: 1px solid #eeeeee;
}
</style>

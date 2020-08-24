<template>
  <div class="post">
    <h2>
      {{ $prismic.asText(postContent.title) }}
    </h2>
    <div class="author">
      By
      <nuxt-link :to="authorLink">
        {{ $prismic.asText(postContent.author.data.name) }}
      </nuxt-link>
    </div>
    <div class="post__content">
      <slice-zone type="post" :uid="$route.params.uid" />
    </div>
    <Disqus
      v-if="postContent.allow_comments"
      shortname="sam-onboarding-nuxt-blog"
      :identifier="'sam-nuxt' + $route.params.uid"
      :url="'http://localhost:3000' + $route.fullPath"
    >
    </Disqus>
  </div>
</template>

<script>
import SliceZone from "vue-slicezone";
import linkResolver from "~/plugins/link-resolver";
import { Disqus } from "vue-disqus";

export default {
  name: "post",
  components: {
    SliceZone,
    Disqus
  },
  async asyncData({ $prismic, params, error }) {
    try {
      const postContent = (
        await $prismic.api.getByUID("post", params.uid, {
          fetchLinks: "author.name"
        })
      ).data;
      console.log(postContent.allow_comments);
      return { postContent };
    } catch (e) {
      error({ statsCode: 404, message: e });
    }
  },
  head() {
    return this.$seo(this.postContent, this.$route.path);
  },
  computed: {
    authorLink: function() {
      return linkResolver(this.postContent.author);
    }
  }
};
</script>

<style scoped lang="scss">
.post {
  h2 {
    font-size: 2.2em;
    line-height: 1.8em;
    font-weight: bold;
  }
  margin: 20px 0 100px 0;
}

.author {
  text-transform: uppercase;
  font-size: 0.9em;
  color: grey;
}
</style>
